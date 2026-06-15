import * as vscode from 'vscode';
import { openControlCenter } from './commands/openControlCenter';
import { initializeSDK, isSDKAvailable, getSDKInitError } from './services/sdkService';

let statusBarItem: vscode.StatusBarItem | undefined = undefined;

export async function activate(context: vscode.ExtensionContext) {
  console.log('⚡ Antigravity Control Center Extension is now active!');

  // Register command FIRST — before any async work that might fail
  const openCommand = vscode.commands.registerCommand('controlCenter.open', () => {
    openControlCenter(context);
  });
  context.subscriptions.push(openCommand);

  // Add status bar quick launcher IMMEDIATELY so user can see it
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = 'controlCenter.open';
  statusBarItem.text = '$(dashboard) ACC';
  statusBarItem.tooltip = 'Open Antigravity Control Center';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);

  // Initialize the Antigravity SDK (non-blocking — falls back gracefully)
  try {
    await initializeSDK(context);

    if (isSDKAvailable()) {
      console.log('⚡ [ACC] AntigravitySDK is available — using SDK-powered features');
      statusBarItem.tooltip = 'Open Antigravity Control Center (SDK Connected)';
    } else {
      console.log(`⚡ [ACC] AntigravitySDK not available (${getSDKInitError() || 'unknown'}) — using filesystem fallback`);
    }
  } catch (err: any) {
    console.warn('⚡ [ACC] SDK initialization error (non-fatal):', err?.message || err);
  }
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
}
