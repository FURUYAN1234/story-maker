export const API_TAB_SESSION_KEY = 'smk_api_tab_v497';

function normalizeKey(value) {
  return String(value || '').trim();
}

function getNormalizer(normalize) {
  return typeof normalize === 'function' ? normalize : normalizeKey;
}

export function buildApiTabSessionSnapshot(state, normalize) {
  if (!state) {
    return null;
  }

  const normalizeValue = getNormalizer(normalize);
  const snapshot = {
    apiProvider: state.apiProvider === 'openai' ? 'openai' : 'gemini',
    geminiKey: normalizeValue(state.geminiKey),
    openaiKey: normalizeValue(state.openaiKey),
  };

  if (state.apiKey) {
    snapshot[snapshot.apiProvider === 'openai' ? 'openaiKey' : 'geminiKey'] = normalizeValue(state.apiKey);
  }

  return snapshot.geminiKey || snapshot.openaiKey ? snapshot : null;
}

export function parseApiTabSessionSnapshot(rawValue, normalize) {
  try {
    const parsed = typeof rawValue === 'string' ? JSON.parse(rawValue || 'null') : rawValue;
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }

    const normalizeValue = getNormalizer(normalize);
    const geminiKey = normalizeValue(parsed.geminiKey);
    const openaiKey = normalizeValue(parsed.openaiKey);
    if (!geminiKey && !openaiKey) {
      return null;
    }

    const apiProvider = parsed.apiProvider === 'openai' && openaiKey
      ? 'openai'
      : geminiKey
        ? 'gemini'
        : 'openai';

    return {
      geminiKey,
      openaiKey,
      apiProvider,
      apiKey: apiProvider === 'openai' ? openaiKey : geminiKey,
    };
  } catch {
    return null;
  }
}
