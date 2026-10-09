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
import { finalizeNanoScenarioOutput, isNanoScenarioComplete } from '../src/nanoScenarioContract.js';
import { hasEditorialModeFormat, evaluateBrushupCandidate } from '../src/editorialBrushupCandidate.js';

// Synthetic contract fixtures, not paid API evidence.
export function scenarioFixture({ silent = true } = {}) {
  return `Topic: 返却の順番
Logline: 係員が返却札を直し、来訪者が並び直す。
Location: 屋内の受付
VisualEvidence: 返却札、貸出箱
Outfit: 係員は作業用ベスト、来訪者は普段着
Punchline: 静かな余韻
Scenario:
${[1, 2, 3, 4].map(n => `[${n}コマ目]
[EMOTION: NORMAL]
[Camera: 係員の右後方、高い位置から浅く見下ろす俯瞰。頭頂と箱の天面が見える。]
BalloonLayout: ${silent && n === 4 ? '[]' : '[{"speaker":"係員","x":0.7,"anchor":"画面右奥の係員の頭","route":"右上の余白から頭の輪郭へ短い尾"}]'}
状況: 係員が右奥で返却札を支え、左手前の来訪者が札を見つめる。札には「返却」と印字されている。係員は右手で札を持つ。左手は箱の縁を支える。来訪者は口を閉じて札へ目を向ける。肩が少し下がる。箱の天面が光を受ける。札を直す選択によって待つ場所が変わり、来訪者が箱を持ち直して一歩進む後始末を見せる。
${silent && n === 4 ? 'セリフなし' : '係員「こちらへどうぞ。」'}`).join('\n\n')}`;
}

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
  const valid = scenarioFixture();
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
  assert.ok(source.includes('G.mode==="4koma_scenario"&&isNanoScenarioComplete(da(oe).story||oe)'));
  assert.ok(source.includes('ce=finalizeNanoScenarioOutput(G.mode,ce);const Ve=G.mode==="4koma_scenario"?[]:ce.split('));
  assert.ok(source.includes('ce=re(ce),ce=finalizeNanoScenarioOutput(G.mode,ce)'));
  assert.ok(source.includes('a.textContent=J.draft'));
  assert.equal(finalizeNanoScenarioOutput('novel', '通常の別形式'), '通常の別形式');
});

test('the current Nano parser consumes Story format, silence and physical-surface quotes', async () => {
  const nanoRoot = new URL('../../nano-banana-pro/', import.meta.url);
  if (!fs.existsSync(new URL('package.json', nanoRoot))) return;
  const { createServer } = await import('vite');
  const { fileURLToPath } = await import('node:url');
  const server = await createServer({ root: fileURLToPath(nanoRoot), appType: 'custom', logLevel: 'silent', server: { middlewareMode: true } });
  try {
    const { validateMangaScenario, getScenarioPanelBlocks } = await server.ssrLoadModule('/src/lib/scenario-validation.js');
    const { extractDialogueOnly } = await server.ssrLoadModule('/src/lib/panel-utils.js');
    const source = scenarioFixture();
    assert.equal(validateMangaScenario(source, '係員、来訪者').ok, true);
    for (const panel of getScenarioPanelBlocks(source)) {
      const entries = extractDialogueOnly(panel.text, '係員、来訪者', { asEntries: true, forImagePrompt: true });
      assert.equal(entries.length, panel.num === 4 ? 0 : 1);
      if (entries.length) assert.equal(entries[0].text, 'こちらへどうぞ。');
    }
  } finally { await server.close(); }
});
