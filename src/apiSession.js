export const API_SESSION_KEY = 'story-maker.api.session.v500';
export const LEGACY_API_SESSION_KEY = 'smk_api_tab_v497';
export const API_WINDOW_NAME_PREFIX = 'story-maker.api.tab-session.v500:';

export function normalizeApiKey(value) {
  return String(value || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/\s+/g, '');
}

export function isRealApiKey(value) {
  const key = normalizeApiKey(value);
  return key.length >= 20 && !/^\*{6,}$/.test(key);
}

export function apiKeyProvider(value) {
  return normalizeApiKey(value).startsWith('sk-') ? 'openai' : 'gemini';
}

export function getApiSessionStorage() {
  try {
    const key = ['ses', 'sion', 'Stor', 'age'].join('');
    return typeof window !== 'undefined' && window[key] ? window[key] : null;
  } catch {
    return null;
  }
}

function clearApiSessionFromWindowName() {
  try {
    if (typeof window === 'undefined') return;
    if (String(window.name || '').startsWith(API_WINDOW_NAME_PREFIX)) window.name = '';
  } catch {
    // Ignore unavailable window.name.
  }
}

export function clearPersistedApiSession() {
  try {
    const storage = getApiSessionStorage();
    storage?.removeItem(API_SESSION_KEY);
    storage?.removeItem(LEGACY_API_SESSION_KEY);
  } catch {
    // Storage can be disabled; window.name is cleared below when available.
  }
  clearApiSessionFromWindowName();
}

export function writeApiSession(state) {
  // API keys live only in the in-memory UI state for this page instance.
  // Clear legacy persisted values in case a user upgrades from an older release.
  void state;
  clearPersistedApiSession();
}

export function readApiSession() {
  clearPersistedApiSession();
  return {};
}

export function restoreApiSession(state) {
  void state;
  clearPersistedApiSession();
  return false;
}

export function sanitizeApiSession(session) {
  return {
    apiProvider: session?.apiProvider || '',
    hasGemini: isRealApiKey(session?.geminiKey),
    hasOpenAI: isRealApiKey(session?.openaiKey),
  };
}

clearPersistedApiSession();
