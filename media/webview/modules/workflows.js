// Workflows UI Module

window.Modules = window.Modules || {};

window.Modules.Workflows = {
  renderList(container, workflows, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!workflows || workflows.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">🔄</div>
        <div class="empty-state-text">No workspace workflows found</div>
        <p>Workflows define standard multi-step agent actions triggered via slash commands.</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    // Sortable Table structure for Workflows list
    const table = window.Components.Table.create({
      columns: [
        { 
          key: 'slashCommand', 
          label: 'Slash Command', 
          render: (val) => `<code style="font-family: var(--font-mono); color: var(--color-primary); font-weight: bold; background: rgba(var(--color-primary-rgb), 0.1); padding: 4px 8px; border-radius: var(--radius-xs)">${val}</code>` 
        },
        { key: 'name', label: 'Name' },
        { key: 'description', label: 'Description' }
      ],
      rows: workflows,
      onRowClick: (row) => onSelect(row),
      sortable: true
    });
    
    container.appendChild(table);
  },
  
  renderDetail(container, workflow, onBack) {
    if (!container) return;
    container.innerHTML = '';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'back-link';
    backBtn.innerHTML = '← Back to Workflows';
    backBtn.addEventListener('click', onBack);
    container.appendChild(backBtn);
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    
    const title = document.createElement('h2');
    title.className = 'conv-title-large';
    title.innerHTML = `<code style="font-family: var(--font-mono); color: var(--color-primary); background: rgba(var(--color-primary-rgb), 0.1); padding: 4px 12px; border-radius: var(--radius-sm)">${workflow.slashCommand}</code> ${workflow.name}`;
    header.appendChild(title);
    
    const desc = document.createElement('p');
    desc.style.marginTop = 'var(--space-md)';
    desc.style.color = 'var(--color-text-secondary)';
    desc.textContent = workflow.description;
    header.appendChild(desc);
    
    const fileEl = document.createElement('div');
    fileEl.style.fontFamily = 'var(--font-mono)';
    fileEl.style.fontSize = '11px';
    fileEl.style.color = 'var(--color-text-muted)';
    fileEl.style.marginTop = 'var(--space-sm)';
    fileEl.textContent = `File Location: ${workflow.sourcePath}`;
    header.appendChild(fileEl);
    
    const btnRow = document.createElement('div');
    btnRow.style.marginTop = 'var(--space-md)';
    btnRow.className = 'flex gap-sm';
    
    const openBtn = document.createElement('button');
    openBtn.className = 'btn btn-secondary';
    openBtn.innerHTML = 'Open in IDE';
    openBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openInEditor',
        payload: workflow.sourcePath
      });
    });
    btnRow.appendChild(openBtn);
    header.appendChild(btnRow);
    
    container.appendChild(header);
    
    // Workflow Content
    const contentCard = document.createElement('div');
    contentCard.className = 'card';
    contentCard.style.cursor = 'default';
    contentCard.style.padding = 'var(--space-lg)';
    
    const formatted = workflow.content
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
    bodyText.innerHTML = formatted || '<p>No content provided in this workflow.</p>';
    
    contentCard.appendChild(bodyText);
    container.appendChild(contentCard);
  }
};
