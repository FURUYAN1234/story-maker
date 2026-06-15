import assert from 'node:assert/strict';
import {
  buildGenerationSettingsExport,
  buildGenerationSettingsSnapshot,
  formatAxisDetail,
  parseGenerationSettingsExport,
} from '../src/settingsSnapshotHelpers.js';

assert.equal(formatAxisDetail({ category: '日常', value: 'コンビニ', customValue: '' }), '日常 / コンビニ');
assert.equal(formatAxisDetail({ category: '日常', value: '日常', customValue: '' }), '日常');
assert.equal(formatAxisDetail({ category: '', value: 'コンビニ', customValue: '' }), 'コンビニ');
assert.equal(formatAxisDetail({ category: '日常', value: '', customValue: '駅前' }), '日常 / 駅前');
assert.equal(formatAxisDetail({ category: '', value: '', customValue: '' }), '');

const characters = [{ name: '陽子' }];
const universalAssets = [{ id: 'asset-1' }];
const snapshot = buildGenerationSettingsSnapshot(
  { mode: 'novel', characters, universalAssets },
  {
    modeCustom: '短編小説',
    supplement: '雨の日',
    axes: {
      theme: '日常 / コンビニ',
      genre: 'ミステリー',
      worldview: '現代日本',
      target: '大人向け',
      era: '2020年代',
      ending: '意外な結末',
      narr: '三人称',
    },
  },
);

assert.equal(snapshot.mode, 'novel');
assert.equal(snapshot.modeCustom, '短編小説');
assert.equal(snapshot.theme, '日常 / コンビニ');
assert.equal(snapshot.themeCustom, '日常 / コンビニ');
assert.equal(snapshot.narration, '三人称');
assert.equal(snapshot.narrCustom, '三人称');
assert.equal(snapshot.charCount, null);
assert.equal(snapshot.supplement, '雨の日');
assert.equal(snapshot.characters, characters);
assert.equal(snapshot.universalAssets, universalAssets);

const exported = buildGenerationSettingsExport(
  {
    mode: 'medium',
    modeSource: 'selected',
    characters: [{ name: '陽子', sex: '女性', role: '探偵', personality: '慎重', note: '雨が苦手' }],
    locked: { mode: true, theme: false, apiKey: true },
    universalAssets: [{ type: 'text', name: '参考メモ', content: '商店街の夜', token: 'secret' }],
    apiKey: 'secret-key',
    openaiKey: 'secret-openai',
  },
  {
    version: 'v5.0.8',
    modeCustom: '中編小説',
    supplement: '最後に余韻を残す',
    axesDetailed: {
      theme: { category: '日常', value: 'コンビニ', customValue: '', source: 'selectedDetail' },
      genre: { category: 'ミステリー', value: '', customValue: '日常ミステリー', source: 'manual' },
    },
  },
  new Date('2026-06-13T09:08:07+09:00'),
);

assert.equal(exported.schema, 'story-maker-generation-settings-v1');
assert.equal(exported.settings.mode, 'medium');
assert.equal(exported.settings.modeCustom, '中編小説');
assert.equal(exported.settings.axes.theme.value, 'コンビニ');
assert.equal(exported.settings.characters[0].name, '陽子');
assert.equal(exported.settings.locked.mode, true);
assert.equal(Object.prototype.hasOwnProperty.call(exported.settings.locked, 'apiKey'), false);
assert.equal(JSON.stringify(exported).includes('secret-key'), false);
assert.equal(JSON.stringify(exported).includes('secret-openai'), false);

const parsed = parseGenerationSettingsExport(JSON.stringify(exported));
assert.deepEqual(parsed.settings.axes.theme, exported.settings.axes.theme);
assert.equal(parsed.settings.universalAssets[0].name, '参考メモ');
assert.throws(() => parseGenerationSettingsExport('{"schema":"wrong"}'), /Story Maker/);

console.log('settingsSnapshotHelpers tests passed');
