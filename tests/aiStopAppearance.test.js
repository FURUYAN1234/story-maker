import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const css=readFileSync(new URL('../src/style.css',import.meta.url),'utf8');
const token=name=>{const hits=[...css.matchAll(new RegExp('--'+name+':\\s*(#[0-9a-fA-F]{6})','g'))];assert.ok(hits.length,name);return hits.at(-1)[1];};
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const lum=hex=>rgb(hex).map(x=>{x/=255;return x<=.04045?x/12.92:((x+.055)/1.055)**2.4;}).reduce((a,x,i)=>a+x*[.2126,.7152,.0722][i],0);
test('inactive emergency stop uses neutral gray, active remains red, both keep readable contrast',()=>{
 const disabled=token('stop-disabled'),active=token('stop-bg');const [r,g,b]=rgb(disabled);
 assert.ok(Math.max(r,g,b)-Math.min(r,g,b)<=8,'disabled background must be visibly neutral gray');
 const [ar,ag,ab]=rgb(active);assert.ok(ar>ag*1.8&&ar>ab*1.8,'active is prominent red');assert.notEqual(disabled,active);
 for(const bg of [disabled,active])assert.ok((lum('#ffffff')+.05)/(lum(bg)+.05)>=4.5,'text stays readable');
 assert.match(css,/#btn-ai-disconnect:disabled[^}]*background:var\(\-\-stop-disabled\)/);
 assert.match(css,/#btn-ai-disconnect:not\(:disabled\):hover/,'hover red only applies to enabled stop');
});
