import assert from 'node:assert/strict';
import { Jo } from '../src/promptBuilder.js';

const short = Jo({
  mode: 'short_short',
  genre: 'ミステリー',
  theme: '異世界転生',
  worldview: 'ハイファンタジー',
  era: '江戸時代',
  target: '全年齢',
  ending: '意外な結末',
  narration: '三人称・客観',
  charCount: 1500,
  characters: [
    {
      name: '葵',
      sex: '女性',
      role: '主人公',
      personality: '慎重',
      note: '侍の末裔',
    },
  ],
  universalAssets: [{ name: 'reference.png' }],
});

assert.match(short.prompt, /あなたはプロの書き手です/);
assert.match(short.prompt, /【文体指定：ショートショート】/);
assert.match(short.prompt, /【時代考証ルール（厳守）】/);
assert.match(short.prompt, /江戸時代の生活知識/);
assert.match(short.prompt, /ミステリーの構成知識/);
assert.ok(short.tags.includes('ミステリー'));
assert.ok(short.tags.includes('江戸時代'));
assert.ok(short.tags.includes('ショートショート'));
assert.ok(short.tags.includes('1500字'));
assert.ok(short.tags.includes('📚RAG'));
assert.ok(short.tags.includes('🖼️アセット(1)'));

const letter = Jo({
  mode: 'letter',
  genre: '恋愛・青春',
  theme: '雨の日',
  era: '現代',
  characters: [],
});

assert.match(letter.prompt, /【文体指定：手紙・書簡体】/);
assert.doesNotMatch(letter.prompt, /【時代考証ルール（厳守）】/);

const fourKomaScenario = Jo({
  mode: '4koma_scenario',
  genre: 'コメディ',
  theme: '朝の忘れ物',
  era: '現代',
  characters: [{ name: 'ミナ', role: '主人公', personality: 'せっかち' }],
});

assert.match(fourKomaScenario.prompt, /Topic:/);
assert.match(fourKomaScenario.prompt, /\[1コマ目\]/);
assert.match(fourKomaScenario.prompt, /状況: \[視覚的な状況/);
assert.match(fourKomaScenario.prompt, /セリフ: キャラ名「セリフ」/);
assert.match(fourKomaScenario.prompt, /キャラ名「短いセリフ。」/);
assert.match(fourKomaScenario.prompt, /セリフなし/);
assert.match(fourKomaScenario.prompt, /台詞なし/);
assert.match(fourKomaScenario.prompt, /Scenario: の直後は必ず \[1コマ目\]/);
assert.ok(fourKomaScenario.tags.includes('AI 4koma シナリオ'));

console.log('promptBuilder tests passed');
