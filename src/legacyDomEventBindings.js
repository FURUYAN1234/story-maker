export function bindClickHandlers(byId, bindings = []) {
  let count = 0;
  for (const binding of bindings) {
    const element = byId(binding.id);
    element.addEventListener('click', binding.handler);
    count += 1;
  }
  return { count };
}

export function bindLockToggleButtons(root, { state, onToggle } = {}) {
  const buttons = Array.from(root?.querySelectorAll?.('.btn-lock') || []);
  for (const button of buttons) {
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      const section = button.dataset.section;
      if (section && Object.prototype.hasOwnProperty.call(state.locked, section)) {
        state.locked[section] = !state.locked[section];
        onToggle(section);
      }
    });
  }
  return { count: buttons.length };
}

const DEFAULT_AXIS_SECTION_STATE = Object.freeze({
  theme: { key: 'themeSelected', cat: 'themeCategory' },
  genre: { key: 'genre', cat: 'genreCategory' },
  worldview: { key: 'worldview', cat: 'worldviewCategory' },
  target: { key: 'target', cat: 'targetCategory' },
  era: { key: 'era', cat: 'eraCategory' },
  ending: { key: 'ending', cat: 'endingCategory' },
  narr: { key: 'narration', cat: 'narrCategory' },
});

export function bindSectionClearButtons(root, {
  state,
  byId,
  setVisible,
  clearCharacters,
  resetMode,
  clearAxisSource,
  axisSectionState = DEFAULT_AXIS_SECTION_STATE,
} = {}) {
  const buttons = Array.from(root?.querySelectorAll?.('.btn-section-clear') || []);
  for (const button of buttons) {
    button.addEventListener('click', () => {
      const section = button.dataset.section;
      if (section && state?.locked?.[section]) return;

      if (state?.defaultFilled) delete state.defaultFilled[section];

      if (section === 'chars') {
        clearCharacters();
        return;
      }

      if (section === 'mode') {
        resetMode();
        return;
      }

      const customInput = byId(`${section}-custom`);
      if (customInput) customInput.value = '';
      setVisible(`${section}-custom-clear`, '');

      const categoryChips = byId(`${section}-cat-chips`);
      if (categoryChips) {
        categoryChips.querySelectorAll('.chip').forEach(chip => chip.classList.remove('active'));
      }

      const subChips = byId(`${section}-sub-chips`);
      if (subChips) subChips.innerHTML = '';

      const axis = axisSectionState[section];
      if (axis) {
        state[axis.key] = null;
        state[axis.cat] = null;
        clearAxisSource(section, null);
      }

      if (section === 'supplement') {
        byId('supplement').value = '';
        setVisible('supplement-clear', '');
      }
    });
  }
  return { count: buttons.length };
}

const FOUR_KOMA_EXPORT_LABELS = '(Topic|Logline|Location|Outfit|Punchline|Scenario)';
const FOUR_KOMA_BRACKETED_EXPORT_LABEL = new RegExp(`^【?${FOUR_KOMA_EXPORT_LABELS}:?\\s*(.*?)】?$`, 'gim');
const FOUR_KOMA_MARKDOWN_EXPORT_LABEL = new RegExp(`^\\*\\*?${FOUR_KOMA_EXPORT_LABELS}:\\*\\*?\\s*(.*?)$`, 'gim');

function normalizeExportLabel(label) {
  return `${label.charAt(0).toUpperCase()}${label.slice(1).toLowerCase()}`;
}

export function normalizeFourKomaScenarioExportText(text, mode) {
  if (mode !== '4koma_scenario') return text;
  return text
    .replace(FOUR_KOMA_BRACKETED_EXPORT_LABEL, (match, label, value) => `${normalizeExportLabel(label)}: ${value.trim()}`)
    .replace(FOUR_KOMA_MARKDOWN_EXPORT_LABEL, (match, label, value) => `${normalizeExportLabel(label)}: ${value.trim()}`);
}

function formatExportTimestamp(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0'),
  ].join('');
}

export function bindOutputCopyDownloadButtons(byId, {
  state,
  clipboardRef = globalThis.navigator?.clipboard,
  documentRef = globalThis.document,
  URLRef = globalThis.URL,
  BlobCtor = globalThis.Blob,
  DateCtor = globalThis.Date,
  setTimeoutFn = globalThis.setTimeout,
  copyLabels = { copied: 'copied', idle: 'copy' },
} = {}) {
  const copyButton = byId('btn-copy');
  const downloadButton = byId('btn-download');

  copyButton.addEventListener('click', () => {
    const outputText = byId('output').textContent;
    const text = normalizeFourKomaScenarioExportText(outputText, state.mode);
    clipboardRef.writeText(text).then(() => {
      copyButton.textContent = copyLabels.copied;
      setTimeoutFn(() => {
        copyButton.textContent = copyLabels.idle;
      }, 2000);
    });
  });

  downloadButton.addEventListener('click', () => {
    const outputText = byId('output').textContent;
    const text = normalizeFourKomaScenarioExportText(outputText, state.mode);
    const blob = new BlobCtor([text], { type: 'text/plain' });
    const link = documentRef.createElement('a');
    link.href = URLRef.createObjectURL(blob);
    link.download = `${state.lastTitle || 'story'}_${formatExportTimestamp(new DateCtor())}.txt`;
    link.click();
  });

  return { count: 2 };
}

export function bindCharacterActionButtons(byId, {
  onAdd,
  onRemove,
  onRandomContent,
  onRandomAll,
} = {}) {
  const bindings = [
    ['btn-add-char', onAdd],
    ['btn-remove-char', onRemove],
    ['btn-rand-chars-content', onRandomContent],
    ['btn-rand-chars-all', onRandomAll],
  ];

  let count = 0;
  for (const [id, handler] of bindings) {
    byId(id).addEventListener('click', handler);
    count += 1;
  }
  return { count };
}
