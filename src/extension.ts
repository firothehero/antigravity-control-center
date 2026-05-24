import * as vscode from 'vscode';
import { openControlCenter } from './commands/openControlCenter';

let statusBarItem: vscode.StatusBarItem | undefined = undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('⚡ Antigravity Control Center Extension is now active!');

  // Register command
  const openCommand = vscode.commands.registerCommand('controlCenter.open', () => {
    openControlCenter(context);
  });
  context.subscriptions.push(openCommand);

  // Add status bar quick launcher
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = 'controlCenter.open';
  statusBarItem.text = '$(acc-logo) ACC';
  statusBarItem.tooltip = 'Open Antigravity Control Center';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
}

export function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
}
