import assert from 'node:assert/strict';

import {
  clampScore,
  computeLongNovelCompletionScore,
  countMatches,
} from '../src/longNovelCompletionScore.js';

assert.equal(clampScore(-4), 0);
assert.equal(clampScore(42.4), 42);
assert.equal(clampScore(120), 100);
assert.equal(clampScore(Number.NaN), 0);
assert.equal(countMatches('a b a', /a/g), 2);

{
  assert.deepEqual(computeLongNovelCompletionScore({}), {
    plotRecovery: 72,
    structure: 78,
    constraint: 83,
  });
}

{
  const bodyA = 'A'.repeat(4600);
  const bodyB = 'B'.repeat(4700);
  const run = {
    totalChapters: 2,
    currentChapter: 2,
    cleanText: `# \u7b2c1\u7ae0\n${bodyA}\n# \u7b2c2\u7ae0\n${bodyB}\n\u3010\u5b8c\u3011`,
    chapters: [
      { body: bodyA, contextMemo: 'memo '.repeat(25) },
      { body: bodyB, contextMemo: '' },
    ],
  };

  assert.deepEqual(computeLongNovelCompletionScore(run), {
    plotRecovery: 96,
    structure: 97,
    constraint: 100,
  });
}

{
  const body = 'C'.repeat(4600);
  const cleanText = `# \u7b2c1\u7ae0\n${body}\n\u6587\u8108\u7dad\u6301\u30e1\u30e2\n\u3010\u5b8c\u3011`;
  assert.equal(computeLongNovelCompletionScore({
    totalChapters: 1,
    currentChapter: 1,
    cleanText,
    chapters: [{ body }],
  }).constraint, 83);
}

console.log('longNovelCompletionScore tests passed');
