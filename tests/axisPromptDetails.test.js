import assert from 'node:assert/strict';
import { Hd, Jd, Kd, Ud, pt, qd } from '../src/axisPromptDetails.js';

assert.match(pt('コメディ', Kd), /ズレ/);
assert.match(pt('ハッピーエンド', Ud), /前向き/);
assert.match(pt('現代日本', qd), /現代日本/);
assert.match(pt('全年齢', Hd), /全年齢/);
assert.match(pt('一人称', Jd), /主人公/);

assert.equal(pt('', Kd), '');
assert.equal(pt('ランダム', Kd), '');
assert.equal(pt('存在しない項目', Kd), '');

for (const dictionary of [Kd, Ud, qd, Hd, Jd]) {
  assert.equal(typeof dictionary, 'object');
  assert.ok(Object.keys(dictionary).length > 0);
}

console.log('axisPromptDetails tests passed');
