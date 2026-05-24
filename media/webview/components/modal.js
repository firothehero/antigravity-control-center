// Modal System Component (No browser popups allowed)

window.Components = window.Components || {};

window.Components.Modal = {
  show({ title, body, actions }) {
    const overlay = document.getElementById('modal-overlay');
    const container = document.getElementById('modal-container');
    
    if (!overlay || !container) return;
    
    container.innerHTML = '';
    
    // Header
    const header = document.createElement('div');
    header.className = 'modal-header';
    
    const titleEl = document.createElement('h3');
    titleEl.className = 'modal-title';
    titleEl.textContent = title;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.hide());
    
    header.appendChild(titleEl);
    header.appendChild(closeBtn);
    
    // Body
    const bodyEl = document.createElement('div');
    bodyEl.className = 'modal-body';
    if (typeof body === 'string') {
      bodyEl.textContent = body;
    } else if (body instanceof HTMLElement) {
      bodyEl.appendChild(body);
    }
    
    // Footer / Actions
    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    
    if (actions && actions.length > 0) {
      actions.forEach(action => {
        const btn = document.createElement('button');
        btn.className = `btn ${action.className || 'btn-secondary'}`;
        btn.textContent = action.label;
        btn.addEventListener('click', () => {
          action.onClick(this);
        });
        footer.appendChild(btn);
      });
    } else {
      // Default OK button
      const btn = document.createElement('button');
      btn.className = 'btn btn-primary';
      btn.textContent = 'OK';
      btn.addEventListener('click', () => this.hide());
      footer.appendChild(btn);
    }
    
    container.appendChild(header);
    container.appendChild(bodyEl);
    container.appendChild(footer);
    
    overlay.classList.remove('hidden');
    
    // Trap focus or keyboard ESC key
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        this.hide();
        window.removeEventListener('keydown', handleKey);
      }
    };
    window.addEventListener('keydown', handleKey);
  },
  
  hide() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
    }
  }
};

// Global shorthand for modals
window.showModal = function(config) {
  window.Components.Modal.show(config);
};
window.hideModal = function() {
  window.Components.Modal.hide();
};
