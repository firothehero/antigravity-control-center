// Conversations UI Module — Antigravity-native Chat Interface
// Matches the exact Antigravity IDE chat UI: model selector, streaming,
// rename, real-time updates from transcript.jsonl file watcher.

window.Modules = window.Modules || {};

window.Modules.Conversations = {

  /** Currently loaded model catalog from the extension host */
  _modelCatalog: [],
  _selectedModel: null,

  // ── Model Catalog ──────────────────────────────────────────────────────

  /** Called once on boot to fetch models from the extension host */
  initModelCatalog() {
    vscode.postMessage({ type: 'request:modelCatalog' });
  },

  onModelCatalogLoaded(catalog, defaultModel) {
    this._modelCatalog = catalog || [];
    this._selectedModel = defaultModel || (catalog && catalog[0]) || null;
    // Re-render input if it's visible
    const sel = document.getElementById('acc-model-selector-pill');
    if (sel && this._selectedModel) {
      sel.querySelector('.acc-model-label').textContent = this._selectedModel.displayName;
    }
  },

  // ── Chat Detail Renderer ───────────────────────────────────────────────

  /**
   * Render the full chat view for a conversation into `container`.
   * Matches Antigravity's three-part layout:
   *   1. Conversation header with title + rename icon
   *   2. Chat history area (scrollable, growing downward)
   *   3. Antigravity-style bottom input bar
   */
  renderDetail(container, detail, onSendMessage) {
    if (!container) { return; }
    container.innerHTML = '';

    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatContainer.dataset.convId = detail.id;

    // ── 1. Conversation Header ──────────────────────────────────────────
    const convHeader = document.createElement('div');
    convHeader.className = 'acc-conv-header';
    convHeader.innerHTML = `
      <div class="acc-conv-header-title-row">
        <span class="acc-conv-title" id="acc-conv-title-${detail.id}" title="${detail.title}">${detail.title}</span>
        <button class="acc-conv-rename-btn" id="acc-rename-btn-${detail.id}" title="Rename conversation">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
        </button>
      </div>
      <div class="acc-conv-meta">
        <span class="acc-conv-meta-item">${detail.stepCount} steps</span>
        <span class="acc-conv-meta-dot">·</span>
        <span class="acc-conv-meta-item">${detail.userMessages || 0} messages</span>
        <span class="acc-conv-meta-dot">·</span>
        <span class="acc-conv-meta-item">${detail.toolCalls || 0} tool calls</span>
        ${detail.project ? `<span class="acc-conv-meta-dot">·</span><span class="badge badge-workspace" style="font-size:10px;padding:1px 5px;">${detail.project}</span>` : ''}
      </div>
    `;

    // Rename button handler
    const renameBtn = convHeader.querySelector(`#acc-rename-btn-${detail.id}`);
    if (renameBtn) {
      renameBtn.addEventListener('click', () => this._showRenameModal(detail.id, detail.title));
    }

    chatContainer.appendChild(convHeader);

    // ── 2. Chat History ─────────────────────────────────────────────────
    const chatHistory = document.createElement('div');
    chatHistory.className = 'chat-history';
    chatHistory.id = `chat-history-${detail.id}`;

    this._renderStepsInto(chatHistory, detail.steps || []);
    chatContainer.appendChild(chatHistory);

    // ── 3. Streaming status indicator (hidden until streaming) ──────────
    const streamingBar = document.createElement('div');
    streamingBar.className = 'acc-streaming-bar hidden';
    streamingBar.id = `streaming-bar-${detail.id}`;
    streamingBar.innerHTML = `
      <span class="acc-streaming-pulse"></span>
      <span class="acc-streaming-label">Agent is responding…</span>
    `;
    chatContainer.appendChild(streamingBar);

    // ── 4. Antigravity-style Bottom Input ───────────────────────────────
    const inputArea = this._buildInputArea(detail.id, onSendMessage);
    chatContainer.appendChild(inputArea);

    container.appendChild(chatContainer);

    // Scroll to bottom after render
    setTimeout(() => {
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 60);

    // Request model catalog on first render
    if (this._modelCatalog.length === 0) {
      this.initModelCatalog();
    } else {
      // Update pill label with current model
      const pill = inputArea.querySelector('.acc-model-label');
      if (pill && this._selectedModel) {
        pill.textContent = this._selectedModel.displayName;
      }
    }
  },

  // ── Streaming Update Handler ───────────────────────────────────────────

  /**
   * Called when the FileWatcher detects new steps in transcript.jsonl.
   * Appends only the new steps so we never re-render the whole history.
   */
  onStreamUpdate(conversationId, newSteps, totalStepCount) {
    const chatHistory = document.getElementById(`chat-history-${conversationId}`);
    if (!chatHistory) { return; }

    // Append new step bubbles
    this._renderStepsInto(chatHistory, newSteps, true);

    // Auto-scroll to bottom
    chatHistory.scrollTop = chatHistory.scrollHeight;

    // Update streaming indicator
    const bar = document.getElementById(`streaming-bar-${conversationId}`);
    if (bar) {
      // Show bar if the last new step is from the agent
      const lastStep = newSteps[newSteps.length - 1];
      if (lastStep && (lastStep.source === 'MODEL' || lastStep.source === 'PLANNER_RESPONSE')) {
        bar.classList.remove('hidden');
        // Hide after 2s since it might be the final step
        clearTimeout(bar._hideTimer);
        bar._hideTimer = setTimeout(() => bar.classList.add('hidden'), 2000);
      } else if (lastStep && lastStep.source === 'USER_EXPLICIT') {
        // User just sent — show "agent responding" bar
        bar.classList.remove('hidden');
      }
    }

    // Update step count in header meta
    const metaItems = document.querySelectorAll(`#chat-history-${conversationId}`);
    // Update sub-list badge if visible
    const subListItem = document.querySelector(`.sub-list-item[data-id="${conversationId}"] .sub-list-item-subtitle span:first-child`);
    if (subListItem) {
      subListItem.textContent = `${totalStepCount} steps`;
    }
  },

  // ── Private: Step Rendering ────────────────────────────────────────────

  _renderStepsInto(container, steps, append = false) {
    if (!append) {
      container.innerHTML = '';
    }

    const sorted = [...steps].sort((a, b) => (a.step_index || 0) - (b.step_index || 0));

    sorted.forEach(step => {
      const existing = container.querySelector(`[data-step-index="${step.step_index}"]`);
      if (existing) { return; } // Already rendered — skip duplicates

      const msg = this._buildMessageBubble(step);
      container.appendChild(msg);
    });
  },

  _buildMessageBubble(step) {
    const msg = document.createElement('div');
    msg.dataset.stepIndex = step.step_index;

    let sourceClass = 'system';
    if (step.source === 'USER_EXPLICIT') {
      sourceClass = 'user';
    } else if (step.source === 'MODEL' || step.source === 'PLANNER_RESPONSE') {
      sourceClass = 'agent';
    }

    msg.className = `chat-message ${sourceClass}`;

    // Meta row
    const meta = document.createElement('div');
    meta.className = 'chat-message-meta';
    const senderName = step.source === 'USER_EXPLICIT'
      ? 'You'
      : step.source === 'SYSTEM'
        ? 'System'
        : 'Antigravity Agent';
    meta.innerHTML = `<span class="chat-message-sender">${senderName}</span><span class="chat-message-step">Step ${step.step_index}</span>`;
    msg.appendChild(meta);

    // Content
    if (step.content) {
      const body = document.createElement('div');
      body.className = 'chat-message-content';
      body.innerHTML = this._renderMarkdown(step.content);
      msg.appendChild(body);
    }

    // Tool calls
    if (step.tool_calls && step.tool_calls.length > 0) {
      const toolList = document.createElement('div');
      toolList.className = 'chat-tool-calls';

      step.tool_calls.forEach(tc => {
        const acc = document.createElement('div');
        acc.className = 'tool-call-accordion collapsed';

        const trig = document.createElement('div');
        trig.className = 'tool-call-trigger';
        trig.innerHTML = `<span>🛠️ <strong>${tc.name}</strong></span><span class="acc-tool-arrow">▼</span>`;

        const content = document.createElement('div');
        content.className = 'tool-call-content';
        content.style.display = 'none';
        content.style.padding = '10px';

        trig.addEventListener('click', () => {
          const collapsed = acc.classList.toggle('collapsed');
          content.style.display = collapsed ? 'none' : 'block';
          trig.querySelector('.acc-tool-arrow').textContent = collapsed ? '▼' : '▲';
        });

        const argsBlock = window.Components.CodeBlock.create({
          code: typeof tc.arguments === 'string'
            ? tc.arguments
            : JSON.stringify(tc.arguments || {}, null, 2),
          language: 'json'
        });
        content.appendChild(argsBlock);

        if (tc.result !== undefined && tc.result !== null) {
          const resLabel = document.createElement('div');
          resLabel.style.cssText = 'font-size:11px;color:var(--color-text-muted);margin:8px 0 4px;';
          resLabel.textContent = 'Response:';
          content.appendChild(resLabel);

          const isJson = typeof tc.result === 'string' &&
            (tc.result.trim().startsWith('{') || tc.result.trim().startsWith('['));
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

    return msg;
  },

  // ── Private: Antigravity Input Bar ────────────────────────────────────

  _buildInputArea(conversationId, onSendMessage) {
    const inputArea = document.createElement('div');
    inputArea.className = 'acc-input-area';
    inputArea.id = `acc-input-${conversationId}`;

    inputArea.innerHTML = `
      <div class="acc-input-wrapper">
        <textarea
          class="acc-textarea"
          id="acc-textarea-${conversationId}"
          placeholder="Ask anything, @ to mention, / for actions..."
          rows="1"
          aria-label="Chat input"
        ></textarea>
        <div class="acc-input-footer">
          <div class="acc-model-selector" id="acc-model-selector-${conversationId}" role="button" tabindex="0" title="Change model">
            <span class="acc-model-plus">+</span>
            <span class="acc-model-label">${this._selectedModel ? this._selectedModel.displayName : 'Gemini 3.5 Flash (Medium)'}</span>
            <svg class="acc-model-caret" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            </svg>
          </div>
          <div class="acc-input-actions">
            <button class="acc-mic-btn" title="Voice input" id="acc-mic-${conversationId}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </button>
            <button class="acc-send-btn" id="acc-send-${conversationId}" title="Send (Enter)">
              <span>Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.26.41a.5.5 0 0 0 .887-.082l.18-.452L15.963.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    const textarea = inputArea.querySelector(`#acc-textarea-${conversationId}`);
    const sendBtn = inputArea.querySelector(`#acc-send-${conversationId}`);
    const modelSel = inputArea.querySelector(`#acc-model-selector-${conversationId}`);

    // Auto-grow textarea
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 160) + 'px';
    });

    // Send on Enter (Shift+Enter = newline)
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this._doSend(conversationId, textarea, onSendMessage);
      }
    });

    sendBtn.addEventListener('click', () => {
      this._doSend(conversationId, textarea, onSendMessage);
    });

    // Model selector — open dropdown
    modelSel.addEventListener('click', (e) => {
      e.stopPropagation();
      this._showModelDropdown(modelSel, conversationId);
    });
    modelSel.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this._showModelDropdown(modelSel, conversationId);
      }
    });

    return inputArea;
  },

  _doSend(conversationId, textarea, onSendMessage) {
    const val = textarea.value.trim();
    if (!val) { return; }
    textarea.value = '';
    textarea.style.height = 'auto';
    const model = this._selectedModel ? this._selectedModel.id : 'gemini-3.5-flash-medium';
    onSendMessage(val, model);
  },

  // ── Model Dropdown ─────────────────────────────────────────────────────

  _showModelDropdown(anchor, conversationId) {
    // Remove any existing dropdown
    const existing = document.getElementById('acc-model-dropdown');
    if (existing) {
      existing.remove();
      return;
    }

    const dropdown = document.createElement('div');
    dropdown.className = 'acc-model-dropdown';
    dropdown.id = 'acc-model-dropdown';

    const models = this._modelCatalog.length > 0
      ? this._modelCatalog
      : this._getDefaultCatalog();

    models.forEach(model => {
      const item = document.createElement('div');
      item.className = `acc-model-item${this._selectedModel && this._selectedModel.id === model.id ? ' selected' : ''}`;
      item.innerHTML = `
        <span class="acc-model-item-name">${model.displayName}</span>
        ${model.speed ? `<span class="acc-model-item-badge">${model.speed}</span>` : ''}
      `;
      item.addEventListener('click', () => {
        this._selectedModel = model;
        // Update all open model pills
        document.querySelectorAll('.acc-model-label').forEach(el => {
          el.textContent = model.displayName;
        });
        dropdown.remove();
      });
      dropdown.appendChild(item);
    });

    // Position below the anchor
    const rect = anchor.getBoundingClientRect();
    dropdown.style.position = 'fixed';
    dropdown.style.bottom = (window.innerHeight - rect.top + 4) + 'px';
    dropdown.style.left = rect.left + 'px';
    document.body.appendChild(dropdown);

    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', function _close() {
        dropdown.remove();
        document.removeEventListener('click', _close);
      });
    }, 0);
  },

  _getDefaultCatalog() {
    return [
      { id: 'gemini-3.5-flash-medium', displayName: 'Gemini 3.5 Flash (Medium)', speed: 'Fast' },
      { id: 'gemini-3.5-flash-high',   displayName: 'Gemini 3.5 Flash (High)',   speed: 'Fast' },
      { id: 'gemini-3.5-flash-low',    displayName: 'Gemini 3.5 Flash (Low)',     speed: 'Fast' },
      { id: 'gemini-3.1-pro-low',      displayName: 'Gemini 3.1 Pro (Low)',       speed: 'Balanced' },
      { id: 'gemini-3.1-pro-high',     displayName: 'Gemini 3.1 Pro (High)',      speed: 'Balanced' },
      { id: 'claude-sonnet-4.6-thinking', displayName: 'Claude Sonnet 4.6 (Thinking)', speed: 'Thoughtful' },
      { id: 'claude-opus-4.6-thinking',   displayName: 'Claude Opus 4.6 (Thinking)',   speed: 'Thoughtful' },
      { id: 'gpt-oss-120b-medium',     displayName: 'GPT-OSS 120B (Medium)',      speed: 'Balanced' },
    ];
  },

  // ── Rename Modal ───────────────────────────────────────────────────────

  _showRenameModal(conversationId, currentTitle) {
    const body = document.createElement('div');
    body.style.cssText = 'display:flex;flex-direction:column;gap:var(--space-md);';

    const label = document.createElement('label');
    label.style.cssText = 'font-size:13px;color:var(--color-text-secondary);';
    label.textContent = 'Enter a new name for this conversation:';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'sub-list-search-input';
    input.style.padding = '10px 12px';
    input.value = currentTitle;
    input.placeholder = 'Conversation name…';

    body.appendChild(label);
    body.appendChild(input);

    window.showModal({
      title: 'Rename Conversation',
      body,
      actions: [
        {
          label: 'Rename',
          className: 'btn-primary',
          onClick: (modal) => {
            const newTitle = input.value.trim();
            if (!newTitle) { return; }
            vscode.postMessage({
              type: 'request:renameConversation',
              payload: { id: conversationId, newTitle }
            });
            // Optimistically update UI
            const titleEl = document.getElementById(`acc-conv-title-${conversationId}`);
            if (titleEl) { titleEl.textContent = newTitle; }
            modal.hide();
          }
        },
        {
          label: 'Cancel',
          className: 'btn-secondary',
          onClick: (modal) => modal.hide()
        }
      ]
    });

    // Focus input
    setTimeout(() => input.focus(), 100);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const newTitle = input.value.trim();
        if (newTitle) {
          vscode.postMessage({
            type: 'request:renameConversation',
            payload: { id: conversationId, newTitle }
          });
          const titleEl = document.getElementById(`acc-conv-title-${conversationId}`);
          if (titleEl) { titleEl.textContent = newTitle; }
          window.hideModal();
        }
      }
    });
  },

  // ── Markdown Renderer ─────────────────────────────────────────────────

  _renderMarkdown(text) {
    if (!text) { return ''; }
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Code blocks (``` ... ```)
      .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
        `<pre class="acc-code-block"><code class="lang-${lang}">${code.trim()}</code></pre>`)
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="acc-inline-code">$1</code>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Headings
      .replace(/^### (.+)$/gm, '<h5 class="acc-md-h5">$1</h5>')
      .replace(/^## (.+)$/gm, '<h4 class="acc-md-h4">$1</h4>')
      .replace(/^# (.+)$/gm, '<h3 class="acc-md-h3">$1</h3>')
      // Horizontal rules
      .replace(/^---$/gm, '<hr class="acc-md-hr">')
      // Bullet list items
      .replace(/^\s*[-*]\s+(.+)$/gm, '<li class="acc-md-li">$1</li>')
      // Numbered list items
      .replace(/^\s*\d+\.\s+(.+)$/gm, '<li class="acc-md-li acc-md-li-num">$1</li>')
      // Newlines to <br>
      .replace(/\n/g, '<br>');
  },

  // ── Utility: Relative Time ────────────────────────────────────────────

  getRelativeTime(isoString) {
    if (!isoString) { return 'unknown'; }
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHr / 24);

    if (diffSec < 60) { return 'just now'; }
    if (diffMin < 60) { return `${diffMin}m ago`; }
    if (diffHr < 24) { return `${diffHr}h ago`; }
    if (diffDays === 1) { return 'yesterday'; }
    if (diffDays < 7) { return `${diffDays} days ago`; }

    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  },
};
