"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/antigravity-sdk/dist/index.js
var require_dist = __commonJS({
  "node_modules/antigravity-sdk/dist/index.js"(exports2) {
    "use strict";
    var path32 = require("path");
    var fs32 = require("fs");
    var vscode7 = require("vscode");
    var crypto2 = require("crypto");
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n.default = e;
      return Object.freeze(n);
    }
    var path3__namespace = /* @__PURE__ */ _interopNamespace(path32);
    var fs3__namespace = /* @__PURE__ */ _interopNamespace(fs32);
    var vscode__namespace = /* @__PURE__ */ _interopNamespace(vscode7);
    var crypto__namespace = /* @__PURE__ */ _interopNamespace(crypto2);
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
      get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
    }) : x)(function(x) {
      if (typeof require !== "undefined")
        return require.apply(this, arguments);
      throw Error('Dynamic require of "' + x + '" is not supported');
    });
    var __commonJS2 = (cb, mod) => function __require2() {
      return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    };
    var require_package = __commonJS2({
      "package.json"(exports$1, module3) {
        module3.exports = {
          name: "antigravity-sdk",
          version: "1.7.0",
          description: "Community SDK for building extensions for Antigravity IDE",
          main: "dist/index.js",
          types: "dist/index.d.ts",
          files: [
            "dist"
          ],
          scripts: {
            build: "tsup",
            dev: "tsup --watch",
            lint: "eslint src/",
            docs: "typedoc --out docs-site src/index.ts",
            prepublishOnly: "npm run build"
          },
          keywords: [
            "antigravity",
            "antigravity-ide",
            "google-antigravity",
            "sdk",
            "cascade",
            "ai-agent",
            "vscode-extension"
          ],
          author: "Kanezal",
          license: "AGPL-3.0-or-later",
          repository: {
            type: "git",
            url: "git+https://github.com/Kanezal/antigravity-sdk.git"
          },
          homepage: "https://kanezal.github.io/antigravity-sdk",
          engines: {
            node: ">=16.0.0"
          },
          antigravityVersions: ">=1.107.0",
          peerDependencies: {
            "@types/vscode": "^1.85.0"
          },
          devDependencies: {
            "@types/node": "^20.0.0",
            "@types/vscode": "^1.85.0",
            "@typescript-eslint/eslint-plugin": "^8.0.0",
            "@typescript-eslint/parser": "^8.0.0",
            eslint: "^9.0.0",
            tsup: "^8.0.0",
            typedoc: "^0.27.0",
            typescript: "^5.0.0"
          },
          dependencies: {
            "sql.js": "^1.14.0"
          }
        };
      }
    });
    var TerminalExecutionPolicy = /* @__PURE__ */ ((TerminalExecutionPolicy2) => {
      TerminalExecutionPolicy2[TerminalExecutionPolicy2["OFF"] = 1] = "OFF";
      TerminalExecutionPolicy2[TerminalExecutionPolicy2["AUTO"] = 2] = "AUTO";
      TerminalExecutionPolicy2[TerminalExecutionPolicy2["EAGER"] = 3] = "EAGER";
      return TerminalExecutionPolicy2;
    })(TerminalExecutionPolicy || {});
    var ArtifactReviewPolicy = /* @__PURE__ */ ((ArtifactReviewPolicy2) => {
      ArtifactReviewPolicy2[ArtifactReviewPolicy2["ALWAYS"] = 1] = "ALWAYS";
      ArtifactReviewPolicy2[ArtifactReviewPolicy2["TURBO"] = 2] = "TURBO";
      ArtifactReviewPolicy2[ArtifactReviewPolicy2["AUTO"] = 3] = "AUTO";
      return ArtifactReviewPolicy2;
    })(ArtifactReviewPolicy || {});
    var CortexStepType = /* @__PURE__ */ ((CortexStepType2) => {
      CortexStepType2["RunCommand"] = "RunCommand";
      CortexStepType2["WriteToFile"] = "WriteToFile";
      CortexStepType2["ViewFile"] = "ViewFile";
      CortexStepType2["ViewFileOutline"] = "ViewFileOutline";
      CortexStepType2["ViewCodeItem"] = "ViewCodeItem";
      CortexStepType2["SearchWeb"] = "SearchWeb";
      CortexStepType2["ReadUrlContent"] = "ReadUrlContent";
      CortexStepType2["OpenBrowserUrl"] = "OpenBrowserUrl";
      CortexStepType2["ReadBrowserPage"] = "ReadBrowserPage";
      CortexStepType2["ListBrowserPages"] = "ListBrowserPages";
      CortexStepType2["ListDirectory"] = "ListDirectory";
      CortexStepType2["FindByName"] = "FindByName";
      CortexStepType2["CodebaseSearch"] = "CodebaseSearch";
      CortexStepType2["GrepSearch"] = "GrepSearch";
      CortexStepType2["SendCommandInput"] = "SendCommandInput";
      CortexStepType2["ReadTerminal"] = "ReadTerminal";
      CortexStepType2["ShellExec"] = "ShellExec";
      CortexStepType2["McpTool"] = "McpTool";
      CortexStepType2["InvokeSubagent"] = "InvokeSubagent";
      CortexStepType2["Memory"] = "Memory";
      CortexStepType2["KnowledgeGeneration"] = "KnowledgeGeneration";
      CortexStepType2["UserInput"] = "UserInput";
      CortexStepType2["SystemMessage"] = "SystemMessage";
      CortexStepType2["PlannerResponse"] = "PlannerResponse";
      CortexStepType2["Wait"] = "Wait";
      CortexStepType2["ProposeCode"] = "ProposeCode";
      CortexStepType2["WriteCascadeEdit"] = "WriteCascadeEdit";
      return CortexStepType2;
    })(CortexStepType || {});
    var StepStatus = /* @__PURE__ */ ((StepStatus2) => {
      StepStatus2["Running"] = "running";
      StepStatus2["Completed"] = "completed";
      StepStatus2["Failed"] = "failed";
      StepStatus2["WaitingForUser"] = "waiting_for_user";
      StepStatus2["Cancelled"] = "cancelled";
      return StepStatus2;
    })(StepStatus || {});
    var TrajectoryType = /* @__PURE__ */ ((TrajectoryType2) => {
      TrajectoryType2["Chat"] = "chat";
      TrajectoryType2["Cascade"] = "cascade";
      return TrajectoryType2;
    })(TrajectoryType || {});
    var EventEmitter2 = class {
      constructor() {
        this._listeners = /* @__PURE__ */ new Set();
        this._disposed = false;
        this.event = (listener) => {
          if (this._disposed) {
            throw new Error("EventEmitter has been disposed");
          }
          this._listeners.add(listener);
          return {
            dispose: () => {
              this._listeners.delete(listener);
            }
          };
        };
      }
      /**
       * Fire the event, notifying all listeners.
       *
       * @param data - The event data to send to listeners
       */
      fire(data) {
        if (this._disposed) {
          return;
        }
        for (const listener of this._listeners) {
          try {
            listener(data);
          } catch (error) {
            console.error("[AntigravitySDK] Event listener error:", error);
          }
        }
      }
      /**
       * Subscribe to the event, but only fire once.
       *
       * @param listener - Callback to invoke once
       * @returns Disposable to cancel before the event fires
       */
      once(listener) {
        const sub = this.event((data) => {
          sub.dispose();
          listener(data);
        });
        return sub;
      }
      /**
       * Get the current number of listeners.
       */
      get listenerCount() {
        return this._listeners.size;
      }
      /**
       * Dispose of the emitter and all listeners.
       */
      dispose() {
        this._disposed = true;
        this._listeners.clear();
      }
    };
    var DisposableStore = class {
      constructor() {
        this._disposables = [];
        this._disposed = false;
      }
      /**
       * Add a disposable to the store.
       *
       * @param disposable - The disposable to track
       * @returns The same disposable (for chaining)
       */
      add(disposable) {
        if (this._disposed) {
          disposable.dispose();
          console.warn("[AntigravitySDK] Adding disposable to already disposed store");
        } else {
          this._disposables.push(disposable);
        }
        return disposable;
      }
      /**
       * Dispose all tracked disposables.
       */
      dispose() {
        if (this._disposed) {
          return;
        }
        this._disposed = true;
        for (const d of this._disposables) {
          try {
            d.dispose();
          } catch (error) {
            console.error("[AntigravitySDK] Dispose error:", error);
          }
        }
        this._disposables.length = 0;
      }
    };
    function toDisposable(fn) {
      return { dispose: fn };
    }
    var AntigravitySDKError = class extends Error {
      constructor(message) {
        super(`[AntigravitySDK] ${message}`);
        this.name = "AntigravitySDKError";
      }
    };
    var AntigravityNotFoundError = class extends AntigravitySDKError {
      constructor() {
        super("Antigravity IDE not detected. Make sure this extension is running inside Antigravity.");
        this.name = "AntigravityNotFoundError";
      }
    };
    var CommandExecutionError = class extends AntigravitySDKError {
      constructor(command, reason) {
        super(`Command "${command}" failed: ${reason}`);
        this.command = command;
        this.reason = reason;
        this.name = "CommandExecutionError";
      }
    };
    var StateReadError = class extends AntigravitySDKError {
      constructor(key, reason) {
        super(`Failed to read state key "${key}": ${reason}`);
        this.key = key;
        this.reason = reason;
        this.name = "StateReadError";
      }
    };
    var SessionNotFoundError = class extends AntigravitySDKError {
      constructor(sessionId) {
        super(`Session "${sessionId}" not found`);
        this.sessionId = sessionId;
        this.name = "SessionNotFoundError";
      }
    };
    var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
      LogLevel2[LogLevel2["Debug"] = 0] = "Debug";
      LogLevel2[LogLevel2["Info"] = 1] = "Info";
      LogLevel2[LogLevel2["Warn"] = 2] = "Warn";
      LogLevel2[LogLevel2["Error"] = 3] = "Error";
      LogLevel2[LogLevel2["Off"] = 4] = "Off";
      return LogLevel2;
    })(LogLevel || {});
    var _Logger = class _Logger2 {
      /**
       * Create a logger for a specific module.
       *
       * @param module - Module name (shown in log prefix)
       */
      constructor(module3) {
        this.module = module3;
      }
      /**
       * Set the global log level for all SDK loggers.
       *
       * @param level - Minimum level to output
       */
      static setLevel(level) {
        _Logger2._globalLevel = level;
      }
      /**
       * Route SDK logs to a VS Code OutputChannel (or any line-based sink).
       * Pass `null` to disable.
       *
       * @example
       * ```typescript
       * const out = vscode.window.createOutputChannel('My Extension');
       * Logger.setOutput(msg => out.appendLine(msg));
       * ```
       */
      static setOutput(fn) {
        _Logger2._outputFn = fn;
      }
      /** Log a debug message. */
      debug(message, ...args) {
        this._log(0, message, args);
      }
      /** Log an informational message. */
      info(message, ...args) {
        this._log(1, message, args);
      }
      /** Log a warning. */
      warn(message, ...args) {
        this._log(2, message, args);
      }
      /** Log an error. */
      error(message, ...args) {
        this._log(3, message, args);
      }
      _log(level, message, args) {
        if (level < _Logger2._globalLevel) {
          return;
        }
        const prefix = `[AntigravitySDK:${this.module}]`;
        const fn = level === 3 ? console.error : level === 2 ? console.warn : level === 1 ? console.info : console.debug;
        fn(prefix, message, ...args);
        if (_Logger2._outputFn) {
          const levelStr = LogLevel[level].toUpperCase().padEnd(5);
          const extra = args.length ? " " + args.map((a) => a instanceof Error ? a.message : String(a)).join(" ") : "";
          _Logger2._outputFn(`[SDK:${this.module}] ${levelStr} ${message}${extra}`);
        }
      }
    };
    _Logger._globalLevel = 2;
    _Logger._outputFn = null;
    var Logger = _Logger;
    function parseVersion(v) {
      return String(v).split(".").map(Number);
    }
    function cmpVersion(a, b) {
      for (let i = 0; i < 3; i++) {
        const diff = (a[i] || 0) - (b[i] || 0);
        if (diff !== 0)
          return diff < 0 ? -1 : 1;
      }
      return 0;
    }
    function parseRange(range) {
      return range.trim().split(/\s+/).map((part) => {
        const m = part.match(/^(>=|<=|>|<|=)?(\d[\d.]*)$/);
        if (!m)
          throw new Error(`Invalid AG version constraint: "${part}"`);
        return { op: m[1] || "=", ver: parseVersion(m[2]) };
      });
    }
    function satisfies(version, rangeStr) {
      const v = parseVersion(version);
      return parseRange(rangeStr).every(({ op, ver }) => {
        const cmp = cmpVersion(v, ver);
        switch (op) {
          case ">=":
            return cmp >= 0;
          case "<=":
            return cmp <= 0;
          case ">":
            return cmp > 0;
          case "<":
            return cmp < 0;
          case "=":
            return cmp === 0;
          default:
            return false;
        }
      });
    }
    function detectAGVersion() {
      try {
        const localAppData = process.env.LOCALAPPDATA || "";
        const agPkgPath = path3__namespace.join(localAppData, "Programs", "Antigravity", "resources", "app", "package.json");
        if (!fs3__namespace.existsSync(agPkgPath))
          return null;
        const agPkg = JSON.parse(fs3__namespace.readFileSync(agPkgPath, "utf8"));
        const version = agPkg.version;
        if (!version)
          return null;
        const sdkPkgPath = path3__namespace.join(__dirname, "..", "..", "package.json");
        const sdkPkg = JSON.parse(fs3__namespace.readFileSync(sdkPkgPath, "utf8"));
        const supportedRange = sdkPkg.antigravityVersions ?? "*";
        const compatible = supportedRange === "*" || satisfies(version, supportedRange);
        return { version, compatible, supportedRange };
      } catch {
        return null;
      }
    }
    var log = new Logger("CommandBridge");
    var AntigravityCommands = {
      // ─── Agent Panel & UI (VERIFIED: .open/.focus suffix required) ────────
      /** Open the Cascade agent panel */
      OPEN_AGENT_PANEL: "antigravity.agentPanel.open",
      /** Focus the Cascade agent panel */
      FOCUS_AGENT_PANEL: "antigravity.agentPanel.focus",
      /** Open the agent side panel */
      OPEN_AGENT_SIDE_PANEL: "antigravity.agentSidePanel.open",
      /** Focus the agent side panel */
      FOCUS_AGENT_SIDE_PANEL: "antigravity.agentSidePanel.focus",
      /** Toggle side panel visibility */
      TOGGLE_SIDE_PANEL: "antigravity.agentSidePanel.toggleVisibility",
      /** Open agent (generic) */
      OPEN_AGENT: "antigravity.openAgent",
      /** Toggle chat focus */
      TOGGLE_CHAT_FOCUS: "antigravity.toggleChatFocus",
      /** Switch between workspace editor and agent view */
      SWITCH_WORKSPACE_AGENT: "antigravity.switchBetweenWorkspaceAndAgent",
      // ─── Conversation Management (Critical for SDK) ──────────────────────
      /** Start a new conversation */
      START_NEW_CONVERSATION: "antigravity.startNewConversation",
      /** Send a prompt to the agent panel */
      SEND_PROMPT_TO_AGENT: "antigravity.sendPromptToAgentPanel",
      /** Send text to chat */
      SEND_TEXT_TO_CHAT: "antigravity.sendTextToChat",
      /** Send a chat action message */
      SEND_CHAT_ACTION: "antigravity.sendChatActionMessage",
      /** Set which conversation is visible */
      SET_VISIBLE_CONVERSATION: "antigravity.setVisibleConversation",
      /** Execute a cascade action */
      EXECUTE_CASCADE_ACTION: "antigravity.executeCascadeAction",
      /** Broadcast conversation deletion to all windows */
      BROADCAST_CONVERSATION_DELETION: "antigravity.broadcastConversationDeletion",
      /** Track that a background conversation was created */
      TRACK_BACKGROUND_CONVERSATION: "antigravity.trackBackgroundConversationCreated",
      // ─── Agent Step Control (VERIFIED) ────────────────────────────────────
      /** Accept the current agent step */
      ACCEPT_AGENT_STEP: "antigravity.agent.acceptAgentStep",
      /** Reject the current agent step */
      REJECT_AGENT_STEP: "antigravity.agent.rejectAgentStep",
      /** Accept a pending command */
      COMMAND_ACCEPT: "antigravity.command.accept",
      /** Reject a pending command */
      COMMAND_REJECT: "antigravity.command.reject",
      /** Accept a terminal command */
      TERMINAL_ACCEPT: "antigravity.terminalCommand.accept",
      /** Reject a terminal command */
      TERMINAL_REJECT: "antigravity.terminalCommand.reject",
      /** Run a terminal command */
      TERMINAL_RUN: "antigravity.terminalCommand.run",
      /** Open new conversation (prioritized) */
      OPEN_NEW_CONVERSATION: "antigravity.prioritized.chat.openNewConversation",
      // ─── Terminal Integration ─────────────────────────────────────────────
      /** Notify terminal command started */
      TERMINAL_COMMAND_START: "antigravity.onManagerTerminalCommandStart",
      /** Notify terminal command data */
      TERMINAL_COMMAND_DATA: "antigravity.onManagerTerminalCommandData",
      /** Notify terminal command finished */
      TERMINAL_COMMAND_FINISH: "antigravity.onManagerTerminalCommandFinish",
      /** Update last terminal command */
      UPDATE_TERMINAL_LAST_COMMAND: "antigravity.updateTerminalLastCommand",
      /** Notify shell command completion */
      ON_SHELL_COMPLETION: "antigravity.onShellCommandCompletion",
      /** Show managed terminal */
      SHOW_MANAGED_TERMINAL: "antigravity.showManagedTerminal",
      /** Send terminal output to chat */
      SEND_TERMINAL_TO_CHAT: "antigravity.sendTerminalToChat",
      /** Send terminal output to side panel */
      SEND_TERMINAL_TO_SIDE_PANEL: "antigravity.sendTerminalToSidePanel",
      // ─── Agent & Mode ─────────────────────────────────────────────────────
      /** Initialize the agent */
      INITIALIZE_AGENT: "antigravity.initializeAgent",
      // ─── Conversation Picker & Workspace ──────────────────────────────────
      /** Open conversation workspace picker */
      OPEN_CONVERSATION_PICKER: "antigravity.openConversationWorkspaceQuickPick",
      /** Open conversation picker (alternative) */
      OPEN_CONV_PICKER_ALT: "antigravity.openConversationPicker",
      /** Set working directories */
      SET_WORKING_DIRS: "antigravity.setWorkingDirectories",
      // ─── Review & Diff ────────────────────────────────────────────────────
      /** Open review changes view */
      OPEN_REVIEW_CHANGES: "antigravity.openReviewChanges",
      /** Open diff view */
      OPEN_DIFF_VIEW: "antigravity.openDiffView",
      /** Open diff zones */
      OPEN_DIFF_ZONES: "antigravity.openDiffZones",
      /** Close all diff zones */
      CLOSE_ALL_DIFF_ZONES: "antigravity.closeAllDiffZones",
      // ─── Rules & Workflows ────────────────────────────────────────────────
      /** Create a new rule */
      CREATE_RULE: "antigravity.createRule",
      /** Create a new workflow */
      CREATE_WORKFLOW: "antigravity.createWorkflow",
      /** Create a global workflow */
      CREATE_GLOBAL_WORKFLOW: "antigravity.createGlobalWorkflow",
      /** Open global rules */
      OPEN_GLOBAL_RULES: "antigravity.openGlobalRules",
      /** Open workspace rules */
      OPEN_WORKSPACE_RULES: "antigravity.openWorkspaceRules",
      // ─── Plugins & MCP ────────────────────────────────────────────────────
      /** Open configure plugins page */
      OPEN_CONFIGURE_PLUGINS: "antigravity.openConfigurePluginsPage",
      /** Get Cascade plugin template */
      GET_PLUGIN_TEMPLATE: "antigravity.getCascadePluginTemplate",
      /** Poll MCP server states */
      POLL_MCP_SERVERS: "antigravity.pollMcpServerStates",
      /** Open MCP config file */
      OPEN_MCP_CONFIG: "antigravity.openMcpConfigFile",
      /** Open MCP docs page */
      OPEN_MCP_DOCS: "antigravity.openMcpDocsPage",
      /** Update plugin installation count */
      UPDATE_PLUGIN_COUNT: "antigravity.updatePluginInstallationCount",
      // ─── Autocomplete ─────────────────────────────────────────────────────
      /** Enable autocomplete */
      ENABLE_AUTOCOMPLETE: "antigravity.enableAutocomplete",
      /** Disable autocomplete */
      DISABLE_AUTOCOMPLETE: "antigravity.disableAutocomplete",
      /** Accept completion */
      ACCEPT_COMPLETION: "antigravity.acceptCompletion",
      /** Force supercomplete */
      FORCE_SUPERCOMPLETE: "antigravity.forceSupercomplete",
      /** Snooze autocomplete temporarily */
      SNOOZE_AUTOCOMPLETE: "antigravity.snoozeAutocomplete",
      /** Cancel snooze */
      CANCEL_SNOOZE: "antigravity.cancelSnoozeAutocomplete",
      // ─── Auth & Account ───────────────────────────────────────────────────
      /** Login to Antigravity */
      LOGIN: "antigravity.login",
      /** Cancel login */
      CANCEL_LOGIN: "antigravity.cancelLogin",
      /** Handle auth refresh */
      HANDLE_AUTH_REFRESH: "antigravity.handleAuthRefresh",
      /** Sign in to Antigravity */
      SIGN_IN: "antigravity.SignInToAntigravity",
      // ─── Diagnostics & Debug ──────────────────────────────────────────────
      /** Get diagnostics info */
      GET_DIAGNOSTICS: "antigravity.getDiagnostics",
      /** Download diagnostics bundle */
      DOWNLOAD_DIAGNOSTICS: "antigravity.downloadDiagnostics",
      /** Capture traces */
      CAPTURE_TRACES: "antigravity.captureTraces",
      /** Enable tracing */
      ENABLE_TRACING: "antigravity.enableTracing",
      /** Clear and disable tracing */
      CLEAR_TRACING: "antigravity.clearAndDisableTracing",
      /** Get manager trace */
      GET_MANAGER_TRACE: "antigravity.getManagerTrace",
      /** Get workbench trace */
      GET_WORKBENCH_TRACE: "antigravity.getWorkbenchTrace",
      /** Toggle debug info widget */
      TOGGLE_DEBUG_INFO: "antigravity.toggleDebugInfoWidget",
      /** Open troubleshooting */
      OPEN_TROUBLESHOOTING: "antigravity.openTroubleshooting",
      /** Open issue reporter */
      OPEN_ISSUE_REPORTER: "antigravity.openIssueReporter",
      // ─── Language Server ──────────────────────────────────────────────────
      /** Restart the language server */
      RESTART_LANGUAGE_SERVER: "antigravity.restartLanguageServer",
      /** Kill language server and reload window */
      KILL_LS_AND_RELOAD: "antigravity.killLanguageServerAndReloadWindow",
      // ─── Git & Commit ─────────────────────────────────────────────────────
      /** Generate commit message via AI */
      GENERATE_COMMIT_MESSAGE: "antigravity.generateCommitMessage",
      /** Cancel commit message generation */
      CANCEL_COMMIT_MESSAGE: "antigravity.cancelGenerateCommitMessage",
      // ─── Browser ──────────────────────────────────────────────────────────
      /** Open browser */
      OPEN_BROWSER: "antigravity.openBrowser",
      /** Get browser onboarding port (returns number, e.g. 57401) */
      GET_BROWSER_PORT: "antigravity.getBrowserOnboardingPort",
      // ─── Settings & Import ────────────────────────────────────────────────
      /** Open quick settings panel */
      OPEN_QUICK_SETTINGS: "antigravity.openQuickSettingsPanel",
      /** Open customizations tab */
      OPEN_CUSTOMIZATIONS: "antigravity.openCustomizationsTab",
      /** Import VS Code settings */
      IMPORT_VSCODE_SETTINGS: "antigravity.importVSCodeSettings",
      /** Import VS Code extensions */
      IMPORT_VSCODE_EXTENSIONS: "antigravity.importVSCodeExtensions",
      /** Import Cursor settings */
      IMPORT_CURSOR_SETTINGS: "antigravity.importCursorSettings",
      /** Import Cursor extensions */
      IMPORT_CURSOR_EXTENSIONS: "antigravity.importCursorExtensions",
      // ─── Misc ─────────────────────────────────────────────────────────────
      /** Reload window */
      RELOAD_WINDOW: "antigravity.reloadWindow",
      /** Open documentation */
      OPEN_DOCS: "antigravity.openDocs",
      /** Open changelog */
      OPEN_CHANGELOG: "antigravity.openChangeLog",
      /** Explain and fix problem (from diagnostics) */
      EXPLAIN_AND_FIX: "antigravity.explainAndFixProblem",
      /** Open a URL */
      OPEN_URL: "antigravity.openGenericUrl",
      /** Editor mode settings */
      EDITOR_MODE_SETTINGS: "antigravity.editorModeSettings"
    };
    var CommandBridge = class {
      constructor() {
        this._disposed = false;
      }
      /**
       * Execute an Antigravity command.
       *
       * @param command - The command ID to execute
       * @param args - Arguments to pass to the command
       * @returns The command's return value
       * @throws {CommandExecutionError} If the command fails
       */
      async execute(command, ...args) {
        if (this._disposed) {
          throw new CommandExecutionError(command, "CommandBridge has been disposed");
        }
        log.debug(`Executing: ${command}`, args.length > 0 ? args : "");
        try {
          const result = await vscode__namespace.commands.executeCommand(command, ...args);
          return result;
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          log.error(`Command failed: ${command}`, message);
          throw new CommandExecutionError(command, message);
        }
      }
      /**
       * Check if a command is registered and available.
       *
       * @param command - Command ID to check
       * @returns true if the command exists
       */
      async isAvailable(command) {
        const commands4 = await vscode__namespace.commands.getCommands(true);
        return commands4.includes(command);
      }
      /**
       * Get all registered Antigravity commands.
       *
       * @returns List of command IDs starting with 'antigravity.'
       */
      async getAntigravityCommands() {
        const commands4 = await vscode__namespace.commands.getCommands(true);
        return commands4.filter((cmd) => cmd.startsWith("antigravity."));
      }
      /**
       * Register a command handler.
       *
       * @param command - Command ID to register
       * @param handler - Function to handle the command
       * @returns Disposable to unregister the command
       */
      register(command, handler) {
        return vscode__namespace.commands.registerCommand(command, handler);
      }
      dispose() {
        this._disposed = true;
      }
    };
    var log2 = new Logger("StateBridge");
    var USSKeys = {
      /** Agent preferences — terminal policy, review policy, secure mode, etc. (1020 bytes) */
      AGENT_PREFERENCES: "antigravityUnifiedStateSync.agentPreferences",
      /** Conversation/trajectory summaries — titles, timestamps, workspace URIs (74KB+) */
      TRAJECTORY_SUMMARIES: "antigravityUnifiedStateSync.trajectorySummaries",
      /** Agent manager window state (192 bytes) */
      AGENT_MANAGER_WINDOW: "antigravityUnifiedStateSync.agentManagerWindow",
      /** Enterprise override store (56 bytes) */
      OVERRIDE_STORE: "antigravityUnifiedStateSync.overrideStore",
      /** Model preferences — selected model, sentinel key */
      MODEL_PREFERENCES: "antigravityUnifiedStateSync.modelPreferences",
      /** Artifact review state (1204 bytes) */
      ARTIFACT_REVIEW: "antigravityUnifiedStateSync.artifactReview",
      /** Browser preferences (380 bytes) */
      BROWSER_PREFERENCES: "antigravityUnifiedStateSync.browserPreferences",
      /** Editor preferences (108 bytes) */
      EDITOR_PREFERENCES: "antigravityUnifiedStateSync.editorPreferences",
      /** Tab preferences (404 bytes) */
      TAB_PREFERENCES: "antigravityUnifiedStateSync.tabPreferences",
      /** Window preferences (44 bytes) */
      WINDOW_PREFERENCES: "antigravityUnifiedStateSync.windowPreferences",
      /** Scratch/playground workspaces (268 bytes) */
      SCRATCH_WORKSPACES: "antigravityUnifiedStateSync.scratchWorkspaces",
      /** Sidebar workspaces — recent workspace list (5604 bytes) */
      SIDEBAR_WORKSPACES: "antigravityUnifiedStateSync.sidebarWorkspaces",
      /** User status info (5196 bytes) */
      USER_STATUS: "antigravityUnifiedStateSync.userStatus",
      /** Model credits/usage info */
      MODEL_CREDITS: "antigravityUnifiedStateSync.modelCredits",
      /** Onboarding state (140 bytes) */
      ONBOARDING: "antigravityUnifiedStateSync.onboarding",
      /** Seen NUX (new user experience) IDs (76 bytes) */
      SEEN_NUX_IDS: "antigravityUnifiedStateSync.seenNuxIds",
      // ⚠️ Jetski-specific state (separate sync namespace)
      /** Agent manager initialization state — contains auth tokens, workspace map (5144 bytes) */
      AGENT_MANAGER_INIT: "jetskiStateSync.agentManagerInitState",
      // ⚠️ Non-USS but relevant keys
      /** All user settings — JSON format */
      ALL_USER_SETTINGS: "antigravityUserSettings.allUserSettings",
      /** Allowed model configs for commands */
      ALLOWED_COMMAND_MODEL_CONFIGS: "antigravity_allowed_command_model_configs",
      /** Chat session store index (JSON: {"version":1,"entries":{}}) */
      CHAT_SESSION_INDEX: "chat.ChatSessionStore.index"
    };
    var SENSITIVE_KEYS = /* @__PURE__ */ new Set([
      "antigravityUnifiedStateSync.oauthToken",
      "jetskiStateSync.agentManagerInitState",
      "antigravityAuthStatus"
    ]);
    var SENTINEL_KEYS = {
      PLANNING_MODE: "planningModeSentinelKey",
      ARTIFACT_REVIEW_POLICY: "artifactReviewPolicySentinelKey",
      TERMINAL_AUTO_EXECUTION_POLICY: "terminalAutoExecutionPolicySentinelKey",
      ALLOW_NON_WORKSPACE_FILES: "allowAgentAccessNonWorkspaceFilesSentinelKey",
      ALLOW_GITIGNORE_ACCESS: "allowCascadeAccessGitignoreFilesSentinelKey",
      SECURE_MODE: "secureModeSentinelKey",
      EXPLAIN_FIX_IN_CONVO: "explainAndFixInCurrentConversationSentinelKey",
      AUTO_CONTINUE_ON_MAX: "autoContinueOnMaxGeneratorInvocationsSentinelKey",
      DISABLE_AUTO_OPEN_EDITED: "disableAutoOpenEditedFilesSentinelKey",
      ENABLE_SOUNDS: "enableSoundsForSpecialEventsSentinelKey",
      DISABLE_AUTO_FIX_LINTS: "disableCascadeAutoFixLintsSentinelKey",
      ENABLE_SHELL_INTEGRATION: "enableShellIntegrationSentinelKey",
      SANDBOX_ALLOW_NETWORK: "sandboxAllowNetworkSentinelKey",
      ENABLE_TERMINAL_SANDBOX: "enableTerminalSandboxSentinelKey"
    };
    var StateBridge = class {
      constructor() {
        this._dbPath = null;
        this._db = null;
        this._disposed = false;
      }
      /**
       * Initialize the state bridge by locating and opening state database.
       *
       * @throws {StateReadError} If the database cannot be found
       */
      async initialize() {
        const dbPath = this._findStateDb();
        if (!dbPath) {
          throw new StateReadError("state.vscdb", "Could not locate Antigravity state database");
        }
        this._dbPath = dbPath;
        try {
          const path62 = __require("path");
          const fs7 = __require("fs");
          let initSqlJs;
          const localSqlJs = path62.join(__dirname, "sql-wasm.js");
          if (fs7.existsSync(localSqlJs)) {
            initSqlJs = __require(localSqlJs);
          } else {
            initSqlJs = __require("sql.js");
          }
          const candidates = [
            // 1. Adjacent to this file (if wasm was bundled/copied to dist/)
            path62.join(__dirname, "sql-wasm.wasm"),
            // 2. sql.js package dist/ (standard npm install)
            path62.resolve(__dirname, "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm"),
            // 3. Hoisted node_modules (monorepo / npm workspaces)
            path62.resolve(__dirname, "..", "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm"),
            // 4. Walk up to find it (deep hoisting)
            path62.resolve(__dirname, "..", "..", "..", "node_modules", "sql.js", "dist", "sql-wasm.wasm")
          ];
          try {
            const sqlJsMain = __require.resolve("sql.js");
            candidates.unshift(path62.join(path62.dirname(sqlJsMain), "sql-wasm.wasm"));
          } catch {
          }
          let wasmPath = null;
          for (const p of candidates) {
            if (fs7.existsSync(p)) {
              wasmPath = p;
              break;
            }
          }
          if (!wasmPath) {
            throw new Error("sql-wasm.wasm not found in any expected location");
          }
          log2.debug(`sql-wasm.wasm located at: ${wasmPath}`);
          const SQL = await initSqlJs({
            locateFile: () => wasmPath
          });
          const fileBuffer = fs7.readFileSync(dbPath);
          const fileSizeKb = (fileBuffer.length / 1024).toFixed(1);
          this._db = new SQL.Database(fileBuffer);
          log2.info(`State database opened via sql.js: ${dbPath} (${fileSizeKb} KB)`);
        } catch (error) {
          log2.warn("sql.js not available, will use child_process fallback", error);
        }
      }
      /**
       * Read a raw value from the state database.
       *
       * @param key - The SQLite key to read
       * @returns The raw string value, or null if not found
       * @throws {StateReadError} If the key is sensitive or read fails
       */
      async getRawValue(key) {
        if (this._disposed) {
          throw new StateReadError(key, "StateBridge has been disposed");
        }
        if (!this._dbPath) {
          throw new StateReadError(key, "StateBridge not initialized");
        }
        if (SENSITIVE_KEYS.has(key)) {
          log2.warn(`Blocked access to sensitive key: ${key}`);
          throw new StateReadError(key, "Access to sensitive keys is blocked by the SDK for security");
        }
        log2.debug(`getRawValue: ${key} (${this._db ? "sql.js" : "child_process"})`);
        try {
          if (this._db) {
            return this._querySqlJs(key);
          }
          return await this._queryChildProcess(key);
        } catch (error) {
          if (error instanceof StateReadError)
            throw error;
          const msg = error instanceof Error ? error.message : String(error);
          throw new StateReadError(key, msg);
        }
      }
      /**
       * Get agent preferences from USS.
       *
       * @returns Parsed agent preferences
       */
      async getAgentPreferences() {
        log2.debug("getAgentPreferences: reading USS key");
        const raw = await this.getRawValue(USSKeys.AGENT_PREFERENCES);
        if (!raw) {
          log2.warn("No agent preferences found, returning defaults");
          return this._defaultPreferences();
        }
        log2.debug(`getAgentPreferences: raw value length=${raw.length}, parsing protobuf sentinels`);
        try {
          const prefs = this._parseAgentPreferences(raw);
          log2.debug(`getAgentPreferences: terminalPolicy=${prefs.terminalExecutionPolicy}, secureMode=${prefs.secureModeEnabled}`);
          return prefs;
        } catch (error) {
          log2.error("Failed to parse preferences, returning defaults", error);
          return this._defaultPreferences();
        }
      }
      /**
       * Get all stored USS keys from the state database.
       *
       * @returns List of key names related to Antigravity (excludes sensitive keys)
       */
      async getAntigravityKeys() {
        if (!this._dbPath) {
          throw new StateReadError("*", "StateBridge not initialized");
        }
        let keys;
        if (this._db) {
          const result = this._db.exec(
            "SELECT key FROM ItemTable WHERE key LIKE '%antigravity%' OR key LIKE '%jetskiStateSync%' OR key LIKE 'chat.%'"
          );
          keys = result.length > 0 ? result[0].values.map((r) => r[0]) : [];
        } else {
          const result = await this._queryChildProcess("*");
          keys = result ? result.split("\n").map((l) => l.trim()).filter(Boolean) : [];
        }
        return keys.filter((k) => !SENSITIVE_KEYS.has(k));
      }
      /**
       * Query using sql.js (in-process, pure JS).
       */
      _querySqlJs(key) {
        const stmt = this._db.prepare("SELECT value FROM ItemTable WHERE key = $key");
        stmt.bind({ $key: key });
        if (stmt.step()) {
          const row = stmt.getAsObject();
          stmt.free();
          return row.value ?? null;
        }
        stmt.free();
        return null;
      }
      /**
       * Query using child_process sqlite3 CLI (fallback).
       */
      async _queryChildProcess(key) {
        const { exec } = __require("child_process");
        const { promisify } = __require("util");
        const execAsync = promisify(exec);
        const sql = key === "*" ? "SELECT key FROM ItemTable WHERE key LIKE '%antigravity%' OR key LIKE '%jetskiStateSync%'" : `SELECT value FROM ItemTable WHERE key = '${key.replace(/'/g, "''")}'`;
        try {
          const { stdout } = await execAsync(`sqlite3 "${this._dbPath}" "${sql}"`, {
            encoding: "utf8",
            timeout: 5e3
          });
          return stdout.trim() || null;
        } catch {
          return null;
        }
      }
      /**
       * Locate the state.vscdb file across platforms.
       */
      _findStateDb() {
        const candidates = [];
        const appData = process.env.APPDATA;
        if (appData) {
          candidates.push(path3__namespace.join(appData, "Antigravity", "User", "globalStorage", "state.vscdb"));
        }
        const home = process.env.HOME;
        if (home) {
          candidates.push(
            path3__namespace.join(
              home,
              "Library",
              "Application Support",
              "Antigravity",
              "User",
              "globalStorage",
              "state.vscdb"
            )
          );
        }
        if (home) {
          candidates.push(
            path3__namespace.join(home, ".config", "Antigravity", "User", "globalStorage", "state.vscdb")
          );
        }
        for (const candidate of candidates) {
          if (fs3__namespace.existsSync(candidate)) {
            return candidate;
          }
        }
        return null;
      }
      /**
       * Parse agent preferences from Base64(Protobuf).
       *
       * The protobuf structure uses "sentinel keys" as string fields:
       * - `planningModeSentinelKey` → nested message with Base64(varint)
       * - `terminalAutoExecutionPolicySentinelKey` → nested message with Base64(varint)
       * - `artifactReviewPolicySentinelKey` → nested message with Base64(varint)
       *
       * Each sentinel value is itself a small Base64 string (e.g., "EAM=" = varint 3 = EAGER).
       */
      _parseAgentPreferences(raw) {
        const buffer = Buffer.from(raw, "base64");
        const text = buffer.toString("utf8");
        const terminalPolicy = this._extractSentinelValue(text, SENTINEL_KEYS.TERMINAL_AUTO_EXECUTION_POLICY);
        const artifactPolicy = this._extractSentinelValue(text, SENTINEL_KEYS.ARTIFACT_REVIEW_POLICY);
        const planningMode = this._extractSentinelValue(text, SENTINEL_KEYS.PLANNING_MODE);
        const secureMode = this._extractSentinelValue(text, SENTINEL_KEYS.SECURE_MODE);
        const terminalSandbox = this._extractSentinelValue(text, SENTINEL_KEYS.ENABLE_TERMINAL_SANDBOX);
        const sandboxNetwork = this._extractSentinelValue(text, SENTINEL_KEYS.SANDBOX_ALLOW_NETWORK);
        const shellIntegration = this._extractSentinelValue(text, SENTINEL_KEYS.ENABLE_SHELL_INTEGRATION);
        const nonWorkspaceFiles = this._extractSentinelValue(text, SENTINEL_KEYS.ALLOW_NON_WORKSPACE_FILES);
        const gitignoreAccess = this._extractSentinelValue(text, SENTINEL_KEYS.ALLOW_GITIGNORE_ACCESS);
        const explainFix = this._extractSentinelValue(text, SENTINEL_KEYS.EXPLAIN_FIX_IN_CONVO);
        const autoContinue = this._extractSentinelValue(text, SENTINEL_KEYS.AUTO_CONTINUE_ON_MAX);
        const disableAutoOpen = this._extractSentinelValue(text, SENTINEL_KEYS.DISABLE_AUTO_OPEN_EDITED);
        const enableSounds = this._extractSentinelValue(text, SENTINEL_KEYS.ENABLE_SOUNDS);
        const disableAutoFix = this._extractSentinelValue(text, SENTINEL_KEYS.DISABLE_AUTO_FIX_LINTS);
        return {
          terminalExecutionPolicy: terminalPolicy ?? 1,
          artifactReviewPolicy: artifactPolicy ?? 1,
          planningMode: planningMode ?? 0,
          secureModeEnabled: (secureMode ?? 0) === 1,
          terminalSandboxEnabled: (terminalSandbox ?? 0) === 1,
          sandboxAllowNetwork: (sandboxNetwork ?? 0) === 1,
          shellIntegrationEnabled: (shellIntegration ?? 1) === 1,
          allowNonWorkspaceFiles: (nonWorkspaceFiles ?? 0) === 1,
          allowGitignoreAccess: (gitignoreAccess ?? 0) === 1,
          explainFixInCurrentConvo: (explainFix ?? 0) === 1,
          autoContinueOnMax: autoContinue ?? 0,
          disableAutoOpenEdited: (disableAutoOpen ?? 0) === 1,
          enableSounds: (enableSounds ?? 0) === 1,
          disableAutoFixLints: (disableAutoFix ?? 0) === 1,
          allowedCommands: [],
          deniedCommands: []
        };
      }
      /**
       * Extract a varint value from a protobuf sentinel key.
       *
       * The structure is: sentinel_key_string followed by a small
       * Base64 value like "EAM=" (which decodes to a protobuf varint).
       *
       * Known mappings:
       * - "CAE=" → field 1, value 1 (OFF / ALWAYS)
       * - "EAI=" → field 2, value 2 (AUTO / TURBO)
       * - "EAM=" → field 2, value 3 (EAGER / AUTO)
       */
      _extractSentinelValue(text, sentinelKey) {
        const idx = text.indexOf(sentinelKey);
        if (idx === -1)
          return null;
        const after = text.substring(idx + sentinelKey.length, idx + sentinelKey.length + 30);
        const b64Match = after.match(/([A-Za-z0-9+/]{2,8}={0,2})/);
        if (!b64Match)
          return null;
        try {
          const decoded = Buffer.from(b64Match[1], "base64");
          if (decoded.length >= 2) {
            return decoded[1];
          } else if (decoded.length === 1) {
            return decoded[0];
          }
        } catch {
        }
        return null;
      }
      _defaultPreferences() {
        return {
          terminalExecutionPolicy: 1,
          // OFF
          artifactReviewPolicy: 1,
          // ALWAYS
          planningMode: 0,
          secureModeEnabled: false,
          terminalSandboxEnabled: false,
          sandboxAllowNetwork: false,
          shellIntegrationEnabled: true,
          allowNonWorkspaceFiles: false,
          allowGitignoreAccess: false,
          explainFixInCurrentConvo: false,
          autoContinueOnMax: 0,
          disableAutoOpenEdited: false,
          enableSounds: false,
          disableAutoFixLints: false,
          allowedCommands: [],
          deniedCommands: []
        };
      }
      dispose() {
        this._disposed = true;
        if (this._db) {
          try {
            this._db.close();
          } catch {
          }
          this._db = null;
        }
        this._dbPath = null;
      }
    };
    var log3 = new Logger("EventMonitor");
    var EventMonitor = class {
      constructor(_state) {
        this._state = _state;
        this._disposables = new DisposableStore();
        this._ussTimer = null;
        this._trajTimer = null;
        this._ussSnapshots = /* @__PURE__ */ new Map();
        this._trajSnapshots = /* @__PURE__ */ new Map();
        this._activeSessionId = "";
        this._running = false;
        this._onStateChanged = this._disposables.add(new EventEmitter2());
        this.onStateChanged = this._onStateChanged.event;
        this._onNewConversation = this._disposables.add(new EventEmitter2());
        this.onNewConversation = this._onNewConversation.event;
        this._onStepCountChanged = this._disposables.add(new EventEmitter2());
        this.onStepCountChanged = this._onStepCountChanged.event;
        this._onActiveSessionChanged = this._disposables.add(new EventEmitter2());
        this.onActiveSessionChanged = this._onActiveSessionChanged.event;
        this._watchedKeys = [
          USSKeys.TRAJECTORY_SUMMARIES,
          USSKeys.AGENT_PREFERENCES,
          USSKeys.USER_STATUS
        ];
      }
      /**
       * Start polling for state changes.
       *
       * @param intervalMs - USS polling interval (default: 3000ms)
       * @param trajectoryIntervalMs - Trajectory polling interval (default: 5000ms).
       *   Set to 0 to disable trajectory polling (saves CPU).
       */
      start(intervalMs = 3e3, trajectoryIntervalMs = 5e3) {
        if (this._running)
          return;
        this._running = true;
        log3.info(`Starting event monitor (USS: ${intervalMs}ms, Traj: ${trajectoryIntervalMs}ms)`);
        this._takeUSSSnapshot().catch(() => {
        });
        this._ussTimer = setInterval(async () => {
          try {
            await this._pollUSS();
          } catch (error) {
            log3.error("USS poll error", error);
          }
        }, intervalMs);
        if (trajectoryIntervalMs > 0) {
          this._pollTrajectories().catch(() => {
          });
          this._trajTimer = setInterval(async () => {
            try {
              await this._pollTrajectories();
            } catch (error) {
              log3.error("Trajectory poll error", error);
            }
          }, trajectoryIntervalMs);
        }
      }
      /**
       * Stop polling.
       */
      stop() {
        if (this._ussTimer) {
          clearInterval(this._ussTimer);
          this._ussTimer = null;
        }
        if (this._trajTimer) {
          clearInterval(this._trajTimer);
          this._trajTimer = null;
        }
        this._running = false;
        log3.info("Event monitor stopped");
      }
      /** Check if the monitor is currently running. */
      get isRunning() {
        return this._running;
      }
      /** Get the currently active session ID. */
      get activeSessionId() {
        return this._activeSessionId;
      }
      // ─── USS Polling ────────────────────────────────────────────────────
      async _takeUSSSnapshot() {
        for (const key of this._watchedKeys) {
          try {
            const value = await this._state.getRawValue(key);
            this._ussSnapshots.set(key, value ? value.length : 0);
          } catch {
            this._ussSnapshots.set(key, 0);
          }
        }
      }
      async _pollUSS() {
        for (const key of this._watchedKeys) {
          try {
            const value = await this._state.getRawValue(key);
            const newSize = value ? value.length : 0;
            const previousSize = this._ussSnapshots.get(key) ?? 0;
            if (newSize !== previousSize) {
              log3.debug(`USS change: ${key} (${previousSize} -> ${newSize})`);
              this._ussSnapshots.set(key, newSize);
              this._onStateChanged.fire({ key, newSize, previousSize });
              if (key === USSKeys.TRAJECTORY_SUMMARIES && newSize > previousSize) {
                this._onNewConversation.fire();
              }
            }
          } catch {
          }
        }
      }
      // ─── Trajectory Polling ─────────────────────────────────────────────
      async _pollTrajectories() {
        let trajectories;
        try {
          const raw = await vscode__namespace.commands.executeCommand("antigravity.getDiagnostics");
          if (!raw || typeof raw !== "string")
            return;
          const diag = JSON.parse(raw);
          if (!Array.isArray(diag.recentTrajectories))
            return;
          trajectories = diag.recentTrajectories;
        } catch {
          return;
        }
        for (const traj of trajectories) {
          const id = traj.googleAgentId;
          if (!id)
            continue;
          const prev = this._trajSnapshots.get(id);
          const newCount = traj.lastStepIndex ?? 0;
          if (prev && prev.stepCount !== newCount) {
            const delta = newCount - prev.stepCount;
            log3.debug(`Step change: "${traj.summary}" ${prev.stepCount} -> ${newCount} (+${delta})`);
            this._onStepCountChanged.fire({
              sessionId: id,
              title: traj.summary ?? "Untitled",
              previousCount: prev.stepCount,
              newCount,
              delta
            });
          }
          this._trajSnapshots.set(id, {
            id,
            title: traj.summary ?? "Untitled",
            stepCount: newCount,
            lastModified: traj.lastModifiedTime ?? ""
          });
        }
        if (trajectories.length > 0) {
          const newActiveId = trajectories[0].googleAgentId;
          if (newActiveId && newActiveId !== this._activeSessionId) {
            const previousId = this._activeSessionId;
            this._activeSessionId = newActiveId;
            if (previousId !== "") {
              log3.debug(`Active session changed: "${trajectories[0].summary}"`);
              this._onActiveSessionChanged.fire({
                sessionId: newActiveId,
                title: trajectories[0].summary ?? "Untitled",
                previousSessionId: previousId
              });
            }
          }
        }
      }
      dispose() {
        this.stop();
        this._disposables.dispose();
      }
    };
    var log4 = new Logger("LSBridge");
    var Models = {
      GEMINI_FLASH: 1018,
      GEMINI_PRO_LOW: 1164,
      GEMINI_PRO_HIGH: 1165,
      CLAUDE_SONNET: 1163,
      CLAUDE_OPUS: 1154,
      GPT_OSS: 342
    };
    var LSBridge = class {
      constructor(executeCommand) {
        this._port = null;
        this._csrfToken = null;
        this._useTls = false;
        this._executeCommand = executeCommand;
      }
      /**
       * Discover the Language Server port and CSRF token.
       * Must be called before other methods.
       *
       * Discovery chain:
       * 1. Parse LS process CLI arguments (--port, --csrf_token)
       * 2. Fallback: getDiagnostics console logs (port only)
       * 3. Manual: call setConnection() after initialize() returns false
       */
      async initialize() {
        const fromProcess = await this._discoverFromProcess();
        if (fromProcess) {
          this._port = fromProcess.port;
          this._csrfToken = fromProcess.csrfToken;
          this._useTls = fromProcess.useTls;
          log4.info(`LS discovered from process: port=${this._port}, tls=${this._useTls}, csrf=${this._csrfToken ? "found" : "missing"}`);
          return true;
        }
        this._port = await this._discoverPortFromDiagnostics();
        if (this._port) {
          log4.warn(`LS port from diagnostics: ${this._port}, but CSRF token not found \u2014 RPC calls may fail with 401`);
          return true;
        }
        log4.warn("Could not discover LS connection. Use setConnection(port, csrfToken) manually.");
        return false;
      }
      /** Whether the bridge is ready (port discovered) */
      get isReady() {
        return this._port !== null;
      }
      /** The discovered LS port */
      get port() {
        return this._port;
      }
      /** Whether CSRF token is available */
      get hasCsrfToken() {
        return this._csrfToken !== null;
      }
      /**
       * Manually set the LS connection parameters.
       *
       * Use this when auto-discovery fails (e.g., non-standard install,
       * or you've discovered the port/token through other means like `lsof`).
       *
       * @param port - LS port number
       * @param csrfToken - CSRF token from LS process CLI args
       * @param useTls - Whether to use HTTPS (default: false, extension_server uses HTTP)
       *
       * @example
       * ```typescript
       * const ls = new LSBridge(commandBridge);
       * const ok = await ls.initialize();
       * if (!ok) {
       *     // Manual fallback: get port and csrf from your own discovery
       *     ls.setConnection(54321, 'abc123-csrf-token');
       * }
       * ```
       */
      setConnection(port, csrfToken, useTls = false) {
        this._port = port;
        this._csrfToken = csrfToken;
        this._useTls = useTls;
        log4.info(`LS connection set manually: port=${port}, tls=${useTls}, csrf=${csrfToken ? "provided" : "empty"}`);
      }
      // ─── Headless Cascade API ────────────────────────────────────────
      /**
       * Create a new cascade and optionally send a message.
       * Fully headless — no UI panel opened, no conversation switched.
       *
       * @returns cascadeId or null on failure
       */
      async createCascade(options2) {
        this._ensureReady();
        const startResp = await this._rpc("StartCascade", { source: 0 });
        const cascadeId = startResp?.cascadeId;
        if (!cascadeId) {
          log4.error("StartCascade returned no cascadeId");
          return null;
        }
        log4.info(`Cascade created: ${cascadeId}`);
        if (options2.text) {
          await this._sendMessage(cascadeId, options2.text, options2.model, options2.plannerType);
          log4.info(`Message sent to: ${cascadeId}`);
        }
        return cascadeId;
      }
      /**
       * Send a message to an existing cascade.
       *
       * @returns true if sent successfully
       */
      async sendMessage(options2) {
        this._ensureReady();
        await this._sendMessage(options2.cascadeId, options2.text, options2.model);
        return true;
      }
      /**
       * Switch the UI to show a specific cascade conversation.
       */
      async focusCascade(cascadeId) {
        this._ensureReady();
        await this._rpc("SmartFocusConversation", { cascadeId });
      }
      /**
       * Cancel a running cascade invocation.
       */
      async cancelCascade(cascadeId) {
        this._ensureReady();
        await this._rpc("CancelCascadeInvocation", { cascadeId });
      }
      // ─── Conversation Annotations API ───────────────────────────────
      /**
       * Native conversation annotations (verified from jetski_cortex.proto).
       *
       * ConversationAnnotations protobuf fields:
       *   - title (string)              — custom user title, overrides auto-summary
       *   - tags (string[])             — tags/labels
       *   - archived (bool)             — archive status  
       *   - starred (bool)              — pinned/starred
       *   - last_user_view_time (Timestamp)
       *
       * @param cascadeId - Conversation ID
       * @param annotations - Partial annotation fields to set
       * @param merge - If true, merge with existing annotations (default: true)
       */
      async updateAnnotations(cascadeId, annotations, merge = true) {
        this._ensureReady();
        const proto = {};
        if (annotations.title !== void 0)
          proto.title = annotations.title;
        if (annotations.starred !== void 0)
          proto.starred = annotations.starred;
        if (annotations.archived !== void 0)
          proto.archived = annotations.archived;
        if (annotations.tags !== void 0)
          proto.tags = annotations.tags;
        await this._rpc("UpdateConversationAnnotations", {
          cascadeId,
          annotations: proto,
          mergeAnnotations: merge
        });
        log4.info(`Annotations updated for ${cascadeId.substring(0, 8)}...`);
      }
      /**
       * Set a custom title for a conversation.
       *
       * This sets the `title` field in ConversationAnnotations.
       * When set, this title should be displayed instead of the
       * auto-generated `summary` from the LLM.
       *
       * @param cascadeId - Conversation ID
       * @param title - Custom title to set
       */
      async setTitle(cascadeId, title) {
        await this.updateAnnotations(cascadeId, { title });
      }
      /**
       * Star (pin) or unstar a conversation.
       *
       * This sets the `starred` field in ConversationAnnotations.
       *
       * @param cascadeId - Conversation ID
       * @param starred - true to star, false to unstar
       */
      async setStar(cascadeId, starred) {
        await this.updateAnnotations(cascadeId, { starred });
      }
      // ─── Conversation Read API ──────────────────────────────────────
      /**
       * Get details of a specific conversation.
       */
      async getConversation(cascadeId) {
        this._ensureReady();
        return this._rpc("GetConversation", { cascadeId });
      }
      /**
       * Get all cascade trajectories (conversation list).
       */
      async listCascades() {
        this._ensureReady();
        log4.debug("listCascades: fetching all trajectories");
        const resp = await this._rpc("GetAllCascadeTrajectories", {});
        const summaries = resp?.trajectorySummaries ?? {};
        log4.debug(`listCascades: ${Object.keys(summaries).length} entries`);
        return summaries;
      }
      /**
       * Get trajectory descriptions (lighter than full trajectories).
       * Returns { trajectories: [...] }.
       */
      async getTrajectoryDescriptions() {
        this._ensureReady();
        return this._rpc("GetUserTrajectoryDescriptions", {});
      }
      /**
       * Get user status (tier, models, etc.)
       */
      async getUserStatus() {
        this._ensureReady();
        return this._rpc("GetUserStatus", {});
      }
      /**
       * Make a raw RPC call to any LS method.
       * @param method - RPC method name (e.g. 'StartCascade')
       * @param payload - JSON payload
       */
      async rawRPC(method, payload) {
        this._ensureReady();
        return this._rpc(method, payload);
      }
      // ─── Internal ────────────────────────────────────────────────────
      _ensureReady() {
        if (!this._port) {
          throw new Error("LSBridge not initialized. Call initialize() first.");
        }
      }
      async _sendMessage(cascadeId, text, model, plannerType) {
        const payload = {
          cascadeId,
          items: [{ chunk: { case: "text", value: text } }],
          cascadeConfig: {
            plannerConfig: {
              plannerTypeConfig: {
                case: plannerType || "conversational",
                value: {}
              },
              requestedModel: {
                choice: { case: "model", value: model || Models.GEMINI_FLASH }
              }
            }
          }
        };
        await this._rpc("SendUserCascadeMessage", payload);
      }
      /**
       * Discover LS port and CSRF token from the Language Server process.
       *
       * VERIFIED 2026-03-01 from Antigravity extension.js source:
       *
       * 1. CSRF header is "x-codeium-csrf-token" (NOT x-csrf-token)
       * 2. CSRF value is --csrf_token from CLI (NOT --extension_server_csrf_token)
       * 3. ConnectRPC endpoint is on httpsPort (HTTPS) or httpPort (HTTP)
       *    These ports are NOT in CLI args (--random_port flag means random).
       *    We discover them via netstat/PID, excluding extension_server_port.
       *
       * Source code proof:
       *   n.header.set("x-codeium-csrf-token", e)        // header name
       *   address = `127.0.0.1:${te.httpsPort}`           // ConnectRPC address
       *   csrfToken = a = d.randomUUID() → --csrf_token   // token source
       *   t.headers["x-codeium-csrf-token"] === this.csrfToken ? ... : 403
       *
       * Discovery: 2 phases
       *   Phase 1: Get-CimInstance/ps → PID, --csrf_token, --extension_server_port
       *   Phase 2: netstat → find LISTENING ports for PID, exclude ext_server_port
       */
      async _discoverFromProcess() {
        try {
          const platform = process.platform;
          let processInfo = await this._findLSProcess(platform);
          if (!processInfo) {
            log4.debug("No LS processes found");
            return null;
          }
          log4.debug(`LS process found: PID=${processInfo.pid}, csrf=present, ext_port=${processInfo.extPort}`);
          const connectPort = await this._findConnectPort(platform, processInfo.pid, processInfo.extPort);
          if (!connectPort) {
            log4.debug("Could not find ConnectRPC port via netstat, trying extension_server_port as fallback");
            if (processInfo.extPort) {
              return { port: processInfo.extPort, csrfToken: processInfo.csrfToken, useTls: false };
            }
            return null;
          }
          return {
            port: connectPort.port,
            csrfToken: processInfo.csrfToken,
            useTls: connectPort.tls
          };
        } catch (err) {
          log4.debug("Process discovery failed", err);
        }
        return null;
      }
      /**
       * Phase 1: Find the LS process for this workspace.
       */
      async _findLSProcess(platform) {
        const { exec } = __require("child_process");
        const { promisify } = __require("util");
        const execAsync = promisify(exec);
        let output;
        if (platform === "win32") {
          const psScript = "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -match 'language_server' -and $_.CommandLine -match 'csrf_token' } | ForEach-Object { $_.ProcessId.ToString() + '|' + $_.CommandLine }";
          const encoded = Buffer.from(psScript, "utf16le").toString("base64");
          const result = await execAsync(
            `powershell.exe -NoProfile -EncodedCommand ${encoded}`,
            { encoding: "utf8", timeout: 1e4, windowsHide: true }
          );
          output = result.stdout;
        } else {
          const result = await execAsync(
            "ps -eo pid,args 2>/dev/null | grep language_server | grep csrf_token | grep -v grep",
            { encoding: "utf8", timeout: 5e3 }
          );
          output = result.stdout;
        }
        const lines = output.split("\n").filter((l) => l.trim().length > 0);
        if (lines.length === 0)
          return null;
        const workspaceHint = this._getWorkspaceHint();
        let bestLine = null;
        if (workspaceHint) {
          for (const line of lines) {
            if (line.includes(workspaceHint)) {
              bestLine = line;
              break;
            }
          }
        }
        if (!bestLine)
          bestLine = lines[0];
        let pid;
        if (platform === "win32") {
          pid = parseInt(bestLine.split("|")[0].trim(), 10);
        } else {
          pid = parseInt(bestLine.trim().split(/\s+/)[0], 10);
        }
        const csrfToken = this._extractArg(bestLine, "csrf_token");
        const extPortStr = this._extractArg(bestLine, "extension_server_port");
        const extPort = extPortStr ? parseInt(extPortStr, 10) : 0;
        if (!csrfToken || isNaN(pid))
          return null;
        return { pid, csrfToken, extPort };
      }
      /**
       * Phase 2: Find ConnectRPC port via netstat.
       *
       * The LS process listens on multiple ports:
       * - httpsPort (HTTPS, ConnectRPC) ← this is what we want
       * - httpPort  (HTTP, ConnectRPC)  ← also works
       * - lspPort   (LSP JSON-RPC)
       * - extension_server_port is separate (for Extension Host IPC)
       *
       * We find all LISTENING ports for the LS PID, exclude ext_server_port,
       * then try HTTPS first (preferred), fall back to HTTP.
       */
      async _findConnectPort(platform, pid, extPort) {
        try {
          const { exec } = __require("child_process");
          const { promisify } = __require("util");
          const execAsync = promisify(exec);
          let output;
          if (platform === "win32") {
            const result = await execAsync(
              `netstat -aon | findstr "LISTENING" | findstr "${pid}"`,
              { encoding: "utf8", timeout: 5e3, windowsHide: true }
            );
            output = result.stdout;
          } else {
            const result = await execAsync(
              `ss -tlnp 2>/dev/null | grep "pid=${pid}" || netstat -tlnp 2>/dev/null | grep "${pid}"`,
              { encoding: "utf8", timeout: 5e3 }
            );
            output = result.stdout;
          }
          const portMatches = output.matchAll(/127\.0\.0\.1:(\d+)/g);
          const ports = [];
          for (const m of portMatches) {
            const p = parseInt(m[1], 10);
            if (p !== extPort && !ports.includes(p)) {
              ports.push(p);
            }
          }
          if (ports.length === 0)
            return null;
          log4.debug(`LS ports (excl ext ${extPort}): ${ports.join(", ")}`);
          for (const port of ports) {
            log4.debug(`Probing port ${port} (HTTPS)...`);
            const tls = await this._probePort(port, true);
            if (tls) {
              log4.debug(`Port ${port} accepted HTTPS`);
              return { port, tls: true };
            }
          }
          for (const port of ports) {
            log4.debug(`Probing port ${port} (HTTP)...`);
            const http = await this._probePort(port, false);
            if (http) {
              log4.debug(`Port ${port} accepted HTTP`);
              return { port, tls: false };
            }
          }
        } catch (err) {
          log4.debug("netstat port discovery failed", err);
        }
        return null;
      }
      /**
       * Quick probe: check if a port accepts ConnectRPC requests.
       * Returns true if the port responds (even with error) on the given protocol.
       */
      _probePort(port, useTls) {
        const mod = useTls ? __require("https") : __require("http");
        const proto = useTls ? "https" : "http";
        return new Promise((resolve2) => {
          const req = mod.request(`${proto}://127.0.0.1:${port}/exa.language_server_pb.LanguageServerService/GetUserStatus`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Content-Length": 2 },
            rejectUnauthorized: false,
            timeout: 2e3
          }, (res) => {
            resolve2(res.statusCode === 401 || res.statusCode === 200);
          });
          req.on("error", () => resolve2(false));
          req.on("timeout", () => {
            req.destroy();
            resolve2(false);
          });
          req.write("{}");
          req.end();
        });
      }
      /**
       * Get a workspace hint string used to match the correct LS process.
       *
       * The LS process has --workspace_id like:
       *   file_d_3A_programming_better_antigravity
       * which is an encoded version of the workspace URI.
       */
      _getWorkspaceHint() {
        try {
          const vscode42 = __require("vscode");
          const folders = vscode42.workspace?.workspaceFolders;
          if (folders && folders.length > 0) {
            const folder = folders[0].uri.fsPath;
            const parts = folder.replace(/\\/g, "/").split("/");
            return parts.slice(-2).join("_").replace(/[-.\s]/g, "_").toLowerCase();
          }
        } catch {
        }
        return "";
      }
      /**
       * Extract a CLI argument value from a command-line string.
       * Supports both --key=value and --key value formats.
       */
      _extractArg(cmdLine, argName) {
        const eqMatch = cmdLine.match(new RegExp(`--${argName}=([^\\s"]+)`));
        if (eqMatch)
          return eqMatch[1];
        const spaceMatch = cmdLine.match(new RegExp(`--${argName}\\s+([^\\s"]+)`));
        if (spaceMatch)
          return spaceMatch[1];
        return null;
      }
      /**
       * Fallback: discover port from getDiagnostics console logs.
       * NOTE: This does NOT discover the CSRF token.
       * In recent Antigravity versions, the port URL may no longer appear in logs.
       */
      async _discoverPortFromDiagnostics() {
        try {
          const raw = await this._executeCommand("antigravity.getDiagnostics");
          if (!raw || typeof raw !== "string")
            return null;
          const diag = JSON.parse(raw);
          const logs = diag.agentWindowConsoleLogs || "";
          const m1 = logs.match(/127\.0\.0\.1:(\d+)\/exa\.language_server_pb/);
          if (m1)
            return parseInt(m1[1], 10);
          const m2 = logs.match(/https?:\/\/127\.0\.0\.1:(\d+)/);
          if (m2)
            return parseInt(m2[1], 10);
          if (diag.mainThreadLogs) {
            const mainLogs = typeof diag.mainThreadLogs === "string" ? diag.mainThreadLogs : JSON.stringify(diag.mainThreadLogs);
            const m3 = mainLogs.match(/127\.0\.0\.1:(\d+)/);
            if (m3)
              return parseInt(m3[1], 10);
          }
        } catch (err) {
          log4.error("Failed to discover LS port from diagnostics", err);
        }
        return null;
      }
      /**
       * Make an authenticated RPC call to the Language Server.
       * Sends x-csrf-token header when available.
       *
       * VERIFIED 2026-03-01:
       * - extension_server_port uses plain HTTP (no TLS)
       * - Main LS port (--random_port) uses HTTPS with self-signed cert
       */
      async _rpc(method, payload) {
        const httpModule = this._useTls ? __require("https") : __require("http");
        const protocol = this._useTls ? "https" : "http";
        const url = `${protocol}://127.0.0.1:${this._port}/exa.language_server_pb.LanguageServerService/${method}`;
        log4.debug(`RPC \u2192 ${method} (port=${this._port}, tls=${this._useTls}, csrf=${!!this._csrfToken})`);
        return new Promise((resolve2, reject) => {
          const body = JSON.stringify(payload);
          const headers = {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(body)
          };
          if (this._csrfToken) {
            headers["x-codeium-csrf-token"] = this._csrfToken;
          }
          const reqOptions = {
            method: "POST",
            headers
          };
          if (this._useTls) {
            reqOptions.rejectUnauthorized = false;
          }
          const req = httpModule.request(url, reqOptions, (res) => {
            let data = "";
            res.on("data", (chunk) => {
              data += chunk;
            });
            res.on("end", () => {
              if (res.statusCode === 200) {
                log4.debug(`RPC \u2190 ${method} OK (${data.length} bytes)`);
                try {
                  resolve2(JSON.parse(data));
                } catch {
                  resolve2(data);
                }
              } else {
                const hint = res.statusCode === 401 ? " (CSRF token may be invalid or missing -- try setConnection() with the correct token)" : "";
                reject(new Error(`LS ${method}: ${res.statusCode} -- ${data.substring(0, 200)}${hint}`));
              }
            });
          });
          req.on("error", (err) => reject(err));
          req.write(body);
          req.end();
        });
      }
    };
    var log5 = new Logger("CascadeManager");
    var CascadeManager = class {
      constructor(_commands, _state) {
        this._commands = _commands;
        this._state = _state;
        this._disposables = new DisposableStore();
        this._sessions = [];
        this._initialized = false;
        this._onSessionsChanged = this._disposables.add(new EventEmitter2());
        this.onSessionsChanged = this._onSessionsChanged.event;
      }
      /**
       * Initialize the cascade manager.
       * Loads the initial session list from getDiagnostics.
       */
      async initialize() {
        if (this._initialized)
          return;
        await this._loadSessions();
        this._initialized = true;
        log5.info(`Initialized with ${this._sessions.length} sessions`);
      }
      // ─── Read API ───────────────────────────────────────────────────────────
      /**
       * Get all known Cascade sessions.
       *
       * Uses `getDiagnostics.recentTrajectories` (clean JSON with titles).
       *
       * @returns List of trajectory entries sorted by recency
       */
      async getSessions() {
        if (!this._initialized) {
          await this._loadSessions();
        }
        return [...this._sessions];
      }
      /**
       * Refresh the session list.
       *
       * @returns Updated session list
       */
      async refreshSessions() {
        await this._loadSessions();
        this._onSessionsChanged.fire(this._sessions);
        return [...this._sessions];
      }
      /**
       * Get agent preferences (all 16 sentinel values).
       */
      async getPreferences() {
        log5.debug("getPreferences: delegating to StateBridge");
        return this._state.getAgentPreferences();
      }
      /**
       * Get IDE diagnostics (176KB JSON with system info, logs, trajectories).
       *
       * Structure (verified):
       * - isRemote, systemInfo (OS, user, email)
       * - extensionLogs (Array[375])
       * - rendererLogs, mainThreadLogs, agentWindowConsoleLogs
       * - languageServerLogs
       * - recentTrajectories (Array[10])
       *
       * @returns Parsed diagnostics information
       */
      async getDiagnostics() {
        log5.debug("getDiagnostics: executing antigravity.getDiagnostics");
        const raw = await this._commands.execute(AntigravityCommands.GET_DIAGNOSTICS);
        if (!raw || typeof raw !== "string") {
          throw new Error("getDiagnostics returned unexpected type");
        }
        log5.debug(`getDiagnostics: raw length=${raw.length} bytes, parsing`);
        const parsed = JSON.parse(raw);
        log5.debug(`getDiagnostics: user=${parsed.systemInfo?.userName}, trajectories=${parsed.recentTrajectories?.length ?? 0}`);
        return {
          isRemote: parsed.isRemote ?? false,
          systemInfo: {
            operatingSystem: parsed.systemInfo?.operatingSystem ?? "unknown",
            timestamp: parsed.systemInfo?.timestamp ?? "",
            userEmail: parsed.systemInfo?.userEmail ?? "",
            userName: parsed.systemInfo?.userName ?? ""
          },
          raw: parsed
        };
      }
      /**
       * Get the Chrome DevTools MCP URL.
       *
       * Verified: returns `http://127.0.0.1:{port}/mcp`
       *
       * @returns MCP URL string
       */
      async getMcpUrl() {
        const result = await this._commands.execute("antigravity.getChromeDevtoolsMcpUrl");
        return result ?? "";
      }
      /**
       * Check if a file is gitignored.
       *
       * @param filePath - Relative or absolute file path
       * @returns true if gitignored, false/null otherwise
       */
      async isFileGitIgnored(filePath) {
        const result = await this._commands.execute("antigravity.isFileGitIgnored", filePath);
        return result === true;
      }
      // ─── Write API ──────────────────────────────────────────────────────────
      //
      // Two-layer architecture (VERIFIED 2026-02-28):
      //
      // Layer 1 -- HEADLESS LS API (RECOMMENDED):
      //   Access: sdk.ls (LSBridge from antigravity-sdk)
      //   Method: Preact VNode tree -> component.props.lsClient -> 148 LS methods
      //   Creates cascade WITHOUT opening panel or switching UI.
      //   Usage:  await sdk.ls.createCascade({ text: 'prompt' })
      //
      // Layer 2 — COMMAND API (FALLBACK, this file):
      //   Access: vscode.commands.executeCommand (extension host)
      //   Method: startNewConversation → sendPromptToAgentPanel → restore
      //   PROBLEM: Always switches UI, causes flickering, race conditions.
      //   Use only when renderer integration is not available.
      //
      // ────────────────────────────────────────────────────────────────────────
      /**
       * Create a new Cascade conversation via VS Code commands.
       *
       * ⚠️ **FALLBACK APPROACH** — causes UI flickering.
       * For true headless creation, use `sdk.ls.createCascade()`
       * from the SDK's LS bridge (see LSBridge module).
       *
       * VERIFIED 2026-02-28:
       * - `startNewConversation` ✅ creates new chat (but switches UI)
       * - `prioritized.chat.openNewConversation` ❌ does NOT create new
       * - `sendPromptToAgentPanel` ✅ sends to currently visible chat (always opens panel)
       * - `sendTextToChat` ❌ does not visibly work
       *
       * @param options - Session creation options
       * @returns Session ID (googleAgentId) or empty string if not detected
       */
      async createSession(options2) {
        log5.info(`Creating session (command fallback): "${options2.task.substring(0, 50)}..."`);
        const beforeIds = new Set(this._sessions.map((s) => s.id));
        let previousActiveId = "";
        if (options2.background) {
          try {
            const raw = await this._commands.execute(AntigravityCommands.GET_DIAGNOSTICS);
            if (raw && typeof raw === "string") {
              const diag = JSON.parse(raw);
              if (Array.isArray(diag.recentTrajectories) && diag.recentTrajectories.length > 0) {
                previousActiveId = diag.recentTrajectories[0].googleAgentId ?? "";
              }
            }
          } catch {
          }
        }
        await this._commands.execute(AntigravityCommands.START_NEW_CONVERSATION);
        await this._delay(1500);
        if (options2.task) {
          await this._commands.execute(AntigravityCommands.SEND_PROMPT_TO_AGENT, options2.task);
        }
        if (options2.background) {
          await this._commands.execute(AntigravityCommands.TRACK_BACKGROUND_CONVERSATION);
        }
        const newId = await this._waitForNewSession(beforeIds, 8e3);
        if (options2.background && previousActiveId) {
          await this._delay(500);
          await this._commands.execute(AntigravityCommands.SET_VISIBLE_CONVERSATION, previousActiveId);
          log5.info(`Background session created, restored to ${previousActiveId}`);
        }
        if (newId) {
          log5.info(`Session created: ${newId}`);
        } else {
          log5.warn("Session created but ID not detected within timeout");
        }
        return newId;
      }
      /**
       * Create a background Cascade conversation via commands.
       *
       * ⚠️ **FALLBACK** — Uses quick-switch approach (UI flickers briefly).
       * For true headless background sessions, use the SDK's LS bridge:
       * ```typescript
       * // Using LSBridge:
       * const cascadeId = await sdk.ls.createCascade({ text: 'task', modelId: 1018 });
       * ```
       *
       * @param task - Initial task/prompt to send
       * @returns Session ID or empty string
       */
      async createBackgroundSession(task) {
        return this.createSession({ task, background: true });
      }
      /**
       * Send a message to the active Cascade conversation.
       *
       * Uses `antigravity.sendTextToChat` — the primary text sending command.
       */
      async sendMessage(text) {
        await this._commands.execute(AntigravityCommands.SEND_TEXT_TO_CHAT, text);
      }
      /**
       * Send a prompt directly to the agent panel.
       *
       * Uses `antigravity.sendPromptToAgentPanel` — focuses the agent panel.
       */
      async sendPrompt(text) {
        await this._commands.execute(AntigravityCommands.SEND_PROMPT_TO_AGENT, text);
      }
      /**
       * Send a chat action message (e.g., typing indicator, feedback).
       *
       * Uses `antigravity.sendChatActionMessage`.
       */
      async sendChatAction(action) {
        await this._commands.execute(AntigravityCommands.SEND_CHAT_ACTION, action);
      }
      /**
       * Switch to a specific conversation.
       *
       * @param sessionId - Conversation UUID (googleAgentId)
       */
      async focusSession(sessionId) {
        await this._commands.execute(AntigravityCommands.SET_VISIBLE_CONVERSATION, sessionId);
      }
      /**
       * Open a new conversation in the agent panel (prioritized command).
       *
       * Uses `antigravity.prioritized.chat.openNewConversation` which both
       * opens the panel AND creates a fresh conversation.
       */
      async openNewConversation() {
        await this._commands.execute(AntigravityCommands.OPEN_NEW_CONVERSATION);
      }
      /**
       * Execute a Cascade action.
       *
       * Uses `antigravity.executeCascadeAction`.
       *
       * @param action - Action data to execute
       */
      async executeCascadeAction(action) {
        await this._commands.execute(AntigravityCommands.EXECUTE_CASCADE_ACTION, action);
      }
      // ─── Step Control ───────────────────────────────────────────────────────
      /**
       * Accept the current agent step (code edit, file write, etc.).
       *
       * Uses `antigravity.agent.acceptAgentStep`.
       */
      async acceptStep() {
        await this._commands.execute(AntigravityCommands.ACCEPT_AGENT_STEP);
      }
      /** Reject the current agent step. */
      async rejectStep() {
        await this._commands.execute(AntigravityCommands.REJECT_AGENT_STEP);
      }
      /**
       * Accept a pending command (non-terminal, e.g. file edit confirmation).
       *
       * Uses `antigravity.command.accept`.
       * This is DIFFERENT from terminalCommand.accept.
       */
      async acceptCommand() {
        await this._commands.execute(AntigravityCommands.COMMAND_ACCEPT);
      }
      /** Reject a pending command (non-terminal). */
      async rejectCommand() {
        await this._commands.execute(AntigravityCommands.COMMAND_REJECT);
      }
      // ─── Terminal Control ───────────────────────────────────────────────────
      /**
       * Accept a pending terminal command.
       *
       * Uses `antigravity.terminalCommand.accept`.
       */
      async acceptTerminalCommand() {
        await this._commands.execute(AntigravityCommands.TERMINAL_ACCEPT);
      }
      /** Reject a pending terminal command. */
      async rejectTerminalCommand() {
        await this._commands.execute(AntigravityCommands.TERMINAL_REJECT);
      }
      /** Run a pending terminal command. */
      async runTerminalCommand() {
        await this._commands.execute(AntigravityCommands.TERMINAL_RUN);
      }
      // ─── Panel Control ──────────────────────────────────────────────────────
      /** Open the Cascade agent panel */
      async openPanel() {
        await this._commands.execute(AntigravityCommands.OPEN_AGENT_PANEL);
      }
      /** Focus the Cascade agent panel */
      async focusPanel() {
        await this._commands.execute(AntigravityCommands.FOCUS_AGENT_PANEL);
      }
      /** Open the agent side panel */
      async openSidePanel() {
        await this._commands.execute(AntigravityCommands.OPEN_AGENT_SIDE_PANEL);
      }
      /** Focus the agent side panel */
      async focusSidePanel() {
        await this._commands.execute(AntigravityCommands.FOCUS_AGENT_SIDE_PANEL);
      }
      /**
       * Get the browser integration port (e.g., 57401).
       */
      async getBrowserPort() {
        return this._commands.execute(AntigravityCommands.GET_BROWSER_PORT);
      }
      // ─── Private ────────────────────────────────────────────────────────────
      /**
       * Load sessions from getDiagnostics.recentTrajectories (clean JSON).
       *
       * VERIFIED structure per entry:
       * {
       *   googleAgentId: "uuid",      ← conversation ID
       *   trajectoryId:  "uuid",      ← internal trajectory ID
       *   summary:       "title",     ← human-readable title
       *   lastStepIndex: 992,         ← step count
       *   lastModifiedTime: "ISO"     ← last activity
       * }
       */
      async _loadSessions() {
        try {
          const raw = await this._commands.execute(AntigravityCommands.GET_DIAGNOSTICS);
          if (raw && typeof raw === "string") {
            const diag = JSON.parse(raw);
            if (Array.isArray(diag.recentTrajectories)) {
              this._sessions = diag.recentTrajectories.map((entry) => ({
                id: entry.googleAgentId ?? "",
                title: entry.summary ?? "Untitled",
                stepCount: entry.lastStepIndex ?? 0,
                workspaceUri: "",
                lastModifiedTime: entry.lastModifiedTime ?? "",
                trajectoryId: entry.trajectoryId ?? ""
              }));
              log5.debug(`Loaded ${this._sessions.length} sessions from getDiagnostics`);
              return;
            }
          }
        } catch (error) {
          log5.warn("getDiagnostics failed, falling back to USS", error);
        }
        try {
          await this._loadSessionsFromUSS();
        } catch (error) {
          log5.error("Failed to load sessions from USS", error);
          this._sessions = [];
        }
      }
      /**
       * Fallback: extract sessions from USS trajectory summaries protobuf.
       */
      async _loadSessionsFromUSS() {
        const raw = await this._state.getRawValue("antigravityUnifiedStateSync.trajectorySummaries");
        if (!raw) {
          this._sessions = [];
          return;
        }
        const buffer = Buffer.from(raw, "base64");
        const text = buffer.toString("utf8");
        const uuids = [...new Set(text.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g) || [])];
        this._sessions = uuids.map((id, i) => ({
          id,
          title: `Conversation ${i + 1}`,
          stepCount: 0,
          workspaceUri: ""
        }));
        log5.debug(`Loaded ${this._sessions.length} sessions from USS (fallback)`);
      }
      /**
       * Wait for a new session to appear in getDiagnostics.
       * Polls every 500ms up to timeoutMs.
       *
       * @returns New session ID or empty string if timeout
       */
      async _waitForNewSession(beforeIds, timeoutMs) {
        const deadline = Date.now() + timeoutMs;
        const pollInterval = 500;
        while (Date.now() < deadline) {
          await this._delay(pollInterval);
          try {
            const raw = await this._commands.execute(AntigravityCommands.GET_DIAGNOSTICS);
            if (!raw || typeof raw !== "string")
              continue;
            const diag = JSON.parse(raw);
            if (!Array.isArray(diag.recentTrajectories))
              continue;
            for (const entry of diag.recentTrajectories) {
              const id = entry.googleAgentId;
              if (id && !beforeIds.has(id)) {
                await this._loadSessions();
                return id;
              }
            }
          } catch {
          }
        }
        return "";
      }
      /**
       * Simple delay utility.
       */
      _delay(ms) {
        return new Promise((resolve2) => setTimeout(resolve2, ms));
      }
      dispose() {
        this._disposables.dispose();
      }
    };
    var IntegrationPoint = /* @__PURE__ */ ((IntegrationPoint2) => {
      IntegrationPoint2["TOP_BAR"] = "topBar";
      IntegrationPoint2["TOP_RIGHT"] = "topRight";
      IntegrationPoint2["INPUT_AREA"] = "inputArea";
      IntegrationPoint2["BOTTOM_ICONS"] = "bottomIcons";
      IntegrationPoint2["TURN_METADATA"] = "turnMeta";
      IntegrationPoint2["USER_BADGE"] = "userBadge";
      IntegrationPoint2["BOT_ACTION"] = "botAction";
      IntegrationPoint2["DROPDOWN_MENU"] = "dropdownMenu";
      IntegrationPoint2["CHAT_TITLE"] = "chatTitle";
      return IntegrationPoint2;
    })(IntegrationPoint || {});
    var Selectors = {
      /** The entire agent side panel container */
      PANEL: ".antigravity-agent-side-panel",
      /** Top bar with title and action icons */
      TOP_BAR: ".flex.items-center.justify-between",
      /** Icons area in top bar (contains +, refresh, ..., X) */
      TOP_ICONS: ".flex.items-center.gap-2",
      /** Chat title element */
      TITLE: ".flex.min-w-0.items-center.overflow-hidden",
      /** Message turns container (direct children are turns) */
      TURNS_CONTAINER: "#conversation .gap-y-3",
      /** User message bubble (inside turn) */
      USER_BUBBLE: ".rounded-lg",
      /** Input box container */
      INPUT_BOX: "#antigravity\\.agentSidePanelInputBox",
      /** 3-dot dropdown menu (appears dynamically) */
      DROPDOWN_MARKER_TEXT: ["Customization", "Export"],
      /** Dropdown menu item class pattern */
      DROPDOWN_ITEM: ".cursor-pointer"
    };
    var AG_PREFIX = "ag-";
    var AG_DATA_ATTR = "data-ag-sdk";
    var ScriptGenerator = class {
      /**
       * Generate the complete integration script.
       *
       * @param configs — Registered integration configurations
       * @param namespace — Optional namespace slug for file naming (used for heartbeat URL)
       * @returns — Complete JS code as a string
       */
      generate(configs, namespace) {
        const parts = [];
        parts.push(this._header());
        parts.push(this._css(configs));
        parts.push(this._helpers());
        parts.push(this._toast());
        parts.push(this._stats());
        const grouped = this._groupByPoint(configs);
        for (const [point, cfgs] of Object.entries(grouped)) {
          parts.push(this._generatePoint(point, cfgs));
        }
        parts.push(this._mainLoop(Object.keys(grouped)));
        parts.push(this._footer(namespace));
        return parts.join("\n");
      }
      // ─── Grouping ──────────────────────────────────────────────────────
      _groupByPoint(configs) {
        const groups = {};
        for (const c of configs) {
          if (c.enabled === false)
            continue;
          if (!groups[c.point])
            groups[c.point] = [];
          groups[c.point].push(c);
        }
        return groups;
      }
      // ─── Code Sections ────────────────────────────────────────────────
      _header() {
        return `(function agSDK(){
'use strict';
if(window.__agSDK)return;
window.__agSDK=true;

// \u2500\u2500\u2500 Theme Detection \u2500\u2500\u2500
var _isDark=document.body.classList.contains('vscode-dark')||document.body.classList.contains('vscode-high-contrast');
var _theme={
  bg:_isDark?'rgba(25,25,30,.95)':'rgba(245,245,250,.95)',
  fg:_isDark?'#ccc':'#333',
  fgDim:_isDark?'rgba(200,200,200,.45)':'rgba(80,80,80,.5)',
  fgHover:_isDark?'rgba(200,200,200,.8)':'rgba(40,40,40,.9)',
  accent:_isDark?'#4fc3f7':'#0288d1',
  accentBg:_isDark?'rgba(79,195,247,.12)':'rgba(2,136,209,.08)',
  success:_isDark?'#81c784':'#388e3c',
  successBg:_isDark?'rgba(76,175,80,.1)':'rgba(56,142,60,.06)',
  warn:_isDark?'#ffb74d':'#e65100',
  border:_isDark?'rgba(79,195,247,.06)':'rgba(0,0,0,.06)',
  borderHover:_isDark?'rgba(79,195,247,.2)':'rgba(2,136,209,.15)',
  sep:_isDark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)',
  shadow:_isDark?'rgba(0,0,0,.5)':'rgba(0,0,0,.15)',
  metaBg:_isDark?'linear-gradient(135deg,rgba(79,195,247,.03),rgba(156,39,176,.02))':'linear-gradient(135deg,rgba(2,136,209,.03),rgba(123,31,162,.02))',
  metaBgHover:_isDark?'linear-gradient(135deg,rgba(79,195,247,.07),rgba(156,39,176,.05))':'linear-gradient(135deg,rgba(2,136,209,.07),rgba(123,31,162,.05))'
};
// Watch for theme changes (VS Code toggles body classes)
new MutationObserver(function(){var newDark=document.body.classList.contains('vscode-dark');if(newDark!==_isDark){location.reload();}}).observe(document.body,{attributes:true,attributeFilter:['class']});
`;
      }
      _footer(namespace) {
        const heartbeatFile = namespace ? `ag-sdk-${namespace}-heartbeat` : "ag-sdk-heartbeat";
        return `
var _heartbeatMaxAge=172800000;
function checkHeartbeat(){
  try{
    var xhr=new XMLHttpRequest();
    xhr.open('GET','./${heartbeatFile}?t='+Date.now(),false);
    xhr.send();
    if(xhr.status!==200)return false;
    var ts=parseInt(xhr.responseText,10);
    if(isNaN(ts))return false;
    return(Date.now()-ts)<_heartbeatMaxAge;
  }catch(e){return false;}
}
function boot(){
  if(!checkHeartbeat()){
    console.log('[AG SDK] Heartbeat missing or stale \u2014 extension disabled? Skipping.');
    return;
  }
  if(document.readyState==='complete')setTimeout(start,3000);
  else window.addEventListener('load',function(){setTimeout(start,3000);});
}
boot();
})();`;
      }
      _css(configs) {
        new Set(configs.map((c) => c.point));
        return `
// \u2500\u2500\u2500 Theme-Aware CSS \u2500\u2500\u2500
var _cssRules=[
  '.${AG_PREFIX}meta{padding:3px 8px;background:'+_theme.metaBg+';border-top:1px solid '+_theme.border+';font-family:"Cascadia Code","Fira Code",monospace;font-size:9px;color:'+_theme.fgDim+';display:flex;align-items:center;gap:5px;flex-wrap:wrap;transition:all .2s;cursor:default;user-select:none;margin-top:2px;border-radius:0 0 6px 6px}',
  '.${AG_PREFIX}meta:hover{background:'+_theme.metaBgHover+';color:'+_theme.fgHover+'}',
  '.${AG_PREFIX}t{padding:1px 4px;border-radius:3px;font-size:8px;font-weight:700;letter-spacing:.3px}',
  '.${AG_PREFIX}u{background:'+_theme.successBg+';color:'+_theme.success+'}',
  '.${AG_PREFIX}b{background:'+_theme.accentBg+';color:'+_theme.accent+'}',
  '.${AG_PREFIX}k{color:'+_theme.fgDim+';font-size:8px}',
  '.${AG_PREFIX}v{color:'+_theme.fg+';font-size:8px;opacity:.55}',
  '.${AG_PREFIX}hi{color:'+_theme.accent+'}',
  '.${AG_PREFIX}w{color:'+_theme.warn+'}',
  '.${AG_PREFIX}s{color:'+_theme.sep+'}',
  // Toast
  '.${AG_PREFIX}toast{position:fixed;bottom:80px;right:20px;background:'+_theme.bg+';border:1px solid '+_theme.borderHover+';border-radius:8px;padding:10px 14px;font-family:"Cascadia Code",monospace;font-size:10px;color:'+_theme.fg+';z-index:99999;max-width:320px;backdrop-filter:blur(10px);box-shadow:0 4px 24px '+_theme.shadow+';animation:${AG_PREFIX}fade .25s ease}',
  '@keyframes ${AG_PREFIX}fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
  '.${AG_PREFIX}toast-t{color:'+_theme.accent+';font-weight:700;margin-bottom:5px;font-size:11px;display:flex;align-items:center;gap:6px}',
  '.${AG_PREFIX}toast-r{display:flex;gap:8px;margin:1px 0}',
  '.${AG_PREFIX}toast-k{color:'+_theme.fgDim+';min-width:70px}',
  '.${AG_PREFIX}toast-v{color:'+_theme.fg+'}',
  '.${AG_PREFIX}toast-badge{font-size:8px;padding:1px 5px;border-radius:3px;font-weight:700}',
  // Buttons
  '.${AG_PREFIX}hdr{display:inline-flex;align-items:center;gap:3px;padding:1px 6px;border-radius:4px;cursor:pointer;color:'+_theme.fgDim+';font-size:9px;font-family:"Cascadia Code",monospace;transition:all .15s;user-select:none}',
  '.${AG_PREFIX}hdr:hover{background:'+_theme.accentBg+';color:'+_theme.accent+'}',
  '.${AG_PREFIX}inp{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;border-radius:4px;cursor:pointer;color:'+_theme.fgDim+';font-size:11px;transition:all .15s;flex-shrink:0;padding:0 4px;font-family:"Cascadia Code",monospace}',
  '.${AG_PREFIX}inp:hover{background:'+_theme.accentBg+';color:'+_theme.accent+'}',
  '.${AG_PREFIX}menu{padding:4px 8px;cursor:pointer;font-size:11px;color:'+_theme.fg+';opacity:.7;transition:all .12s;display:flex;align-items:center;gap:6px;white-space:nowrap}',
  '.${AG_PREFIX}menu:hover{background:'+_theme.accentBg+';color:'+_theme.accent+';opacity:1}',
  '.${AG_PREFIX}vote{display:inline-flex;align-items:center;gap:3px;padding:1px 6px;border-radius:3px;cursor:pointer;color:'+_theme.fgDim+';font-size:9px;font-family:"Cascadia Code",monospace;transition:all .15s;margin-left:4px}',
  '.${AG_PREFIX}vote:hover{background:'+_theme.accentBg+';color:'+_theme.accent+'}',
  '.${AG_PREFIX}ubadge{display:inline-flex;align-items:center;gap:2px;padding:1px 5px;border-radius:3px;background:'+_theme.successBg+';cursor:pointer;color:'+_theme.success+';opacity:.4;font-size:8px;font-family:"Cascadia Code",monospace;transition:all .15s;margin-left:3px}',
  '.${AG_PREFIX}ubadge:hover{background:'+_theme.successBg+';color:'+_theme.success+';opacity:1}',
  '.${AG_PREFIX}title-hint{position:absolute;right:0;top:50%;transform:translateY(-50%);font-size:8px;color:'+_theme.accent+';opacity:.3;pointer-events:none;font-family:"Cascadia Code",monospace;transition:opacity .2s}',
  '.${AG_PREFIX}title-wrap:hover .${AG_PREFIX}title-hint{opacity:1}'
];
var css=document.createElement('style');
css.textContent=_cssRules.join('\\n');
document.head.appendChild(css);
`;
      }
      _helpers() {
        return `
function mk(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e;}
function fmt(n){return n>=1000?(n/1000).toFixed(1)+'k':''+n;}
`;
      }
      _toast() {
        return `
var _toastT=0;
function toast(title,badge,rows){
  var old=document.querySelector('.${AG_PREFIX}toast');if(old)old.remove();
  var t=mk('div','${AG_PREFIX}toast');
  var hdr=mk('div','${AG_PREFIX}toast-t');
  hdr.appendChild(document.createTextNode(title));
  if(badge){var b=mk('span','${AG_PREFIX}toast-badge');b.textContent=badge[0];b.style.background=badge[1];b.style.color=badge[2];hdr.appendChild(b);}
  t.appendChild(hdr);
  rows.forEach(function(r){var row=mk('div','${AG_PREFIX}toast-r');row.appendChild(mk('span','${AG_PREFIX}toast-k',r[0]));row.appendChild(mk('span','${AG_PREFIX}toast-v',r[1]));t.appendChild(row);});
  document.body.appendChild(t);
  clearTimeout(_toastT);_toastT=setTimeout(function(){if(t.parentNode)t.remove();},6000);
  t.addEventListener('click',function(){t.remove();});
}
`;
      }
      _stats() {
        return `
function getStats(){
  var c=document.querySelector(${JSON.stringify(Selectors.TURNS_CONTAINER)});
  if(!c)return null;
  var turns=0,uC=0,bC=0,code=0;
  Array.from(c.children).forEach(function(ch){
    if(ch.getAttribute('${AG_DATA_ATTR}')||ch.children.length<1)return;
    turns++;
    uC+=(ch.children[0]?.textContent?.trim()||'').length;
    bC+=(ch.children[1]?.textContent?.trim()||'').length;
    code+=(ch.children[1]?.querySelectorAll('pre')?.length||0);
  });
  return{turns:turns,u:uC,b:bC,code:code};
}
`;
      }
      // ─── Point generators ─────────────────────────────────────────────
      _generatePoint(point, configs) {
        switch (point) {
          case "topBar":
            return this._genTopBar(configs);
          case "topRight":
            return this._genTopRight(configs);
          case "inputArea":
            return this._genInputArea(configs);
          case "bottomIcons":
            return this._genBottomIcons(configs);
          case "turnMeta":
            return this._genTurnMeta(configs);
          case "userBadge":
            return this._genUserBadge(configs);
          case "botAction":
            return this._genBotAction(configs);
          case "dropdownMenu":
            return this._genDropdown(configs);
          case "chatTitle":
            return this._genTitle(configs);
          default:
            return `// Unknown point: ${point}`;
        }
      }
      _genToastCall(toast) {
        if (!toast)
          return "";
        const badge = toast.badge ? `[${JSON.stringify(toast.badge.text)},${JSON.stringify(toast.badge.bgColor)},${JSON.stringify(toast.badge.textColor)}]` : "null";
        const rows = toast.rows.map((r) => {
          if (r.dynamic) {
            return `[${JSON.stringify(r.key)},${r.value}]`;
          }
          return `[${JSON.stringify(r.key)},${JSON.stringify(r.value)}]`;
        }).join(",");
        return `toast(${JSON.stringify(toast.title)},${badge},[${rows}]);`;
      }
      _genTopBar(configs) {
        const buttons = configs.map((c) => {
          const toastCall = this._genToastCall(c.toast);
          return `  var btn_${c.id}=mk('a','${AG_PREFIX}hdr ${AG_PREFIX}${c.id}');
  btn_${c.id}.textContent=${JSON.stringify(c.icon)};
  btn_${c.id}.title=${JSON.stringify(c.tooltip || "")};
  btn_${c.id}.addEventListener('click',function(){${toastCall}});
  iconsArea.insertBefore(btn_${c.id},iconsArea.children[1]);`;
        });
        return `
function integrateTopBar(){
  var p=document.querySelector(${JSON.stringify(Selectors.PANEL)});if(!p)return;
  var topBar=p.querySelector(${JSON.stringify(Selectors.TOP_BAR)});if(!topBar)return;
  var iconsArea=topBar.querySelector(${JSON.stringify(Selectors.TOP_ICONS)});
  if(!iconsArea||iconsArea.querySelector('.${AG_PREFIX}${configs[0].id}'))return;
${buttons.join("\n")}
}
`;
      }
      _genTopRight(configs) {
        const buttons = configs.map((c) => {
          const toastCall = this._genToastCall(c.toast);
          return `  var btn_${c.id}=mk('a','${AG_PREFIX}hdr ${AG_PREFIX}${c.id}');
  btn_${c.id}.textContent=${JSON.stringify(c.icon)};
  btn_${c.id}.title=${JSON.stringify(c.tooltip || "")};
  btn_${c.id}.addEventListener('click',function(){${toastCall}});
  iconsArea.insertBefore(btn_${c.id},iconsArea.lastElementChild);`;
        });
        return `
function integrateTopRight(){
  var p=document.querySelector(${JSON.stringify(Selectors.PANEL)});if(!p)return;
  var topBar=p.querySelector(${JSON.stringify(Selectors.TOP_BAR)});if(!topBar)return;
  var iconsArea=topBar.querySelector(${JSON.stringify(Selectors.TOP_ICONS)});
  if(!iconsArea||iconsArea.querySelector('.${AG_PREFIX}${configs[0].id}'))return;
${buttons.join("\n")}
}
`;
      }
      _genInputArea(configs) {
        const buttons = configs.map((c) => {
          const toastCall = this._genToastCall(c.toast);
          return `  var btn=mk('div','${AG_PREFIX}inp ${AG_PREFIX}${c.id}');
  btn.textContent=${JSON.stringify(c.icon)};
  btn.title=${JSON.stringify(c.tooltip || "")};
  btn.addEventListener('click',function(){${toastCall}});
  btnRow.insertBefore(btn,btnRow.firstChild);`;
        });
        return `
function integrateInputArea(){
  var ib=document.querySelector(${JSON.stringify(Selectors.INPUT_BOX)});
  if(!ib||ib.querySelector('.${AG_PREFIX}${configs[0].id}'))return;
  var allBtns=ib.querySelectorAll('button,[role="button"]');
  if(allBtns.length===0)return;
  var btnRow=allBtns[allBtns.length-1].parentElement;if(!btnRow)return;
${buttons.join("\n")}
}
`;
      }
      _genBottomIcons(configs) {
        const buttons = configs.map((c) => {
          const toastCall = this._genToastCall(c.toast);
          return `  var btn=mk('div','${AG_PREFIX}inp ${AG_PREFIX}${c.id}');
  btn.textContent=${JSON.stringify(c.icon)};
  btn.title=${JSON.stringify(c.tooltip || "")};
  btn.addEventListener('click',function(){${toastCall}});
  row.appendChild(btn);`;
        });
        return `
function integrateBottomIcons(){
  var ib=document.querySelector(${JSON.stringify(Selectors.INPUT_BOX)});
  if(!ib||ib.querySelector('.${AG_PREFIX}${configs[0].id}'))return;
  var rows=ib.querySelectorAll('.flex.items-center');
  var row=null;
  for(var i=0;i<rows.length;i++){if(rows[i].querySelectorAll('svg').length>=2){row=rows[i];}}
  if(!row)return;
${buttons.join("\n")}
}
`;
      }
      _genTurnMeta(configs) {
        const cfg = configs[0];
        const metricParts = [];
        for (const m of cfg.metrics) {
          switch (m) {
            case "turnNumber":
              metricParts.push(`meta.appendChild(mk('span','${AG_PREFIX}t ${AG_PREFIX}b','T'+tI));`);
              break;
            case "userCharCount":
              metricParts.push(`if(uL>0){meta.appendChild(mk('span','${AG_PREFIX}t ${AG_PREFIX}u','USER'));meta.appendChild(mk('span','${AG_PREFIX}k',fmt(uL)));}`);
              break;
            case "separator":
              metricParts.push(`if(uL>0&&bL>0)meta.appendChild(mk('span','${AG_PREFIX}s','\\u2502'));`);
              break;
            case "aiCharCount":
              metricParts.push(`if(bL>0){meta.appendChild(mk('span','${AG_PREFIX}t ${AG_PREFIX}b','AI'));meta.appendChild(mk('span','${AG_PREFIX}k',fmt(bL)));}`);
              break;
            case "codeBlocks":
              metricParts.push(`if(codes>0){meta.appendChild(mk('span','${AG_PREFIX}k','code:'));meta.appendChild(mk('span','${AG_PREFIX}v ${AG_PREFIX}w',''+codes));}`);
              break;
            case "thinkingIndicator":
              metricParts.push(`if(brain)meta.appendChild(mk('span','${AG_PREFIX}v','\\u{1F9E0}'));`);
              break;
            case "ratio":
              metricParts.push(`if(uL>0&&bL>0){meta.appendChild(mk('span','${AG_PREFIX}k',(bL/uL).toFixed(1)+'x'));}`);
              break;
          }
        }
        const clickHandler = cfg.clickable !== false ? `meta.addEventListener('click',function(){toast('Turn '+tI,null,[['user:',fmt(uL)],['AI:',fmt(bL)],['ratio:',uL>0?(bL/uL).toFixed(1)+'x':'\\u2014']]);});` : "";
        return `
function integrateTurnMeta(){
  var c=document.querySelector(${JSON.stringify(Selectors.TURNS_CONTAINER)});if(!c)return;
  var tI=0;
  Array.from(c.children).forEach(function(turn){
    if(turn.getAttribute('${AG_DATA_ATTR}')||turn.children.length<1)return;
    turn.setAttribute('${AG_DATA_ATTR}','1');
    tI++;var uL=(turn.children[0]?.textContent?.trim()||'').length;
    var bL=(turn.children[1]?.textContent?.trim()||'').length;
    if(uL===0&&bL===0)return;
    var codes=turn.children[1]?.querySelectorAll('pre')?.length||0;
    var brain=(turn.children[1]?.textContent||'').includes('Thought');
    var meta=mk('div','${AG_PREFIX}meta');
    ${metricParts.join("\n    ")}
    ${clickHandler}
    turn.appendChild(meta);
  });
}
`;
      }
      _genUserBadge(configs) {
        const cfg = configs[0];
        let displayExpr = 'fmt(uLen)+" ch"';
        if (cfg.display === "wordCount") {
          displayExpr = '(txt.split(/\\\\s+/).length)+" w"';
        } else if (cfg.display === "custom" && cfg.customFormat) {
          displayExpr = cfg.customFormat;
        }
        return `
function integrateUserBadges(){
  var c=document.querySelector(${JSON.stringify(Selectors.TURNS_CONTAINER)});if(!c)return;
  Array.from(c.children).forEach(function(turn,i){
    if(turn.getAttribute('${AG_DATA_ATTR}u')||turn.children.length<1)return;
    var bubble=turn.children[0]?.querySelector(${JSON.stringify(Selectors.USER_BUBBLE)});
    if(!bubble)return;
    var txt=turn.children[0]?.textContent?.trim()||'';
    var uLen=txt.length;if(uLen<5)return;
    turn.setAttribute('${AG_DATA_ATTR}u','1');
    var row=turn.children[0]?.querySelector('.flex.w-full,.flex.flex-row')||turn.children[0];
    var badge=mk('span','${AG_PREFIX}ubadge');
    badge.textContent=${displayExpr};
    badge.title='SDK: User message';
    row.appendChild(badge);
  });
}
`;
      }
      _genBotAction(configs) {
        const items = configs.map((c) => {
          const toastCall = this._genToastCall(c.toast);
          return `var b=mk('span','${AG_PREFIX}vote');b.textContent=${JSON.stringify(c.icon + " " + c.label)};
      b.addEventListener('click',function(ev){ev.stopPropagation();${toastCall}});
      row.appendChild(b);`;
        });
        return `
function integrateBotAction(){
  var c=document.querySelector(${JSON.stringify(Selectors.TURNS_CONTAINER)});if(!c)return;
  c.querySelectorAll('span,button,a,div').forEach(function(el){
    if(el.getAttribute('${AG_DATA_ATTR}v'))return;
    var txt=el.textContent?.trim();
    if(txt==='Good'||txt==='Bad'){
      var row=el.parentElement;if(!row||row.querySelector('.${AG_PREFIX}vote'))return;
      el.setAttribute('${AG_DATA_ATTR}v','1');
      ${items.join("\n      ")}
    }
  });
}
`;
      }
      _genDropdown(configs) {
        const markers = JSON.stringify(Selectors.DROPDOWN_MARKER_TEXT);
        const items = configs.map((c) => {
          const toastCall = this._genToastCall(c.toast);
          const sep = c.separator ? `var sep=mk('div','');sep.style.cssText='height:1px;background:rgba(255,255,255,.06);margin:4px 8px';dd.appendChild(sep);` : "";
          return `${sep}
    var mi=mk('div','${AG_PREFIX}menu');
    ${c.icon ? `mi.appendChild(mk('span','',${JSON.stringify(c.icon)}));` : ""}
    mi.appendChild(document.createTextNode(${JSON.stringify(c.label)}));
    mi.addEventListener('click',function(){${toastCall}});
    dd.appendChild(mi);`;
        });
        return `
function integrateDropdown(){
  var dds=document.querySelectorAll('.rounded-bg.py-1,.rounded-lg.py-1');
  dds.forEach(function(dd){
    if(dd.getAttribute('${AG_DATA_ATTR}m'))return;
    var items=dd.querySelectorAll(${JSON.stringify(Selectors.DROPDOWN_ITEM)});
    var markers=${markers};
    var found=false;
    items.forEach(function(it){markers.forEach(function(m){if((it.textContent||'').includes(m))found=true;});});
    if(!found)return;
    dd.setAttribute('${AG_DATA_ATTR}m','1');
    ${items.join("\n    ")}
  });
}
`;
      }
      _genTitle(configs) {
        const cfg = configs[0];
        const toastCall = this._genToastCall(cfg.toast);
        const event = cfg.interaction || "dblclick";
        return `
function integrateTitle(){
  var p=document.querySelector(${JSON.stringify(Selectors.PANEL)});if(!p)return;
  var el=p.querySelector(${JSON.stringify(Selectors.TITLE)});
  if(!el||el.getAttribute('${AG_DATA_ATTR}t'))return;
  el.setAttribute('${AG_DATA_ATTR}t','1');
  el.style.cursor='pointer';
  el.classList.add('${AG_PREFIX}title-wrap');
  el.style.position='relative';
  ${cfg.hint ? `var hint=mk('span','${AG_PREFIX}title-hint',${JSON.stringify(cfg.hint)});el.appendChild(hint);` : ""}
  el.addEventListener(${JSON.stringify(event)},function(){
    var title=el.textContent?.replace(${JSON.stringify(cfg.hint || "")},'')?.trim()||'';
    ${toastCall || `toast('Chat',null,[['title:',title],['chars:',''+title.length]]);`}
  });
}
`;
      }
      // ─── Main loop ────────────────────────────────────────────────────
      _mainLoop(points) {
        const fnMap = {
          [
            "topBar"
            /* TOP_BAR */
          ]: "integrateTopBar",
          [
            "topRight"
            /* TOP_RIGHT */
          ]: "integrateTopRight",
          [
            "inputArea"
            /* INPUT_AREA */
          ]: "integrateInputArea",
          [
            "bottomIcons"
            /* BOTTOM_ICONS */
          ]: "integrateBottomIcons",
          [
            "turnMeta"
            /* TURN_METADATA */
          ]: "integrateTurnMeta",
          [
            "userBadge"
            /* USER_BADGE */
          ]: "integrateUserBadges",
          [
            "botAction"
            /* BOT_ACTION */
          ]: "integrateBotAction",
          [
            "dropdownMenu"
            /* DROPDOWN_MENU */
          ]: "integrateDropdown",
          [
            "chatTitle"
            /* CHAT_TITLE */
          ]: "integrateTitle"
        };
        const calls = points.map((p) => `    ${fnMap[p]} (); `).join("\n");
        return `
    function fullScan() {
${calls}
    }
    var _timer = 0;
    function debounced() { clearTimeout(_timer); _timer = setTimeout(function () { requestAnimationFrame(fullScan); }, 400); }
    function start() {
      var p = document.querySelector(${JSON.stringify(Selectors.PANEL)});
      if (!p) { setTimeout(start, 1000); return; }
      fullScan();
      new MutationObserver(debounced).observe(p, { childList: true, subtree: true });
      setInterval(fullScan, 8000);
      console.log('[AG SDK] Active \\u2014 ${points.length} integration points');
    }
    `;
      }
    };
    var PREFIX = "ag-sdk";
    var MARKER_START = "<!-- AG SDK -->";
    var MARKER_END = "<!-- /AG SDK -->";
    var MANIFEST_FILE = `${PREFIX}-manifest.json`;
    var LOADER_FILE = `${PREFIX}-loader.js`;
    var WorkbenchPatcher = class {
      /**
       * @param namespace - Unique slug for this extension (e.g. 'kanezal-better-antigravity').
       */
      constructor(namespace = "default") {
        const appData = process.env.LOCALAPPDATA || "";
        this._workbenchDir = path3__namespace.join(
          appData,
          "Programs",
          "Antigravity",
          "resources",
          "app",
          "out",
          "vs",
          "code",
          "electron-browser",
          "workbench"
        );
        this._workbenchHtml = path3__namespace.join(this._workbenchDir, "workbench.html");
        this._manifestPath = path3__namespace.join(this._workbenchDir, MANIFEST_FILE);
        this._loaderPath = path3__namespace.join(this._workbenchDir, LOADER_FILE);
        this._slug = namespace.replace(/[^a-zA-Z0-9-]/g, "-");
        this._scriptPath = path3__namespace.join(this._workbenchDir, `${PREFIX}-${this._slug}.js`);
        this._heartbeatPath = path3__namespace.join(this._workbenchDir, `${PREFIX}-${this._slug}-heartbeat`);
      }
      // ─── Queries ──────────────────────────────────────────────────────
      /** Check if workbench.html exists and is accessible. */
      isAvailable() {
        return fs3__namespace.existsSync(this._workbenchHtml);
      }
      /** Check if the shared SDK loader is installed in workbench.html. */
      isLoaderInstalled() {
        if (!this.isAvailable())
          return false;
        try {
          return fs3__namespace.readFileSync(this._workbenchHtml, "utf8").includes(MARKER_START);
        } catch {
          return false;
        }
      }
      /** Check if THIS extension is registered in the manifest. */
      isInstalled() {
        const manifest = this._readManifest();
        return manifest.extensions.includes(this._slug);
      }
      /** Get all registered extension namespaces from manifest. */
      getRegisteredExtensions() {
        return this._readManifest().extensions;
      }
      // ─── Install ──────────────────────────────────────────────────────
      /**
       * Install this extension's script into the SDK framework.
       *
       * - If loader is not in workbench.html → patch HTML (first extension)
       * - Writes/updates this extension's script file
       * - Registers in manifest
       * - Updates the loader script
       *
       * @param scriptContent — Generated JS for this extension
       */
      install(scriptContent) {
        if (!this.isAvailable()) {
          throw new Error(`Workbench not found at: ${this._workbenchDir}`);
        }
        this._cleanupLegacy();
        if (!this.isLoaderInstalled()) {
          this._patchHtml();
        }
        fs3__namespace.writeFileSync(this._scriptPath, scriptContent, "utf8");
        const manifest = this._readManifest();
        if (!manifest.extensions.includes(this._slug)) {
          manifest.extensions.push(this._slug);
        }
        this._writeManifest(manifest);
        this._writeLoader();
        const titlesPath = path3__namespace.join(this._workbenchDir, `${PREFIX}-titles-${this._slug}.json`);
        if (!fs3__namespace.existsSync(titlesPath)) {
          fs3__namespace.writeFileSync(titlesPath, "{}", "utf8");
        }
      }
      // ─── Uninstall ────────────────────────────────────────────────────
      /**
       * Uninstall this extension from the SDK framework.
       *
       * - Removes from manifest
       * - Deletes this extension's script + heartbeat + titles
       * - If last extension → removes loader from workbench.html + cleans up
       */
      uninstall() {
        if (!this.isAvailable())
          return;
        const manifest = this._readManifest();
        manifest.extensions = manifest.extensions.filter((ns) => ns !== this._slug);
        this._tryDelete(this._scriptPath);
        this._tryDelete(this._heartbeatPath);
        this._tryDelete(path3__namespace.join(this._workbenchDir, `${PREFIX}-titles-${this._slug}.json`));
        if (manifest.extensions.length === 0) {
          this._unpatchHtml();
          this._tryDelete(this._loaderPath);
          this._tryDelete(this._manifestPath);
        } else {
          this._writeManifest(manifest);
          this._writeLoader();
        }
      }
      // ─── Heartbeat ────────────────────────────────────────────────────
      /** Write/refresh heartbeat marker. */
      writeHeartbeat() {
        try {
          fs3__namespace.writeFileSync(this._heartbeatPath, Date.now().toString(), "utf8");
        } catch {
        }
      }
      /** Remove heartbeat marker. */
      removeHeartbeat() {
        this._tryDelete(this._heartbeatPath);
      }
      // ─── Accessors ────────────────────────────────────────────────────
      getWorkbenchDir() {
        return this._workbenchDir;
      }
      getScriptPath() {
        return this._scriptPath;
      }
      getHeartbeatPath() {
        return this._heartbeatPath;
      }
      // ─── Private: HTML patching ───────────────────────────────────────
      /** Add the shared loader <script> to workbench.html (ONE time). */
      _patchHtml() {
        let html = fs3__namespace.readFileSync(this._workbenchHtml, "utf8");
        const loaderTag = [
          MARKER_START,
          `<script src="./${LOADER_FILE}"></script>`,
          MARKER_END
        ].join("\n");
        html = html.replace("</html>", `${loaderTag}
</html>`);
        fs3__namespace.writeFileSync(this._workbenchHtml, html, "utf8");
      }
      /** Remove the shared loader <script> from workbench.html. */
      _unpatchHtml() {
        try {
          let html = fs3__namespace.readFileSync(this._workbenchHtml, "utf8");
          const regex = new RegExp(
            `\\n?${escapeRegex(MARKER_START)}[\\s\\S]*?${escapeRegex(MARKER_END)}\\n?`,
            "g"
          );
          html = html.replace(regex, "");
          fs3__namespace.writeFileSync(this._workbenchHtml, html, "utf8");
        } catch {
        }
      }
      // ─── Private: Manifest ────────────────────────────────────────────
      _readManifest() {
        try {
          if (fs3__namespace.existsSync(this._manifestPath)) {
            const data = JSON.parse(fs3__namespace.readFileSync(this._manifestPath, "utf8"));
            return { extensions: Array.isArray(data.extensions) ? data.extensions : [] };
          }
        } catch {
        }
        return { extensions: [] };
      }
      _writeManifest(manifest) {
        fs3__namespace.writeFileSync(this._manifestPath, JSON.stringify(manifest, null, 2), "utf8");
      }
      // ─── Private: Loader ──────────────────────────────────────────────
      /**
       * Generate and write the shared loader script.
       *
       * The loader runs in the renderer. On startup it:
       * 1. Fetches the manifest to get the list of extensions
       * 2. For each extension, checks its heartbeat (skip if stale >48h)
       * 3. Creates <script> tags to load each active extension's script
       */
      _writeLoader() {
        const manifest = this._readManifest();
        const scriptEntries = manifest.extensions.map((ns) => ({
          ns,
          script: `${PREFIX}-${ns}.js`,
          heartbeat: `${PREFIX}-${ns}-heartbeat`
        }));
        const loaderCode = `(function agSDKLoader() {
'use strict';
if (window.__agSDKLoader) return;
window.__agSDKLoader = true;

var MAX_AGE = 172800000; // 48h
var entries = ${JSON.stringify(scriptEntries)};

function checkHeartbeat(hbFile, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './' + hbFile + '?t=' + Date.now(), true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var ts = parseInt(xhr.responseText, 10);
            callback(!isNaN(ts) && (Date.now() - ts) < MAX_AGE);
        } else {
            callback(false);
        }
    };
    xhr.onerror = function() { callback(false); };
    xhr.send();
}

function loadScript(src) {
    var s = document.createElement('script');
    s.src = './' + src;
    s.async = false;
    document.head.appendChild(s);
}

entries.forEach(function(entry) {
    checkHeartbeat(entry.heartbeat, function(alive) {
        if (alive) {
            loadScript(entry.script);
            console.log('[AG-SDK] Loaded: ' + entry.ns);
        } else {
            console.log('[AG-SDK] Skipped (stale heartbeat): ' + entry.ns);
        }
    });
});

console.log('[AG-SDK] Loader initialized (' + entries.length + ' extension(s))');
})();`;
        fs3__namespace.writeFileSync(this._loaderPath, loaderCode, "utf8");
      }
      // ─── Private: Cleanup ─────────────────────────────────────────────
      /**
       * Clean up legacy per-namespace HTML blocks and old files
       * from previous SDK versions that used per-extension HTML patching.
       */
      _cleanupLegacy() {
        try {
          const html = fs3__namespace.readFileSync(this._workbenchHtml, "utf8");
          const cleaned = html.replace(
            /\n?<!-- AG SDK \[[^\]]+\] -->[\s\S]*?<!-- \/AG SDK \[[^\]]+\] -->\n?/g,
            ""
          );
          if (cleaned !== html) {
            fs3__namespace.writeFileSync(this._workbenchHtml, cleaned, "utf8");
          }
        } catch {
        }
        const legacyFiles = [
          "ag-sdk-integrate.js",
          "ag-sdk-heartbeat",
          "ag-sdk-titles.json",
          "ag-sdk-titles-undefined.json",
          "ag-sdk-titles-default.json"
        ];
        for (const name of legacyFiles) {
          this._tryDelete(path3__namespace.join(this._workbenchDir, name));
        }
        try {
          const html = fs3__namespace.readFileSync(this._workbenchHtml, "utf8");
          const cleaned = html.replace(/<script src="\.\/ag-sdk-integrate\.js"><\/script>\n?/g, "").replace(/<!-- X-Ray SDK Integration -->\n?<script[^>]*ag-sdk-integrate[^>]*><\/script>\n?<!-- \/X-Ray SDK Integration -->\n?/g, "");
          if (cleaned !== html) {
            fs3__namespace.writeFileSync(this._workbenchHtml, cleaned, "utf8");
          }
        } catch {
        }
      }
      _tryDelete(filePath) {
        try {
          if (fs3__namespace.existsSync(filePath))
            fs3__namespace.unlinkSync(filePath);
        } catch {
        }
      }
    };
    function escapeRegex(str2) {
      return str2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    var log6 = new Logger("IntegrityManager");
    var REGISTRY_FILENAME = ".ag-sdk-integrity.json";
    var IntegrityManager = class {
      /**
       * @param workbenchDir — Absolute path to the workbench directory
       *   (e.g. `%LOCALAPPDATA%/Programs/Antigravity/resources/app/out/vs/code/electron-browser/workbench/`)
       * @param namespace — Unique slug for this extension (e.g. 'kanezal-better-antigravity')
       */
      constructor(workbenchDir, namespace) {
        this._namespace = namespace;
        this._registryPath = path3__namespace.join(workbenchDir, REGISTRY_FILENAME);
        const appDir = path3__namespace.resolve(workbenchDir, "..", "..", "..", "..", "..");
        this._productJsonPath = path3__namespace.join(appDir, "product.json");
        this._appOutDir = path3__namespace.join(appDir, "out");
      }
      /**
       * Suppress the integrity check by updating ALL mismatched hashes in product.json.
       *
       * Scans every file listed in product.json checksums, recomputes SHA256 for each,
       * and updates any that have changed. This handles not just workbench.html but also
       * workbench.desktop.main.js (auto-run fix), jetskiAgent files, etc.
       *
       * Call this after any file patching. Safe to call multiple times.
       */
      suppressCheck() {
        try {
          if (!fs3__namespace.existsSync(this._productJsonPath)) {
            log6.warn(`product.json not found at ${this._productJsonPath}`);
            return;
          }
          const productJson = JSON.parse(fs3__namespace.readFileSync(this._productJsonPath, "utf8"));
          if (!productJson.checksums) {
            log6.debug("No checksums in product.json \u2014 nothing to update");
            return;
          }
          const registry = this._readRegistry();
          if (!registry.namespaces.includes(this._namespace)) {
            registry.namespaces.push(this._namespace);
          }
          let updatedCount = 0;
          for (const [relPath, storedHash] of Object.entries(productJson.checksums)) {
            const filePath = path3__namespace.join(this._appOutDir, relPath);
            let actualHash;
            try {
              const content = fs3__namespace.readFileSync(filePath);
              actualHash = this._computeHash(content);
            } catch {
              continue;
            }
            if (actualHash !== storedHash) {
              if (!(relPath in registry.originalHashes)) {
                registry.originalHashes[relPath] = storedHash;
                log6.debug(`Saved original hash for ${relPath}`);
              }
              productJson.checksums[relPath] = actualHash;
              updatedCount++;
              log6.info(`Updated hash: ${relPath} (${storedHash.substring(0, 8)}... -> ${actualHash.substring(0, 8)}...)`);
            }
          }
          this._writeRegistry(registry);
          if (updatedCount > 0) {
            fs3__namespace.writeFileSync(this._productJsonPath, JSON.stringify(productJson, null, "	"), "utf8");
            log6.info(`Updated ${updatedCount} hash(es) in product.json`);
          } else {
            log6.debug("All hashes already match \u2014 no update needed");
          }
        } catch (err) {
          log6.error("Failed to suppress integrity check", err);
        }
      }
      /**
       * Release the integrity check suppression.
       *
       * Call this when uninstalling the integration. If no other SDK namespaces
       * remain active, restores all original hashes in product.json.
       */
      releaseCheck() {
        try {
          const registry = this._readRegistry();
          registry.namespaces = registry.namespaces.filter((ns) => ns !== this._namespace);
          this._writeRegistry(registry);
          if (registry.namespaces.length > 0) {
            log6.debug(`${registry.namespaces.length} other namespace(s) still active, recomputing hashes`);
            this.suppressCheck();
            return;
          }
          if (Object.keys(registry.originalHashes).length > 0) {
            this._restoreOriginalHashes(registry.originalHashes);
            log6.info(`Restored ${Object.keys(registry.originalHashes).length} original hash(es)`);
          }
          this._deleteRegistry();
        } catch (err) {
          log6.error("Failed to release integrity check", err);
        }
      }
      /**
       * Re-apply integrity suppression after auto-repair.
       *
       * Call this after auto-repair has re-patched files
       * (e.g. after an AG update that overwrote workbench files).
       */
      repair() {
        log6.info("Repairing integrity check suppression...");
        this.suppressCheck();
      }
      // ── Private helpers ─────────────────────────────────────────────
      /**
       * Compute SHA256 hash matching Antigravity's ChecksumService format:
       * base64 WITHOUT trailing '=' padding.
       */
      _computeHash(content) {
        return crypto__namespace.createHash("sha256").update(content).digest("base64").replace(/=+$/, "");
      }
      /**
       * Restore all original hashes in product.json.
       */
      _restoreOriginalHashes(originalHashes) {
        if (!fs3__namespace.existsSync(this._productJsonPath))
          return;
        const productJson = JSON.parse(fs3__namespace.readFileSync(this._productJsonPath, "utf8"));
        if (!productJson.checksums)
          return;
        for (const [relPath, hash] of Object.entries(originalHashes)) {
          if (relPath in productJson.checksums) {
            productJson.checksums[relPath] = hash;
          }
        }
        fs3__namespace.writeFileSync(this._productJsonPath, JSON.stringify(productJson, null, "	"), "utf8");
      }
      /**
       * Read the coordination registry from disk.
       */
      _readRegistry() {
        try {
          if (fs3__namespace.existsSync(this._registryPath)) {
            const raw = fs3__namespace.readFileSync(this._registryPath, "utf8");
            const data = JSON.parse(raw);
            let originalHashes = {};
            if (data.originalHashes && typeof data.originalHashes === "object") {
              originalHashes = data.originalHashes;
            } else if (typeof data.originalHash === "string") {
              originalHashes["vs/code/electron-browser/workbench/workbench.html"] = data.originalHash;
            }
            return {
              namespaces: Array.isArray(data.namespaces) ? data.namespaces : [],
              originalHashes
            };
          }
        } catch {
        }
        return { namespaces: [], originalHashes: {} };
      }
      /**
       * Write the coordination registry to disk.
       */
      _writeRegistry(registry) {
        try {
          fs3__namespace.writeFileSync(this._registryPath, JSON.stringify(registry, null, 2), "utf8");
        } catch (err) {
          log6.error("Failed to write integrity registry", err);
        }
      }
      /**
       * Delete the coordination registry file.
       */
      _deleteRegistry() {
        try {
          if (fs3__namespace.existsSync(this._registryPath)) {
            fs3__namespace.unlinkSync(this._registryPath);
          }
        } catch {
        }
      }
    };
    var TITLES_STORAGE_PREFIX = "ag-sdk-titles";
    var TITLES_DATA_PREFIX = "ag-sdk-titles";
    function generateTitleProxyCode(namespace = "default") {
      const slug = namespace.replace(/[^a-zA-Z0-9-]/g, "-");
      const storageKey = `${TITLES_STORAGE_PREFIX}-${slug}`;
      const dataFile = `./${TITLES_DATA_PREFIX}-${slug}.json`;
      return `
// \u2500\u2500 AG SDK: Title Proxy \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Intercepts summaries provider to inject custom chat titles.
// Uses structural matching (obfuscation-safe).

(function initTitleProxy(){
  var PANEL_SEL='.antigravity-agent-side-panel';
  var TITLE_SEL='.flex.min-w-0.items-center.overflow-hidden';
  var STORAGE_KEY='${storageKey}';
  var DATA_FILE='${dataFile}';
  
  var _provider=null;
  var _origGetState=null;
  var _listeners=[];
  var _customTitles={};
  var _searchTime=0;

  // \u2500\u2500 Load / Save \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  function loadTitles(){
    // Step 1: Load from localStorage (sync, fast)
    try{_customTitles=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');}catch(e){_customTitles={};}
    // Step 2: Merge extension-host titles from data file (async fetch)
    fetch(DATA_FILE).then(function(r){
      if(!r.ok)return;
      return r.text();
    }).then(function(text){
      if(!text)return;
      try{
        var extTitles=JSON.parse(text);
        if(extTitles&&typeof extTitles==='object'){
          for(var k in extTitles){_customTitles[k]=extTitles[k];}
          saveTitles();
          notifyListeners();
        }
      }catch(e){}
    }).catch(function(){});
  }
  
  function saveTitles(){
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(_customTitles));}catch(e){}
  }
  
  // \u2500\u2500 Notify \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  function notifyListeners(){
    for(var i=0;i<_listeners.length;i++){try{_listeners[i]();}catch(e){}}
  }
  
  // \u2500\u2500 Provider Wrapping \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  function wrapProvider(provider){
    if(provider.__agSDKWrapped)return;
    provider.__agSDKWrapped=true;
    _provider=provider;
    var origFn=provider.getState;
    _origGetState=origFn;
    
    // Wrap getState to inject custom titles
    provider.getState=function(){
      var state=origFn.call(provider);
      if(!state||!state.summaries)return state;
      var hasOverrides=false;
      for(var cid in _customTitles){if(state.summaries[cid]){hasOverrides=true;break;}}
      if(!hasOverrides)return state;
      var ns={};
      for(var k in state.summaries)ns[k]=state.summaries[k];
      for(var cid in _customTitles){
        if(ns[cid]){
          var copy={};for(var p in ns[cid])copy[p]=ns[cid][p];
          copy.summary=_customTitles[cid];
          ns[cid]=copy;
        }
      }
      var newState={};for(var sk in state)newState[sk]=state[sk];
      newState.summaries=ns;
      return newState;
    };
    
    // Intercept onDidChange to capture listeners
    var origOnDidChange=provider.onDidChange;
    provider.onDidChange=function(callback){
      _listeners.push(callback);
      var origDispose=origOnDidChange.call(this,callback);
      return{dispose:function(){
        var idx=_listeners.indexOf(callback);
        if(idx>=0)_listeners.splice(idx,1);
        origDispose.dispose();
      }};
    };
    
    console.log('[AG SDK] Title proxy active, custom titles:', Object.keys(_customTitles).length);
    
    // Force re-render so custom titles appear immediately
    // (without waiting for next native summaries update)
    setTimeout(function(){notifyListeners();},50);
  }
  
  // \u2500\u2500 VNode BFS Walk \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  function findProvider(){
    if(_provider)return;
    var panel=document.querySelector(PANEL_SEL);
    if(!panel||!panel.__k)return;
    // Throttle only AFTER confirming panel exists (don't block retries when panel isn't mounted)
    var now=Date.now();
    if(_searchTime&&now-_searchTime<30000)return;
    _searchTime=now;
    var queue=[panel.__k],visited=0;
    while(queue.length>0&&visited<3000){
      var node=queue.shift();
      if(!node)continue;
      if(Array.isArray(node)){
        for(var ai=0;ai<node.length;ai++){if(node[ai])queue.push(node[ai]);}
        continue;
      }
      visited++;
      var comp=node.__c;
      if(comp&&comp.context&&typeof comp.context==='object'){
        for(var key in comp.context){
          try{
            var ctx=comp.context[key];
            if(!ctx||!ctx.props||!ctx.props.value)continue;
            var val=ctx.props.value;
            // Structural match: {provider: {getState() -> {summaries}}}
            if(val.provider&&typeof val.provider.getState==='function'){
              var ts=val.provider.getState();
              if(ts&&ts.summaries){wrapProvider(val.provider);return;}
            }
            // Structural match: {trajectorySummariesProvider: {getState() -> {summaries}}}
            if(val.trajectorySummariesProvider&&typeof val.trajectorySummariesProvider.getState==='function'){
              var ts2=val.trajectorySummariesProvider.getState();
              if(ts2&&ts2.summaries){wrapProvider(val.trajectorySummariesProvider);return;}
            }
          }catch(e){}
        }
      }
      // Direct props match
      if(comp&&comp.props&&comp.props.trajectorySummariesProvider){
        var tsp=comp.props.trajectorySummariesProvider;
        if(typeof tsp.getState==='function'){
          try{var ts3=tsp.getState();
            if(ts3&&ts3.summaries){wrapProvider(tsp);return;}
          }catch(e){}
        }
      }
      if(node.__k){
        if(Array.isArray(node.__k)){for(var ki=0;ki<node.__k.length;ki++){if(node.__k[ki])queue.push(node.__k[ki]);}}
        else{queue.push(node.__k);}
      }
    }
  }
  
  // \u2500\u2500 CascadeId Resolution \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  function findCascadeIdByTitle(text){
    if(!_origGetState)return '';
    try{
      var state=_origGetState.call(_provider);
      if(!state||!state.summaries)return '';
      // Reverse lookup custom titles first
      for(var cid in _customTitles){if(_customTitles[cid]===text)return cid;}
      // Match original summaries
      var bestId='',bestTime=0;
      for(var cid in state.summaries){
        var e=state.summaries[cid];
        if(e&&e.summary===text){
          var t=0;try{t=new Date(e.lastModifiedTime).getTime();}catch(e){}
          if(!bestId||t>bestTime){bestId=cid;bestTime=t;}
        }
      }
      return bestId;
    }catch(e){return '';}
  }
  
  // \u2500\u2500 Public API \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  window.__agSDKTitles={
    rename:function(cascadeId,title){
      if(!cascadeId||!title)return false;
      _customTitles[cascadeId]=title;
      saveTitles();
      notifyListeners();
      return true;
    },
    renameByCurrentTitle:function(currentTitle,newTitle){
      var cid=findCascadeIdByTitle(currentTitle);
      if(!cid)return false;
      return this.rename(cid,newTitle);
    },
    remove:function(cascadeId){
      delete _customTitles[cascadeId];
      saveTitles();
      notifyListeners();
    },
    getTitle:function(cascadeId){return _customTitles[cascadeId]||null;},
    getAll:function(){var copy={};for(var k in _customTitles)copy[k]=_customTitles[k];return copy;},
    getActiveCascadeId:function(){
      var panel=document.querySelector(PANEL_SEL);
      if(!panel)return '';
      var titleEl=panel.querySelector(TITLE_SEL);
      if(!titleEl)return '';
      var text='';
      function findText(el){
        for(var i=0;i<el.childNodes.length;i++){
          var n=el.childNodes[i];
          if(n.nodeType===3&&n.textContent.trim().length>0)return n.textContent.trim();
          if(n.nodeType===1){var found=findText(n);if(found)return found;}
        }
        return '';
      }
      text=findText(titleEl);
      return text?findCascadeIdByTitle(text):'';
    },
    isReady:function(){return !!_provider;},
    reload:function(){loadTitles();notifyListeners();}
  };
  
  // \u2500\u2500 Init \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  
  loadTitles();
  
  function poll(){
    findProvider();
  }
  
  // Poll until provider found, then every 30s for recovery
  var pollTimer=setInterval(function(){poll();},2000);
  
  // Initial attempt after DOM is ready
  if(document.querySelector(PANEL_SEL)){
    poll();
  }

})();
`;
    }
    function getTitlesDataFile(namespace = "default") {
      const slug = namespace.replace(/[^a-zA-Z0-9-]/g, "-");
      return `${TITLES_DATA_PREFIX}-${slug}.json`;
    }
    var log7 = new Logger("TitleManager");
    var TitleManager = class {
      constructor() {
        this._titles = {};
        this._dataPath = "";
        this._initialized = false;
      }
      /**
       * Initialize with the workbench directory path.
       *
       * @param workbenchDir - Path to workbench directory where data file is stored
       * @param namespace - Extension namespace for file isolation
       */
      initialize(workbenchDir, namespace = "default") {
        this._dataPath = path3__namespace.join(workbenchDir, getTitlesDataFile(namespace));
        this._load();
        this._initialized = true;
        log7.info(`Initialized, ${Object.keys(this._titles).length} custom titles loaded`);
      }
      /**
       * Check if the manager is initialized.
       */
      get isInitialized() {
        return this._initialized;
      }
      /**
       * Set a custom title for a conversation.
       *
       * The title will be displayed in the Agent View title bar
       * and conversation list instead of the auto-generated summary.
       *
       * @param cascadeId - The conversation's cascade ID (UUID)
       * @param title - The custom title to display
       *
       * @example
       * ```typescript
       * // Rename the active conversation
       * const id = sdk.titles.getActiveCascadeId();
       * sdk.titles.rename(id, 'Project Alpha Discussion');
       * ```
       */
      rename(cascadeId, title) {
        if (!cascadeId) {
          log7.warn("rename: cascadeId is required");
          return;
        }
        if (!title || !title.trim()) {
          log7.warn("rename: title cannot be empty");
          return;
        }
        this._titles[cascadeId] = title.trim();
        this._save();
        log7.debug(`Renamed ${cascadeId.substring(0, 8)}... -> "${title.trim()}"`);
      }
      /**
       * Get the custom title for a conversation.
       *
       * @param cascadeId - The conversation's cascade ID
       * @returns The custom title, or undefined if no custom title is set
       */
      getTitle(cascadeId) {
        return this._titles[cascadeId];
      }
      /**
       * Get all custom titles.
       *
       * @returns A copy of the titles map (cascadeId -> title)
       */
      getAll() {
        return { ...this._titles };
      }
      /**
       * Remove a custom title, reverting to the auto-generated summary.
       *
       * @param cascadeId - The conversation's cascade ID
       */
      remove(cascadeId) {
        if (this._titles[cascadeId]) {
          delete this._titles[cascadeId];
          this._save();
          log7.debug(`Removed title for ${cascadeId.substring(0, 8)}...`);
        }
      }
      /**
       * Remove all custom titles.
       */
      clear() {
        this._titles = {};
        this._save();
        log7.debug("Cleared all custom titles");
      }
      /**
       * Get the number of custom titles.
       */
      get count() {
        return Object.keys(this._titles).length;
      }
      /** Load titles from the data file */
      _load() {
        try {
          if (fs3__namespace.existsSync(this._dataPath)) {
            const content = fs3__namespace.readFileSync(this._dataPath, "utf8");
            this._titles = JSON.parse(content) || {};
          }
        } catch (err) {
          log7.warn(`Failed to load titles: ${err}`);
          this._titles = {};
        }
      }
      /** Save titles to the data file */
      _save() {
        if (!this._dataPath)
          return;
        try {
          fs3__namespace.writeFileSync(this._dataPath, JSON.stringify(this._titles, null, 2), "utf8");
        } catch (err) {
          log7.warn(`Failed to save titles: ${err}`);
        }
      }
      dispose() {
      }
    };
    var log8 = new Logger("IntegrationManager");
    var IntegrationManager = class {
      /**
       * @param namespace - Unique slug that isolates this extension's files.
       *   Derived automatically from `context.extension.id` when using AntigravitySDK.
       *   Multiple SDK-based extensions can coexist without conflicts.
       */
      constructor(namespace = "default") {
        this._configs = /* @__PURE__ */ new Map();
        this._generator = new ScriptGenerator();
        this._titles = new TitleManager();
        this._watcher = null;
        this._autoRepairDebounce = null;
        this._titleProxyEnabled = false;
        this._namespace = namespace;
        this._patcher = new WorkbenchPatcher(namespace);
        this._integrity = new IntegrityManager(
          this._patcher.getWorkbenchDir(),
          namespace
        );
      }
      // ─── Registration ──────────────────────────────────────────────────
      /**
       * Register a single integration point.
       *
       * @throws If an integration with the same ID already exists
       */
      register(config) {
        if (this._configs.has(config.id)) {
          throw new Error(`Integration '${config.id}' is already registered`);
        }
        this._configs.set(config.id, config);
        log8.debug(`Registered integration: ${config.id} (${config.point})`);
      }
      /**
       * Register multiple integration points at once.
       */
      registerMany(configs) {
        for (const c of configs) {
          this.register(c);
        }
      }
      /**
       * Remove a registered integration by ID.
       */
      unregister(id) {
        this._configs.delete(id);
        log8.debug(`Unregistered integration: ${id}`);
      }
      /**
       * Get all registered integrations.
       */
      getRegistered() {
        return Array.from(this._configs.values());
      }
      // ─── Convenience methods (fluent API) ──────────────────────────────
      /**
       * Add a button to the top bar (near +, refresh icons).
       */
      addTopBarButton(id, icon, tooltip, toast) {
        this.register({
          id,
          point: "topBar",
          icon,
          tooltip,
          toast
        });
        return this;
      }
      /**
       * Add a button to the top-right corner (before X).
       */
      addTopRightButton(id, icon, tooltip, toast) {
        this.register({
          id,
          point: "topRight",
          icon,
          tooltip,
          toast
        });
        return this;
      }
      /**
       * Add a button next to the send/voice buttons.
       */
      addInputButton(id, icon, tooltip, toast) {
        this.register({
          id,
          point: "inputArea",
          icon,
          tooltip,
          toast
        });
        return this;
      }
      /**
       * Add an icon to the bottom icon row (file, terminal, etc.).
       */
      addBottomIcon(id, icon, tooltip, toast) {
        this.register({
          id,
          point: "bottomIcons",
          icon,
          tooltip,
          toast
        });
        return this;
      }
      /**
       * Enable per-turn metadata display.
       */
      addTurnMetadata(id, metrics, clickable = true) {
        this.register({
          id,
          point: "turnMeta",
          metrics,
          clickable
        });
        return this;
      }
      /**
       * Add character count badges to user messages.
       */
      addUserBadges(id, display = "charCount") {
        this.register({
          id,
          point: "userBadge",
          display
        });
        return this;
      }
      /**
       * Add an action button next to Good/Bad feedback.
       */
      addBotAction(id, icon, label, toast) {
        this.register({
          id,
          point: "botAction",
          icon,
          label,
          toast
        });
        return this;
      }
      /**
       * Add item(s) to the 3-dot dropdown menu.
       */
      addDropdownItem(id, label, icon, toast, separator = false) {
        this.register({
          id,
          point: "dropdownMenu",
          label,
          icon,
          toast,
          separator
        });
        return this;
      }
      /**
       * Enable chat title interaction.
       */
      addTitleInteraction(id, interaction = "dblclick", hint, toast) {
        this.register({
          id,
          point: "chatTitle",
          interaction,
          hint,
          toast
        });
        return this;
      }
      // ─── Title Proxy ─────────────────────────────────────────────────
      /**
       * Enable the title proxy feature.
       *
       * Adds renderer-side code that intercepts the summaries provider
       * and injects custom chat titles. Uses structural matching to find
       * the provider (obfuscation-safe).
       *
       * After enabling, call `install()` or `updateScript()` to apply.
       *
       * @example
       * ```typescript
       * const sdk = new AntigravitySDK(context);
       * await sdk.initialize();
       *
       * sdk.integration.enableTitleProxy();
       * await sdk.integration.install();
       *
       * // Now rename from extension host:
       * sdk.integration.titles.rename(cascadeId, 'My Custom Title');
       * ```
       */
      enableTitleProxy() {
        this._titleProxyEnabled = true;
        if (this._patcher.isAvailable()) {
          this._titles.initialize(this._patcher.getWorkbenchDir(), this._namespace);
        }
        log8.info("Title proxy enabled");
        return this;
      }
      /**
       * Access the title manager for programmatic title control.
       *
       * Requires `enableTitleProxy()` to be called first.
       *
       * @example
       * ```typescript
       * sdk.integration.titles.rename(cascadeId, 'My Title');
       * sdk.integration.titles.remove(cascadeId);
       * const all = sdk.integration.titles.getAll();
       * ```
       */
      get titles() {
        if (!this._titleProxyEnabled) {
          log8.warn("Title proxy not enabled. Call enableTitleProxy() first.");
        }
        return this._titles;
      }
      // ─── Build & Install ───────────────────────────────────────────────
      /**
       * Generate the integration script from all registered configs.
       *
       * If title proxy is enabled, appends the title proxy renderer code.
       *
       * @returns Complete JavaScript code as a string
       */
      build() {
        const configs = Array.from(this._configs.values());
        if (configs.length === 0 && !this._titleProxyEnabled) {
          throw new Error("No integration points registered and title proxy not enabled");
        }
        log8.debug(`build: ${configs.length} configs, titleProxy=${this._titleProxyEnabled}, ns=${this._namespace}`);
        let script = "";
        if (configs.length > 0) {
          log8.info(`Building script for ${configs.length} integration(s): ${configs.map((c) => c.id).join(", ")}`);
          script = this._generator.generate(configs, this._namespace);
          log8.debug(`build: generated ${script.length} bytes`);
        }
        if (this._titleProxyEnabled) {
          log8.info("Appending title proxy code");
          script += "\n" + generateTitleProxyCode(this._namespace);
        }
        return script;
      }
      /**
       * Install this extension's script into the shared SDK framework.
       *
       * For seamless hot-reload behavior, use `installSeamless()` instead.
       *
       * The first extension to call install() patches workbench.html with
       * the shared loader. Subsequent extensions just register in the manifest.
       *
       * @returns true if the script content actually changed on disk
       */
      async install() {
        if (!this._patcher.isAvailable()) {
          throw new Error("Antigravity workbench not found. Is Antigravity installed?");
        }
        const script = this.build();
        const scriptPath = this._patcher.getScriptPath();
        let oldContent = "";
        try {
          if (fs3__namespace.existsSync(scriptPath)) {
            oldContent = fs3__namespace.readFileSync(scriptPath, "utf8");
          }
        } catch {
        }
        log8.debug(`install: writing script to ${scriptPath}`);
        this._patcher.install(script);
        log8.debug("install: suppressing integrity check");
        this._integrity.suppressCheck();
        this._patcher.writeHeartbeat();
        const changed = oldContent !== script;
        log8.info(
          `Installed integration (${this._configs.size} points, titleProxy: ${this._titleProxyEnabled}) -> ${scriptPath} [${changed ? "CHANGED" : "unchanged"}]`
        );
        log8.debug(`install: registered extensions = ${this._patcher.getRegisteredExtensions().join(", ") || "none"}`);
        return changed;
      }
      /**
       * Seamless install — handles everything automatically.
       *
       * This is the **recommended** install method for extension developers.
       * It handles the entire lifecycle:
       *
       * 1. **First install:** Writes script + patches HTML + prompts user to reload
       * 2. **Update:** Compares content, if changed → auto-reloads window (no prompt)
       * 3. **No change:** Does nothing
       *
       * The developer never needs to think about reload.
       *
       * @param executeCommand - Function to execute VS Code commands
       *   (pass `vscode.commands.executeCommand` or equivalent)
       *
       * @example
       * ```typescript
       * const sdk = new AntigravitySDK(context);
       * await sdk.initialize();
       *
       * sdk.integration.enableTitleProxy();
       * // That's it. SDK handles install, reload, everything.
       * await sdk.integration.installSeamless(
       *   (cmd) => vscode.commands.executeCommand(cmd),
       *   (msg, ...items) => vscode.window.showInformationMessage(msg, ...items),
       * );
       * ```
       */
      async installSeamless(executeCommand, showMessage) {
        const loaderWasPresent = this._patcher.isLoaderInstalled();
        const wasRegistered = this._patcher.isInstalled();
        const scriptPath = this._patcher.getScriptPath();
        let oldContent = "";
        try {
          if (fs3__namespace.existsSync(scriptPath)) {
            oldContent = fs3__namespace.readFileSync(scriptPath, "utf8");
          }
        } catch {
        }
        const changed = await this.install();
        if (!loaderWasPresent) {
          log8.info("First SDK install. Prompting for reload.");
          if (showMessage) {
            const action = await showMessage(
              "Antigravity SDK installed. Reload to activate.",
              "Reload Now"
            );
            if (action === "Reload Now") {
              await executeCommand("workbench.action.reloadWindow");
            }
          }
        } else if (!wasRegistered) {
          log8.info("SDK loader already present \u2014 extension registered, auto-reloading...");
          setTimeout(() => executeCommand("workbench.action.reloadWindow"), 500);
        } else if (changed) {
          log8.info("Script changed on disk. Auto-reloading window...");
          setTimeout(() => executeCommand("workbench.action.reloadWindow"), 500);
        } else {
          log8.debug("Script unchanged. No reload needed.");
        }
      }
      /**
       * Remove this extension from the SDK framework.
       *
       * If this is the last extension, the loader is removed from workbench.html
       * and all original checksums are restored.
       *
       * ⚠️ Requires Antigravity restart to take effect.
       */
      async uninstall() {
        const remaining = this._patcher.getRegisteredExtensions().filter((n) => n !== this._namespace);
        log8.debug(`uninstall: removing ns=${this._namespace}, remaining: ${remaining.join(", ") || "none (last extension)"}`);
        this._patcher.uninstall();
        this._integrity.releaseCheck();
        this.disableAutoRepair();
        log8.info(remaining.length > 0 ? `Uninstalled ${this._namespace}. ${remaining.length} extension(s) still active.` : `Uninstalled ${this._namespace}. SDK fully removed. Restart Antigravity.`);
      }
      /**
       * Check if this extension is registered in the SDK framework.
       */
      isInstalled() {
        return this._patcher.isInstalled();
      }
      /**
       * Check if the shared SDK loader is installed in workbench.html.
       */
      isLoaderInstalled() {
        return this._patcher.isLoaderInstalled();
      }
      /**
       * Signal that the extension is active.
       *
       * Call this in your extension's `activate()` function.
       * The integration script checks for this heartbeat;
       * if it's missing or stale (>48h), the script won't start.
       *
       * This prevents orphaned integrations from running after
       * an extension is disabled or uninstalled.
       *
       * @example
       * ```typescript
       * export function activate(context: vscode.ExtensionContext) {
       *   const sdk = new AntigravitySDK(context);
       *   sdk.integration.signalActive();
       *   // ...
       * }
       * ```
       */
      signalActive() {
        this._patcher.writeHeartbeat();
        log8.debug("Heartbeat refreshed");
      }
      // ─── Dynamic Update ─────────────────────────────────────────────────
      /**
       * Re-generate and overwrite the integration script without re-patching workbench.html.
       *
       * Use this after registering/unregistering integration points at runtime.
       * The script file is updated in-place; the next Antigravity restart
       * will pick up the changes. workbench.html <script> tag is unchanged.
       *
       * @returns true if script was updated
       */
      updateScript() {
        if (!this._patcher.isLoaderInstalled()) {
          log8.warn("Cannot update script \u2014 SDK loader is not installed");
          return false;
        }
        try {
          const script = this.build();
          fs3__namespace.writeFileSync(this._patcher.getScriptPath(), script, "utf8");
          log8.info(`Script updated (${this._configs.size} points)`);
          return true;
        } catch (err) {
          log8.error("Failed to update script", err);
          return false;
        }
      }
      // ─── Auto-Repair ────────────────────────────────────────────────────
      /**
       * Enable auto-repair: watches workbench.html for changes
       * and automatically re-applies the integration patch.
       *
       * This handles Antigravity updates that overwrite workbench.html.
       * The watcher detects when the file changes and re-patches it
       * if the integration marker is missing.
       *
       * @example
       * ```typescript
       * const integrator = new IntegrationManager();
       * integrator.useDemoPreset();
       * await integrator.install();
       * integrator.enableAutoRepair(); // Survive Antigravity updates
       * ```
       */
      enableAutoRepair() {
        if (this._watcher)
          return;
        const htmlPath = this._patcher.getWorkbenchDir() + "\\workbench.html";
        if (!fs3__namespace.existsSync(htmlPath)) {
          log8.warn("Cannot enable auto-repair \u2014 workbench.html not found");
          return;
        }
        try {
          this._watcher = fs3__namespace.watch(htmlPath, (eventType) => {
            if (eventType !== "change")
              return;
            if (this._autoRepairDebounce)
              clearTimeout(this._autoRepairDebounce);
            this._autoRepairDebounce = setTimeout(() => {
              this._tryRepair();
            }, 2e3);
          });
          log8.info("Auto-repair enabled \u2014 watching workbench.html");
        } catch (err) {
          log8.error("Failed to enable auto-repair", err);
        }
      }
      /**
       * Disable auto-repair watcher.
       */
      disableAutoRepair() {
        if (this._watcher) {
          this._watcher.close();
          this._watcher = null;
          log8.info("Auto-repair disabled");
        }
        if (this._autoRepairDebounce) {
          clearTimeout(this._autoRepairDebounce);
          this._autoRepairDebounce = null;
        }
      }
      /**
       * Whether auto-repair is active.
       */
      get isAutoRepairEnabled() {
        return this._watcher !== null;
      }
      _tryRepair() {
        try {
          if (this._patcher.isLoaderInstalled()) {
            log8.debug("Auto-repair: SDK loader still present, no action needed");
            return;
          }
          if (this._configs.size === 0 && !this._titleProxyEnabled) {
            log8.debug("Auto-repair: no configs registered, skipping");
            return;
          }
          log8.info("Auto-repair: SDK loader lost (Antigravity update?), re-installing...");
          const script = this.build();
          this._patcher.install(script);
          this._integrity.repair();
          log8.info("Auto-repair: re-installed successfully. Restart Antigravity.");
        } catch (err) {
          log8.error("Auto-repair failed", err);
        }
      }
      // ─── Preset ────────────────────────────────────────────────────────
      /**
       * Register the Demo preset — a complete demo of all 9 integration points.
       * Useful for testing and as a reference implementation.
       */
      useDemoPreset() {
        this.addTopBarButton("demo_overview", "\u{1F4E1}", "SDK: Session Overview", {
          title: "Session Overview",
          badge: { text: "TOP_BAR", bgColor: "rgba(79,195,247,.2)", textColor: "#4fc3f7" },
          rows: [
            { key: "location:", value: "Header icon bar" },
            { key: "use case:", value: "Session overview, navigation" }
          ]
        });
        this.addTopRightButton("demo_perf", "\u26A1", "SDK: Performance", {
          title: "Performance",
          badge: { text: "TOP_RIGHT", bgColor: "rgba(255,193,7,.2)", textColor: "#ffd54f" },
          rows: [
            { key: "location:", value: "Top right, before close" },
            { key: "use case:", value: "Status indicator" }
          ]
        });
        this.addInputButton("demo_stats", "\u{1F4CA}", "SDK: Stats", {
          title: "Input Stats",
          badge: { text: "INPUT_AREA", bgColor: "rgba(76,175,80,.2)", textColor: "#81c784" },
          rows: [
            { key: "location:", value: "Next to send button" },
            { key: "use case:", value: "Token counter, analytics" }
          ]
        });
        this.addBottomIcon("demo_actions", "\u2630", "SDK: Quick Actions", {
          title: "Quick Actions",
          badge: { text: "BOTTOM_ICONS", bgColor: "rgba(255,152,0,.2)", textColor: "#ffb74d" },
          rows: [
            { key: "location:", value: "Bottom icon row" },
            { key: "use case:", value: "Mode switches, quick actions" }
          ]
        });
        this.addTurnMetadata("demo_turns", [
          "turnNumber",
          "userCharCount",
          "separator",
          "aiCharCount",
          "codeBlocks",
          "thinkingIndicator"
        ]);
        this.addUserBadges("demo_ubadge", "charCount");
        this.addBotAction("demo_inspect", "\u{1F50D}", "inspect", {
          title: "Response Inspector",
          badge: { text: "BOT_ACTION", bgColor: "rgba(156,39,176,.2)", textColor: "#ce93d8" },
          rows: [
            { key: "location:", value: "Next to Good/Bad" },
            { key: "use case:", value: "Response analysis" }
          ]
        });
        this.addDropdownItem("demo_menu_stats", "SDK Stats", "\u{1F4CA}", {
          title: "Extended Stats",
          badge: { text: "DROPDOWN", bgColor: "rgba(233,30,99,.2)", textColor: "#f48fb1" },
          rows: [
            { key: "location:", value: "3-dot dropdown menu" },
            { key: "use case:", value: "Extended actions" }
          ]
        }, true);
        this.addDropdownItem("demo_menu_debug", "SDK Debug", "\u{1F9EA}", {
          title: "Debug Info",
          badge: { text: "DEBUG", bgColor: "rgba(255,87,34,.2)", textColor: "#ff8a65" },
          rows: [
            { key: "location:", value: "3-dot dropdown menu" },
            { key: "use case:", value: "Debug, diagnostics" }
          ]
        });
        this.addTitleInteraction("demo_title", "dblclick", "dblclick", {
          title: "Chat Title",
          badge: { text: "TITLE", bgColor: "rgba(0,150,136,.2)", textColor: "#80cbc4" },
          rows: [
            { key: "location:", value: "Conversation title" },
            { key: "use case:", value: "Rename, bookmark" }
          ]
        });
        return this;
      }
      // ─── Dispose ───────────────────────────────────────────────────────
      dispose() {
        this.disableAutoRepair();
        this._configs.clear();
        this._titles.dispose();
      }
    };
    var log9 = new Logger("SDK");
    var AntigravitySDK = class {
      /**
       * Create a new Antigravity SDK instance.
       *
       * @param context - VS Code extension context
       * @param options - SDK options
       */
      constructor(_context, options2) {
        this._context = _context;
        this._disposables = new DisposableStore();
        this._initialized = false;
        this._agVersion = null;
        if (options2?.debug) {
          Logger.setLevel(
            0
            /* Debug */
          );
        }
        const namespace = this._context.extension.id.replace(/\./g, "-");
        this.commands = this._disposables.add(new CommandBridge());
        this.state = this._disposables.add(new StateBridge());
        this.cascade = this._disposables.add(new CascadeManager(this.commands, this.state));
        this.monitor = this._disposables.add(new EventMonitor(this.state));
        this.integration = this._disposables.add(new IntegrationManager(namespace));
        this.ls = new LSBridge(
          (cmd, ...args) => Promise.resolve(vscode__namespace.commands.executeCommand(cmd, ...args))
        );
        log9.info(`SDK created (namespace: ${namespace})`);
      }
      /**
       * Initialize the SDK and verify Antigravity is running.
       *
       * Call this before using any SDK features.
       *
       * @throws {AntigravityNotFoundError} If Antigravity is not detected
       */
      async initialize() {
        if (this._initialized) {
          return;
        }
        log9.info("Initializing SDK...");
        this._agVersion = detectAGVersion();
        if (this._agVersion) {
          const { version, compatible, supportedRange } = this._agVersion;
          if (!compatible) {
            log9.warn(`AG v${version} is outside supported range (${supportedRange}) \u2014 some features may not work`);
          } else {
            log9.info(`AG v${version} detected (supported: ${supportedRange})`);
          }
        }
        const isAntigravity = await this._detectAntigravity();
        if (!isAntigravity) {
          throw new AntigravityNotFoundError();
        }
        await this.state.initialize();
        await this.cascade.initialize();
        const lsOk = await this.ls.initialize();
        if (lsOk) {
          log9.info(`LS bridge ready on port ${this.ls.port} (csrf: ${this.ls.hasCsrfToken ? "ok" : "missing"})`);
        } else {
          log9.warn("LS bridge not available \u2014 use sdk.ls.setConnection(port, csrfToken) or command fallback");
        }
        this.integration.signalActive();
        this._initialized = true;
        log9.info("SDK initialized successfully");
      }
      /**
       * Check if the SDK has been initialized.
       */
      get isInitialized() {
        return this._initialized;
      }
      /**
       * Get the SDK version.
       */
      get version() {
        try {
          return require_package().version;
        } catch {
          return "unknown";
        }
      }
      /**
       * Get info about the installed Antigravity version and SDK compatibility.
       * Available after initialize().
       */
      get agVersion() {
        return this._agVersion;
      }
      /**
       * Detect if we're running inside Antigravity IDE.
       */
      async _detectAntigravity() {
        try {
          const commands4 = await this.commands.getAntigravityCommands();
          const hasAgentPanel = commands4.includes("antigravity.agentPanel.open");
          if (hasAgentPanel) {
            log9.debug(`Detected Antigravity (${commands4.length} commands)`);
            return true;
          }
          const appName = vscode__namespace.env.appName;
          if (appName?.toLowerCase().includes("antigravity")) {
            log9.debug(`Detected Antigravity via appName: ${appName}`);
            return true;
          }
          return false;
        } catch {
          return false;
        }
      }
      /**
       * Dispose of the SDK and all its resources.
       */
      dispose() {
        log9.info("Disposing SDK");
        this._disposables.dispose();
      }
    };
    exports2.AntigravityCommands = AntigravityCommands;
    exports2.AntigravityNotFoundError = AntigravityNotFoundError;
    exports2.AntigravitySDK = AntigravitySDK;
    exports2.AntigravitySDKError = AntigravitySDKError;
    exports2.ArtifactReviewPolicy = ArtifactReviewPolicy;
    exports2.CascadeManager = CascadeManager;
    exports2.CommandBridge = CommandBridge;
    exports2.CommandExecutionError = CommandExecutionError;
    exports2.CortexStepType = CortexStepType;
    exports2.DisposableStore = DisposableStore;
    exports2.EventEmitter = EventEmitter2;
    exports2.EventMonitor = EventMonitor;
    exports2.IntegrationManager = IntegrationManager;
    exports2.IntegrationPoint = IntegrationPoint;
    exports2.IntegrityManager = IntegrityManager;
    exports2.LSBridge = LSBridge;
    exports2.LogLevel = LogLevel;
    exports2.Logger = Logger;
    exports2.Models = Models;
    exports2.SessionNotFoundError = SessionNotFoundError;
    exports2.StateBridge = StateBridge;
    exports2.StateReadError = StateReadError;
    exports2.StepStatus = StepStatus;
    exports2.TerminalExecutionPolicy = TerminalExecutionPolicy;
    exports2.TitleManager = TitleManager;
    exports2.TrajectoryType = TrajectoryType;
    exports2.USSKeys = USSKeys;
    exports2.detectAGVersion = detectAGVersion;
    exports2.toDisposable = toDisposable;
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0)
        return "undefined";
      if (val === null)
        return "null";
      var type = typeof val;
      if (type === "boolean")
        return "boolean";
      if (type === "string")
        return "string";
      if (type === "number")
        return "number";
      if (type === "symbol")
        return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val))
        return "array";
      if (isBuffer(val))
        return "buffer";
      if (isArguments(val))
        return "arguments";
      if (isDate(val))
        return "date";
      if (isError(val))
        return "error";
      if (isRegexp(val))
        return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray)
        return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date)
        return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp)
        return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/is-extendable/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/extend-shallow/index.js"(exports2, module2) {
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i = 1; i < len; i++) {
        var obj = arguments[i];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/section-matter/index.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence))
        return sequence;
      else if (isNothing(sequence))
        return [];
      return [sequence];
    }
    function extend(target, source) {
      var index, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index = 0, length = sourceKeys.length; index < length; index += 1) {
          key = sourceKeys[index];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer)
        return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index) {
        return exclude.indexOf(index) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index = 0, length = arguments.length; index < length; index += 1) {
        arguments[index].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types = common.toArray(types);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null)
        return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null)
        return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null)
        return false;
      var max = data.length, index = 0, hasDigits = false, ch;
      if (!max)
        return false;
      ch = data[index];
      if (ch === "-" || ch === "+") {
        ch = data[++index];
      }
      if (ch === "0") {
        if (index + 1 === max)
          return true;
        ch = data[++index];
        if (ch === "b") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_")
              continue;
            if (ch !== "0" && ch !== "1")
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index++;
          for (; index < max; index++) {
            ch = data[index];
            if (ch === "_")
              continue;
            if (!isHexCode(data.charCodeAt(index)))
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isOctCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_")
        return false;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch === ":")
          break;
        if (!isDecCode(data.charCodeAt(index))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_")
        return false;
      if (ch !== ":")
        return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-")
          sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0")
        return 0;
      if (ch === "0") {
        if (value[1] === "b")
          return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x")
          return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        /* eslint-disable max-len */
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp(
      // 2.5e4, 2.5 and integers
      "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
    );
    function resolveYamlFloat(data) {
      if (data === null)
        return false;
      if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d) {
          value += d * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
    );
    var YAML_TIMESTAMP_REGEXP = new RegExp(
      "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
    );
    function resolveYamlTimestamp(data) {
      if (data === null)
        return false;
      if (YAML_DATE_REGEXP.exec(data) !== null)
        return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
        return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null)
        match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null)
        throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-")
          delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta)
        date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    "use strict";
    var NodeBuffer;
    try {
      _require = require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null)
        return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64)
          continue;
        if (code < 0)
          return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null)
        return true;
      var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]")
          return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey)
              pairHasKey = true;
            else
              return false;
          }
        }
        if (!pairHasKey)
          return false;
        if (objectKeys.indexOf(pairKey) === -1)
          objectKeys.push(pairKey);
        else
          return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null)
        return true;
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        if (_toString.call(pair) !== "[object Object]")
          return false;
        keys = Object.keys(pair);
        if (keys.length !== 1)
          return false;
        result[index] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null)
        return [];
      var index, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index = 0, length = object.length; index < length; index += 1) {
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null)
        return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null)
            return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null)
        return false;
      if (data.length === 0)
        return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        if (modifiers.length > 3)
          return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/")
          return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global)
        result += "g";
      if (object.multiline)
        result += "m";
      if (object.ignoreCase)
        result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    "use strict";
    var esprima;
    try {
      _require = require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined")
        esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null)
        return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode(
        (c - 65536 >> 10) + 55296,
        (c - 65536 & 1023) + 56320
      );
    }
    function setProperty(object, key, value) {
      if (key === "__proto__") {
        Object.defineProperty(object, key, {
          configurable: true,
          enumerable: true,
          writable: true,
          value
        });
      } else {
        object[key] = value;
      }
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    var i;
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(
        message,
        new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart)
      );
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
        key = sourceKeys[index];
        if (!_hasOwnProperty.call(destination, key)) {
          setProperty(destination, key, source[key]);
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
          if (Array.isArray(keyNode[index])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
            keyNode[index] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
            mergeMappings(state, _result, valueNode[index], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        setProperty(_result, keyNode, valueNode);
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33)
        return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38)
        return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42)
        return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch))
            break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0)
          readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index = 0, length = documents.length; index < length; index += 1) {
        iterator(documents[index]);
      }
    }
    function load(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index, length, tag, style, type;
      if (map === null)
        return {};
      result = {};
      keys = Object.keys(map);
      for (index = 0, length = keys.length; index < length; index += 1) {
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n")
          result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str2) {
      var index, length, type;
      for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
        type = state.implicitTypes[index];
        if (type.resolve(str2)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
              i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ")
        return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level, object[index], false, false)) {
          if (index !== 0)
            _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index, length;
      for (index = 0, length = object.length; index < length; index += 1) {
        if (writeNode(state, level + 1, object[index], true, true)) {
          if (!compact || index !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (index !== 0)
          pairBuffer += ", ";
        if (state.condenseFlow)
          pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024)
          pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index = 0, length = objectKeyList.length; index < length; index += 1) {
        pairBuffer = "";
        if (!compact || index !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index = 0, length = typeList.length; index < length; index += 1) {
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid)
            return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index, length;
      if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
          if (duplicatesIndexes.indexOf(index) === -1) {
            duplicatesIndexes.push(index);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index = 0, length = object.length; index < length; index += 1) {
              inspectNode(object[index], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index = 0, length = objectKeyList.length; index < length; index += 1) {
              inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs)
        getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true))
        return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/gray-matter/node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/gray-matter/node_modules/js-yaml/index.js"(exports2, module2) {
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/gray-matter/lib/engines.js"(exports, module) {
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/strip-bom-string/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(str2) {
      if (typeof str2 === "string" && str2.charAt(0) === "\uFEFF") {
        return str2.slice(1);
      }
      return str2;
    };
  }
});

// node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "node_modules/gray-matter/lib/utils.js"(exports2) {
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input))
        return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str2, substr, len) {
      if (typeof len !== "number")
        len = substr.length;
      return str2.slice(0, len) === substr;
    };
  }
});

// node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str2 = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data)
          return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter2 = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter2 !== "{}") {
        buf = newline(open) + newline(matter2) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str2.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str2);
    };
    function newline(str2) {
      return str2.slice(-1) !== "\n" ? str2 + "\n" : str2;
    }
  }
});

// node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str2, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str2, opts);
    };
  }
});

// node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/gray-matter/index.js"(exports2, module2) {
    "use strict";
    var fs4 = require("fs");
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse2 = require_parse();
    var utils = require_utils();
    function matter2(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter2.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter2.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str2 = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str2, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str2.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str2 = str2.slice(openLen);
      const len = str2.length;
      const language = matter2.language(str2, opts);
      if (language.name) {
        file.language = language.name;
        str2 = str2.slice(language.raw.length);
      }
      let closeIndex = str2.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str2.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse2(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str2.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter2.engines = engines2;
    matter2.stringify = function(file, data, options2) {
      if (typeof file === "string")
        file = matter2(file, options2);
      return stringify(file, data, options2);
    };
    matter2.read = function(filepath, options2) {
      const str2 = fs4.readFileSync(filepath, "utf8");
      const file = matter2(str2, options2);
      file.path = filepath;
      return file;
    };
    matter2.test = function(str2, options2) {
      return utils.startsWith(str2, defaults(options2).delimiters[0]);
    };
    matter2.language = function(str2, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter2.test(str2)) {
        str2 = str2.slice(open.length);
      }
      const language = str2.slice(0, str2.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter2.cache = {};
    matter2.clearCache = function() {
      matter2.cache = {};
    };
    module2.exports = matter2;
  }
});

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode6 = __toESM(require("vscode"));

// src/webview/webviewManager.ts
var vscode5 = __toESM(require("vscode"));
var path9 = __toESM(require("path"));

// src/webview/getWebviewContent.ts
var vscode = __toESM(require("vscode"));
var crypto = __toESM(require("crypto"));
function getWebviewContent(webview, extensionUri) {
  const nonce = crypto.randomBytes(16).toString("base64");
  const cssUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "index.css"));
  const appJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "app.js"));
  const logoUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "icons", "acc_logo.png"));
  const sidebarJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "sidebar.js"));
  const searchBarJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "searchBar.js"));
  const modalJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "modal.js"));
  const toastJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "toast.js"));
  const cardJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "card.js"));
  const tableJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "table.js"));
  const skeletonJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "skeleton.js"));
  const codeBlockJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "components", "codeBlock.js"));
  const conversationsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "conversations.js"));
  const mcpServersJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "mcpServers.js"));
  const skillsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "skills.js"));
  const agentsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "agents.js"));
  const rulesJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "rules.js"));
  const workflowsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "workflows.js"));
  const knowledgeJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "knowledge.js"));
  const settingsJsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "media", "webview", "modules", "settings.js"));
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=initial-scale=1.0">
  <!-- Content Security Policy -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src ${webview.cspSource} data:; script-src 'nonce-${nonce}';">
  
  <title>\u26A1 Antigravity Control Center</title>

  <!-- Premium Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Master Stylesheet -->
  <link rel="stylesheet" href="${cssUri}">
</head>
<body>
  <div class="app-shell">
    <!-- Left Navigation Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">
        <img src="${logoUri}" alt="Logo" class="logo-img" style="width: 24px; height: 24px; object-fit: contain; border-radius: var(--radius-xs); border: 1px solid var(--color-surface-border);">
        <span class="logo-text">Control Center</span>
      </div>
      <nav class="sidebar-nav" id="sidebar-nav"></nav>
      <button class="sidebar-collapse-btn" id="sidebar-collapse-btn" aria-label="Collapse sidebar">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
    </aside>

    <!-- Main Content Area -->
    <main class="content-container">
      <!-- Top Actions Sticky Bar -->
      <header class="top-bar">
        <div class="top-bar-left">
          <h1 class="module-title" id="module-title">Dashboard</h1>
        </div>
        <div class="top-bar-right">
          <!-- Search Bar Hook -->
          <div class="search-bar-container" id="search-bar-container"></div>
          
          <!-- Quick Action Buttons -->
          <button class="btn btn-secondary btn-icon" id="global-refresh-btn" title="Refresh Data (Ctrl+R)">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
          </button>
          <button class="btn btn-secondary btn-icon" id="global-popout-btn" title="Pop out Control Center to standard standalone window">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
              <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- Dynamic Frame -->
      <div class="content-area" id="content-area">
        <!-- Column 2 (Sub-list Panel) -->
        <div id="sub-list-panel" class="sub-list-column"></div>
        <!-- Column 3 (Detail Panel) -->
        <div id="detail-panel" class="detail-column"></div>
      </div>

      <!-- Footer Status Bar -->
      <footer class="status-bar">
        <div class="status-bar-left">
          <span class="status-indicator"></span>
          <span class="status-text" id="status-text">Scanning directories...</span>
        </div>
        <div class="status-bar-center">
          <span class="status-credits">Created by Firas Sleiman \u2014 <a href="https://github.com/firothehero" class="status-credits-link" id="credits-link">github.com/firothehero</a></span>
        </div>
        <div class="status-bar-right">
          <span class="status-item" id="last-updated-text">Synced: Never</span>
          <span class="status-divider">|</span>
          <span class="status-item">v0.2.0</span>
        </div>
      </footer>
    </main>
  </div>

  <!-- Reusable Toast Alert Containers -->
  <div class="toast-container" id="toast-container"></div>

  <!-- Custom Modal Overlay Layer (No Native browser Popups Allowed) -->
  <div class="modal-overlay hidden" id="modal-overlay">
    <div class="modal" id="modal-container"></div>
  </div>

  <!-- Acquire VS Code Webview API -->
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
  </script>

  <!-- Component JS Files (CSP Nonce Enforced) -->
  <script nonce="${nonce}" src="${sidebarJsUri}"></script>
  <script nonce="${nonce}" src="${searchBarJsUri}"></script>
  <script nonce="${nonce}" src="${modalJsUri}"></script>
  <script nonce="${nonce}" src="${toastJsUri}"></script>
  <script nonce="${nonce}" src="${cardJsUri}"></script>
  <script nonce="${nonce}" src="${tableJsUri}"></script>
  <script nonce="${nonce}" src="${skeletonJsUri}"></script>
  <script nonce="${nonce}" src="${codeBlockJsUri}"></script>

  <!-- Module JS Files (CSP Nonce Enforced) -->
  <script nonce="${nonce}" src="${conversationsJsUri}"></script>
  <script nonce="${nonce}" src="${mcpServersJsUri}"></script>
  <script nonce="${nonce}" src="${skillsJsUri}"></script>
  <script nonce="${nonce}" src="${agentsJsUri}"></script>
  <script nonce="${nonce}" src="${rulesJsUri}"></script>
  <script nonce="${nonce}" src="${workflowsJsUri}"></script>
  <script nonce="${nonce}" src="${knowledgeJsUri}"></script>
  <script nonce="${nonce}" src="${settingsJsUri}"></script>

  <!-- Core App Controller (CSP Nonce Enforced) -->
  <script nonce="${nonce}" src="${appJsUri}"></script>
</body>
</html>`;
}

// src/providers/conversationProvider.ts
var path2 = __toESM(require("path"));
var fs2 = __toESM(require("fs/promises"));
var vscode4 = __toESM(require("vscode"));

// src/utils/paths.ts
var path = __toESM(require("path"));
var os = __toESM(require("os"));
var vscode2 = __toESM(require("vscode"));
function getDataDirectory() {
  const config = vscode2.workspace.getConfiguration("controlCenter");
  const customPath = config.get("dataDirectory");
  if (customPath && customPath.trim() !== "") {
    if (customPath.startsWith("~/") || customPath === "~") {
      return path.join(os.homedir(), customPath.slice(1));
    }
    return path.resolve(customPath);
  }
  return path.join(os.homedir(), ".gemini", "antigravity-ide");
}
function getBrainDirectory() {
  return path.join(getDataDirectory(), "brain");
}
function getMcpDirectory() {
  return path.join(getDataDirectory(), "mcp");
}
function getKnowledgeDirectory() {
  return path.join(getDataDirectory(), "knowledge");
}
function getWorkspaceAgentsDirectory() {
  const folders = vscode2.workspace.workspaceFolders;
  if (!folders || folders.length === 0) {
    return void 0;
  }
  return path.join(folders[0].uri.fsPath, ".agents");
}
function getGlobalPluginsDirectory() {
  return path.join(os.homedir(), ".gemini", "config", "plugins");
}

// src/utils/fileSystem.ts
var fs = __toESM(require("fs/promises"));
async function safeReadDir(dirPath) {
  try {
    return await fs.readdir(dirPath);
  } catch (error) {
    return [];
  }
}
async function safeReadFile(filePath) {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch (error) {
    return null;
  }
}
async function safeReadJson(filePath) {
  const content = await safeReadFile(filePath);
  if (!content) {
    return null;
  }
  try {
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}
async function directoryExists(dirPath) {
  try {
    const stat2 = await fs.stat(dirPath);
    return stat2.isDirectory();
  } catch (error) {
    return false;
  }
}
async function fileExists(filePath) {
  try {
    const stat2 = await fs.stat(filePath);
    return stat2.isFile();
  } catch (error) {
    return false;
  }
}
async function getSubDirectories(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory() && !entry.name.startsWith(".")).map((entry) => entry.name);
  } catch (error) {
    return [];
  }
}
async function getFileStat(filePath) {
  try {
    const stat2 = await fs.stat(filePath);
    return {
      createdAt: stat2.birthtime,
      modifiedAt: stat2.mtime,
      size: stat2.size
    };
  } catch (error) {
    return null;
  }
}

// src/utils/jsonlParser.ts
function parseJsonl(content) {
  if (!content) {
    return [];
  }
  const lines = content.split("\n");
  const steps = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    try {
      const step = JSON.parse(trimmed);
      steps.push(step);
    } catch (e) {
    }
  }
  return steps;
}

// src/services/sdkService.ts
var vscode3 = __toESM(require("vscode"));
var _sdk = null;
var _available = false;
var _initError = null;
async function initializeSDK(context) {
  if (_sdk) {
    return;
  }
  try {
    const { AntigravitySDK } = require_dist();
    _sdk = new AntigravitySDK(context);
    await _sdk.initialize();
    _available = true;
    try {
      _sdk.integration.enableTitleProxy();
      await _sdk.integration.installSeamless(
        (cmd) => vscode3.commands.executeCommand(cmd),
        (msg, ...items) => vscode3.window.showInformationMessage(msg, ...items)
      );
      console.log("[ACC-SDK] Title proxy enabled and installed");
    } catch (titleErr) {
      console.warn("[ACC-SDK] Title proxy setup failed (rename will use fallback):", titleErr?.message);
    }
    if (_sdk.dispose) {
      context.subscriptions.push(_sdk);
    }
    console.log("[ACC-SDK] AntigravitySDK initialised successfully");
  } catch (err) {
    _sdk = null;
    _available = false;
    _initError = err?.message || String(err);
    console.warn("[ACC-SDK] AntigravitySDK initialisation failed \u2014 falling back to filesystem:", _initError);
  }
}
function getSDK() {
  return _sdk;
}
function isSDKAvailable() {
  return _available;
}
function getSDKInitError() {
  return _initError;
}

// src/providers/conversationProvider.ts
function detectProject(steps, id) {
  for (const step of steps) {
    if (step.tool_calls) {
      for (const tc of step.tool_calls) {
        if (tc.arguments) {
          if (tc.arguments.Cwd && typeof tc.arguments.Cwd === "string") {
            const cwd = tc.arguments.Cwd;
            if (cwd.includes("/tenn/")) {
              const segments = cwd.split("/");
              const tennIdx = segments.indexOf("tenn");
              if (tennIdx !== -1 && segments[tennIdx + 1]) {
                return segments[tennIdx + 1];
              }
            }
            const parts = cwd.split("/");
            return parts[parts.length - 1];
          }
          if (tc.arguments.AbsolutePath && typeof tc.arguments.AbsolutePath === "string") {
            const file = tc.arguments.AbsolutePath;
            if (file.includes("/firo/")) {
              const segments = file.split("/");
              const firoIdx = segments.indexOf("firo");
              if (firoIdx !== -1 && segments[firoIdx + 1] && segments[firoIdx + 1] !== "Desktop") {
                if (segments[firoIdx + 1] === "tenn" && segments[firoIdx + 2]) {
                  return segments[firoIdx + 2];
                }
                return segments[firoIdx + 1];
              }
            }
          }
          if (tc.arguments.TargetFile && typeof tc.arguments.TargetFile === "string") {
            const file = tc.arguments.TargetFile;
            if (file.includes("/firo/")) {
              const segments = file.split("/");
              const firoIdx = segments.indexOf("firo");
              if (firoIdx !== -1 && segments[firoIdx + 1] && segments[firoIdx + 1] !== "Desktop") {
                if (segments[firoIdx + 1] === "tenn" && segments[firoIdx + 2]) {
                  return segments[firoIdx + 2];
                }
                return segments[firoIdx + 1];
              }
            }
          }
        }
      }
    }
  }
  const wsFolder = vscode4.workspace.workspaceFolders?.[0];
  if (wsFolder) {
    return wsFolder.name;
  }
  return "unknown";
}
function projectFromWorkspaceUri(uri) {
  if (!uri) {
    const wsFolder2 = vscode4.workspace.workspaceFolders?.[0];
    return wsFolder2?.name || "unknown";
  }
  try {
    const decoded = decodeURIComponent(uri.replace(/^file:\/\//, ""));
    const segments = decoded.split("/").filter(Boolean);
    if (segments.length > 0) {
      const tennIdx = segments.indexOf("tenn");
      if (tennIdx !== -1 && segments[tennIdx + 1]) {
        return segments[tennIdx + 1];
      }
      return segments[segments.length - 1];
    }
  } catch (_) {
  }
  const wsFolder = vscode4.workspace.workspaceFolders?.[0];
  return wsFolder?.name || "unknown";
}
async function getConversations() {
  const fsConversations = await _getConversationsFromFilesystem();
  if (isSDKAvailable()) {
    try {
      const sdkConversations = await _getConversationsFromSDK();
      const fsProjectMap = /* @__PURE__ */ new Map();
      for (const fsConv of fsConversations) {
        if (fsConv.project && fsConv.project !== "unknown") {
          fsProjectMap.set(fsConv.id, fsConv.project);
        }
      }
      const sdkIds = new Set(sdkConversations.map((c) => c.id));
      const merged = sdkConversations.map((c) => ({
        ...c,
        project: fsProjectMap.get(c.id) || c.project
      }));
      for (const fsConv of fsConversations) {
        if (!sdkIds.has(fsConv.id)) {
          merged.push(fsConv);
        }
      }
      return merged;
    } catch (err) {
      console.warn("[ACC] SDK getSessions failed, using filesystem only:", err);
    }
  }
  return fsConversations;
}
async function _getConversationsFromSDK() {
  const sdk = getSDK();
  const conversations = [];
  let rawTrajectories = [];
  try {
    const diag = await sdk.cascade.getDiagnostics();
    rawTrajectories = diag?.raw?.recentTrajectories || [];
    if (rawTrajectories.length > 0) {
      const sampleKeys = Object.keys(rawTrajectories[0]);
      console.log(`[ACC] Raw trajectory fields: ${sampleKeys.join(", ")}`);
      const sample = rawTrajectories[0];
      console.log(`[ACC] Sample trajectory workspace data: workspaceFolderUri=${sample.workspaceFolderUri}, workspaceUri=${sample.workspaceUri}, workspaceFolders=${sample.workspaceFolders}, workingDirectory=${sample.workingDirectory}, repoName=${sample.repoName}`);
    }
  } catch (diagErr) {
    console.warn("[ACC] getDiagnostics() failed, falling back to getSessions():", diagErr?.message);
    const sessions = await sdk.cascade.getSessions();
    rawTrajectories = sessions.map((s) => ({
      googleAgentId: s.id,
      summary: s.title,
      lastStepIndex: s.stepCount,
      lastModifiedTime: s.lastModifiedTime
    }));
  }
  for (const raw of rawTrajectories) {
    const id = raw.googleAgentId || raw.id || "";
    let title = raw.summary || raw.title || "";
    const stepCount = raw.lastStepIndex || raw.stepCount || 0;
    const lastMod = raw.lastModifiedTime || (/* @__PURE__ */ new Date()).toISOString();
    const workspaceRaw = raw.workspaceFolderUri || raw.workspaceUri || raw.workspaceFolders || raw.workingDirectory || raw.repoName || "";
    const project = projectFromWorkspaceUri(
      typeof workspaceRaw === "string" ? workspaceRaw : ""
    );
    const overridePath = path2.join(getBrainDirectory(), id, "title_override.txt");
    try {
      const overrideContent = await fs2.readFile(overridePath, "utf8");
      if (overrideContent.trim()) {
        title = overrideContent.trim();
      }
    } catch (_) {
    }
    if (!title) {
      title = `Conversation ${id.substring(0, 8)}`;
    }
    conversations.push({
      id,
      title,
      createdAt: lastMod,
      lastModified: lastMod,
      stepCount,
      artifactPath: path2.join(getBrainDirectory(), id),
      hasTranscript: true,
      project
    });
  }
  return conversations.sort(
    (a, b) => new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime()
  );
}
async function _getConversationsFromFilesystem() {
  const brainDir = getBrainDirectory();
  const subdirs = await getSubDirectories(brainDir);
  const conversations = [];
  for (const id of subdirs) {
    const convPath = path2.join(brainDir, id);
    const transcriptPath = path2.join(convPath, ".system_generated", "logs", "transcript.jsonl");
    const hasTranscript = await fileExists(transcriptPath);
    if (!hasTranscript) {
      continue;
    }
    const stat2 = await getFileStat(transcriptPath);
    const lastModified = stat2?.modifiedAt.toISOString() || (/* @__PURE__ */ new Date()).toISOString();
    const createdAt = stat2?.createdAt.toISOString() || (/* @__PURE__ */ new Date()).toISOString();
    const transcriptContent = await safeReadFile(transcriptPath) || "";
    const steps = parseJsonl(transcriptContent);
    const stepCount = steps.length;
    let title = "";
    const titleOverridePath = path2.join(convPath, "title_override.txt");
    try {
      const overrideContent = await fs2.readFile(titleOverridePath, "utf8");
      if (overrideContent.trim()) {
        title = overrideContent.trim();
      }
    } catch (_) {
    }
    if (!title) {
      const firstUserInput = steps.find((s) => s.type === "USER_INPUT");
      if (firstUserInput && firstUserInput.content) {
        title = firstUserInput.content.replace(/<[^>]*>/g, "").trim();
        if (title.length > 80) {
          title = title.substring(0, 80) + "...";
        }
      }
    }
    if (!title) {
      title = `Conversation ${id.substring(0, 8)}`;
    }
    const project = detectProject(steps, id);
    conversations.push({
      id,
      title,
      createdAt,
      lastModified,
      stepCount,
      artifactPath: convPath,
      hasTranscript: true,
      project
    });
  }
  return conversations.sort((a, b) => {
    return new Date(b.lastModified || 0).getTime() - new Date(a.lastModified || 0).getTime();
  });
}
async function getConversationDetail(id) {
  const brainDir = getBrainDirectory();
  const convPath = path2.join(brainDir, id);
  const transcriptPath = path2.join(convPath, ".system_generated", "logs", "transcript.jsonl");
  const hasTranscript = await fileExists(transcriptPath);
  if (!hasTranscript) {
    return null;
  }
  const stat2 = await getFileStat(transcriptPath);
  const lastModified = stat2?.modifiedAt.toISOString() || (/* @__PURE__ */ new Date()).toISOString();
  const createdAt = stat2?.createdAt.toISOString() || (/* @__PURE__ */ new Date()).toISOString();
  const transcriptContent = await safeReadFile(transcriptPath) || "";
  const steps = parseJsonl(transcriptContent);
  const stepCount = steps.length;
  let title = "";
  const titleOverridePath = path2.join(convPath, "title_override.txt");
  try {
    const overrideContent = await fs2.readFile(titleOverridePath, "utf8");
    if (overrideContent.trim()) {
      title = overrideContent.trim();
    }
  } catch (_) {
  }
  if (!title && isSDKAvailable()) {
    try {
      const sessions = await getSDK().cascade.getSessions();
      const match = sessions.find((s) => s.id === id);
      if (match) {
        title = match.title || "";
      }
    } catch (_) {
    }
  }
  if (!title) {
    const firstUserInput = steps.find((s) => s.type === "USER_INPUT");
    if (firstUserInput && firstUserInput.content) {
      title = firstUserInput.content.replace(/<[^>]*>/g, "").trim();
      if (title.length > 80) {
        title = title.substring(0, 80) + "...";
      }
    }
  }
  if (!title) {
    title = `Conversation ${id.substring(0, 8)}`;
  }
  const dirFiles = await safeReadDir(convPath);
  const artifacts = dirFiles.filter((file) => {
    return file !== ".system_generated" && !file.startsWith(".");
  });
  let userMessages = 0;
  let agentMessages = 0;
  let toolCalls = 0;
  for (const step of steps) {
    if (step.type === "USER_INPUT") {
      userMessages++;
    } else if (step.source === "MODEL" || step.source === "PLANNER_RESPONSE") {
      agentMessages++;
    }
    if (step.tool_calls && step.tool_calls.length > 0) {
      toolCalls += step.tool_calls.length;
    }
  }
  const project = detectProject(steps, id);
  return {
    id,
    title,
    createdAt,
    lastModified,
    stepCount,
    artifactPath: convPath,
    hasTranscript: true,
    steps,
    artifacts,
    userMessages,
    agentMessages,
    toolCalls,
    project
  };
}
function _resolveModelNumeric(localModelId) {
  try {
    const sdkModels = require_dist().Models;
    if (!sdkModels) {
      return void 0;
    }
    const MAP = {
      "gemini-3.5-flash-medium": "GEMINI_FLASH",
      "gemini-3.5-flash-high": "GEMINI_FLASH_HIGH",
      "gemini-3.5-flash-low": "GEMINI_FLASH_LOW",
      "gemini-3.1-pro-low": "GEMINI_PRO",
      "gemini-3.1-pro-high": "GEMINI_PRO_HIGH",
      "claude-sonnet-4.6": "CLAUDE_SONNET",
      "claude-opus-4.6": "CLAUDE_OPUS",
      "gpt-oss-120b": "GPT_OSS"
    };
    const sdkKey = MAP[localModelId];
    if (sdkKey && sdkModels[sdkKey] !== void 0) {
      return sdkModels[sdkKey];
    }
  } catch (_) {
  }
  return void 0;
}
async function sendConversationMessage(id, prompt, modelId) {
  if (isSDKAvailable()) {
    try {
      return await _sendMessageViaSDK(id, prompt, modelId);
    } catch (err) {
      console.warn("[ACC] SDK sendMessage failed, falling back to filesystem:", err);
    }
  }
  return _sendMessageViaFilesystem(id, prompt);
}
async function _sendMessageViaSDK(id, prompt, modelId) {
  const sdk = getSDK();
  try {
    await sdk.ls.focusCascade(id);
  } catch (_) {
    try {
      await sdk.cascade.focusSession(id);
    } catch (__) {
    }
  }
  try {
    const sdkModelNum = modelId ? _resolveModelNumeric(modelId) : void 0;
    const msgOpts = {
      cascadeId: id,
      text: prompt
    };
    if (sdkModelNum !== void 0) {
      msgOpts.model = sdkModelNum;
    }
    await sdk.ls.sendMessage(msgOpts);
  } catch (_lsErr) {
    await sdk.cascade.sendPrompt(prompt);
  }
  await new Promise((resolve2) => setTimeout(resolve2, 200));
  return getConversationDetail(id);
}
async function _sendMessageViaFilesystem(id, prompt) {
  const brainDir = getBrainDirectory();
  const transcriptPath = path2.join(brainDir, id, ".system_generated", "logs", "transcript.jsonl");
  const hasTranscript = await fileExists(transcriptPath);
  if (!hasTranscript) {
    return null;
  }
  const transcriptContent = await safeReadFile(transcriptPath) || "";
  const steps = parseJsonl(transcriptContent);
  const nextIndex = steps.length > 0 ? Math.max(...steps.map((s) => s.step_index)) + 1 : 1;
  const newStep = {
    step_index: nextIndex,
    source: "USER_EXPLICIT",
    type: "USER_INPUT",
    status: "DONE",
    content: prompt
  };
  const line = JSON.stringify(newStep) + "\n";
  await fs2.appendFile(transcriptPath, line, "utf8");
  return getConversationDetail(id);
}
async function createConversation(prompt, modelId) {
  if (!isSDKAvailable()) {
    return null;
  }
  try {
    const sdk = getSDK();
    const sdkModelNum = modelId ? _resolveModelNumeric(modelId) : void 0;
    const createOpts = { text: prompt };
    if (sdkModelNum !== void 0) {
      createOpts.model = sdkModelNum;
    }
    const cascadeId = await sdk.ls.createCascade(createOpts);
    return cascadeId;
  } catch (err) {
    console.error("[ACC] Failed to create conversation via SDK:", err);
    try {
      const sdk = getSDK();
      const id = await sdk.cascade.createBackgroundSession(prompt);
      return id;
    } catch (err2) {
      console.error("[ACC] Fallback createBackgroundSession also failed:", err2);
      return null;
    }
  }
}
async function focusConversation(id) {
  if (!isSDKAvailable()) {
    return false;
  }
  try {
    const sdk = getSDK();
    try {
      await sdk.ls.focusCascade(id);
    } catch (_) {
      await sdk.cascade.focusSession(id);
    }
    return true;
  } catch (err) {
    console.error("[ACC] Failed to focus conversation:", err);
    return false;
  }
}
async function renameConversation(id, newTitle) {
  const trimmedTitle = newTitle.trim();
  let sdkRenameSucceeded = false;
  if (isSDKAvailable()) {
    const sdk = getSDK();
    if (sdk.ls) {
      console.log(`[ACC] LS bridge state: isReady=${sdk.ls.isReady}, port=${sdk.ls.port}, csrf=${sdk.ls.hasCsrfToken}`);
      if (sdk.ls.isReady) {
        try {
          await sdk.ls.setTitle(id, trimmedTitle);
          console.log(`[ACC] \u2705 Renamed "${id.substring(0, 8)}..." to "${trimmedTitle}" via ls.setTitle()`);
          sdkRenameSucceeded = true;
        } catch (err) {
          const errMsg = err?.message || "";
          console.warn("[ACC] ls.setTitle() failed:", errMsg);
          if (errMsg.includes("403") || errMsg.includes("CSRF") || errMsg.includes("csrf")) {
            console.log("[ACC] CSRF token invalid. Attempting manual LS discovery...");
            const freshConn = await _discoverLSConnection();
            if (freshConn) {
              sdk.ls.setConnection(freshConn.port, freshConn.csrfToken, freshConn.useTls);
              console.log(`[ACC] LS connection reset: port=${freshConn.port}, tls=${freshConn.useTls}`);
              try {
                await sdk.ls.setTitle(id, trimmedTitle);
                console.log(`[ACC] \u2705 Renamed via ls.setTitle() after CSRF refresh`);
                sdkRenameSucceeded = true;
              } catch (retryErr) {
                console.warn("[ACC] ls.setTitle() retry failed:", retryErr?.message || retryErr);
              }
            }
          }
          if (!sdkRenameSucceeded) {
            try {
              await sdk.ls.updateAnnotations(id, { title: trimmedTitle }, true);
              console.log(`[ACC] \u2705 Renamed via ls.updateAnnotations()`);
              sdkRenameSucceeded = true;
            } catch (err2) {
              console.warn("[ACC] ls.updateAnnotations() also failed:", err2?.message || err2);
            }
          }
        }
      } else {
        console.warn("[ACC] LS bridge not ready. Attempting manual discovery...");
        const freshConn = await _discoverLSConnection();
        if (freshConn) {
          sdk.ls.setConnection(freshConn.port, freshConn.csrfToken, freshConn.useTls);
          try {
            await sdk.ls.setTitle(id, trimmedTitle);
            console.log(`[ACC] \u2705 Renamed via ls.setTitle() after manual connect`);
            sdkRenameSucceeded = true;
          } catch (manualErr) {
            console.warn("[ACC] Manual connect rename failed:", manualErr?.message || manualErr);
          }
        }
      }
    }
    if (sdk.integration?.titles) {
      try {
        sdk.integration.titles.rename(id, trimmedTitle);
      } catch (_) {
      }
    }
  }
  const brainDir = getBrainDirectory();
  const overridePath = path2.join(brainDir, id, "title_override.txt");
  await fs2.writeFile(overridePath, trimmedTitle, "utf8");
  if (sdkRenameSucceeded) {
    console.log(`[ACC] Rename complete (SDK + filesystem)`);
  } else {
    console.log(`[ACC] Renamed conversation ${id} via filesystem fallback only`);
  }
}
async function _discoverLSConnection() {
  try {
    const { execSync } = require("child_process");
    const psOutput = execSync(
      `ps aux | grep 'language_server_macos' | grep -v grep`,
      { encoding: "utf8", timeout: 3e3 }
    );
    if (!psOutput.trim()) {
      console.warn("[ACC] No LS process found");
      return null;
    }
    const lines = psOutput.trim().split("\n");
    const wsFolder = vscode4.workspace.workspaceFolders?.[0]?.uri?.fsPath || "";
    const wsKey = wsFolder.replace(/\//g, "_");
    let bestLine = lines[0];
    for (const line of lines) {
      if (wsKey && line.includes(wsKey)) {
        bestLine = line;
        break;
      }
      if (line.includes("--enable_lsp")) {
        bestLine = line;
      }
    }
    const pidMatch = bestLine.match(/\S+\s+(\d+)/);
    const csrfMatch = bestLine.match(/--csrf_token\s+([^\s]+)/);
    const extPortMatch = bestLine.match(/--extension_server_port\s+(\d+)/);
    const pid = pidMatch ? parseInt(pidMatch[1], 10) : 0;
    const connectCsrf = csrfMatch?.[1] || "";
    const extPort = extPortMatch ? parseInt(extPortMatch[1], 10) : 0;
    console.log(`[ACC] Manual LS: PID=${pid}, csrf=${connectCsrf ? connectCsrf.substring(0, 8) + "..." : "missing"}, extPort=${extPort}`);
    if (!pid || !connectCsrf) {
      console.warn("[ACC] Missing PID or CSRF token");
      return null;
    }
    try {
      const lsofOutput = execSync(
        `lsof -anP -iTCP -sTCP:LISTEN -p ${pid} 2>/dev/null`,
        { encoding: "utf8", timeout: 3e3 }
      );
      const lsofLines = lsofOutput.trim().split("\n").filter((l) => l.includes("LISTEN"));
      const ports = [];
      for (const ll of lsofLines) {
        const pm = ll.match(/:(\d+)\s/);
        if (pm) {
          const p = parseInt(pm[1], 10);
          if (p !== extPort) {
            ports.push(p);
          }
        }
      }
      console.log(`[ACC] ConnectRPC candidate ports (excl ext ${extPort}): [${ports.join(", ")}]`);
      if (ports.length > 0) {
        const http = require("http");
        const https = require("https");
        for (const port of ports) {
          const result = await _probePort(http, port, connectCsrf);
          if (result === 200) {
            console.log(`[ACC] \u2705 Port ${port} is ConnectRPC (HTTP)`);
            return { port, csrfToken: connectCsrf, useTls: false };
          }
        }
        for (const port of ports) {
          const result = await _probePort(https, port, connectCsrf, true);
          if (result === 200) {
            console.log(`[ACC] \u2705 Port ${port} is ConnectRPC (HTTPS)`);
            return { port, csrfToken: connectCsrf, useTls: true };
          }
        }
        console.warn(`[ACC] No port responded 200 to ConnectRPC probe`);
      }
    } catch (lsofErr) {
      console.warn("[ACC] lsof failed:", lsofErr?.message);
    }
    console.warn("[ACC] No ConnectRPC port found");
    return null;
  } catch (err) {
    console.warn("[ACC] Manual LS discovery failed:", err?.message || err);
    return null;
  }
}
function _probePort(httpModule, port, csrfToken, useTls = false) {
  const protocol = useTls ? "https" : "http";
  return new Promise((resolve2) => {
    try {
      const req = httpModule.request(
        `${protocol}://127.0.0.1:${port}/exa.language_server_pb.LanguageServerService/GetUserStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": 2,
            "x-codeium-csrf-token": csrfToken
          },
          rejectUnauthorized: false,
          timeout: 2e3
        },
        (res) => {
          res.on("data", () => {
          });
          res.on("end", () => resolve2(res.statusCode));
        }
      );
      req.on("error", () => resolve2(0));
      req.on("timeout", () => {
        req.destroy();
        resolve2(0);
      });
      req.write("{}");
      req.end();
    } catch {
      resolve2(0);
    }
  });
}
async function acceptStep() {
  if (!isSDKAvailable()) {
    return false;
  }
  try {
    await getSDK().cascade.acceptStep();
    return true;
  } catch (_) {
    return false;
  }
}
async function rejectStep() {
  if (!isSDKAvailable()) {
    return false;
  }
  try {
    await getSDK().cascade.rejectStep();
    return true;
  } catch (_) {
    return false;
  }
}
async function acceptTerminalCommand() {
  if (!isSDKAvailable()) {
    return false;
  }
  try {
    await getSDK().cascade.acceptTerminalCommand();
    return true;
  } catch (_) {
    return false;
  }
}
async function rejectTerminalCommand() {
  if (!isSDKAvailable()) {
    return false;
  }
  try {
    await getSDK().cascade.rejectTerminalCommand();
    return true;
  } catch (_) {
    return false;
  }
}
async function runTerminalCommand() {
  if (!isSDKAvailable()) {
    return false;
  }
  try {
    await getSDK().cascade.runTerminalCommand();
    return true;
  } catch (_) {
    return false;
  }
}

// src/providers/mcpProvider.ts
var path3 = __toESM(require("path"));
async function getMcpServers() {
  const mcpDir = getMcpDirectory();
  const subdirs = await getSubDirectories(mcpDir);
  const servers = [];
  for (const name of subdirs) {
    const serverPath = path3.join(mcpDir, name);
    const files = await safeReadDir(serverPath);
    const eagerTools = [];
    const lazyTools = [];
    const jsonFiles = files.filter((f) => f.endsWith(".json") && f !== "package.json");
    for (const jsonFile of jsonFiles) {
      const toolFilePath = path3.join(serverPath, jsonFile);
      const schema = await safeReadJson(toolFilePath);
      if (schema) {
        const toolName = schema.name || jsonFile.replace(/\.json$/, "");
        const description = schema.description || "No description provided.";
        const parameters = schema.parameters || schema.inputSchema || {};
        const isEager = schema.isEager || false;
        const tool = {
          name: toolName,
          description,
          parameters,
          isEager
        };
        if (isEager) {
          eagerTools.push(tool);
        } else {
          lazyTools.push(tool);
        }
      }
    }
    const instructionsPath = path3.join(serverPath, "instructions.md");
    const hasInstructions = await fileExists(instructionsPath);
    let instructions = void 0;
    if (hasInstructions) {
      instructions = await safeReadFile(instructionsPath) || void 0;
    }
    servers.push({
      name,
      toolCount: eagerTools.length + lazyTools.length,
      eagerTools,
      lazyTools,
      hasInstructions,
      instructions
    });
  }
  return servers.sort((a, b) => a.name.localeCompare(b.name));
}
async function getMcpToolDetail(serverName, toolName) {
  const mcpDir = getMcpDirectory();
  const toolFilePath = path3.join(mcpDir, serverName, `${toolName}.json`);
  const schema = await safeReadJson(toolFilePath);
  if (!schema) {
    return null;
  }
  return {
    name: schema.name || toolName,
    description: schema.description || "No description provided.",
    parameters: schema.parameters || schema.inputSchema || {},
    isEager: schema.isEager || false
  };
}

// src/providers/skillProvider.ts
var path4 = __toESM(require("path"));

// src/utils/markdownParser.ts
var import_gray_matter = __toESM(require_gray_matter());
function parseMarkdown(raw) {
  if (!raw) {
    return { metadata: {}, content: "" };
  }
  try {
    const { data, content } = (0, import_gray_matter.default)(raw);
    return {
      metadata: data,
      content: content.trim()
    };
  } catch (error) {
    return {
      metadata: {},
      content: raw.trim()
    };
  }
}
function extractTitle(raw, filename) {
  const parsed = parseMarkdown(raw);
  if (parsed.metadata.name) {
    return parsed.metadata.name;
  }
  if (parsed.metadata.title) {
    return parsed.metadata.title;
  }
  const headingMatch = parsed.content.match(/^#\s+(.+)$/m);
  if (headingMatch && headingMatch[1]) {
    return headingMatch[1].trim();
  }
  if (filename) {
    const withoutExt = filename.replace(/\.md$/, "");
    return withoutExt.split(/[-_]+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }
  const firstLine = parsed.content.split("\n")[0]?.trim() || "";
  if (firstLine.length > 0) {
    return firstLine.substring(0, 50) + (firstLine.length > 50 ? "..." : "");
  }
  return "Untitled Markdown";
}

// src/providers/skillProvider.ts
async function getWorkspaceSkills() {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const skillsDir = path4.join(agentsDir, "skills");
  const subdirs = await getSubDirectories(skillsDir);
  const skills = [];
  for (const name of subdirs) {
    const skillPath = path4.join(skillsDir, name);
    const skillMdPath = path4.join(skillPath, "SKILL.md");
    if (!await fileExists(skillMdPath)) {
      continue;
    }
    const rawContent = await safeReadFile(skillMdPath) || "";
    const parsed = parseMarkdown(rawContent);
    const files = await safeReadDir(skillPath);
    const hasScripts = files.includes("scripts");
    const hasExamples = files.includes("examples");
    const hasReferences = files.includes("references");
    skills.push({
      name: parsed.metadata.name || name,
      description: parsed.metadata.description || "No description provided.",
      source: "workspace",
      sourcePath: skillPath,
      content: parsed.content,
      hasScripts,
      hasExamples,
      hasReferences,
      files: files.filter((f) => !f.startsWith("."))
    });
  }
  return skills;
}
async function getGlobalSkills() {
  const pluginsDir = getGlobalPluginsDirectory();
  const plugins = await getSubDirectories(pluginsDir);
  const skills = [];
  for (const pluginName of plugins) {
    const skillsDir = path4.join(pluginsDir, pluginName, "skills");
    const subdirs = await getSubDirectories(skillsDir);
    for (const name of subdirs) {
      const skillPath = path4.join(skillsDir, name);
      const skillMdPath = path4.join(skillPath, "SKILL.md");
      if (!await fileExists(skillMdPath)) {
        continue;
      }
      const rawContent = await safeReadFile(skillMdPath) || "";
      const parsed = parseMarkdown(rawContent);
      const files = await safeReadDir(skillPath);
      const hasScripts = files.includes("scripts");
      const hasExamples = files.includes("examples");
      const hasReferences = files.includes("references");
      skills.push({
        name: parsed.metadata.name || name,
        description: parsed.metadata.description || "No description provided.",
        source: "plugin",
        pluginName,
        sourcePath: skillPath,
        content: parsed.content,
        hasScripts,
        hasExamples,
        hasReferences,
        files: files.filter((f) => !f.startsWith("."))
      });
    }
  }
  return skills;
}
async function getAllSkills() {
  const workspaceSkills = await getWorkspaceSkills();
  const globalSkills = await getGlobalSkills();
  return [...workspaceSkills, ...globalSkills].sort((a, b) => a.name.localeCompare(b.name));
}

// src/providers/agentProvider.ts
var path5 = __toESM(require("path"));
async function getAgents() {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const agentsConfigDir = path5.join(agentsDir, "agents");
  const files = await safeReadDir(agentsConfigDir);
  const agentFiles = files.filter((f) => f.endsWith(".md") || f.endsWith(".yaml") || f.endsWith(".yml"));
  const agents = [];
  for (const filename of agentFiles) {
    const filePath = path5.join(agentsConfigDir, filename);
    const rawContent = await safeReadFile(filePath) || "";
    const parsed = parseMarkdown(rawContent);
    const name = parsed.metadata.name || filename.replace(/\.(md|yaml|yml)$/, "");
    const description = parsed.metadata.description || "";
    const model = parsed.metadata.model || "";
    let skills = [];
    if (Array.isArray(parsed.metadata.skills)) {
      skills = parsed.metadata.skills;
    } else if (typeof parsed.metadata.skills === "string") {
      skills = parsed.metadata.skills.split(",").map((s) => s.trim());
    }
    let tools = [];
    if (Array.isArray(parsed.metadata.tools)) {
      tools = parsed.metadata.tools;
    } else if (typeof parsed.metadata.tools === "string") {
      tools = parsed.metadata.tools.split(",").map((t) => t.trim());
    }
    agents.push({
      name,
      description,
      model,
      skills,
      tools,
      sourcePath: filePath,
      content: parsed.content
    });
  }
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}

// src/providers/ruleProvider.ts
var path6 = __toESM(require("path"));
async function getRules() {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const rulesDir = path6.join(agentsDir, "rules");
  const files = await safeReadDir(rulesDir);
  const mdFiles = files.filter((f) => f.endsWith(".md"));
  const rules = [];
  for (const filename of mdFiles) {
    const filePath = path6.join(rulesDir, filename);
    const rawContent = await safeReadFile(filePath) || "";
    const name = extractTitle(rawContent, filename);
    const stripped = rawContent.replace(/[#*`_\[\]()]/g, "").replace(/\s+/g, " ").trim();
    const preview = stripped.substring(0, 200) + (stripped.length > 200 ? "..." : "");
    rules.push({
      name,
      filename,
      content: rawContent,
      sourcePath: filePath,
      preview,
      scope: "workspace"
    });
  }
  return rules.sort((a, b) => a.name.localeCompare(b.name));
}

// src/providers/workflowProvider.ts
var path7 = __toESM(require("path"));
async function getWorkflows() {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const workflowsDir = path7.join(agentsDir, "workflows");
  const files = await safeReadDir(workflowsDir);
  const mdFiles = files.filter((f) => f.endsWith(".md"));
  const workflows = [];
  for (const filename of mdFiles) {
    const filePath = path7.join(workflowsDir, filename);
    const rawContent = await safeReadFile(filePath) || "";
    const parsed = parseMarkdown(rawContent);
    const name = extractTitle(rawContent, filename);
    const slashCommand = "/" + filename.replace(/\.md$/, "");
    let description = parsed.metadata.description || "";
    if (!description) {
      const paragraphs = parsed.content.split("\n\n").map((p) => p.trim()).filter(Boolean);
      const firstPara = paragraphs.find((p) => !p.startsWith("#") && !p.startsWith(">"));
      if (firstPara) {
        description = firstPara.substring(0, 150) + (firstPara.length > 150 ? "..." : "");
      } else {
        description = "Agent workflow guide.";
      }
    }
    workflows.push({
      name,
      slashCommand,
      filename,
      description,
      content: rawContent,
      sourcePath: filePath
    });
  }
  return workflows.sort((a, b) => a.slashCommand.localeCompare(b.slashCommand));
}

// src/providers/knowledgeProvider.ts
var path8 = __toESM(require("path"));
async function getKnowledgeItems() {
  const knowDir = getKnowledgeDirectory();
  const subdirs = await getSubDirectories(knowDir);
  const items = [];
  for (const id of subdirs) {
    const basePath = path8.join(knowDir, id);
    const metadataPath = path8.join(basePath, "metadata.json");
    const metadata = await safeReadJson(metadataPath);
    if (metadata) {
      const title = metadata.title || id;
      const summary = metadata.summary || "No summary available.";
      const lastAccessed = metadata.last_accessed || metadata.timestamp || "";
      const references = Array.isArray(metadata.references) ? metadata.references : [];
      const artifactsDir = path8.join(basePath, "artifacts");
      const artifactsFiles = await safeReadDir(artifactsDir);
      items.push({
        id,
        title,
        summary,
        lastAccessed,
        references,
        artifactPaths: artifactsFiles.filter((f) => !f.startsWith(".")),
        basePath
      });
    }
  }
  return items.sort((a, b) => {
    return new Date(b.lastAccessed || 0).getTime() - new Date(a.lastAccessed || 0).getTime();
  });
}

// src/services/modelCatalog.ts
var FALLBACK_MODELS = [
  { id: "gemini-3.5-flash-medium", label: "Gemini 3.5 Flash (Medium)", quality: "Medium", category: "Fast" },
  { id: "gemini-3.5-flash-high", label: "Gemini 3.5 Flash (High)", quality: "High", category: "Fast" },
  { id: "gemini-3.5-flash-low", label: "Gemini 3.5 Flash (Low)", quality: "Low", category: "Fast" },
  { id: "gemini-3.1-pro-low", label: "Gemini 3.1 Pro (Low)", quality: "Low", category: "Balanced" },
  { id: "gemini-3.1-pro-high", label: "Gemini 3.1 Pro (High)", quality: "High", category: "Balanced" },
  { id: "claude-sonnet-4.6", label: "Claude Sonnet 4.6 (Thinking)", quality: "Medium", category: "Thoughtful" },
  { id: "claude-opus-4.6", label: "Claude Opus 4.6 (Thinking)", quality: "High", category: "Thoughtful" },
  { id: "gpt-oss-120b", label: "GPT-OSS 120B (Medium)", quality: "Medium", category: "Balanced" }
];
var SDK_MODEL_MAP = {
  "GEMINI_FLASH": { id: "gemini-3.5-flash-medium", label: "Gemini 3.5 Flash (Medium)", quality: "Medium", category: "Fast" },
  "GEMINI_FLASH_HIGH": { id: "gemini-3.5-flash-high", label: "Gemini 3.5 Flash (High)", quality: "High", category: "Fast" },
  "GEMINI_FLASH_LOW": { id: "gemini-3.5-flash-low", label: "Gemini 3.5 Flash (Low)", quality: "Low", category: "Fast" },
  "GEMINI_PRO": { id: "gemini-3.1-pro-low", label: "Gemini 3.1 Pro (Low)", quality: "Low", category: "Balanced" },
  "GEMINI_PRO_HIGH": { id: "gemini-3.1-pro-high", label: "Gemini 3.1 Pro (High)", quality: "High", category: "Balanced" },
  "CLAUDE_SONNET": { id: "claude-sonnet-4.6", label: "Claude Sonnet 4.6 (Thinking)", quality: "Medium", category: "Thoughtful" },
  "CLAUDE_OPUS": { id: "claude-opus-4.6", label: "Claude Opus 4.6 (Thinking)", quality: "High", category: "Thoughtful" },
  "GPT_OSS": { id: "gpt-oss-120b", label: "GPT-OSS 120B (Medium)", quality: "Medium", category: "Balanced" }
};
function getModelCatalog() {
  if (isSDKAvailable()) {
    try {
      const sdkModels = require_dist().Models;
      if (sdkModels) {
        const entries = [];
        for (const [key, _value] of Object.entries(sdkModels)) {
          const mapped = SDK_MODEL_MAP[key];
          if (mapped) {
            entries.push(mapped);
          }
        }
        if (entries.length > 0) {
          return entries;
        }
      }
    } catch (_) {
    }
  }
  return FALLBACK_MODELS;
}
function getDefaultModel() {
  const catalog = getModelCatalog();
  return catalog[0];
}

// src/services/sdkMonitorService.ts
var SDKMonitorService = class {
  _started = false;
  _callbacks;
  constructor(callbacks) {
    this._callbacks = callbacks;
  }
  /**
   * Start the SDK event monitor.
   *
   * @param ussPollMs   Interval for polling USS state (default 3000ms)
   * @param trajPollMs  Interval for polling trajectory state (default 5000ms)
   */
  start(ussPollMs = 3e3, trajPollMs = 5e3) {
    if (this._started || !isSDKAvailable()) {
      return;
    }
    const sdk = getSDK();
    if (this._callbacks.onStepCountChanged) {
      sdk.monitor.onStepCountChanged((e) => {
        this._callbacks.onStepCountChanged({
          sessionId: e.id || e.sessionId || "",
          title: e.title || "",
          newCount: e.newCount || 0,
          delta: e.delta || 0
        });
      });
    }
    if (this._callbacks.onActiveSessionChanged) {
      sdk.monitor.onActiveSessionChanged((e) => {
        this._callbacks.onActiveSessionChanged({
          sessionId: e.id || e.sessionId || "",
          title: e.title || ""
        });
      });
    }
    if (this._callbacks.onNewConversation) {
      sdk.monitor.onNewConversation(() => {
        this._callbacks.onNewConversation();
      });
    }
    if (this._callbacks.onStateChanged) {
      sdk.monitor.onStateChanged((e) => {
        this._callbacks.onStateChanged({
          key: e.key || "",
          previousSize: e.previousSize || 0,
          newSize: e.newSize || 0
        });
      });
    }
    sdk.monitor.start(ussPollMs, trajPollMs);
    this._started = true;
    console.log(`[ACC-SDK] Monitor started (USS: ${ussPollMs}ms, Trajectory: ${trajPollMs}ms)`);
  }
  /**
   * Stop monitoring without disposing.
   */
  stop() {
    if (!this._started || !isSDKAvailable()) {
      return;
    }
    try {
      const sdk = getSDK();
      sdk.monitor.stop();
    } catch (_) {
    }
    this._started = false;
    console.log("[ACC-SDK] Monitor stopped");
  }
  /**
   * Full cleanup.
   */
  dispose() {
    this.stop();
  }
  get isRunning() {
    return this._started;
  }
};

// src/services/preferencesService.ts
async function getAgentPreferences() {
  if (!isSDKAvailable()) {
    return null;
  }
  try {
    const sdk = getSDK();
    const prefs = await sdk.cascade.getPreferences();
    return {
      terminalExecutionPolicy: prefs.terminalExecutionPolicy || "UNKNOWN",
      artifactReviewPolicy: prefs.artifactReviewPolicy || "UNKNOWN",
      secureModeEnabled: prefs.secureModeEnabled ?? false,
      terminalSandboxEnabled: prefs.terminalSandboxEnabled ?? false,
      shellIntegrationEnabled: prefs.shellIntegrationEnabled ?? false,
      allowNonWorkspaceFiles: prefs.allowNonWorkspaceFiles ?? false,
      ...prefs
    };
  } catch (err) {
    console.error("[ACC-SDK] Failed to read preferences:", err);
    return null;
  }
}
async function getSystemDiagnostics() {
  if (!isSDKAvailable()) {
    return null;
  }
  try {
    const sdk = getSDK();
    const diag = await sdk.cascade.getDiagnostics();
    let mcpUrl = null;
    try {
      mcpUrl = await sdk.cascade.getMcpUrl();
    } catch (_) {
    }
    let browserPort = null;
    try {
      browserPort = await sdk.cascade.getBrowserPort();
    } catch (_) {
    }
    return {
      operatingSystem: diag?.systemInfo?.operatingSystem || "Unknown",
      userName: diag?.systemInfo?.userName || "Unknown",
      isRemote: diag?.isRemote ?? false,
      mcpUrl,
      browserPort
    };
  } catch (err) {
    console.error("[ACC-SDK] Failed to read diagnostics:", err);
    return null;
  }
}

// src/services/conversationWatcher.ts
var fs3 = __toESM(require("fs"));
var ConversationWatcher = class {
  _watchers = /* @__PURE__ */ new Map();
  _callback;
  _debounceTimers = /* @__PURE__ */ new Map();
  constructor(callback) {
    this._callback = callback;
  }
  /**
   * Start watching a specific conversation's transcript file.
   * Safe to call multiple times — re-watches if file has changed.
   */
  watch(conversationId, transcriptPath) {
    if (this._watchers.has(conversationId)) {
      return;
    }
    try {
      const stat2 = fs3.statSync(transcriptPath);
      const entry = {
        watcher: null,
        lastSize: stat2.size,
        transcriptPath
      };
      const watcher = fs3.watch(transcriptPath, { persistent: false }, (eventType) => {
        if (eventType === "change") {
          this._debouncedCheck(conversationId, entry);
        }
      });
      watcher.on("error", () => {
        this.unwatch(conversationId);
      });
      entry.watcher = watcher;
      this._watchers.set(conversationId, entry);
    } catch (_e) {
    }
  }
  /**
   * Stop watching a specific conversation.
   */
  unwatch(conversationId) {
    const existing = this._watchers.get(conversationId);
    if (existing) {
      existing.watcher?.close();
      this._watchers.delete(conversationId);
    }
    const timer = this._debounceTimers.get(conversationId);
    if (timer) {
      clearTimeout(timer);
      this._debounceTimers.delete(conversationId);
    }
  }
  /**
   * Stop watching ALL conversations and clean up.
   */
  disposeAll() {
    for (const id of this._watchers.keys()) {
      this.unwatch(id);
    }
  }
  /**
   * Returns the set of currently watched conversation IDs.
   */
  watchedIds() {
    return Array.from(this._watchers.keys());
  }
  // -----------------------------------------------------------------------
  // Private helpers
  // -----------------------------------------------------------------------
  _debouncedCheck(conversationId, entry) {
    const existing = this._debounceTimers.get(conversationId);
    if (existing) {
      clearTimeout(existing);
    }
    const timer = setTimeout(() => {
      this._debounceTimers.delete(conversationId);
      this._checkForNewSteps(conversationId, entry);
    }, 150);
    this._debounceTimers.set(conversationId, timer);
  }
  _checkForNewSteps(conversationId, entry) {
    try {
      const stat2 = fs3.statSync(entry.transcriptPath);
      if (stat2.size <= entry.lastSize) {
        return;
      }
      const fd = fs3.openSync(entry.transcriptPath, "r");
      const newByteCount = stat2.size - entry.lastSize;
      const buf = Buffer.alloc(newByteCount);
      fs3.readSync(fd, buf, 0, newByteCount, entry.lastSize);
      fs3.closeSync(fd);
      entry.lastSize = stat2.size;
      const newContent = buf.toString("utf8");
      const newSteps = parseJsonl(newContent);
      if (newSteps.length > 0) {
        const fullContent = fs3.readFileSync(entry.transcriptPath, "utf8");
        const allSteps = parseJsonl(fullContent);
        this._callback({
          conversationId,
          newSteps,
          totalStepCount: allSteps.length
        });
      }
    } catch (_e) {
    }
  }
};

// src/webview/webviewManager.ts
var WebviewManager = class {
  constructor(_context) {
    this._context = _context;
    const extensionUri = _context.extensionUri;
    this._panel = vscode5.window.createWebviewPanel(
      "controlCenter",
      "\u26A1 Antigravity Control Center",
      vscode5.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode5.Uri.joinPath(extensionUri, "media")
        ]
      }
    );
    const iconUri = vscode5.Uri.joinPath(extensionUri, "media", "icons", "acc_logo.png");
    this._panel.iconPath = {
      light: iconUri,
      dark: iconUri
    };
    this._panel.webview.html = getWebviewContent(this._panel.webview, extensionUri);
    this._initializeMonitoring();
    this._panel.webview.onDidReceiveMessage(
      (message) => this._handleMessage(message),
      null,
      this._disposables
    );
    this._panel.onDidDispose(
      () => this.dispose(),
      null,
      this._disposables
    );
  }
  _panel;
  _disposables = [];
  _onDidDisposeEmitter = new vscode5.EventEmitter();
  onDidDispose = this._onDidDisposeEmitter.event;
  /** SDK-based real-time event monitor (primary) */
  _sdkMonitor = null;
  /** Legacy file-based transcript watcher (fallback) */
  _legacyWatcher = null;
  /** Track which conversation IDs are actively watched (legacy mode) */
  _watchedConversations = /* @__PURE__ */ new Set();
  reveal() {
    this._panel.reveal(vscode5.ViewColumn.One);
  }
  // ── Monitoring Setup ──────────────────────────────────────────────────────
  _initializeMonitoring() {
    this._legacyWatcher = new ConversationWatcher((event) => {
      this._postMessage({
        type: "stream:conversationSteps",
        payload: {
          id: event.conversationId,
          newSteps: event.newSteps,
          totalStepCount: event.totalStepCount
        }
      });
    });
    console.log("[ACC] Filesystem watcher initialized for real-time step content");
    if (isSDKAvailable()) {
      this._sdkMonitor = new SDKMonitorService({
        onStepCountChanged: (_event) => {
        },
        onActiveSessionChanged: (event) => {
          this._postMessage({
            type: "stream:activeSessionChanged",
            payload: {
              id: event.sessionId,
              title: event.title
            }
          });
        },
        onNewConversation: () => {
          this._postMessage({
            type: "stream:newConversation",
            payload: {}
          });
        },
        onStateChanged: (event) => {
          this._postMessage({
            type: "stream:stateChanged",
            payload: event
          });
        }
      });
      this._sdkMonitor.start();
      console.log("[ACC] SDK EventMonitor started for session-level events");
    }
  }
  // ── Message Handler ────────────────────────────────────────────────────────
  async _handleMessage(message) {
    try {
      switch (message.type) {
        case "request:sdkStatus": {
          this._postMessage({
            type: "data:sdkStatus",
            payload: {
              available: isSDKAvailable(),
              error: getSDKInitError(),
              mode: isSDKAvailable() ? "sdk" : "filesystem"
            }
          });
          break;
        }
        case "request:conversations": {
          const list = await getConversations();
          this._postMessage({ type: "data:conversations", payload: list });
          break;
        }
        case "request:conversationDetail": {
          const id = message.payload;
          const detail = await getConversationDetail(id);
          if (detail) {
            this._postMessage({ type: "data:conversationDetail", payload: detail });
            this._startLegacyWatching(id);
          } else {
            this._postMessage({ type: "error:conversationDetail", payload: "Conversation log not found." });
          }
          break;
        }
        case "request:watchConversation": {
          const id = message.payload;
          this._startLegacyWatching(id);
          break;
        }
        case "request:unwatchConversation": {
          const id = message.payload;
          this._legacyWatcher?.unwatch(id);
          this._watchedConversations.delete(id);
          break;
        }
        case "request:modelCatalog": {
          const models = getModelCatalog();
          const defaultModel = getDefaultModel();
          this._postMessage({
            type: "data:modelCatalog",
            payload: { models, defaultModel }
          });
          break;
        }
        case "request:sendMessage": {
          const { id, prompt, model } = message.payload;
          const detail = await sendConversationMessage(id, prompt, model);
          if (detail) {
            this._postMessage({ type: "data:conversationDetail", payload: detail });
          }
          break;
        }
        case "request:createConversation": {
          const { prompt, model } = message.payload;
          const newId = await createConversation(prompt, model);
          if (newId) {
            this._postMessage({
              type: "action:createConversationSuccess",
              payload: { id: newId }
            });
            const list = await getConversations();
            this._postMessage({ type: "data:conversations", payload: list });
          } else {
            this._postMessage({
              type: "error:conversations",
              payload: "Failed to create conversation. SDK may not be available."
            });
          }
          break;
        }
        case "request:focusConversation": {
          const focusId = message.payload;
          const focused = await focusConversation(focusId);
          this._postMessage({
            type: "action:focusConversationSuccess",
            payload: { id: focusId, success: focused }
          });
          break;
        }
        case "request:acceptStep": {
          const success = await acceptStep();
          this._postMessage({ type: "action:stepControlResult", payload: { action: "acceptStep", success } });
          break;
        }
        case "request:rejectStep": {
          const success = await rejectStep();
          this._postMessage({ type: "action:stepControlResult", payload: { action: "rejectStep", success } });
          break;
        }
        case "request:acceptTerminalCommand": {
          const success = await acceptTerminalCommand();
          this._postMessage({ type: "action:stepControlResult", payload: { action: "acceptTerminalCommand", success } });
          break;
        }
        case "request:rejectTerminalCommand": {
          const success = await rejectTerminalCommand();
          this._postMessage({ type: "action:stepControlResult", payload: { action: "rejectTerminalCommand", success } });
          break;
        }
        case "request:runTerminalCommand": {
          const success = await runTerminalCommand();
          this._postMessage({ type: "action:stepControlResult", payload: { action: "runTerminalCommand", success } });
          break;
        }
        case "request:agentPreferences": {
          const prefs = await getAgentPreferences();
          this._postMessage({
            type: "data:agentPreferences",
            payload: prefs
          });
          break;
        }
        case "request:systemDiagnostics": {
          const diag = await getSystemDiagnostics();
          this._postMessage({
            type: "data:systemDiagnostics",
            payload: diag
          });
          break;
        }
        case "request:renameConversation": {
          const { id, newTitle } = message.payload;
          await renameConversation(id, newTitle);
          const list = await getConversations();
          this._postMessage({ type: "data:conversations", payload: list });
          this._postMessage({
            type: "action:renameSuccess",
            payload: { id, newTitle }
          });
          break;
        }
        case "request:mcpServers": {
          const servers = await getMcpServers();
          this._postMessage({ type: "data:mcpServers", payload: servers });
          break;
        }
        case "request:mcpToolDetail": {
          const { serverName, toolName } = message.payload;
          const detail = await getMcpToolDetail(serverName, toolName);
          if (detail) {
            this._postMessage({ type: "data:mcpToolDetail", payload: { serverName, tool: detail } });
          } else {
            this._postMessage({ type: "error:mcpServers", payload: "Tool schema not found." });
          }
          break;
        }
        case "request:skills": {
          const skills = await getAllSkills();
          this._postMessage({ type: "data:skills", payload: skills });
          break;
        }
        case "request:agents": {
          const agents = await getAgents();
          this._postMessage({ type: "data:agents", payload: agents });
          break;
        }
        case "request:rules": {
          const rules = await getRules();
          this._postMessage({ type: "data:rules", payload: rules });
          break;
        }
        case "request:workflows": {
          const workflows = await getWorkflows();
          this._postMessage({ type: "data:workflows", payload: workflows });
          break;
        }
        case "request:knowledge": {
          const items = await getKnowledgeItems();
          this._postMessage({ type: "data:knowledge", payload: items });
          break;
        }
        case "request:settings": {
          const config = vscode5.workspace.getConfiguration("controlCenter");
          const openMode = config.get("openMode") || "webview";
          const defaultTab = config.get("defaultTab") || "conversations";
          const dataDirectory = getDataDirectory();
          const exists = await directoryExists(dataDirectory);
          this._postMessage({
            type: "data:settings",
            payload: {
              openMode,
              defaultTab,
              dataDirectory,
              directoryExists: exists,
              sdkAvailable: isSDKAvailable(),
              sdkError: getSDKInitError()
            }
          });
          break;
        }
        case "request:saveSettings": {
          const { openMode, defaultTab, dataDirectory } = message.payload;
          const config = vscode5.workspace.getConfiguration("controlCenter");
          await config.update("openMode", openMode, vscode5.ConfigurationTarget.Global);
          await config.update("defaultTab", defaultTab, vscode5.ConfigurationTarget.Global);
          await config.update("dataDirectory", dataDirectory, vscode5.ConfigurationTarget.Global);
          const verifiedDir = getDataDirectory();
          const exists = await directoryExists(verifiedDir);
          this._postMessage({ type: "action:saveSettingsSuccess" });
          this._postMessage({
            type: "data:settings",
            payload: {
              openMode,
              defaultTab,
              dataDirectory: verifiedDir,
              directoryExists: exists,
              sdkAvailable: isSDKAvailable(),
              sdkError: getSDKInitError()
            }
          });
          break;
        }
        case "request:openInEditor": {
          const filePath = message.payload;
          if (await fileExists(filePath)) {
            const doc = await vscode5.workspace.openTextDocument(filePath);
            await vscode5.window.showTextDocument(doc);
          } else {
            vscode5.window.showErrorMessage(`File does not exist: ${filePath}`);
          }
          break;
        }
        case "request:openDirectory": {
          const dirPath = message.payload;
          if (await directoryExists(dirPath)) {
            await vscode5.env.openExternal(vscode5.Uri.file(dirPath));
          } else {
            vscode5.window.showErrorMessage(`Directory does not exist: ${dirPath}`);
          }
          break;
        }
        case "request:popOut": {
          await vscode5.commands.executeCommand("workbench.action.moveEditorToNewWindow");
          break;
        }
        case "request:openUrl": {
          const url = message.payload;
          if (url) {
            await vscode5.env.openExternal(vscode5.Uri.parse(url));
          }
          break;
        }
      }
    } catch (error) {
      console.error("[ACC] Handler error:", error);
      this._postMessage({
        type: `error:${message.type.split(":")[1]}`,
        payload: error.message || "An unknown error occurred."
      });
    }
  }
  // ── Private helpers ───────────────────────────────────────────────────────
  _startLegacyWatching(conversationId) {
    if (this._watchedConversations.has(conversationId) || !this._legacyWatcher) {
      return;
    }
    const transcriptPath = path9.join(
      getBrainDirectory(),
      conversationId,
      ".system_generated",
      "logs",
      "transcript.jsonl"
    );
    this._legacyWatcher.watch(conversationId, transcriptPath);
    this._watchedConversations.add(conversationId);
  }
  _postMessage(message) {
    this._panel.webview.postMessage(message);
  }
  dispose() {
    if (this._sdkMonitor) {
      this._sdkMonitor.dispose();
    }
    if (this._legacyWatcher) {
      this._legacyWatcher.disposeAll();
    }
    this._panel.dispose();
    this._onDidDisposeEmitter.fire();
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
    this._onDidDisposeEmitter.dispose();
  }
};

// src/commands/openControlCenter.ts
var activeManager = void 0;
function openControlCenter(context) {
  if (activeManager) {
    activeManager.reveal();
  } else {
    activeManager = new WebviewManager(context);
    activeManager.onDidDispose(() => {
      activeManager = void 0;
    });
  }
}

// src/extension.ts
var statusBarItem = void 0;
async function activate(context) {
  console.log("\u26A1 Antigravity Control Center Extension is now active!");
  const openCommand = vscode6.commands.registerCommand("controlCenter.open", () => {
    openControlCenter(context);
  });
  context.subscriptions.push(openCommand);
  statusBarItem = vscode6.window.createStatusBarItem(
    vscode6.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = "controlCenter.open";
  statusBarItem.text = "$(dashboard) ACC";
  statusBarItem.tooltip = "Open Antigravity Control Center";
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
  try {
    await initializeSDK(context);
    if (isSDKAvailable()) {
      console.log("\u26A1 [ACC] AntigravitySDK is available \u2014 using SDK-powered features");
      statusBarItem.tooltip = "Open Antigravity Control Center (SDK Connected)";
    } else {
      console.log(`\u26A1 [ACC] AntigravitySDK not available (${getSDKInitError() || "unknown"}) \u2014 using filesystem fallback`);
    }
  } catch (err) {
    console.warn("\u26A1 [ACC] SDK initialization error (non-fatal):", err?.message || err);
  }
}
function deactivate() {
  if (statusBarItem) {
    statusBarItem.dispose();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate,
  deactivate
});
/*! Bundled license information:

is-extendable/index.js:
  (*!
   * is-extendable <https://github.com/jonschlinkert/is-extendable>
   *
   * Copyright (c) 2015, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

strip-bom-string/index.js:
  (*!
   * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
   *
   * Copyright (c) 2015, 2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
*/
//# sourceMappingURL=extension.js.map
