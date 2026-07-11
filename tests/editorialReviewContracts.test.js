import assert from 'node:assert/strict';
import {
  EDITORIAL_PASS_SCORE,
  buildEditorialReviewPrompt,
  evaluateEditorialPass,
  getEditorialReviewFamily,
  parseEditorialReview,
} from '../src/editorialReviewContracts.js';

assert.equal(EDITORIAL_PASS_SCORE, 82);
assert.equal(getEditorialReviewFamily('short'), 'fiction');
assert.equal(getEditorialReviewFamily('long_10000'), 'fiction');
assert.equal(getEditorialReviewFamily('script'), 'script');
assert.equal(getEditorialReviewFamily('letter'), 'practical');
assert.equal(getEditorialReviewFamily('4koma_scenario'), 'special');

assert.match(buildEditorialReviewPrompt({ mode: 'script', modeLabel: '脚本', text: '本文' }), /場面進行/);
assert.match(buildEditorialReviewPrompt({ mode: 'letter', modeLabel: '手紙', text: '本文' }), /目的適合/);
assert.match(buildEditorialReviewPrompt({ mode: 'short', modeLabel: '短編', text: '本文' }), /完結性/);
assert.match(buildEditorialReviewPrompt({ mode: '4koma_scenario', modeLabel: '4コマ', text: '本文' }), /モード固有/);

assert.deepEqual(
  parseEditorialReview('AI総合点: 84点\nAI講評:\n芯が通っている。\n良い点:\n結末'),
  { score: 84, commentary: '芯が通っている。', valid: true },
);
assert.equal(parseEditorialReview('本文だけ').valid, false);
assert.equal(parseEditorialReview('AI総合点: 120点\nAI講評:\n過大').valid, false);
assert.equal(evaluateEditorialPass({ review: { score: 84, valid: true }, mechanicalOk: true }).passed, true);
assert.equal(evaluateEditorialPass({ review: { score: 90, valid: true }, mechanicalOk: false }).passed, false);

console.log('editorial review contract tests passed');
