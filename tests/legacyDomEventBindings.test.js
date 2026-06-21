import assert from 'node:assert/strict';
import {
  bindCharacterActionButtons,
  bindClickHandlers,
  bindLockToggleButtons,
  bindOutputCopyDownloadButtons,
  bindSectionClearButtons,
  normalizeFourKomaScenarioExportText,
} from '../src/legacyDomEventBindings.js';

function createButton(id = '') {
  return {
    id,
    dataset: {},
    handlers: {},
    addEventListener(type, handler) {
      this.handlers[type] = handler;
    },
  };
}

const saveButton = createButton('key-save');
const reloadButton = createButton('btn-reload');
const calls = [];
assert.deepEqual(
  bindClickHandlers(
    id => ({ 'key-save': saveButton, 'btn-reload': reloadButton })[id],
    [
      { id: 'key-save', handler: () => calls.push('save') },
      { id: 'btn-reload', handler: () => calls.push('reload') },
    ],
  ),
  { count: 2 },
);
saveButton.handlers.click();
reloadButton.handlers.click();
assert.deepEqual(calls, ['save', 'reload']);

const lockButton = createButton();
lockButton.dataset.section = 'theme';
const ignoredButton = createButton();
ignoredButton.dataset.section = 'missing';
const events = [];
const root = {
  querySelectorAll(selector) {
    assert.equal(selector, '.btn-lock');
    return [lockButton, ignoredButton];
  },
};
const state = { locked: { theme: false } };
assert.deepEqual(bindLockToggleButtons(root, {
  state,
  onToggle(section) {
    events.push(section);
  },
}), { count: 2 });

const eventLog = [];
lockButton.handlers.click({
  preventDefault: () => eventLog.push('prevent'),
  stopPropagation: () => eventLog.push('stop'),
});
assert.deepEqual(eventLog, ['prevent', 'stop']);
assert.equal(state.locked.theme, true);
assert.deepEqual(events, ['theme']);

ignoredButton.handlers.click({
  preventDefault() {},
  stopPropagation() {},
});
assert.deepEqual(events, ['theme']);

function createClassList(initial = []) {
  const classes = new Set(initial);
  return {
    remove(name) {
      classes.delete(name);
    },
    toggle(name, force) {
      if (force) classes.add(name);
      else classes.delete(name);
    },
    contains(name) {
      return classes.has(name);
    },
  };
}

function createChip(dataset = {}) {
  return {
    dataset,
    classList: createClassList(['active']),
  };
}

function createElement({ value = '', chips = [] } = {}) {
  return {
    value,
    innerHTML: 'existing',
    chips,
    querySelectorAll(selector) {
      assert.equal(selector, '.chip');
      return chips;
    },
  };
}

const sectionButtons = ['theme', 'mode', 'chars', 'supplement', 'genre'].map(section => {
  const button = createButton();
  button.dataset.section = section;
  return button;
});
const themeCategoryChip = createChip({ cat: 'basic' });
const themeElements = {
  'theme-custom': createElement({ value: 'old theme' }),
  'theme-cat-chips': createElement({ chips: [themeCategoryChip] }),
  'theme-sub-chips': createElement(),
  supplement: createElement({ value: 'old supplement' }),
};
const modeChip4koma = createChip({ v: '4koma' });
const modeChipNovel = createChip({ v: 'novel' });
modeChip4koma.classList = createClassList([]);
modeChipNovel.classList = createClassList(['active']);
themeElements['mode-chips'] = createElement({ chips: [modeChip4koma, modeChipNovel] });
themeElements['mode-custom'] = createElement({ value: 'old mode' });

const visibilityCalls = [];
const clearAxisCalls = [];
const clearActions = [];
const sectionState = {
  locked: { theme: false, genre: true, chars: false, mode: false, supplement: false },
  defaultFilled: {
    theme: 'default theme',
    genre: 'default genre',
    chars: 'default chars',
    mode: 'default mode',
    supplement: 'default supplement',
  },
  themeSelected: 'old selected',
  themeCategory: 'old category',
  genre: 'old genre',
  genreCategory: 'old genre category',
  mode: 'custom',
  modeSource: 'manual',
};
const sectionRoot = {
  querySelectorAll(selector) {
    assert.equal(selector, '.btn-section-clear');
    return sectionButtons;
  },
};

assert.deepEqual(bindSectionClearButtons(sectionRoot, {
  state: sectionState,
  byId(id) {
    return themeElements[id] || null;
  },
  setVisible(id, value) {
    visibilityCalls.push([id, value]);
  },
  clearCharacters() {
    clearActions.push('chars');
  },
  resetMode() {
    sectionState.mode = '4koma';
    delete sectionState.modeSource;
    themeElements['mode-chips'].querySelectorAll('.chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.v === '4koma');
    });
    themeElements['mode-custom'].value = '';
    visibilityCalls.push(['mode-custom-clear', '']);
    clearActions.push('mode-defaults');
  },
  clearAxisSource(section, source) {
    clearAxisCalls.push([section, source]);
  },
}), { count: 5 });

sectionButtons[0].handlers.click();
assert.equal(themeElements['theme-custom'].value, '');
assert.equal(themeCategoryChip.classList.contains('active'), false);
assert.equal(themeElements['theme-sub-chips'].innerHTML, '');
assert.equal(sectionState.themeSelected, null);
assert.equal(sectionState.themeCategory, null);
assert.deepEqual(clearAxisCalls, [['theme', null]]);
assert.equal('theme' in sectionState.defaultFilled, false);

sectionButtons[1].handlers.click();
assert.equal(sectionState.mode, '4koma');
assert.equal('modeSource' in sectionState, false);
assert.equal(modeChip4koma.classList.contains('active'), true);
assert.equal(modeChipNovel.classList.contains('active'), false);
assert.equal(themeElements['mode-custom'].value, '');
assert.ok(clearActions.includes('mode-defaults'));

sectionButtons[2].handlers.click();
assert.ok(clearActions.includes('chars'));

sectionButtons[3].handlers.click();
assert.equal(themeElements.supplement.value, '');
assert.ok(visibilityCalls.some(call => call[0] === 'supplement-clear' && call[1] === ''));

sectionButtons[4].handlers.click();
assert.equal(sectionState.genre, 'old genre');
assert.equal(sectionState.genreCategory, 'old genre category');
assert.equal('genre' in sectionState.defaultFilled, true);

assert.equal(
  normalizeFourKomaScenarioExportText('【Topic:  sugar oath】\n**Scenario:**  first panel', '4koma_scenario'),
  'Topic: sugar oath\nScenario: first panel',
);
assert.equal(
  normalizeFourKomaScenarioExportText('【Topic:  sugar oath】', 'short'),
  '【Topic:  sugar oath】',
);

class FakeBlob {
  constructor(parts, options) {
    this.parts = parts;
    this.options = options;
  }
}

class FakeDate {
  getFullYear() { return 2026; }
  getMonth() { return 5; }
  getDate() { return 21; }
  getHours() { return 1; }
  getMinutes() { return 2; }
  getSeconds() { return 3; }
}

const copyButton = createButton('btn-copy');
copyButton.textContent = 'copy';
const downloadButton = createButton('btn-download');
const outputElement = { textContent: '**Topic:**  sugar oath' };
const links = [];
const clipboardWrites = [];
const outputState = { mode: '4koma_scenario', lastTitle: 'sample-title' };
assert.deepEqual(bindOutputCopyDownloadButtons(id => ({
  'btn-copy': copyButton,
  'btn-download': downloadButton,
  output: outputElement,
})[id], {
  state: outputState,
  clipboardRef: {
    writeText(text) {
      clipboardWrites.push(text);
      return Promise.resolve();
    },
  },
  documentRef: {
    createElement(tag) {
      assert.equal(tag, 'a');
      const link = {
        clicked: false,
        click() {
          this.clicked = true;
          links.push(this);
        },
      };
      return link;
    },
  },
  URLRef: {
    createObjectURL(blob) {
      assert.deepEqual(blob.parts, ['Topic: sugar oath']);
      assert.deepEqual(blob.options, { type: 'text/plain' });
      return 'blob:story';
    },
  },
  BlobCtor: FakeBlob,
  DateCtor: FakeDate,
  setTimeoutFn(callback, delay) {
    assert.equal(delay, 2000);
    callback();
  },
  copyLabels: { copied: 'copied', idle: 'copy' },
}), { count: 2 });

copyButton.handlers.click();
await Promise.resolve();
assert.deepEqual(clipboardWrites, ['Topic: sugar oath']);
assert.equal(copyButton.textContent, 'copy');

downloadButton.handlers.click();
assert.equal(links.length, 1);
assert.equal(links[0].href, 'blob:story');
assert.equal(links[0].download, 'sample-title_20260621010203.txt');
assert.equal(links[0].clicked, true);

const characterButtons = {
  'btn-add-char': createButton('btn-add-char'),
  'btn-remove-char': createButton('btn-remove-char'),
  'btn-rand-chars-content': createButton('btn-rand-chars-content'),
  'btn-rand-chars-all': createButton('btn-rand-chars-all'),
};
const characterActions = [];
assert.deepEqual(bindCharacterActionButtons(id => characterButtons[id], {
  onAdd: () => characterActions.push('add'),
  onRemove: () => characterActions.push('remove'),
  onRandomContent: () => characterActions.push('content'),
  onRandomAll: () => characterActions.push('all'),
}), { count: 4 });
characterButtons['btn-add-char'].handlers.click();
characterButtons['btn-remove-char'].handlers.click();
characterButtons['btn-rand-chars-content'].handlers.click();
characterButtons['btn-rand-chars-all'].handlers.click();
assert.deepEqual(characterActions, ['add', 'remove', 'content', 'all']);

console.log('legacyDomEventBindings tests passed');
