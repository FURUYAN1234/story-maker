import test from 'node:test';
import assert from 'node:assert/strict';
import * as candidate from '../src/editorialBrushupCandidate.js';
import * as runtime from '../src/editorialBrushupRuntime.js';

const prose = n => 'あ'.repeat(n - 1) + '。';
const titled = n => `タイトル: 長い見出しは本文字数に入れない\n\n${prose(n)}\n\nCreated By AI Story Maker V5.4.6`;

test('higher scores cannot adopt a body below its public minimum', () => {
  const options = { currentText: titled(1700), mode: 'short_short', currentReview: { score: 92, valid: true }, candidateReview: { score: 96, valid: true } };
  assert.equal(candidate.evaluateBrushupCandidate({ ...options, candidateText: titled(1499) }).adopt, false);
  assert.ok(candidate.evaluateBrushupCandidate({ ...options, candidateText: titled(1499) }).issues.includes('below_min_chars'));
  assert.equal(candidate.evaluateBrushupCandidate({ ...options, candidateText: titled(1500) }).adopt, true);
  assert.equal(candidate.validateEditorialMinimumLength(titled(1499), 'short_short').charCount, 1499);
  assert.equal(candidate.validateEditorialMinimumLength(`返却日の字\n\n${prose(1500)}\n【完】`, 'short_short').charCount, 1500);
  assert.equal(candidate.validateEditorialMinimumLength(`タイトル: 名前\n${'あ '.repeat(1499)}\n【完】`, 'short_short').ok, false);
});

test('initial manuscript repair checks the actual repaired body and retains the bounded repair policy', async () => {
  let calls = 0;
  const request = { mode: 'short_short', modeLabel: 'ショート（1500字～）' };
  const callAi = async prompt => { calls++; assert.match(prompt, /1500/); assert.match(prompt, /既存の事実・人物・結末/); return { text: titled(1700) }; };
  assert.equal(await runtime.prepareEditorialManuscript({ ...request, text: titled(1700), callAi }), titled(1700));
  assert.equal(calls, 0);
  assert.match(await runtime.prepareEditorialManuscript({ ...request, text: titled(1499), callAi }), /Created By AI Story Maker/);
  assert.equal(calls, 1);
  await assert.rejects(runtime.prepareEditorialManuscript({ ...request, text: titled(1499), callAi: async () => ({ text: titled(1499) }) }), /字数下限/);
});

test('ordinary brushup repairs an undersized baseline and rejects a higher-scored undersized rewrite', async () => {
  const review = score => `AI総合点: ${score}\nAI講評: 場面のつながりを確認。\n良い点: 結末。\n問題点: 動作の曖昧さ。\n改稿方針: 手元を具体化。\nモード契約適合: 適合`;
  let reviews = 0;
  const result = await runtime.runEditorialBrushup({ text: titled(1499), mode: 'short_short', autoUntilPass: false, callAi: async (_prompt, context) => {
    if (context.stage === 'review') return { text: review(reviews++ ? 96 : 92) };
    return { text: titled(context.attempt === 0 ? 1700 : 1499) };
  } });
  assert.equal(candidate.validateEditorialMinimumLength(result.text, 'short_short').ok, true);
  assert.equal(result.review.score, 92);
  assert.ok(result.decisions[0].issues.includes('below_min_chars'));
});
