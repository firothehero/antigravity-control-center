// Rules UI Module

window.Modules = window.Modules || {};

window.Modules.Rules = {
  renderList(container, rules, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!rules || rules.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">📜</div>
        <div class="empty-state-text">No workspace rules found</div>
        <p>Workspace rules represent mandatory developer standards applied globally to all tasks.</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    rules.forEach(rule => {
      const card = window.Components.Card.create({
        title: rule.name,
        subtitle: rule.filename,
        badges: [
          { text: rule.scope.toUpperCase(), className: 'badge-workspace' }
        ],
        body: rule.preview || 'Standard instruction block.',
        actions: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 4 8 4c2.02 0 3.82.668 5.167 1.957A13.142 13.142 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12 8 12c-2.02 0-3.82-.668-5.167-1.957A13.14 13.14 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>`,
            title: 'View Rule Content',
            onClick: () => onSelect(rule)
          }
        ],
        onClick: () => onSelect(rule)
      });
      
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  },
  
  renderDetail(container, rule, onBack) {
    if (!container) return;
    container.innerHTML = '';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'back-link';
    backBtn.innerHTML = '← Back to Rules';
    backBtn.addEventListener('click', onBack);
    container.appendChild(backBtn);
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    
    const title = document.createElement('h2');
    title.className = 'conv-title-large';
    title.textContent = rule.name;
    header.appendChild(title);
    
    const badge = document.createElement('span');
    badge.className = 'badge badge-workspace';
    badge.style.fontSize = '12px';
    badge.textContent = `Scope: ${rule.scope.toUpperCase()}`;
    header.appendChild(badge);
    
    const filenameEl = document.createElement('div');
    filenameEl.style.fontFamily = 'var(--font-mono)';
    filenameEl.style.fontSize = '11px';
    filenameEl.style.color = 'var(--color-text-muted)';
    filenameEl.style.marginTop = 'var(--space-sm)';
    filenameEl.textContent = `File Location: ${rule.sourcePath}`;
    header.appendChild(filenameEl);
    
    const btnRow = document.createElement('div');
    btnRow.style.marginTop = 'var(--space-md)';
    btnRow.className = 'flex gap-sm';
    
    const openBtn = document.createElement('button');
    openBtn.className = 'btn btn-secondary';
    openBtn.innerHTML = 'Open in IDE';
    openBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openInEditor',
        payload: rule.sourcePath
      });
    });
    btnRow.appendChild(openBtn);
    header.appendChild(btnRow);
    
    container.appendChild(header);
    
    // Markdown container
    const contentCard = document.createElement('div');
    contentCard.className = 'card';
    contentCard.style.cursor = 'default';
    contentCard.style.padding = 'var(--space-lg)';
    
    const formatted = rule.content
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
    bodyText.innerHTML = formatted || '<p>No content provided in this rule.</p>';
    
    contentCard.appendChild(bodyText);
    container.appendChild(contentCard);
  }
};
