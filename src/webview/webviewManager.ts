import * as vscode from 'vscode';
import * as path from 'path';
import { getWebviewContent } from './getWebviewContent';
import { WebviewMessage } from '../models';
import {
  getConversations,
  getConversationDetail,
  sendConversationMessage,
  renameConversation,
  createConversation,
  focusConversation,
  acceptStep,
  rejectStep,
  acceptTerminalCommand,
  rejectTerminalCommand,
  runTerminalCommand,
} from '../providers/conversationProvider';
import { getMcpServers, getMcpToolDetail } from '../providers/mcpProvider';
import { getAllSkills, getSkillDetail } from '../providers/skillProvider';
import { getAgents } from '../providers/agentProvider';
import { getRules } from '../providers/ruleProvider';
import { getWorkflows } from '../providers/workflowProvider';
import { getKnowledgeItems, getKnowledgeArtifact } from '../providers/knowledgeProvider';
import { directoryExists, fileExists } from '../utils/fileSystem';
import { getDataDirectory, getBrainDirectory } from '../utils/paths';
import { getModelCatalog, getDefaultModel } from '../services/modelCatalog';
import { isSDKAvailable, getSDKInitError } from '../services/sdkService';
import { SDKMonitorService } from '../services/sdkMonitorService';
import { getAgentPreferences, getSystemDiagnostics } from '../services/preferencesService';

// Legacy fallback import — only used when SDK is not available
import { ConversationWatcher } from '../services/conversationWatcher';

export class WebviewManager {
  private _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private _onDidDisposeEmitter = new vscode.EventEmitter<void>();
  public readonly onDidDispose = this._onDidDisposeEmitter.event;

  /** SDK-based real-time event monitor (primary) */
  private _sdkMonitor: SDKMonitorService | null = null;

  /** Legacy file-based transcript watcher (fallback) */
  private _legacyWatcher: ConversationWatcher | null = null;

  /** Track which conversation IDs are actively watched (legacy mode) */
  private _watchedConversations: Set<string> = new Set();

  /** Periodic title sync timer (IDE → ACC reverse sync) */
  private _titleSyncTimer: ReturnType<typeof setInterval> | null = null;
  /** Title cache for change detection */
  private _titleCache: Map<string, string> = new Map();

  constructor(private readonly _context: vscode.ExtensionContext) {
    const extensionUri = _context.extensionUri;

    this._panel = vscode.window.createWebviewPanel(
      'controlCenter',
      '⚡ Antigravity Control Center',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'media')
        ]
      }
    );

    // Set panel icon
    const iconUri = vscode.Uri.joinPath(extensionUri, 'media', 'icons', 'acc_logo.png');
    this._panel.iconPath = {
      light: iconUri,
      dark: iconUri
    };

    // Set HTML content
    this._panel.webview.html = getWebviewContent(this._panel.webview, extensionUri);

    // Initialize real-time monitoring
    this._initializeMonitoring();

    // Wire up event listeners
    this._panel.webview.onDidReceiveMessage(
      message => this._handleMessage(message),
      null,
      this._disposables
    );

    this._panel.onDidDispose(
      () => this.dispose(),
      null,
      this._disposables
    );
  }

  public reveal() {
    this._panel.reveal(vscode.ViewColumn.One);
  }

  // ── Monitoring Setup ──────────────────────────────────────────────────────

  private _initializeMonitoring(): void {
    // ALWAYS start the legacy filesystem watcher — it provides actual step
    // content for real-time chat rendering. The SDK monitor only notifies
    // about step count changes (no content), session switches, and new convos.
    this._legacyWatcher = new ConversationWatcher((event) => {
      this._postMessage({
        type: 'stream:conversationSteps',
        payload: {
          id: event.conversationId,
          newSteps: event.newSteps,
          totalStepCount: event.totalStepCount,
        },
      } as any);
    });
    console.log('[ACC] Filesystem watcher initialized for real-time step content');

    if (isSDKAvailable()) {
      // Additionally: SDK-based event monitoring for session-level events
      this._sdkMonitor = new SDKMonitorService({
        onStepCountChanged: (_event) => {
          // SDK tells us step count changed but doesn't provide content.
          // The filesystem watcher will fire with actual content shortly
          // after. We only use this to update metadata like step counts.
        },
        onActiveSessionChanged: (event) => {
          this._postMessage({
            type: 'stream:activeSessionChanged',
            payload: {
              id: event.sessionId,
              title: event.title,
            },
          } as any);
        },
        onNewConversation: () => {
          this._postMessage({
            type: 'stream:newConversation',
            payload: {},
          } as any);
        },
        onStateChanged: (event) => {
          this._postMessage({
            type: 'stream:stateChanged',
            payload: event,
          } as any);
        },
      });
      this._sdkMonitor.start();
      console.log('[ACC] SDK EventMonitor started for session-level events');
    }

    // Title sync polling — detects title changes made in the IDE
    // (e.g., when user renames a conversation directly in Antigravity)
    this._titleSyncTimer = setInterval(() => this._pollTitleChanges(), 10_000);
    console.log('[ACC] Title sync polling started (10s interval)');
  }

  /**
   * Poll for title changes from the SDK/LS.
   * Compares fetched titles against cached ones and pushes
   * incremental updates to the webview.
   */
  private async _pollTitleChanges(): Promise<void> {
    try {
      const conversations = await getConversations();
      const updates: { id: string; title: string; project?: string }[] = [];

      for (const conv of conversations) {
        const cached = this._titleCache.get(conv.id);
        if (cached !== undefined && cached !== conv.title) {
          updates.push({ id: conv.id, title: conv.title, project: conv.project });
        }
        this._titleCache.set(conv.id, conv.title);
      }

      if (updates.length > 0) {
        console.log(`[ACC] Title sync: ${updates.length} title(s) changed`);
        this._postMessage({
          type: 'data:titleUpdates',
          payload: updates,
        } as any);
      }
    } catch (err: any) {
      // Silent — polling failure shouldn't spam logs
    }
  }

  // ── Message Handler ────────────────────────────────────────────────────────

  private async _handleMessage(message: WebviewMessage) {
    try {
      switch (message.type) {

        // ── SDK Status ──────────────────────────────────────────────────
        case 'request:sdkStatus': {
          this._postMessage({
            type: 'data:sdkStatus',
            payload: {
              available: isSDKAvailable(),
              error: getSDKInitError(),
              mode: isSDKAvailable() ? 'sdk' : 'filesystem',
            },
          } as any);
          break;
        }

        // ── Conversations ────────────────────────────────────────────────
        case 'request:conversations': {
          const list = await getConversations();
          this._postMessage({ type: 'data:conversations', payload: list });
          break;
        }

        case 'request:conversationDetail': {
          const id = message.payload as string;
          const detail = await getConversationDetail(id);
          if (detail) {
            this._postMessage({ type: 'data:conversationDetail', payload: detail });
            // Start watching this file for real-time streaming updates
            this._startLegacyWatching(id);
          } else {
            this._postMessage({ type: 'error:conversationDetail', payload: 'Conversation log not found.' });
          }
          break;
        }

        case 'request:watchConversation': {
          const id = message.payload as string;
          this._startLegacyWatching(id);
          break;
        }

        case 'request:unwatchConversation': {
          const id = message.payload as string;
          this._legacyWatcher?.unwatch(id);
          this._watchedConversations.delete(id);
          break;
        }

        // ── Model Catalog ────────────────────────────────────────────────
        case 'request:modelCatalog': {
          const models = getModelCatalog();
          const defaultModel = getDefaultModel();
          this._postMessage({
            type: 'data:modelCatalog',
            payload: { models, defaultModel },
          } as any);
          break;
        }

        // ── Send Message ─────────────────────────────────────────────────
        case 'request:sendMessage': {
          const { id, prompt, model } = message.payload;
          const detail = await sendConversationMessage(id, prompt, model);
          if (detail) {
            this._postMessage({ type: 'data:conversationDetail', payload: detail });
          }
          break;
        }

        // ── Create Conversation (SDK) ────────────────────────────────────
        case 'request:createConversation': {
          const { prompt, model } = message.payload;
          const newId = await createConversation(prompt, model);
          if (newId) {
            this._postMessage({
              type: 'action:createConversationSuccess',
              payload: { id: newId },
            } as any);
            // Refresh the conversation list
            const list = await getConversations();
            this._postMessage({ type: 'data:conversations', payload: list });
          } else {
            this._postMessage({
              type: 'error:conversations',
              payload: 'Failed to create conversation. SDK may not be available.',
            });
          }
          break;
        }

        // ── Focus Conversation (SDK) ─────────────────────────────────────
        case 'request:focusConversation': {
          const focusId = message.payload as string;
          const focused = await focusConversation(focusId);
          this._postMessage({
            type: 'action:focusConversationSuccess',
            payload: { id: focusId, success: focused },
          } as any);
          break;
        }

        // ── Step Control (SDK) ───────────────────────────────────────────
        case 'request:acceptStep': {
          const success = await acceptStep();
          this._postMessage({ type: 'action:stepControlResult', payload: { action: 'acceptStep', success } } as any);
          break;
        }
        case 'request:rejectStep': {
          const success = await rejectStep();
          this._postMessage({ type: 'action:stepControlResult', payload: { action: 'rejectStep', success } } as any);
          break;
        }
        case 'request:acceptTerminalCommand': {
          const success = await acceptTerminalCommand();
          this._postMessage({ type: 'action:stepControlResult', payload: { action: 'acceptTerminalCommand', success } } as any);
          break;
        }
        case 'request:rejectTerminalCommand': {
          const success = await rejectTerminalCommand();
          this._postMessage({ type: 'action:stepControlResult', payload: { action: 'rejectTerminalCommand', success } } as any);
          break;
        }
        case 'request:runTerminalCommand': {
          const success = await runTerminalCommand();
          this._postMessage({ type: 'action:stepControlResult', payload: { action: 'runTerminalCommand', success } } as any);
          break;
        }

        // ── Agent Preferences (SDK) ──────────────────────────────────────
        case 'request:agentPreferences': {
          const prefs = await getAgentPreferences();
          this._postMessage({
            type: 'data:agentPreferences',
            payload: prefs,
          } as any);
          break;
        }

        // ── System Diagnostics (SDK) ─────────────────────────────────────
        case 'request:systemDiagnostics': {
          const diag = await getSystemDiagnostics();
          this._postMessage({
            type: 'data:systemDiagnostics',
            payload: diag,
          } as any);
          break;
        }

        // ── Rename Conversation ──────────────────────────────────────────
        case 'request:renameConversation': {
          const { id, newTitle } = message.payload;
          await renameConversation(id, newTitle);
          const list = await getConversations();
          this._postMessage({ type: 'data:conversations', payload: list });
          this._postMessage({
            type: 'action:renameSuccess',
            payload: { id, newTitle },
          } as any);
          break;
        }

        // ── MCP Servers ──────────────────────────────────────────────────
        case 'request:mcpServers': {
          const servers = await getMcpServers();
          this._postMessage({ type: 'data:mcpServers', payload: servers });
          break;
        }

        case 'request:mcpToolDetail': {
          const { serverName, toolName } = message.payload;
          const detail = await getMcpToolDetail(serverName, toolName);
          if (detail) {
            this._postMessage({ type: 'data:mcpToolDetail', payload: { serverName, tool: detail } });
          } else {
            this._postMessage({ type: 'error:mcpServers', payload: 'Tool schema not found.' });
          }
          break;
        }

        // ── Skills / Agents / Rules / Workflows / Knowledge ──────────────
        case 'request:skills': {
          const skills = await getAllSkills();
          this._postMessage({ type: 'data:skills', payload: skills });
          break;
        }

        case 'request:agents': {
          const agents = await getAgents();
          this._postMessage({ type: 'data:agents', payload: agents });
          break;
        }

        case 'request:rules': {
          const rules = await getRules();
          this._postMessage({ type: 'data:rules', payload: rules });
          break;
        }

        case 'request:workflows': {
          const workflows = await getWorkflows();
          this._postMessage({ type: 'data:workflows', payload: workflows });
          break;
        }

        case 'request:knowledge': {
          const items = await getKnowledgeItems();
          this._postMessage({ type: 'data:knowledge', payload: items });
          break;
        }

        // ── Settings ─────────────────────────────────────────────────────
        case 'request:settings': {
          const config = vscode.workspace.getConfiguration('controlCenter');
          const openMode = config.get<string>('openMode') || 'webview';
          const defaultTab = config.get<string>('defaultTab') || 'conversations';
          const dataDirectory = getDataDirectory();
          const exists = await directoryExists(dataDirectory);

          this._postMessage({
            type: 'data:settings',
            payload: {
              openMode,
              defaultTab,
              dataDirectory,
              directoryExists: exists,
              sdkAvailable: isSDKAvailable(),
              sdkError: getSDKInitError(),
            },
          });
          break;
        }

        case 'request:saveSettings': {
          const { openMode, defaultTab, dataDirectory } = message.payload;
          const config = vscode.workspace.getConfiguration('controlCenter');

          await config.update('openMode', openMode, vscode.ConfigurationTarget.Global);
          await config.update('defaultTab', defaultTab, vscode.ConfigurationTarget.Global);
          await config.update('dataDirectory', dataDirectory, vscode.ConfigurationTarget.Global);

          const verifiedDir = getDataDirectory();
          const exists = await directoryExists(verifiedDir);

          this._postMessage({ type: 'action:saveSettingsSuccess' });
          this._postMessage({
            type: 'data:settings',
            payload: {
              openMode,
              defaultTab,
              dataDirectory: verifiedDir,
              directoryExists: exists,
              sdkAvailable: isSDKAvailable(),
              sdkError: getSDKInitError(),
            },
          });
          break;
        }

        // ── File / Directory Actions ──────────────────────────────────────
        case 'request:openInEditor': {
          const filePath = message.payload;
          if (await fileExists(filePath)) {
            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
          } else {
            vscode.window.showErrorMessage(`File does not exist: ${filePath}`);
          }
          break;
        }

        case 'request:openDirectory': {
          const dirPath = message.payload;
          if (await directoryExists(dirPath)) {
            await vscode.env.openExternal(vscode.Uri.file(dirPath));
          } else {
            vscode.window.showErrorMessage(`Directory does not exist: ${dirPath}`);
          }
          break;
        }

        // ── Pop-Out ───────────────────────────────────────────────────────
        case 'request:popOut': {
          await vscode.commands.executeCommand('workbench.action.moveEditorToNewWindow');
          break;
        }

        // ── Open External URL ────────────────────────────────────────────
        case 'request:openUrl': {
          const url = message.payload as string;
          if (url) {
            await vscode.env.openExternal(vscode.Uri.parse(url));
          }
          break;
        }
      }
    } catch (error: any) {
      console.error('[ACC] Handler error:', error);
      this._postMessage({
        type: `error:${message.type.split(':')[1]}` as any,
        payload: error.message || 'An unknown error occurred.',
      });
    }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private _startLegacyWatching(conversationId: string): void {
    if (this._watchedConversations.has(conversationId) || !this._legacyWatcher) {
      return;
    }
    const transcriptPath = path.join(
      getBrainDirectory(),
      conversationId,
      '.system_generated',
      'logs',
      'transcript.jsonl'
    );
    this._legacyWatcher.watch(conversationId, transcriptPath);
    this._watchedConversations.add(conversationId);
  }

  private _postMessage(message: any) {
    this._panel.webview.postMessage(message);
  }

  public dispose() {
    // Clean up monitoring
    if (this._titleSyncTimer) {
      clearInterval(this._titleSyncTimer);
      this._titleSyncTimer = null;
    }
    if (this._sdkMonitor) {
      this._sdkMonitor.dispose();
    }
    if (this._legacyWatcher) {
      this._legacyWatcher.disposeAll();
    }

    this._panel.dispose();
    this._onDidDisposeEmitter.fire();

    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }

    this._onDidDisposeEmitter.dispose();
  }
}
