import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { setInternalAiStopState } from '../src/internalAiStopControls.js';

test('internal stop stays hidden while enabled and programmatic stop still works across lifecycle',()=>{
 const classes=new Set();let stops=0;
 const internal={hidden:false,disabled:true,classList:{add:c=>classes.add(c)},click(){if(!this.disabled)stops++;}};
 for(const running of [false,true,false,true]){
  setInternalAiStopState(internal,running);
  assert.equal(internal.hidden,true);assert.equal(classes.has('hidden'),true);assert.equal(internal.disabled,!running);
  internal.click();
 }
 assert.equal(stops,2);
 setInternalAiStopState(null,true);
});
test('both longify and sealed legacy novel use central hidden internal stop state',()=>{
 const longify=readFileSync(new URL('../src/longifyBeta.js',import.meta.url),'utf8');
 const legacy=readFileSync(new URL('../src/legacyMain.js',import.meta.url),'utf8');
 const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
 assert.match(longify,/setInternalAiStopState\(stopButton, running\)/);
 assert.match(legacy,/setInternalAiStopState\(a,!0\)/);assert.match(legacy,/setInternalAiStopState\(g,!0\)/);
 for(const id of ['btn-ln-abort','btn-longify-stop'])assert.match(html,new RegExp('<button[^>]*id="'+id+'"[^>]* hidden'));
});
