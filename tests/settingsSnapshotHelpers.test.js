import assert from 'node:assert/strict';
import {
  buildGenerationSettingsSnapshot,
  formatAxisDetail,
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

console.log('settingsSnapshotHelpers tests passed');

