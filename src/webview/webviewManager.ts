import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { getWebviewContent } from './getWebviewContent';
import { WebviewMessage } from '../models';
import { getConversations, getConversationDetail, addConversationMessage, renameConversation } from '../providers/conversationProvider';
import { getMcpServers, getMcpToolDetail } from '../providers/mcpProvider';
import { getAllSkills, getSkillDetail } from '../providers/skillProvider';
import { getAgents } from '../providers/agentProvider';
import { getRules } from '../providers/ruleProvider';
import { getWorkflows } from '../providers/workflowProvider';
import { getKnowledgeItems, getKnowledgeArtifact } from '../providers/knowledgeProvider';
import { directoryExists, fileExists } from '../utils/fileSystem';
import { getDataDirectory, getBrainDirectory } from '../utils/paths';
import { ConversationWatcher } from '../services/conversationWatcher';
import { getModelCatalog, getDefaultModel } from '../services/modelCatalog';

export class WebviewManager {
  private _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private _onDidDisposeEmitter = new vscode.EventEmitter<void>();
  public readonly onDidDispose = this._onDidDisposeEmitter.event;

  /** Real-time transcript file watcher */
  private _watcher: ConversationWatcher;

  /** Track which conversation IDs are actively watched (multi-watch) */
  private _watchedConversations: Set<string> = new Set();

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

    // Initialize the real-time watcher.  When new transcript steps arrive
    // we push them directly to the webview so the chat view updates live.
    this._watcher = new ConversationWatcher((event) => {
      this._postMessage({
        type: 'stream:conversationSteps',
        payload: {
          id: event.conversationId,
          newSteps: event.newSteps,
          totalStepCount: event.totalStepCount,
        },
      } as any);
    });

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

  private async _handleMessage(message: WebviewMessage) {
    try {
      switch (message.type) {

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
            this._startWatching(id);
          } else {
            this._postMessage({ type: 'error:conversationDetail', payload: 'Conversation log not found.' });
          }
          break;
        }

        case 'request:watchConversation': {
          // Explicitly request watching (e.g. user opens a second chat in parallel)
          const id = message.payload as string;
          this._startWatching(id);
          break;
        }

        case 'request:unwatchConversation': {
          const id = message.payload as string;
          this._watcher.unwatch(id);
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

        // ── Send Message (append to transcript) ──────────────────────────
        case 'request:sendMessage': {
          const { id, prompt, model } = message.payload;

          // Append user prompt to transcript
          await addConversationMessage(id, 'USER_EXPLICIT', 'USER_INPUT', prompt);

          // Send back the updated detail immediately so the new user message renders
          const detail = await getConversationDetail(id);
          if (detail) {
            this._postMessage({ type: 'data:conversationDetail', payload: detail });
          }

          // NOTE: We don't simulate agent responses here — the actual
          // Antigravity agent running in the background will write new
          // steps to transcript.jsonl which the FileWatcher picks up
          // and streams to the webview automatically.
          break;
        }

        // ── Rename Conversation ──────────────────────────────────────────
        case 'request:renameConversation': {
          const { id, newTitle } = message.payload;
          await renameConversation(id, newTitle);
          // Refresh the conversation list so the new name shows in Column 2
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

  private _startWatching(conversationId: string): void {
    if (this._watchedConversations.has(conversationId)) {
      return;
    }
    const transcriptPath = path.join(
      getBrainDirectory(),
      conversationId,
      '.system_generated',
      'logs',
      'transcript.jsonl'
    );
    this._watcher.watch(conversationId, transcriptPath);
    this._watchedConversations.add(conversationId);
  }

  private _postMessage(message: any) {
    this._panel.webview.postMessage(message);
  }

  public dispose() {
    this._watcher.disposeAll();
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
