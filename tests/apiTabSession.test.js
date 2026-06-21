import assert from 'node:assert/strict';

import {
  API_TAB_SESSION_KEY,
  buildApiTabSessionSnapshot,
  parseApiTabSessionSnapshot,
} from '../src/apiTabSession.js';

assert.equal(API_TAB_SESSION_KEY, 'smk_api_tab_v497');

assert.equal(buildApiTabSessionSnapshot(null), null);
assert.equal(buildApiTabSessionSnapshot({ apiProvider: 'gemini', geminiKey: ' ', openaiKey: '' }), null);

assert.deepEqual(
  buildApiTabSessionSnapshot({
    apiProvider: 'openai',
    geminiKey: ' gemini-dummy ',
    openaiKey: '',
    apiKey: ' openai-active ',
  }),
  {
    apiProvider: 'openai',
    geminiKey: 'gemini-dummy',
    openaiKey: 'openai-active',
  },
);

const normalize = (value) => String(value || '').trim().replace(/^dummy:/, '').trim();
assert.deepEqual(
  buildApiTabSessionSnapshot({
    apiProvider: 'gemini',
    geminiKey: '',
    openaiKey: ' dummy:openai ',
    apiKey: ' dummy:gemini ',
  }, normalize),
  {
    apiProvider: 'gemini',
    geminiKey: 'gemini',
    openaiKey: 'openai',
  },
);

assert.deepEqual(
  parseApiTabSessionSnapshot(JSON.stringify({
    apiProvider: 'openai',
    geminiKey: ' gemini-dummy ',
    openaiKey: ' openai-dummy ',
  })),
  {
    geminiKey: 'gemini-dummy',
    openaiKey: 'openai-dummy',
    apiProvider: 'openai',
    apiKey: 'openai-dummy',
  },
);

assert.deepEqual(
  parseApiTabSessionSnapshot({
    apiProvider: 'openai',
    geminiKey: ' gemini-only ',
    openaiKey: ' ',
  }),
  {
    geminiKey: 'gemini-only',
    openaiKey: '',
    apiProvider: 'gemini',
    apiKey: 'gemini-only',
  },
);

assert.equal(parseApiTabSessionSnapshot('not json'), null);
assert.equal(parseApiTabSessionSnapshot({ apiProvider: 'openai', geminiKey: '', openaiKey: '' }), null);

console.log('apiTabSession tests passed');
