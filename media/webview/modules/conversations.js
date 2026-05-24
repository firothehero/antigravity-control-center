// Conversations UI Module

window.Modules = window.Modules || {};

window.Modules.Conversations = {
  renderList(container, conversations, onSelect) {
    if (!container) return;
    container.innerHTML = '';
    
    if (!conversations || conversations.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = `
        <div class="empty-state-icon">💬</div>
        <div class="empty-state-text">No conversations found</div>
        <p>Start a coding task in Antigravity to generate conversation logs.</p>
      `;
      container.appendChild(empty);
      return;
    }
    
    const grid = document.createElement('div');
    grid.className = 'card-grid';
    
    conversations.forEach(conv => {
      const formattedDate = this.getRelativeTime(conv.lastModified);
      const card = window.Components.Card.create({
        title: conv.title,
        subtitle: `${conv.stepCount} steps · ${formattedDate}`,
        badges: [
          { 
            text: conv.hasTranscript ? 'Transcript' : 'Metadata Only', 
            className: conv.hasTranscript ? 'badge-success' : 'badge-warning' 
          }
        ],
        body: conv.summary || 'Click view to explore the timeline steps, files modified, and tool invocation parameters for this coding task.',
        actions: [
          {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 4 8 4c2.02 0 3.82.668 5.167 1.957A13.142 13.142 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12 8 12c-2.02 0-3.82-.668-5.167-1.957A13.14 13.14 0 0 1 1.172 8z"/>
              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
            </svg>`,
            title: 'View Details',
            onClick: () => onSelect(conv.id)
          }
        ],
        onClick: () => onSelect(conv.id)
      });
      
      grid.appendChild(card);
    });
    
    container.appendChild(grid);
  },
  
  renderDetail(container, detail, onSendMessage) {
    if (!container) return;
    container.innerHTML = '';
    
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    
    // 1. Chat History Area
    const chatHistory = document.createElement('div');
    chatHistory.className = 'chat-history';
    
    // Sort steps by step_index ascending to render chronologically
    const sortedSteps = [...(detail.steps || [])].sort((a, b) => a.step_index - b.step_index);
    
    sortedSteps.forEach(step => {
      const msg = document.createElement('div');
      
      let sourceClass = 'system';
      if (step.source === 'USER_EXPLICIT') {
        sourceClass = 'user';
      } else if (step.source === 'MODEL' || step.source === 'PLANNER_RESPONSE') {
        sourceClass = 'agent';
      }
      
      msg.className = `chat-message ${sourceClass}`;
      
      // Metadata
      const meta = document.createElement('div');
      meta.className = 'chat-message-meta';
      const name = step.source === 'USER_EXPLICIT' ? 'User' : (step.source === 'SYSTEM' ? 'System' : 'Antigravity Agent');
      meta.innerHTML = `<span>${name}</span> <span>Step ${step.step_index}</span>`;
      msg.appendChild(meta);
      
      // Content
      if (step.content) {
        const body = document.createElement('div');
        body.className = 'chat-message-content';
        body.innerHTML = this.parseSimpleMarkdown(step.content);
        msg.appendChild(body);
      }
      
      // Tool calls list
      if (step.tool_calls && step.tool_calls.length > 0) {
        const toolList = document.createElement('div');
        toolList.className = 'chat-tool-calls';
        
        step.tool_calls.forEach(tc => {
          const acc = document.createElement('div');
          acc.className = 'tool-call-accordion collapsed';
          acc.style.background = 'rgba(0,0,0,0.2)';
          acc.style.border = '1px solid var(--color-surface-border)';
          acc.style.borderRadius = 'var(--radius-sm)';
          acc.style.marginTop = 'var(--space-xs)';
          acc.style.overflow = 'hidden';
          
          const trig = document.createElement('div');
          trig.className = 'tool-call-trigger';
          trig.style.padding = '6px 12px';
          trig.style.cursor = 'pointer';
          trig.style.display = 'flex';
          trig.style.justifyContent = 'space-between';
          trig.style.fontSize = '12px';
          trig.innerHTML = `<span>🛠️ Tool: <strong>${tc.name}</strong></span> <span class="arrow">▼</span>`;
          
          const content = document.createElement('div');
          content.className = 'tool-call-content';
          content.style.padding = '10px';
          content.style.display = 'none';
          
          trig.addEventListener('click', () => {
            const isCollapsed = acc.classList.toggle('collapsed');
            content.style.display = isCollapsed ? 'none' : 'block';
            trig.querySelector('.arrow').textContent = isCollapsed ? '▼' : '▲';
          });
          
          const paramBlock = window.Components.CodeBlock.create({
            code: typeof tc.arguments === 'string' ? tc.arguments : JSON.stringify(tc.arguments || {}, null, 2),
            language: 'json'
          });
          content.appendChild(paramBlock);
          
          if (tc.result !== undefined && tc.result !== null) {
            const resLabel = document.createElement('div');
            resLabel.style.fontSize = '11px';
            resLabel.style.color = 'var(--color-text-muted)';
            resLabel.style.margin = 'var(--space-sm) 0 var(--space-xs) 0';
            resLabel.textContent = 'Response:';
            content.appendChild(resLabel);
            
            const isJson = typeof tc.result === 'string' && (tc.result.trim().startsWith('{') || tc.result.trim().startsWith('['));
            const resBlock = window.Components.CodeBlock.create({
              code: typeof tc.result === 'string' ? tc.result : JSON.stringify(tc.result, null, 2),
              language: isJson ? 'json' : 'text'
            });
            content.appendChild(resBlock);
          }
          
          acc.appendChild(trig);
          acc.appendChild(content);
          toolList.appendChild(acc);
        });
        
        msg.appendChild(toolList);
      }
      
      chatHistory.appendChild(msg);
    });
    
    chatContainer.appendChild(chatHistory);
    
    // 2. Chat Input Area
    const inputArea = document.createElement('div');
    inputArea.className = 'chat-input-area';
    
    inputArea.innerHTML = `
      <div class="chat-input-box-wrapper">
        <textarea class="chat-textarea" placeholder="Ask anything, @ to mention, / for actions..." rows="1"></textarea>
        <div class="chat-input-controls">
          <div class="chat-model-selector" id="model-selector-btn">
            <span>[+] Gemini 3.5 Flash</span>
          </div>
          <div class="chat-actions-right">
            <button class="chat-mic-btn" title="Voice Input">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>
            <button class="chat-send-btn" id="chat-send-btn">
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.26.41a.5.5 0 0 0 .887-.082l.18-.452L15.963.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
    
    const textarea = inputArea.querySelector('.chat-textarea');
    const sendBtn = inputArea.querySelector('#chat-send-btn');
    const modelSelector = inputArea.querySelector('#model-selector-btn');
    
    // Auto-growing textarea
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
    
    let selectedModel = 'Gemini 3.5 Flash';
    
    // Model selector click handler
    modelSelector.addEventListener('click', () => {
      const models = ['Gemini 3.5 Flash', 'Gemini 1.5 Pro', 'OpenAI GPT-4o'];
      const nextIdx = (models.indexOf(selectedModel) + 1) % models.length;
      selectedModel = models[nextIdx];
      modelSelector.querySelector('span').textContent = `[+] ${selectedModel}`;
    });
    
    const handleSend = () => {
      const val = textarea.value.trim();
      if (!val) return;
      
      textarea.value = '';
      textarea.style.height = 'auto';
      onSendMessage(val, selectedModel);
    };
    
    sendBtn.addEventListener('click', handleSend);
    
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    
    chatContainer.appendChild(inputArea);
    container.appendChild(chatContainer);
    
    // Auto scroll to bottom
    setTimeout(() => {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 50);
  },
  
  parseSimpleMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code style="font-family: var(--font-mono); background: rgba(0,0,0,0.3); padding: 2px 4px; border-radius: 4px;">$1</code>')
      .replace(/\n/g, '<br>');
  },
  
  getRelativeTime(isoString) {
    if (!isoString) return 'unknown';
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);
    
    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  }
};
