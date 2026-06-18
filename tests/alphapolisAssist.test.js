import assert from 'node:assert/strict';
import {
  ALPHAPOLIS_CATEGORY_OPTIONS,
  ALPHAPOLIS_CHAPTER_SETTING_OPTIONS,
  ALPHAPOLIS_HOT_RANKING_OPTIONS,
  ALPHAPOLIS_LENGTH_OPTIONS,
  ALPHAPOLIS_RATING_OPTIONS,
  ALPHAPOLIS_STATUS_OPTIONS,
  buildAlphapolisPreview,
  formatAlphapolisPreview,
  getAlphapolisCopyValue,
  renderAlphapolisPreview,
} from '../src/alphapolisAssist.js';

const chapteredStory = `タイトル: 星の書庫と約束の地図

第1章　古い書庫
ミナは雨上がりの駅前通りを抜け、祖父が遺した小さな書庫へ入った。棚の奥から青い封筒が落ち、古い地図と一枚の鍵が現れる。彼女はその地図が町の地下水路を示していることに気づき、閉館後の図書館へ向かう決意を固めた。

第2章　灯台へ向かう約束
翌朝、ミナは幼なじみの遥に地図を見せた。二人は喫茶店の窓際で印を照らし合わせ、灯台の下にある古い扉へ行く約束をする。遥は冗談めかして笑ったが、鍵の刻印を見た瞬間、表情を静かに変えた。

Created By AI Story Maker V5.1.6`;

const preview = buildAlphapolisPreview({
  storyText: chapteredStory,
  settings: {
    genre: 'ファンタジー',
    theme: '古い地図',
    worldview: '港町',
    target: '男性向け',
  },
});

assert.deepEqual(ALPHAPOLIS_HOT_RANKING_OPTIONS, ['未選択', '男性向け', '女性向け']);
assert.deepEqual(ALPHAPOLIS_LENGTH_OPTIONS, ['ショートショート', '短編', '長編']);
assert.deepEqual(ALPHAPOLIS_STATUS_OPTIONS, ['連載中', '完結']);
assert.deepEqual(ALPHAPOLIS_RATING_OPTIONS, ['なし', 'R15', 'R18']);
assert.deepEqual(ALPHAPOLIS_CHAPTER_SETTING_OPTIONS, ['設定しない', '新しい章を追加する']);
for (const category of [
  'カテゴリ選択',
  'ミステリー',
  'ホラー',
  'SF',
  'ファンタジー',
  '恋愛',
  'キャラ文芸',
  'ライト文芸',
  '青春',
  '現代文学',
  '大衆娯楽',
  '経済・企業',
  '歴史・時代',
  '児童書・童話',
  '絵本',
  'BL',
  'エッセイ・ノンフィクション',
]) {
  assert.ok(ALPHAPOLIS_CATEGORY_OPTIONS.includes(category), category);
}

assert.equal(preview.title, '星の書庫と約束の地図');
assert.ok(Array.from(preview.title).length <= 70);
assert.ok(Array.from(preview.introduction).length <= 1200);
assert.equal(preview.hotGenre, '男性向け');
assert.equal(preview.category, 'ファンタジー');
assert.equal(preview.lengthKind, '短編');
assert.equal(preview.writingStatus, '連載中');
assert.equal(preview.rating, 'なし');
assert.equal(preview.tags[0], 'AI生成作品');
assert.ok(preview.tags.includes('ファンタジー'));
assert.ok(preview.tags.length <= 10);
assert.ok(preview.guidelineChecks.some(item => item.includes('AI生成作品')));
assert.ok(preview.guidelineChecks.some(item => item.includes('二次創作')));
for (const tag of preview.tags) {
  assert.ok(Array.from(tag).length <= 20, tag);
}
assert.equal(preview.episodes.length, 2);
assert.equal(preview.episodes[0].chapterSetting, '新しい章を追加する');
assert.equal(preview.episodes[0].chapterName, '第1章 古い書庫');
assert.equal(preview.episodes[0].episodeTitle, '第1章 古い書庫');
assert.match(preview.episodes[0].body, /ミナは雨上がり/);
assert.equal(preview.episodes[1].chapterSetting, '新しい章を追加する');
assert.equal(preview.episodes[1].chapterName, '第2章 灯台へ向かう約束');
assert.match(preview.episodes[1].body, /幼なじみの遥/);
assert.equal(preview.body.includes('タイトル:'), false);
assert.equal(preview.body.includes('Created By'), false);

assert.equal(getAlphapolisCopyValue(preview, 'title'), preview.title);
assert.equal(getAlphapolisCopyValue(preview, 'tags'), preview.tags.join('\n'));
assert.equal(getAlphapolisCopyValue(preview, 'tag', { tagIndex: 0 }), 'AI生成作品');
assert.equal(getAlphapolisCopyValue(preview, 'chapterSetting', { episodeIndex: 0 }), '新しい章を追加する');
assert.equal(getAlphapolisCopyValue(preview, 'chapterName', { episodeIndex: 0 }), preview.episodes[0].chapterName);
assert.equal(getAlphapolisCopyValue(preview, 'episodeTitle', { episodeIndex: 0 }), preview.episodes[0].episodeTitle);
assert.equal(getAlphapolisCopyValue(preview, 'episodeBody', { episodeIndex: 0 }), preview.episodes[0].body);
assert.match(getAlphapolisCopyValue(preview, 'guidelineChecks'), /AI生成作品/);

const formatted = formatAlphapolisPreview(preview);
assert.match(formatted, /アルファポリス作品情報/);
assert.match(formatted, /HOTランキング用ジャンル: 男性向け/);
assert.match(formatted, /タグ:\n1\. AI生成作品/);
assert.match(formatted, /章の設定: 新しい章を追加する/);
assert.match(formatted, /新しい章名: 第1章 古い書庫/);
assert.match(formatted, /話のタイトル: 第2章 灯台へ向かう約束/);
assert.match(formatted, /投稿前チェック:/);
assert.equal(formatted.includes('Created By'), false);

const html = renderAlphapolisPreview(preview);
assert.match(html, /Alphapolis Form Preview/);
assert.match(html, /選択肢: 未選択 \/ 男性向け \/ 女性向け/);
assert.match(html, /data-copy-kind="tag"/);
assert.doesNotMatch(html, /data-copy-kind="chapterSetting"/);
assert.doesNotMatch(html, /data-copy-kind="chapterName"/);
assert.doesNotMatch(html, /data-copy-kind="guidelineChecks"/);
assert.match(html, /data-copy-kind="episodeTitle"/);
assert.match(html, /data-copy-kind="episodeBody"/);
assert.match(html, /投稿前チェック/);

const unchaptered = buildAlphapolisPreview({
  storyText: 'タイトル: 夕焼けの手紙\n短い物語だが、主人公は最後に大切な手紙を読み、家族と和解する。静かな余韻の中で物語は終わる。',
  settings: { genre: '恋愛', target: '女性向け' },
});
assert.equal(unchaptered.hotGenre, '女性向け');
assert.equal(unchaptered.category, '恋愛');
assert.equal(unchaptered.lengthKind, 'ショートショート');
assert.equal(unchaptered.writingStatus, '完結');
assert.equal(unchaptered.episodes[0].chapterSetting, '設定しない');
assert.equal(getAlphapolisCopyValue(unchaptered, 'chapterSetting', { episodeIndex: 0 }), '設定しない');

const violent = buildAlphapolisPreview({
  storyText: 'タイトル: 赤い廊下\n戦闘のあと、血に濡れた廊下で主人公は遺体を見つけ、残酷な真相に辿り着く。',
  settings: { genre: 'ホラー' },
});
assert.equal(violent.rating, 'R15');

const adult = buildAlphapolisPreview({
  storyText: 'タイトル: 夜の部屋\n成人向けの露骨な性描写を含む物語で、官能を主題としている。',
  settings: { genre: '恋愛' },
});
assert.equal(adult.rating, 'R18');

const categoryWarning = buildAlphapolisPreview({
  storyText: 'タイトル: 異世界の店\n異世界から来た主人公が、現代の喫茶店で新しい暮らしを始める。',
  settings: { genre: '現代文学' },
});
assert.equal(categoryWarning.category, '現代文学');
assert.ok(categoryWarning.guidelineChecks.some(item => item.includes('カテゴリーエラー')));

const unspecifiedHot = buildAlphapolisPreview({
  storyText: 'タイトル: 魔法の朝\n魔法使いが町で小さな事件を解決する。',
  settings: { genre: 'ファンタジー' },
});
assert.equal(unspecifiedHot.hotGenre, '未選択');
assert.ok(ALPHAPOLIS_HOT_RANKING_OPTIONS.includes(unspecifiedHot.hotGenre));
assert.ok(ALPHAPOLIS_CATEGORY_OPTIONS.includes(unspecifiedHot.category));
assert.notEqual(buildAlphapolisPreview({
  storyText: 'タイトル: 朝の切符\n古い駅で主人公が小さな約束を思い出す。',
  settings: {},
}).category, 'カテゴリ選択');

console.log('alphapolisAssist tests passed');
