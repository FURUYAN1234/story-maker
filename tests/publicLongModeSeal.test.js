import assert from 'node:assert/strict';

import { createPublicLongModeSealController } from '../src/publicLongModeSeal.js';

function createClassList(initial = []) {
  const values = new Set(initial);
  return {
    add: (...names) => names.forEach((name) => values.add(name)),
    remove: (...names) => names.forEach((name) => values.delete(name)),
    contains: (name) => values.has(name),
    toggle(name, force) {
      const shouldAdd = typeof force === 'boolean' ? force : !values.has(name);
      if (shouldAdd) values.add(name);
      else values.delete(name);
      return shouldAdd;
    },
  };
}

function createButton({ id = '', value = '', text = '', disabled = false, classes = [] } = {}) {
  return {
    id,
    disabled,
    textContent: text,
    title: '',
    style: {},
    dataset: value ? { v: value } : {},
    attributes: {},
    events: {},
    classList: createClassList(classes),
    setAttribute(name, valueToSet) {
      this.attributes[name] = String(valueToSet);
    },
    addEventListener(type, handler) {
      this.events[type] = handler;
    },
    closest(selector) {
      return selector === 'button' ? this : null;
    },
  };
}

function createElement(props = {}) {
  return {
    value: '',
    textContent: '',
    className: '',
    dataset: {},
    style: {},
    children: [],
    classList: createClassList(props.classes || []),
    querySelectorAll(selector) {
      if (selector === 'button[data-v]') return this.children.filter((child) => child.dataset?.v);
      if (selector === 'button[data-v="long"]') return this.children.filter((child) => child.dataset?.v === 'long');
      if (selector === '.chip') return this.children;
      return [];
    },
    ...props,
  };
}

function createDocument(elements) {
  return {
    readyState: 'complete',
    documentElement: { dataset: {} },
    events: {},
    getElementById(id) {
      return elements[id] || null;
    },
    querySelector(selector) {
      if (selector === '#mode-chips .chip.active') {
        return elements['mode-chips']?.children.find((child) => child.classList.contains('active')) || null;
      }
      if (selector === '.btn-lock[data-section="mode"]') {
        return elements.modeLockButton || null;
      }
      return null;
    },
    addEventListener(type, handler) {
      this.events[type] = handler;
    },
  };
}

{
  const longButton = createButton({ value: 'long', text: 'Long', classes: ['chip', 'active'] });
  const novelButton = createButton({ value: 'novel', text: 'Short', classes: ['chip'] });
  const elements = {
    'mode-custom': createElement({ value: 'long' }),
    'mode-custom-clear': createElement(),
    'mode-chips': createElement({ children: [longButton, novelButton] }),
    'long-novel-panel': createElement({ classes: ['ln-generating'] }),
    'output-panel': createElement({ classes: ['ln-live-preview', 'ln-novel-scroll'] }),
  };
  const state = { mode: 'long', longNovel: { active: true } };
  let stopCount = 0;
  const controller = createPublicLongModeSealController({
    state,
    modeOptions: [{ value: 'long', label: 'Long' }],
    documentRef: createDocument(elements),
    getModeLabel: () => 'Short label',
    stopLongSession: () => { stopCount += 1; },
  });

  controller.syncSeal();

  assert.equal(state.mode, 'novel');
  assert.equal(stopCount, 1);
  assert.equal(elements['mode-custom'].value, 'Short label');
  assert.equal(longButton.disabled, true);
  assert.equal(longButton.attributes['aria-disabled'], 'true');
  assert.equal(longButton.style.display, 'none');
  assert.equal(longButton.classList.contains('active'), false);
  assert.equal(novelButton.classList.contains('active'), true);
  assert.equal(elements['long-novel-panel'].classList.contains('hidden'), true);
  assert.equal(elements['output-panel'].classList.contains('ln-live-preview'), false);
}

{
  const modeOptions = [{ value: 'scenario', label: 'Scenario' }];
  const controller = createPublicLongModeSealController({
    modeOptions,
    longModeEnabled: true,
    documentRef: createDocument({}),
  });

  controller.syncLongOption();

  assert.deepEqual(modeOptions.map((option) => option.value), ['long', 'scenario']);
  assert.equal(typeof controller.getDisabledMessage(), 'string');
  assert.ok(controller.getDisabledMessage().length > 0);
  assert.equal(controller.getLongOption().value, 'long');
}

{
  const komaButton = createButton({ value: '4koma', text: '4koma', classes: ['chip', 'active'] });
  const longButton = createButton({ value: 'long', text: 'Long', classes: ['chip'] });
  const novelButton = createButton({ value: 'novel', text: 'Short', classes: ['chip'] });
  const elements = {
    'mode-custom': createElement(),
    'mode-custom-clear': createElement(),
    'mode-chips': createElement({ children: [komaButton, longButton, novelButton] }),
  };
  const state = { mode: '4koma' };
  let cleared = null;
  let defaults = null;
  const controller = createPublicLongModeSealController({
    state,
    documentRef: createDocument(elements),
    setModeCustomClear: (id, label) => { cleared = { id, label }; },
    applyModeDefaults: (mode, options) => { defaults = { mode, options }; },
    random: () => 0,
  });

  assert.equal(controller.randomizePublicMode(), true);
  assert.equal(state.mode, 'novel');
  assert.equal(state.modeSource, 'random');
  assert.equal(elements['mode-custom'].value, 'Short');
  assert.deepEqual(cleared, { id: 'mode-custom-clear', label: 'Short' });
  assert.deepEqual(defaults, { mode: 'novel', options: { forceModeLabel: true, includeAxes: false } });
  assert.equal(komaButton.classList.contains('active'), false);
  assert.equal(novelButton.classList.contains('active'), true);
}

{
  const longButton = createButton({ value: 'long', text: 'Long' });
  const doc = createDocument({ 'mode-chips': createElement({ children: [longButton] }) });
  let alertText = '';
  const controller = createPublicLongModeSealController({
    documentRef: doc,
    alertFn: (message) => { alertText = message; },
  });
  const event = {
    target: longButton,
    prevented: false,
    stopped: false,
    preventDefault() { this.prevented = true; },
    stopImmediatePropagation() { this.stopped = true; },
  };

  controller.handleGlobalClick(event);

  assert.equal(event.prevented, true);
  assert.equal(event.stopped, true);
  assert.equal(alertText, controller.getDisabledMessage());
}

{
  const genButton = createButton({ text: 'Working' });
  const output = createElement({ className: 'old', textContent: 'old' });
  let originalCalls = 0;
  let stopCount = 0;
  let logText = '';
  let idleCount = 0;
  const controller = createPublicLongModeSealController({
    documentRef: createDocument({}),
    stopLongSession: () => { stopCount += 1; },
    logStatus: (message) => { logText = message; },
    setIdle: () => { idleCount += 1; },
  });
  const wrapped = controller.wrapGenerateStart(async () => {
    originalCalls += 1;
    return 'generated';
  });

  const result = await wrapped('event', genButton, output);

  assert.equal(result, undefined);
  assert.equal(originalCalls, 0);
  assert.equal(stopCount, 1);
  assert.ok(logText.length > 0);
  assert.equal(idleCount, 1);
  assert.equal(genButton.disabled, false);
  assert.equal(output.className, 'output-box text-selectable');
  assert.equal(output.textContent, controller.getDisabledMessage());
}

{
  let originalCalls = 0;
  const controller = createPublicLongModeSealController({ longModeEnabled: true });
  const wrapped = controller.wrapContinue(async (value) => {
    originalCalls += 1;
    return `ok:${value}`;
  });

  assert.equal(await wrapped('next'), 'ok:next');
  assert.equal(originalCalls, 1);
}

console.log('publicLongModeSeal tests passed');
