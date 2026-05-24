import * as vscode from 'vscode';
import * as crypto from 'crypto';

export function getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri): string {
  // Generate a cryptographically secure random nonce for CSP scripts
  const nonce = crypto.randomBytes(16).toString('base64');

  // Media URIs
  const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'index.css'));
  const appJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'app.js'));
  const logoUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'icons', 'acc_logo.png'));

  // Components URIs
  const sidebarJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'sidebar.js'));
  const searchBarJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'searchBar.js'));
  const modalJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'modal.js'));
  const toastJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'toast.js'));
  const cardJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'card.js'));
  const tableJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'table.js'));
  const skeletonJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'skeleton.js'));
  const codeBlockJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'components', 'codeBlock.js'));

  // Modules URIs
  const conversationsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'conversations.js'));
  const mcpServersJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'mcpServers.js'));
  const skillsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'skills.js'));
  const agentsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'agents.js'));
  const rulesJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'rules.js'));
  const workflowsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'workflows.js'));
  const knowledgeJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'knowledge.js'));
  const settingsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'media', 'webview', 'modules', 'settings.js'));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=initial-scale=1.0">
  <!-- Content Security Policy -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src ${webview.cspSource} data:; script-src 'nonce-${nonce}';">
  
  <title>⚡ Antigravity Control Center</title>

  <!-- Premium Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Master Stylesheet -->
  <link rel="stylesheet" href="${cssUri}">
</head>
<body>
  <div class="app-shell">
    <!-- Left Navigation Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="${logoUri}" alt="Logo" class="logo-img" style="width: 24px; height: 24px; object-fit: contain; border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
        <span class="logo-text">Control Center</span>
      </div>
      <nav class="sidebar-nav" id="sidebar-nav"></nav>
      <button class="sidebar-collapse-btn" id="sidebar-collapse-btn" aria-label="Collapse sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
    </aside>

    <!-- Main Content Area -->
    <main class="content-container">
      <!-- Top Actions Sticky Bar -->
      <header class="top-bar">
        <div class="top-bar-left">
          <h1 class="module-title" id="module-title">Dashboard</h1>
        </div>
        <div class="top-bar-right">
          <!-- Search Bar Hook -->
          <div class="search-bar-container" id="search-bar-container"></div>
          
          <!-- Quick Action Buttons -->
          <button class="btn btn-secondary btn-icon" id="global-refresh-btn" title="Refresh Data (Ctrl+R)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
          <button class="btn btn-secondary btn-icon" id="global-popout-btn" title="Pop out Control Center to standard standalone window">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Dynamic Frame -->
      <div class="content-area" id="content-area">
        <!-- Column 2 (Sub-list Panel) -->
        <div id="sub-list-panel" class="sub-list-column"></div>
        <!-- Column 3 (Detail Panel) -->
        <div id="detail-panel" class="detail-column"></div>
      </div>

      <!-- Footer Status Bar -->
      <footer class="status-bar">
        <div class="status-bar-left">
          <span class="status-indicator"></span>
          <span class="status-text" id="status-text">Scanning directories...</span>
        </div>
        <div class="status-bar-right">
          <span class="status-item" id="last-updated-text">Synced: Never</span>
          <span class="status-divider">|</span>
          <span class="status-item">v0.1.0</span>
        </div>
      </footer>
    </main>
  </div>

  <!-- Reusable Toast Alert Containers -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Custom Modal Overlay Layer (No Native browser Popups Allowed) -->
  <div class="modal-overlay hidden" id="modal-overlay">
    <div class="modal" id="modal-container"></div>
  </div>

  <!-- Acquire VS Code Webview API -->
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
  </script>

  <!-- Component JS Files (CSP Nonce Enforced) -->
  <script nonce="${nonce}" src="${sidebarJsUri}"></script>
  <script nonce="${nonce}" src="${searchBarJsUri}"></script>
  <script nonce="${nonce}" src="${modalJsUri}"></script>
  <script nonce="${nonce}" src="${toastJsUri}"></script>
  <script nonce="${nonce}" src="${cardJsUri}"></script>
  <script nonce="${nonce}" src="${tableJsUri}"></script>
  <script nonce="${nonce}" src="${skeletonJsUri}"></script>
  <script nonce="${nonce}" src="${codeBlockJsUri}"></script>

  <!-- Module JS Files (CSP Nonce Enforced) -->
  <script nonce="${nonce}" src="${conversationsJsUri}"></script>
  <script nonce="${nonce}" src="${mcpServersJsUri}"></script>
  <script nonce="${nonce}" src="${skillsJsUri}"></script>
  <script nonce="${nonce}" src="${agentsJsUri}"></script>
  <script nonce="${nonce}" src="${rulesJsUri}"></script>
  <script nonce="${nonce}" src="${workflowsJsUri}"></script>
  <script nonce="${nonce}" src="${knowledgeJsUri}"></script>
  <script nonce="${nonce}" src="${settingsJsUri}"></script>

  <!-- Core App Controller (CSP Nonce Enforced) -->
  <script nonce="${nonce}" src="${appJsUri}"></script>
</body>
</html>`;
}
