import assert from 'node:assert/strict';
import {
  buildKakuyomuPreview,
  createKakuyomuTags,
  detectSelfRatings,
  extractStoryTitle,
  formatKakuyomuPreview,
  getKakuyomuCopyValue,
  limitJapaneseChars,
  renderKakuyomuPreview,
  splitKakuyomuBodyChapters,
  stripStoryMakerFooter,
  suggestKakuyomuGenre,
} from '../src/kakuyomuAssist.js';

const sampleStory = `タイトル: 銀色の放課後

放課後の教室で、AIロボットのミナは誰もいない黒板に小さな約束を書いた。
遠くで銃声が鳴り、主人公は友人を守るために廊下へ走り出した。
それでも二人は、明日の文化祭を諦めないと決める。

Created By AI Story Maker V5.0.6`;

const preview = buildKakuyomuPreview({
  storyText: sampleStory,
  settings: {
    modeLabel: '短編小説',
    theme: '未来の放課後',
    genre: 'SF',
    worldview: '近未来の学校',
    target: '全年齢',
    ending: '希望の余韻',
    narration: '静かな一人称',
  },
});

assert.equal(stripStoryMakerFooter(sampleStory).includes('Created By'), false);
assert.equal(extractStoryTitle(sampleStory), '銀色の放課後');
assert.equal(preview.title, '銀色の放課後');
assert.equal(preview.body.startsWith('タイトル:'), false);
assert.equal(getKakuyomuCopyValue(preview, 'body').startsWith('タイトル:'), false);
assert.equal(preview.genre, 'SF');
assert.ok(preview.catchCopy);
assert.ok(Array.from(preview.catchCopy).length <= 35);
assert.equal(preview.catchCopy.includes('タイトル:'), false);
assert.ok(preview.introduction.includes('放課後の教室'));
assert.equal(preview.introduction.includes('タイトル:'), false);
assert.ok(preview.selfRatings.includes('暴力描写有り'));
assert.ok(preview.tags.includes('AI本文利用'));
assert.ok(preview.tags.includes('SF'));
assert.ok(preview.tags.length <= 8);
for (const tag of preview.tags) {
  assert.ok(Array.from(tag).length <= 20, tag);
}
assert.equal(formatKakuyomuPreview(preview).includes('AI利用タグ:'), false);
assert.ok(formatKakuyomuPreview(preview).includes('投稿本文:'));
assert.equal(formatKakuyomuPreview(preview).includes('Created By'), false);
assert.equal(getKakuyomuCopyValue(preview, 'tag', { tagIndex: 0 }), preview.tags[0]);
assert.equal(getKakuyomuCopyValue(preview, 'tag', { tagIndex: 99 }), '');
assert.equal(getKakuyomuCopyValue(preview, 'tags'), preview.tags.join('\n'));
const previewHtml = renderKakuyomuPreview(preview);
assert.equal((previewHtml.match(/data-copy-kind="tag"/g) || []).length, preview.tags.length);
assert.match(previewHtml, /data-copy-index="0"/);
assert.match(previewHtml, /35文字以内/);
assert.equal(previewHtml.includes('タグ一覧をコピー'), false);
assert.equal(previewHtml.includes('AI利用タグ'), false);

const shortBracketTitleStory = `【最後の封筒】

夜が匂いを濃くしている。研究棟の廊下では、機械油と漂白剤が混じり合った匂いがした。

この封筒が、なぜか「明朝までに誰かに渡らなければならない」と、まるで約束事のように頭の奥で警鐘を鳴らしている。
Created By AI Story Maker V5.0.6`;
const shortBracketPreview = buildKakuyomuPreview({ storyText: shortBracketTitleStory });
assert.equal(extractStoryTitle(shortBracketTitleStory), '最後の封筒');
assert.equal(shortBracketPreview.title, '最後の封筒');
assert.equal(shortBracketPreview.body.startsWith('【最後の封筒】'), false);
assert.equal(getKakuyomuCopyValue(shortBracketPreview, 'title'), '最後の封筒');
assert.equal(getKakuyomuCopyValue(shortBracketPreview, 'body').includes('【最後の封筒】'), false);

const chapteredStory = `【長い一日】

第1章　朝
朝の商店街で牛乳がこぼれ、田辺は慌てて床を拭いた。北浦は笑いながら手を貸し、店先の空気が少しだけやわらいだ。

第2章　抽選会
昼になると抽選箱の前に人が集まり、半端な景品まで町の話題になった。田辺は失敗ごと町に受け止められていく気配を感じた。

Created By AI Story Maker V5.0.6`;
const chapters = splitKakuyomuBodyChapters(chapteredStory);
assert.equal(chapters.length, 2);
assert.equal(chapters[0].label, '第1章 朝');
assert.equal(chapters[1].label, '第2章 抽選会');
assert.equal(chapters[0].body.includes('第1章'), false);
assert.equal(chapters[1].body.includes('第2章'), false);
const chapteredPreview = buildKakuyomuPreview({ storyText: chapteredStory });
assert.equal(chapteredPreview.chapters.length, 2);
assert.equal(chapteredPreview.catchCopy.includes('第1章'), false);
assert.equal(chapteredPreview.introduction.includes('第1章'), false);
assert.equal(getKakuyomuCopyValue(chapteredPreview, 'chapterTitle', { chapterIndex: 1 }), '第2章 抽選会');
assert.equal(getKakuyomuCopyValue(chapteredPreview, 'chapterBody', { chapterIndex: 1 }), chapteredPreview.chapters[1].body);
assert.equal(getKakuyomuCopyValue(chapteredPreview, 'chapterBody', { chapterIndex: 1 }).includes('第2章'), false);
assert.equal(getKakuyomuCopyValue(chapteredPreview, 'body'), chapteredPreview.body);
const chapteredHtml = renderKakuyomuPreview(chapteredPreview);
assert.match(chapteredHtml, /data-copy-kind="chapterTitle"/);
assert.match(chapteredHtml, /data-copy-kind="chapterBody"/);
assert.match(chapteredHtml, /全文表示/);
assert.match(chapteredHtml, /章タイトルコピー/);
assert.match(chapteredHtml, /本文コピー/);
assert.match(chapteredHtml, /kakuyomu-chapter-preview/);

const longifyTitleArtifactStory = `【砂糖菓子と騎士たちの誓い】

第1章

タイトル: 砂糖菓子と騎士たちの誓い

第1節

春の終わり、放課後の校舎にはいつもより長いチャイムの余韻がこだました。アカリは誰もいない廊下で、小さな砂糖菓子の包みを握りしめた。

【完】

第2章

タイトル: 砂糖菓子と騎士たちの誓い

第1節

夜の校庭に灯った光は、迷っていた五人をもう一度同じ場所へ集めた。`;
const longifyArtifactPreview = buildKakuyomuPreview({ storyText: longifyTitleArtifactStory });
assert.equal(longifyArtifactPreview.catchCopy.includes('タイトル:'), false);
assert.equal(longifyArtifactPreview.introduction.includes('タイトル:'), false);
assert.equal(longifyArtifactPreview.body.includes('タイトル:'), false);
assert.equal(longifyArtifactPreview.body.includes('第1節'), false);
assert.equal(longifyArtifactPreview.body.includes('【完】'), false);
assert.equal(formatKakuyomuPreview(longifyArtifactPreview).includes('AI利用タグ:'), false);

const sectionedStory = `【まるみ屋、朝からドタバタ】

第1節
小さな町の朝は、冬の残り香を帯びて、じわじわと動き始める。コンビニまるみ屋では、開店準備の失敗から小さな騒ぎが始まった。

第2節
昼の抽選会では、半端な景品と町の人々の笑い声が重なり、失敗が少しずつ祭りの空気へ変わっていった。`;
const sectionedPreview = buildKakuyomuPreview({ storyText: sectionedStory });
assert.equal(sectionedPreview.chapters.length, 2);
assert.equal(sectionedPreview.catchCopy.includes('第1節'), false);
assert.equal(sectionedPreview.introduction.includes('第1節'), false);
assert.equal(sectionedPreview.chapters[0].label, '第1節');
assert.equal(sectionedPreview.chapters[0].body.includes('第1節'), false);

assert.equal(suggestKakuyomuGenre({ genre: '現代ファンタジー', worldview: '都市伝説' }), '現代ファンタジー');
assert.equal(suggestKakuyomuGenre({ genre: '恋愛', theme: '初恋' }), '恋愛');
assert.deepEqual(detectSelfRatings('血のついた刀で戦闘し、裸の人物が出る。'), [
  '残酷描写有り',
  '暴力描写有り',
  '性描写有り',
]);

const tags = createKakuyomuTags({
  kakuyomuGenre: '現代ドラマ',
  settings: {
    modeLabel: '中編小説',
    theme: 'これは二十文字を超えるとても長いテーマ名です',
    genre: '現代ドラマ',
    worldview: '商店街',
    target: '大人向け',
    ending: '余韻',
    narration: '三人称',
  },
});
assert.ok(tags.length <= 8);
assert.ok(tags.every(tag => Array.from(tag).length <= 20));
assert.equal(limitJapaneseChars('あいうえお', 3), 'あいう');
assert.equal(limitJapaneseChars('あいうえお', 4, '…'), 'あいう…');

console.log('kakuyomuAssist tests passed');
