// Sortable Data Table Component

window.Components = window.Components || {};

window.Components.Table = {
  create({ columns, rows, onRowClick, sortable = true }) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    
    const table = document.createElement('table');
    table.className = 'data-table';
    
    // State for sorting
    let sortColumnIndex = -1;
    let sortDirection = 'asc'; // 'asc' | 'desc'
    
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    columns.forEach((col, index) => {
      const th = document.createElement('th');
      th.textContent = col.label;
      if (sortable && col.sortable !== false) {
        th.className = 'sortable';
        const indicator = document.createElement('span');
        indicator.className = 'sort-indicator';
        indicator.innerHTML = '⇅';
        th.appendChild(indicator);
        
        th.addEventListener('click', () => {
          if (sortColumnIndex === index) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
          } else {
            sortColumnIndex = index;
            sortDirection = 'asc';
          }
          
          // Reset other indicators
          headerRow.querySelectorAll('.sort-indicator').forEach((ind, i) => {
            if (i === index) {
              ind.innerHTML = sortDirection === 'asc' ? '▲' : '▼';
            } else {
              ind.innerHTML = '⇅';
            }
          });
          
          sortTable(index, sortDirection);
        });
      }
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    const tbody = document.createElement('tbody');
    
    function renderRows(rowsData) {
      tbody.innerHTML = '';
      if (!rowsData || rowsData.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');
        td.setAttribute('colspan', columns.length);
        td.className = 'text-center';
        td.style.textAlign = 'center';
        td.style.padding = 'var(--space-xl)';
        td.textContent = 'No data available';
        tr.appendChild(td);
        tbody.appendChild(tr);
        return;
      }
      
      rowsData.forEach(row => {
        const tr = document.createElement('tr');
        columns.forEach(col => {
          const td = document.createElement('td');
          const val = row[col.key];
          if (col.render) {
            const rendered = col.render(val, row);
            if (rendered instanceof HTMLElement) {
              td.appendChild(rendered);
            } else {
              td.innerHTML = rendered;
            }
          } else {
            td.textContent = val !== undefined ? val : '';
          }
          tr.appendChild(td);
        });
        
        if (onRowClick) {
          tr.addEventListener('click', () => onRowClick(row));
        }
        
        tbody.appendChild(tr);
      });
    }
    
    function sortTable(colIndex, direction) {
      const col = columns[colIndex];
      const sorted = [...rows].sort((a, b) => {
        let valA = a[col.key];
        let valB = b[col.key];
        
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        
        if (valA < valB) return direction === 'asc' ? -1 : 1;
        if (valA > valB) return direction === 'asc' ? 1 : -1;
        return 0;
      });
      renderRows(sorted);
    }
    
    renderRows(rows);
    table.appendChild(tbody);
    wrapper.appendChild(table);
    
    return wrapper;
  }
};
