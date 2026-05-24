# ⚡ Antigravity Control Center


A premium, high-fidelity visual dashboard extension for the **Antigravity IDE** that allows you to manage, monitor, and configure all active AI resources: Conversations, FastMCP v2 Servers, Skills, Agents, Rules, Workflows, and Knowledge Items.

---

## 🚀 How to Open the Control Center

If you don't see the toolbar button immediately after installation, you can launch the Control Center using any of these **four convenient methods**:

### 1. 🎹 Keyboard Shortcut (Recommended)
Press the custom global key binding to launch the window instantly from any context:
- **macOS:** `Ctrl` + `Cmd` + `C`
- **Windows / Linux:** `Ctrl` + `Alt` + `C`

### 2. ⌨️ IDE Command Palette
1. Open the Command Palette by pressing `Cmd` + `Shift` + `P` (macOS) or `Ctrl` + `Shift` + `P` (Windows/Linux).
2. Type **`Control Center`** or **`controlCenter.open`** and press **Enter**.

### 3. 🛠️ Editor Title Toolbar Button
Look at the **top-right button panel** of your editor window when you have *at least one active file open*. 
- It appears as a grid-shaped **Dashboard Icon** `$(dashboard)`.
- *Note: In Antigravity IDE, editor toolbar buttons are only visible when a file tab is actively open in the editor area.*

### 4. ⚡ Status Bar Quick Launcher
Look at the **bottom-right status bar** of your IDE.
- Click the **`⚡ CC`** button to launch the dashboard at any time.

---

## 💎 Key Features

- **💬 Conversation History Browser**: Read and paginate raw `transcript.jsonl` files with color-coded message bubbles (User Prompts vs Agent Actions) and collapsible tool call parameter accordions.
- **🔌 FastMCP v2 Tool Schema Inspector**: Explore all configured local tool servers, search across tool schemas, and view parameter types and instructions.
- **🧠 Workspace & Plugin Skills**: Browse and render all active markdown skill manuals, complete with directory file trees.
- **🤖 Agents, Rules & Workflows**: Inspect autonomous specialist definitions, mandatory coding rules, and slash command templates.
- **📚 Curated Knowledge Items (KIs)**: Access structured background contexts, metadata references, and markdown artifacts.
- **⚙️ Integrated Preferences**: Change data directories, validate path integrity, and save launch modes (embedded vs browser).

---

## 📁 System Directory Map

The dashboard operates by reading the standard local directories of your Antigravity installation:

| Resource | Folder Path | Format |
|---|---|---|
| **Conversations** | `~/.gemini/antigravity-ide/brain/<session_id>/` | `transcript.jsonl` |
| **MCP Servers** | `~/.gemini/antigravity-ide/mcp/<server_name>/` | JSON schemas |
| **Skills (Global)** | `~/.gemini/config/plugins/<plugin_name>/skills/` | `SKILL.md` |
| **Skills (Workspace)** | `<your_workspace>/.agents/skills/` | `SKILL.md` |
| **Agents** | `<your_workspace>/.agents/agents/` | `.md` / `.yaml` |
| **Rules** | `<your_workspace>/.agents/rules/` | `.md` |
| **Workflows** | `<your_workspace>/.agents/workflows/` | `.md` |
| **Knowledge Items** | `~/.gemini/antigravity-ide/knowledge/` | `metadata.json` |

---

## 🛠️ Update & Build Tools

For developers modifying and enhancing the Control Center, execute these utility scripts inside the root directory:
- `./build.sh` : Re-bundles TypeScript code using `esbuild`.
- `./install.sh` : Re-installs dependencies, builds, packages VSIX, and registers the extension.
- `./upgrade.sh` : Cleans previous packages, forces a dependency rebuild, and overrides the active IDE installation.
