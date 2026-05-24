// Agents UI Module

window.Modules = window.Modules || {};

window.Modules.Agents = {
  renderList(container, agents, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!agents || agents.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">🤖</div>
        <div class="empty-state-text">No workspace agents detected</div>
        <p>Ensure you have configured agents inside your workspace's .agents/agents/ folder.</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    agents.forEach(agent => {
      const card = window.Components.Card.create({
        title: agent.name,
        subtitle: agent.model || 'Model unassigned',
        badges: [
          { text: `${agent.skills?.length || 0} skills`, className: 'badge-workspace' },
          { text: `${agent.tools?.length || 0} tools`, className: 'badge-plugin' }
        ],
        body: agent.description || 'Custom autonomous workspace specialist configured to execute structured coding behaviors.',
        actions: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 4 8 4c2.02 0 3.82.668 5.167 1.957A13.142 13.142 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12 8 12c-2.02 0-3.82-.668-5.167-1.957A13.14 13.14 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>`,
            title: 'View Agent config',
            onClick: () => onSelect(agent)
          }
        ],
        onClick: () => onSelect(agent)
      });
      
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  },
  
  renderDetail(container, agent, onBack) {
    if (!container) return;
    container.innerHTML = '';
    
    const backBtn = document.createElement('div');
    backBtn.className = 'back-link';
    backBtn.innerHTML = '← Back to Agents';
    backBtn.addEventListener('click', onBack);
    container.appendChild(backBtn);
    
    const header = document.createElement('div');
    header.className = 'conv-header-card';
    
    const title = document.createElement('h2');
    title.className = 'conv-title-large';
    title.textContent = agent.name;
    header.appendChild(title);
    
    const modelBadge = document.createElement('span');
    modelBadge.className = 'badge badge-success';
    modelBadge.style.fontSize = '12px';
    modelBadge.textContent = `Model: ${agent.model || 'Default'}`;
    header.appendChild(modelBadge);
    
    const desc = document.createElement('p');
    desc.style.marginTop = 'var(--space-md)';
    desc.style.color = 'var(--color-text-secondary)';
    desc.textContent = agent.description || 'Autonomous specialist configured inside this workspace.';
    header.appendChild(desc);
    
    const pathText = document.createElement('div');
    pathText.style.fontFamily = 'var(--font-mono)';
    pathText.style.fontSize = '11px';
    pathText.style.color = 'var(--color-text-muted)';
    pathText.style.marginTop = 'var(--space-sm)';
    pathText.textContent = `File Location: ${agent.sourcePath}`;
    header.appendChild(pathText);
    
    const btnRow = document.createElement('div');
    btnRow.style.marginTop = 'var(--space-md)';
    btnRow.className = 'flex gap-sm';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-secondary';
    editBtn.innerHTML = 'Open in IDE';
    editBtn.addEventListener('click', () => {
      vscode.postMessage({
        type: 'request:openInEditor',
        payload: agent.sourcePath
      });
    });
    btnRow.appendChild(editBtn);
    header.appendChild(btnRow);
    
    container.appendChild(header);
    
    // Skills and tools columns
    const columns = document.createElement('div');
    columns.style.display = 'grid';
    columns.style.gridTemplateColumns = '1fr 1fr';
    columns.style.gap = 'var(--space-lg)';
    columns.style.marginBottom = 'var(--space-lg)';
    
    // Skills
    const skillsCol = document.createElement('div');
    skillsCol.className = 'card';
    skillsCol.style.cursor = 'default';
    skillsCol.innerHTML = `<h3 class="modal-title" style="margin-bottom: var(--space-sm)">Assigned Skills (${agent.skills?.length || 0})</h3>`;
    
    if (agent.skills && agent.skills.length > 0) {
      const list = document.createElement('ul');
      list.style.paddingLeft = '20px';
      agent.skills.forEach(s => {
        const li = document.createElement('li');
        li.textContent = s;
        list.appendChild(li);
      });
      skillsCol.appendChild(list);
    } else {
      skillsCol.innerHTML += '<p style="color: var(--color-text-muted)">No skills assigned to this agent.</p>';
    }
    
    // Tools
    const toolsCol = document.createElement('div');
    toolsCol.className = 'card';
    toolsCol.style.cursor = 'default';
    toolsCol.innerHTML = `<h3 class="modal-title" style="margin-bottom: var(--space-sm)">Configured Tools (${agent.tools?.length || 0})</h3>`;
    
    if (agent.tools && agent.tools.length > 0) {
      const list = document.createElement('ul');
      list.style.paddingLeft = '20px';
      agent.tools.forEach(t => {
        const li = document.createElement('li');
        li.textContent = t;
        list.appendChild(li);
      });
      toolsCol.appendChild(list);
    } else {
      toolsCol.innerHTML += '<p style="color: var(--color-text-muted)">No tools configured for this agent.</p>';
    }
    
    columns.appendChild(skillsCol);
    columns.appendChild(toolsCol);
    container.appendChild(columns);
    
    // Raw Instructions
    const rawTitle = document.createElement('h3');
    rawTitle.className = 'param-section-title';
    rawTitle.textContent = 'Configuration content';
    container.appendChild(rawTitle);
    
    const codeBlock = window.Components.CodeBlock.create({
      code: agent.content || 'Empty configuration instructions.',
      language: 'markdown'
    });
    container.appendChild(codeBlock);
  }
};
