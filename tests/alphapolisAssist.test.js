import assert from 'node:assert/strict';
import {
  buildAlphapolisPreview,
  formatAlphapolisPreview,
  getAlphapolisCopyValue,
  renderAlphapolisPreview,
} from '../src/alphapolisAssist.js';

const story = `タイトル: 星の書庫と約束の地図

第1章　古い書庫
ミナは雨上がりの駅前通りを抜け、祖父が遺した小さな書庫へ入った。棚の奥から青い封筒が落ち、古い地図と一枚の鍵が現れる。彼女はその地図が町の地下水路を示していることに気づき、閉館後の図書館へ向かう決意を固めた。

第2章　灯台へ向かう約束
翌朝、ミナは幼なじみの遥に地図を見せた。二人は喫茶店の窓際で印を照らし合わせ、灯台の下にある古い扉へ行く約束をする。遥は冗談めかして笑ったが、鍵の刻印を見た瞬間、表情を静かに変えた。

Created By AI Story Maker V5.1.4`;

const preview = buildAlphapolisPreview({
  storyText: story,
  settings: {
    genre: 'ファンタジー',
    theme: '古い地図',
    worldview: '港町',
    target: '一般向け',
  },
});

assert.equal(preview.title, '星の書庫と約束の地図');
assert.ok(Array.from(preview.title).length <= 70);
assert.ok(Array.from(preview.introduction).length <= 1200);
assert.equal(preview.hotGenre, 'ファンタジー');
assert.equal(preview.category, 'ファンタジー');
assert.equal(preview.lengthKind, '短編');
assert.equal(preview.writingStatus, '連載中');
assert.equal(preview.rating, 'なし');
assert.ok(preview.tags.length <= 10);
assert.ok(preview.tags.includes('ファンタジー'));
for (const tag of preview.tags) {
  assert.ok(Array.from(tag).length <= 20, tag);
}
assert.equal(preview.episodes.length, 2);
assert.equal(preview.episodes[0].sectionName, '第1章 古い書庫');
assert.equal(preview.episodes[0].episodeTitle, '第1章 古い書庫');
assert.match(preview.episodes[0].body, /ミナは雨上がり/);
assert.equal(preview.episodes[1].sectionName, '第2章 灯台へ向かう約束');
assert.match(preview.episodes[1].body, /幼なじみの遥/);
assert.equal(preview.body.includes('タイトル:'), false);
assert.equal(preview.body.includes('Created By'), false);

assert.equal(getAlphapolisCopyValue(preview, 'title'), preview.title);
assert.equal(getAlphapolisCopyValue(preview, 'tags'), preview.tags.join('\n'));
assert.equal(getAlphapolisCopyValue(preview, 'episodeTitle', { episodeIndex: 0 }), preview.episodes[0].episodeTitle);
assert.equal(getAlphapolisCopyValue(preview, 'sectionName', { episodeIndex: 0 }), preview.episodes[0].sectionName);
assert.equal(getAlphapolisCopyValue(preview, 'episodeBody', { episodeIndex: 0 }), preview.episodes[0].body);

const formatted = formatAlphapolisPreview(preview);
assert.match(formatted, /アルファポリス作品情報/);
assert.match(formatted, /章の設定: 第1章 古い書庫/);
assert.match(formatted, /話タイトル: 第2章 灯台へ向かう約束/);
assert.equal(formatted.includes('Created By'), false);

const html = renderAlphapolisPreview(preview);
assert.match(html, /Alphapolis Form Preview/);
assert.match(html, /data-copy-kind="sectionName"/);
assert.match(html, /data-copy-kind="episodeTitle"/);
assert.match(html, /data-copy-kind="episodeBody"/);
assert.match(html, /HOTランキング用ジャンル/);

console.log('alphapolisAssist tests passed');
