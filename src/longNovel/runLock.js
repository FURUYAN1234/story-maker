export const LONG_NOVEL_ACTIVE_RUN_KEY = 'story-maker.longdev.activeRun.v501';
export const LONG_NOVEL_RUN_LOCK_TTL_MS = 4 * 60 * 60 * 1000;

export function acquireLongNovelRunLock(run, env = {}) {
  const active = readLongNovelActiveRun(env);
  if (active && active.token !== run.token) return { ok: false, active };

  const locked = {
    ...run,
    startedAt: timestamp(env),
    updatedAt: timestamp(env),
  };
  const target = getGlobalObject(env);
  if (target) target.__storyMakerLongDevActiveToken = run.token;
  safeSetLockStorage(locked, env);
  return { ok: true, active: locked };
}

export function touchLongNovelRunLock(token, env = {}) {
  const active = readLongNovelActiveRun(env);
  if (!active || active.token !== token) return { touched: false };
  const next = { ...active, updatedAt: timestamp(env) };
  safeSetLockStorage(next, env);
  return { touched: true, active: next };
}

export function releaseLongNovelRunLock(token, env = {}) {
  const active = readLongNovelActiveRun(env);
  const target = getGlobalObject(env);
  if (active && active.token === token) safeRemoveLockStorage(env);
  if (target?.__storyMakerLongDevActiveToken === token) target.__storyMakerLongDevActiveToken = null;
  return { released: Boolean(active && active.token === token) };
}

export function readLongNovelActiveRun(env = {}) {
  const active = safeGetLockStorage(env);
  if (!active) return null;
  if (isLongNovelRunLockStale(active, env)) {
    safeRemoveLockStorage(env);
    return null;
  }
  return active;
}

export function isLongNovelRunLockStale(active, env = {}) {
  const stamp = Date.parse(active?.updatedAt || active?.startedAt || '');
  return !stamp || nowMs(env) - stamp > lockTtlMs(env);
}

function safeGetLockStorage(env) {
  try {
    const raw = getStorage(env, 'localStorage')?.getItem?.(LONG_NOVEL_ACTIVE_RUN_KEY)
      || getStorage(env, 'sessionStorage')?.getItem?.(LONG_NOVEL_ACTIVE_RUN_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeSetLockStorage(value, env) {
  const raw = JSON.stringify(value);
  try { getStorage(env, 'localStorage')?.setItem?.(LONG_NOVEL_ACTIVE_RUN_KEY, raw); } catch {}
  try { getStorage(env, 'sessionStorage')?.setItem?.(LONG_NOVEL_ACTIVE_RUN_KEY, raw); } catch {}
}

function safeRemoveLockStorage(env) {
  try { getStorage(env, 'localStorage')?.removeItem?.(LONG_NOVEL_ACTIVE_RUN_KEY); } catch {}
  try { getStorage(env, 'sessionStorage')?.removeItem?.(LONG_NOVEL_ACTIVE_RUN_KEY); } catch {}
}

function getStorage(env, key) {
  if (env[key]) return env[key];
  return getGlobalObject(env)?.[key] || null;
}

function getGlobalObject(env) {
  if (env.globalObject) return env.globalObject;
  if (typeof window !== 'undefined') return window;
  return null;
}

function timestamp(env) {
  return new Date(nowMs(env)).toISOString();
}

function nowMs(env) {
  return typeof env.now === 'function' ? Number(env.now()) : Date.now();
}

function lockTtlMs(env) {
  return Number(env.ttlMs || LONG_NOVEL_RUN_LOCK_TTL_MS);
}
