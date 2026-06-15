/**
 * sdkMonitorService.ts — Real-time event monitoring via AntigravitySDK.
 *
 * Replaces the legacy `ConversationWatcher` (fs.watch on transcript.jsonl)
 * with the SDK's built-in event monitoring system.  Provides push-based
 * notifications for:
 *   - Step count changes (agent progress)
 *   - Active session changes (user switched conversations)
 *   - New conversation creation
 *   - USS state changes (preference updates)
 */

import { getSDK, isSDKAvailable } from './sdkService';

export interface MonitorCallbacks {
  onStepCountChanged?: (event: StepCountEvent) => void;
  onActiveSessionChanged?: (event: ActiveSessionEvent) => void;
  onNewConversation?: () => void;
  onStateChanged?: (event: StateChangeEvent) => void;
}

export interface StepCountEvent {
  sessionId: string;
  title: string;
  newCount: number;
  delta: number;
}

export interface ActiveSessionEvent {
  sessionId: string;
  title: string;
}

export interface StateChangeEvent {
  key: string;
  previousSize: number;
  newSize: number;
}

/**
 * Manages the SDK's EventMonitor lifecycle.  Call `start()` to begin
 * polling, `stop()` to halt, `dispose()` to clean up.
 */
export class SDKMonitorService {
  private _started = false;
  private _callbacks: MonitorCallbacks;

  constructor(callbacks: MonitorCallbacks) {
    this._callbacks = callbacks;
  }

  /**
   * Start the SDK event monitor.
   *
   * @param ussPollMs   Interval for polling USS state (default 3000ms)
   * @param trajPollMs  Interval for polling trajectory state (default 5000ms)
   */
  public start(ussPollMs = 3000, trajPollMs = 5000): void {
    if (this._started || !isSDKAvailable()) {
      return;
    }

    const sdk = getSDK();

    // Wire up event callbacks
    if (this._callbacks.onStepCountChanged) {
      sdk.monitor.onStepCountChanged((e: any) => {
        this._callbacks.onStepCountChanged!({
          sessionId: e.id || e.sessionId || '',
          title: e.title || '',
          newCount: e.newCount || 0,
          delta: e.delta || 0,
        });
      });
    }

    if (this._callbacks.onActiveSessionChanged) {
      sdk.monitor.onActiveSessionChanged((e: any) => {
        this._callbacks.onActiveSessionChanged!({
          sessionId: e.id || e.sessionId || '',
          title: e.title || '',
        });
      });
    }

    if (this._callbacks.onNewConversation) {
      sdk.monitor.onNewConversation(() => {
        this._callbacks.onNewConversation!();
      });
    }

    if (this._callbacks.onStateChanged) {
      sdk.monitor.onStateChanged((e: any) => {
        this._callbacks.onStateChanged!({
          key: e.key || '',
          previousSize: e.previousSize || 0,
          newSize: e.newSize || 0,
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
  public stop(): void {
    if (!this._started || !isSDKAvailable()) {
      return;
    }

    try {
      const sdk = getSDK();
      sdk.monitor.stop();
    } catch (_) {
      // SDK may already be disposed
    }

    this._started = false;
    console.log('[ACC-SDK] Monitor stopped');
  }

  /**
   * Full cleanup.
   */
  public dispose(): void {
    this.stop();
  }

  public get isRunning(): boolean {
    return this._started;
  }
}
