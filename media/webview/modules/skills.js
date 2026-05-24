// Skills UI Module

window.Modules = window.Modules || {};

window.Modules.Skills = {
  renderList(container, skills, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    // Add simple filter tabs
    const headerRow = document.createElement('div');
    headerRow.className = 'flex justify-between items-center';
    headerRow.style.marginBottom = 'var(--space-md)';
    
    const filterTabs = document.createElement('div');
    filterTabs.className = 'flex gap-sm';
    
    const tabs = ['All', 'Workspace', 'Plugin'];
    let activeTab = localStorage.getItem('skills-active-tab') || 'All';
    
    const renderFiltered = (tabName) => {
      let filtered = skills;
      if (tabName === 'Workspace') {
        filtered = skills.filter(s => s.source === 'workspace');
      } else if (tabName === 'Plugin') {
        filtered = skills.filter(s => s.source === 'plugin');
      }
      this.renderGrid(container.querySelector('.skills-grid-container'), filtered, onSelect);
    };
    
    tabs.forEach(tab => {
      const btn = document.createElement('button');
      btn.className = `btn ${tab === activeTab ? 'btn-primary' : 'btn-secondary'}`;
      btn.textContent = `${tab} (${tab === 'All' ? skills.length : (tab === 'Workspace' ? skills.filter(s => s.source === 'workspace').length : skills.filter(s => s.source === 'plugin').length)})`;
      btn.addEventListener('click', () => {
        filterTabs.querySelectorAll('button').forEach(b => {
          b.className = 'btn btn-secondary';
        });
        btn.className = 'btn btn-primary';
        activeTab = tab;
        localStorage.setItem('skills-active-tab', tab);
        renderFiltered(tab);
      });
      filterTabs.appendChild(btn);
    });
    
    headerRow.appendChild(filterTabs);
    container.appendChild(headerRow);
    
    const gridContainer = document.createElement('div');
    gridContainer.className = 'skills-grid-container';
    container.appendChild(gridContainer);
    
    renderFiltered(activeTab);
  },
  
  renderGrid(container, skills, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!skills || skills.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">🧠</div>
        <div class="empty-state-text">No skills found</div>
        <p>Skills represent coding protocols and expert kits available to Antigravity.</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    skills.forEach(skill => {
      const isWorkspace = skill.source === 'workspace';
      const card = window.Components.Card.create({
        title: skill.name,
        subtitle: isWorkspace ? 'Workspace Skill' : `Plugin: ${skill.pluginName || 'Global'}`,
        badges: [
          { 
            text: isWorkspace ? 'Workspace' : 'Plugin', 
            className: isWorkspace ? 'badge-workspace' : 'badge-plugin' 
          }
        ],
        body: skill.description || 'No description provided.',
        actions: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 4 8 4c2.02 0 3.82.668 5.167 1.957A13.142 13.142 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12 8 12c-2.02 0-3.82-.668-5.167-1.957A13.14 13.14 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>`,
            title: 'View Skill Content',
            onClick: () => onSelect(skill)
          }
        ],
        onClick: () => onSelect(skill)
      });
      
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  },
  
  renderDetail(container, skill, onBack) {
    if (!container) return;
    container.innerHTML = '';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'back-link';
    backBtn.innerHTML = '← Back to Skills';
    backBtn.addEventListener('click', onBack);
    container.appendChild(backBtn);
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    
    const title = document.createElement('h2');
    title.className = 'conv-title-large';
    title.textContent = skill.name;
    header.appendChild(title);
    
    const sourceBadge = document.createElement('span');
    sourceBadge.className = `badge ${skill.source === 'workspace' ? 'badge-workspace' : 'badge-plugin'}`;
    sourceBadge.style.fontSize = '12px';
    sourceBadge.textContent = skill.source === 'workspace' ? 'Workspace' : `Plugin: ${skill.pluginName || 'Global'}`;
    header.appendChild(sourceBadge);
    
    const desc = document.createElement('p');
    desc.style.marginTop = 'var(--space-md)';
    desc.style.color = 'var(--color-text-secondary)';
    desc.textContent = skill.description;
    header.appendChild(desc);
    
    const pathText = document.createElement('div');
    pathText.style.fontFamily = 'var(--font-mono)';
    pathText.style.fontSize = '11px';
    pathText.style.color = 'var(--color-text-muted)';
    pathText.style.marginTop = 'var(--space-sm)';
    pathText.textContent = `Location: ${skill.sourcePath}`;
    header.appendChild(pathText);
    
    // Add Action Buttons
    const btnRow = document.createElement('div');
    btnRow.style.marginTop = 'var(--space-md)';
    btnRow.className = 'flex gap-sm';
    
    const openBtn = document.createElement('button');
    openBtn.className = 'btn btn-secondary';
    openBtn.innerHTML = 'Open in IDE';
    openBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openInEditor',
        payload: `${skill.sourcePath}/SKILL.md`
      });
    });
    btnRow.appendChild(openBtn);
    
    const openDirBtn = document.createElement('button');
    openDirBtn.className = 'btn btn-secondary';
    openDirBtn.innerHTML = 'Reveal Folder';
    openDirBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openDirectory',
        payload: skill.sourcePath
      });
    });
    btnRow.appendChild(openDirBtn);
    header.appendChild(btnRow);
    
    container.appendChild(header);
    
    // Renders SKILL.md body text in a card
    const bodyHeader = document.createElement('h3');
    bodyHeader.className = 'param-section-title';
    bodyHeader.textContent = 'Skill Instructions (SKILL.md)';
    container.appendChild(bodyHeader);
    
    const contentCard = document.createElement('div');
    contentCard.className = 'card';
    contentCard.style.cursor = 'default';
    contentCard.style.padding = 'var(--space-lg)';
    
    // Render basic markdown
    const formatted = skill.content
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
      
    const bodyText = document.createElement('div');
    bodyText.style.fontSize = '13.5px';
    bodyText.style.display = 'flex';
    bodyText.style.flexDirection = 'column';
    bodyText.style.gap = 'var(--space-sm)';
    bodyText.innerHTML = formatted || '<p>No content provided in SKILL.md.</p>';
    
    contentCard.appendChild(bodyText);
    container.appendChild(contentCard);
    
    // Skill directory files
    if (skill.files && skill.files.length > 0) {
      const filesHeader = document.createElement('h3');
      filesHeader.className = 'param-section-title';
      filesHeader.textContent = 'Directory Files';
      container.appendChild(filesHeader);
      
      const filesGrid = document.createElement('div');
      filesGrid.className = 'flex flex-wrap gap-sm';
      
      skill.files.forEach(file => {
        const badge = document.createElement('span');
        badge.className = 'badge badge-workspace';
        badge.style.cursor = 'pointer';
        badge.textContent = file;
        badge.addEventListener('click', () => {
          vscode.postMessage({
            type: 'request:openInEditor',
            payload: `${skill.sourcePath}/${file}`
          });
        });
        filesGrid.appendChild(badge);
      });
      
      container.appendChild(filesGrid);
    }
  }
};
