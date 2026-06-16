import * as path from 'path';
import * as os from 'os';
import * as vscode from 'vscode';

export function getDataDirectory(): string {
  const config = vscode.workspace.getConfiguration('controlCenter');
  const customPath = config.get<string>('dataDirectory');
  
  if (customPath && customPath.trim() !== '') {
    // Resolve home directory symbol if used
    if (customPath.startsWith('~/') || customPath === '~') {
      return path.join(os.homedir(), customPath.slice(1));
    }
    return path.resolve(customPath);
  }
  
  // Default fallback
  return path.join(os.homedir(), '.gemini', 'antigravity-ide');
}

export function getBrainDirectory(): string {
  return path.join(getDataDirectory(), 'brain');
}

export function getConversationsDirectory(): string {
  return path.join(getDataDirectory(), 'conversations');
}

export function getMcpDirectory(): string {
  return path.join(getDataDirectory(), 'mcp');
}

export function getKnowledgeDirectory(): string {
  return path.join(getDataDirectory(), 'knowledge');
}

export function getWorkspaceAgentsDirectory(): string | undefined {
  const folders = vscode.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    return undefined;
  }
  return path.join(folders[0].uri.fsPath, '.agents');
}

export function getGlobalPluginsDirectory(): string {
  return path.join(os.homedir(), '.gemini', 'config', 'plugins');
}
