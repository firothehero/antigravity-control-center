/**
 * ConversationWatcher — Real-time transcript.jsonl file watcher service.
 *
 * Watches one or more brain conversation directories for new steps being
 * appended to transcript.jsonl by the running Antigravity agent. When new
 * lines are detected the caller is notified with the incremental diff.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parseJsonl } from '../utils/jsonlParser';
import { TranscriptStep } from '../models';

export interface WatcherEvent {
  conversationId: string;
  newSteps: TranscriptStep[];
  totalStepCount: number;
}

type WatcherCallback = (event: WatcherEvent) => void;

interface WatchEntry {
  watcher: fs.FSWatcher | null;
  lastSize: number;
  transcriptPath: string;
}

export class ConversationWatcher {
  private _watchers: Map<string, WatchEntry> = new Map();
  private _callback: WatcherCallback;
  private _debounceTimers: Map<string, NodeJS.Timeout> = new Map();

  constructor(callback: WatcherCallback) {
    this._callback = callback;
  }

  /**
   * Start watching a specific conversation's transcript file.
   * Safe to call multiple times — re-watches if file has changed.
   */
  public watch(conversationId: string, transcriptPath: string): void {
    // Already watching
    if (this._watchers.has(conversationId)) {
      return;
    }

    try {
      const stat = fs.statSync(transcriptPath);
      const entry: WatchEntry = {
        watcher: null,
        lastSize: stat.size,
        transcriptPath,
      };

      const watcher = fs.watch(transcriptPath, { persistent: false }, (eventType) => {
        if (eventType === 'change') {
          this._debouncedCheck(conversationId, entry);
        }
      });

      watcher.on('error', () => {
        // File might have been deleted — stop watching
        this.unwatch(conversationId);
      });

      entry.watcher = watcher;
      this._watchers.set(conversationId, entry);
    } catch (_e) {
      // File doesn't exist yet — skip
    }
  }

  /**
   * Stop watching a specific conversation.
   */
  public unwatch(conversationId: string): void {
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
  public disposeAll(): void {
    for (const id of this._watchers.keys()) {
      this.unwatch(id);
    }
  }

  /**
   * Returns the set of currently watched conversation IDs.
   */
  public watchedIds(): string[] {
    return Array.from(this._watchers.keys());
  }

  // -----------------------------------------------------------------------
  // Private helpers
  // -----------------------------------------------------------------------

  private _debouncedCheck(conversationId: string, entry: WatchEntry): void {
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

  private _checkForNewSteps(conversationId: string, entry: WatchEntry): void {
    try {
      const stat = fs.statSync(entry.transcriptPath);
      if (stat.size <= entry.lastSize) {
        return; // No new data
      }

      // Read only the new bytes that were appended
      const fd = fs.openSync(entry.transcriptPath, 'r');
      const newByteCount = stat.size - entry.lastSize;
      const buf = Buffer.alloc(newByteCount);
      fs.readSync(fd, buf, 0, newByteCount, entry.lastSize);
      fs.closeSync(fd);

      entry.lastSize = stat.size;

      const newContent = buf.toString('utf8');
      const newSteps = parseJsonl(newContent);

      if (newSteps.length > 0) {
        // Count total steps in file
        const fullContent = fs.readFileSync(entry.transcriptPath, 'utf8');
        const allSteps = parseJsonl(fullContent);

        this._callback({
          conversationId,
          newSteps,
          totalStepCount: allSteps.length,
        });
      }
    } catch (_e) {
      // File read error — silently skip
    }
  }
}
