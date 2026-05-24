// Reusable Card Component

window.Components = window.Components || {};

window.Components.Card = {
  create({ title, subtitle, badges = [], body, actions = [], onClick }) {
    const card = document.createElement('div');
    card.className = 'card';
    
    // Header
    const header = document.createElement('div');
    header.className = 'card-header';
    
    const titleContainer = document.createElement('div');
    const titleEl = document.createElement('h4');
    titleEl.className = 'card-title';
    titleEl.textContent = title;
    titleContainer.appendChild(titleEl);
    
    if (subtitle) {
      const subtitleEl = document.createElement('span');
      subtitleEl.className = 'card-subtitle';
      subtitleEl.textContent = subtitle;
      titleContainer.appendChild(subtitleEl);
    }
    
    header.appendChild(titleContainer);
    
    // Badges
    if (badges && badges.length > 0) {
      const badgesContainer = document.createElement('div');
      badgesContainer.className = 'flex gap-xs';
      badges.forEach(badge => {
        const badgeEl = document.createElement('span');
        badgeEl.className = `badge ${badge.className || ''}`;
        badgeEl.textContent = badge.text;
        badgesContainer.appendChild(badgeEl);
      });
      header.appendChild(badgesContainer);
    }
    
    card.appendChild(header);
    
    // Body
    if (body) {
      const bodyEl = document.createElement('div');
      bodyEl.className = 'card-body';
      bodyEl.textContent = body;
      card.appendChild(bodyEl);
    }
    
    // Footer / Actions
    if ((actions && actions.length > 0) || onClick) {
      const footer = document.createElement('div');
      footer.className = 'card-footer';
      
      const detailsText = document.createElement('span');
      detailsText.className = 'card-subtitle';
      footer.appendChild(detailsText);
      
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'card-actions';
      
      actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = `btn ${action.className || 'btn-secondary'} btn-icon`;
        btn.innerHTML = action.icon;
        btn.setAttribute('title', action.title || '');
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          action.onClick();
        });
        actionsContainer.appendChild(btn);
      });
      
      footer.appendChild(actionsContainer);
      card.appendChild(footer);
    }
    
    if (onClick) {
      card.addEventListener('click', onClick);
    }
    
    return card;
  }
};
