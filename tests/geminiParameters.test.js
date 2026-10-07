import test from 'node:test';
import assert from 'node:assert/strict';
import {tf, nf, af, zs} from '../src/providerClients.js';
import {callGenerativeAI, callGenerativeAIVision, callGenerativeAIMultimodal, callGenerativeAIStream} from '../src/api.js';

const key = 'test-only';
const result = {candidates:[{content:{parts:[{text:'completed'}]},finishReason:'STOP'}]};
const assertConfig = body => {
  const config = body.generationConfig || {};
  for (const field of ['temperature','topP','top_p','topK','top_k','thinkingBudget','thinking_budget']) {
    assert.equal(Object.hasOwn(config, field), false, field);
    assert.equal(Object.hasOwn(config.thinkingConfig || {}, field), false, field);
  }
  assert.ok(body.contents.length);
};

test('both Gemini clients preserve text, vision, multimodal and stream output without deprecated parameters', async () => {
  const saved = globalThis.fetch;
  const options = {temperature:0.1,responseMimeType:'application/json',maxTokens:8192};
  const calls = [
    () => tf(key,'gemini-3.8-flash','story',options),
    () => nf(key,'gemini-3.8-flash','describe','aGVsbG8=','image/png',options),
    () => af(key,'gemini-3.8-flash','describe',[{base64:'aGVsbG8=',mimeType:'image/png'}],options),
    () => zs(key,'gemini-3.8-flash','story',()=>{},options),
    () => callGenerativeAI(key,'gemini-3.8-flash','story',null,options),
    () => callGenerativeAIVision(key,'describe','aGVsbG8=','image/png',null,options),
    () => callGenerativeAIMultimodal(key,'describe',[{base64:'aGVsbG8=',mimeType:'image/png'}],null,options),
    () => callGenerativeAIStream(key,'gemini-3.8-flash','story',()=>{},null,options),
  ];
  const requests=[];
  globalThis.fetch=async (url,init) => {
    requests.push(JSON.parse(init.body));
    return new Response(String(url).includes('streamGenerateContent') ? `data: ${JSON.stringify(result)}\n\n` : JSON.stringify(result));
  };
  try {
    for (const call of calls) await call();
    assert.equal(requests.length,calls.length);
    for (const body of requests) {assertConfig(body);assert.equal(body.generationConfig.responseMimeType,'application/json');}
  } finally {globalThis.fetch=saved;}
});

test('public-mode booster and short-output rewrite do not restore deprecated Gemini fields', async () => {
  const savedWindow=globalThis.window, savedDocument=globalThis.document;
  const requests=[];
  globalThis.document={querySelector:()=>({dataset:{v:'short_short'}}),getElementById:()=>null,documentElement:{dataset:{}}};
  globalThis.window={fetch:async (url,init) => {
    requests.push(JSON.parse(init.body));
    return new Response(String(url).includes('streamGenerateContent') ? `data: ${JSON.stringify(result)}\n\n` : JSON.stringify(result),{headers:{'Content-Type':'text/event-stream'}});
  }};
  try {
    await import('../src/qualityBoost.js');
    await window.fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:streamGenerateContent?alt=sse',{
      body:JSON.stringify({contents:[{parts:[{text:'短編小説を書いてください。'}]}],generationConfig:{maxOutputTokens:12000}}),
    });
    assert.ok(requests.length>=2,'the real short-output rewrite path must execute');
    for(const body of requests) assertConfig(body);
  } finally {globalThis.window=savedWindow;globalThis.document=savedDocument;}
});
