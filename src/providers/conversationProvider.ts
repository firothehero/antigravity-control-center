import * as path from 'path';
import * as fs from 'fs/promises';
import { Conversation, ConversationDetail, TranscriptStep } from '../models';
import { getBrainDirectory } from '../utils/paths';
import { getSubDirectories, safeReadFile, getFileStat, fileExists, safeReadDir } from '../utils/fileSystem';
import { parseJsonl } from '../utils/jsonlParser';

function detectProject(steps: TranscriptStep[], id: string): string {
  for (const step of steps) {
    if (step.tool_calls) {
      for (const tc of step.tool_calls) {
        if (tc.arguments) {
          if (tc.arguments.Cwd && typeof tc.arguments.Cwd === 'string') {
            const cwd = tc.arguments.Cwd;
            if (cwd.includes('/tenn/')) {
              const segments = cwd.split('/');
              const tennIdx = segments.indexOf('tenn');
              if (tennIdx !== -1 && segments[tennIdx + 1]) {
                return segments[tennIdx + 1];
              }
            }
            const parts = cwd.split('/');
            return parts[parts.length - 1];
          }
          if (tc.arguments.AbsolutePath && typeof tc.arguments.AbsolutePath === 'string') {
            const file = tc.arguments.AbsolutePath;
            if (file.includes('/firo/')) {
              const segments = file.split('/');
              const firoIdx = segments.indexOf('firo');
              if (firoIdx !== -1 && segments[firoIdx + 1] && segments[firoIdx + 1] !== 'Desktop') {
                if (segments[firoIdx + 1] === 'tenn' && segments[firoIdx + 2]) {
                  return segments[firoIdx + 2];
                }
                return segments[firoIdx + 1];
              }
            }
          }
          if (tc.arguments.TargetFile && typeof tc.arguments.TargetFile === 'string') {
            const file = tc.arguments.TargetFile;
            if (file.includes('/firo/')) {
              const segments = file.split('/');
              const firoIdx = segments.indexOf('firo');
              if (firoIdx !== -1 && segments[firoIdx + 1] && segments[firoIdx + 1] !== 'Desktop') {
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
  return 'firothehero';
}

export async function getConversations(): Promise<Conversation[]> {
  const brainDir = getBrainDirectory();
  const subdirs = await getSubDirectories(brainDir);
  const conversations: Conversation[] = [];
  
  for (const id of subdirs) {
    const convPath = path.join(brainDir, id);
    const transcriptPath = path.join(convPath, '.system_generated', 'logs', 'transcript.jsonl');
    
    const hasTranscript = await fileExists(transcriptPath);
    if (!hasTranscript) {
      continue;
    }
    
    const stat = await getFileStat(transcriptPath);
    const lastModified = stat?.modifiedAt.toISOString() || new Date().toISOString();
    const createdAt = stat?.createdAt.toISOString() || new Date().toISOString();
    
    const transcriptContent = await safeReadFile(transcriptPath) || '';
    const steps = parseJsonl(transcriptContent);
    const stepCount = steps.length;
    
    // Extract title: prefer user-set override, then first USER_INPUT, then UUID
    let title = '';
    const overridePath = path.join(convPath, 'title_override.txt');
    try {
      const overrideContent = await fs.readFile(overridePath, 'utf8');
      if (overrideContent.trim()) {
        title = overrideContent.trim();
      }
    } catch (_) { /* no override exists */ }

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
    
    const project = detectProject(steps, id);
    
    conversations.push({
      id,
      title,
      createdAt,
      lastModified,
      stepCount,
      artifactPath: convPath,
      hasTranscript: true,
      project
    });
  }
  
  // Sort by lastModified descending (most recent first)
  return conversations.sort((a, b) => {
    return new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime();
  });
}

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
  
  let title = '';
  const overridePath = path.join(convPath, 'title_override.txt');
  try {
    const overrideContent = await fs.readFile(overridePath, 'utf8');
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
  if (!title) {
    title = `Conversation ${id.substring(0, 8)}`;
  }
  
  // Find all actual artifact/generated files in the conversation folder (ignoring .system_generated)
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

export async function searchConversations(query: string): Promise<Conversation[]> {
  const all = await getConversations();
  if (!query) {
    return all;
  }
  const lowerQuery = query.toLowerCase();
  return all.filter(c => c.title.toLowerCase().includes(lowerQuery));
}

export async function addConversationMessage(id: string, source: string, type: string, content: string): Promise<ConversationDetail | null> {
  const brainDir = getBrainDirectory();
  const convPath = path.join(brainDir, id);
  const transcriptPath = path.join(convPath, '.system_generated', 'logs', 'transcript.jsonl');
  
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
    source,
    type,
    status: 'DONE',
    content
  };
  
  // Append new step line
  const line = JSON.stringify(newStep) + '\n';
  await fs.appendFile(transcriptPath, line, 'utf8');
  
  // Reload and return details
  return getConversationDetail(id);
}

/**
 * Rename a conversation by writing a title override file.
 *
 * We deliberately do NOT modify Antigravity's protobuf conversation store.
 * Instead we store the custom title in `title_override.txt` inside the
 * brain conversation directory.  The `getConversations` and
 * `getConversationDetail` functions already check for this file.
 */
export async function renameConversation(id: string, newTitle: string): Promise<void> {
  const brainDir = getBrainDirectory();
  const overridePath = path.join(brainDir, id, 'title_override.txt');
  await fs.writeFile(overridePath, newTitle.trim(), 'utf8');
}
