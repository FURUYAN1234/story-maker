import assert from 'node:assert/strict';
import {
  Ih,
  er,
  fp,
  hp,
  nr,
  or,
  tr,
} from '../src/longNovelNumberHelpers.js';

assert.equal(Ih('１２，３４５'), '12345');
assert.equal(fp('十'), 10);
assert.equal(fp('二十三'), 23);
assert.equal(fp('九'), 9);

assert.equal(er(1234.4), 1234);
assert.equal(er('8.5万字'), 85000);
assert.equal(er('約12,345字'), 12345);
assert.equal(er('短い'), 0);

assert.equal(hp({ charCount: '8万字' }, {}, 10), 80000);
assert.equal(hp({}, { targetChars: '6万字' }, 10), 60000);
assert.equal(hp({}, {}, 10), 80000);

assert.equal(tr({ charCount: '8万字' }, {}), 10);
assert.equal(tr({}, { totalChapters: 11 }), 11);
assert.equal(nr({ charCount: '8万字' }, {}, 10), 4800);

const abortController = new AbortController();
assert.deepEqual(or(abortController.signal), {
  signal: abortController.signal,
  disableGoogleSearch: true,
  timeoutMs: 300000,
  maxTokens: 32768,
  maxOutputTokens: 32768,
});

console.log('longNovelNumberHelpers tests passed');
