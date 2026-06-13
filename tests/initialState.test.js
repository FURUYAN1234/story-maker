import assert from 'node:assert/strict';
import { createInitialState } from '../src/initialState.js';

const state = createInitialState();

assert.equal(state.apiKey, '');
assert.equal(state.apiProvider, 'gemini');
assert.equal(state.mode, '4koma');
assert.deepEqual(state.characters, []);
assert.deepEqual(state.universalAssets, []);
assert.equal(state.longNovel.active, false);
assert.equal(state.longNovel.currentChapter, 0);
assert.deepEqual(state.longNovel.chapters, []);
assert.deepEqual(state.longNovel.chapterRetryCounts, {});
assert.equal(state.locked.mode, false);
assert.equal(state.locked.universal, false);
assert.deepEqual(state.defaultFilled, {});
assert.deepEqual(state.axisSource, {});

const other = createInitialState();
state.characters.push({ name: '太郎' });
state.longNovel.chapters.push({ title: '第1章' });
state.locked.mode = true;
state.axisSource.genre = 'manual';

assert.deepEqual(other.characters, []);
assert.deepEqual(other.longNovel.chapters, []);
assert.equal(other.locked.mode, false);
assert.deepEqual(other.axisSource, {});

console.log('initialState tests passed');
