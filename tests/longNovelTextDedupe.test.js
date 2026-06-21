import assert from 'node:assert/strict';

import {
  normalizeForDuplicateComparison,
  removeRepeatedNarrativeBlocks,
  splitNarrativeUnits,
  trimAlreadyGeneratedContinuation,
} from '../src/longNovelTextDedupe.js';

const paragraph = (label, length = 460) => `${label} ${label.repeat(length)}`;

assert.equal(normalizeForDuplicateComparison(' 「A」\n B\t'), 'AB');
assert.deepEqual(splitNarrativeUnits('one。\ntwo。\nthree。'), []);
assert.deepEqual(splitNarrativeUnits([
  'first paragraph',
  'second paragraph',
  'third paragraph',
  'fourth paragraph',
].join('\n\n')), [
  'first paragraph',
  'second paragraph',
  'third paragraph',
  'fourth paragraph',
]);

{
  const repeated = paragraph('alpha');
  const text = [
    repeated,
    paragraph('beta'),
    paragraph('gamma'),
    repeated,
    paragraph('delta'),
  ].join('\n\n');
  const result = removeRepeatedNarrativeBlocks(text);

  assert.equal(result.changed, true);
  assert.ok(result.removedChars >= 420);
  assert.equal((result.text.match(/alpha/g) || []).length, repeated.match(/alpha/g).length);
  assert.ok(result.text.includes('delta'));
}

{
  const text = [
    paragraph('alpha'),
    paragraph('beta'),
    paragraph('gamma'),
    paragraph('delta'),
  ].join('\n\n');
  const result = removeRepeatedNarrativeBlocks(text);

  assert.equal(result.changed, false);
  assert.equal(result.text, text);
}

{
  const previous = [
    paragraph('alreadyA', 280),
    paragraph('alreadyB', 280),
    paragraph('oldTail', 280),
  ].join('\n\n');
  const next = `${previous}\n\n${paragraph('newTail', 280)}`;

  assert.equal(trimAlreadyGeneratedContinuation(previous, next), paragraph('newTail', 280));
  assert.equal(trimAlreadyGeneratedContinuation(previous, previous), '');
}

{
  const first = paragraph('first', 280);
  const second = paragraph('second', 280);
  const previous = [first, second, paragraph('old', 280)].join('\n\n');
  const next = [first, second, paragraph('fresh', 280)].join('\n\n');

  assert.equal(trimAlreadyGeneratedContinuation(previous, next), paragraph('fresh', 280));
}

console.log('longNovelTextDedupe tests passed');
