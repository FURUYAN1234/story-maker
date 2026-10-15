import test from 'node:test';
import assert from 'node:assert/strict';
import {callGenerativeAIVision,callGenerativeAIMultimodal} from '../src/api.js';
import {rf,lf} from '../src/providerClients.js';
import {setSelectedOpenAIModelId,resetSelectedOpenAIModelId} from '../src/openAiModelCatalog.js';

test('single and multiple image analysis use maintained models and compatible token parameters',async()=>{
 const original=globalThis.fetch;const calls=[];
 globalThis.fetch=async(_url,options)=>{calls.push(JSON.parse(options.body));return new Response(JSON.stringify({choices:[{finish_reason:'stop',message:{content:'画像の解析結果'}}]}));};
 try{
  setSelectedOpenAIModelId('gpt-6-luna');
  await callGenerativeAIVision('sk-test-only','画像を解析','AA==','image/png');
  await callGenerativeAIMultimodal('sk-test-only','画像を比較',[{base64:'AA==',mimeType:'image/png'}]);
  await rf('sk-test-only','画像を解析','AA==','image/png');
  await lf('sk-test-only','画像を比較',[{base64:'AA==',mimeType:'image/png'}]);
  assert.equal(calls.length,4);
  for(const request of calls){
   assert.equal(request.model,'gpt-6-luna');
   assert.equal(request.max_completion_tokens,32768);
   assert.ok(!('temperature' in request) && !('max_tokens' in request));
   assert.ok(request.messages[0].content.some(part=>part.type==='image_url'));
  }
  globalThis.fetch=async()=>{calls.push('incomplete');return new Response(JSON.stringify({choices:[{finish_reason:'length',message:{content:'途中'}}]}));};
  await assert.rejects(()=>callGenerativeAIVision('sk-test-only','観察','AA==','image/png'),/incomplete/);
  await assert.rejects(()=>rf('sk-test-only','観察','AA==','image/png'),/incomplete/);
  assert.equal(calls.length,6,'incomplete results cannot trigger charged fallbacks');
 }finally{globalThis.fetch=original;resetSelectedOpenAIModelId();}
});
