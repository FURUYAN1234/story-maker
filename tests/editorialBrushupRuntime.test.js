import assert from 'node:assert/strict';
import { runEditorialReview, runEditorialBrushup } from '../src/editorialBrushupRuntime.js';

const original = '彼女は古い駅で手紙を拾った。\n\n返事を書き、朝の列車を見送った。';
const improved = '彼女は古い駅で手紙を拾った。差出人の震えた筆跡に、昨日の後悔が残っていた。\n\n彼女は返事を書き、自分の言葉で別れを告げて朝の列車を見送った。';

let reviewCalls = 0;
const repairedReview = await runEditorialReview({ text: original, mode: 'novel', modeLabel: '短編', callAi: async (_prompt, context) => {
  reviewCalls += 1;
  return context.stage === 'review' ? { text: '形式外' } : { text: 'AI総合点: 80点\nAI講評:\n結末を強めたい。\n良い点:\n導入' };
} });
assert.equal(reviewCalls, 2);
assert.equal(repairedReview.score, 80);

let brushupCalls = 0;
const brushed = await runEditorialBrushup({ text: original, mode: 'novel', modeLabel: '短編', autoUntilPass: true, callAi: async (_prompt, context) => {
  brushupCalls += 1;
  if (context.stage === 'review') return { text: brushupCalls === 1 ? 'AI総合点: 78点\nAI講評:\n感情を強める。\n良い点:\n導入' : 'AI総合点: 85点\nAI講評:\n改善した。\n良い点:\n結末' };
  if (context.stage === 'brushup') return { text: improved };
  throw new Error(`unexpected ${context.stage}`);
} });
assert.equal(brushed.text, improved);
assert.equal(brushed.review.score, 85);
assert.equal(brushed.attempts, 1);

let failedAttempts = 0;
const preserved = await runEditorialBrushup({ text: original, mode: 'novel', modeLabel: '短編', autoUntilPass: true, callAi: async (_prompt, context) => {
  if (context.stage === 'review') return { text: 'AI総合点: 70点\nAI講評:\n未改善。\n問題点:\n結末' };
  if (context.stage === 'brushup') { failedAttempts += 1; return { text: '途中で扉を開け' }; }
  throw new Error(`unexpected ${context.stage}`);
} });
assert.equal(preserved.text, original);
assert.equal(preserved.attempts, 3);
assert.equal(failedAttempts, 3);

console.log('editorial brushup runtime tests passed');
