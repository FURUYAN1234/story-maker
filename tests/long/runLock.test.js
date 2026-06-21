import assert from 'node:assert/strict';
import {
  LONG_NOVEL_ACTIVE_RUN_KEY,
  acquireLongNovelRunLock,
  isLongNovelRunLockStale,
  readLongNovelActiveRun,
  releaseLongNovelRunLock,
  touchLongNovelRunLock,
} from '../../src/longNovel/runLock.js';

function createStorage() {
  const store = new Map();
  return {
    getItem(key) {
      return store.get(key) || null;
    },
    setItem(key, value) {
      store.set(key, String(value));
    },
    removeItem(key) {
      store.delete(key);
    },
    raw(key) {
      return store.get(key) || null;
    },
  };
}

const localStorage = createStorage();
const sessionStorage = createStorage();
const globalObject = {};
let now = Date.parse('2026-06-21T00:00:00.000Z');
const env = {
  localStorage,
  sessionStorage,
  globalObject,
  now: () => now,
  ttlMs: 1000,
};

const first = acquireLongNovelRunLock({ token: 'a', provider: 'gemini', stage: 'm3' }, env);
assert.equal(first.ok, true);
assert.equal(first.active.token, 'a');
assert.equal(globalObject.__storyMakerLongDevActiveToken, 'a');
assert.equal(JSON.parse(localStorage.raw(LONG_NOVEL_ACTIVE_RUN_KEY)).provider, 'gemini');
assert.equal(JSON.parse(sessionStorage.raw(LONG_NOVEL_ACTIVE_RUN_KEY)).stage, 'm3');

const blocked = acquireLongNovelRunLock({ token: 'b', provider: 'openai', stage: 'm3' }, env);
assert.equal(blocked.ok, false);
assert.equal(blocked.active.token, 'a');

const reacquired = acquireLongNovelRunLock({ token: 'a', provider: 'gemini', stage: 'm3' }, env);
assert.equal(reacquired.ok, true);
assert.equal(readLongNovelActiveRun(env).token, 'a');

now += 500;
const touched = touchLongNovelRunLock('a', env);
assert.equal(touched.touched, true);
assert.equal(touched.active.updatedAt, '2026-06-21T00:00:00.500Z');

assert.equal(touchLongNovelRunLock('other', env).touched, false);
assert.equal(releaseLongNovelRunLock('other', env).released, false);
assert.equal(readLongNovelActiveRun(env).token, 'a');

assert.equal(releaseLongNovelRunLock('a', env).released, true);
assert.equal(readLongNovelActiveRun(env), null);
assert.equal(globalObject.__storyMakerLongDevActiveToken, null);
assert.equal(localStorage.raw(LONG_NOVEL_ACTIVE_RUN_KEY), null);

now = Date.parse('2026-06-21T00:00:00.000Z');
acquireLongNovelRunLock({ token: 'stale', provider: 'gemini', stage: 'm2' }, env);
now += 1501;
assert.equal(isLongNovelRunLockStale(JSON.parse(sessionStorage.raw(LONG_NOVEL_ACTIVE_RUN_KEY)), env), true);
assert.equal(readLongNovelActiveRun(env), null);
assert.equal(sessionStorage.raw(LONG_NOVEL_ACTIVE_RUN_KEY), null);

console.log('long novel runLock tests passed');
