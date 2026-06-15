# Antigravity Control Center — Product Requirements Document (PRD)

> **Version:** 2.0.0  
> **Author:** TENN.ai & @firothehero
> **Date:** 2026-06-15  
> **Status:** Approved — Antigravity SDK Integration Complete  
> **Repository:** `antigravity-control-center`

---

## 1. Executive Summary

**Antigravity Control Center** is a VS Code / Antigravity IDE extension that provides a unified management dashboard for all Antigravity-managed resources — Conversation History, Agents, MCP Servers, Skills, Rules, Workflows, Knowledge Items, and global settings. It adds a **"Control Center"** button to the IDE's top-right toolbar area, which opens a premium, dark-mode Webview panel (or optionally an external browser window) containing a rich, interactive management UI.

### 1.1 Problem Statement

Currently, managing Antigravity's internal resources (conversations, skills, MCP servers, agents) requires navigating disparate filesystem locations, editing raw JSON/YAML/Markdown files, or relying on the agent chat interface. There is no centralized, visual control panel to:

- Browse, search, and manage conversation history
- View and configure installed MCP servers and their tools
- Inspect, enable/disable, or edit Skills and Rules
- Monitor agent configurations and activity
- Manage Workflows and Knowledge Items
- Monitor **multiple AI conversations simultaneously in real-time** while agents stream responses

### 1.2 Solution

A native Antigravity IDE extension providing a single-pane-of-glass dashboard that:

1. **Reads** Antigravity's local data (brain directory, MCP config, skills, agents, rules, workflows)
2. **Displays** it in a premium dark-mode UI with search, filter, and drill-down capabilities
3. **Allows** CRUD operations where safe (create/edit/delete skills, rules, workflows)
4. **Provides** real-time monitoring of agent sessions and MCP server health
5. **Embeds** the exact Antigravity chat UI so users can interact with agents across all conversations simultaneously
6. **Uses `antigravity-sdk`** (v0.2.0+) as the primary integration layer for managing cascades, sessions, step control, and agent preferences — with transparent filesystem fallback

---

## 2. User Personas

### 2.1 Power User (Primary)
- **Profile:** Experienced developer using Antigravity IDE daily for complex multi-repo projects
- **Needs:** Quick access to conversation history, ability to manage MCP servers, review installed skills, and configure agent behavior without leaving the IDE
- **Pain Points:** Scattered config files, no visual overview of installed capabilities, hard to find past conversations

### 2.2 Team Lead / DevOps
- **Profile:** Manages shared Antigravity configurations across a team
- **Needs:** Audit trail of conversations, centralized skill/rule management, MCP server health monitoring
- **Pain Points:** No way to quickly audit what skills/MCPs are active, no conversation export

### 2.3 Extension Developer
- **Profile:** Builds custom skills, agents, or MCP servers for Antigravity
- **Needs:** Quick debugging views of skill files, MCP tool schemas, and agent configurations
- **Pain Points:** Must manually navigate filesystem to verify skill installation, no tool schema preview

---

## 3. Feature Requirements

### 3.1 Core Entry Points & Dashboard Windows

#### 3.1.1 Main Command & Toolbar Entry
| Attribute | Value |
|---|---|
| **Location** | Top-right toolbar area (`editor/title` menu group `navigation`) |
| **Label** | "Control Center" |
| **Icon** | `$(dashboard)` or custom SVG icon |
| **Behavior** | Opens the Control Center Webview panel |
| **Activation** | Extension activates on IDE startup (`*` activation event) |

#### 3.1.2 Status Bar Quick Launcher (ACC)
| Attribute | Value |
|---|---|
| **Location** | Status Bar (bottom right corner, priority 100) |
| **Label** | `ACC` |
| **Icon** | Custom contributed `acc-logo` small branded PNG icon asset |
| **Behavior** | Triggers command `controlCenter.open` |

#### 3.1.3 Native Standalone Window (Pop-Out)
- **Top Actions Panel:** A beautiful Pop-Out icon button `#global-popout-btn` is located next to `#global-refresh-btn` in the top right header.
- **Behavior:** Clicking this button natively detaches/floats the integrated webview panel tab from the main IDE editor grid into its own Electron standalone OS window using standard VS Code command `workbench.action.moveEditorToNewWindow`.
- **Constraint:** The window context, states, and cached DOM remain exactly the same inside Antigravity but fully popped out into a native floating window (no external browser launches).

**Click Behavior Options:**
1. **Primary:** Open a full-width Webview Panel in a new editor tab (`vscode.ViewColumn.One`) with native window-floating support.
2. **Secondary:** Option in settings to open via external browser (`vscode.env.openExternal`) using a local Express server for a truly independent window experience.

### 3.2 Module: Conversation History Manager

| Feature | Priority | Description |
|---|---|---|
| **List Conversations (Convos)** | P0 | Display all conversations in Column 2 from `~/.gemini/antigravity-ide/brain/` in reverse chronological order (newest first). Conversations are called "Convos" in Antigravity — display them with the same naming. Auto-select the top conversation by default. |
| **Search & Project Filter** | P0 | Search conversations by title; filter by Project/Repository name utilizing a custom dropdown select in the Column 2 header. |
| **Native Antigravity Chat Timeline** | P0 | Render full chat timeline in Column 3 using the **exact same** Antigravity color-coded message bubbles, tool call accordions, and code blocks. No independent custom UI — must match Antigravity natively. |
| **Native Antigravity Input Bar** | P0 | Bottom input panel using the exact Antigravity-style input: rounded textarea, `[+] ModelName ▼` model selector pill, microphone icon, and Send button. Enter sends, Shift+Enter creates newline. |
| **Native Model Selector** | P0 | Model dropdown shows the **exact same models** as Antigravity's own chat: Gemini 3.5 Flash (M/H/L), Gemini 3.1 Pro (L/H), Claude Sonnet/Opus 4.6 (Thinking), GPT-OSS 120B (Medium). Delivered via `request:modelCatalog` message protocol. Backend sends `{id, label, quality, category}` and webview normalizes to `{displayName, speed}` for rendering. Dropdown background uses `--color-surface-elevated` for solid, non-transparent appearance. |
| **Real-time Streaming** | P0 | **Dual-mode monitoring**: Filesystem `ConversationWatcher` (`fs.watch` on `transcript.jsonl`) is **always** active for step content delivery. When SDK is available, `SDKMonitorService` additionally provides session-level events (active session changed, new conversations). The filesystem watcher provides actual step content (newSteps array) while SDK monitor provides notifications without content. Both run in parallel for comprehensive coverage. Streaming indicator bar shows "Agent is responding…" with pulsing dot. |
| **Parallel Multi-Chat Monitoring** | P0 | User can switch between any open conversation while the watcher continues monitoring all previously-opened chats simultaneously. New steps from any watched conversation update that conversation's chat view in real-time. |
| **Conversation Renaming** | P0 | Rename button (pencil icon) opens a custom modal. 4-strategy cascade: (1) `integration.titles.rename()` — **primary**: renderer-side title proxy that writes to a JSON data file the IDE's conversation list reads (requires `enableTitleProxy()` + `installSeamless()` at SDK init), (2) `ls.setTitle()` — direct LS bridge rename, (3) `ls.updateAnnotations()` — annotation fallback, (4) `title_override.txt` filesystem cache (always written). Title priority: override file → SDK title → first USER_INPUT. Right panel header and left list both update immediately on rename. |
| **Send Message** | P0 | Input bar submits to `request:sendMessage` which appends a `USER_EXPLICIT / USER_INPUT` step to `transcript.jsonl`. The active Antigravity agent picks this up and responds — visible via real-time watcher. |
| **Conversation Details** | P1 | Show metadata: step count, user messages count, tool call count, project badge |
| **Export Conversation** | P1 | Export as Markdown, JSON, or HTML |
| **Delete Conversation** | P2 | Remove conversation data with confirmation dialog |
| **Conversation Analytics** | P2 | Charts showing conversation frequency, avg duration, most-used tools |

### 3.3 Module: MCP Server Manager

| Feature | Priority | Description |
|---|---|---|
| **List MCP Servers** | P0 | Display all configured MCP servers from `~/.gemini/antigravity-ide/mcp/` |
| **Server Details** | P0 | Show server name, status, tool count (eager vs lazy) |
| **Tool Schema Viewer** | P0 | For each server, list tools with their JSON schemas, descriptions, parameters |
| **Server Health Check** | P1 | Ping/status check for running MCP servers |
| **Tool Schema Search** | P1 | Search across all MCP tool schemas by name, description, or parameter |
| **Enable/Disable Server** | P2 | Toggle MCP servers on/off from the UI |
| **Add/Configure Server** | P2 | UI for adding new MCP server configurations |

### 3.4 Module: Skills Manager

| Feature | Priority | Description |
|---|---|---|
| **List All Skills** | P0 | Display skills from workspace `.agents/skills/` and global config `~/.gemini/config/plugins/` |
| **Skill Details** | P0 | Show SKILL.md content rendered as rich HTML, with metadata (name, description) |
| **Skill Search** | P0 | Search skills by name, description, or content |
| **Skill Categories** | P1 | Group skills by source (workspace vs global vs plugin) |
| **Skill File Browser** | P1 | Browse skill directory contents (scripts, examples, references) |
| **Create New Skill** | P2 | Scaffold a new SKILL.md with template in the correct directory |
| **Edit Skill** | P2 | Inline editor for SKILL.md content |

### 3.5 Module: Agents, Rules & Workflows Manager

| Feature | Priority | Description |
|---|---|---|
| **List Agents** | P0 | Display agent definitions from `.agents/agents/` |
| **Agent Details** | P0 | Show agent config (name, model, skills, tools) rendered nicely |
| **List Rules** | P0 | Display all rules from `.agents/rules/` with content preview |
| **List Workflows** | P0 | Display all workflows from `.agents/workflows/` with slash command mapping |
| **Rule/Workflow Viewer** | P1 | Full markdown rendering of rule/workflow content |
| **Create/Edit/Delete** | P2 | CRUD operations for agents, rules, and workflows |

### 3.6 Module: Knowledge Items Browser

| Feature | Priority | Description |
|---|---|---|
| **List Knowledge Items** | P0 | Display all KIs from `~/.gemini/antigravity-ide/knowledge/` |
| **KI Details** | P0 | Show `metadata.json` (summary, timestamps, references) |
| **KI Artifact Viewer** | P1 | Browse and render artifact markdown files within each KI |
| **KI Search** | P1 | Search across KI titles, summaries, and artifact contents |

### 3.7 Module: Settings & Preferences

| Feature | Priority | Description |
|---|---|---|
| **Extension Settings** | P1 | Configure Control Center behavior (open mode, theme, default tab) |
| **Data Directory Path** | P1 | Display and validate the Antigravity data directory path |
| **Refresh/Rescan** | P1 | Manual trigger to rescan all data sources |
| **About & Version** | P2 | Extension version info, links to documentation |

---

## 4. UI/UX Specifications

### 4.1 Design Language

- **Theme:** Premium dark mode (Slate 900/950 base, with vibrant accent colors)
- **Color Palette:**
  - Background: `hsl(222, 47%, 6%)` → `hsl(222, 47%, 11%)` gradient
  - Surface: `hsl(222, 35%, 12%)` with `0.8` opacity glass effect
  - Primary Accent: `hsl(250, 80%, 65%)` (Electric Violet)
  - Secondary Accent: `hsl(170, 70%, 50%)` (Teal/Cyan)
  - Success: `hsl(150, 60%, 45%)`
  - Warning: `hsl(40, 90%, 55%)`
  - Error: `hsl(0, 70%, 55%)`
  - Text Primary: `hsl(220, 20%, 90%)`
  - Text Secondary: `hsl(220, 15%, 60%)`
- **Typography:** Inter (loaded from Google Fonts CDN within webview)
- **Border Radius:** `8px` standard, `12px` cards, `16px` modals
- **Animations:** Smooth transitions (200-300ms ease), subtle hover scales, fade-in content loading

### 4.2 Layout Structure

```
┌───────────────────────────────────────────────────────┐
│  ⚡ Antigravity Control Center              ─ □ ×    │
├──────────┬────────────────────────────────────────────┤
│          │                                            │
│  📋 Conv │   [Content Area]                           │
│  🔌 MCPs │                                            │
│  🧠 Skills│   - List/Grid/Detail views               │
│  🤖 Agents│   - Search bar at top                    │
│  📜 Rules │   - Action buttons                       │
│  🔄 Flows │   - Cards / Tables                       │
│  📚 KIs  │                                            │
│  ⚙️ Set  │                                            │
│          │                                            │
├──────────┴────────────────────────────────────────────┤
│  Status bar: scan status | Credits: Firas Sleiman | Version │
└───────────────────────────────────────────────────────────┘
```

- **Left Sidebar:** Icon + label navigation (collapsible to icons only)
- **Content Area:** Dynamic rendering based on selected module
- **Top Bar:** Module title, search input, action buttons (refresh, filter, create)
- **Status Bar:** Three sections — Left (connection indicator + scan status), Center (credits: "Created by Firas Sleiman — github.com/firothehero" with clickable link via `request:openUrl`), Right (last scan time + version). Uses `flexbox` with `flex: 1/2/1` ratio.

### 4.3 Interaction Patterns

- **Navigation:** Click sidebar item → smooth fade transition to new module content
- **Search:** Debounced (300ms) real-time filtering as user types
- **Detail Views:** Click a list item → slide-in detail panel (or replace content area)
- **Actions:** Hover reveals action buttons (view, edit, delete, export)
- **Modals:** Custom dark-mode modals for confirmations and forms (no browser popups)
- **Toasts:** Bottom-right notification toasts for success/error feedback
- **Loading States:** Skeleton loaders during data fetch

---

## 5. Technical Architecture

### 5.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Language** | TypeScript | First-class VS Code extension language; type safety; antigravity-sdk is TS |
| **Extension Host** | VS Code Extension API | Native integration with editor UI, commands, menus, webviews |
| **UI Framework** | Vanilla HTML/CSS/JS in Webview | Maximum control, no framework overhead in sandboxed webview |
| **Build System** | esbuild | Fast bundling for extension code |
| **Package Manager** | npm | Standard for VS Code extensions |
| **SDK (Optional)** | antigravity-sdk | Access to conversation sessions, agent state, monitor events |
| **Data Access** | Node.js `fs` module | Read local filesystem (brain, mcp, skills, agents, rules) |
| **Messaging** | VS Code Webview messaging API | `postMessage` / `onDidReceiveMessage` for extension ↔ webview communication |

### 5.2 Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│                 Antigravity IDE                  │
│  ┌───────────────────────────────────────────┐  │
│  │         Extension Host (Node.js)          │  │
│  │  ┌─────────────┐  ┌──────────────────┐   │  │
│  │  │ Command      │  │ Data Providers   │   │  │
│  │  │ Registration │  │ ┌──────────────┐ │   │  │
│  │  │ & Activation │  │ │Conversations │ │   │  │
│  │  └──────┬───────┘  │ │MCP Servers   │ │   │  │
│  │         │          │ │Skills/Rules  │ │   │  │
│  │         ▼          │ │Agents/Flows  │ │   │  │
│  │  ┌──────────────┐  │ │Knowledge     │ │   │  │
│  │  │ Webview      │  │ └──────┬───────┘ │   │  │
│  │  │ Panel Mgr    │  └────────┼─────────┘   │  │
│  │  └──────┬───────┘           │             │  │
│  │         │    postMessage    │             │  │
│  │         ▼         ◄────────►              │  │
│  │  ┌──────────────────────────────────┐    │  │
│  │  │        Webview (Browser)          │    │  │
│  │  │  ┌──────────────────────────┐    │    │  │
│  │  │  │  Control Center UI       │    │    │  │
│  │  │  │  (HTML/CSS/JS)           │    │    │  │
│  │  │  │  ┌─────┐ ┌─────┐       │    │    │  │
│  │  │  │  │Nav  │ │Content│       │    │    │  │
│  │  │  │  │Bar  │ │Area  │       │    │    │  │
│  │  │  │  └─────┘ └─────┘       │    │    │  │
│  │  │  └──────────────────────────┘    │    │  │
│  │  └──────────────────────────────────┘    │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │ Local Filesystem                         │   │
│  │ ~/.gemini/antigravity-ide/brain/         │   │
│  │ ~/.gemini/antigravity-ide/mcp/           │   │
│  │ ~/.gemini/antigravity-ide/knowledge/     │   │
│  │ <workspace>/.agents/                     │   │
│  │ ~/.gemini/config/plugins/                │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### 5.3 Data Sources

| Data Source | Location | Format | Access |
|---|---|---|---|
| Conversations | `~/.gemini/antigravity-ide/brain/<conv-id>/` | `transcript.jsonl`, markdown artifacts | `fs.readdir` + `fs.readFile` |
| MCP Servers | `~/.gemini/antigravity-ide/mcp/<serverName>/` | JSON tool schemas, `instructions.md` | `fs.readdir` + `fs.readFile` |
| Skills (Workspace) | `<workspace>/.agents/skills/<name>/SKILL.md` | Markdown with YAML frontmatter | `fs.readdir` + `fs.readFile` |
| Skills (Global) | `~/.gemini/config/plugins/<plugin>/skills/` | Markdown with YAML frontmatter | `fs.readdir` + `fs.readFile` |
| Agents | `<workspace>/.agents/agents/` | YAML/Markdown | `fs.readdir` + `fs.readFile` |
| Rules | `<workspace>/.agents/rules/` | Markdown | `fs.readdir` + `fs.readFile` |
| Workflows | `<workspace>/.agents/workflows/` | Markdown | `fs.readdir` + `fs.readFile` |
| Knowledge Items | `~/.gemini/antigravity-ide/knowledge/<ki>/` | `metadata.json` + markdown artifacts | `fs.readdir` + `fs.readFile` |
| Extension Settings | VS Code settings API | JSON | `vscode.workspace.getConfiguration()` |

### 5.4 Communication Protocol

Extension Host ↔ Webview messaging pattern:

```typescript
// Extension → Webview
panel.webview.postMessage({
  type: 'data:conversations',
  payload: conversations
});

// Webview → Extension
panel.webview.onDidReceiveMessage(message => {
  switch (message.type) {
    case 'request:conversations':
      loadConversations();
      break;
    case 'action:deleteConversation':
      deleteConversation(message.id);
      break;
  }
});
```

---

## 6. Security Considerations

| Concern | Mitigation |
|---|---|
| **Webview CSP** | Strict Content Security Policy; only allow self and Google Fonts CDN |
| **File Access** | Read-only by default; write operations gated by explicit user confirmation modals |
| **No Network Calls** | Extension does not make external API calls; all data is local filesystem |
| **Data Privacy** | Conversations remain local; no telemetry or cloud sync |
| **Webview Sandbox** | Standard VS Code webview sandbox with `enableScripts: true`, no `enableCommandUris` |

---

## 7. Non-Functional Requirements

| Requirement | Target |
|---|---|
| **Startup Time** | Extension activates in < 200ms; Control Center opens in < 500ms |
| **Data Load** | Initial conversation list loads in < 1s for up to 500 conversations |
| **Search Latency** | Debounced search returns results in < 100ms for cached data |
| **Memory** | Extension host < 50MB RSS; Webview < 100MB |
| **Compatibility** | VS Code >= 1.85, Antigravity IDE (all versions) |
| **Platform** | macOS (primary), Windows, Linux |

---

## 8. Success Metrics

| Metric | Target | Measurement |
|---|---|---|
| **Daily Active Usage** | >70% of IDE sessions open CC at least once | Extension telemetry (opt-in) |
| **Time to Find Conversation** | <10s average | User feedback |
| **MCP Tool Discovery** | Users can find any tool schema in <3 clicks | UX testing |
| **Skill Management** | Create a new skill in <30s from CC | UX testing |

---

## 9. Phased Delivery

### Phase 1 — Foundation (MVP)
- Extension scaffolding (TypeScript, esbuild, package.json)
- "Control Center" button in toolbar
- Webview panel with navigation sidebar
- Conversation History module (list, search, view)
- MCP Server module (list servers, view tool schemas)
- Premium dark mode UI shell

### Phase 2 — Skills & Agents
- Skills Manager (list, search, view, categorize)
- Agents, Rules & Workflows module (list, view)
- Knowledge Items browser
- Settings panel

### Phase 3 — Power Features
- CRUD operations (create/edit/delete skills, rules, workflows)
- Conversation export (Markdown, JSON, HTML)
- Conversation analytics dashboard
- MCP server health checks
- External browser window mode (local Express server)
- Inline skill/rule editor

---

## 10. Open Questions

1. ~~**antigravity-sdk adoption:**~~ ✅ **RESOLVED** — Adopted `antigravity-sdk` as the primary integration layer in v0.2.0. The SDK provides session listing via `cascade.getSessions()`, step control via `cascade.acceptStep()`/`cascade.rejectStep()`, headless cascade creation via `ls.createCascade()`, agent preferences via `cascade.getPreferences()`, and system diagnostics via `cascade.getDiagnostics()`. Filesystem-based fallback is retained for environments where the SDK cannot initialize (e.g., running outside Antigravity IDE).
2. **Independent window:** The VS Code API doesn't support truly detached OS windows. Should Phase 3 implement an Express-based local server to serve the UI in a system browser? Or is a full-width Webview panel sufficient?
3. **Write operations:** Should the Control Center allow editing/deleting skills and rules directly, or should it remain read-only and defer modifications to the agent?
4. **Multi-workspace:** When multiple workspaces are open, how should skills/agents/rules be scoped and displayed?

### 10.2 SDK Integration Architecture (v0.2.0)

| Component | Role | Source File |
|---|---|---|
| `sdkService.ts` | Singleton SDK initialization with `AntigravitySDK.init()`, availability check, error state | `src/services/sdkService.ts` |
| `sdkMonitorService.ts` | Real-time event polling (2s interval) for step changes, session switches, new conversations | `src/services/sdkMonitorService.ts` |
| `preferencesService.ts` | Read agent preferences (terminal policy, secure mode, sandbox) and system diagnostics | `src/services/preferencesService.ts` |
| `modelCatalog.ts` | Model catalog with SDK `Models` enum mapping and numeric ID resolution | `src/services/modelCatalog.ts` |
| `conversationProvider.ts` | SDK-first provider: `cascade.getSessions()` returns `ITrajectoryEntry[]` with native titles (from `summary`), step counts, and `workspaceUri` for project detection. Rename uses `ls.setTitle()` (native ConversationAnnotations). Send via `ls.sendMessage()`. Step control via `cascade.acceptStep()` etc. Filesystem fallback for all operations when SDK unavailable. | `src/providers/conversationProvider.ts` |

#### SDK Data Flow

```
┌─────────────────────────────────────────────────┐
│  Webview (HTML/CSS/JS)                          │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │ Conversations│  │ Settings (SDK Status)    │  │
│  │ + Step Ctrl  │  │ + Preferences            │  │
│  │ + Focus Btn  │  │ + Diagnostics            │  │
│  └──────┬──────┘  └────────────┬─────────────┘  │
│         │ postMessage          │ postMessage     │
│─────────┼──────────────────────┼─────────────────│
│         ▼                      ▼                 │
│  ┌──────────────────────────────────────────────┐│
│  │          WebviewManager (msg router)         ││
│  └────┬───────┬────────┬───────────────┬────────┘│
│       │       │        │               │         │
│       ▼       ▼        ▼               ▼         │
│  sdkService  sdkMonitor  preferencesService      │
│  (init)      (poll 2s)   (read prefs/diag)       │
│       │       │                                  │
│       ▼       ▼                                  │
│  ┌──────────────────┐  ┌────────────────────────┐│
│  │ AntigravitySDK   │  │ conversationProvider   ││
│  │ (cascade, ls)    │  │ (SDK + filesystem)     ││
│  └──────────────────┘  └────────────────────────┘│
└─────────────────────────────────────────────────┘
```

---

## 11. Glossary

| Term | Definition |
|---|---|
| **CC** | Control Center — this extension |
| **Webview** | VS Code's embedded browser panel for custom UI |
| **MCP** | Model Context Protocol — standardized tool server interface |
| **KI** | Knowledge Item — curated context stored in the Antigravity brain |
| **Brain** | Antigravity's local data directory (`~/.gemini/antigravity-ide/brain/`) |
| **SKILL.md** | Markdown file defining an agent skill's instructions and metadata |
| **antigravity-sdk** | Official TypeScript SDK for Antigravity IDE extension development |
| **Cascade** | An Antigravity conversation/chat session (equivalent to "Convo" in the UI) |
| **LSBridge** | Language Server bridge — SDK's low-level protocol for headless cascade management |
| **Step Control** | SDK methods to accept/reject code edits and terminal commands during agent execution |
| **SDKMonitorService** | Polling-based event monitor that detects session changes, new steps, and state updates |
