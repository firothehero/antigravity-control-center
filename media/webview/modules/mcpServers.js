// MCP Servers UI Module

window.Modules = window.Modules || {};

window.Modules.McpServers = {
  renderList(container, servers, onSelectTool) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!servers || servers.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">🔌</div>
        <div class="empty-state-text">No MCP servers detected</div>
        <p>Ensure you have configured MCP servers in ~/.gemini/antigravity-ide/mcp/</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    servers.forEach(server => {
      const card = document.createElement('div');
      card.className = 'card';
      card.style.cursor = 'default';
      
      const header = document.createElement('div');
      header.className = 'card-header';
      
      const titleContainer = document.createElement('div');
      const title = document.createElement('h4');
      title.className = 'card-title';
      title.textContent = this.formatServerName(server.name);
      titleContainer.appendChild(title);
      
      const subtitle = document.createElement('span');
      subtitle.className = 'card-subtitle';
      subtitle.textContent = `${server.toolCount} tools available`;
      titleContainer.appendChild(subtitle);
      header.appendChild(titleContainer);
      
      const badges = document.createElement('div');
      badges.className = 'flex gap-xs';
      if (server.hasInstructions) {
        const instBadge = document.createElement('span');
        instBadge.className = 'badge badge-success';
        instBadge.style.cursor = 'pointer';
        instBadge.innerHTML = '📋 Instructions';
        instBadge.addEventListener('click', (e) => {
          e.stopPropagation();
          this.showInstructions(server.name, server.instructions);
        });
        badges.appendChild(instBadge);
      }
      header.appendChild(badges);
      card.appendChild(header);
      
      const body = document.createElement('div');
      body.className = 'mcp-details-wrapper';
      
      // Expandable tools container
      const toolsContainer = document.createElement('div');
      toolsContainer.className = 'mcp-tools-list';
      
      const eager = server.eagerTools || [];
      const lazy = server.lazyTools || [];
      const allTools = [...eager, ...lazy];
      
      allTools.forEach(tool => {
        const row = document.createElement('div');
        row.className = 'mcp-tool-row';
        row.addEventListener('click', () => {
          onSelectTool(server.name, tool.name);
        });
        
        const left = document.createElement('div');
        left.className = 'flex items-center gap-sm';
        
        const toolNameEl = document.createElement('span');
        toolNameEl.className = 'mcp-tool-name';
        toolNameEl.textContent = tool.name;
        left.appendChild(toolNameEl);
        
        const toolDescEl = document.createElement('span');
        toolDescEl.className = 'mcp-tool-desc';
        toolDescEl.textContent = tool.description;
        left.appendChild(toolDescEl);
        
        row.appendChild(left);
        
        const right = document.createElement('div');
        const badge = document.createElement('span');
        badge.className = `mcp-tool-badge badge ${tool.isEager ? 'badge-success' : 'badge-workspace'}`;
        badge.textContent = tool.isEager ? 'Eager' : 'Lazy';
        right.appendChild(badge);
        
        row.appendChild(right);
        toolsContainer.appendChild(row);
      });
      
      body.appendChild(toolsContainer);
      card.appendChild(body);
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  },
  
  renderToolDetail(container, serverName, tool, onBack) {
    if (!container) return;
    container.innerHTML = '';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'back-link';
    backBtn.innerHTML = '← Back to MCP Servers';
    backBtn.addEventListener('click', onBack);
    container.appendChild(backBtn);
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    
    const title = document.createElement('h2');
    title.className = 'conv-title-large';
    title.style.fontFamily = 'var(--font-mono)';
    title.style.color = 'var(--color-secondary)';
    title.textContent = tool.name;
    header.appendChild(title);
    
    const serverBadge = document.createElement('span');
    serverBadge.className = 'badge badge-workspace';
    serverBadge.style.fontSize = '12px';
    serverBadge.textContent = `Server: ${this.formatServerName(serverName)}`;
    header.appendChild(serverBadge);
    
    const desc = document.createElement('p');
    desc.style.marginTop = 'var(--space-md)';
    desc.style.color = 'var(--color-text-primary)';
    desc.textContent = tool.description || 'No description provided for this tool.';
    header.appendChild(desc);
    
    container.appendChild(header);
    
    // Render parameter schemas
    const paramTitle = document.createElement('h3');
    paramTitle.className = 'param-section-title';
    paramTitle.textContent = 'Input Parameters';
    container.appendChild(paramTitle);
    
    const params = tool.parameters?.properties || {};
    const required = tool.parameters?.required || [];
    
    const paramRows = [];
    Object.keys(params).forEach(name => {
      const details = params[name];
      paramRows.push({
        name,
        type: details.type || 'any',
        required: required.includes(name) ? 'Required' : 'Optional',
        description: details.description || 'No description provided.'
      });
    });
    
    if (paramRows.length > 0) {
      const table = window.Components.Table.create({
        columns: [
          { key: 'name', label: 'Parameter', render: (val) => `<span class="param-name">${val}</span>` },
          { key: 'type', label: 'Type', render: (val) => `<span class="param-type">${val}</span>` },
          { key: 'required', label: 'Status', render: (val) => {
              const isReq = val === 'Required';
              return `<span class="badge ${isReq ? 'badge-error' : 'badge-workspace'}">${val}</span>`;
            } 
          },
          { key: 'description', label: 'Description' }
        ],
        rows: paramRows,
        sortable: false
      });
      container.appendChild(table);
    } else {
      const empty = document.createElement('div');
      empty.style.color = 'var(--color-text-muted)';
      empty.style.padding = 'var(--space-md) 0';
      empty.textContent = 'No input parameters required.';
      container.appendChild(empty);
    }
    
    // Raw JSON Schema
    const jsonTitle = document.createElement('h3');
    jsonTitle.className = 'param-section-title';
    jsonTitle.textContent = 'Raw JSON Schema';
    container.appendChild(jsonTitle);
    
    const codeBlock = window.Components.CodeBlock.create({
      code: JSON.stringify(tool, null, 2),
      language: 'json'
    });
    container.appendChild(codeBlock);
  },
  
  formatServerName(name) {
    if (!name) return '';
    return name
      .replace(/-mcp$/, '')
      .split(/[-_]+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  },
  
  showInstructions(serverName, instructions) {
    if (!instructions) return;
    
    // Basic markdown conversion in browser
    const formatted = instructions
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^#\s+(.+)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.+)$/gm, '<h4>$1</h4>')
      .replace(/^###\s+(.+)$/gm, '<h5>$1</h5>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="font-family: var(--font-mono); background: rgba(0,0,0,0.2); padding: 2px 4px; border-radius: 4px;">$1</code>')
      .replace(/^\s*-\s+(.+)$/gm, '<li style="margin-left: 20px;">$1</li>');
      
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = 'var(--space-md)';
    wrapper.innerHTML = formatted;
    
    window.showModal({
      title: `${this.formatServerName(serverName)} Instructions`,
      body: wrapper,
      actions: [
        {
          label: 'Close',
          className: 'btn-primary',
          onClick: (modal) => modal.hide()
        }
      ]
    });
  }
};
