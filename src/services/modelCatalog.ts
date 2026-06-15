/**
 * modelCatalog.ts — Model catalog via Antigravity SDK.
 *
 * Uses the SDK's `Models` enum to provide the canonical list of
 * available AI models.  Falls back to a hardcoded list if the SDK
 * is not available.
 */

import { isSDKAvailable } from './sdkService';

export interface ModelEntry {
  id: string;
  label: string;
  quality: string;   // Medium | High | Low
  category: string;  // Fast | Balanced | Thoughtful
}

/** Hardcoded fallback — matches Antigravity's known model list. */
const FALLBACK_MODELS: ModelEntry[] = [
  { id: 'gemini-3.5-flash-medium', label: 'Gemini 3.5 Flash (Medium)', quality: 'Medium', category: 'Fast' },
  { id: 'gemini-3.5-flash-high', label: 'Gemini 3.5 Flash (High)', quality: 'High', category: 'Fast' },
  { id: 'gemini-3.5-flash-low', label: 'Gemini 3.5 Flash (Low)', quality: 'Low', category: 'Fast' },
  { id: 'gemini-3.1-pro-low', label: 'Gemini 3.1 Pro (Low)', quality: 'Low', category: 'Balanced' },
  { id: 'gemini-3.1-pro-high', label: 'Gemini 3.1 Pro (High)', quality: 'High', category: 'Balanced' },
  { id: 'claude-sonnet-4.6', label: 'Claude Sonnet 4.6 (Thinking)', quality: 'Medium', category: 'Thoughtful' },
  { id: 'claude-opus-4.6', label: 'Claude Opus 4.6 (Thinking)', quality: 'High', category: 'Thoughtful' },
  { id: 'gpt-oss-120b', label: 'GPT-OSS 120B (Medium)', quality: 'Medium', category: 'Balanced' },
];

/**
 * Maps SDK `Models` enum values to our ModelEntry format.
 *
 * The SDK exposes constants like `Models.GEMINI_FLASH`, `Models.GEMINI_PRO_HIGH`, etc.
 * We map those to our display-friendly format.
 */
const SDK_MODEL_MAP: Record<string, ModelEntry> = {
  'GEMINI_FLASH':     { id: 'gemini-3.5-flash-medium', label: 'Gemini 3.5 Flash (Medium)', quality: 'Medium', category: 'Fast' },
  'GEMINI_FLASH_HIGH': { id: 'gemini-3.5-flash-high', label: 'Gemini 3.5 Flash (High)', quality: 'High', category: 'Fast' },
  'GEMINI_FLASH_LOW':  { id: 'gemini-3.5-flash-low', label: 'Gemini 3.5 Flash (Low)', quality: 'Low', category: 'Fast' },
  'GEMINI_PRO':        { id: 'gemini-3.1-pro-low', label: 'Gemini 3.1 Pro (Low)', quality: 'Low', category: 'Balanced' },
  'GEMINI_PRO_HIGH':   { id: 'gemini-3.1-pro-high', label: 'Gemini 3.1 Pro (High)', quality: 'High', category: 'Balanced' },
  'CLAUDE_SONNET':     { id: 'claude-sonnet-4.6', label: 'Claude Sonnet 4.6 (Thinking)', quality: 'Medium', category: 'Thoughtful' },
  'CLAUDE_OPUS':       { id: 'claude-opus-4.6', label: 'Claude Opus 4.6 (Thinking)', quality: 'High', category: 'Thoughtful' },
  'GPT_OSS':           { id: 'gpt-oss-120b', label: 'GPT-OSS 120B (Medium)', quality: 'Medium', category: 'Balanced' },
};

/**
 * Returns the full model catalog.
 *
 * Attempts to derive models from the SDK's Models enum; falls back
 * to the hardcoded list if the SDK is unavailable.
 */
export function getModelCatalog(): ModelEntry[] {
  if (isSDKAvailable()) {
    try {
      // Attempt to read Models enum from SDK
      const sdkModels = require('antigravity-sdk').Models;
      if (sdkModels) {
        const entries: ModelEntry[] = [];
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
      // Fall through to fallback
    }
  }
  return FALLBACK_MODELS;
}

/**
 * Returns the default model entry.
 */
export function getDefaultModel(): ModelEntry {
  const catalog = getModelCatalog();
  return catalog[0];
}

/**
 * Lookup a model entry by its ID.
 */
export function getModelById(id: string): ModelEntry | undefined {
  return getModelCatalog().find(m => m.id === id);
}

/**
 * Returns the SDK-native model identifier (e.g. Models.GEMINI_FLASH)
 * given our local model ID.  Used when calling sdk.ls.createCascade()
 * or sdk.ls.sendMessage().
 */
export function toSDKModel(localModelId: string): string | undefined {
  if (!isSDKAvailable()) {
    return undefined;
  }

  try {
    const sdkModels = require('antigravity-sdk').Models;
    // Reverse-lookup: find SDK key that maps to our local ID
    for (const [sdkKey, mapped] of Object.entries(SDK_MODEL_MAP)) {
      if (mapped.id === localModelId && sdkModels[sdkKey] !== undefined) {
        return sdkModels[sdkKey];
      }
    }
  } catch (_) {}

  return undefined;
}
