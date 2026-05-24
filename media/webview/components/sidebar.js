// Sidebar Component

window.Components = window.Components || {};

window.Components.Sidebar = {
  render(container, items, activeId, onSelect) {
    if (!container) return;
    
    container.innerHTML = '';
    
    items.forEach(item => {
      const navItem = document.createElement('div');
      navItem.className = `nav-item ${item.id === activeId ? 'active' : ''}`;
      navItem.setAttribute('data-id', item.id);
      navItem.setAttribute('title', item.label);
      
      const iconSpan = document.createElement('span');
      iconSpan.className = 'nav-item-icon';
      iconSpan.innerHTML = item.icon;
      
      const labelSpan = document.createElement('span');
      labelSpan.textContent = item.label;
      
      navItem.appendChild(iconSpan);
      navItem.appendChild(labelSpan);
      
      if (item.badgeCount !== undefined && item.badgeCount > 0) {
        const badgeSpan = document.createElement('span');
        badgeSpan.className = 'nav-item-badge';
        badgeSpan.textContent = item.badgeCount;
        navItem.appendChild(badgeSpan);
      }
      
      navItem.addEventListener('click', () => {
        if (item.id !== activeId) {
          onSelect(item.id);
        }
      });
      
      container.appendChild(navItem);
    });
  },
  
  initCollapse(shellEl, btnEl) {
    if (!shellEl || !btnEl) return;
    
    // Check local storage / state
    const isCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (isCollapsed) {
      shellEl.classList.add('sidebar-collapsed');
    }
    
    btnEl.addEventListener('click', () => {
      const collapsed = shellEl.classList.toggle('sidebar-collapsed');
      localStorage.setItem('sidebar-collapsed', collapsed ? 'true' : 'false');
    });
  }
};
