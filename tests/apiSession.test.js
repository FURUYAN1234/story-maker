import assert from 'node:assert/strict';

import {
  API_SESSION_KEY,
  API_WINDOW_NAME_PREFIX,
  readApiSession,
  restoreApiSession,
  writeApiSession,
} from '../src/apiSession.js';

function installWindow(storage = null) {
  global.window = {
    name: '',
    sessionStorage: storage,
  };
}

function createStorage() {
  const values = new Map();
  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    removeItem(key) {
      values.delete(key);
    },
  };
}

installWindow(null);
writeApiSession({
  apiProvider: 'gemini',
  geminiKey: 'gemini-test-key-1234567890',
});
assert.ok(global.window.name.startsWith(API_WINDOW_NAME_PREFIX));
const restoredFromWindowName = {};
assert.equal(restoreApiSession(restoredFromWindowName), true);
assert.equal(restoredFromWindowName.apiProvider, 'gemini');
assert.equal(restoredFromWindowName.apiKey, 'gemini-test-key-1234567890');
assert.equal(readApiSession().geminiKey, 'gemini-test-key-1234567890');

const storage = createStorage();
installWindow(storage);
writeApiSession({
  apiProvider: 'openai',
  openaiKey: 'sk-test-key-1234567890',
});
assert.ok(storage.getItem(API_SESSION_KEY));
assert.ok(global.window.name.startsWith(API_WINDOW_NAME_PREFIX));
const restoredFromStorage = {};
assert.equal(restoreApiSession(restoredFromStorage), true);
assert.equal(restoredFromStorage.apiProvider, 'openai');
assert.equal(restoredFromStorage.apiKey, 'sk-test-key-1234567890');

writeApiSession({
  apiProvider: 'gemini',
  geminiKey: '',
  openaiKey: '',
});
assert.equal(storage.getItem(API_SESSION_KEY), null);
assert.equal(global.window.name, '');

delete global.window;

console.log('apiSession tests passed');
