// Settings UI Module

window.Modules = window.Modules || {};

window.Modules.Settings = {
  render(container, settings) {
    if (!container) return;
    container.innerHTML = '';
    
    const form = document.createElement('div');
    form.className = 'settings-container';
    
    // Preferences Section
    const prefSec = document.createElement('div');
    prefSec.className = 'settings-section';
    prefSec.innerHTML = `
      <h3 class="settings-section-title">⚙️ Preferences</h3>
      <div class="form-group">
        <label for="default-tab-select">Default tab on load</label>
        <select id="default-tab-select">
          <option value="conversations" ${settings.defaultTab === 'conversations' ? 'selected' : ''}>Conversations</option>
          <option value="mcpServers" ${settings.defaultTab === 'mcpServers' ? 'selected' : ''}>MCP Servers</option>
          <option value="skills" ${settings.defaultTab === 'skills' ? 'selected' : ''}>Skills</option>
          <option value="agents" ${settings.defaultTab === 'agents' ? 'selected' : ''}>Agents</option>
          <option value="rules" ${settings.defaultTab === 'rules' ? 'selected' : ''}>Rules</option>
          <option value="workflows" ${settings.defaultTab === 'workflows' ? 'selected' : ''}>Workflows</option>
          <option value="knowledge" ${settings.defaultTab === 'knowledge' ? 'selected' : ''}>Knowledge Items</option>
          <option value="settings" ${settings.defaultTab === 'settings' ? 'selected' : ''}>Settings</option>
        </select>
        <span class="form-helper">Select which dashboard module is loaded first by default.</span>
      </div>
      <div class="form-group" style="margin-top: var(--space-md)">
        <label>Panel Launch Mode</label>
        <div class="radio-group">
          <div class="radio-option ${settings.openMode === 'webview' ? 'selected' : ''}" id="mode-webview-opt">
            <input type="radio" name="openMode" value="webview" ${settings.openMode === 'webview' ? 'checked' : ''}>
            <div class="radio-option-text">
              <span class="radio-option-title">Embedded Webview</span>
              <span class="radio-option-desc">Launch as a full editor panel tab inside the IDE.</span>
            </div>
          </div>
          <div class="radio-option ${settings.openMode === 'external' ? 'selected' : ''}" id="mode-external-opt">
            <input type="radio" name="openMode" value="external" ${settings.openMode === 'external' ? 'checked' : ''}>
            <div class="radio-option-text">
              <span class="radio-option-title">External Browser</span>
              <span class="radio-option-desc">Launch as a standalone browser window.</span>
            </div>
          </div>
        </div>
      </div>
    `;
    form.appendChild(prefSec);
    
    // Directory Section
    const dirSec = document.createElement('div');
    dirSec.className = 'settings-section';
    
    const dirTitle = document.createElement('h3');
    dirTitle.className = 'settings-section-title';
    dirTitle.textContent = '📁 Paths & System';
    dirSec.appendChild(dirTitle);
    
    const dirGroup = document.createElement('div');
    dirGroup.className = 'form-group';
    dirGroup.innerHTML = `
      <label for="data-dir-input">Antigravity data directory</label>
      <input type="text" id="data-dir-input" value="${settings.dataDirectory || ''}" placeholder="~/.gemini/antigravity-ide">
      <span class="form-helper">The home directory containing your conversation brain, MCP schemas, and KIs.</span>
    `;
    dirSec.appendChild(dirGroup);
    
    const validationRow = document.createElement('div');
    validationRow.className = 'path-validation';
    const indicator = settings.directoryExists ? '✅' : '❌';
    const statusText = settings.directoryExists ? 'Directory exists and is valid.' : 'Directory not found. Fallbacks will apply.';
    validationRow.innerHTML = `
      <span>Status:</span>
      <span style="font-weight: bold; color: ${settings.directoryExists ? 'var(--color-success)' : 'var(--color-error)'}">${indicator} ${statusText}</span>
    `;
    dirSec.appendChild(validationRow);
    
    const btnRow = document.createElement('div');
    btnRow.style.marginTop = 'var(--space-md)';
    btnRow.className = 'flex gap-sm';
    
    const revealBtn = document.createElement('button');
    revealBtn.className = 'btn btn-secondary';
    revealBtn.textContent = 'Open Folder';
    revealBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openDirectory',
        payload: settings.dataDirectory
      });
    });
    btnRow.appendChild(revealBtn);
    dirSec.appendChild(btnRow);
    
    form.appendChild(dirSec);

    // ── SDK Status Section ───────────────────────────────────────────────
    const sdkSec = document.createElement('div');
    sdkSec.className = 'settings-section';
    sdkSec.style.marginTop = 'var(--space-md)';

    const sdkAvail = settings.sdkAvailable;
    const sdkIcon = sdkAvail ? '🟢' : '🟡';
    const sdkMode = sdkAvail ? 'SDK Connected' : 'Filesystem Fallback';
    const sdkError = settings.sdkError ? `<span style="color: var(--color-warning); font-size: 11px; display: block; margin-top: 4px;">⚠️ ${settings.sdkError}</span>` : '';

    sdkSec.innerHTML = `
      <h3 class="settings-section-title">🔌 Antigravity SDK Status</h3>
      <div style="display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--color-surface); border-radius: var(--radius-sm); border: 1px solid var(--color-surface-border);">
        <span style="font-size: 16px;">${sdkIcon}</span>
        <div>
          <span style="color: var(--color-text-primary); font-weight: 600;">${sdkMode}</span>
          <span style="color: var(--color-text-muted); font-size: 11px; margin-left: 8px;">Mode: ${sdkAvail ? 'antigravity-sdk' : 'direct filesystem'}</span>
          ${sdkError}
        </div>
      </div>
      <div id="sdk-preferences-container" style="margin-top: var(--space-md);"></div>
      <div id="sdk-diagnostics-container" style="margin-top: var(--space-md);"></div>
    `;
    form.appendChild(sdkSec);

    // Request SDK data if available
    if (sdkAvail) {
      vscode.postMessage({ type: 'request:agentPreferences' });
      vscode.postMessage({ type: 'request:systemDiagnostics' });
    }
    
    // System Instructions & Help Guide Section
    const instSec = document.createElement('div');
    instSec.className = 'settings-section';
    instSec.style.marginTop = 'var(--space-md)';
    instSec.innerHTML = `
      <h3 class="settings-section-title">📘 System Instructions & User Guide</h3>
      <div style="font-size: 13px; display: flex; flex-direction: column; gap: var(--space-md); color: var(--color-text-secondary)">
        <div>
          <strong style="color: var(--color-text-primary)">1. Core Concept & Directory Mapping</strong>
          <p style="margin-top: 4px">The Antigravity Control Center aggregates local filesystems and workspace parameters into a unified dashboard:</p>
          <ul style="padding-left: 20px; margin-top: 6px; list-style-type: square; display: flex; flex-direction: column; gap: 4px;">
            <li><strong>Conversations:</strong> Loaded from <code>{dataDirectory}/brain/</code> containing <code>transcript.jsonl</code> timelines and markdown artifacts.</li>
            <li><strong>MCP Servers:</strong> Configuration schemas are read from <code>{dataDirectory}/mcp/&lt;serverName&gt;/*.json</code> containing tool definitions.</li>
            <li><strong>Skills Catalog:</strong> Merges workspace definitions in <code>{workspaceRoot}/.agents/skills/</code> and global config items from <code>~/.gemini/config/plugins/</code>.</li>
            <li><strong>Agents & Rules:</strong> Parsed from <code>{workspaceRoot}/.agents/agents/</code> and <code>{workspaceRoot}/.agents/rules/</code>.</li>
            <li><strong>Workflows:</strong> Slash commands are mapped from files inside <code>{workspaceRoot}/.agents/workflows/</code>.</li>
            <li><strong>Knowledge Items (KIs):</strong> Curated localized context directories read from <code>{dataDirectory}/knowledge/</code>.</li>
          </ul>
        </div>
        
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: var(--space-sm)">
          <strong style="color: var(--color-text-primary)">2. Interactive Shortcuts & Hotkeys</strong>
          <p style="margin-top: 4px">Accelerate your navigation inside the control panel using these globally bound keyboard hotkeys:</p>
          <ul style="padding-left: 20px; margin-top: 6px; list-style-type: square; display: flex; flex-direction: column; gap: 4px;">
            <li><code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Ctrl + R</code> or <code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Cmd + R</code> : Force reload and rescan active filesystems.</li>
            <li><code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Ctrl + K</code> or <code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Cmd + K</code> : Instant focus search input.</li>
            <li><code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">ESC</code> : Dismiss open modal dialog sheets and instruction overlays.</li>
          </ul>
        </div>
        
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: var(--space-sm)">
          <strong style="color: var(--color-text-primary)">3. SDK-Powered Features (v0.2.0)</strong>
          <p style="margin-top: 4px">When running inside Antigravity IDE, the Control Center uses the <code>antigravity-sdk</code> for enhanced capabilities:</p>
          <ul style="padding-left: 20px; margin-top: 6px; list-style-type: square; display: flex; flex-direction: column; gap: 4px;">
            <li><strong>Real-time Event Monitoring:</strong> Agent progress, session switches, and new conversations are detected automatically via SDK event polling.</li>
            <li><strong>Step Control:</strong> Accept or reject code edits and terminal commands directly from the conversation header toolbar.</li>
            <li><strong>Focus in Antigravity:</strong> Click the focus icon to switch the native Antigravity panel to any conversation.</li>
            <li><strong>Headless Cascades:</strong> Create and manage conversations via the Language Server bridge without UI flickering.</li>
            <li><strong>Agent Preferences:</strong> View all 16 agent settings (terminal policy, secure mode, sandbox, etc.) in the Settings panel.</li>
          </ul>
        </div>

        <div style="border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: var(--space-sm)">
          <strong style="color: var(--color-text-primary)">4. Launch & Open Methods</strong>
          <p style="margin-top: 4px">If you don't see the toolbar icon immediately, launch the dashboard using any of these routes:</p>
          <ul style="padding-left: 20px; margin-top: 6px; list-style-type: square; display: flex; flex-direction: column; gap: 4px;">
            <li><strong>Keyboard Shortcut:</strong> Press <code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Ctrl + Cmd + C</code> (macOS) or <code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Ctrl + Alt + C</code> (Windows/Linux) to instantly toggle the Control Center.</li>
            <li><strong>Command Palette:</strong> Open with <code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Cmd+Shift+P</code> / <code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px">Ctrl+Shift+P</code>, search for <code>Control Center</code>, and press Enter.</li>
            <li><strong>Editor Toolbar:</strong> Look at the top-right button strip when a file editor tab is actively open (appears as a grid icon).</li>
            <li><strong>Status Bar:</strong> Click the small <code style="font-family: var(--font-mono); color: var(--color-secondary); font-weight: bold;">ACC</code> launcher button in the bottom-right status bar of the IDE window.</li>
          </ul>
        </div>
      </div>
    `;
    form.appendChild(instSec);
    
    // Save Bar
    const saveSec = document.createElement('div');
    saveSec.className = 'settings-section flex justify-end gap-sm';
    saveSec.style.background = 'rgba(0,0,0,0.1)';
    
    const saveBtn = document.createElement('button');
    saveBtn.className = 'btn btn-primary';
    saveBtn.textContent = 'Save Changes';
    saveBtn.addEventListener('click', () => {
      const defaultTab = document.getElementById('default-tab-select').value;
      const openMode = form.querySelector('input[name="openMode"]:checked').value;
      const dataDirectory = document.getElementById('data-dir-input').value;
      
      vscode.postMessage({
        type: 'request:saveSettings',
        payload: {
          openMode,
          defaultTab,
          dataDirectory
        }
      });
    });
    
    saveSec.appendChild(saveBtn);
    form.appendChild(saveSec);
    
    // Radio button UI highlights
    const setupRadioOption = (elId, value) => {
      const el = form.querySelector(`#${elId}`);
      if (!el) return;
      el.addEventListener('click', () => {
        form.querySelectorAll('.radio-option').forEach(opt => opt.classList.remove('selected'));
        form.querySelectorAll('input[name="openMode"]').forEach(radio => radio.checked = false);
        
        el.classList.add('selected');
        const radio = el.querySelector('input');
        if (radio) {
          radio.checked = true;
        }
      });
    };
    
    container.appendChild(form);
    
    setupRadioOption('mode-webview-opt', 'webview');
    setupRadioOption('mode-external-opt', 'external');
  },

  // ── SDK Callback Methods ────────────────────────────────────────────────

  /**
   * Called when agent preferences data arrives from the SDK.
   */
  onPreferencesLoaded(prefs) {
    const container = document.getElementById('sdk-preferences-container');
    if (!container || !prefs) return;

    const items = [
      { label: 'Terminal Policy', value: prefs.terminalExecutionPolicy, icon: '💻' },
      { label: 'Artifact Review', value: prefs.artifactReviewPolicy, icon: '📋' },
      { label: 'Secure Mode', value: prefs.secureModeEnabled ? 'Enabled' : 'Disabled', icon: prefs.secureModeEnabled ? '🔒' : '🔓' },
      { label: 'Terminal Sandbox', value: prefs.terminalSandboxEnabled ? 'Enabled' : 'Disabled', icon: '🏗️' },
      { label: 'Shell Integration', value: prefs.shellIntegrationEnabled ? 'Enabled' : 'Disabled', icon: '🐚' },
      { label: 'Non-Workspace Files', value: prefs.allowNonWorkspaceFiles ? 'Allowed' : 'Restricted', icon: '📂' },
    ];

    container.innerHTML = `
      <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 8px; font-weight: 600;">🧠 Agent Preferences</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        ${items.map(item => `
          <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--color-surface); border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
            <span style="font-size: 14px;">${item.icon}</span>
            <div>
              <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${item.label}</div>
              <div style="font-size: 12px; color: var(--color-text-primary); font-weight: 500;">${item.value}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  /**
   * Called when system diagnostics data arrives from the SDK.
   */
  onDiagnosticsLoaded(diag) {
    const container = document.getElementById('sdk-diagnostics-container');
    if (!container || !diag) return;

    container.innerHTML = `
      <div style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 8px; font-weight: 600;">🖥️ System Diagnostics</div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--color-surface); border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
          <span style="font-size: 14px;">💻</span>
          <div>
            <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Operating System</div>
            <div style="font-size: 12px; color: var(--color-text-primary); font-weight: 500;">${diag.operatingSystem}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--color-surface); border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
          <span style="font-size: 14px;">👤</span>
          <div>
            <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">User</div>
            <div style="font-size: 12px; color: var(--color-text-primary); font-weight: 500;">${diag.userName}</div>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--color-surface); border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
          <span style="font-size: 14px;">${diag.isRemote ? '🌐' : '🏠'}</span>
          <div>
            <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Connection</div>
            <div style="font-size: 12px; color: var(--color-text-primary); font-weight: 500;">${diag.isRemote ? 'Remote (SSH)' : 'Local'}</div>
          </div>
        </div>
        ${diag.mcpUrl ? `
        <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--color-surface); border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
          <span style="font-size: 14px;">🔌</span>
          <div>
            <div style="font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">MCP URL</div>
            <div style="font-size: 11px; color: var(--color-text-primary); font-family: var(--font-mono);">${diag.mcpUrl}</div>
          </div>
        </div>` : ''}
      </div>
    `;
  },

  /**
   * Called when SDK status data arrives.
   */
  onSDKStatusLoaded(status) {
    // Status is already rendered in the initial render — this is for
    // dynamic updates if the SDK status changes during runtime
    console.log('[ACC-Settings] SDK Status:', status);
  }
};
