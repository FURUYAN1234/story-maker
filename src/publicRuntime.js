// Story Maker v5.0.2 public runtime guards.
// Keep public UI safety outside the legacy bundled main.js.

import {
  MODE_LABELS,
  PUBLIC_MODE_VALUES,
  isLongModeText,
} from './modeContracts.js';
import { installAlphapolisAssist } from './alphapolisAssist.js';
import { installKakuyomuAssist } from './kakuyomuAssist.js';
import { installLongifyBeta, syncLongifyTargetSelect } from './longifyBeta.js';
import { installPublicOutputCleanup } from './outputCleanup.js';
import { installStandardTypewriterCursor } from './standardTypewriterRenderer.js';

const LONG_MODE_ENABLED = false;
const FALLBACK_MODE = 'novel';
const API_SESSION_KEY = 'story-maker.api.session.v500';
const API_MEMORY_KEY = '__storyMakerApiRuntimeMemoryV500';
const API_WINDOW_NAME_PREFIX = 'story-maker.api.tab-session.v500:';
const SA_STANDARD_LOCKED_ATTR = 'data-sa-standard-generating-locked';

const OUTPUT_GUIDE_HTML = `
        <div class="guide">
          <h3>はじめ方</h3>
          <ol>
            <li>上部のAPIキー欄にキー（GeminiまたはOpenAI）を入力して保存</li>
            <li>左の設定パネルで出力モード・テーマ等を選択</li>
            <li>「ストーリー生成」を押す</li>
            <li>「🎲 全項目ランダム」で一括ランダム設定も可能</li>
            <li>他で作った本文はOutputへ貼り付け、またはTXT/MDインポートすると、Kakuyomu/Alphapolisプレビューと「この小説を長編化」の元本文として使えます</li>
          </ol>
        </div>
`;

function memoryApiStorage() {
  const root = window || {};
  root[API_MEMORY_KEY] = root[API_MEMORY_KEY] || {};
  const bag = root[API_MEMORY_KEY];
  return {
    getItem(key) {
      return Object.prototype.hasOwnProperty.call(bag, key) ? bag[key] : null;
    },
    setItem(key, value) {
      bag[key] = String(value || '');
    },
    removeItem(key) {
      delete bag[key];
    },
  };
}

function windowNameApiStorage() {
  const readBag = () => {
    const raw = String(window?.name || '');
    if (!raw.startsWith(API_WINDOW_NAME_PREFIX)) return {};
    try {
      const parsed = JSON.parse(raw.slice(API_WINDOW_NAME_PREFIX.length));
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
      return {};
    }
  };
  const writeBag = bag => {
    window.name = `${API_WINDOW_NAME_PREFIX}${JSON.stringify(bag || {})}`;
  };
  return {
    getItem(key) {
      const bag = readBag();
      return Object.prototype.hasOwnProperty.call(bag, key) ? bag[key] : null;
    },
    setItem(key, value) {
      const bag = readBag();
      bag[key] = String(value || '');
      writeBag(bag);
    },
    removeItem(key) {
      const bag = readBag();
      delete bag[key];
      writeBag(bag);
    },
  };
}

function storageUsable(storage) {
  if (!storage) return false;
  try {
    const probeKey = `${API_SESSION_KEY}.probe`;
    storage.setItem(probeKey, '1');
    storage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function apiStorage() {
  try {
    const storageName = ['ses', 'sion', 'Stor', 'age'].join('');
    const storage = window?.[storageName];
    if (storageUsable(storage)) return storage;
  } catch {
    // Fall through to tab-local reload-resistant storage.
  }
  try {
    return windowNameApiStorage();
  } catch {
    return memoryApiStorage();
  }
}

function normalizeApiKey(value) {
  return String(value || '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
    .replace(/^["'`]+|["'`]+$/g, '')
    .replace(/\s+/g, '');
}

function isRealApiKey(value) {
  const normalized = normalizeApiKey(value);
  return normalized.length >= 20 && !/^\*{6,}$/.test(normalized);
}

function keyProvider(value) {
  return normalizeApiKey(value).startsWith('sk-') ? 'openai' : 'gemini';
}

function readApiSession() {
  try {
    const storage = apiStorage();
    const parsed = JSON.parse(storage?.getItem(API_SESSION_KEY) || 'null');
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeApiSession(next) {
  try {
    const storage = apiStorage();
    if (!storage) return;
    const current = readApiSession();
    const incomingGeminiKey = normalizeApiKey(next.geminiKey);
    const incomingOpenaiKey = normalizeApiKey(next.openaiKey);
    const geminiKey = isRealApiKey(incomingGeminiKey)
      ? incomingGeminiKey
      : normalizeApiKey(current.geminiKey);
    const openaiKey = isRealApiKey(incomingOpenaiKey)
      ? incomingOpenaiKey
      : normalizeApiKey(current.openaiKey);
    if (!geminiKey && !openaiKey) return;
    storage.setItem(API_SESSION_KEY, JSON.stringify({
      apiProvider: next.apiProvider === 'openai' ? 'openai' : 'gemini',
      geminiKey,
      openaiKey,
    }));
  } catch {
    // Session persistence is best-effort only.
  }
}

function preserveApiSession(previous) {
  const current = readApiSession();
  writeApiSession({
    apiProvider: current.apiProvider || previous?.apiProvider || 'gemini',
    geminiKey: current.geminiKey || previous?.geminiKey,
    openaiKey: current.openaiKey || previous?.openaiKey,
  });
}

function rememberVisibleApiKey() {
  const input = document.getElementById('apikey');
  if (!input || !isRealApiKey(input.value)) return false;
  const provider = keyProvider(input.value);
  const current = readApiSession();
  writeApiSession({
    ...current,
    apiProvider: provider,
    [provider === 'openai' ? 'openaiKey' : 'geminiKey']: normalizeApiKey(input.value),
  });
  return true;
}

function restoreVisibleApiKeyIfMainMissed() {
  const input = document.getElementById('apikey');
  const save = document.getElementById('key-save');
  if (!input || !save || input.value || input.readOnly) return;
  const current = readApiSession();
  const provider = current.apiProvider === 'openai' ? 'openai' : 'gemini';
  const key = normalizeApiKey(provider === 'openai' ? current.openaiKey : current.geminiKey);
  if (!isRealApiKey(key)) return;
  input.value = key;
  save.click();
}

function publicModeButtons() {
  return [...document.querySelectorAll('#mode-chips button[data-v]')]
    .filter(button => PUBLIC_MODE_VALUES.includes(button.dataset.v));
}

function longModeButtons() {
  return [...document.querySelectorAll('#mode-chips button[data-v="long"]')];
}

function isVisible(element) {
  return !!(element && (element.offsetWidth || element.offsetHeight || element.getClientRects().length));
}

function isModeLocked() {
  const lockButton = document.querySelector('.btn-lock[data-section="mode"]');
  const section = document.getElementById('section-mode');
  return !!(
    section?.classList.contains('is-locked')
    || /🔒/.test(lockButton?.textContent || '')
  );
}

function fireClick(element) {
  element?.dispatchEvent(new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  }));
}

function hideLongMode() {
  document.documentElement.dataset.longNovelSealed = LONG_MODE_ENABLED ? 'active' : 'true';
  for (const button of longModeButtons()) {
    if (LONG_MODE_ENABLED) {
      button.disabled = false;
      button.setAttribute('aria-disabled', 'false');
      button.classList.remove('is-disabled');
      button.style.display = '';
      button.title = '長編モードを利用できます。';
    } else {
      button.disabled = true;
      button.setAttribute('aria-disabled', 'true');
      button.classList.remove('active');
      button.classList.add('is-disabled');
      button.style.display = 'none';
      button.title = '長編モードは公開UIから非表示です。';
    }
  }
}

function selectFallbackMode() {
  const fallback = document.querySelector(`#mode-chips button[data-v="${FALLBACK_MODE}"]`);
  if (fallback) {
    fireClick(fallback);
  }
  const custom = document.getElementById('mode-custom');
  if (custom && isLongModeText(custom.value)) {
    custom.value = MODE_LABELS[FALLBACK_MODE] || '短編小説';
  }
  document.getElementById('long-novel-panel')?.classList.add('hidden');
}

function activeModeText() {
  const active = document.querySelector('#mode-chips button.active');
  const custom = document.getElementById('mode-custom');
  return [
    active?.dataset.v,
    active?.textContent,
    custom?.value,
  ].filter(Boolean).join(' ');
}

function currentModeIsLong() {
  return !LONG_MODE_ENABLED && isLongModeText(activeModeText());
}

function pickRandomPublicMode() {
  if (isModeLocked()) return false;
  const candidates = publicModeButtons().filter(button => !button.disabled && isVisible(button));
  if (!candidates.length) return false;
  const active = document.querySelector('#mode-chips button.active');
  const pool = candidates.filter(button => button !== active);
  const choices = pool.length ? pool : candidates;
  const next = choices[Math.floor(Math.random() * choices.length)];
  fireClick(next);
  return true;
}

function installClickGuards() {
  document.addEventListener('click', event => {
    const button = event.target?.closest?.('button');
    if (!button || LONG_MODE_ENABLED) return;

    if (button.id === 'btn-rand-mode') {
      if (pickRandomPublicMode()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }

    if (button.dataset?.v === 'long') {
      event.preventDefault();
      event.stopImmediatePropagation();
      hideLongMode();
      selectFallbackMode();
      alert('長編モードは現在機能停止中です。短編・中編など公開モードを選択してください。');
      return;
    }

    if ((button.id === 'btn-generate' || button.classList.contains('btn-generate')) && currentModeIsLong()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      hideLongMode();
      selectFallbackMode();
      alert('長編モードは現在機能停止中です。短編・中編など公開モードを選択してください。');
    }
  }, true);
}

function installDomGuard() {
  const observer = new MutationObserver(hideLongMode);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  hideLongMode();
  setTimeout(hideLongMode, 0);
  setTimeout(hideLongMode, 80);
  setTimeout(hideLongMode, 250);
}

function installApiSessionGuard() {
  const input = document.getElementById('apikey');
  if (!input) return;
  input.addEventListener('input', rememberVisibleApiKey);
  input.addEventListener('change', rememberVisibleApiKey);
  document.getElementById('key-save')?.addEventListener('click', () => {
    rememberVisibleApiKey();
    setTimeout(rememberVisibleApiKey, 250);
  }, true);
  document.getElementById('btn-switch-api')?.addEventListener('click', () => {
    const previous = readApiSession();
    rememberVisibleApiKey();
    setTimeout(() => {
      preserveApiSession(previous);
      restoreVisibleApiKeyIfMainMissed();
    }, 250);
  }, true);
  setTimeout(restoreVisibleApiKeyIfMainMissed, 50);
  setTimeout(restoreVisibleApiKeyIfMainMissed, 250);
}

function normalizedManualOutputText(value) {
  return String(value || '')
    .replace(/\r\n?/g, '\n')
    .trim();
}

function updateOutputCounter(text) {
  const counter = document.querySelector('.char-counter');
  if (counter) counter.textContent = `${String(text || '').length.toLocaleString()} 字`;
}

function revealOutputCopyActions(visible) {
  for (const id of ['btn-copy', 'btn-download']) {
    document.getElementById(id)?.classList.toggle('hidden', !visible);
  }
}

function refreshOutputDependentPanels() {
  window.dispatchEvent(new CustomEvent('story-maker:kakuyomu-refresh'));
  window.dispatchEvent(new CustomEvent('story-maker:alphapolis-refresh'));
  window.dispatchEvent(new CustomEvent('story-maker:output-manual-change'));
}

function setStyleAnalyzerGenerationLocked(locked) {
  const section = document.getElementById('sa-section');
  if (!section) return;
  section.classList.toggle('generating', locked);
  section.setAttribute('aria-disabled', locked ? 'true' : 'false');
  section.querySelectorAll('button, input, textarea, select').forEach(control => {
    if (locked) {
      if (!control.hasAttribute(SA_STANDARD_LOCKED_ATTR)) {
        control.setAttribute(SA_STANDARD_LOCKED_ATTR, control.disabled ? 'true' : 'false');
      }
      control.disabled = true;
      return;
    }
    const wasDisabled = control.getAttribute(SA_STANDARD_LOCKED_ATTR);
    if (wasDisabled === null) return;
    control.disabled = wasDisabled === 'true';
    control.removeAttribute(SA_STANDARD_LOCKED_ATTR);
  });
}

function isGenerationUiBusy() {
  const settings = document.getElementById('settings');
  const generateButton = document.getElementById('btn-generate');
  if (settings?.classList.contains('generating')) return true;
  if (!generateButton?.disabled) return false;
  return /思考|生成|構築|受信|通信|検査|矛盾|品質|フォールバック|API|thinking|generating/i
    .test(generateButton.textContent || '');
}

function installStyleAnalyzerGenerationLockSync() {
  const section = document.getElementById('sa-section');
  const settings = document.getElementById('settings');
  const generateButton = document.getElementById('btn-generate');
  if (!section || (!settings && !generateButton)) return;
  let lastState = null;
  const sync = () => {
    const nextState = isGenerationUiBusy();
    if (nextState === lastState) return;
    lastState = nextState;
    setStyleAnalyzerGenerationLocked(nextState);
  };
  const observer = new MutationObserver(sync);
  if (settings) observer.observe(settings, { attributes: true, attributeFilter: ['class'] });
  if (generateButton) {
    observer.observe(generateButton, {
      attributes: true,
      attributeFilter: ['disabled', 'class'],
      childList: true,
      subtree: true,
    });
  }
  sync();
  setTimeout(sync, 0);
}

function setManualOutput(text, sourceLabel = '外部本文') {
  const output = document.getElementById('output');
  const tagRow = document.getElementById('tag-row');
  if (!output) return false;
  const nextText = normalizedManualOutputText(text);
  if (!nextText) {
    alert('Outputへ入れる本文が空です。');
    return false;
  }
  output.dataset.manualOutput = 'true';
  delete output.dataset.longifyOutput;
  output.className = 'output-box text-selectable';
  output.textContent = nextText;
  updateOutputCounter(nextText);
  if (tagRow) tagRow.innerHTML = `<span class="tag">${sourceLabel}</span>`;
  revealOutputCopyActions(true);
  output.scrollTop = 0;
  refreshOutputDependentPanels();
  return true;
}

function resetManualOutput() {
  const output = document.getElementById('output');
  const tagRow = document.getElementById('tag-row');
  if (!output) return;
  delete output.dataset.manualOutput;
  delete output.dataset.longifyOutput;
  output.className = 'output-box empty text-selectable';
  output.innerHTML = OUTPUT_GUIDE_HTML;
  updateOutputCounter('');
  if (tagRow) tagRow.innerHTML = '';
  revealOutputCopyActions(false);
  refreshOutputDependentPanels();
}

function installOutputIntakeControls() {
  const output = document.getElementById('output');
  if (!output) return;
  const fileInput = document.getElementById('output-import-file');
  const outputPanel = document.getElementById('output-panel');
  output.setAttribute('tabindex', '0');
  output.title = 'クリックしてCtrl+Vでも本文を貼り付けできます';

  const isEditableTarget = target => {
    const element = target?.closest?.('input, textarea, select, [contenteditable="true"]');
    return Boolean(element && element !== output);
  };

  const isOutputPasteTarget = target => {
    return target === output
      || output.contains(target)
      || target === outputPanel
      || outputPanel?.contains?.(target);
  };

  const handleOutputPaste = event => {
    if (isEditableTarget(event.target) || !isOutputPasteTarget(event.target)) return;
    const text = event.clipboardData?.getData('text/plain') || '';
    if (!normalizedManualOutputText(text)) return;
    event.preventDefault();
    setManualOutput(text, '貼り付け本文');
  };

  output.addEventListener('click', () => {
    try {
      output.focus({ preventScroll: true });
    } catch {
      output.focus();
    }
  });
  output.addEventListener('paste', handleOutputPaste);
  outputPanel?.addEventListener('paste', handleOutputPaste);

  document.getElementById('btn-output-paste')?.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      setManualOutput(text, '貼り付け本文');
    } catch {
      alert('クリップボードを読み取れませんでした。ブラウザの許可を確認してください。');
    }
  });

  document.getElementById('btn-output-import')?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', async () => {
    const file = fileInput.files?.[0];
    fileInput.value = '';
    if (!file) return;
    try {
      setManualOutput(await file.text(), file.name || 'インポート本文');
    } catch {
      alert('TXT/MDファイルを読み込めませんでした。');
    }
  });

  document.getElementById('btn-output-clear')?.addEventListener('click', resetManualOutput);
  document.getElementById('btn-generate')?.addEventListener('click', () => {
    delete output.dataset.manualOutput;
  }, true);

  installLocalQaOutputLoader();
}

function isLocalQaOrigin() {
  return ['localhost', '127.0.0.1', '[::1]'].includes(window.location.hostname);
}

function qaOutputPathFromUrl() {
  if (!isLocalQaOrigin()) return '';
  const raw = new URLSearchParams(window.location.search).get('qaOutputFile') || '';
  if (!raw || /^https?:\/\//i.test(raw)) return '';
  try {
    const url = new URL(raw, window.location.href);
    if (url.origin !== window.location.origin) return '';
    return url.pathname.startsWith('/scratch/') ? `${url.pathname}${url.search}` : '';
  } catch {
    return '';
  }
}

async function installLocalQaOutputLoader() {
  const qaPath = qaOutputPathFromUrl();
  if (!qaPath) return;
  try {
    const response = await fetch(qaPath, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    setManualOutput(await response.text(), 'QAインポート本文');
  } catch (error) {
    console.warn('QA output import failed:', error);
  }
}

function outputHasPotentialStory(output) {
  if (!output || output.classList.contains('empty')) return false;
  if (output.querySelector?.('.guide')) return false;
  const text = output.innerText || output.textContent || '';
  return text.trim().length >= 40;
}

function generationIsActive() {
  return Boolean(
    document.getElementById('btn-generate')?.disabled
    || document.getElementById('settings')?.classList.contains('generating')
  );
}

function installOutputAssistLauncher() {
  const output = document.getElementById('output');
  const generateButton = document.getElementById('btn-generate');
  if (!output) return;

  let installed = false;
  let queued = false;
  const installAssistModules = () => {
    if (installed) return;
    installed = true;
    observer.disconnect();
    installLongifyBeta();
    installKakuyomuAssist();
    installAlphapolisAssist();
  };
  const tryInstall = () => {
    queued = false;
    if (installed) return;
    const manualOutput = output.dataset.manualOutput === 'true';
    if (generationIsActive() && !manualOutput) return;
    if (outputHasPotentialStory(output) || manualOutput) {
      installAssistModules();
    }
  };
  const scheduleTryInstall = () => {
    if (queued || installed) return;
    queued = true;
    const schedule = window.requestAnimationFrame || (callback => setTimeout(callback, 0));
    schedule(tryInstall);
  };
  const observer = new MutationObserver(scheduleTryInstall);
  observer.observe(output, {
    childList: true,
    characterData: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'data-manual-output'],
  });
  generateButton && observer.observe(generateButton, {
    attributes: true,
    attributeFilter: ['disabled', 'class'],
  });
  scheduleTryInstall();
  setTimeout(scheduleTryInstall, 250);
  setTimeout(scheduleTryInstall, 1000);
  setTimeout(scheduleTryInstall, 2500);
  setTimeout(() => {
    if (!installed) installAssistModules();
  }, 3500);
}

function installPublicRuntime() {
  document.documentElement.dataset.smkPublicRuntime = 'active';
  installClickGuards();
  installDomGuard();
  installApiSessionGuard();
  installOutputIntakeControls();
  installStyleAnalyzerGenerationLockSync();
  installStandardTypewriterCursor({
    outputEl: document.getElementById('output'),
    outputPanel: document.getElementById('output-panel'),
    generateButton: document.getElementById('btn-generate'),
    longNovelPanel: document.getElementById('long-novel-panel'),
  });
  syncLongifyTargetSelect();
  installPublicOutputCleanup();
  installOutputAssistLauncher();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installPublicRuntime, { once: true });
} else {
  installPublicRuntime();
}
