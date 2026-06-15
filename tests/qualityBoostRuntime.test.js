import assert from 'node:assert/strict';

const loopParagraphs = `
繧｢繧ｫ繝ｪ縺ｯ縲・ｧ・燕縺ｫ蟆上＆縺ｪ蝟ｫ闌ｶ蠎励ｒ髢九＞縺溘ょｽｼ螂ｳ縺ｮ蠎励・逕ｺ縺ｮ莠ｺ縲・↓諢帙＆繧後∫曝縺・ｦ吶ｊ縺ｨ隨鷹｡斐〒貅縺｡縺ｦ縺・◆縲ゅい繧ｫ繝ｪ縺ｯ蠢・°繧牙ｹｸ縺帙ｒ諢溘§縺ｦ縺・◆縲・
繝偵き繝ｪ縺ｯ縲・・蝨溯ｳ・侭鬢ｨ縺ｮ遐皮ｩｶ蜩｡縺ｨ縺励※蜒阪￥蛯阪ｉ縲∝商縺・ｧ・・險倬鹸繧呈紛逅・＠縺ｦ縺・◆縲ょｽｼ螂ｳ縺ｮ遏･隴倥・逧・°繧我ｿ｡鬆ｼ縺輔ｌ縲∫ｩ上ｄ縺九↑譌･縲・′邯壹＞縺ｦ縺・◆縲・
繝ｪ繝ｳ縺ｯ縲∝商譖ｸ蠎励・蠎嶺ｸｻ縺ｨ縺励※蟄蝉ｾ帙◆縺｡縺ｫ諢帙＆繧後※縺・◆縲ょｽｼ螂ｳ縺ｯ譁ｰ縺励＞迚ｩ隱槭ｒ隕九▽縺代ｋ縺溘・縲∵ｸｩ縺九↑隨鷹｡斐ｒ豬ｮ縺九∋縺ｦ縺・◆縲・
繧ｵ繧ｨ繧ｳ縺ｯ縲∫伴縺ｮ螳牙・繧貞ｮ医ｋ髫企聞縺ｨ縺励※隕丞ｾ九ｒ驥阪ｓ縺倥∽ｽ乗ｰ代°繧我ｿ｡鬆ｼ縺輔ｌ縺ｦ縺・◆縲ょｽｼ螂ｳ縺ｮ莠ｺ逕溘・遒ｺ縺九↓霈昴″蟋九ａ縺ｦ縺・◆縲・
繝溘け縺ｯ縲・ｧ・燕縺ｮ譛埼｣ｾ蠎励〒蜒阪￥蛯阪ｉ縲∫伴縺ｫ譁ｰ縺励＞豬∬｡後ｒ驕九ｓ縺縲ゆｻｲ髢薙◆縺｡縺ｮ貂ｩ縺九＆縺ｫ蛹・∪繧後∝ｿ・°繧画ｺ縺溘＆繧後※縺・◆縲・`;

function deterministicText(length) {
  let seed = 123456789;
  let output = '';
  while (output.length < length) {
    seed = (seed * 1103515245 + 12345) >>> 0;
    output += String.fromCharCode(0x3041 + (seed % 80));
  }
  return output;
}

function sseResponse(text) {
  const encoder = new TextEncoder();
  const chunks = String(text || '').match(/[\s\S]{1,240}/g) || [''];
  return new Response(new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`));
      }
      controller.enqueue(encoder.encode('data: [DONE]\n\n'));
      controller.close();
    },
  }), {
    status: 200,
    headers: { 'content-type': 'text/event-stream' },
  });
}

const calls = [];
const loopText = `${loopParagraphs}\n\n${loopParagraphs}\n\n${loopParagraphs}\n\n${loopParagraphs}\n\n${loopParagraphs}\n\n${loopParagraphs}`;
let rewrittenText = `繧ｿ繧､繝医Ν: REWRITTEN_START

隨ｬ1遽

${deterministicText(2100)}

隨ｬ2遽

${deterministicText(2100)}

隨ｬ3遽

${deterministicText(2200)}

REWRITTEN_END`;

globalThis.document = {
  documentElement: { dataset: {} },
  querySelector(selector) {
    if (selector === '#mode-chips button.active') {
      return { dataset: { v: 'medium' }, textContent: 'medium' };
    }
    return null;
  },
  getElementById(id) {
    if (id === 'mode-custom') return { value: 'medium' };
    return null;
  },
};

globalThis.window = {
  fetch: async (input, init = {}) => {
    const body = typeof init.body === 'string' ? JSON.parse(init.body) : {};
    calls.push({ input: String(input), body });
    if (body.stream === true) return sseResponse(loopText);
    return new Response(JSON.stringify({
      choices: [{ message: { content: rewrittenText } }],
    }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  },
};

await import(`../src/qualityBoost.js?runtime=${Date.now()}`);

const response = await window.fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4.1',
    stream: true,
    messages: [{ role: 'user', content: 'mode: medium\nWrite a medium story.' }],
  }),
});
const streamed = await response.text();

assert.ok(calls.length >= 2, 'expected initial stream request plus rewrite request');
assert.equal(calls[0].body.stream, true);
assert.equal(calls.some(call => call.body.stream === false), true, 'expected semantic loop to trigger rewrite request');
assert.match(streamed, /REWRITTEN_START/);
assert.match(streamed, /【完】/, 'expected synthetic stream to include the internal completion marker');
assert.match(streamed, /data: \[DONE\]/, 'expected OpenAI synthetic stream to close with DONE');
assert.match(document.documentElement.dataset.smkQualityRewrite, /^medium:/);

calls.length = 0;
rewrittenText = `TOO_SHORT_START\n${deterministicText(1800)}\nTOO_SHORT_END`;
const shortResponse = await window.fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    model: 'gpt-4.1',
    stream: true,
    messages: [{ role: 'user', content: 'mode: medium\nWrite a medium story.' }],
  }),
});
const shortStreamed = await shortResponse.text();
assert.ok(calls.filter(call => call.body.stream === false).length >= 3, 'expected three rewrite attempts before falling back to continuation');
assert.match(shortStreamed, /TOO_SHORT_START/);
assert.match(shortStreamed, /【完】/, 'under-length synthetic stream must still stop legacy continuation');
assert.doesNotMatch(document.documentElement.dataset.smkQualityRewrite, /^medium:\d+$/);

console.log('qualityBoost runtime rewrite test passed');
