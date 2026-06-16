/**
 * conversationProvider.ts — Conversation management via AntigravitySDK.
 *
 * ALL interactions go through the SDK when available:
 *   - cascade.getSessions()  → ITrajectoryEntry[] (titles, stepCounts, timestamps)
 *   - ls.setTitle()          → native rename via ConversationAnnotations
 *   - ls.focusCascade()      → switch UI to conversation
 *   - ls.sendMessage()       → send prompt to specific cascade
 *   - ls.createCascade()     → create new headless cascade
 *   - ls.getConversation()   → get single conversation detail
 *
 * Fallback path: Direct filesystem access to transcript.jsonl files
 * (only when SDK is completely unavailable).
 */

import * as path from 'path';
import * as fs from 'fs/promises';
import * as vscode from 'vscode';
import { Conversation, ConversationDetail, TranscriptStep } from '../models';
import { getBrainDirectory, getConversationsDirectory } from '../utils/paths';
import { getSubDirectories, safeReadFile, getFileStat, fileExists, safeReadDir } from '../utils/fileSystem';
import { parseJsonl } from '../utils/jsonlParser';
import { getSDK, isSDKAvailable } from '../services/sdkService';
import { scanAllConversationDBs, listAllConversationIds } from '../services/conversationDB';


// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract project/repo name from transcript steps.
 *
 * Strategy priority:
 * 0. Check user_information / ADDITIONAL_METADATA for workspace URIs
 *    (most reliable — present in ALL conversations from all workspaces)
 * 1. Check tool_call arguments (Cwd, AbsolutePath, TargetFile) for workspace paths
 * 2. Fallback to current workspace folder name
 */
function detectProject(steps: TranscriptStep[], id: string): string {
  // Strategy 0: Look for workspace URIs in user_information or ADDITIONAL_METADATA
  // These appear in USER_INPUT content as:
  //   "The user has 1 active workspaces..."
  //   "/Users/firo/tenn/tenn_brain -> CorpusName"
  // Only check the first 10 steps to avoid scanning huge transcripts
  const checkSteps = steps.slice(0, 10);
  for (const step of checkSteps) {
    if (step.content && (step.type === 'USER_INPUT' || step.source === 'USER_EXPLICIT')) {
      const content = step.content;

      // Look for workspace folder URI patterns in user_information
      // Format: /Users/firo/tenn/repo_name -> /Users/firo/tenn/repo_name
      const wsMatch = content.match(/\/Users\/firo\/tenn\/([a-zA-Z0-9_-]+)\s*->\s*\/Users\/firo\/tenn/);
      if (wsMatch) {
        return wsMatch[1];
      }

      // Alternative: just "/Users/firo/tenn/repo_name" in workspace listing
      const pathMatch = content.match(/active workspaces[\s\S]{0,500}\/Users\/firo\/tenn\/([a-zA-Z0-9_-]+)/);
      if (pathMatch) {
        return pathMatch[1];
      }

      // Check for CorpusName pattern
      const corpusMatch = content.match(/CorpusName[^\n]*\/Users\/firo\/tenn\/([a-zA-Z0-9_-]+)/);
      if (corpusMatch) {
        return corpusMatch[1];
      }
    }
  }

  // Strategy 1: Check tool_call arguments for workspace paths
  for (const step of checkSteps) {
    if (step.tool_calls) {
      for (const tc of step.tool_calls) {
        if (tc.arguments) {
          const paths = [
            tc.arguments.Cwd,
            tc.arguments.AbsolutePath,
            tc.arguments.TargetFile,
            tc.arguments.SearchPath,
            tc.arguments.DirectoryPath,
          ].filter(p => typeof p === 'string') as string[];

          for (const p of paths) {
            if (p.includes('/tenn/')) {
              const segments = p.split('/');
              const tennIdx = segments.indexOf('tenn');
              if (tennIdx !== -1 && segments[tennIdx + 1]) {
                return segments[tennIdx + 1];
              }
            }
            if (p.includes('/firo/')) {
              const segments = p.split('/');
              const firoIdx = segments.indexOf('firo');
              if (firoIdx !== -1 && segments[firoIdx + 1] && segments[firoIdx + 1] !== 'Desktop' && segments[firoIdx + 1] !== '.gemini') {
                if (segments[firoIdx + 1] === 'tenn' && segments[firoIdx + 2]) {
                  return segments[firoIdx + 2];
                }
                return segments[firoIdx + 1];
              }
            }
          }
        }
      }
    }
  }

  // Strategy 2: Fallback to current workspace folder name
  const wsFolder = vscode.workspace.workspaceFolders?.[0];
  if (wsFolder) {
    return wsFolder.name;
  }
  return 'unknown';
}

/**
 * Extract project/repo from a workspace URI string.
 * e.g. "file:///Users/firo/tenn/firothehero" → "firothehero"
 */
function projectFromWorkspaceUri(uri: string): string {
  if (!uri) {
    // No workspace URI — use current workspace folder name as fallback
    const wsFolder = vscode.workspace.workspaceFolders?.[0];
    return wsFolder?.name || 'unknown';
  }
  try {
    // Remove file:// prefix and decode
    const decoded = decodeURIComponent(uri.replace(/^file:\/\//, ''));
    const segments = decoded.split('/').filter(Boolean);
    if (segments.length > 0) {
      // Check for tenn/ pattern
      const tennIdx = segments.indexOf('tenn');
      if (tennIdx !== -1 && segments[tennIdx + 1]) {
        return segments[tennIdx + 1];
      }
      return segments[segments.length - 1];
    }
  } catch (_) {}
  const wsFolder = vscode.workspace.workspaceFolders?.[0];
  return wsFolder?.name || 'unknown';
}


// ---------------------------------------------------------------------------
// SDK-based Conversation List
// ---------------------------------------------------------------------------

/**
 * List all conversations.
 *
 * Uses sdk.cascade.getSessions() when available; falls back to
 * scanning the brain directory's transcript.jsonl files.
 */
export async function getConversations(): Promise<Conversation[]> {
  // Always scan filesystem to get ALL conversations (across all workspaces)
  const fsConversations = await _getConversationsFromFilesystem();

  if (isSDKAvailable()) {
    try {
      // SDK provides richer data (titles, step counts) for current workspace
      const sdkConversations = await _getConversationsFromSDK();

      // Build a lookup from filesystem conversations for project labels.
      // The SDK's getDiagnostics doesn't include workspace info, so
      // the only source of per-conversation project labels is the
      // transcript-based detectProject() done by the filesystem scan.
      const fsProjectMap = new Map<string, string>();
      for (const fsConv of fsConversations) {
        if (fsConv.project && fsConv.project !== 'unknown') {
          fsProjectMap.set(fsConv.id, fsConv.project);
        }
      }

      // Merge: SDK conversations get enriched with filesystem project labels
      const sdkIds = new Set(sdkConversations.map(c => c.id));
      const merged: Conversation[] = sdkConversations.map(c => ({
        ...c,
        project: fsProjectMap.get(c.id) || c.project,
      }));

      // Add filesystem-only conversations (other workspaces not in SDK)
      for (const fsConv of fsConversations) {
        if (!sdkIds.has(fsConv.id)) {
          merged.push(fsConv);
        }
      }
      return merged;
    } catch (err) {
      console.warn('[ACC] SDK getSessions failed, using filesystem only:', err);
    }
  }
  return fsConversations;
}

async function _getConversationsFromSDK(): Promise<Conversation[]> {
  const sdk = getSDK();
  const conversations: Conversation[] = [];

  // Use getDiagnostics() directly to get raw recentTrajectories with workspace info.
  // The SDK's getSessions() discards workspace data (hardcodes workspaceUri: ""),
  // so we need the raw diagnostics to extract project/repo labels.
  let rawTrajectories: any[] = [];
  try {
    const diag = await sdk.cascade.getDiagnostics();
    rawTrajectories = diag?.raw?.recentTrajectories || [];

    // Log the first trajectory's keys to understand what fields are available
    if (rawTrajectories.length > 0) {
      const sampleKeys = Object.keys(rawTrajectories[0]);
      console.log(`[ACC] Raw trajectory fields: ${sampleKeys.join(', ')}`);
      // Log workspace-related fields from the first entry for debugging
      const sample = rawTrajectories[0];
      console.log(`[ACC] Sample trajectory workspace data: workspaceFolderUri=${sample.workspaceFolderUri}, workspaceUri=${sample.workspaceUri}, workspaceFolders=${sample.workspaceFolders}, workingDirectory=${sample.workingDirectory}, repoName=${sample.repoName}`);
    }
  } catch (diagErr: any) {
    console.warn('[ACC] getDiagnostics() failed, falling back to getSessions():', diagErr?.message);
    // Fall back to the SDK's getSessions()
    const sessions = await sdk.cascade.getSessions();
    rawTrajectories = sessions.map((s: any) => ({
      googleAgentId: s.id,
      summary: s.title,
      lastStepIndex: s.stepCount,
      lastModifiedTime: s.lastModifiedTime,
    }));
  }

  for (const raw of rawTrajectories) {
    const id = raw.googleAgentId || raw.id || '';
    let title = raw.summary || raw.title || '';
    const stepCount = raw.lastStepIndex || raw.stepCount || 0;
    const lastMod = raw.lastModifiedTime || new Date().toISOString();

    // Extract workspace/project info from raw fields
    // The LS has multiple formats depending on the API:
    // - getDiagnostics: workspaceFolderUri (string)
    // - GetAllCascadeTrajectories: workspaces[{workspaceFolderAbsoluteUri}]
    let workspaceRaw = raw.workspaceFolderUri
      || raw.workspaceUri
      || raw.workingDirectory
      || raw.repoName
      || '';

    // Check 'workspaces' array (from GetAllCascadeTrajectories)
    if (!workspaceRaw && Array.isArray(raw.workspaces) && raw.workspaces.length > 0) {
      workspaceRaw = raw.workspaces[0].workspaceFolderAbsoluteUri || '';
    }
    // Check trajectoryMetadata.workspaces
    if (!workspaceRaw && raw.trajectoryMetadata?.workspaces?.[0]) {
      workspaceRaw = raw.trajectoryMetadata.workspaces[0].workspaceFolderAbsoluteUri || '';
    }

    const project = projectFromWorkspaceUri(
      typeof workspaceRaw === 'string' ? workspaceRaw : ''
    );

    // Check for user-set title override (persisted from rename)
    const overridePath = path.join(getBrainDirectory(), id, 'title_override.txt');
    try {
      const overrideContent = await fs.readFile(overridePath, 'utf8');
      if (overrideContent.trim()) {
        title = overrideContent.trim();
      }
    } catch (_) { /* no override exists */ }

    if (!title) {
      title = `Conversation ${id.substring(0, 8)}`;
    }

    conversations.push({
      id,
      title,
      createdAt: lastMod,
      lastModified: lastMod,
      stepCount,
      artifactPath: path.join(getBrainDirectory(), id),
      hasTranscript: true,
      project,
    });
  }

  // Sort by lastModified descending
  return conversations.sort((a, b) =>
    new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime()
  );
}

async function _getConversationsFromFilesystem(): Promise<Conversation[]> {
  const brainDir = getBrainDirectory();
  const conversationsDir = getConversationsDirectory();
  const conversations: Conversation[] = [];
  const seenIds = new Set<string>();

  // ── Phase 1: Read .db files (SQLite) from conversations/ directory ─────
  // These contain step counts and workspace URIs extracted from protobuf blobs
  try {
    const dbInfos = await scanAllConversationDBs(conversationsDir);
    for (const dbInfo of dbInfos) {
      seenIds.add(dbInfo.id);
      const convPath = path.join(brainDir, dbInfo.id);
      const transcriptPath = path.join(convPath, '.system_generated', 'logs', 'transcript.jsonl');

      // Get timestamps from brain directory or conversation file
      let lastModified = new Date().toISOString();
      let createdAt = new Date().toISOString();
      let title = '';
      let project = projectFromWorkspaceUri(dbInfo.workspaceUri);

      // Try transcript for timestamps and title
      const hasTranscript = await fileExists(transcriptPath);
      if (hasTranscript) {
        const stat = await getFileStat(transcriptPath);
        if (stat) {
          lastModified = stat.modifiedAt.toISOString();
          createdAt = stat.createdAt.toISOString();
        }

        // Parse transcript for title and project detection
        const transcriptContent = await safeReadFile(transcriptPath) || '';
        const steps = parseJsonl(transcriptContent);

        // Title from override or first user input
        const titleOverridePath = path.join(convPath, 'title_override.txt');
        try {
          const overrideContent = await fs.readFile(titleOverridePath, 'utf8');
          if (overrideContent.trim()) {
            title = overrideContent.trim();
          }
        } catch (_) { /* no override */ }

        if (!title) {
          const firstUserInput = steps.find(s => s.type === 'USER_INPUT');
          if (firstUserInput && firstUserInput.content) {
            title = firstUserInput.content.replace(/<[^>]*>/g, '').trim();
            if (title.length > 80) {
              title = title.substring(0, 80) + '...';
            }
          }
        }

        // If workspace URI didn't give us a good project, try transcript detection
        if (!project || project === 'unknown') {
          project = detectProject(steps, dbInfo.id);
        }
      } else {
        // No transcript — try to get timestamps from the .db file itself
        try {
          const dbPath = path.join(conversationsDir, `${dbInfo.id}.db`);
          const dbStat = await getFileStat(dbPath);
          if (dbStat) {
            lastModified = dbStat.modifiedAt.toISOString();
            createdAt = dbStat.createdAt.toISOString();
          }
        } catch (_) {}

        // Try title override from brain dir
        const titleOverridePath = path.join(convPath, 'title_override.txt');
        try {
          const overrideContent = await fs.readFile(titleOverridePath, 'utf8');
          if (overrideContent.trim()) {
            title = overrideContent.trim();
          }
        } catch (_) { /* no override */ }
      }

      if (!title) {
        title = `Conversation ${dbInfo.id.substring(0, 8)}`;
      }

      conversations.push({
        id: dbInfo.id,
        title,
        createdAt,
        lastModified,
        stepCount: dbInfo.stepCount,
        artifactPath: convPath,
        hasTranscript: await fileExists(transcriptPath),
        project: project || 'unknown',
      });
    }
  } catch (err: any) {
    console.warn('[ACC] Failed to scan .db files:', err?.message);
  }

  // ── Phase 2: Discover .pb files not already found as .db ───────────────
  // These are older-format conversations. We can't read the protobuf directly
  // but we can discover them and pair with brain directory data.
  try {
    const allIds = await listAllConversationIds(conversationsDir);
    for (const id of allIds) {
      if (seenIds.has(id)) continue;
      seenIds.add(id);

      const convPath = path.join(brainDir, id);
      const transcriptPath = path.join(convPath, '.system_generated', 'logs', 'transcript.jsonl');

      let lastModified = new Date().toISOString();
      let createdAt = new Date().toISOString();
      let title = '';
      let stepCount = 0;
      let project = '';

      // Try transcript for data
      const hasTranscript = await fileExists(transcriptPath);
      if (hasTranscript) {
        const stat = await getFileStat(transcriptPath);
        if (stat) {
          lastModified = stat.modifiedAt.toISOString();
          createdAt = stat.createdAt.toISOString();
        }
        const transcriptContent = await safeReadFile(transcriptPath) || '';
        const steps = parseJsonl(transcriptContent);
        stepCount = steps.length;

        const titleOverridePath = path.join(convPath, 'title_override.txt');
        try {
          const overrideContent = await fs.readFile(titleOverridePath, 'utf8');
          if (overrideContent.trim()) title = overrideContent.trim();
        } catch (_) {}

        if (!title) {
          const firstUserInput = steps.find(s => s.type === 'USER_INPUT');
          if (firstUserInput?.content) {
            title = firstUserInput.content.replace(/<[^>]*>/g, '').trim();
            if (title.length > 80) title = title.substring(0, 80) + '...';
          }
        }

        project = detectProject(steps, id);
      } else {
        // No transcript — get timestamps from .pb file
        try {
          const pbPath = path.join(conversationsDir, `${id}.pb`);
          const pbStat = await getFileStat(pbPath);
          if (pbStat) {
            lastModified = pbStat.modifiedAt.toISOString();
            createdAt = pbStat.createdAt.toISOString();
          }
        } catch (_) {}

        // Count steps from brain dir if available
        try {
          const stepsDir = path.join(convPath, '.system_generated', 'steps');
          const stepEntries = await safeReadDir(stepsDir);
          stepCount = stepEntries.length;
        } catch (_) {}

        // Try title override
        const titleOverridePath = path.join(convPath, 'title_override.txt');
        try {
          const overrideContent = await fs.readFile(titleOverridePath, 'utf8');
          if (overrideContent.trim()) title = overrideContent.trim();
        } catch (_) {}
      }

      if (!title) {
        title = `Conversation ${id.substring(0, 8)}`;
      }
      if (!project) {
        const wsFolder = vscode.workspace.workspaceFolders?.[0];
        project = wsFolder?.name || 'unknown';
      }

      conversations.push({
        id,
        title,
        createdAt,
        lastModified,
        stepCount,
        artifactPath: convPath,
        hasTranscript,
        project,
      });
    }
  } catch (err: any) {
    console.warn('[ACC] Failed to scan .pb files:', err?.message);
  }

  // Filter out unviewable conversations:
  // - No transcript AND generic "Conversation XXXX" title → can't display anything meaningful
  // - These are old .pb-only entries with no readable data; clicking them causes errors
  const viewable = conversations.filter(c => {
    // Keep conversations that have a transcript
    if (c.hasTranscript) return true;
    // Keep conversations that have a real title (not the generic fallback)
    if (!c.title.startsWith('Conversation ') || c.title.length > 25) return true;
    // Keep conversations that have meaningful step data from the DB
    if (c.stepCount > 0) return true;
    // Filter out the rest — they're unviewable
    return false;
  });

  console.log(`[ACC] Discovered ${conversations.length} conversations, ${viewable.length} viewable`);

  // Sort by lastModified descending (most recent first)
  return viewable.sort((a, b) => {
    return new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime();
  });
}

// ---------------------------------------------------------------------------
// Conversation Detail (SDK + filesystem hybrid)
// ---------------------------------------------------------------------------

export async function getConversationDetail(id: string): Promise<ConversationDetail | null> {
  const brainDir = getBrainDirectory();
  const convPath = path.join(brainDir, id);
  const transcriptPath = path.join(convPath, '.system_generated', 'logs', 'transcript.jsonl');

  const hasTranscript = await fileExists(transcriptPath);
  if (!hasTranscript) {
    return null;
  }

  const stat = await getFileStat(transcriptPath);
  const lastModified = stat?.modifiedAt.toISOString() || new Date().toISOString();
  const createdAt = stat?.createdAt.toISOString() || new Date().toISOString();

  const transcriptContent = await safeReadFile(transcriptPath) || '';
  const steps = parseJsonl(transcriptContent);
  const stepCount = steps.length;

  // Get title: user override (highest priority) → SDK → transcript fallback
  let title = '';

  // Priority 1: User-set title override (from rename)
  const titleOverridePath = path.join(convPath, 'title_override.txt');
  try {
    const overrideContent = await fs.readFile(titleOverridePath, 'utf8');
    if (overrideContent.trim()) {
      title = overrideContent.trim();
    }
  } catch (_) { /* no override */ }

  // Priority 2: SDK title from ITrajectoryEntry
  if (!title && isSDKAvailable()) {
    try {
      const sessions = await getSDK().cascade.getSessions();
      const match = sessions.find((s: any) => s.id === id);
      if (match) {
        title = (match as any).title || '';
      }
    } catch (_) {}
  }

  // Priority 3: First USER_INPUT from transcript
  if (!title) {
    const firstUserInput = steps.find(s => s.type === 'USER_INPUT');
    if (firstUserInput && firstUserInput.content) {
      title = firstUserInput.content.replace(/<[^>]*>/g, '').trim();
      if (title.length > 80) {
        title = title.substring(0, 80) + '...';
      }
    }
  }
  if (!title) {
    title = `Conversation ${id.substring(0, 8)}`;
  }

  // Find all actual artifact/generated files in the conversation folder
  const dirFiles = await safeReadDir(convPath);
  const artifacts = dirFiles.filter(file => {
    return file !== '.system_generated' && !file.startsWith('.');
  });

  // Count stats
  let userMessages = 0;
  let agentMessages = 0;
  let toolCalls = 0;

  for (const step of steps) {
    if (step.type === 'USER_INPUT') {
      userMessages++;
    } else if (step.source === 'MODEL' || step.source === 'PLANNER_RESPONSE') {
      agentMessages++;
    }

    if (step.tool_calls && step.tool_calls.length > 0) {
      toolCalls += step.tool_calls.length;
    }
  }

  const project = detectProject(steps, id);

  return {
    id,
    title,
    createdAt,
    lastModified,
    stepCount,
    artifactPath: convPath,
    hasTranscript: true,
    steps,
    artifacts,
    userMessages,
    agentMessages,
    toolCalls,
    project
  };
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export async function searchConversations(query: string): Promise<Conversation[]> {
  const all = await getConversations();
  if (!query) {
    return all;
  }
  const lowerQuery = query.toLowerCase();
  return all.filter(c => c.title.toLowerCase().includes(lowerQuery));
}

// ---------------------------------------------------------------------------
// Internal: Resolve local model ID string to SDK numeric model enum
// ---------------------------------------------------------------------------

/**
 * Maps our local model ID string (e.g. 'gemini-3.5-flash-medium') to the
 * SDK's numeric Models enum value.  Returns undefined if mapping fails.
 */
function _resolveModelNumeric(localModelId: string): number | undefined {
  try {
    const sdkModels = require('antigravity-sdk').Models;
    if (!sdkModels) { return undefined; }

    const MAP: Record<string, string> = {
      'gemini-3.5-flash-medium': 'GEMINI_FLASH',
      'gemini-3.5-flash-high': 'GEMINI_FLASH_HIGH',
      'gemini-3.5-flash-low': 'GEMINI_FLASH_LOW',
      'gemini-3.1-pro-low': 'GEMINI_PRO',
      'gemini-3.1-pro-high': 'GEMINI_PRO_HIGH',
      'claude-sonnet-4.6': 'CLAUDE_SONNET',
      'claude-opus-4.6': 'CLAUDE_OPUS',
      'gpt-oss-120b': 'GPT_OSS',
    };

    const sdkKey = MAP[localModelId];
    if (sdkKey && sdkModels[sdkKey] !== undefined) {
      return sdkModels[sdkKey] as number;
    }
  } catch (_) {}
  return undefined;
}

// ---------------------------------------------------------------------------
// Send Message — SDK-first, filesystem fallback
// ---------------------------------------------------------------------------

/**
 * Send a message to a conversation.
 *
 * SDK path: Uses sdk.ls.sendMessage() to send through LS ConnectRPC,
 * then sdk.ls.focusCascade() to switch the UI.
 *
 * Fallback path: Appends a USER_INPUT step to transcript.jsonl directly.
 */
export async function sendConversationMessage(
  id: string,
  prompt: string,
  modelId?: string
): Promise<ConversationDetail | null> {
  if (isSDKAvailable()) {
    try {
      return await _sendMessageViaSDK(id, prompt, modelId);
    } catch (err) {
      console.warn('[ACC] SDK sendMessage failed, falling back to filesystem:', err);
    }
  }
  return _sendMessageViaFilesystem(id, prompt);
}

async function _sendMessageViaSDK(
  id: string,
  prompt: string,
  modelId?: string
): Promise<ConversationDetail | null> {
  const sdk = getSDK();

  // Focus the session so the agent is active on it
  try {
    await sdk.ls.focusCascade(id);
  } catch (_) {
    try { await sdk.cascade.focusSession(id); } catch (__) {}
  }

  // Send via LSBridge (targeted to specific cascade)
  try {
    const sdkModelNum = modelId ? _resolveModelNumeric(modelId) : undefined;
    const msgOpts: any = {
      cascadeId: id,
      text: prompt,
    };
    if (sdkModelNum !== undefined) {
      msgOpts.model = sdkModelNum;
    }
    await sdk.ls.sendMessage(msgOpts);
  } catch (_lsErr) {
    // Fallback to cascade.sendPrompt (sends to active chat)
    await sdk.cascade.sendPrompt(prompt);
  }

  // Give a small delay for the step to be written
  await new Promise(resolve => setTimeout(resolve, 200));
  return getConversationDetail(id);
}

async function _sendMessageViaFilesystem(
  id: string,
  prompt: string
): Promise<ConversationDetail | null> {
  const brainDir = getBrainDirectory();
  const transcriptPath = path.join(brainDir, id, '.system_generated', 'logs', 'transcript.jsonl');

  const hasTranscript = await fileExists(transcriptPath);
  if (!hasTranscript) {
    return null;
  }

  // Read current steps
  const transcriptContent = await safeReadFile(transcriptPath) || '';
  const steps = parseJsonl(transcriptContent);
  const nextIndex = steps.length > 0 ? Math.max(...steps.map(s => s.step_index)) + 1 : 1;

  const newStep: TranscriptStep = {
    step_index: nextIndex,
    source: 'USER_EXPLICIT',
    type: 'USER_INPUT',
    status: 'DONE',
    content: prompt
  };

  // Append new step line
  const line = JSON.stringify(newStep) + '\n';
  await fs.appendFile(transcriptPath, line, 'utf8');

  // Reload and return details
  return getConversationDetail(id);
}

// ---------------------------------------------------------------------------
// Create Conversation — SDK only
// ---------------------------------------------------------------------------

/**
 * Create a new conversation via the SDK.
 * Returns the new cascade ID, or null if SDK is unavailable.
 */
export async function createConversation(
  prompt: string,
  modelId?: string
): Promise<string | null> {
  if (!isSDKAvailable()) {
    return null;
  }

  try {
    const sdk = getSDK();
    const sdkModelNum = modelId ? _resolveModelNumeric(modelId) : undefined;

    // Use LSBridge for headless creation (no UI flicker)
    const createOpts: any = { text: prompt };
    if (sdkModelNum !== undefined) {
      createOpts.model = sdkModelNum;
    }
    const cascadeId = await sdk.ls.createCascade(createOpts);
    return cascadeId;
  } catch (err) {
    console.error('[ACC] Failed to create conversation via SDK:', err);

    // Fallback: try cascade.createBackgroundSession
    try {
      const sdk = getSDK();
      const id = await sdk.cascade.createBackgroundSession(prompt);
      return id;
    } catch (err2) {
      console.error('[ACC] Fallback createBackgroundSession also failed:', err2);
      return null;
    }
  }
}

// ---------------------------------------------------------------------------
// Focus Conversation — SDK only
// ---------------------------------------------------------------------------

/**
 * Focus a conversation in the native Antigravity UI.
 */
export async function focusConversation(id: string): Promise<boolean> {
  if (!isSDKAvailable()) {
    return false;
  }

  try {
    const sdk = getSDK();
    // Use LSBridge focusCascade (preferred — direct LS call)
    try {
      await sdk.ls.focusCascade(id);
    } catch (_) {
      await sdk.cascade.focusSession(id);
    }
    return true;
  } catch (err) {
    console.error('[ACC] Failed to focus conversation:', err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Rename Conversation — SDK native (ConversationAnnotations)
// ---------------------------------------------------------------------------

/**
 * Rename a conversation using direct ConnectRPC broadcast to ALL LS instances.
 *
 * Architecture insight: Each Antigravity IDE workspace window has its own LS.
 * The SDK only connects to the LS of the workspace the ACC was opened from.
 * If the conversation belongs to a different workspace, the SDK rename
 * succeeds silently but doesn't actually change anything — only the
 * owning LS can apply the rename.
 *
 * Strategy:
 * 1. Direct ConnectRPC broadcast → sends rename to ALL running LS instances
 *    (the owning LS will apply it; others ignore it — harmless)
 * 2. SDK ls.setTitle() → supplementary (for the current workspace LS)
 * 3. integration.titles → supplementary (Windows renderer-side proxy)
 * 4. title_override.txt → filesystem cache (always written as backup)
 */
export async function renameConversation(id: string, newTitle: string): Promise<void> {
  const trimmedTitle = newTitle.trim();
  let rpcRenameSucceeded = false;

  // Strategy 1 (Primary): Direct ConnectRPC broadcast to ALL LS instances
  // This is the only strategy that works cross-workspace
  console.log(`[ACC] Renaming "${id.substring(0, 8)}..." to "${trimmedTitle}" via multi-LS broadcast...`);
  rpcRenameSucceeded = await _directConnectRPCRename(id, trimmedTitle);

  // Strategy 2 (Supplementary): SDK-based rename for current workspace
  // This may have already succeeded above via the broadcast, but calling it
  // through the SDK path ensures the SDK's internal state stays consistent
  if (isSDKAvailable()) {
    const sdk = getSDK();

    if (sdk.ls?.isReady) {
      try {
        await sdk.ls.setTitle(id, trimmedTitle);
        console.log(`[ACC] SDK ls.setTitle() also succeeded (current workspace LS)`);
      } catch (err: any) {
        // Expected for cross-workspace conversations — the SDK LS doesn't own them
        console.log(`[ACC] SDK ls.setTitle() skipped/failed (expected for cross-workspace): ${err?.message || ''}`);
      }
    }

    // Strategy 3: integration.titles (supplementary, Windows-only effective)
    if (sdk.integration?.titles) {
      try {
        sdk.integration.titles.rename(id, trimmedTitle);
      } catch (_) {}
    }
  }

  // Strategy 4: Always write filesystem override
  const brainDir = getBrainDirectory();
  const overridePath = path.join(brainDir, id, 'title_override.txt');
  await fs.writeFile(overridePath, trimmedTitle, 'utf8');

  if (rpcRenameSucceeded) {
    console.log(`[ACC] ✅ Rename complete (multi-LS broadcast + filesystem)`);
  } else {
    console.log(`[ACC] Renamed conversation ${id} via filesystem fallback only (no LS instance accepted)`);
  }
}

/**
 * Delete a conversation — removes data from brain/ and conversations/ directories.
 * This is a destructive operation: removes the transcript, artifacts, and storage files.
 */
export async function deleteConversation(id: string): Promise<void> {
  const brainDir = getBrainDirectory();
  const conversationsDir = getConversationsDirectory();

  // 1. Remove brain directory (transcript, artifacts, steps)
  const brainPath = path.join(brainDir, id);
  try {
    await fs.rm(brainPath, { recursive: true, force: true });
    console.log(`[ACC] Deleted brain data for ${id}`);
  } catch (err: any) {
    console.warn(`[ACC] Failed to delete brain dir for ${id}:`, err?.message);
  }

  // 2. Remove .db file
  const dbPath = path.join(conversationsDir, `${id}.db`);
  try {
    await fs.unlink(dbPath);
    console.log(`[ACC] Deleted .db file for ${id}`);
  } catch (_) { /* may not exist */ }

  // 3. Remove .db-shm and .db-wal (SQLite WAL files)
  try { await fs.unlink(`${dbPath}-shm`); } catch (_) {}
  try { await fs.unlink(`${dbPath}-wal`); } catch (_) {}

  // 4. Remove .pb file
  const pbPath = path.join(conversationsDir, `${id}.pb`);
  try {
    await fs.unlink(pbPath);
    console.log(`[ACC] Deleted .pb file for ${id}`);
  } catch (_) { /* may not exist */ }

  console.log(`[ACC] ✅ Conversation ${id} fully deleted`);
}

/**
 * Discover ALL running LS instances and their ConnectRPC endpoints.
 *
 * Each Antigravity IDE workspace window spawns its own Language Server process.
 * Each LS only "knows about" conversations created within its own workspace.
 * To rename a conversation from a different workspace, we need to find the
 * LS that owns it — so we discover ALL running LS instances.
 *
 * Key insight: The LS has multiple ports:
 *   - extension_server_port → IPC only, does NOT serve ConnectRPC endpoints (returns 404)
 *   - ConnectRPC ports      → dynamically assigned, found via lsof, serve UpdateConversationAnnotations
 *
 * TWO CSRF tokens exist per LS instance:
 *   --csrf_token              → for ConnectRPC endpoints
 *   --extension_server_csrf_token → for extension_server_port only
 */

interface LSConnection {
  port: number;
  csrfToken: string;
  useTls: boolean;
  pid: number;
}

/**
 * Discover ALL running LS ConnectRPC connections.
 * Returns an array of all valid connections (one per LS instance),
 * sorted with the current-workspace LS first.
 */
async function _discoverAllLSConnections(): Promise<LSConnection[]> {
  const connections: LSConnection[] = [];
  try {
    const { execSync } = require('child_process');

    // Find all language_server processes (macOS binary: language_server_macos_arm)
    const psOutput = execSync(
      `ps aux | grep 'language_server_macos' | grep -v grep`,
      { encoding: 'utf8', timeout: 3000 }
    );

    if (!psOutput.trim()) {
      console.warn('[ACC] No LS process found');
      return [];
    }

    const lines = psOutput.trim().split('\n');
    const wsFolder = vscode.workspace.workspaceFolders?.[0]?.uri?.fsPath || '';
    const wsKey = wsFolder.replace(/\//g, '_');

    // Sort: workspace-specific match first, then others
    const sortedLines = [...lines].sort((a, b) => {
      const aMatch = wsKey && a.includes(wsKey) ? 0 : 1;
      const bMatch = wsKey && b.includes(wsKey) ? 0 : 1;
      return aMatch - bMatch;
    });

    const http = require('http');
    const https = require('https');

    // Try each LS instance
    for (const line of sortedLines) {
      const pidMatch = line.match(/\S+\s+(\d+)/);
      const csrfMatch = line.match(/--csrf_token\s+([^\s]+)/);
      const extPortMatch = line.match(/--extension_server_port\s+(\d+)/);

      const pid = pidMatch ? parseInt(pidMatch[1], 10) : 0;
      const connectCsrf = csrfMatch?.[1] || '';
      const extPort = extPortMatch ? parseInt(extPortMatch[1], 10) : 0;

      if (!pid || !connectCsrf) continue;

      console.log(`[ACC] Discovering LS: PID=${pid}, csrf=${connectCsrf.substring(0, 8)}..., extPort=${extPort}`);

      // Find ConnectRPC port via lsof (NOT the extension_server_port)
      try {
        const lsofOutput = execSync(
          `lsof -anP -iTCP -sTCP:LISTEN -p ${pid} 2>/dev/null`,
          { encoding: 'utf8', timeout: 3000 }
        );
        const lsofLines = lsofOutput.trim().split('\n').filter((l: string) => l.includes('LISTEN'));
        const ports: number[] = [];
        for (const ll of lsofLines) {
          const pm = ll.match(/:(\d+)\s/);
          if (pm) {
            const p = parseInt(pm[1], 10);
            if (p !== extPort) {
              ports.push(p);
            }
          }
        }

        console.log(`[ACC] ConnectRPC candidate ports for PID ${pid} (excl ext ${extPort}): [${ports.join(', ')}]`);

        if (ports.length > 0) {
          // Check HTTP first, then HTTPS
          let found = false;
          for (const port of ports) {
            const result = await _probePort(http, port, connectCsrf);
            if (result === 200) {
              console.log(`[ACC] ✅ Port ${port} is ConnectRPC (HTTP) from PID ${pid}`);
              connections.push({ port, csrfToken: connectCsrf, useTls: false, pid });
              found = true;
              break; // One port per LS instance is sufficient
            }
          }
          if (!found) {
            for (const port of ports) {
              const result = await _probePort(https, port, connectCsrf, true);
              if (result === 200) {
                console.log(`[ACC] ✅ Port ${port} is ConnectRPC (HTTPS) from PID ${pid}`);
                connections.push({ port, csrfToken: connectCsrf, useTls: true, pid });
                break;
              }
            }
          }
        }
      } catch (lsofErr: any) {
        console.warn(`[ACC] lsof failed for PID ${pid}:`, lsofErr?.message);
      }
    }

    console.log(`[ACC] Discovered ${connections.length} LS ConnectRPC endpoint(s)`);
    return connections;
  } catch (err: any) {
    console.warn('[ACC] LS discovery failed:', err?.message || err);
    return connections;
  }
}

/**
 * Backward-compat wrapper: returns the first (best) LS connection.
 * Used by the SDK CSRF-refresh path.
 */
async function _discoverLSConnection(): Promise<{port: number; csrfToken: string; useTls: boolean} | null> {
  const all = await _discoverAllLSConnections();
  return all.length > 0 ? all[0] : null;
}

/**
 * Direct raw HTTP ConnectRPC rename — bypasses SDK entirely.
 * Discovers ALL LS instances and sends the rename to EVERY one.
 *
 * Why all? Each LS only knows about conversations from its own workspace.
 * We don't know which LS owns this conversation, so we send the rename
 * request to all of them. The owning LS will apply it; others will
 * silently ignore or return an error (harmless).
 */
async function _directConnectRPCRename(conversationId: string, title: string): Promise<boolean> {
  const allConnections = await _discoverAllLSConnections();
  if (allConnections.length === 0) {
    console.warn('[ACC] No LS connections for direct rename');
    return false;
  }

  console.log(`[ACC] Direct rename: sending to ${allConnections.length} LS instance(s)...`);

  // ConnectRPC payload for UpdateConversationAnnotations
  const payload = JSON.stringify({
    conversation_id: conversationId,
    annotations: { title },
    merge: true,
  });

  // Fire rename at ALL LS instances in parallel
  const results = await Promise.allSettled(
    allConnections.map(conn => _sendRenameToLS(conn, conversationId, payload))
  );

  // Check if any succeeded
  let anySucceeded = false;
  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const conn = allConnections[i];
    if (result.status === 'fulfilled' && result.value) {
      console.log(`[ACC] ✅ Direct rename succeeded on LS PID ${conn.pid} (port ${conn.port})`);
      anySucceeded = true;
    } else {
      const reason = result.status === 'rejected' ? result.reason?.message : 'returned false';
      console.log(`[ACC] LS PID ${conn.pid} (port ${conn.port}): rename not applied (${reason})`);
    }
  }

  return anySucceeded;
}

/**
 * Send a single rename request to one LS instance.
 */
function _sendRenameToLS(conn: LSConnection, conversationId: string, payload: string): Promise<boolean> {
  const httpModule = conn.useTls ? require('https') : require('http');
  const protocol = conn.useTls ? 'https' : 'http';

  return new Promise((resolve) => {
    try {
      const req = httpModule.request(
        `${protocol}://127.0.0.1:${conn.port}/exa.language_server_pb.LanguageServerService/UpdateConversationAnnotations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload),
            'x-codeium-csrf-token': conn.csrfToken,
          },
          rejectUnauthorized: false,
          timeout: 5000,
        },
        (res: any) => {
          let body = '';
          res.on('data', (chunk: string) => { body += chunk; });
          res.on('end', () => {
            if (res.statusCode === 200) {
              resolve(true);
            } else {
              console.log(`[ACC] LS port ${conn.port} rename returned ${res.statusCode}: ${body.substring(0, 100)}`);
              resolve(false);
            }
          });
        }
      );
      req.on('error', (err: any) => {
        console.log(`[ACC] LS port ${conn.port} rename error: ${err?.message}`);
        resolve(false);
      });
      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.write(payload);
      req.end();
    } catch (err: any) {
      console.log(`[ACC] LS port ${conn.port} rename exception: ${err?.message}`);
      resolve(false);
    }
  });
}

/**
 * Probe a port to check if it serves ConnectRPC endpoints.
 * Sends a POST to GetUserStatus — the ConnectRPC port returns 200,
 * LSP port returns 400, wrong CSRF returns 403.
 */
function _probePort(httpModule: any, port: number, csrfToken: string, useTls: boolean = false): Promise<number> {
  const protocol = useTls ? 'https' : 'http';
  return new Promise((resolve) => {
    try {
      const req = httpModule.request(
        `${protocol}://127.0.0.1:${port}/exa.language_server_pb.LanguageServerService/GetUserStatus`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': 2,
            'x-codeium-csrf-token': csrfToken,
          },
          rejectUnauthorized: false,
          timeout: 2000,
        },
        (res: any) => {
          // Drain the response
          res.on('data', () => {});
          res.on('end', () => resolve(res.statusCode));
        }
      );
      req.on('error', () => resolve(0));
      req.on('timeout', () => { req.destroy(); resolve(0); });
      req.write('{}');
      req.end();
    } catch {
      resolve(0);
    }
  });
}

// ---------------------------------------------------------------------------
// Step Control — SDK only
// ---------------------------------------------------------------------------

/**
 * Accept the current pending code edit step.
 */
export async function acceptStep(): Promise<boolean> {
  if (!isSDKAvailable()) { return false; }
  try { await getSDK().cascade.acceptStep(); return true; } catch (_) { return false; }
}

/**
 * Reject the current pending code edit step.
 */
export async function rejectStep(): Promise<boolean> {
  if (!isSDKAvailable()) { return false; }
  try { await getSDK().cascade.rejectStep(); return true; } catch (_) { return false; }
}

/**
 * Accept the current pending terminal command.
 */
export async function acceptTerminalCommand(): Promise<boolean> {
  if (!isSDKAvailable()) { return false; }
  try { await getSDK().cascade.acceptTerminalCommand(); return true; } catch (_) { return false; }
}

/**
 * Reject the current pending terminal command.
 */
export async function rejectTerminalCommand(): Promise<boolean> {
  if (!isSDKAvailable()) { return false; }
  try { await getSDK().cascade.rejectTerminalCommand(); return true; } catch (_) { return false; }
}

/**
 * Run the current pending terminal command.
 */
export async function runTerminalCommand(): Promise<boolean> {
  if (!isSDKAvailable()) { return false; }
  try { await getSDK().cascade.runTerminalCommand(); return true; } catch (_) { return false; }
}
