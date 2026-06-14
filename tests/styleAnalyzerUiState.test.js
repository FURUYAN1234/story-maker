import assert from 'node:assert/strict';

import { Xd, Yd, Zs } from '../src/styleAnalyzerUiState.js';

class ClassListStub {
  constructor() {
    this.values = new Set();
  }

  add(value) {
    this.values.add(value);
  }

  remove(value) {
    this.values.delete(value);
  }

  contains(value) {
    return this.values.has(value);
  }
}

const createElement = (text = '', children = []) => {
  const attributes = new Map();
  return {
    _origText: '',
    classList: new ClassListStub(),
    disabled: false,
    innerHTML: '',
    style: {},
    textContent: text,
    children,
    getAttribute: name => attributes.get(name) ?? null,
    hasAttribute: name => attributes.has(name),
    removeAttribute: name => attributes.delete(name),
    setAttribute: (name, value) => attributes.set(name, String(value)),
    querySelectorAll: () => children,
  };
};

const enabledStyleButton = createElement('Analyze');
const alreadyDisabledStyleInput = createElement();
alreadyDisabledStyleInput.disabled = true;

const elements = {
  settings: createElement(),
  'sa-section': createElement('', [enabledStyleButton, alreadyDisabledStyleInput]),
  'sa-api-status': createElement(),
  'sa-reflect-api-status': createElement(),
  'global-alert': createElement(),
  'thought-score-board': createElement(),
};
const button = createElement('Generate');

const originalDocument = globalThis.document;
globalThis.document = {
  getElementById: id => elements[id] || null,
  querySelector: selector => (selector === '.btn-generate' ? button : null),
};

try {
  Yd('Working');

  assert.equal(elements.settings.classList.contains('generating'), true);
  assert.equal(elements['sa-section'].classList.contains('generating'), true);
  assert.equal(elements['sa-section'].getAttribute('aria-disabled'), 'true');
  assert.equal(enabledStyleButton.disabled, true);
  assert.equal(alreadyDisabledStyleInput.disabled, true);
  assert.equal(button.disabled, true);
  assert.equal(button._origText, 'Generate');
  assert.match(button.innerHTML, /Working/);
  assert.equal(elements['sa-api-status'].classList.contains('hidden'), false);
  assert.equal(elements['sa-reflect-api-status'].classList.contains('hidden'), false);
  assert.equal(elements['global-alert'].style.display, 'flex');
  assert.equal(elements['thought-score-board'].style.display, 'none');

  Zs('Still working');

  assert.match(elements['sa-api-status'].innerHTML, /Still working/);
  assert.match(elements['sa-reflect-api-status'].innerHTML, /Still working/);
  assert.match(button.innerHTML, /Still working/);

  Xd();

  assert.equal(elements.settings.classList.contains('generating'), false);
  assert.equal(elements['sa-section'].classList.contains('generating'), false);
  assert.equal(elements['sa-section'].getAttribute('aria-disabled'), 'false');
  assert.equal(enabledStyleButton.disabled, false);
  assert.equal(alreadyDisabledStyleInput.disabled, true);
  assert.equal(button.disabled, false);
  assert.equal(button.textContent, 'Generate');
  assert.equal(elements['sa-api-status'].classList.contains('hidden'), true);
  assert.equal(elements['sa-reflect-api-status'].classList.contains('hidden'), true);
  assert.equal(elements['global-alert'].style.display, 'none');
} finally {
  if (originalDocument) {
    globalThis.document = originalDocument;
  } else {
    delete globalThis.document;
  }
}
