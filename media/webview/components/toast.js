// Toast Alert System Component

window.Components = window.Components || {};

window.Components.Toast = {
  show({ message, type = 'info', duration = 4000 }) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    // Choose icon based on type
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    else if (type === 'error') icon = '✕';
    else if (type === 'warning') icon = '⚠';
    else if (type === 'info') icon = 'ℹ';
    
    const iconEl = document.createElement('span');
    iconEl.className = 'toast-icon';
    iconEl.textContent = icon;
    
    const messageEl = document.createElement('span');
    messageEl.className = 'toast-message';
    messageEl.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'code-copy-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.style.fontSize = '1.15rem';
    closeBtn.style.marginLeft = 'var(--space-sm)';
    closeBtn.addEventListener('click', () => this.dismiss(toast));
    
    toast.appendChild(iconEl);
    toast.appendChild(messageEl);
    toast.appendChild(closeBtn);
    
    container.appendChild(toast);
    
    // Auto dismiss
    if (duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }
  },
  
  dismiss(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('dismissing');
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  }
};

// Global shorthand for toasts
window.showToast = function(config) {
  window.Components.Toast.show(config);
};
