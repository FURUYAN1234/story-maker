import test from 'node:test';
import assert from 'node:assert/strict';
import { installAiCommunicationUi } from '../src/aiCommunicationUi.js';
import { beginAiCommunication, getAiCommunicationState, withAiCommunication } from '../src/aiCommunication.js';

test('global disconnect stays reachable, preserves draft/settings/keys and resets only on explicit run', async () => {
  beginAiCommunication();
  const listeners = new Map();
  const button = {disabled:true, addEventListener:(type,fn)=>listeners.set(`button:${type}`,fn),removeEventListener(){}};
  const status = {textContent:''};
  let inlineStops = 0;
  const internalStop = {hidden:true,disabled:false,click(){inlineStops++;}};
  const draft = {textContent:'元原稿'}, settings = {value:'本人の題材'}, key = {value:'test-only-memory-value'};
  let configured = false;
  let notifyReadiness;
  const bar = {hidden:false};
  const banner = {classList:{contains:()=>configured}};
  const elements = {'btn-longify-stop':internalStop,'btn-ai-disconnect':button,'ai-disconnect-status':status,'ai-disconnect-bar':bar,banner,output:draft,supplement:settings,apikey:key};
  const doc = {getElementById:id=>elements[id],addEventListener:(type,fn)=>listeners.set(type,fn),removeEventListener(){}};
  doc.defaultView = {MutationObserver:class {constructor(fn){notifyReadiness=fn;} observe(){} disconnect(){}}};
  const dispose = installAiCommunicationUi(doc);
  try {
    assert.equal(button.disabled,true);
    assert.equal(bar.hidden,true,'initial API setup has no stop control');
    configured = true; notifyReadiness();
    assert.equal(bar.hidden,false,'configured workspace exposes the inactive stop');
    const pending = withAiCommunication(()=>new Promise(()=>{}));
    assert.equal(button.disabled,false);
    configured = false; notifyReadiness();
    assert.equal(bar.hidden,false,'an active request stays stoppable during API switching');
    listeners.get('button:click')();
    assert.equal(inlineStops,1,'global stop still reaches the hidden longify controller');
    assert.equal(internalStop.hidden,true,'controller does not become another visible stop');
    await assert.rejects(pending,{name:'AbortError'});
    assert.equal(button.disabled,true);
    assert.equal(bar.hidden,true,'unconfigured stopped state hides the control');
    assert.match(status.textContent,/中断/);
    assert.equal(draft.textContent,'元原稿'); assert.equal(settings.value,'本人の題材'); assert.equal(key.value,'test-only-memory-value');
    const click = id => listeners.get('click')({target:{closest:()=>({id,disabled:false})}});
    click('btn-copy'); assert.equal(getAiCommunicationState().stopped,true);
    click('btn-longify-beta'); assert.equal(getAiCommunicationState().stopped,false);
    const result=await withAiCommunication(async()=> 'normal');
    assert.equal(result,'normal'); assert.equal(button.disabled,true);
  } finally { dispose(); beginAiCommunication(); }
});
