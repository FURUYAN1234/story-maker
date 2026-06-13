import assert from 'node:assert/strict';
import { Af, Mf, Of, _f, xf, ya } from '../src/styleAnalyzerHelpers.js';

const style = {
  style_name: '湿った余白の文体',
  tone: '静かだが不穏',
  narrative_voice: {
    person: '三人称',
    distance: '近距離',
    reliability: '信頼できる語り手',
    intrusion: '透明',
  },
  sentence_style: {
    avg_length: '中文',
    length_variation: 'やや変化',
    ending_patterns: 'だ。/体言止め',
  },
  rhetoric: {
    metaphor_source: '雨、金属、体温',
  },
  unique_features: ['湿度のある比喩', '沈黙を長く置く'],
  anti_patterns: ['説明的な総括'],
  reproduction_prompt: 'この再現指示はリライトプロンプトへ混ぜない',
};

const formatted = xf(style);
assert.match(formatted, /【作風名】湿った余白の文体/);
assert.match(formatted, /・人称: 三人称/);
assert.match(formatted, /・比喩素材: 雨、金属、体温/);
assert.match(formatted, /説明的な総括/);
assert.doesNotMatch(formatted, /この再現指示/);

const rewritePrompt = Af(style, 'タイトル\n\n本文です。');
assert.match(rewritePrompt, /元のテキストは11字です/);
assert.match(rewritePrompt, /8字〜14字/);
assert.match(rewritePrompt, /湿った余白の文体/);
assert.match(rewritePrompt, /本文です。/);
assert.doesNotMatch(rewritePrompt, /この再現指示/);

assert.equal(Mf('prefix {"ok": true} suffix'), '{"ok": true}');
assert.equal(Mf('no json'), null);
assert.match(_f('{"note":"一行目\n二行目"}'), /一行目\\n二行目/);

const originalWarn = console.warn;
console.warn = () => {};
let repaired;
try {
  repaired = ya(`{
    // comment
    "style_name": "粗い文体",
    "unique_features": ["短文",],
  }`);
} finally {
  console.warn = originalWarn;
}
assert.equal(repaired.style_name, '粗い文体');
assert.deepEqual(repaired.unique_features, ['短文']);

const keyBoundary = Of(`{
  "style_name": "境界修復",
  "tone": "硬い",
  "unique_features": ["一つ", "二つ"],
  "anti_patterns": ["説明過多"]
}`);
assert.equal(keyBoundary.style_name, '境界修復');
assert.deepEqual(keyBoundary.anti_patterns, ['説明過多']);

console.log('styleAnalyzerHelpers tests passed');
