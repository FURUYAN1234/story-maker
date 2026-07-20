export function createApiTabSessionPersistence({
} = {}) {
  function write() {
    return null;
  }

  function restore() {
    return null;
  }

  function wrapAsync(original) {
    if (typeof original !== 'function') return original;
    return async function apiTabSessionAsyncWrapper(...args) {
      return original.apply(this, args);
    };
  }

  function wrapSync(original) {
    if (typeof original !== 'function') return original;
    return function apiTabSessionSyncWrapper(...args) {
      return original.apply(this, args);
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
    return bindings.map(() => false);
  }

  return {
    write,
    restore,
    wrapAsync,
    wrapSync,
    installClickHandlers,
  };
}
