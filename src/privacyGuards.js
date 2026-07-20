const BLOCKED_PROXY_HOSTS = new Set([
  'api.codetabs.com',
  'api.allorigins.win',
]);

function requestUrl(input) {
  if (typeof input === 'string' || input instanceof URL) return String(input);
  return String(input?.url || '');
}

export function isBlockedThirdPartyUrlProxy(input) {
  try {
    return BLOCKED_PROXY_HOSTS.has(new URL(requestUrl(input)).hostname);
  } catch {
    return false;
  }
}

export function installThirdPartyUrlProxyBlock(target = window) {
  if (!target?.fetch || target.__storyMakerPrivacyGuardInstalled) return false;
  const originalFetch = target.fetch.bind(target);
  target.fetch = (input, init) => {
    if (isBlockedThirdPartyUrlProxy(input)) {
      return Promise.reject(new Error('URL本文の外部プロキシ取得はプライバシー保護のため無効です。本文を直接貼り付けてください。'));
    }
    return originalFetch(input, init);
  };
  target.__storyMakerPrivacyGuardInstalled = true;
  return true;
}

if (typeof window !== 'undefined') installThirdPartyUrlProxyBlock(window);
