import test from 'node:test';
import assert from 'node:assert/strict';
import {hasEditorialModeFormat} from '../src/editorialBrushupCandidate.js';
import {prepareEditorialManuscript} from '../src/editorialBrushupRuntime.js';
import {cleanOutputForPublicMode} from '../src/outputCleanup.js';
import {buildOutputModeStrictContract,buildFinalOutputFormatCheck} from '../src/outputModeContracts.js';

const picture='店員が傘の目印を確かめる。'.repeat(12);
const body = 'タイトル: 傘の目印\n' + [1,2,3,4].map((n)=>`${n}コマ目（${['起','承','転','結・オチ'][n-1]}）:\n絵/状況:\n${picture}\nセリフ:\n店員「これは僕の傘です！」`).join('\n');
test('completed public four-panel output survives cleanup and bypasses unnecessary paid format repair',async()=>{
 const cleaned=cleanOutputForPublicMode(body,'4koma');assert.equal(hasEditorialModeFormat(cleaned,'4koma'),true);
 let calls=0;const prepared=await prepareEditorialManuscript({text:cleaned,mode:'4koma',callAi:async()=>{calls++;throw new Error('unnecessary repair');}});
 assert.equal(prepared,cleaned);assert.equal(calls,0);
});
test('four-panel format rejects missing, duplicated, reversed or empty fields and panels',()=>{
 for(const invalid of [body.replace('4コマ目（結・オチ）:','3コマ目（転）:'),body.replace('絵/状況:','背景:'),body.replace('セリフ:','台詞なし:'),body.replace(`絵/状況:\n${picture}`,'絵/状況:'),body.replace('セリフ:\n店員「これは僕の傘です！」','セリフ:'),body.replace(`絵/状況:\n${picture}\nセリフ:`, 'セリフ:\n店員「先に話す」\n絵/状況:'),body+'\n4コマ目:\n絵/状況: 重複\nセリフ: 二重'])assert.equal(hasEditorialModeFormat(invalid,'4koma'),false);
});
test('all ordinary four-panel prompt contracts agree that public output excludes production notes',()=>{
 for(const prompt of [buildOutputModeStrictContract({mode:'4koma'}),buildFinalOutputFormatCheck({mode:'4koma'})]){
 assert.match(prompt,/絵\/状況/);assert.match(prompt,/セリフ/);assert.doesNotMatch(prompt,/狙いを.*(?:置|書)|狙いを必ず|「狙い:」を/);
 }
});

test('required length repair accepts complete note-free output while malformed or short repairs still fail',async()=>{
 let calls=0;
 const repaired=await prepareEditorialManuscript({text:body.replaceAll(picture,'傘を取る。'),mode:'4koma',callAi:async()=>{calls++;return {text:body};}});
 assert.equal(calls,1);assert.equal(hasEditorialModeFormat(repaired,'4koma'),true);assert.match(repaired,/店員「これは僕の傘です！」/);
 for(const invalid of [body.replaceAll(picture,'傘を取る。'),body.replace('4コマ目（結・オチ）:','5コマ目:')])await assert.rejects(prepareEditorialManuscript({text:'不完全な本文。',mode:'4koma',callAi:async()=>({text:invalid})}),{code:'EDITORIAL_FORMAT_REPAIR_FAILED'});
});
