// Story Maker v5.0.0 public runtime guards.
// Keep public UI safety outside the legacy bundled main.js.

import {
  MODE_LABELS,
  PUBLIC_MODE_VALUES,
  isLongModeText,
} from './modeContracts.js';
import { installPublicOutputCleanup } from './outputCleanup.js';

const LONG_MODE_ENABLED = false;
const FALLBACK_MODE = 'novel';

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

function installPublicRuntime() {
  document.documentElement.dataset.smkPublicRuntime = 'active';
  installClickGuards();
  installDomGuard();
  installPublicOutputCleanup();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', installPublicRuntime, { once: true });
} else {
  installPublicRuntime();
}
