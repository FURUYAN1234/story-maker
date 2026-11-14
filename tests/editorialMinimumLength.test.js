import test from 'node:test';
import assert from 'node:assert/strict';
import * as candidate from '../src/editorialBrushupCandidate.js';
import * as runtime from '../src/editorialBrushupRuntime.js';
import { scenarioFixture } from '../scripts/fixtures/nanoScenarioFixture.mjs';
import { SCENARIO_PAGE_COMPOSITION } from '../src/vendor/nanoMangaPageComposition.js';
import { cleanOutputForPublicMode } from '../src/outputCleanup.js';

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

test('manga format repair includes exact geometry errors and page rules without expanding an adequate draft', async () => {
  const complete = scenarioFixture({count:6}).replace('状況:', '状況: '+'二人の視線と手元を描く。'.repeat(150));
  const broken = complete.replace(/^PageComposition:.*$/m, 'PageComposition: '+JSON.stringify({layout:'free',frames:Array.from({length:6},()=>({x:0,y:0,w:1,h:1})),reason:'手元を見せる'}));
  assert.equal(candidate.validateEditorialMinimumLength(broken,'4koma_scenario').ok, true);
  const prompt = runtime.buildEditorialFormatRepairPrompt({text:broken,mode:'4koma_scenario'});
  assert.match(prompt,/物語のコマ同士を重ねず/);
  assert.ok(prompt.includes(SCENARIO_PAGE_COMPOSITION));
  assert.match(prompt,/6コマ/);
  assert.doesNotMatch(prompt,/2640字以上を目安に補って/);
  const fixed = await runtime.prepareEditorialManuscript({text:broken,mode:'4koma_scenario',callAi:async()=>complete});
  assert.equal(candidate.hasEditorialModeFormat(fixed,'4koma_scenario'),true);
  await assert.rejects(runtime.prepareEditorialManuscript({text:broken,mode:'4koma_scenario',callAi:async()=>broken}), error => /コマ同士を重ねず/.test(error.message) && error.draft === cleanOutputForPublicMode(broken,'4koma_scenario'));
  await assert.rejects(runtime.prepareEditorialManuscript({text:broken,mode:'4koma_scenario',callAi:async()=>complete.slice(0,complete.indexOf('[6コマ目]'))}), /6コマ.*5コマ/);
});

test('a failed automatic format repair clears the running state and preserves the draft', async () => {
  const elements = new Map();
  const element = id => {
    if (!elements.has(id)) {
      const classes = new Set();
      elements.set(id, {textContent:'',innerHTML:'',dataset:{},style:{},disabled:false,checked:false,listeners:{},
        classList:{add:name=>classes.add(name),remove:name=>classes.delete(name),contains:name=>classes.has(name)},
        setAttribute(){},addEventListener(type,listener){this.listeners[type]=listener;},removeEventListener(){}});
    }
    return elements.get(id);
  };
  const doc = {getElementById:element,documentElement:{dataset:{}},querySelector:()=>({dataset:{v:'4koma_scenario'},textContent:'漫画シナリオ'})};
  let poll;
  const timers = {setInterval:callback=>{poll=callback;return 1;},clearInterval(){}};
  let calls=0;
  const cleanup = runtime.installEditorialBrushupRuntime({doc,timers,callAi:async()=>{calls++;throw new Error('検証用の通信失敗');}});
  element('btn-generate').listeners.click();
  element('output').textContent = scenarioFixture({composition:false});
  poll();
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(calls,1);
  assert.equal(doc.documentElement.dataset.editorialReviewResult,'failed');
  assert.equal(element('btn-generate').disabled,false);
  assert.equal(element('global-alert').style.display,'none');
  assert.match(element('progress-title-text').textContent,/終了.*失敗/);
  assert.doesNotMatch(element('progress-title-text').textContent,/API稼働中/);
  assert.match(element('output').textContent,/Topic: 返却の順番/);
  cleanup();
});
