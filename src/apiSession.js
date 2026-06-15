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

function writeApiSessionToWindowName(session) {
  try {
    if (typeof window === 'undefined') return;
    window.name = `${API_WINDOW_NAME_PREFIX}${JSON.stringify(session || {})}`;
  } catch {
    // Ignore unavailable window.name.
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

export function writeApiSession(state) {
  try {
    const storage = getApiSessionStorage();
    if (!state) return;
    const apiProvider = state.apiProvider === 'openai' ? 'openai' : 'gemini';
    const currentKey = normalizeApiKey(apiProvider === 'openai'
      ? state.openaiKey || state.apiKey
      : state.geminiKey || state.apiKey);
    const openaiKey = normalizeApiKey(state.openaiKey);
    const geminiKey = normalizeApiKey(state.geminiKey);
    if (!currentKey && !openaiKey && !geminiKey) {
      storage?.removeItem(API_SESSION_KEY);
      clearApiSessionFromWindowName();
      return;
    }
    const session = { apiProvider, geminiKey, openaiKey };
    storage?.setItem(API_SESSION_KEY, JSON.stringify(session));
    writeApiSessionToWindowName(session);
  } catch {
    try {
      if (!state) return;
      const apiProvider = state.apiProvider === 'openai' ? 'openai' : 'gemini';
      const session = {
        apiProvider,
        geminiKey: normalizeApiKey(state.geminiKey || (apiProvider === 'gemini' ? state.apiKey : '')),
        openaiKey: normalizeApiKey(state.openaiKey || (apiProvider === 'openai' ? state.apiKey : '')),
      };
      if (session.geminiKey || session.openaiKey) writeApiSessionToWindowName(session);
    } catch {
      // Session persistence is best-effort only.
    }
  }
}

export function readApiSession() {
  const candidates = [];
  try {
    const storage = getApiSessionStorage();
    if (storage) {
      candidates.push(JSON.parse(storage.getItem(API_SESSION_KEY) || 'null'));
      candidates.push(JSON.parse(storage.getItem(LEGACY_API_SESSION_KEY) || 'null'));
    }
  } catch {
    // Ignore unavailable or malformed storage.
  }
  try {
    const raw = String(window.name || '');
    if (raw.startsWith(API_WINDOW_NAME_PREFIX)) {
      candidates.push(JSON.parse(raw.slice(API_WINDOW_NAME_PREFIX.length)));
    }
  } catch {
    // Ignore malformed window.name payloads.
  }

  return candidates.reduce((session, candidate) => {
    if (!candidate || typeof candidate !== 'object') return session;
    const apiProvider = candidate.apiProvider === 'openai' ? 'openai' : candidate.apiProvider === 'gemini' ? 'gemini' : '';
    const geminiKey = normalizeApiKey(candidate.geminiKey);
    const openaiKey = normalizeApiKey(candidate.openaiKey);
    const apiKey = normalizeApiKey(candidate.apiKey);
    if (apiProvider) session.apiProvider = apiProvider;
    if (isRealApiKey(geminiKey)) session.geminiKey = geminiKey;
    if (isRealApiKey(openaiKey)) session.openaiKey = openaiKey;
    if (isRealApiKey(apiKey)) session.apiKey = apiKey;
    return session;
  }, {});
}

export function restoreApiSession(state) {
  try {
    if (!state || state.apiKey) return false;
    const session = readApiSession();
    const apiProvider = session.apiProvider === 'openai' ? 'openai' : 'gemini';
    const currentKey = apiProvider === 'openai' ? session.openaiKey : session.geminiKey;
    if (!isRealApiKey(currentKey)) return false;
    state.apiProvider = apiProvider;
    state.geminiKey = normalizeApiKey(session.geminiKey);
    state.openaiKey = normalizeApiKey(session.openaiKey);
    state.apiKey = currentKey;
    return true;
  } catch {
    return false;
  }
}

export function sanitizeApiSession(session) {
  return {
    apiProvider: session?.apiProvider || '',
    hasGemini: isRealApiKey(session?.geminiKey),
    hasOpenAI: isRealApiKey(session?.openaiKey),
  };
}
