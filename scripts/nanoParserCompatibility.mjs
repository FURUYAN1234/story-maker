import assert from 'node:assert/strict';
import { isNanoScenarioComplete } from '../src/nanoScenarioContract.js';
import { scenarioFixture } from './fixtures/nanoScenarioFixture.mjs';

// Test data only. This is never imported into the browser application.
export async function checkParserCompatibility(server) {
  const { validateMangaScenario, getScenarioPanelBlocks } = await server.ssrLoadModule('/src/lib/scenario-validation.js');
  const { extractDialogueOnly, collectCastNameEntries } = await server.ssrLoadModule('/src/lib/panel-utils.js');
  const { editReferenceCast, hasCharacterReferenceImages } = await server.ssrLoadModule('/src/lib/reference-assets.js');
  const characterText = '## 1. 係員\n基本: 成人の受付係。\n外見: 黒髪の短髪、細身、眼鏡なし。\n服装: 紺色の作業用ベスト。\n性格・口調: 丁寧。\n関係・演技: 来訪者を案内する。\n\n## 2. 来訪者\n基本: 成人の利用者。\n外見: 茶色の肩までの髪、丸顔。\n服装: ベージュの普段着。\n性格・口調: 静か。\n関係・演技: 係員の指示を見る。';
  const imported = editReferenceCast('', characterText, []);
  assert.equal(imported.error, '', 'STEP1 must accept text without attached images');
  assert.equal(imported.castList, characterText, 'STEP1 must preserve character appearance and clothing');
  assert.deepEqual(collectCastNameEntries(imported.castList).map(entry => entry.displayName), ['係員', '来訪者']);
  assert.equal(hasCharacterReferenceImages([], []), false);
  assert.ok(editReferenceCast('', characterText.replace('## 2. 来訪者', '## 2. 係員'), []).error, 'duplicate profiles must be rejected');
  const cast = '係員、来訪者';
  const silent = scenarioFixture();
  const speaking = scenarioFixture({ silent: false });
  const multiSpeaker = silent.replace(
    '"x":0.7,"anchor":"画面右奥の係員の頭","route":"右上の余白から頭の輪郭へ短い尾"}]',
    '"x":0.7,"anchor":"画面右奥の係員の頭","route":"右上の余白から頭の輪郭へ短い尾"},{"speaker":"来訪者","x":0.3,"anchor":"左手前の頭","route":"左上から頭へ短い尾"}]',
  ).replace('係員「こちらへどうぞ。」', '係員「こちらへどうぞ。」\n来訪者「「返却」の箱ですね。」');
  const cases = [
    { name: 'silent ending, repeated camera and printed lettering', source: silent, expected: [['こちらへどうぞ。'], ['こちらへどうぞ。'], ['こちらへどうぞ。'], []] },
    { name: 'four speaking panels', source: speaking, expected: Array.from({ length: 4 }, () => ['こちらへどうぞ。']) },
    { name: 'multiple speakers and nested quotes', source: multiSpeaker, expected: [['こちらへどうぞ。', '「返却」の箱ですね。'], ['こちらへどうぞ。'], ['こちらへどうぞ。'], []] },
    { name: 'intentional all-silent panels', source: silent.replace(/BalloonLayout: \[\{[^\n]+/g, 'BalloonLayout: []').replace(/係員「こちらへどうぞ。」/g, 'セリフなし'), expected: [[], [], [], []] },
  ];
  for (const count of [5, 6, 7, 8]) cases.push({
    name: `${count}-panel free-layout story`, source: scenarioFixture({ count }),
    expected: Array.from({ length: count }, (_, i) => i === count - 1 ? [] : ['こちらへどうぞ。']),
  });
  for (const { name, source, expected } of cases) {
    assert.equal(isNanoScenarioComplete(source), true, `Story output rejected: ${name}`);
    const validation = validateMangaScenario(source, cast, { scenarioMode: 'experimental-manga' });
    assert.equal(validation.ok, true, `Manga rejected ${name}: ${JSON.stringify(validation)}`);
    const panels = getScenarioPanelBlocks(source);
    assert.deepEqual(panels.map(panel => panel.num), expected.map((_, i) => i + 1), name);
    for (const [index, panel] of panels.entries()) {
      const entries = extractDialogueOnly(panel.text, cast, { asEntries: true, forImagePrompt: true });
      assert.deepEqual(entries.map(entry => entry.text), expected[index], `${name}: panel ${index + 1} dialogue changed`);
      assert.deepEqual(entries.map(entry => entry.speaker), expected[index].map((_, i) => i === 0 ? '係員' : '来訪者'), `${name}: speaker/order changed`);
    }
  }
  const invalid = [
    ['duplicate panel number', speaking.replace('[3コマ目]', '[2コマ目]')],
    ['unclosed dialogue quote', speaking.replace('係員「こちらへどうぞ。」', '係員「こちらへどうぞ。')],
    ['missing speech and silence marker', silent.replace(/\nセリフなし$/u, '')],
  ];
  for (const [name, source] of invalid) {
    assert.equal(isNanoScenarioComplete(source), false, `Story accepted ${name}`);
    assert.equal(validateMangaScenario(source, cast, { scenarioMode: 'experimental-manga' }).ok, false, `Manga accepted ${name}`);
  }
  for (const count of [3, 9]) {
    assert.equal(isNanoScenarioComplete(scenarioFixture({ count })), false, `${count} panels must fail`);
    assert.equal(validateMangaScenario(scenarioFixture({ count, composition: false }), cast, { scenarioMode: 'experimental-manga' }).ok, false);
  }
  return cases.length + invalid.length + 4;
}
