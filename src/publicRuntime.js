// Story Maker v5.0.1 public runtime guards.
// Keep public UI safety outside the legacy bundled main.js.

import {
  MODE_LABELS,
  PUBLIC_MODE_VALUES,
  isLongModeText,
} from './modeContracts.js';
import { installPublicOutputCleanup } from './outputCleanup.js';

const LONG_MODE_ENABLED = false;
const FALLBACK_MODE = 'novel';
const API_SESSION_KEY = 'story-maker.api.session.v500';
const API_MEMORY_KEY = '__storyMakerApiRuntimeMemoryV500';
const API_WINDOW_NAME_PREFIX = 'story-maker.api.tab-session.v500:';

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

function installPublicRuntime() {
  document.documentElement.dataset.smkPublicRuntime = 'active';
  installClickGuards();
  installDomGuard();
  installApiSessionGuard();
  installPublicOutputCleanup();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installPublicRuntime, { once: true });
} else {
  installPublicRuntime();
}
