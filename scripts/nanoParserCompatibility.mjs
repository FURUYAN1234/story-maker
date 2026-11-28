import assert from 'node:assert/strict';
import { isNanoScenarioComplete } from '../src/nanoScenarioContract.js';
import { readPageComposition as readStoryComposition } from '../src/vendor/nanoMangaPageComposition.js';
import { scenarioFixture } from './fixtures/nanoScenarioFixture.mjs';

// Test data only. This is never imported into the browser application.
export async function checkParserCompatibility(server, { legacy = false } = {}) {
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
  const {createBookPageMode}=await server.ssrLoadModule('/src/lib/page-production-contract.js');
  const {readPageComposition,pageCompositionRendering,scenarioPageCompositionInstruction,SCENARIO_PAGE_COMPOSITION:ordinaryGuidance}=await server.ssrLoadModule('/src/lib/manga-page-composition.js');
  assert.equal(scenarioPageCompositionInstruction('experimental-manga'),ordinaryGuidance,'ordinary 4–8 generation guidance must stay unchanged');
  for(const count of [1,2,3]){
    const composition={layout:'vertical_page',reason:'指定された動作と読順に必要な固定ページ。',heroPanels:[1],foregrounds:[],breakouts:[],bleed:[]};
    const source=scenarioFixture({count,silent:false,composition:false}).replace(/Scenario:\r?\n/,'Scenario:\nPageComposition: '+JSON.stringify(composition)+'\n');
    const book=validateMangaScenario(source,cast,{scenarioMode:createBookPageMode(count)});
    assert.equal(book.ok,true,`${count}-panel explicit book mode must accept current shared schema`);
    assert.equal(readPageComposition(source,count).layout,'vertical_page');
    assert.equal(getScenarioPanelBlocks(source).length,count);
    for(const panel of getScenarioPanelBlocks(source))assert.deepEqual(extractDialogueOnly(panel.text,cast,{asEntries:true,forImagePrompt:true}).map(entry=>entry.text),['こちらへどうぞ。']);
    assert.equal(isNanoScenarioComplete(source),false,'Story Maker remains a 4–8-panel authoring product');
    assert.equal(validateMangaScenario(source,cast,{scenarioMode:'experimental-manga'}).structuralValid,false,'ordinary free-layout must not silently become book mode');
    assert.equal(validateMangaScenario(source,cast,{scenarioMode:createBookPageMode(count+1)}).structuralValid,false,'book page count remains fixed');
  }
  const freeComposition={layout:'free',reason:'手渡しから返却の動作を順に読む。',frames:Array.from({length:4},(_,i)=>({x:0,y:i/4,w:1,h:1/4})),heroPanels:[1],foregrounds:JSON.parse(speaking.match(/^PageComposition: (.+)$/m)[1]).foregrounds,breakouts:[],bleed:[]};
  const json=JSON.stringify(freeComposition);
  const editable=speaking.replace(/^PageComposition:.*$/m,'PageComposition: '+json);
  const options={scenarioMode:'experimental-manga'};
  const originalValidation=validateMangaScenario(editable,cast,options);
  assert.equal(originalValidation.ok,true,'valid free four-panel source remains accepted');
  assert.equal(isNanoScenarioComplete(editable),true);
  const drafts=[json.slice(0,-1),'',JSON.stringify({...freeComposition,frames:[]})];
  for(const draft of drafts){
    const source=editable.replace(json,draft),unchanged=source;
    let validation;
    assert.doesNotThrow(()=>{validation=validateMangaScenario(source,cast,options);},'an editable draft must return invalid, not throw');
    assert.equal(validation.ok,false);
    assert.equal(validation.structuralValid,false);
    assert.match(validation.compositionError,/PageComposition/);
    assert.equal(isNanoScenarioComplete(source),false,'Story must still reject incomplete/invalid composition');
    assert.equal(source,unchanged,'inspection must not repair or replace source text');
  }
  assert.deepEqual(validateMangaScenario(editable,cast,options),originalValidation,'restoring the exact original text restores validity');
  assert.equal(isNanoScenarioComplete(editable),true);

  const angled = [
    { x: .5, y: 0, w: .5, h: .5, corners: [[.2, 0], [1, 0], [1, 1], [0, 1]] },
    { x: 0, y: 0, w: .6, h: .5, corners: [[0, 0], [1, 0], [5 / 6, 1], [0, 1]] },
    { x: .5, y: .5, w: .5, h: .5 },
    { x: 0, y: .5, w: .5, h: .5 },
  ];
  const inset = [
    { x: 0, y: 0, w: 1, h: .5 },
    { x: .1, y: .1, w: .3, h: .25, insetOf: 1 },
    { x: .5, y: .5, w: .5, h: .5 },
    { x: 0, y: .5, w: .5, h: .5 },
  ];
  const structuredCases = [
    ['diagonal shared edge', angled, 2, 'SLANTED FRAME P1'],
    ['inset directly after its parent', inset, 3, 'INSET P2 within P1'],
  ];
  const withFrames = (frames, into) => editable.replace(/^PageComposition:.*$/m, 'PageComposition: ' + JSON.stringify({
    ...freeComposition, frames, foregrounds: [], breakouts: [{ panel: 1, part: '係員の肩と腕', into }],
  }));
  for (const [name, frames, into, renderMarker] of structuredCases) {
    const source = withFrames(frames, into);
    assert.equal(isNanoScenarioComplete(source), true, 'Story rejected ' + name);
    const validation = validateMangaScenario(source, cast, options);
    assert.equal(validation.ok, !legacy, 'Manga contract differs for ' + name);
    if (legacy) {
      assert.match(validation.compositionError, /PageComposition/);
      continue;
    }
    const parsed = readPageComposition(source, 4);
    assert.deepEqual(parsed, readStoryComposition(source, 4), name);
    assert.deepEqual(parsed.frames, frames, 'frame metadata changed for ' + name);
    assert.deepEqual(getScenarioPanelBlocks(source).map(panel => panel.num), [1, 2, 3, 4], name);
    assert.ok(pageCompositionRendering({ composition: parsed }).includes(renderMarker), name);
  }

  const invalidFrames = [
    ['crossed polygon', [{ ...angled[0], corners: [[.2, 0], [1, 1], [1, 0], [0, 1]] }, ...angled.slice(1)], 2],
    ['inset outside parent', [inset[0], { ...inset[1], y: .4 }, ...inset.slice(2)], 3],
    ['inset after a later main panel', [inset[0], inset[2], inset[1], inset[3]], 2],
  ];
  for (const [name, frames, into] of invalidFrames) {
    const source = withFrames(frames, into);
    assert.equal(isNanoScenarioComplete(source), false, 'Story accepted ' + name);
    const validation = validateMangaScenario(source, cast, options);
    assert.equal(validation.ok, false, 'Manga accepted ' + name);
    assert.match(validation.compositionError, /PageComposition/);
  }
  return cases.length + invalid.length + 4 + 9 + drafts.length + 2 + structuredCases.length + invalidFrames.length;
}
