// Knowledge Items UI Module

window.Modules = window.Modules || {};

window.Modules.Knowledge = {
  renderList(container, items, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!items || items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">📚</div>
        <div class="empty-state-text">No Knowledge Items detected</div>
        <p>Ensure you have curated Knowledge Items under ~/.gemini/antigravity-ide/knowledge/</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    items.forEach(ki => {
      const card = window.Components.Card.create({
        title: ki.title,
        subtitle: ki.lastAccessed ? `Accessed: ${new Date(ki.lastAccessed).toLocaleDateString()}` : 'Curated context',
        badges: [
          { text: `${ki.artifactPaths?.length || 0} artifacts`, className: 'badge-workspace' }
        ],
        body: ki.summary || 'Summary of localized knowledge regarding coding structures and rules.',
        actions: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 4 8 4c2.02 0 3.82.668 5.167 1.957A13.142 13.142 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12 8 12c-2.02 0-3.82-.668-5.167-1.957A13.14 13.14 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>`,
            title: 'View Knowledge details',
            onClick: () => onSelect(ki)
          }
        ],
        onClick: () => onSelect(ki)
      });
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  },
  
  renderDetail(container, ki, onBack) {
    if (!container) return;
    container.innerHTML = '';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'back-link';
    backBtn.innerHTML = '← Back to Knowledge';
    backBtn.addEventListener('click', onBack);
    container.appendChild(backBtn);
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    
    const title = document.createElement('h2');
    title.className = 'conv-title-large';
    title.textContent = ki.title;
    header.appendChild(title);
    
    const stat = document.createElement('span');
    stat.className = 'badge badge-workspace';
    stat.style.fontSize = '12px';
    stat.textContent = `Location: ~/.gemini/antigravity-ide/knowledge/${ki.id}`;
    header.appendChild(stat);
    
    const summary = document.createElement('p');
    summary.style.marginTop = 'var(--space-md)';
    summary.style.color = 'var(--color-text-primary)';
    summary.textContent = ki.summary || 'Curated workspace documentation summaries.';
    header.appendChild(summary);
    
    const btnRow = document.createElement('div');
    btnRow.style.marginTop = 'var(--space-md)';
    btnRow.className = 'flex gap-sm';
    
    const openBtn = document.createElement('button');
    openBtn.className = 'btn btn-secondary';
    openBtn.innerHTML = 'Reveal Folder';
    openBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openDirectory',
        payload: ki.basePath
      });
    });
    btnRow.appendChild(openBtn);
    header.appendChild(btnRow);
    
    container.appendChild(header);
    
    // References List
    if (ki.references && ki.references.length > 0) {
      const refTitle = document.createElement('h3');
      refTitle.className = 'param-section-title';
      refTitle.textContent = 'Context References';
      container.appendChild(refTitle);
      
      const list = document.createElement('ul');
      list.style.paddingLeft = '20px';
      list.style.marginBottom = 'var(--space-lg)';
      ki.references.forEach(ref => {
        const li = document.createElement('li');
        li.style.color = 'var(--color-text-secondary)';
        li.textContent = ref;
        list.appendChild(li);
      });
      container.appendChild(list);
    }
    
    // Artifact files browser
    if (ki.artifactPaths && ki.artifactPaths.length > 0) {
      const artTitle = document.createElement('h3');
      artTitle.className = 'param-section-title';
      artTitle.textContent = 'Knowledge Artifacts';
      container.appendChild(artTitle);
      
      const artList = document.createElement('div');
      artList.className = 'flex flex-col gap-xs';
      
      ki.artifactPaths.forEach(file => {
        const item = document.createElement('div');
        item.className = 'mcp-tool-row';
        item.innerHTML = `
          <div class="flex items-center gap-sm">
            <span class="mcp-tool-name" style="color: var(--color-primary)">${file}</span>
          </div>
          <div>
            <span class="badge badge-workspace">Markdown</span>
          </div>
        `;
        item.addEventListener('click', () => {
          vscode.postMessage({
            type: 'request:openInEditor',
            payload: `${ki.basePath}/artifacts/${file}`
          });
        });
        artList.appendChild(item);
      });
      
      container.appendChild(artList);
    }
  }
};
