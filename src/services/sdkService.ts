/**
 * sdkService.ts — Singleton wrapper around the AntigravitySDK.
 *
 * Initialises the SDK at extension activation and exposes it via
 * `getSDK()`.  If the SDK fails to initialise (e.g. running outside
 * of Antigravity IDE) all callers can check `isSDKAvailable()` and
 * fall back to the legacy filesystem-based providers.
 *
 * IMPORTANT: The `antigravity-sdk` import is **dynamic** (require())
 * so that if the package isn't available at runtime the extension
 * still activates and all non-SDK features work normally.
 */

import * as vscode from 'vscode';

let _sdk: any = null;
let _available = false;
let _initError: string | null = null;

/**
 * Initialise the Antigravity SDK.  Safe to call multiple times —
 * subsequent calls are no-ops once the SDK is ready (or has failed).
 */
export async function initializeSDK(context: vscode.ExtensionContext): Promise<void> {
  if (_sdk) {
    return; // already initialised
  }

  try {
    // Dynamic require so the extension doesn't crash if antigravity-sdk
    // is not available in the current runtime environment
    const { AntigravitySDK } = require('antigravity-sdk');
    _sdk = new AntigravitySDK(context);
    await _sdk.initialize();
    _available = true;

    // Enable the title proxy so that sdk.integration.titles.rename() works.
    // This injects a renderer-side script that merges custom titles from
    // a JSON data file into the native conversation list UI.
    try {
      _sdk.integration.enableTitleProxy();
      await _sdk.integration.installSeamless(
        (cmd: string) => vscode.commands.executeCommand(cmd),
        (msg: string, ...items: string[]) => vscode.window.showInformationMessage(msg, ...items),
      );
      console.log('[ACC-SDK] Title proxy enabled and installed');
    } catch (titleErr: any) {
      // Non-fatal: rename will fall back to filesystem override
      console.warn('[ACC-SDK] Title proxy setup failed (rename will use fallback):', titleErr?.message);
    }

    // Push to subscriptions so VS Code disposes it on deactivation
    if (_sdk.dispose) {
      context.subscriptions.push(_sdk);
    }

    console.log('[ACC-SDK] AntigravitySDK initialised successfully');
  } catch (err: any) {
    _sdk = null;
    _available = false;
    _initError = err?.message || String(err);
    console.warn('[ACC-SDK] AntigravitySDK initialisation failed — falling back to filesystem:', _initError);
  }
}

/**
 * Returns the SDK instance, or null if not available.
 */
export function getSDK(): any {
  return _sdk;
}

/**
 * Returns `true` if the SDK was successfully initialised and is
 * available for use.  Use this before calling `getSDK()` in
 * code paths that have a filesystem fallback.
 */
export function isSDKAvailable(): boolean {
  return _available;
}

/**
 * Returns the error message if the SDK failed to initialise, or null.
 */
export function getSDKInitError(): string | null {
  return _initError;
}
