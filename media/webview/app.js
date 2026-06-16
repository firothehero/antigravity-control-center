// Master App Controller for Antigravity Control Center

(function() {
  // Global State
  const state = {
    currentModule: 'conversations',
    moduleData: {}, // Cache for loaded data
    searchQuery: {}, // Per-module query tracking
    selectedItemId: null, // For detail views
    selectedItemData: null
  };

  // Nav Items Config
  const NAV_ITEMS = [
    { id: 'conversations', label: 'Conversations', icon: '💬' },
    { id: 'mcpServers', label: 'MCP Servers', icon: '🔌' },
    { id: 'skills', label: 'Skills', icon: '🧠' },
    { id: 'agents', label: 'Agents', icon: '🤖' },
    { id: 'rules', label: 'Rules', icon: '📜' },
    { id: 'workflows', label: 'Workflows', icon: '🔄' },
    { id: 'knowledge', label: 'Knowledge Items', icon: '📚' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  // Element Cache
  const els = {
    shell: document.querySelector('.app-shell'),
    collapseBtn: document.getElementById('sidebar-collapse-btn'),
    sidebarNav: document.getElementById('sidebar-nav'),
    contentArea: document.getElementById('content-area'),
    subListPanel: document.getElementById('sub-list-panel'),
    detailPanel: document.getElementById('detail-panel'),
    searchBarContainer: document.getElementById('search-bar-container'),
    moduleTitle: document.getElementById('module-title'),
    refreshBtn: document.getElementById('global-refresh-btn'),
    popoutBtn: document.getElementById('global-popout-btn'),
    statusIndicator: document.querySelector('.status-indicator'),
    statusText: document.getElementById('status-text'),
    lastUpdatedText: document.getElementById('last-updated-text')
  };

  // ----------------------------------------------------
  // 1. Initializer & Nav Event Bindings                  */
  // ----------------------------------------------------
  function init() {
    // 1. Sidebar Collapse initialization
    window.Components.Sidebar.initCollapse(els.shell, els.collapseBtn);
    
    // 2. Initial state restoration
    const restored = vscode.getState();
    if (restored) {
      state.currentModule = restored.currentModule || 'conversations';
      state.selectedItemId = restored.selectedItemId || null;
      state.selectedItemData = restored.selectedItemData || null;
      state.searchQuery = restored.searchQuery || {};
    }
    
    // 3. Navigation rendering
    renderSidebar();
    
    // 4. Global Action bindings
    els.refreshBtn.addEventListener('click', () => refreshData(true));
    els.popoutBtn.addEventListener('click', () => {
      vscode.postMessage({ type: 'request:popOut' });
    });
    
    // 5. Message listener from Extension Host
    window.addEventListener('message', handleIncomingMessage);
    
    // 6. Global Keyboard Shortcuts
    window.addEventListener('keydown', handleGlobalKeydown);
    
    // 7. Credits link — open in external browser
    const creditsLink = document.getElementById('credits-link');
    if (creditsLink) {
      creditsLink.addEventListener('click', (e) => {
        e.preventDefault();
        vscode.postMessage({ type: 'request:openUrl', payload: 'https://github.com/firothehero' });
      });
    }
    
    // 8. Load default module
    navigate(state.currentModule);
  }

  // ----------------------------------------------------
  // 2. Navigation & Sidebar Controllers                  */
  // ----------------------------------------------------
  function renderSidebar() {
    window.Components.Sidebar.render(
      els.sidebarNav, 
      NAV_ITEMS, 
      state.currentModule, 
      (id) => navigate(id)
    );
  }

  function navigate(moduleId) {
    state.currentModule = moduleId;
    state.selectedItemId = null;
    state.selectedItemData = null;
    saveState();
    
    // Update Sidebar Highlights
    renderSidebar();
    
    // Update header Title
    const activeItem = NAV_ITEMS.find(i => i.id === moduleId);
    els.moduleTitle.textContent = activeItem ? activeItem.label : 'Control Center';
    
    // Global Search is handled inside the sub-list header now
    els.searchBarContainer.innerHTML = '';
    
    // Fetch and Render
    loadModuleData(moduleId);
  }

  // ----------------------------------------------------
  // 3. Data Flow & Rendering Dispatcher                  */
  // ----------------------------------------------------
  function loadModuleData(moduleId, force = false) {
    if (moduleId === 'settings') {
      els.subListPanel.classList.add('hidden');
      setLoadingState(true, 'Loading settings...', false);
      vscode.postMessage({ type: 'request:settings' });
      return;
    }
    
    els.subListPanel.classList.remove('hidden');
    
    if (state.moduleData[moduleId] && !force) {
      renderSubListHeader(moduleId, state.moduleData[moduleId]);
      filterAndRenderSubList(moduleId, state.moduleData[moduleId]);
      return;
    }
    
    setLoadingState(true, `Loading ${moduleId}...`, false);
    vscode.postMessage({ type: `request:${moduleId}` });
  }

  function refreshData(force = true) {
    loadModuleData(state.currentModule, true);
  }

  function handleIncomingMessage(event) {
    const message = event.data;
    setLoadingState(false);
    
    switch (message.type) {
      case 'data:conversations':
        // Sort conversations by reverse chronological order (newest first)
        const sortedConvs = message.payload.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
        state.moduleData.conversations = sortedConvs;
        saveState();
        if (state.currentModule === 'conversations') {
          renderSubListHeader('conversations', sortedConvs);
          filterAndRenderSubList('conversations', sortedConvs);
        }
        updateStatusText(`Loaded ${sortedConvs.length} conversations.`);
        updateBadge('conversations', sortedConvs.length);
        break;

      // Incremental title updates from reverse sync (IDE → ACC)
      case 'data:titleUpdates': {
        const updates = message.payload;
        if (state.moduleData.conversations && updates.length > 0) {
          for (const upd of updates) {
            const conv = state.moduleData.conversations.find(c => c.id === upd.id);
            if (conv) {
              conv.title = upd.title;
              if (upd.project) conv.project = upd.project;
            }
          }
          saveState();
          if (state.currentModule === 'conversations') {
            filterAndRenderSubList('conversations', state.moduleData.conversations);
          }
        }
        break;
      }
      case 'data:conversationDetail':
        state.selectedItemData = message.payload;
        saveState();
        if (state.currentModule === 'conversations' && state.selectedItemId === message.payload.id) {
          window.Modules.Conversations.renderDetail(
            els.detailPanel,
            message.payload,
            (prompt, model) => {
              vscode.postMessage({
                type: 'request:sendMessage',
                payload: {
                  id: message.payload.id,
                  prompt: prompt,
                  model: model
                }
              });
            }
          );
        }
        break;
        
      case 'data:mcpServers':
        state.moduleData.mcpServers = message.payload;
        saveState();
        if (state.currentModule === 'mcpServers') {
          renderSubListHeader('mcpServers', message.payload);
          filterAndRenderSubList('mcpServers', message.payload);
        }
        const totalTools = message.payload.reduce((sum, s) => sum + s.toolCount, 0);
        updateStatusText(`Loaded ${message.payload.length} servers with ${totalTools} tools.`);
        updateBadge('mcpServers', message.payload.length);
        break;
        
      case 'data:skills':
        state.moduleData.skills = message.payload;
        saveState();
        if (state.currentModule === 'skills') {
          renderSubListHeader('skills', message.payload);
          filterAndRenderSubList('skills', message.payload);
        }
        updateBadge('skills', message.payload.length);
        break;
        
      case 'data:agents':
        state.moduleData.agents = message.payload;
        saveState();
        if (state.currentModule === 'agents') {
          renderSubListHeader('agents', message.payload);
          filterAndRenderSubList('agents', message.payload);
        }
        updateBadge('agents', message.payload.length);
        break;
        
      case 'data:rules':
        state.moduleData.rules = message.payload;
        saveState();
        if (state.currentModule === 'rules') {
          renderSubListHeader('rules', message.payload);
          filterAndRenderSubList('rules', message.payload);
        }
        updateBadge('rules', message.payload.length);
        break;
        
      case 'data:workflows':
        state.moduleData.workflows = message.payload;
        saveState();
        if (state.currentModule === 'workflows') {
          renderSubListHeader('workflows', message.payload);
          filterAndRenderSubList('workflows', message.payload);
        }
        updateBadge('workflows', message.payload.length);
        break;
        
      case 'data:knowledge':
        state.moduleData.knowledge = message.payload;
        saveState();
        if (state.currentModule === 'knowledge') {
          renderSubListHeader('knowledge', message.payload);
          filterAndRenderSubList('knowledge', message.payload);
        }
        updateBadge('knowledge', message.payload.length);
        break;
        
      case 'data:settings':
        state.moduleData.settings = message.payload;
        saveState();
        if (state.currentModule === 'settings') {
          els.detailPanel.innerHTML = '';
          const settingsWrapper = document.createElement('div');
          settingsWrapper.className = 'detail-scroll-wrapper';
          els.detailPanel.appendChild(settingsWrapper);
          window.Modules.Settings.render(settingsWrapper, message.payload);
        }
        break;
        
      case 'action:saveSettingsSuccess':
        window.showToast({ message: 'Settings saved successfully!', type: 'success' });
        break;
        
      case 'error:conversations':
      case 'error:conversationDetail':
      case 'error:mcpServers':
      case 'error:skills':
      case 'error:agents':
      case 'error:rules':
      case 'error:workflows':
      case 'error:knowledge':
      case 'error:settings':
        setLoadingState(false, 'Error loading data');
        els.statusIndicator.className = 'status-indicator error';
        window.showToast({ message: `Error: ${message.payload}`, type: 'error' });
        break;

      // ── Real-time Streaming: new steps from transcript.jsonl watcher ──
      case 'stream:conversationSteps':
        if (message.payload && message.payload.id) {
          window.Modules.Conversations.onStreamUpdate(
            message.payload.id,
            message.payload.newSteps || [],
            message.payload.totalStepCount || 0
          );
        }
        break;

      // ── Model Catalog: full list of Antigravity models ────────────────
      case 'data:modelCatalog':
        if (message.payload) {
          window.Modules.Conversations.onModelCatalogLoaded(
            message.payload.models,
            message.payload.defaultModel
          );
        }
        break;

      // ── Rename Success ────────────────────────────────────────────────
      case 'action:renameSuccess':
        window.showToast({ message: 'Conversation renamed.', type: 'success' });
        if (message.payload) {
          const { id, newTitle } = message.payload;
          // Update conversation list data
          if (state.moduleData.conversations) {
            const conv = state.moduleData.conversations.find(c => c.id === id);
            if (conv) {
              conv.title = newTitle;
              if (state.currentModule === 'conversations') {
                filterAndRenderSubList('conversations', state.moduleData.conversations);
              }
            }
          }
          // Update right panel header title
          const titleEl = document.getElementById(`acc-conv-title-${id}`);
          if (titleEl) {
            titleEl.textContent = newTitle;
            titleEl.title = newTitle;
          }
          // Update selected item data if this is the active detail
          if (state.selectedItemData && state.selectedItemData.id === id) {
            state.selectedItemData.title = newTitle;
            saveState();
          }
        }
        break;

      // ── SDK: Active Session Changed ──────────────────────────────────
      case 'stream:activeSessionChanged':
        if (message.payload && message.payload.id) {
          updateStatusText(`Active session: ${message.payload.title || message.payload.id.substring(0, 8)}`);
          // Auto-navigate to the active conversation if on conversations tab
          if (state.currentModule === 'conversations') {
            state.selectedItemId = message.payload.id;
            saveState();
            vscode.postMessage({ type: 'request:conversationDetail', payload: message.payload.id });
          }
        }
        break;

      // ── SDK: New Conversation Detected ───────────────────────────────
      case 'stream:newConversation':
        // Refresh conversation list to pick up the new entry
        vscode.postMessage({ type: 'request:conversations' });
        window.showToast({ message: 'New conversation detected', type: 'info' });
        break;

      // ── SDK: State Changed (preferences/settings) ───────────────────
      case 'stream:stateChanged':
        if (message.payload) {
          console.log('[ACC] State changed:', message.payload.key, message.payload.previousSize, '→', message.payload.newSize);
        }
        break;

      // ── SDK: Create Conversation Success ─────────────────────────────
      case 'action:createConversationSuccess':
        if (message.payload && message.payload.id) {
          window.showToast({ message: 'New conversation created!', type: 'success' });
          state.selectedItemId = message.payload.id;
          saveState();
          // Load the new conversation detail
          vscode.postMessage({ type: 'request:conversationDetail', payload: message.payload.id });
        }
        break;

      // ── SDK: Focus Conversation Success ──────────────────────────────
      case 'action:focusConversationSuccess':
        if (message.payload && message.payload.success) {
          window.showToast({ message: 'Focused in Antigravity', type: 'success' });
        }
        break;

      // ── SDK: Step Control Result ─────────────────────────────────────
      case 'action:stepControlResult':
        if (message.payload) {
          const action = message.payload.action || 'Step action';
          const success = message.payload.success;
          window.showToast({
            message: success ? `${action} executed` : `${action} failed (SDK may not be available)`,
            type: success ? 'success' : 'error'
          });
        }
        break;

      // ── SDK: Agent Preferences ───────────────────────────────────────
      case 'data:agentPreferences':
        state.moduleData.agentPreferences = message.payload;
        saveState();
        if (state.currentModule === 'settings') {
          window.Modules.Settings.onPreferencesLoaded(message.payload);
        }
        break;

      // ── SDK: System Diagnostics ──────────────────────────────────────
      case 'data:systemDiagnostics':
        state.moduleData.systemDiagnostics = message.payload;
        saveState();
        if (state.currentModule === 'settings') {
          window.Modules.Settings.onDiagnosticsLoaded(message.payload);
        }
        break;

      // ── SDK: SDK Status ──────────────────────────────────────────────
      case 'data:sdkStatus':
        state.moduleData.sdkStatus = message.payload;
        saveState();
        if (state.currentModule === 'settings') {
          window.Modules.Settings.onSDKStatusLoaded(message.payload);
        }
        break;
    }
  }

  // ----------------------------------------------------
  // 4. Sub-list Panel Renderer (Column 2)                */
  // ----------------------------------------------------
  function renderSubListHeader(moduleId, data) {
    els.subListPanel.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'sub-list-header';
    
    // Search input wrapper
    const searchWrapper = document.createElement('div');
    searchWrapper.className = 'sub-list-search-wrapper';
    
    const searchIcon = document.createElement('span');
    searchIcon.className = 'sub-list-search-icon';
    searchIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg>';
    searchWrapper.appendChild(searchIcon);
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'sub-list-search-input';
    searchInput.placeholder = `Search ${moduleId}...`;
    searchInput.value = state.searchQuery[moduleId] || '';
    searchWrapper.appendChild(searchInput);
    
    header.appendChild(searchWrapper);
    
    // Filter Select (for Conversations Project filtering)
    if (moduleId === 'conversations') {
      const select = document.createElement('select');
      select.className = 'sub-list-filter-select';
      
      const projects = ['All Projects/Repos'];
      data.forEach(c => {
        if (c.project && !projects.includes(c.project)) {
          projects.push(c.project);
        }
      });
      
      projects.forEach(proj => {
        const opt = document.createElement('option');
        opt.value = proj === 'All Projects/Repos' ? '' : proj;
        opt.textContent = proj;
        if (state.projectFilter === opt.value) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });
      
      select.addEventListener('change', (e) => {
        state.projectFilter = e.target.value;
        saveState();
        filterAndRenderSubList(moduleId, data);
      });
      
      header.appendChild(select);
    }
    
    searchInput.addEventListener('input', (e) => {
      state.searchQuery[moduleId] = e.target.value;
      saveState();
      filterAndRenderSubList(moduleId, data);
    });
    
    els.subListPanel.appendChild(header);
    
    // Items Container
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'sub-list-items-container';
    itemsContainer.id = 'sub-list-items';
    els.subListPanel.appendChild(itemsContainer);
  }

  function filterAndRenderSubList(moduleId, data) {
    let filtered = data;
    
    // 1. Search Query filter
    const query = state.searchQuery[moduleId];
    if (query) {
      filtered = filterDataByQuery(moduleId, filtered, query);
    }
    
    // 2. Project filter for conversations
    if (moduleId === 'conversations' && state.projectFilter) {
      filtered = filtered.filter(c => c.project === state.projectFilter);
    }
    
    const itemsContainer = document.getElementById('sub-list-items');
    if (!itemsContainer) return;
    itemsContainer.innerHTML = '';
    
    if (filtered.length === 0) {
      itemsContainer.innerHTML = `<div class="empty-state" style="padding: 20px; font-size: 12px;">No items found</div>`;
      els.detailPanel.innerHTML = '';
      const emptyWrapper = document.createElement('div');
      emptyWrapper.className = 'detail-scroll-wrapper';
      emptyWrapper.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📄</div>
          <div class="empty-state-text">No item selected</div>
          <p>Please select an item from the left panel to load details.</p>
        </div>
      `;
      els.detailPanel.appendChild(emptyWrapper);
      return;
    }
    
    // Default selection: if no selectedItemId is set, select the first one!
    if (!state.selectedItemId || !filtered.some(item => getItemId(moduleId, item) === state.selectedItemId)) {
      state.selectedItemId = getItemId(moduleId, filtered[0]);
      saveState();
    }
    
    filtered.forEach(item => {
      const itemId = getItemId(moduleId, item);
      const isActive = itemId === state.selectedItemId;
      
      const itemEl = document.createElement('div');
      itemEl.className = `sub-list-item ${isActive ? 'active' : ''}`;
      
      let title = '';
      let subtitle = '';
      let tagsHtml = '';
      
      if (moduleId === 'conversations') {
        title = item.title;
        const relativeTime = window.Modules.Conversations.getRelativeTime(item.lastModified);
        subtitle = `<span>${item.stepCount} steps</span> <span style="margin-left: auto;">${relativeTime}</span>`;
        if (item.project) {
          tagsHtml = `<span class="badge badge-workspace" style="font-size: 10px; padding: 1px 4px;">${item.project}</span>`;
        }
      } else if (moduleId === 'mcpServers') {
        title = window.Modules.McpServers.formatServerName(item.name);
        subtitle = `${item.toolCount} tools`;
        if (item.hasInstructions) {
          tagsHtml = `<span class="badge badge-success" style="font-size: 10px; padding: 1px 4px;">📋 Instructions</span>`;
        }
      } else if (moduleId === 'skills') {
        title = item.name;
        subtitle = item.description || 'No description';
        tagsHtml = `<span class="badge badge-${item.source === 'workspace' ? 'workspace' : 'plugin'}" style="font-size: 10px; padding: 1px 4px;">${item.source}</span>`;
      } else if (moduleId === 'agents') {
        title = item.name;
        subtitle = item.description || 'AI Agent blueprint';
      } else if (moduleId === 'rules') {
        title = item.name;
        subtitle = item.filename;
        tagsHtml = `<span class="badge badge-workspace" style="font-size: 10px; padding: 1px 4px;">${item.scope}</span>`;
      } else if (moduleId === 'workflows') {
        title = item.slashCommand;
        subtitle = item.name;
      } else if (moduleId === 'knowledge') {
        title = item.title;
        subtitle = item.summary;
      }

      // Build row action buttons for conversations
      let actionsHtml = '';
      if (moduleId === 'conversations') {
        actionsHtml = `
          <div class="sub-list-item-actions">
            <button class="sub-list-item-action-btn edit" title="Rename" data-conv-id="${item.id}" data-conv-title="${(item.title || '').replace(/"/g, '&quot;')}">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
              </svg>
            </button>
            <button class="sub-list-item-action-btn delete" title="Delete" data-conv-id="${item.id}" data-conv-title="${(item.title || '').replace(/"/g, '&quot;')}">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H5.5l1-1h3l1 1H14a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>`;
      }

      // Use title-row wrapper for conversations to position actions inline
      if (moduleId === 'conversations') {
        itemEl.innerHTML = `
          <div class="sub-list-item-title-row">
            <div class="sub-list-item-title">${title}</div>
            ${actionsHtml}
          </div>
          <div class="sub-list-item-subtitle">${subtitle}</div>
          ${tagsHtml ? `<div class="sub-list-item-tags">${tagsHtml}</div>` : ''}
        `;
      } else {
        itemEl.innerHTML = `
          <div class="sub-list-item-title">${title}</div>
          <div class="sub-list-item-subtitle">${subtitle}</div>
          ${tagsHtml ? `<div class="sub-list-item-tags">${tagsHtml}</div>` : ''}
        `;
      }

      // Wire up Edit/Delete buttons for conversations (stopPropagation to prevent row click)
      if (moduleId === 'conversations') {
        const editBtn = itemEl.querySelector('.sub-list-item-action-btn.edit');
        const deleteBtn = itemEl.querySelector('.sub-list-item-action-btn.delete');

        if (editBtn) {
          editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const convId = editBtn.dataset.convId;
            const convTitle = editBtn.dataset.convTitle;
            if (window.Modules.Conversations && window.Modules.Conversations._showRenameModal) {
              window.Modules.Conversations._showRenameModal(convId, convTitle);
            }
          });
        }

        if (deleteBtn) {
          deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const convId = deleteBtn.dataset.convId;
            const convTitle = deleteBtn.dataset.convTitle;
            _showDeleteConfirmation(convId, convTitle);
          });
        }
      }
      
      itemEl.addEventListener('click', () => {
        state.selectedItemId = itemId;
        saveState();
        
        itemsContainer.querySelectorAll('.sub-list-item').forEach(el => el.classList.remove('active'));
        itemEl.classList.add('active');
        
        loadDetailIntoColumn3(moduleId, item);
      });
      
      itemsContainer.appendChild(itemEl);
    });
    
    // Automatically load details for the currently active item
    const activeItem = filtered.find(item => getItemId(moduleId, item) === state.selectedItemId);
    if (activeItem) {
      loadDetailIntoColumn3(moduleId, activeItem);
    }
  }

  function getItemId(moduleId, item) {
    if (moduleId === 'conversations') return item.id;
    if (moduleId === 'mcpServers') return item.name;
    if (moduleId === 'knowledge') return item.id;
    return item.sourcePath;
  }

  // ── Delete Confirmation Modal ──────────────────────────────────────────
  function _showDeleteConfirmation(convId, convTitle) {
    const body = document.createElement('div');
    body.innerHTML = `
      <p style="color: var(--color-text-secondary); margin-bottom: 12px;">
        Are you sure you want to delete this conversation?
      </p>
      <div style="background: var(--color-surface); border: 1px solid var(--color-surface-border); border-radius: var(--radius-sm); padding: 10px 14px; font-size: 13px;">
        <strong style="color: var(--color-text-primary);">${convTitle}</strong>
      </div>
      <p style="color: var(--color-error); font-size: 12px; margin-top: 10px;">
        ⚠ This action cannot be undone. The conversation data will be permanently removed.
      </p>
    `;

    window.showModal({
      title: 'Delete Conversation',
      body,
      actions: [
        {
          label: 'Delete',
          className: 'btn-danger',
          onClick: (modal) => {
            vscode.postMessage({
              type: 'request:deleteConversation',
              payload: { id: convId }
            });
            // Optimistically remove from list
            if (state.moduleData['conversations']) {
              state.moduleData['conversations'] = state.moduleData['conversations'].filter(c => c.id !== convId);
              renderColumn2(state.currentModule, state.moduleData['conversations']);
            }
            modal.hide();
            window.showToast('Conversation deleted', 'success');
          }
        },
        {
          label: 'Cancel',
          className: 'btn-secondary',
          onClick: (modal) => modal.hide()
        }
      ]
    });
  }

  function loadDetailIntoColumn3(moduleId, item) {
    setLoadingState(true, `Loading details...`, true);
    
    if (moduleId === 'conversations') {
      // Conversations use the full-height chat container directly
      vscode.postMessage({ type: 'request:conversationDetail', payload: item.id });
    } else {
      // All other modules get a scrollable padded wrapper
      setLoadingState(false);
      els.detailPanel.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.className = 'detail-scroll-wrapper';
      els.detailPanel.appendChild(wrapper);
      
      if (moduleId === 'mcpServers') {
        renderMcpServerDetailColumn3(item, wrapper);
      } else if (moduleId === 'skills') {
        window.Modules.Skills.renderDetail(wrapper, item);
      } else if (moduleId === 'agents') {
        window.Modules.Agents.renderDetail(wrapper, item);
      } else if (moduleId === 'rules') {
        window.Modules.Rules.renderDetail(wrapper, item);
      } else if (moduleId === 'workflows') {
        window.Modules.Workflows.renderDetail(wrapper, item);
      } else if (moduleId === 'knowledge') {
        window.Modules.Knowledge.renderDetail(wrapper, item);
      }
    }
  }

  function renderMcpServerDetailColumn3(server, container) {
    if (!container) {
      container = els.detailPanel;
    }
    container.innerHTML = '';
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    header.innerHTML = `
      <h2 class="conv-title-large" style="margin-bottom: 8px;">${window.Modules.McpServers.formatServerName(server.name)}</h2>
      <div class="flex gap-sm items-center">
        <span class="badge badge-workspace">${server.toolCount} Tools</span>
        ${server.hasInstructions ? `<button class="btn btn-secondary" id="server-inst-btn" style="padding: 4px 8px; font-size: 11px;">📋 View Instructions</button>` : ''}
      </div>
    `;
    
    if (server.hasInstructions) {
      const btn = header.querySelector('#server-inst-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          window.Modules.McpServers.showInstructions(server.name, server.instructions);
        });
      }
    }
    container.appendChild(header);
    
    const toolsHeader = document.createElement('h3');
    toolsHeader.className = 'param-section-title';
    toolsHeader.textContent = 'Tools Reference';
    container.appendChild(toolsHeader);
    
    const toolsList = document.createElement('div');
    toolsList.className = 'mcp-tools-list';
    
    const allTools = [...(server.eagerTools || []), ...(server.lazyTools || [])];
    allTools.forEach(tool => {
      const toolCard = document.createElement('div');
      toolCard.className = 'card';
      toolCard.style.cursor = 'default';
      toolCard.style.marginBottom = 'var(--space-md)';
      
      const cardHeader = document.createElement('div');
      cardHeader.className = 'card-header';
      cardHeader.innerHTML = `
        <div style="flex: 1;">
          <h4 class="mcp-tool-name" style="margin: 0; color: var(--color-secondary); font-size: 13.5px;">${tool.name}</h4>
          <span class="card-subtitle" style="font-size: 12px; margin-top: 4px; display: block; color: var(--color-text-secondary);">${tool.description || 'No description.'}</span>
        </div>
        <span class="badge ${tool.isEager ? 'badge-success' : 'badge-workspace'}" style="margin-left: var(--space-sm);">${tool.isEager ? 'Eager' : 'Lazy'}</span>
      `;
      toolCard.appendChild(cardHeader);
      
      const body = document.createElement('div');
      body.className = 'tool-call-content';
      body.style.display = 'block';
      body.style.paddingTop = 'var(--space-sm)';
      
      const params = tool.parameters?.properties || {};
      const required = tool.parameters?.required || [];
      const paramRows = [];
      Object.keys(params).forEach(pName => {
        const details = params[pName];
        paramRows.push({
          name: pName,
          type: details.type || 'any',
          status: required.includes(pName) ? 'Required' : 'Optional',
          description: details.description || 'No description.'
        });
      });
      
      if (paramRows.length > 0) {
        const pLabel = document.createElement('div');
        pLabel.className = 'param-section-title';
        pLabel.style.fontSize = '12px';
        pLabel.textContent = 'Parameters:';
        body.appendChild(pLabel);
        
        const table = window.Components.Table.create({
          columns: [
            { key: 'name', label: 'Name', render: (v) => `<code style="color: var(--color-secondary);">${v}</code>` },
            { key: 'type', label: 'Type', render: (v) => `<code>${v}</code>` },
            { key: 'status', label: 'Status', render: (v) => `<span class="badge ${v === 'Required' ? 'badge-error' : 'badge-workspace'}" style="font-size: 9px; padding: 1px 4px;">${v}</span>` },
            { key: 'description', label: 'Description' }
          ],
          rows: paramRows,
          sortable: false
        });
        body.appendChild(table);
      }
      
      toolCard.appendChild(body);
      toolsList.appendChild(toolCard);
    });
    
    container.appendChild(toolsList);
  }

  // ----------------------------------------------------
  // 6. Search Filters                                    */
  // ----------------------------------------------------
  function filterActiveModuleData(query) {
    const cache = state.moduleData[state.currentModule];
    if (!cache) return;
    renderSubListHeader(state.currentModule, cache);
    filterAndRenderSubList(state.currentModule, cache);
  }

  function filterDataByQuery(moduleId, data, query) {
    if (!query) return data;
    const lowerQuery = query.toLowerCase();
    
    switch (moduleId) {
      case 'conversations':
        return data.filter(c => c.title.toLowerCase().includes(lowerQuery));
      case 'mcpServers':
        return data.filter(s => {
          if (s.name.toLowerCase().includes(lowerQuery)) return true;
          const allTools = [...(s.eagerTools || []), ...(s.lazyTools || [])];
          return allTools.some(t => 
            t.name.toLowerCase().includes(lowerQuery) || 
            t.description.toLowerCase().includes(lowerQuery)
          );
        });
      case 'skills':
        return data.filter(s => 
          s.name.toLowerCase().includes(lowerQuery) || 
          s.description.toLowerCase().includes(lowerQuery)
        );
      case 'agents':
        return data.filter(a => 
          a.name.toLowerCase().includes(lowerQuery) || 
          (a.model && a.model.toLowerCase().includes(lowerQuery))
        );
      case 'rules':
        return data.filter(r => 
          r.name.toLowerCase().includes(lowerQuery) || 
          r.content.toLowerCase().includes(lowerQuery)
        );
      case 'workflows':
        return data.filter(w => 
          w.slashCommand.toLowerCase().includes(lowerQuery) || 
          w.name.toLowerCase().includes(lowerQuery)
        );
      case 'knowledge':
        return data.filter(k => 
          k.title.toLowerCase().includes(lowerQuery) || 
          k.summary.toLowerCase().includes(lowerQuery)
        );
      default:
        return data;
    }
  }

  // ----------------------------------------------------
  // 7. Utility States & UI Indicators                    */
  // ----------------------------------------------------
  function setLoadingState(isLoading, message = '', isDetailOnly = false) {
    if (isLoading) {
      els.statusIndicator.className = 'status-indicator loading';
      updateStatusText(message);
      
      if (isDetailOnly) {
        els.detailPanel.innerHTML = '';
        const skWrapper = document.createElement('div');
        skWrapper.className = 'detail-scroll-wrapper';
        skWrapper.appendChild(window.Components.Skeleton.create('detail'));
        els.detailPanel.appendChild(skWrapper);
      } else {
        els.subListPanel.innerHTML = `<div style="padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-sm);">${window.Components.Skeleton.create('card-list').outerHTML}</div>`;
        els.detailPanel.innerHTML = '';
        const skWrapper = document.createElement('div');
        skWrapper.className = 'detail-scroll-wrapper';
        skWrapper.appendChild(window.Components.Skeleton.create('detail'));
        els.detailPanel.appendChild(skWrapper);
      }
    } else {
      els.statusIndicator.className = 'status-indicator';
    }
  }

  function updateStatusText(text) {
    els.statusText.textContent = text;
  }

  function updateBadge(moduleId, count) {
    const item = els.sidebarNav.querySelector(`.nav-item[data-id="${moduleId}"]`);
    if (!item) return;
    
    let badge = item.querySelector('.nav-item-badge');
    if (count > 0) {
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'nav-item-badge';
        item.appendChild(badge);
      }
      badge.textContent = count;
    } else if (badge) {
      item.removeChild(badge);
    }
  }

  function updateTimestamp() {
    const now = new Date();
    els.lastUpdatedText.textContent = `Synced: ${now.toLocaleTimeString()}`;
  }

  function saveState() {
    vscode.setState({
      currentModule: state.currentModule,
      selectedItemId: state.selectedItemId,
      selectedItemData: state.selectedItemData,
      searchQuery: state.searchQuery,
      projectFilter: state.projectFilter
    });
    updateTimestamp();
  }

  function handleGlobalKeydown(e) {
    // ESC -> dismiss modal
    if (e.key === 'Escape') {
      window.hideModal();
    }
    
    // Ctrl+R or Cmd+R -> Refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
      e.preventDefault();
      refreshData();
    }
    
    // Ctrl+K or Cmd+K -> Focus Search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const input = els.searchBarContainer.querySelector('.search-input');
      if (input) {
        input.focus();
      }
    }
  }

  // Run initializations
  document.addEventListener('DOMContentLoaded', init);
})();
