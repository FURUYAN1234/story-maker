import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { Jo } from '../src/promptBuilder.js';
import { buildPrompt } from '../src/prompt.js';
import { buildQualityContract } from '../src/modeContracts.js';
import { buildOutputModeStrictContract, buildFinalOutputFormatCheck } from '../src/outputModeContracts.js';
import { detectPublicRewriteIssue } from '../src/qualityBoost.js';
import { cleanOutputForPublicMode } from '../src/outputCleanup.js';
import { Gt, yt } from '../src/providerClients.js';
import { finalizeNanoScenarioOutput, isNanoScenarioComplete, hasNanoScenarioEnding, NANO_AUTOMATIC_STYLES } from '../src/nanoScenarioContract.js';
import { hasEditorialModeFormat, evaluateBrushupCandidate } from '../src/editorialBrushupCandidate.js';

import { scenarioFixture } from '../scripts/fixtures/nanoScenarioFixture.mjs';

test('free-layout manga scenarios retain all four to eight panels and PageComposition through cleanup', () => {
  for (const count of [4, 5, 6, 7, 8]) {
    const source = scenarioFixture({ count });
    assert.equal(isNanoScenarioComplete(source), true, `${count} panels must be accepted`);
    const cleaned = cleanOutputForPublicMode(source, '4koma_scenario');
    assert.equal(isNanoScenarioComplete(cleaned), true, `${count} panels must survive cleanup`);
    assert.equal(cleaned.match(/^PageComposition: .+$/m)?.[0], source.match(/^PageComposition: .+$/m)?.[0]);
    assert.equal((cleaned.match(/^\[\dコマ目\]/gm) || []).length, count);
  }
});

test('manga scenario prompts choose four to eight panels by content and preserve authored page design on revision', () => {
  const settings = { mode: '4koma_scenario' };
  for (const prompt of [Jo(settings).prompt, buildPrompt(settings), buildQualityContract(settings.mode), buildOutputModeStrictContract(settings), buildFinalOutputFormatCheck(settings)]) {
    assert.match(prompt, /4〜8/);
    assert.match(prompt, /PageComposition:/);
    assert.match(prompt, /PanelCountReason:/);
    assert.doesNotMatch(prompt, /Scenario: の直後は必ず \[1コマ目\]|出力前に4コマ、|正確に4コマ|4コマ目も状況/);
  }
});

test('free-layout generation rejects missing, duplicate and malformed page design, invalid frames and out-of-range panel totals', () => {
  const source = scenarioFixture({ count: 6 });
  const metadata = source.match(/^PageComposition: .+$/m)[0];
  const c = JSON.parse(metadata.slice('PageComposition: '.length));
  for (const broken of [
    scenarioFixture({ count: 3 }), scenarioFixture({ count: 9 }),
    scenarioFixture({ composition: false }), source.replace(metadata, metadata+'\n'+metadata),
    source.replace(metadata, 'PageComposition: {'),
    source.replace(metadata, 'PageComposition: '+JSON.stringify({...c, layout:'free',frames:[{x:0,y:0,w:1,h:1}]})),
    source.replace(metadata, 'PageComposition: '+JSON.stringify({...c, foregrounds:[],breakouts:[{panel:1,into:[2],part:'係員の右手'}]})),
    source.replace(/^PanelCountReason:.*\n/m,''),
  ]) assert.equal(isNanoScenarioComplete(broken), false);
  const bad = source.replace(metadata, metadata+'\n'+metadata);
  assert.equal(isNanoScenarioComplete(cleanOutputForPublicMode(bad, '4koma_scenario')), false, 'cleanup must not hide duplicate metadata');
});

test('editorial adoption preserves six-panel structure while accepting a valid improvement', () => {
  const pad = source => source.replace('状況:', '状況: '+ '箱を受け取る人物の手と視線が動きに合わせて変わる。'.repeat(120));
  const currentText = pad(scenarioFixture({ count: 6 }));
  const review = { currentReview:{valid:true,score:85}, candidateReview:{valid:true,score:90}, mode:'4koma_scenario' };
  assert.equal(evaluateBrushupCandidate({currentText,candidateText:currentText,...review}).adopt,true);
  const reduced = evaluateBrushupCandidate({currentText,candidateText:pad(scenarioFixture({count:4})),...review});
  assert.equal(reduced.adopt,false);
  assert.ok(reduced.issues.includes('panel_count_changed'));
});

test('a received scenario ending is distinct from valid geometry and an actually truncated response', () => {
  const complete = scenarioFixture({ count: 6 });
  const broken = complete.replace(/^PageComposition:.*$/m, 'PageComposition: '+JSON.stringify({layout:'free',frames:Array.from({length:6},()=>({x:0,y:0,w:1,h:1}))}));
  assert.equal(isNanoScenarioComplete(broken), false);
  assert.equal(hasNanoScenarioEnding(broken), true, 'invalid geometry goes to format repair, not continuation');
  assert.equal(hasNanoScenarioEnding(broken.slice(0, broken.indexOf('[6コマ目]'))), false);
  assert.equal(hasNanoScenarioEnding(complete.slice(0, complete.indexOf('[6コマ目]'))), false, 'PanelCountReason also retains the planned count');
  assert.equal(hasNanoScenarioEnding(complete.replace(/セリフなし$/, '係員「途中で')), false);
  assert.equal(hasNanoScenarioEnding(complete.replace(/セリフなし$/, '係員「『六コマ』で完了です。」')), true);
});

test('all generation and revision prompt contracts include current Nano schema without old contradictory rules', () => {
  const settings = { mode: '4koma_scenario', theme: '返却の順番', characters: [{ name: '係員' }] };
  for (const prompt of [Jo(settings).prompt, buildPrompt(settings), buildQualityContract('4koma_scenario'),
    buildOutputModeStrictContract(settings), buildFinalOutputFormatCheck(settings)]) {
    assert.match(prompt, /VisualEvidence:/);
    assert.match(prompt, /BalloonLayout:/);
    assert.match(prompt, /"speaker".*"x".*"anchor".*"route"/);
    assert.match(prompt, /無言なら\[\]/);
    assert.match(prompt, /セリフなし/);
    assert.match(prompt, /魚眼.*使わない/);
    assert.doesNotMatch(prompt, /無言.*だけのコマは禁止|全コマで吹き出し用セリフ|重複禁止|同じカメラを2回以上使うことは禁止/);
  }
  assert.doesNotMatch(Jo({ mode: 'novel' }).prompt, /BalloonLayout:/);
});

test('chibi prompt preserves applicable clothing while allowing scripted costume changes', () => {
  const chibi = NANO_AUTOMATIC_STYLES.find(({ tag }) => tag === 'CHIBI_GAG')?.recipe;
  assert.match(chibi, /適用Outfit優先/);
  assert.match(chibi, /服種\/色\/重ね着をちび化で変えず/);
  assert.match(chibi, /明示着替えは反映/);
  const prompt = Jo({ mode: '4koma_scenario' }).prompt;
  assert.ok(prompt.includes(chibi));
});

test('normal output gate preserves valid silent and repeated-camera panels plus quoted surface text', () => {
  const source = scenarioFixture();
  assert.equal(detectPublicRewriteIssue('4koma_scenario', source, 0), '');
  const cleaned = cleanOutputForPublicMode(source, '4koma_scenario');
  assert.match(cleaned, /BalloonLayout: \[\]/);
  assert.match(cleaned, /札には「返却」/);
  assert.equal(detectPublicRewriteIssue('4koma_scenario', cleaned, 0), '');
});

test('normal output gate rejects missing layout, malformed JSON, wrong count/speaker/order and unclosed dialogue', () => {
  const source = scenarioFixture({ silent: false });
  for (const broken of [
    source.replace(/^BalloonLayout: .*\n/m, ''),
    source.replace('BalloonLayout: [', 'BalloonLayout: {'),
    source.replace('"speaker":"係員"', '"speaker":"来訪者"'),
    source.replace('"x":0.7', '"x":1'),
    source.replace('"route":"右上の余白から頭の輪郭へ短い尾"', '"route":""'),
    source.replace('係員「こちらへどうぞ。」', '係員「こちらへどうぞ。'),
    source.replace('係員「こちらへどうぞ。」', '係員「こちらへどうぞ。」\n来訪者「ありがとう。」'),
    source.replace('[3コマ目]', '[2コマ目]'),
  ]) assert.ok(detectPublicRewriteIssue('4koma_scenario', broken, 0), 'invalid output must be rejected');
});

test('silent panels require an explicit marker', () => {
  const valid = scenarioFixture();
  assert.equal(isNanoScenarioComplete(valid.replace(/\nセリフなし$/u, '')), false);
});

test('editorial adoption retains the shared scenario schema even with an external format override', () => {
  const valid = scenarioFixture();
  assert.equal(hasEditorialModeFormat(valid, '4koma_scenario'), true);
  const invalid = valid.replace(/^BalloonLayout: .*\n/gm, '');
  assert.equal(hasEditorialModeFormat(invalid, '4koma_scenario'), false);
  const reviews = { currentReview: { valid: true, score: 85 }, candidateReview: { valid: true, score: 90 } };
  assert.equal(evaluateBrushupCandidate({currentText:valid,candidateText:invalid+'\n【完】',mode:'4koma_scenario',formatOk:true,...reviews}).adopt, false);
});

test('editorial adoption permits a complete silent ending without a novel ending marker', () => {
  const valid = scenarioFixture().replace('状況:', `状況: ${'机の位置と人物の手元が同じ画面内に見える。'.repeat(120)}`);
  const reviews = { currentReview: { valid: true, score: 85 }, candidateReview: { valid: true, score: 90 } };
  assert.equal(evaluateBrushupCandidate({currentText:valid,candidateText:valid,mode:'4koma_scenario',...reviews}).adopt, true);
});

test('partial Responses and streaming continuations are validated only after complete scenario assembly', async () => {
  const originalFetch = globalThis.fetch;
  const prompt = Jo({ mode: '4koma_scenario' }).prompt;
  let candidate = scenarioFixture();
  let calls = 0;
  globalThis.fetch = async (_url, init) => {
    calls++;
    const request = JSON.parse(init.body);
    if (request.stream) return new Response(`data: ${JSON.stringify({ type: 'response.output_text.delta', delta: candidate })}\n\ndata: ${JSON.stringify({ type: 'response.completed' })}\n\n`, { headers: { 'content-type': 'text/event-stream' } });
    return new Response(JSON.stringify({ output_text: candidate }), { headers: { 'content-type': 'application/json' } });
  };
  try {
    const key = 'sk-unit-test-key-000000000000';
    assert.equal((await Gt(key, 'gpt-4.1', prompt)).text, candidate);
    let streamed = '';
    await yt(key, 'gpt-4.1', prompt, chunk => { if (!chunk.isThought) streamed += chunk.text; });
    assert.equal(streamed, candidate);
    const whole = candidate;
    const split = candidate.indexOf('[3コマ目]');
    candidate = whole.slice(0, split);
    const first = (await Gt(key, 'gpt-4.1', prompt)).text;
    assert.equal(isNanoScenarioComplete(first), false);
    candidate = whole.slice(split);
    let continued = '';
    await yt(key, 'gpt-4.1', prompt, chunk => { if (!chunk.isThought) continued += chunk.text; });
    assert.equal(finalizeNanoScenarioOutput('4koma_scenario', first+continued), whole);
    assert.equal(isNanoScenarioComplete(whole), true);
    candidate = whole.replace(/^BalloonLayout: .*\n/m, '');
    for (const run of [() => Gt(key, 'gpt-4.1', prompt), () => yt(key, 'gpt-4.1', prompt, () => {})]) {
      const before = calls;
      await run();
      assert.throws(() => finalizeNanoScenarioOutput('4koma_scenario', candidate), error => error.code === 'NANO_SCENARIO_INVALID' && error.draft === candidate);
      assert.equal(calls-before, 1);
    }
  } finally { globalThis.fetch = originalFetch; }
});

test('the ordinary workflow keeps Topic and validates at the assembled output boundary', () => {
  const source = fs.readFileSync(new URL('../src/legacyMain.js', import.meta.url), 'utf8');
  assert.ok(source.includes('G.mode==="4koma_scenario"&&hasNanoScenarioEnding(da(oe).story||oe)'));
  assert.ok(source.includes('ce=finalizeNanoScenarioOutput(G.mode,ce);const Ve=G.mode==="4koma_scenario"?[]:ce.split('));
  assert.ok(source.includes('ce=re(ce),ce=finalizeNanoScenarioOutput(G.mode,ce)'));
  assert.ok(source.includes('a.textContent=J.draft'));
  assert.equal(finalizeNanoScenarioOutput('novel', '通常の別形式'), '通常の別形式');
});

test('the current Nano parser consumes Story format and rejects malformed scenarios', async () => {
  const { createServer } = await import('vite');
  const { defaultNanoRoot, checkContractSources } = await import('../scripts/nanoContractSources.mjs');
  const { checkParserCompatibility } = await import('../scripts/nanoParserCompatibility.mjs');
  assert.deepEqual(checkContractSources(), []);
  const server = await createServer({ root: defaultNanoRoot, configFile: false, envFile: false, appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, watch: null } });
  try { assert.ok(await checkParserCompatibility(server) >= 7); }
  finally { await server.close(); }
});
