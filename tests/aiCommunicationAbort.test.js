import test from 'node:test';
import assert from 'node:assert/strict';
import { beginAiCommunication, stopAiCommunication, getAiCommunicationState, captureAiOperation } from '../src/aiCommunication.js';
import { Gt, yt, Gd, lf } from '../src/providerClients.js';

const geminiKey = 'gemini-test-key-for-cancellation';
const openaiKey = 'sk-test-key-for-cancellation-only';
const abortError = error => error?.name === 'AbortError';

test('old workflow cannot retry after a different user action starts a fresh session', async () => {
  beginAiCommunication();
  const operation=captureAiOperation();let calls=0;
  const oldCall=operation.bind(async()=>{calls++;return 'accepted';});
  assert.equal(await oldCall(),'accepted');
  stopAiCommunication();beginAiCommunication();
  await assert.rejects(oldCall(),abortError);
  assert.throws(operation.check,abortError);
  assert.equal(calls,1);
  assert.equal(await captureAiOperation().bind(async()=> 'new session')(),'new session');
});

for (const key of [geminiKey, openaiKey]) {
  test(`${key.startsWith('sk-') ? 'OpenAI' : 'Gemini'} stop interrupts thinking and blocks fallback, late responses and queued calls`, {timeout:1500}, async () => {
    beginAiCommunication();
    const original = globalThis.fetch;
    let calls = 0, signal, complete;
    globalThis.fetch = async (_url, init) => {
      calls++; signal = init.signal;
      return new Promise(resolve => { complete = resolve; });
    };
    try {
      const waiting = Gt(key, 'gemini-test', 'draft',null,{openAiResponsesBetaAllowed:false});
      await new Promise(resolve=>setImmediate(resolve));
      stopAiCommunication();
      await assert.rejects(waiting, abortError);
      assert.equal(signal.aborted, true);
      complete({ok:true,json:async()=>({candidates:[{content:{parts:[{text:'late'}]}}],choices:[{message:{content:'late'},finish_reason:'stop'}]})});
      await Promise.resolve();
      for (const call of [() => Gt(key,'gemini-test','retry'), () => Gd(key,'image','base64','image/png'), () => lf(key,'images',[])]) {
        await assert.rejects(call(), abortError);
      }
      assert.equal(calls, 1);
      assert.equal(getAiCommunicationState().active, 0);
    } finally { globalThis.fetch = original; beginAiCommunication(); }
  });

  test(`${key.startsWith('sk-') ? 'OpenAI' : 'Gemini'} streaming stop suppresses late chunks and permits a fresh normal request`, {timeout:1500}, async () => {
    beginAiCommunication();
    const original = globalThis.fetch;
    let controller;
    const chunks = [];
    const encode = text => new TextEncoder().encode(key.startsWith('sk-')
      ? `data: ${JSON.stringify({choices:[{delta:{content:text}}]})}\n\n`
      : `data: ${JSON.stringify({candidates:[{content:{parts:[{text}]}}]})}\n\n`);
    globalThis.fetch = async () => ({ok:true,body:new ReadableStream({start(c){controller=c;}})});
    try {
      const pending = yt(key,'gemini-test','draft', chunk=>chunks.push(chunk.text),null,{openAiResponsesBetaAllowed:false});
      await new Promise(resolve=>setImmediate(resolve));
      controller.enqueue(encode('first'));
      await new Promise(resolve=>setImmediate(resolve));
      assert.deepEqual(chunks, ['first']);
      stopAiCommunication();
      await assert.rejects(pending, abortError);
      controller.enqueue(encode('late')); controller.close();
      await new Promise(resolve=>setImmediate(resolve));
      assert.deepEqual(chunks, ['first']);
      beginAiCommunication();
      globalThis.fetch = async () => ({ok:true,json:async()=>({candidates:[{content:{parts:[{text:'normal'}]}}],choices:[{message:{content:'normal'},finish_reason:'stop'}]})});
      assert.equal((await Gt(key,'gemini-test','new draft',null,{openAiResponsesBetaAllowed:false})).text,'normal');
    } finally { globalThis.fetch=original; beginAiCommunication(); }
  });
}

test('default OpenAI Responses route stops during thought and never falls back to another model or Chat', {timeout:1500}, async () => {
  beginAiCommunication();
  const original = globalThis.fetch;
  let calls=0, signal, fail;
  globalThis.fetch=async (url,init)=> {
    assert.match(String(url), /\/v1\/responses$/);
    calls++; signal=init.signal;
    return new Promise((_,reject)=>{fail=reject;});
  };
  try {
    const pending=Gt(openaiKey,'ignored','review');
    await new Promise(resolve=>setImmediate(resolve));
    stopAiCommunication();
    await assert.rejects(pending,abortError);
    assert.equal(signal.aborted,true);
    fail(new Error('HTTP 429 late failure'));
    await new Promise(resolve=>setImmediate(resolve));
    assert.equal(calls,1);
  } finally {globalThis.fetch=original;beginAiCommunication();}
});

for (const key of [geminiKey,openaiKey]) {
  test(`${key.startsWith('sk-')?'OpenAI':'Gemini'} image analysis forwards stop and blocks image fallback`,{timeout:1500},async()=>{
    beginAiCommunication();
    const original=globalThis.fetch;
    let calls=0, signal, fail;
    globalThis.fetch=async (_url,init)=>{calls++;signal=init.signal;return new Promise((_,reject)=>{fail=reject;});};
    try {
      const pending=Gd(key,'describe image','base64','image/png');
      await new Promise(resolve=>setImmediate(resolve));
      stopAiCommunication();await assert.rejects(pending,abortError);
      assert.equal(signal.aborted,true);fail(new Error('late failure'));
      await new Promise(resolve=>setImmediate(resolve));assert.equal(calls,1);
      beginAiCommunication();
      globalThis.fetch=async()=>({ok:true,json:async()=>({candidates:[{content:{parts:[{text:'image result'}]}}],choices:[{message:{content:'image result'},finish_reason:'stop'}]})});
      assert.equal((await Gd(key,'different image','base64','image/png')).text,'image result');
    }finally{globalThis.fetch=original;beginAiCommunication();}
  });
}
