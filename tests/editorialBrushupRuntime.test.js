import assert from 'node:assert/strict';
import { createEditorialReviewMarkup, isEditorialBrushupReady, runEditorialReview, runEditorialBrushup } from '../src/editorialBrushupRuntime.js';

const original = '彼女は古い駅で手紙を拾った。\n\n返事を書き、朝の列車を見送った。';
const improved = '彼女は古い駅で手紙を拾った。差出人の震えた筆跡に、昨日の後悔が残っていた。\n\n彼女は返事を書き、自分の言葉で別れを告げて朝の列車を見送った。';
assert.equal(isEditorialBrushupReady({ textContent: original, classList: { contains: () => false } }), true);
assert.equal(isEditorialBrushupReady({ textContent: original, classList: { contains: value => value === 'empty' } }), false);

const reviewMarkup = createEditorialReviewMarkup({ score: 86, valid: true, commentary: '良い点。\n\n改善点。' }, { attempts: 1 });
assert.match(reviewMarkup, /editorial-review-score-value[^>]*>86/);
assert.match(reviewMarkup, /editorial-review-score-bar-fill/);
assert.match(reviewMarkup, /<pre class="editorial-review-commentary">良い点。\n\n改善点。<\/pre>/);
assert.match(reviewMarkup, /ブラッシュアップ回数: 1回/);

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

let passingRewriteCalls = 0;
const alreadyPassing = await runEditorialBrushup({ text: original, mode: 'novel', modeLabel: '短編', autoUntilPass: true, callAi: async (_prompt, context) => {
  if (context.stage === 'review') return { text: passingRewriteCalls === 0 ? 'AI総合点: 86点\nAI講評:\nすでに合格。\n良い点:\n構成' : 'AI総合点: 90点\nAI講評:\nさらに改善。\n良い点:\n余韻' };
  if (context.stage === 'brushup') { passingRewriteCalls += 1; return { text: improved }; }
  throw new Error(`unexpected ${context.stage}`);
} });
assert.equal(passingRewriteCalls, 1);
assert.equal(alreadyPassing.attempts, 1);
assert.equal(alreadyPassing.review.score, 90);

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
