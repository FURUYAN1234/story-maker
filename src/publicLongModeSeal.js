import {
  collectPublicModeSignal,
  isLongModeSignal,
  normalizePublicModeOptions,
  pickPublicModeOption,
} from './publicModeState.js';

function callIfFunction(fn, ...args) {
  return typeof fn === 'function' ? fn(...args) : undefined;
}

function getDoc(documentRef) {
  return documentRef || (typeof document !== 'undefined' ? document : null);
}

export function createPublicLongModeSealController({
  state,
  modeOptions,
  longModeEnabled = false,
  documentRef,
  getModeLabel,
  setModeCustomClear,
  applyModeDefaults,
  stopLongSession,
  logStatus,
  setIdle,
  refreshStyleAnalyzer,
  random = Math.random,
  alertFn,
} = {}) {
  const enabled = !!longModeEnabled;
  const getDocument = () => getDoc(documentRef);
  const getState = () => state || {};

  function isCurrentLongMode() {
    try {
      const doc = getDocument();
      const currentState = getState();
      const customInput = doc?.getElementById?.('mode-custom');
      const activeChip = doc?.querySelector?.('#mode-chips .chip.active');
      return isLongModeSignal(collectPublicModeSignal({
        state: currentState,
        modeCustomInputValue: customInput && customInput.value,
        activeModeValue: activeChip?.dataset?.v,
      }));
    } catch {
      return false;
    }
  }

  function getDisabledMessage() {
    return enabled
      ? '長編モードは有効です。'
      : '長編モードは現在機能停止中です。短編・中編など公開モードを選択してください。';
  }

  function getLongOption() {
    return { value: 'long', label: enabled ? '長編小説' : '長編小説（機能停止中）' };
  }

  function syncLongOption() {
    try {
      if (!Array.isArray(modeOptions)) return;
      let option = modeOptions.find((entry) => entry && entry.value === 'long');
      if (!option && enabled) {
        option = getLongOption();
        const scenarioIndex = modeOptions.findIndex((entry) => entry && entry.value === 'scenario');
        if (scenarioIndex >= 0) {
          modeOptions.splice(scenarioIndex, 0, option);
        } else {
          modeOptions.push(option);
        }
      }
      if (option) option.label = getLongOption().label;
    } catch (error) {
      console.warn('[v4.9.7] long option restore failed', error);
    }
  }

  function isModeLocked() {
    const doc = getDocument();
    const lockButton = doc?.querySelector?.('.btn-lock[data-section="mode"]');
    const section = doc?.getElementById?.('section-mode');
    return !!(
      section?.classList?.contains?.('is-locked')
      || (lockButton && /🔒/.test(lockButton.textContent || ''))
    );
  }

  function randomizePublicMode() {
    try {
      const currentState = getState();
      if (enabled || !currentState || isModeLocked()) return false;
      const doc = getDocument();
      const chips = doc?.getElementById?.('mode-chips');
      const options = normalizePublicModeOptions(
        Array.from(chips ? chips.querySelectorAll('button[data-v]') : [])
          .map((button) => ({ value: button.dataset?.v, label: button.textContent, button }))
          .filter((option) => option.value && option.button && !option.button.disabled),
      );
      const selected = pickPublicModeOption(options, currentState.mode, random);
      if (!selected) return false;
      const customInput = doc?.getElementById?.('mode-custom');
      currentState.mode = selected.value;
      currentState.modeSource = 'random';
      chips?.querySelectorAll?.('.chip')?.forEach?.((chip) => {
        chip.classList.toggle('active', chip.dataset.v === selected.value);
      });
      if (customInput) customInput.value = selected.label;
      callIfFunction(setModeCustomClear, 'mode-custom-clear', selected.label);
      callIfFunction(applyModeDefaults, currentState.mode, { forceModeLabel: true, includeAxes: false });
      syncSeal();
      return true;
    } catch (error) {
      console.warn('[v4.9.7] public mode random failed', error);
      return false;
    }
  }

  function resetToNovel() {
    const doc = getDocument();
    const currentState = getState();
    if (!currentState) return;
    currentState.mode = 'novel';
    currentState.modeSource = 'selected';
    if (currentState.longNovel?.active || currentState.longNovel?.isPaused) {
      callIfFunction(stopLongSession);
    }
    const label = callIfFunction(getModeLabel, 'novel') || '短編小説（4500字～）';
    const customInput = doc?.getElementById?.('mode-custom');
    const clearButton = doc?.getElementById?.('mode-custom-clear');
    const chips = doc?.getElementById?.('mode-chips');
    if (customInput) customInput.value = label;
    clearButton?.classList?.toggle?.('hidden', !label);
    chips?.querySelectorAll?.('.chip')?.forEach?.((chip) => {
      chip.classList.toggle('active', chip.dataset.v === 'novel');
    });
    const longPanel = doc?.getElementById?.('long-novel-panel');
    longPanel?.classList?.add?.('hidden');
    longPanel?.classList?.remove?.('ln-generating', 'ln-completed');
    const outputPanel = doc?.getElementById?.('output-panel');
    outputPanel?.classList?.remove?.('ln-live-preview', 'ln-novel-scroll');
  }

  function syncLongModeButtons() {
    const doc = getDocument();
    doc?.getElementById?.('mode-chips')?.querySelectorAll?.('button[data-v="long"]')?.forEach?.((button) => {
      if (enabled) {
        button.disabled = false;
        button.setAttribute('aria-disabled', 'false');
        button.title = '長編モードを利用できます。';
        button.classList.remove('is-disabled');
        button.textContent = '長編小説';
        button.style.opacity = '';
        button.style.cursor = '';
        button.style.display = '';
      } else {
        button.disabled = true;
        button.setAttribute('aria-disabled', 'true');
        button.title = '長編モードは公開UIから非表示です。';
        button.classList.remove('active');
        button.classList.add('is-disabled');
        button.textContent = '長編小説';
        button.style.display = 'none';
      }
    });
  }

  function syncSeal() {
    try {
      const doc = getDocument();
      if (doc?.documentElement?.dataset) {
        doc.documentElement.dataset.longNovelSealed = enabled ? 'active' : 'true';
      }
      syncLongOption();
      syncLongModeButtons();
      if (!enabled && isCurrentLongMode()) {
        resetToNovel();
      }
    } catch (error) {
      console.warn('[v4.9.7] long mode state failed', error);
    }
  }

  function installRandomButton() {
    const doc = getDocument();
    const randomButton = doc?.getElementById?.('btn-rand-mode');
    if (!randomButton || randomButton.dataset.smModeRandomV497 === '1') return;
    randomButton.dataset.smModeRandomV497 = '1';
    randomButton.addEventListener('click', (event) => {
      if (!enabled && randomizePublicMode()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  function handleGlobalClick(event) {
    const button = event.target?.closest?.('button');
    if (!button) return;
    if (button.id === 'btn-rand-mode' && !enabled) {
      if (randomizePublicMode()) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
      return;
    }
    if (enabled) return;
    if (button.dataset?.v === 'long') {
      event.preventDefault();
      event.stopImmediatePropagation();
      syncSeal();
      callIfFunction(alertFn || (typeof alert !== 'undefined' ? alert : null), getDisabledMessage());
      return;
    }
    if ((button.id === 'btn-generate' || button.classList.contains('btn-generate')) && isCurrentLongMode()) {
      event.preventDefault();
      event.stopImmediatePropagation();
      syncSeal();
      callIfFunction(alertFn || (typeof alert !== 'undefined' ? alert : null), getDisabledMessage());
    }
  }

  function wrapGenerateStart(original) {
    return async function publicLongModeGenerateWrapper(...args) {
      if (enabled) return original.apply(this, args);
      callIfFunction(stopLongSession);
      callIfFunction(logStatus, '[停止] 長編モードは現在機能停止中です。生成は開始しません。');
      const button = args[1];
      const output = args[2];
      if (button) {
        button.disabled = false;
        button.textContent = 'ストーリー生成';
      }
      if (output) {
        output.className = 'output-box text-selectable';
        output.textContent = getDisabledMessage();
      }
      callIfFunction(setIdle);
      syncSeal();
      return undefined;
    };
  }

  function wrapContinue(original) {
    return async function publicLongModeContinueWrapper(...args) {
      if (enabled) return original.apply(this, args);
      callIfFunction(stopLongSession);
      callIfFunction(logStatus, '[停止] 長編モードは現在機能停止中です。次章生成は開始しません。');
      callIfFunction(setIdle);
      syncSeal();
      return undefined;
    };
  }

  return {
    isCurrentLongMode,
    getDisabledMessage,
    getLongOption,
    syncLongOption,
    isModeLocked,
    randomizePublicMode,
    resetToNovel,
    syncLongModeButtons,
    syncSeal,
    installRandomButton,
    handleGlobalClick,
    wrapGenerateStart,
    wrapContinue,
    refreshStyleAnalyzer,
  };
}
