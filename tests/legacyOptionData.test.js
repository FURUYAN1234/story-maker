import assert from 'node:assert/strict';
import {
  At,
  Dd,
  Et,
  Fd,
  Hg,
  Ja,
  Qg,
  Qa,
  Un,
  Wa,
  We,
  Xa,
  Xg,
  Ya,
  Yg,
  Za,
  Zg,
  ef,
  es,
  Jg,
  qg,
  ts,
  Ug,
  Wg,
  za,
  zg,
} from '../src/legacyOptionData.js';

assert.equal(We.length, 16);
assert.deepEqual(
  We.map(mode => mode.value),
  ['4koma', '4koma_scenario', 'short_short', 'novel', 'medium', 'long_10000', 'long', 'scenario', 'manga', 'essay', 'poem', 'fairy', 'letter', 'diary', 'documentary', 'radio'],
);
assert.equal(We.find(mode => mode.value === 'long_10000')?.label, '長編（10000字～）');
assert.equal(We.find(mode => mode.value === 'short_short')?.label, 'ショート（1500字～）');
assert.equal(We.find(mode => mode.value === 'long')?.label, '長編小説(数万字/全章＋指示書)');

assert.ok(Un['日常・生活'].includes('コンビニ'));
assert.ok(Ja['コメディ'].includes('ギャグ'));
assert.ok(Wa['現代日本'].includes('東京'));
assert.ok(za['全年齢'].includes('子供向け'));
assert.ok(Za['現代'].includes('2020年代'));
assert.ok(Ya['ハッピーエンド'].includes('大団円'));
assert.ok(Xa['一人称'].includes('「僕」の視点'));

for (const list of [At, Et, Qa, es, ts, Ug, Fd, Dd, qg, Hg, Jg, Wg, zg, Zg, Yg, Xg, Qg, ef]) {
  assert.ok(Array.isArray(list));
  assert.ok(list.length > 0);
}

console.log('legacyOptionData tests passed');
