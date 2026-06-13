import assert from 'node:assert/strict';

import { rt } from '../src/longSettingsFormatter.js';

const defaults = rt({});

assert.equal(defaults.genre, 'コメディ');
assert.equal(defaults.theme, '選択');
assert.equal(defaults.worldview, '現代日本');
assert.equal(defaults.era, '現代');
assert.equal(defaults.target, '全年齢');
assert.equal(defaults.ending, '意外な結末');
assert.equal(defaults.narr, '三人称・客観');
assert.match(defaults.charDesc, /AI設計キャスト/);
assert.equal(defaults.supplement, '');
assert.equal(defaults.eraRule, '');
assert.match(defaults.allCategoryGuides, /ジャンル文体指定：コメディ/);
assert.match(defaults.allCategoryGuides, /ターゲット層文体指定：全年齢/);
assert.match(defaults.chapterGuidance, /各章本文は最低6千字/);

const custom = rt({
  genre: 'ミステリー',
  theme: '雨の日',
  worldview: 'ハイファンタジー',
  era: '江戸時代',
  target: '大人向け',
  ending: 'どんでん返し',
  narration: '一人称',
  charCount: 64000,
  supplement: '余韻を重く',
  characters: [
    {
      name: '葵',
      role: '主人公',
      sex: '女性',
      personality: '慎重',
      note: '侍の末裔',
    },
  ],
});

assert.match(custom.charDesc, /葵 \(主人公\)/);
assert.match(custom.charDesc, /侍の末裔/);
assert.match(custom.characterRosterRule, /長編人物ロスター運用ルール/);
assert.match(custom.supplement, /余韻を重く/);
assert.match(custom.eraRule, /江戸時代/);
assert.match(custom.allCategoryGuides, /結末演出指定：どんでん返し/);
assert.match(custom.allCategoryGuides, /世界観演出指定：ハイファンタジー/);
assert.match(custom.allCategoryGuides, /ターゲット層文体指定：大人向け/);
assert.match(custom.allCategoryGuides, /語り口指定：一人称/);
assert.match(custom.chapterGuidance, /全8章構成/);
assert.match(custom.chapterGuidance, /各章本文は最低4,800字/);

