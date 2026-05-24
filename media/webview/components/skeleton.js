// Skeleton Loader Placeholder Component

window.Components = window.Components || {};

window.Components.Skeleton = {
  create(type) {
    const container = document.createElement('div');
    container.className = 'flex flex-col gap-md';
    container.style.width = '100%';
    
    if (type === 'card-list') {
      const grid = document.createElement('div');
      grid.className = 'card-grid';
      for (let i = 0; i < 6; i++) {
        const card = document.createElement('div');
        card.className = 'skeleton-card flex flex-col justify-between';
        
        const hText = document.createElement('div');
        hText.className = 'skeleton skeleton-text header';
        
        const bText1 = document.createElement('div');
        bText1.className = 'skeleton skeleton-text body-1';
        const bText2 = document.createElement('div');
        bText2.className = 'skeleton skeleton-text body-2';
        
        const cardBody = document.createElement('div');
        cardBody.appendChild(bText1);
        cardBody.appendChild(bText2);
        
        const fText = document.createElement('div');
        fText.className = 'skeleton skeleton-text body-3';
        fText.style.width = '30%';
        fText.style.marginTop = 'var(--space-md)';
        
        card.appendChild(hText);
        card.appendChild(cardBody);
        card.appendChild(fText);
        
        grid.appendChild(card);
      }
      container.appendChild(grid);
    } 
    else if (type === 'table') {
      const tableWrapper = document.createElement('div');
      tableWrapper.className = 'table-container';
      
      const table = document.createElement('div');
      table.style.padding = 'var(--space-md)';
      table.className = 'flex flex-col gap-sm';
      
      const head = document.createElement('div');
      head.className = 'skeleton skeleton-text header';
      head.style.width = '100%';
      head.style.height = '32px';
      table.appendChild(head);
      
      for (let i = 0; i < 5; i++) {
        const row = document.createElement('div');
        row.className = 'skeleton skeleton-text';
        row.style.width = '100%';
        row.style.height = '24px';
        table.appendChild(row);
      }
      
      tableWrapper.appendChild(table);
      container.appendChild(tableWrapper);
    } 
    else {
      // Default detail view skeleton
      const title = document.createElement('div');
      title.className = 'skeleton skeleton-text header';
      title.style.height = '32px';
      title.style.width = '50%';
      
      const body = document.createElement('div');
      body.className = 'flex flex-col gap-sm';
      for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'skeleton skeleton-text';
        line.style.width = i % 2 === 0 ? '90%' : '75%';
        body.appendChild(line);
      }
      
      container.appendChild(title);
      container.appendChild(body);
    }
    
    return container;
  }
};
