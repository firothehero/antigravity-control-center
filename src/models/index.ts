// Domain Data Models

export interface TranscriptStep {
  step_index: number;
  source: string; // 'USER_EXPLICIT' | 'MODEL' | 'SYSTEM' | 'PLANNER_RESPONSE' etc.
  type: string;   // 'USER_INPUT' | 'PLANNER_RESPONSE' | 'VIEW_FILE' | 'RUN_COMMAND' etc.
  status: string; // 'DONE' | 'ERROR' | 'WAITING' etc.
  content?: string;
  tool_calls?: Array<{
    name: string;
    arguments: Record<string, any>;
    result?: string;
  }>;
}

export interface Conversation {
  id: string;
  title: string;
  summary?: string;
  createdAt?: string;
  lastModified?: string;
  stepCount: number;
  artifactPath: string;
  hasTranscript: boolean;
  project?: string;
}

export interface ConversationDetail extends Conversation {
  steps: TranscriptStep[];
  artifacts: string[];
  userMessages: number;
  agentMessages: number;
  toolCalls: number;
}

export interface McpTool {
  name: string;
  description: string;
  parameters: Record<string, any>;
  isEager: boolean;
}

export interface McpServer {
  name: string;
  toolCount: number;
  eagerTools: McpTool[];
  lazyTools: McpTool[];
  hasInstructions: boolean;
  instructions?: string;
}

export interface Skill {
  name: string;
  description: string;
  source: 'workspace' | 'global' | 'plugin';
  sourcePath: string;
  pluginName?: string;
  content: string;
  hasScripts: boolean;
  hasExamples: boolean;
  hasReferences: boolean;
  files?: string[];
}

export interface Agent {
  name: string;
  description?: string;
  model?: string;
  skills: string[];
  tools: string[];
  sourcePath: string;
  content: string;
}

export interface Rule {
  name: string;
  filename: string;
  content: string;
  sourcePath: string;
  preview: string;
  scope: 'workspace' | 'global';
}

export interface Workflow {
  name: string;
  slashCommand: string;
  filename: string;
  description: string;
  content: string;
  sourcePath: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  summary: string;
  lastAccessed?: string;
  references: string[];
  artifactPaths: string[];
  basePath: string;
}

export interface KnowledgeArtifact {
  relativePath: string;
  absolutePath: string;
  content?: string;
}

// Messaging Protocol between Webview and Extension Host

export type MessageType =
  | 'request:conversations'
  | 'request:conversationDetail'
  | 'request:conversationPage'
  | 'request:mcpServers'
  | 'request:mcpToolDetail'
  | 'request:skills'
  | 'request:agents'
  | 'request:rules'
  | 'request:workflows'
  | 'request:knowledge'
  | 'request:settings'
  | 'request:refresh'
  | 'request:openInEditor'
  | 'request:openDirectory'
  | 'request:saveSettings'
  | 'request:popOut'
  | 'request:sendMessage'
  | 'data:conversations'
  | 'data:conversationDetail'
  | 'data:conversationPage'
  | 'data:mcpServers'
  | 'data:mcpToolDetail'
  | 'data:skills'
  | 'data:agents'
  | 'data:rules'
  | 'data:workflows'
  | 'data:knowledge'
  | 'data:settings'
  | 'error:conversations'
  | 'error:conversationDetail'
  | 'error:mcpServers'
  | 'error:skills'
  | 'error:agents'
  | 'error:rules'
  | 'error:workflows'
  | 'error:knowledge'
  | 'error:settings'
  | 'action:saveSettingsSuccess';

export interface WebviewMessage {
  type: MessageType;
  payload?: any;
}
