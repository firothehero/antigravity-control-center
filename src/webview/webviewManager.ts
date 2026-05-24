import * as vscode from 'vscode';
import * as path from 'path';
import { getWebviewContent } from './getWebviewContent';
import { WebviewMessage } from '../models';
import { getConversations, getConversationDetail, addConversationMessage } from '../providers/conversationProvider';
import { getMcpServers, getMcpToolDetail } from '../providers/mcpProvider';
import { getAllSkills, getSkillDetail } from '../providers/skillProvider';
import { getAgents } from '../providers/agentProvider';
import { getRules } from '../providers/ruleProvider';
import { getWorkflows } from '../providers/workflowProvider';
import { getKnowledgeItems, getKnowledgeArtifact } from '../providers/knowledgeProvider';
import { directoryExists, fileExists } from '../utils/fileSystem';
import { getDataDirectory } from '../utils/paths';

export class WebviewManager {
  private _panel: vscode.WebviewPanel;
  private _disposables: vscode.Disposable[] = [];
  private _onDidDisposeEmitter = new vscode.EventEmitter<void>();
  public readonly onDidDispose = this._onDidDisposeEmitter.event;

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
        case 'request:conversations': {
          const list = await getConversations();
          this._postMessage({ type: 'data:conversations', payload: list });
          break;
        }
        case 'request:conversationDetail': {
          const id = message.payload;
          const detail = await getConversationDetail(id);
          if (detail) {
            this._postMessage({ type: 'data:conversationDetail', payload: detail });
          } else {
            this._postMessage({ type: 'error:conversationDetail', payload: 'Conversation log not found.' });
          }
          break;
        }
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
              directoryExists: exists
            }
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
              directoryExists: exists
            }
          });
          break;
        }
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
        case 'request:sendMessage': {
          const { id, prompt, model } = message.payload;
          
          // 1. Append user prompt to transcript
          await addConversationMessage(id, 'USER_EXPLICIT', 'USER_INPUT', prompt);
          
          // Post the updated detail back instantly
          let detail = await getConversationDetail(id);
          if (detail) {
            this._postMessage({ type: 'data:conversationDetail', payload: detail });
          }
          
          // 2. Simulate thinking step and model response
          setTimeout(async () => {
            // Append agent thinking message
            const thinkingMsg = `I am analyzing your prompt: "${prompt}" using ${model || 'Gemini 3.5 Flash'}. Initiating agent orchestration flow to execute tasks on your workspace...`;
            await addConversationMessage(id, 'MODEL', 'PLANNER_RESPONSE', thinkingMsg);
            
            const updatedDetail = await getConversationDetail(id);
            if (updatedDetail) {
              this._postMessage({ type: 'data:conversationDetail', payload: updatedDetail });
            }
          }, 1000);
          
          break;
        }
        case 'request:refresh': {
          // Can be handled dynamically by triggering reload on webview
          break;
        }
        case 'request:popOut': {
          await vscode.commands.executeCommand('workbench.action.moveEditorToNewWindow');
          break;
        }
      }
    } catch (error: any) {
      console.error(error);
      this._postMessage({
        type: `error:${message.type.split(':')[1]}` as any,
        payload: error.message || 'An unknown error occurred.'
      });
    }
  }

  private _postMessage(message: WebviewMessage) {
    this._panel.webview.postMessage(message);
  }

  public dispose() {
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
