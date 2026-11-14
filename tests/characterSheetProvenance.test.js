import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {wf} from '../src/characterImportParsing.js';
import {installNanoCharacterHandoff} from '../src/nanoCharacterHandoff.js';
import {buildGenerationSettingsExport,parseGenerationSettingsExport} from '../src/settingsSnapshotHelpers.js';
import {scenarioFixture} from '../scripts/fixtures/nanoScenarioFixture.mjs';

const legacy=fs.readFileSync(new URL('../src/legacyMain.js',import.meta.url),'utf8');
const settingsIo=fs.readFileSync(new URL('../src/generationSettingsIo.js',import.meta.url),'utf8');
const source=scenarioFixture({count:6});
const profile=name=>`## ${name==='係員'?1:2}. ${name}\n基本: 成人\n外見: 黒い短髪\n服装: 紺色の作業着\n性格・口調: 丁寧\n関係・演技: 案内する`;
const cast=[profile('係員'),profile('来訪者')].join('\n\n');
const section=(text,start,end)=>{
  const at=text.indexOf(start),until=text.indexOf(end,at);
  assert(at>=0&&until>at,`production boundary exists: ${start}`);
  return text.slice(at,until);
};
function element() {
  const listeners=new Map(),classes=new Set();
  return {dataset:{},textContent:'',disabled:false,
    classList:{add:v=>classes.add(v),remove:v=>classes.delete(v),contains:v=>classes.has(v),toggle:(v,flag)=>flag?classes.add(v):classes.delete(v)},
    addEventListener:(name,fn)=>listeners.set(name,fn),removeEventListener:name=>listeners.delete(name),
    fire:(name,event={})=>listeners.get(name)?.(event),querySelectorAll:()=>[],
  };
}
const nextTurn=()=>new Promise(resolve=>setImmediate(resolve));

test('ordinary image import marks only registered characters, never analysis failure, cancellation or empty selection',async()=>{
  const functionBody=section(legacy,'function kf(','const V=');
  for(const outcome of ['register','cancel','failure','empty']) {
    const nodes=new Map(['ci-dropzone','ci-file-input','ci-status'].map(id=>[id,element()]));
    const state={characters:[],locked:{}},document={getElementById:id=>nodes.get(id),createElement:()=>({firstElementChild:{}}),body:{appendChild:()=>{}}};
    let register,rendered=0;
    const install=new Function('document','If','Gd','wf','$f','Sf','Cf','Nf','setTimeout','console','yf',`${functionBody};return kf;`)(
      document,async()=> 'fixture',async()=>{if(outcome==='failure')throw new Error('analysis failed');return {text:JSON.stringify([{name:'係員',sex:'',role:'',personality:'',note:'黒い短髪、紺色の作業着'}])};},
      wf,x=>x,x=>x,()=>'<div></div>',(_chars,callback)=>{register=callback;},()=>0,{error:()=>{}},'analysis prompt',
    );
    install(state,()=>rendered++,()=> 'test-only-key');
    nodes.get('ci-file-input').fire('change',{target:{files:[{type:'image/png',name:'sheet.png'}],value:'selected'}});
    await nextTurn();
    assert.deepEqual(state.characters,[],'analysis itself does not register or claim an imported sheet');
    if(outcome==='failure')assert.equal(register,undefined);
    if(outcome==='register') {
      register([{name:'係員',note:'黒い短髪、紺色の作業着'}]);
      assert.equal(state.characters[0].characterSheetImported,true);assert.equal(rendered,1);
    } else if(outcome==='empty') {register([]);assert.deepEqual(state.characters,[]);}
    else assert.deepEqual(state.characters,[]);
  }
});

test('live character cards and settings export/import carry explicit provenance and deletion removes it',()=>{
  const state={characters:[{name:'係員',note:'紺色の作業着',characterSheetImported:true},{name:'来訪者'}],locked:{}};
  const nodes=new Map(['char-count-display','char-list'].map(id=>[id,element()]));
  const render=new Function('s','N','createCharacterDatalistsMarkup','At','Et','Ce',`${section(legacy,'function et(){','function pp(){')};return et;`)(state,id=>nodes.get(id),()=>({roles:'',personalities:'',sex:''}),[],[],value=>String(value||''));
  render();
  const html=nodes.get('char-list').innerHTML;
  assert.match(html,/data-character-sheet-imported="true"/);assert.match(html,/data-character-sheet-imported="false"/);
  const cards=state.characters.map(c=>({dataset:{characterSheetImported:String(c.characterSheetImported===true)},querySelector:selector=>({value:selector==='.char-name-input'?c.name:selector==='.char-memo'?c.note||'':''})}));
  const collect=new Function('document','normalizeText',`${section(settingsIo,'function collectCharacters()','function collectUniversalAssets()')};return collectCharacters;`)({querySelectorAll:()=>cards},value=>String(value||'').trim());
  const exported=parseGenerationSettingsExport(buildGenerationSettingsExport({characters:collect()}));
  assert.deepEqual(exported.settings.characters.map(c=>c.characterSheetImported),[true,false]);
  let apply;
  const listener=legacy.slice(legacy.indexOf('document.addEventListener("story-maker:apply-imported-characters"')).trim();
  new Function('document','s','et',listener)({addEventListener:(_event,fn)=>{apply=fn;}},state,render);
  apply({detail:{characters:exported.settings.characters}});
  assert.deepEqual(state.characters.map(c=>c.characterSheetImported),[true,false]);
  apply({detail:{characters:[{name:'係員',characterSheetImported:'true'},{name:'来訪者'}]}});
  assert.deepEqual(state.characters.map(c=>c.characterSheetImported),[false,false],'old/unknown metadata must not claim success');
  state.characters=[{name:'係員',characterSheetImported:true},{name:'来訪者'}];
  const remove=new Function('s','et',`${section(legacy,'function lh(e){','function ch(){')};return lh;`)(state,render);
  remove(0);assert.equal(state.characters.length,1);assert.doesNotMatch(nodes.get('char-list').innerHTML,/data-character-sheet-imported="true"/);
  const clear=new Function('s','et',`${section(legacy,'function ih(){','function et(){')};return ih;`)(state,render);
  clear();assert.deepEqual(state.characters,[]);assert.doesNotMatch(nodes.get('char-list').innerHTML,/data-character-sheet-imported="true"/);
});

test('handoff UI offers all three exact copies only without imported sheets and reacts to card rerenders',async()=>{
  const ids=['output','nano-character-handoff','nano-handoff-options','nano-handoff-status','nano-scenario-boundary','nano-character-text','nano-character-status','nano-copy-characters','nano-copy-scenario','nano-retry-characters','btn-copy','btn-generate','settings','char-list','mode-chips'];
  const nodes=new Map(ids.map(id=>[id,element()]));
  nodes.get('output').textContent=source;nodes.get('output').dataset.manualOutput='true';
  let cards=[],observer,requests=0;const copied=[],pending=new Map();let timer=0;
  const makeCard=imported=>({dataset:{characterSheetImported:String(imported)},querySelector:selector=>({value:selector==='.char-name-input'?'係員':'紺色の作業着'}),querySelectorAll:()=>[]});
  const doc={getElementById:id=>nodes.get(id),querySelector:()=>({dataset:{v:'4koma_scenario'}}),querySelectorAll:()=>cards,documentElement:{dataset:{}},defaultView:{MutationObserver:class{constructor(callback){this.callback=callback;this.targets=[];observer=this;}observe(target,options){this.targets.push({target,options});}disconnect(){}}}};
  const timers={setTimeout:(fn,ms)=>{pending.set(++timer,{fn,ms});return timer;},clearTimeout:id=>pending.delete(id)};
  const sync=async()=>{const item=[...pending.entries()].find(([,job])=>job.ms===100);assert(item,'a card/output change schedules reevaluation');pending.delete(item[0]);await item[1].fn();};
  const dispose=installNanoCharacterHandoff({doc,timers,callAi:async()=>{requests++;return cast;},clipboard:{writeText:async text=>copied.push(text)}});
  await sync();
  assert.equal(requests,1);assert.equal(nodes.get('nano-character-handoff').classList.contains('hidden'),false);
  await nodes.get('nano-copy-characters').fire('click');assert.equal(copied.at(-1),cast);
  await nodes.get('nano-copy-scenario').fire('click');assert.equal(copied.at(-1),source);
  nodes.get('btn-copy').fire('click',{preventDefault(){},stopImmediatePropagation(){}});
  assert(copied.at(-1).includes(cast)&&copied.at(-1).includes(source));assert.match(copied.at(-1),/STEP1用/);
  const watch=observer.targets.find(item=>item.target===nodes.get('char-list'));assert(watch.options.childList&&watch.options.attributes);
  cards=[makeCard(true),makeCard(false)];observer.callback();await sync();
  assert.equal(requests,1);assert.equal(nodes.get('nano-character-handoff').classList.contains('hidden'),true);
  assert.match(nodes.get('nano-handoff-status').textContent,/登場人物全員分/);assert.match(nodes.get('nano-handoff-status').textContent,/自動照合しません/);
  nodes.get('btn-copy').fire('click',{preventDefault(){},stopImmediatePropagation(){}});assert.equal(copied.at(-1),source);
  cards=[];observer.callback();await sync();assert.equal(requests,1,'removing the imported roster reuses matching completed text');
  assert.equal(nodes.get('nano-character-handoff').classList.contains('hidden'),false);
  dispose();
});
