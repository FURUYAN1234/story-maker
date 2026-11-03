import test from 'node:test';
import assert from 'node:assert/strict';
import { GEMINI_MODEL_VALUES } from '../src/data.js';
import { validateBilingualReleaseNotes } from '../scripts/releaseGate.mjs';
import { defaultModelForKey } from '../src/apiKeyHelpers.js';
import { readFileSync } from 'node:fs';

test('normal UI, editorial review and brush-up derive Gemini defaults from the catalog',()=>{
  assert.equal(defaultModelForKey('gemini-test-only'),GEMINI_MODEL_VALUES[0]);
  for(const file of ['apiKeyHelpers.js','longifyBeta.js','publicRuntime.js']){
    const source=readFileSync(new URL(`../src/${file}`,import.meta.url),'utf8');
    assert.match(source,/GEMINI_MODEL_VALUES\[0\]/);
    assert.doesNotMatch(source,/['"]gemini-(?:2\.5-(?:flash|pro)|3\.5-flash|(?:flash|pro)-latest)['"]/);
  }
});

test('release notes accept paired translations and reject missing translation or wrong version', () => {
  const valid='# Story Maker v5.4.6\n\n## Changes / 更新内容\n\n- [models] Update stable models. / 現行モデルへ更新。\n';
  assert.deepEqual(validateBilingualReleaseNotes(valid,'5.4.6'),[]);
  assert.ok(validateBilingualReleaseNotes(valid.replace(' / 現行モデルへ更新。',''),'5.4.6').length);
  assert.ok(validateBilingualReleaseNotes(valid,'5.4.5').length);
});
import {tf, nf, af, zs} from '../src/providerClients.js';
import {callGenerativeAI, callGenerativeAIVision, callGenerativeAIMultimodal, callGenerativeAIStream} from '../src/api.js';

const key = 'test-only';
test('current Gemini catalog excludes December redirects and remains usable after fallback', async () => {
  const expected = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
  assert.deepEqual(GEMINI_MODEL_VALUES, expected);
  const saved = globalThis.fetch, attempted = [];
  globalThis.fetch = async (url) => {
    attempted.push(String(url).match(/models\/([^:]+):/)[1]);
    return attempted.length < expected.length
      ? new Response(JSON.stringify({error:{message:'model unavailable'}}), {status:404})
      : new Response(JSON.stringify(result));
  };
  try {
    const output = await callGenerativeAIVision(key, 'describe', 'aGVsbG8=', 'image/png');
    assert.equal(output.usedModel, expected.at(-1));
    assert.deepEqual(attempted, expected);
  } finally { globalThis.fetch = saved; }
});
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
