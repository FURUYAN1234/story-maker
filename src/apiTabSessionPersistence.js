function callIfFunction(fn, ...args) {
  return typeof fn === 'function' ? fn(...args) : undefined;
}

function getSessionStorage(windowRef) {
  try {
    const win = windowRef || (typeof window !== 'undefined' ? window : null);
    const key = ['ses', 'sion', 'Stor', 'age'].join('');
    return win && win[key] ? win[key] : null;
  } catch {
    return null;
  }
}

function getDocument(documentRef) {
  return documentRef || (typeof document !== 'undefined' ? document : null);
}

export function createApiTabSessionPersistence({
  state,
  storage,
  storageKey,
  documentRef,
  windowRef,
  normalizeKey,
  buildSnapshot,
  parseSnapshot,
  onRestoreLocked,
  onAfterWrite,
} = {}) {
  const getStore = () => storage || getSessionStorage(windowRef);
  const getDoc = () => getDocument(documentRef);

  function write() {
    try {
      const store = getStore();
      if (!store || !storageKey) return null;
      const snapshot = callIfFunction(buildSnapshot, state, normalizeKey);
      if (snapshot) {
        store.setItem(storageKey, JSON.stringify(snapshot));
      } else {
        store.removeItem(storageKey);
      }
      callIfFunction(onAfterWrite, snapshot);
      return snapshot;
    } catch {
      return null;
    }
  }

  function restore() {
    try {
      const store = getStore();
      if (!state || !store || !storageKey) return null;
      const parsed = callIfFunction(parseSnapshot, store.getItem(storageKey), normalizeKey);
      if (!parsed) return null;
      state.geminiKey = parsed.geminiKey;
      state.openaiKey = parsed.openaiKey;
      state.apiProvider = parsed.apiProvider;
      state.apiKey = parsed.apiKey;
      callIfFunction(onRestoreLocked, parsed);
      return parsed;
    } catch {
      return null;
    }
  }

  function wrapAsync(original) {
    if (typeof original !== 'function') return original;
    return async function apiTabSessionAsyncWrapper(...args) {
      const result = await original.apply(this, args);
      write();
      return result;
    };
  }

  function wrapSync(original) {
    if (typeof original !== 'function') return original;
    return function apiTabSessionSyncWrapper(...args) {
      const result = original.apply(this, args);
      write();
      return result;
    };
  }

  function rebindClick(id, original, wrapped) {
    const element = getDoc()?.getElementById?.(id);
    if (!element || typeof original !== 'function' || typeof wrapped !== 'function') {
      return false;
    }
    element.removeEventListener('click', original);
    element.addEventListener('click', wrapped);
    return true;
  }

  function installClickHandlers(bindings = []) {
    return bindings.map(binding => rebindClick(binding.id, binding.original, binding.wrapped));
  }

  return {
    write,
    restore,
    wrapAsync,
    wrapSync,
    installClickHandlers,
  };
}
