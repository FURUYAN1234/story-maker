import assert from 'node:assert/strict';

import { API_TAB_SESSION_KEY, buildApiTabSessionSnapshot, parseApiTabSessionSnapshot } from '../src/apiTabSession.js';
import { createApiTabSessionPersistence } from '../src/apiTabSessionPersistence.js';

function createMemoryStorage() {
  const store = new Map();
  return {
    getItem: key => store.get(key) || null,
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key),
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
  let afterWrite = null;
  const controller = createApiTabSessionPersistence({
    state,
    storage,
    storageKey: API_TAB_SESSION_KEY,
    buildSnapshot: buildApiTabSessionSnapshot,
    parseSnapshot: parseApiTabSessionSnapshot,
    onAfterWrite: snapshot => {
      afterWrite = snapshot;
    },
  });

  assert.deepEqual(controller.write(), {
    apiProvider: 'openai',
    geminiKey: 'gemini-key',
    openaiKey: 'openai-active',
  });
  assert.deepEqual(afterWrite, {
    apiProvider: 'openai',
    geminiKey: 'gemini-key',
    openaiKey: 'openai-active',
  });
  assert.match(storage.getItem(API_TAB_SESSION_KEY), /openai-active/);

  state.apiKey = '';
  state.geminiKey = '';
  state.openaiKey = '';
  assert.equal(controller.write(), null);
  assert.equal(storage.getItem(API_TAB_SESSION_KEY), null);
}

{
  const storage = createMemoryStorage();
  storage.setItem(API_TAB_SESSION_KEY, JSON.stringify({
    apiProvider: 'openai',
    geminiKey: 'gemini-saved',
    openaiKey: 'openai-saved',
  }));
  const state = {};
  let locked = false;
  const controller = createApiTabSessionPersistence({
    state,
    storage,
    storageKey: API_TAB_SESSION_KEY,
    buildSnapshot: buildApiTabSessionSnapshot,
    parseSnapshot: parseApiTabSessionSnapshot,
    onRestoreLocked: () => {
      locked = true;
    },
  });

  assert.deepEqual(controller.restore(), {
    geminiKey: 'gemini-saved',
    openaiKey: 'openai-saved',
    apiProvider: 'openai',
    apiKey: 'openai-saved',
  });
  assert.equal(state.apiKey, 'openai-saved');
  assert.equal(state.apiProvider, 'openai');
  assert.equal(locked, true);
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
  let syncCount = 0;
  const originalSave = async value => `saved:${value}`;
  const originalEdit = () => 'edited';
  const controller = createApiTabSessionPersistence({
    state,
    storage,
    storageKey: API_TAB_SESSION_KEY,
    documentRef: doc,
    buildSnapshot: buildApiTabSessionSnapshot,
    parseSnapshot: parseApiTabSessionSnapshot,
    onAfterWrite: () => {
      syncCount++;
    },
  });
  const wrappedSave = controller.wrapAsync(originalSave);
  const wrappedEdit = controller.wrapSync(originalEdit);

  assert.deepEqual(controller.installClickHandlers([
    { id: 'key-save', original: originalSave, wrapped: wrappedSave },
    { id: 'key-edit', original: originalEdit, wrapped: wrappedEdit },
    { id: 'missing', original: originalEdit, wrapped: wrappedEdit },
  ]), [true, true, false]);

  assert.equal(saveButton.listeners.get('click'), wrappedSave);
  assert.equal(editButton.listeners.get('click'), wrappedEdit);

  assert.equal(await wrappedSave('ok'), 'saved:ok');
  assert.match(storage.getItem(API_TAB_SESSION_KEY), /before/);
  assert.equal(wrappedEdit(), 'edited');
  assert.equal(syncCount, 2);
}

console.log('apiTabSessionPersistence tests passed');
