import {
  isRealApiKey,
  normalizeApiKey,
  readApiSession,
} from '../apiSession.js';

export function readLongDevApiSession() {
  const sessions = [];
  try {
    const runtimeSession = window.__storyMakerLongDevApiSession?.();
    if (runtimeSession && typeof runtimeSession === 'object') sessions.push(runtimeSession);
  } catch {
    // Runtime bridge exists only in local long-novel QA.
  }
  sessions.push(readApiSession());
  return sessions.reduce((merged, session) => {
    if (!session || typeof session !== 'object') return merged;
    const apiProvider = session.apiProvider === 'openai' ? 'openai' : session.apiProvider === 'gemini' ? 'gemini' : '';
    const geminiKey = normalizeApiKey(session.geminiKey);
    const openaiKey = normalizeApiKey(session.openaiKey);
    const apiKey = normalizeApiKey(session.apiKey);
    if (apiProvider) merged.apiProvider = apiProvider;
    if (isRealApiKey(geminiKey)) merged.geminiKey = geminiKey;
    if (isRealApiKey(openaiKey)) merged.openaiKey = openaiKey;
    if (isRealApiKey(apiKey)) merged.apiKey = apiKey;
    return merged;
  }, {});
}

export function installDevApiSessionBridge(getSession, isDev = false) {
  try {
    if (!isDev || typeof window === 'undefined') return;
    const isLocal = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
    if (!isLocal || !new URLSearchParams(location.search).has('longdev')) return;
    window.__storyMakerLongDevApiSession = () => {
      const session = typeof getSession === 'function' ? getSession() : {};
      return {
        apiProvider: session.apiProvider === 'openai' ? 'openai' : 'gemini',
        geminiKey: normalizeApiKey(session.geminiKey),
        openaiKey: normalizeApiKey(session.openaiKey),
        apiKey: normalizeApiKey(session.apiKey),
      };
    };
  } catch {
    // Local QA bridge must never break app startup.
  }
}
