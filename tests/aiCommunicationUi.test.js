import test from 'node:test';
import assert from 'node:assert/strict';
import { installAiCommunicationUi } from '../src/aiCommunicationUi.js';
import { beginAiCommunication, getAiCommunicationState, withAiCommunication } from '../src/aiCommunication.js';

test('global disconnect stays reachable, preserves draft/settings/keys and resets only on explicit run', async () => {
  beginAiCommunication();
  const listeners = new Map();
  const button = {disabled:true, addEventListener:(type,fn)=>listeners.set(`button:${type}`,fn),removeEventListener(){}};
  const status = {textContent:''};
  const draft = {textContent:'元原稿'}, settings = {value:'本人の題材'}, key = {value:'test-only-memory-value'};
  const elements = {'btn-ai-disconnect':button,'ai-disconnect-status':status,output:draft,supplement:settings,apikey:key};
  const doc = {getElementById:id=>elements[id],addEventListener:(type,fn)=>listeners.set(type,fn),removeEventListener(){}};
  const dispose = installAiCommunicationUi(doc);
  try {
    assert.equal(button.disabled,true);
    const pending = withAiCommunication(()=>new Promise(()=>{}));
    assert.equal(button.disabled,false);
    listeners.get('button:click')();
    await assert.rejects(pending,{name:'AbortError'});
    assert.equal(button.disabled,true);
    assert.match(status.textContent,/中断/);
    assert.equal(draft.textContent,'元原稿'); assert.equal(settings.value,'本人の題材'); assert.equal(key.value,'test-only-memory-value');
    const click = id => listeners.get('click')({target:{closest:()=>({id,disabled:false})}});
    click('btn-copy'); assert.equal(getAiCommunicationState().stopped,true);
    click('btn-longify-beta'); assert.equal(getAiCommunicationState().stopped,false);
    const result=await withAiCommunication(async()=> 'normal');
    assert.equal(result,'normal'); assert.equal(button.disabled,true);
  } finally { dispose(); beginAiCommunication(); }
});
