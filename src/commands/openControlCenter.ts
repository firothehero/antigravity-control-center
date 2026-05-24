import * as vscode from 'vscode';
import { WebviewManager } from '../webview/webviewManager';

let activeManager: WebviewManager | undefined = undefined;

export function openControlCenter(context: vscode.ExtensionContext) {
  if (activeManager) {
    activeManager.reveal();
  } else {
    activeManager = new WebviewManager(context);
    activeManager.onDidDispose(() => {
      activeManager = undefined;
    });
  }
}
