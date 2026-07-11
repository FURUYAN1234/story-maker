import { isDirectLong10000Mode, validateDirectLong10000 } from './directLong10000.js';

export class DirectLong10000ValidationError extends Error {
  constructor(validation) {
    const issues = Array.isArray(validation?.issues) ? validation.issues : [];
    const charCount = Number(validation?.charCount || 0);
    super(`長編（10000字～）の完成条件を満たしていません: ${issues.join(', ')}（${charCount.toLocaleString()}字）`);
    this.name = 'DirectLong10000ValidationError';
    this.category = 'quality';
    this.charCount = charCount;
    this.issues = issues;
  }
}

export function assertDirectLong10000Completion({ mode, text } = {}) {
  if (!isDirectLong10000Mode(mode)) return null;
  const validation = validateDirectLong10000(text);
  if (!validation.ok) throw new DirectLong10000ValidationError(validation);
  return validation;
}

export function applyDirectLong10000UiResult({ mode, text, root, status } = {}) {
  if (!isDirectLong10000Mode(mode)) return null;
  try {
    const validation = assertDirectLong10000Completion({ mode, text });
    if (root?.dataset) {
      root.dataset.directLongResult = 'passed';
      root.dataset.directLongChars = String(validation.charCount);
      root.dataset.directLongIssues = '';
    }
    if (status) status.textContent = `AI進捗・思考ログ: 完了（${validation.charCount.toLocaleString()}字）`;
    return validation;
  } catch (error) {
    if (!(error instanceof DirectLong10000ValidationError)) throw error;
    if (root?.dataset) {
      root.dataset.directLongResult = 'failed';
      root.dataset.directLongChars = String(error.charCount);
      root.dataset.directLongIssues = error.issues.join(',');
    }
    if (status) {
      status.textContent = `AI進捗・思考ログ: 失敗（${error.charCount.toLocaleString()}字 / ${error.issues.join(', ')}）`;
    }
    return { ok: false, charCount: error.charCount, issues: [...error.issues] };
  }
}

export function installDirectLong10000Runtime(doc = globalThis.document, timers = globalThis) {
  const button = doc?.getElementById?.('btn-generate');
  if (!button?.addEventListener) return () => {};
  let pollId = null;
  let startId = null;

  const stopPolling = () => {
    if (pollId !== null) timers.clearInterval(pollId);
    if (startId !== null) timers.clearTimeout(startId);
    pollId = null;
    startId = null;
  };

  const onClick = () => {
    const mode = doc.querySelector?.('#mode-chips .chip.active')?.dataset?.v || '';
    if (!isDirectLong10000Mode(mode)) return;
    stopPolling();
    const root = doc.documentElement;
    if (root?.dataset) {
      root.dataset.directLongResult = 'running';
      root.dataset.directLongChars = '';
      root.dataset.directLongIssues = '';
    }
    let sawBusy = false;
    startId = timers.setTimeout(() => {
      sawBusy = button.disabled === true;
      pollId = timers.setInterval(() => {
        if (button.disabled) {
          sawBusy = true;
          return;
        }
        if (!sawBusy) return;
        stopPolling();
        applyDirectLong10000UiResult({
          mode,
          text: doc.getElementById?.('output')?.textContent || '',
          root,
          status: doc.getElementById?.('progress-title-text'),
        });
      }, 250);
    }, 0);
  };

  button.addEventListener('click', onClick);
  return () => {
    stopPolling();
    button.removeEventListener?.('click', onClick);
  };
}

if (typeof document !== 'undefined') installDirectLong10000Runtime(document);
