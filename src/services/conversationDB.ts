/**
 * conversationDB.ts
 *
 * Reads Antigravity IDE conversation .db (SQLite) files to extract
 * step counts and workspace metadata. Uses sql.js (WebAssembly SQLite)
 * since it's already bundled for the antigravity-sdk.
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import initSqlJs, { Database } from 'sql.js';

let sqlPromise: Promise<any> | null = null;

/**
 * Lazily initialise the sql.js WASM module.
 * The WASM binary lives at dist/sql-wasm.wasm (copied by esbuild.config.mjs).
 */
async function getSql(): Promise<any> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      // The WASM file is co-located in dist/ next to extension.js
      locateFile: (file: string) => path.join(__dirname, file),
    });
  }
  return sqlPromise;
}

export interface ConversationDBInfo {
  id: string;
  stepCount: number;
  workspaceUri: string;
  trajectoryId: string;
}

/**
 * Read metadata from a single conversation .db file.
 *
 * Extracts:
 * - step count (from `steps` table)
 * - workspace URI (from `trajectory_metadata_blob` → strings → file:///...)
 * - trajectory ID (from `trajectory_meta` table)
 */
export async function readConversationDB(dbPath: string): Promise<ConversationDBInfo | null> {
  try {
    const SQL = await getSql();
    const fileBuffer = await fs.readFile(dbPath);
    const db: Database = new SQL.Database(fileBuffer);

    let stepCount = 0;
    let workspaceUri = '';
    let trajectoryId = '';

    try {
      // Step count
      const stepsResult = db.exec('SELECT COUNT(*) FROM steps');
      if (stepsResult.length > 0 && stepsResult[0].values.length > 0) {
        stepCount = stepsResult[0].values[0][0] as number;
      }
    } catch (_) { /* table may not exist */ }

    try {
      // Trajectory ID
      const metaResult = db.exec('SELECT trajectory_id, cascade_id FROM trajectory_meta LIMIT 1');
      if (metaResult.length > 0 && metaResult[0].values.length > 0) {
        trajectoryId = (metaResult[0].values[0][0] as string) || '';
      }
    } catch (_) { /* table may not exist */ }

    try {
      // Workspace URI from trajectory_metadata_blob
      // The blob is protobuf; we extract readable strings to find file:/// URIs
      const blobResult = db.exec('SELECT data FROM trajectory_metadata_blob LIMIT 1');
      if (blobResult.length > 0 && blobResult[0].values.length > 0) {
        const blobData = blobResult[0].values[0][0];
        if (blobData instanceof Uint8Array) {
          // Decode the protobuf blob as UTF-8 and search for file:/// URIs
          const text = new TextDecoder('utf-8', { fatal: false }).decode(blobData);
          const match = text.match(/file:\/\/\/[^\s"'\x00-\x1f]+/);
          if (match) {
            workspaceUri = match[0];
          }
        }
      }
    } catch (_) { /* table may not exist */ }

    db.close();

    const id = path.basename(dbPath, '.db');
    return { id, stepCount, workspaceUri, trajectoryId };
  } catch (err) {
    console.warn(`[ACC] Failed to read conversation DB ${dbPath}:`, (err as Error).message);
    return null;
  }
}

/**
 * Scan the conversations directory and read all .db files.
 * Returns metadata for every readable conversation.
 */
export async function scanAllConversationDBs(conversationsDir: string): Promise<ConversationDBInfo[]> {
  const results: ConversationDBInfo[] = [];
  try {
    const entries = await fs.readdir(conversationsDir);
    const dbFiles = entries.filter(e => e.endsWith('.db') && !e.endsWith('.db-shm') && !e.endsWith('.db-wal'));
    
    // Read in parallel, batched to avoid overwhelming I/O
    const BATCH_SIZE = 10;
    for (let i = 0; i < dbFiles.length; i += BATCH_SIZE) {
      const batch = dbFiles.slice(i, i + BATCH_SIZE);
      const promises = batch.map(f => readConversationDB(path.join(conversationsDir, f)));
      const batchResults = await Promise.all(promises);
      for (const r of batchResults) {
        if (r) results.push(r);
      }
    }
  } catch (err) {
    console.warn('[ACC] Failed to scan conversation DBs:', (err as Error).message);
  }
  return results;
}

/**
 * List all conversation IDs from the conversations directory
 * (both .db and .pb files).
 */
export async function listAllConversationIds(conversationsDir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(conversationsDir);
    const ids = new Set<string>();
    for (const entry of entries) {
      // Match UUID pattern from filenames like abc123.db, abc123.pb
      const match = entry.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\.(db|pb)$/);
      if (match) {
        ids.add(match[1]);
      }
    }
    return Array.from(ids);
  } catch (err) {
    console.warn('[ACC] Failed to list conversation IDs:', (err as Error).message);
    return [];
  }
}
