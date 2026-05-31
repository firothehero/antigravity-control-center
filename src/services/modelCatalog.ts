/**
 * ModelCatalog — Provides the list of AI models available in Antigravity IDE.
 *
 * The catalog mirrors the exact models shown in Antigravity's own model
 * selector so the ACC input box matches the native experience.
 *
 * Future: parse from Antigravity's user_settings.pb or a dedicated config
 * file when the format becomes documented. For now the list is derived from
 * the known models visible in the Antigravity UI.
 */

export interface AntigravityModel {
  /** Internal model identifier passed to the Antigravity API */
  id: string;
  /** Human-readable display name shown in the selector */
  displayName: string;
  /** Optional quality tier label (Medium / High / Low) */
  tier?: 'Low' | 'Medium' | 'High';
  /** Speed badge ("Fast" / "Balanced" / "Thoughtful") */
  speed?: 'Fast' | 'Balanced' | 'Thoughtful';
  /** Whether this model supports extended thinking */
  thinking?: boolean;
}

/**
 * Returns the full list of models available in Antigravity IDE.
 * The default model is always listed first.
 */
export function getModelCatalog(): AntigravityModel[] {
  return [
    // ── Gemini 3.5 Flash ──────────────────────────────────────────────────
    {
      id: 'gemini-3.5-flash-medium',
      displayName: 'Gemini 3.5 Flash (Medium)',
      tier: 'Medium',
      speed: 'Fast',
    },
    {
      id: 'gemini-3.5-flash-high',
      displayName: 'Gemini 3.5 Flash (High)',
      tier: 'High',
      speed: 'Fast',
    },
    {
      id: 'gemini-3.5-flash-low',
      displayName: 'Gemini 3.5 Flash (Low)',
      tier: 'Low',
      speed: 'Fast',
    },
    // ── Gemini 3.1 Pro ────────────────────────────────────────────────────
    {
      id: 'gemini-3.1-pro-low',
      displayName: 'Gemini 3.1 Pro (Low)',
      tier: 'Low',
      speed: 'Balanced',
    },
    {
      id: 'gemini-3.1-pro-high',
      displayName: 'Gemini 3.1 Pro (High)',
      tier: 'High',
      speed: 'Balanced',
    },
    // ── Claude ────────────────────────────────────────────────────────────
    {
      id: 'claude-sonnet-4.6-thinking',
      displayName: 'Claude Sonnet 4.6 (Thinking)',
      thinking: true,
      speed: 'Thoughtful',
    },
    {
      id: 'claude-opus-4.6-thinking',
      displayName: 'Claude Opus 4.6 (Thinking)',
      thinking: true,
      speed: 'Thoughtful',
    },
    // ── Open Source ───────────────────────────────────────────────────────
    {
      id: 'gpt-oss-120b-medium',
      displayName: 'GPT-OSS 120B (Medium)',
      tier: 'Medium',
      speed: 'Balanced',
    },
  ];
}

/** Returns the default model (first in the catalog). */
export function getDefaultModel(): AntigravityModel {
  return getModelCatalog()[0];
}
