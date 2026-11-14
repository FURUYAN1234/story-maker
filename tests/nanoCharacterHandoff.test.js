import test from 'node:test';
import assert from 'node:assert/strict';
import { buildNanoCharacterPrompt, validateNanoCharacterText, createNanoCharacterHandoff, buildNanoFullCopy } from '../src/nanoCharacterHandoff.js';
import { scenarioFixture } from '../scripts/fixtures/nanoScenarioFixture.mjs';
import { shouldSkipQualityPrompt } from '../src/modeContracts.js';
import { buildGenerationSettingsExport, parseGenerationSettingsExport } from '../src/settingsSnapshotHelpers.js';

const source = scenarioFixture({count:6});
const cast = '## 1. 係員\n基本: 成人の受付係。\n外見: 黒髪の短髪、細身、眼鏡なし。\n服装: 紺色の作業用ベスト。\n性格・口調: 落ち着いた丁寧な口調。\n関係・演技: 来訪者を手のひらで案内する。\n\n## 2. 来訪者\n基本: 成人の利用者。\n外見: 茶色の肩までの髪、丸顔、眼鏡なし。\n服装: ベージュの普段着。\n性格・口調: 静かで慎重。\n関係・演技: 係員の指示をよく見る。';

test('character handoff uses actual scenario names, clothing and user settings, with an auxiliary request contract', () => {
  const prompt=buildNanoCharacterPrompt(source,[{name:'係員',note:'左目の下に小さなほくろ'}]);
  assert.match(prompt,/左目の下に小さなほくろ/);
  assert.ok(prompt.includes(source));
  assert.match(prompt,/同一人物の項目内/);
  assert.equal(shouldSkipQualityPrompt(prompt),true,'character settings must not become another scenario rewrite');
  assert.deepEqual(validateNanoCharacterText(cast,source),{ok:true,names:['係員','来訪者'],issue:''});
  assert.equal(validateNanoCharacterText(cast.replace('## 1. 係員','## 1. 別人'),source).ok,false);
  assert.equal(validateNanoCharacterText(cast.replace('外見: 黒髪の短髪、細身、眼鏡なし。',''),source).ok,false);
  assert.equal(validateNanoCharacterText(cast.replace('外見: 黒髪の短髪、細身、眼鏡なし。','外見:'),source).ok,false);
  assert.equal(validateNanoCharacterText(cast+'\n## 別人\n外見: 赤い髪。',source).ok,false);
  assert.equal(validateNanoCharacterText(cast.split('## 2.')[0],source,[{name:'来訪者'}]).ok,false);
  assert.equal(validateNanoCharacterText(cast.replace('## 2. 来訪者','## 2. 係員'),source).ok,false);
  assert.ok(buildNanoFullCopy(cast,source).includes(cast));
  assert.ok(buildNanoFullCopy(cast,source).includes(source));
  assert.equal(buildNanoFullCopy('',source),source);
});

test('same-sheet self report suppresses API use and settings export preserves only an explicit boolean', async () => {
  let input={source,mode:'4koma_scenario',sameSheets:true,settled:true,busy:false,characters:[]},calls=0,state;
  const controller=createNanoCharacterHandoff({getInput:()=>input,onState:s=>state=s,callAi:async()=>{calls++;return cast;}});
  await controller.sync();
  assert.equal(calls,0);assert.equal(state.phase,'same-sheets');
  input={...input,sameSheets:false};await controller.sync();
  assert.equal(calls,1);assert.equal(state.phase,'ready');
  await controller.sync();assert.equal(calls,1,'same accepted output is reused');
  input={...input,sameSheets:true};await controller.sync();assert.equal(state.phase,'same-sheets');
  assert.equal(parseGenerationSettingsExport(buildGenerationSettingsExport({mangaSameCharacterSheets:true})).settings.mangaSameCharacterSheets,true);
  assert.equal(parseGenerationSettingsExport(buildGenerationSettingsExport({mangaSameCharacterSheets:'false'})).settings.mangaSameCharacterSheets,false);
});

test('handoff waits for a valid settled scenario, rejects failed repairs and ignores stale responses', async () => {
  let input={source,mode:'4koma_scenario',sameSheets:false,settled:false,busy:true,characters:[]},calls=0,state,resolve;
  const controller=createNanoCharacterHandoff({getInput:()=>input,onState:s=>state=s,callAi:()=>{calls++;return new Promise(r=>resolve=r);}});
  await controller.sync();assert.equal(calls,0);
  input={...input,busy:false,settled:true};const pending=controller.sync();
  input={...input,sameSheets:true};await controller.sync();resolve(cast);await pending;
  assert.equal(state.phase,'same-sheets','late API response must not restore suppressed text');
  input={...input,sameSheets:false};const resumed=controller.sync();resolve(cast);await resumed;
  assert.equal(calls,2);assert.equal(state.phase,'ready');
  let badCalls=0;
  input={...input,sameSheets:false};
  const failing=createNanoCharacterHandoff({getInput:()=>input,onState:s=>state=s,callAi:async prompt=>{badCalls++;if(badCalls===2)assert.match(prompt,/前回の不適合/);return '人物不明';}});
  await failing.sync();assert.equal(badCalls,2);assert.equal(state.phase,'failed');
  await failing.sync();assert.equal(badCalls,2,'failure must not cause a paid retry loop');
  input={...input,source:'途中の台本'};await failing.sync();assert.equal(badCalls,2);
});

test('returning to cached settings or leaving manga cancels outstanding helper adoption', async () => {
  let input={source,mode:'4koma_scenario',sameSheets:false,settled:true,busy:false,characters:[]},state,resolve,calls=0;
  const controller=createNanoCharacterHandoff({getInput:()=>input,onState:s=>state=s,callAi:()=>{calls++;return calls===1?cast:new Promise(r=>resolve=r);}});
  await controller.sync();
  input={...input,characters:[{note:'別の設定'}]};const changed=controller.sync();
  input={...input,characters:[]};await controller.sync();resolve(cast.replace('紺色','赤色'));await changed;
  assert.equal(state.text,cast,'the old completed request cannot overwrite a restored cached result');
  input={...input,characters:[{note:'もう一つの設定'}]};const beforeLeaving=controller.sync();const oldResolve=resolve;
  input={...input,mode:'novel'};await controller.sync();
  input={...input,mode:'4koma_scenario'};const returned=controller.sync();
  oldResolve(cast);resolve(cast);await Promise.all([beforeLeaving,returned]);
  assert.equal(calls,4);assert.equal(state.phase,'ready');
});
