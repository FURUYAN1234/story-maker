import assert from 'node:assert/strict';
import {
  DirectLong10000ValidationError,
  applyDirectLong10000UiResult,
  assertDirectLong10000Completion,
} from '../src/directLong10000Runtime.js';

assert.equal(assertDirectLong10000Completion({ mode: 'novel', text: '短い本文' }), null);
assert.equal(assertDirectLong10000Completion({ mode: 'medium', text: '短い本文' }), null);
assert.equal(assertDirectLong10000Completion({ mode: 'long', text: '短い本文' }), null);

const accepted = assertDirectLong10000Completion({
  mode: 'long_10000',
  text: `${'あ'.repeat(10000)}。`,
});
assert.equal(accepted.ok, true);
assert.equal(accepted.charCount >= 10000, true);

for (const [text, issue] of [
  [`${'あ'.repeat(9998)}。\n【完】`, 'target_length'],
  [`${'あ'.repeat(10000)}。\nつづく`, 'unclosed_ending'],
]) {
  assert.throws(
    () => assertDirectLong10000Completion({ mode: 'long_10000', text }),
    error => error instanceof DirectLong10000ValidationError
      && error.issues.includes(issue)
      && !/sk-[A-Za-z0-9_-]+/.test(error.message),
  );
}

const root = { dataset: {} };
const status = { textContent: '' };
const failedUi = applyDirectLong10000UiResult({
  mode: 'long_10000',
  text: `${'あ'.repeat(9998)}。\n【完】`,
  root,
  status,
});
assert.equal(failedUi.ok, false);
assert.equal(root.dataset.directLongResult, 'failed');
assert.equal(root.dataset.directLongChars, '9999');
assert.match(root.dataset.directLongIssues, /target_length/);
assert.match(status.textContent, /失敗/);

const passedUi = applyDirectLong10000UiResult({
  mode: 'long_10000',
  text: `${'あ'.repeat(10000)}。\n【完】`,
  root,
  status,
});
assert.equal(passedUi.ok, true);
assert.equal(root.dataset.directLongResult, 'passed');
assert.equal(root.dataset.directLongChars, '10001');
assert.equal(root.dataset.directLongIssues, '');
assert.match(status.textContent, /完了/);

console.log('direct long 10000 runtime tests passed');
