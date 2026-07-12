import assert from 'node:assert/strict';
import {
  EDITORIAL_PASS_SCORE,
  buildEditorialReviewPrompt,
  evaluateEditorialPass,
  getEditorialReviewFamily,
  parseEditorialReview,
} from '../src/editorialReviewContracts.js';

assert.equal(EDITORIAL_PASS_SCORE, 90);
assert.equal(getEditorialReviewFamily('short'), 'fiction');
assert.equal(getEditorialReviewFamily('long_10000'), 'fiction');
assert.equal(getEditorialReviewFamily('script'), 'script');
assert.equal(getEditorialReviewFamily('letter'), 'practical');
assert.equal(getEditorialReviewFamily('4koma_scenario'), 'special');

assert.match(buildEditorialReviewPrompt({ mode: 'script', modeLabel: '脚本', text: '本文' }), /場面進行/);
assert.match(buildEditorialReviewPrompt({ mode: 'letter', modeLabel: '手紙', text: '本文' }), /目的適合/);
assert.match(buildEditorialReviewPrompt({ mode: 'short', modeLabel: '短編', text: '本文' }), /完結性/);
assert.match(buildEditorialReviewPrompt({ mode: '4koma_scenario', modeLabel: '4コマ', text: '本文' }), /モード固有/);
const fourKomaReviewPrompt = buildEditorialReviewPrompt({ mode: '4koma', modeLabel: '4コマ漫画風', text: '本文' });
assert.match(fourKomaReviewPrompt, /絵\/状況、セリフ、狙い/);
assert.doesNotMatch(fourKomaReviewPrompt, /【最終出力形式チェック】/);
assert.match(fourKomaReviewPrompt, /制作メモや内部指示の露出として減点しない/);
assert.match(fourKomaReviewPrompt, /Created By AI Story Maker V5\.3\.3/);
assert.match(fourKomaReviewPrompt, /契約違反として減点しない/);
const mechanicallyValidFourKoma = [1, 2, 3, 4].map(number => `${number}コマ目:\n絵/状況: 場面${number}\nセリフ: 人物「台詞」\n狙い: 意図`).join('\n');
assert.match(buildEditorialReviewPrompt({ mode: '4koma', modeLabel: '4コマ漫画風', text: mechanicallyValidFourKoma }), /形式契約はアプリの機械検証に合格済み/);

assert.deepEqual(
  parseEditorialReview('AI総合点: 84点\nAI講評:\n芯が通っている。\n良い点:\n結末'),
  { score: 84, commentary: '芯が通っている。', structuredValid: false, valid: true },
);
assert.equal(parseEditorialReview('本文だけ').valid, false);
assert.equal(parseEditorialReview('AI総合点: 120点\nAI講評:\n過大').valid, false);
assert.equal(evaluateEditorialPass({ review: { score: 89, valid: true }, mechanicalOk: true }).passed, false);
assert.equal(evaluateEditorialPass({ review: { score: 90, valid: true }, mechanicalOk: true }).passed, true);
assert.equal(evaluateEditorialPass({ review: { score: 90, valid: true }, mechanicalOk: false }).passed, false);

const structuredReview = parseEditorialReview('AI総合点: 86点\nAI講評:\n全体は良い。\n良い点:\n導入が強い。\n問題点:\n中盤の対立が弱い。\n改稿方針:\n対立を行動で強める。\nモード契約適合: 適合');
assert.equal(structuredReview.problems, '中盤の対立が弱い。');
assert.equal(structuredReview.revisionPlan, '対立を行動で強める。');
assert.equal(structuredReview.modeFit, '適合');
assert.equal(structuredReview.structuredValid, true);

console.log('editorial review contract tests passed');
