import assert from 'node:assert/strict';

import { createApiTabSessionPersistence } from '../src/apiTabSessionPersistence.js';

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem: key => store.get(key) || null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
    size: () => store.size,
  };
}

function createFakeElement() {
  const listeners = new Map();
  return {
    listeners,
    addEventListener(type, fn) {
      listeners.set(type, fn);
    },
    removeEventListener(type, fn) {
      if (listeners.get(type) === fn) {
        listeners.delete(type);
      }
    },
  };
}

{
  const storage = createMemoryStorage();
  const state = {
    apiProvider: 'openai',
    geminiKey: ' gemini-key ',
    openaiKey: '',
    apiKey: ' openai-active ',
  };
  const controller = createApiTabSessionPersistence({
    state,
    storage,
  });

  assert.equal(controller.write(), null);
  assert.equal(storage.size(), 0);
}

{
  const storage = createMemoryStorage();
  const state = {};
  const controller = createApiTabSessionPersistence({
    state,
    storage,
  });

  assert.equal(controller.restore(), null);
  assert.deepEqual(state, {});
}

{
  const storage = createMemoryStorage();
  const state = { apiProvider: 'gemini', geminiKey: 'before', openaiKey: '', apiKey: 'before' };
  const saveButton = createFakeElement();
  const editButton = createFakeElement();
  const doc = {
    getElementById(id) {
      return { 'key-save': saveButton, 'key-edit': editButton }[id] || null;
    },
  };
  const originalSave = async value => `saved:${value}`;
  const originalEdit = () => 'edited';
  const controller = createApiTabSessionPersistence({
    state,
    storage,
    documentRef: doc,
  });
  const wrappedSave = controller.wrapAsync(originalSave);
  const wrappedEdit = controller.wrapSync(originalEdit);

  assert.deepEqual(controller.installClickHandlers([
    { id: 'key-save', original: originalSave, wrapped: wrappedSave },
    { id: 'key-edit', original: originalEdit, wrapped: wrappedEdit },
    { id: 'missing', original: originalEdit, wrapped: wrappedEdit },
  ]), [false, false, false]);

  assert.equal(saveButton.listeners.size, 0);
  assert.equal(editButton.listeners.size, 0);

  assert.equal(await wrappedSave('ok'), 'saved:ok');
  assert.equal(storage.getItem('smk_api_tab_v497'), null);
  assert.equal(wrappedEdit(), 'edited');
}

console.log('apiTabSessionPersistence tests passed');
