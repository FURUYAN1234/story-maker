export const STANDARD_TYPEWRITER_CURSOR_CLASS = 'standard-typewriter-cursor';

function getDocumentForElement(element) {
  if (element?.ownerDocument) return element.ownerDocument;
  if (typeof document !== 'undefined') return document;
  return null;
}

export function renderStandardTypewriterOutput(outputEl, text, { showCursor = true } = {}) {
  if (!outputEl) return { text: '', cursor: false };

  const renderedText = String(text ?? '');
  const doc = getDocumentForElement(outputEl);

  if (!doc || typeof outputEl.replaceChildren !== 'function') {
    outputEl.textContent = renderedText;
    if (outputEl.dataset) delete outputEl.dataset.standardTypewriterRendering;
    return { text: renderedText, cursor: false };
  }

  const nodes = [doc.createTextNode(renderedText)];
  if (showCursor) {
    const cursor = doc.createElement('span');
    cursor.className = STANDARD_TYPEWRITER_CURSOR_CLASS;
    cursor.setAttribute('aria-hidden', 'true');
    cursor.setAttribute('data-standard-typewriter-cursor', 'true');
    nodes.push(cursor);
    if (outputEl.dataset) outputEl.dataset.standardTypewriterRendering = 'true';
  } else if (outputEl.dataset) {
    delete outputEl.dataset.standardTypewriterRendering;
  }

  outputEl.replaceChildren(...nodes);
  return { text: renderedText, cursor: showCursor };
}

export function getStandardTypewriterText(outputEl) {
  if (!outputEl) return '';
  const cursorSelector = `.${STANDARD_TYPEWRITER_CURSOR_CLASS}`;
  const cursor = outputEl.querySelector?.(cursorSelector) || null;
  if (!cursor) return outputEl.textContent || '';

  return Array.from(outputEl.childNodes || [])
    .filter(node => node !== cursor)
    .map(node => node.textContent || '')
    .join('');
}

export function clearStandardTypewriterCursor(outputEl) {
  if (!outputEl) return;
  outputEl.querySelectorAll?.(`.${STANDARD_TYPEWRITER_CURSOR_CLASS}`)
    .forEach(cursor => cursor.remove());
  if (outputEl.dataset) delete outputEl.dataset.standardTypewriterRendering;
}

function isRenderedStandardTypewriterOutput(outputEl, text) {
  const cursor = outputEl?.querySelector?.(`.${STANDARD_TYPEWRITER_CURSOR_CLASS}`) || null;
  if (!cursor) return false;
  const nodes = Array.from(outputEl.childNodes || []);
  return (
    nodes.length === 2
    && nodes[0]?.textContent === String(text ?? '')
    && nodes[1] === cursor
  );
}

function isPlaceholderOutput(text) {
  return /^(?:AIの思考を待っています|本文ストリームを受信しています|フォールバック中|エラー:)/u
    .test(String(text || '').trim());
}

function scrollOutputToTypewriterEnd(outputEl, outputPanel) {
  if (!outputEl) return;
  outputEl.scrollTop = outputEl.scrollHeight;
  if (!outputPanel) return;
  if (outputPanel.style) outputPanel.style.scrollBehavior = 'auto';
  const cursor = outputEl.querySelector?.(`.${STANDARD_TYPEWRITER_CURSOR_CLASS}`);
  const panelHeight = Number(outputPanel.clientHeight) || 0;
  const targetBottom = cursor
    ? (Number(outputEl.offsetTop) || 0) + (Number(cursor.offsetTop) || 0) + (Number(cursor.offsetHeight) || 0)
    : (Number(outputEl.offsetTop) || 0) + (Number(outputEl.offsetHeight) || 0);
  const saSection = outputPanel.ownerDocument?.getElementById?.('sa-section');
  const maxBeforeNextSection = saSection
    ? (Number(saSection.offsetTop) || 0) - panelHeight - 12
    : targetBottom - panelHeight + 16;
  outputPanel.scrollTop = Math.max(0, Math.min(targetBottom - panelHeight + 16, maxBeforeNextSection));
}

export function shouldShowStandardTypewriterCursor({
  outputEl,
  generateButton,
  longNovelPanel,
  text = getStandardTypewriterText(outputEl),
} = {}) {
  if (!outputEl || !generateButton?.disabled) return false;
  if (outputEl.classList?.contains?.('empty')) return false;
  if (outputEl.dataset?.manualOutput === 'true') return false;
  if (outputEl.dataset?.longifyRendering === 'true') return false;
  if (longNovelPanel?.classList?.contains?.('ln-generating')) return false;
  const trimmed = String(text || '').trim();
  return Boolean(trimmed) && !isPlaceholderOutput(trimmed);
}

export function installStandardTypewriterCursor({
  outputEl,
  outputPanel,
  generateButton,
  longNovelPanel,
  observerFactory,
  scheduleFrame,
} = {}) {
  if (!outputEl) return { installed: false };

  const doc = getDocumentForElement(outputEl);
  const MutationObserverCtor = observerFactory
    || (typeof MutationObserver !== 'undefined' ? MutationObserver : null);
  const requestFrame = scheduleFrame
    || (typeof requestAnimationFrame === 'function' ? requestAnimationFrame : callback => setTimeout(callback, 0));

  let applying = false;
  let pendingSync = false;

  const sync = () => {
    if (applying) {
      pendingSync = true;
      return;
    }
    const text = getStandardTypewriterText(outputEl);
    if (!shouldShowStandardTypewriterCursor({
      outputEl,
      generateButton,
      longNovelPanel,
      text,
    })) {
      clearStandardTypewriterCursor(outputEl);
      return;
    }

    if (isRenderedStandardTypewriterOutput(outputEl, text)) {
      requestFrame(() => scrollOutputToTypewriterEnd(outputEl, outputPanel || outputEl.closest?.('.output-panel')));
      return;
    }

    applying = true;
    renderStandardTypewriterOutput(outputEl, text, { showCursor: true });
    requestFrame(() => {
      scrollOutputToTypewriterEnd(outputEl, outputPanel || outputEl.closest?.('.output-panel'));
      applying = false;
      if (pendingSync) {
        pendingSync = false;
        sync();
      }
    });
  };

  sync();

  if (!MutationObserverCtor) return { installed: true, sync, disconnect() {} };

  const outputObserver = new MutationObserverCtor(sync);
  outputObserver.observe(outputEl, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  let buttonObserver = null;
  if (generateButton) {
    buttonObserver = new MutationObserverCtor(sync);
    buttonObserver.observe(generateButton, {
      attributes: true,
      attributeFilter: ['disabled', 'class', 'aria-disabled'],
    });
  }

  let longNovelObserver = null;
  if (longNovelPanel) {
    longNovelObserver = new MutationObserverCtor(sync);
    longNovelObserver.observe(longNovelPanel, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  doc?.defaultView?.addEventListener?.('story-maker:output-updated', sync);

  return {
    installed: true,
    sync,
    disconnect() {
      outputObserver.disconnect();
      buttonObserver?.disconnect();
      longNovelObserver?.disconnect();
      doc?.defaultView?.removeEventListener?.('story-maker:output-updated', sync);
    },
  };
}
