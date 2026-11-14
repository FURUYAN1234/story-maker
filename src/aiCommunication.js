// Shared request lifecycle. A stopped session stays stopped until an explicit
// user action starts another one; automatic repairs and helpers cannot restart it.
let controller = new AbortController();
let active = 0;
const listeners = new Set();
const publish = () => listeners.forEach(listener => listener(getAiCommunicationState()));
export const getAiCommunicationState = () => ({ active, stopped: controller.signal.aborted });
export const subscribeAiCommunication = listener => { listeners.add(listener); return () => listeners.delete(listener); };
export function beginAiCommunication() {
  if (active) return false;
  controller = new AbortController(); publish(); return true;
}
export function stopAiCommunication() {
  controller.abort(new DOMException('AI通信を中断しました', 'AbortError')); publish();
}
export function throwIfAiStopped() {
  if (controller.signal.aborted) throw controller.signal.reason;
}
export function captureAiOperation() {
  const signal = controller.signal;
  const check = () => { if (signal.aborted) throw signal.reason; };
  return {
    check,
    bind: fn => async (...args) => {
      check();
      try { const result = await fn(...args); check(); return result; }
      catch (error) { check(); throw error; }
    },
  };
}
export async function withAiCommunication(run, options = {}) {
  throwIfAiStopped();
  const session = controller;
  const local = new AbortController();
  const signals = [session.signal, options.signal].filter(Boolean);
  const forward = signal => () => local.abort(signal.reason);
  const cleanup = [];
  for (const signal of signals) {
    const listener = forward(signal);
    if (signal.aborted) listener();
    else { signal.addEventListener('abort', listener, { once: true }); cleanup.push(() => signal.removeEventListener('abort', listener)); }
  }
  const check = () => { if (local.signal.aborted) throw local.signal.reason ?? new DOMException('AI通信を中断しました', 'AbortError'); };
  let removeAbort = () => {};
  active++; publish();
  try {
    check();
    const aborted = new Promise((_, reject) => {
      const listener = () => { try { check(); } catch (error) { reject(error); } };
      local.signal.addEventListener('abort', listener, { once: true });
      removeAbort = () => local.signal.removeEventListener('abort', listener);
    });
    const result = await Promise.race([Promise.resolve().then(() => { check(); return run({ ...options, signal: local.signal }); }), aborted]);
    check(); return result;
  } finally {
    removeAbort(); cleanup.forEach(fn => fn()); active--; publish();
  }
}
