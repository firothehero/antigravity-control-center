/**
 * preferencesService.ts — Reads Antigravity agent preferences via SDK.
 *
 * Exposes all 16 agent preferences (terminal policy, secure mode,
 * sandbox config, etc.) and IDE diagnostics (OS, user, remote status).
 */

import { getSDK, isSDKAvailable } from './sdkService';

export interface AgentPreferences {
  terminalExecutionPolicy: string;   // OFF | AUTO | EAGER
  artifactReviewPolicy: string;      // ALWAYS | TURBO | AUTO
  secureModeEnabled: boolean;
  terminalSandboxEnabled: boolean;
  shellIntegrationEnabled: boolean;
  allowNonWorkspaceFiles: boolean;
  // Additional preferences as exposed by the SDK
  [key: string]: any;
}

export interface SystemDiagnostics {
  operatingSystem: string;
  userName: string;
  isRemote: boolean;
  mcpUrl: string | null;
  browserPort: number | null;
}

/**
 * Read all agent preferences from the SDK.
 * Returns null if the SDK is not available.
 */
export async function getAgentPreferences(): Promise<AgentPreferences | null> {
  if (!isSDKAvailable()) {
    return null;
  }

  try {
    const sdk = getSDK();
    const prefs = await sdk.cascade.getPreferences();
    return {
      terminalExecutionPolicy: prefs.terminalExecutionPolicy || 'UNKNOWN',
      artifactReviewPolicy: prefs.artifactReviewPolicy || 'UNKNOWN',
      secureModeEnabled: prefs.secureModeEnabled ?? false,
      terminalSandboxEnabled: prefs.terminalSandboxEnabled ?? false,
      shellIntegrationEnabled: prefs.shellIntegrationEnabled ?? false,
      allowNonWorkspaceFiles: prefs.allowNonWorkspaceFiles ?? false,
      ...prefs,
    };
  } catch (err) {
    console.error('[ACC-SDK] Failed to read preferences:', err);
    return null;
  }
}

/**
 * Read system diagnostics from the SDK.
 * Returns null if the SDK is not available.
 */
export async function getSystemDiagnostics(): Promise<SystemDiagnostics | null> {
  if (!isSDKAvailable()) {
    return null;
  }

  try {
    const sdk = getSDK();
    const diag = await sdk.cascade.getDiagnostics();

    let mcpUrl: string | null = null;
    try { mcpUrl = await sdk.cascade.getMcpUrl(); } catch (_) {}

    let browserPort: number | null = null;
    try { browserPort = await sdk.cascade.getBrowserPort(); } catch (_) {}

    return {
      operatingSystem: diag?.systemInfo?.operatingSystem || 'Unknown',
      userName: diag?.systemInfo?.userName || 'Unknown',
      isRemote: diag?.isRemote ?? false,
      mcpUrl,
      browserPort,
    };
  } catch (err) {
    console.error('[ACC-SDK] Failed to read diagnostics:', err);
    return null;
  }
}
