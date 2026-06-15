import assert from 'node:assert/strict';
import { cleanOutputForPublicMode, isGenerationInProgress } from '../src/outputCleanup.js';
import { STORY_MAKER_FOOTER } from '../src/version.js';

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const footerPattern = new RegExp(escapeRegExp(STORY_MAKER_FOOTER));

const scenarioWithMultilineAim = `Topic: おでんとホットスナックの交差点
Logline: 朝のコンビニでホットスナック騒動が起きる。
Location: 商店街のコンビニ。
Outfit: アカネは制服、マサトは長袖制服。
Punchline: おでんは冷たいままなのに空気だけ温まる。
Scenario:
[1コマ目]
[EMOTION: 慌て]
[Camera: レジ前]
絵: アカネがレジ横で紙袋を抱え、指先に油染みを作っている。棚の札は少し傾いている。後ろの客が小銭を握ったまま待っている。
セリフ: アカネ「温かいほうからどうぞ、たぶん」
演出: 客の沈黙を一拍置く。紙袋の底がじわっと透ける。アカネの笑顔だけが少し固い。
狙い: 一つ目の狙いを十分に書く。
[2コマ目]
[EMOTION: 困惑]
[Camera: ホットスナック棚]
絵: マサトがトングを持ったまま札と商品を見比べている。後ろのポスターは端だけ剥がれている。おでん鍋の湯気が横から流れる。
セリフ: マサト「からあげ棒が、おでんの顔してる」
演出: 商品の場所違いを手元で見せる。店内放送が変な間で切れる。客の視線が一斉に棚へ寄る。
狙い: 二つ目の狙いを十分に書く。
[3コマ目]
[EMOTION: 焦り]
[Camera: バックヤード]
絵: アカネが空箱を踏みかけ、マサトが割り箸の束を落としている。床には値札シールが貼りついている。時計だけが妙に大きく見える。
セリフ: アカネ「今だけ全部、朝セットです」
演出: 言い訳がさらに状況を混ぜる。割り箸が小さな音で散る。二人の目線が同時に床へ落ちる。
狙い: 三つ目の狙いを十分に書く。
[4コマ目]
[EMOTION: 脱力]
[Camera: 引き]
絵: レジ前に小さな手書き札が置かれ、客が笑いながらおでんのカップを受け取っている。アカネは少し頭を下げている。マサトは床の箱を片づけている。
セリフ: 客「じゃあ、からあげ気分のおでんで」
演出: 店全体の空気がゆるむ。アカネは失敗を認めて小さく笑う。マサトが割り箸を一本多く添える。
狙い:
アカネが失敗を隠さず謝り、マサトが割り箸を多めに入れて助ける。
床の箱が残ることで後始末まで絵で見える。
客が笑って帰るため、関係が少し柔らかく変わる。`;

const cleanedScenario = cleanOutputForPublicMode(scenarioWithMultilineAim, '4koma_scenario');
assert.match(cleanedScenario, /狙い:\nアカネが失敗を隠さず謝り/);
assert.doesNotMatch(cleanedScenario, /狙い:\s*\n\s*Created By AI Story Maker/);
assert.match(cleanedScenario, footerPattern);

const documentaryWithoutClosing = `ナレーション: 商店街の小さなコンビニは、今日も朝から油の匂いを漂わせている。

記録映像: レジ前で店主が焦げ跡をタオルで拭き、客が苦笑いしながら待っている。

証言/インタビュー:
常連客: 「あの不器用さが、この店らしいんです。」

店主は最後にシャッターを半分だけ下ろし、明日の仕込み表をポケットにしまった。`;

const cleanedDocumentary = cleanOutputForPublicMode(documentaryWithoutClosing, 'documentary');
assert.match(cleanedDocumentary, /^締め:\n店主は最後に/m);
assert.match(cleanedDocumentary, footerPattern);

const documentaryFootageClosing = `ナレーション: 店はまだ薄暗い。

記録映像: レジが鳴る。

証言: 常連は笑う。

記録映像（締め）: 夕暮れの店先で灯りがともる。`;

const cleanedFootageClosing = cleanOutputForPublicMode(documentaryFootageClosing, 'documentary');
assert.match(cleanedFootageClosing, /^締め: 夕暮れの店先/m);

const openAiDocumentaryWithEmptyClosing = `商店街の夜、コンビニの朝

ナレーション:
${'東京の外れにある商店街では、朝のコンビニと夜の小さな店が、同じ失敗を別の速度で受け止めている。揚げ物の匂い、レジ袋の音、開店前のため息が、働く人の生活をほどいていく。'.repeat(22)}

記録映像:
${'午前六時、蛍光灯の下で弁当の棚が整えられ、午後七時には商店街の看板が一つずつ消えていく。店長は売れ残りの札を直し、常連は小銭を探しながら苦笑する。'.repeat(12)}

証言/インタビュー:
${'店主は「大きな事件ではないけれど、こういう小さな失敗の後始末が店を続ける理由になる」と話す。常連客も、何度も間違えて、それでも名前を覚えてくれる場所だから戻ってくるのだと語る。'.repeat(12)}

ナレーション:
${'閉店後、シャッターの隙間から細い光が歩道へ落ちる。誰かの一日がうまくいかなかったことも、別の誰かが笑って受け止めたことも、商店街の夜はそのまま抱え込んでいく。'.repeat(15)}

締め:`;

const cleanedOpenAiDocumentary = cleanOutputForPublicMode(openAiDocumentaryWithEmptyClosing, 'documentary');
const cleanedOpenAiDocumentaryBody = cleanedOpenAiDocumentary.replace(footerPattern, '').trim();
assert.match(cleanedOpenAiDocumentaryBody, /^タイトル: 商店街の夜、コンビニの朝/m);
assert.match(cleanedOpenAiDocumentaryBody, /^ナレーション:/m);
assert.match(cleanedOpenAiDocumentaryBody, /^記録映像:/m);
assert.match(cleanedOpenAiDocumentaryBody, /^証言\/インタビュー:/m);
assert.match(cleanedOpenAiDocumentaryBody, /^締め:\s*\S/m);
assert.ok(cleanedOpenAiDocumentaryBody.length >= 2400, `documentary body collapsed to ${cleanedOpenAiDocumentaryBody.length} chars`);
assert.doesNotMatch(cleanedOpenAiDocumentary, /^締め:\s*\n\s*Created By AI Story Maker/m);

const mediumWithRestart = `【鈴の音は森に還る】

第1節
朝露に濡れた森で、高橋千尋はまた同じ朝を迎えた。苔の匂い、冷えた指先、遠くの鐘の音がすべて昨日と同じで、彼女はこの世界が巻き戻っていることを理解していた。村の広場では誰もが優しく見えるのに、夜になると火事が起こり、千尋だけが犯人として責められる。その繰り返しに、彼女の胸には怒りと諦めが沈んでいた。

第2節
森の泉で出会ったエルフの少年リルは、千尋と同じようにループを覚えていた。彼は火事の夜に銀の鈴を失くしたと打ち明けるが、肝心なことになると目を逸らす。千尋は彼を責めたが、自分もまた夜の記憶から逃げていた。長老アリアの静かな問いかけを受け、千尋は「自分だけが被害者なのか」と初めて疑い始める。

第3節
神木の根元で見つけた鈴に触れた瞬間、千尋はあの夜の自分がリルを拒み、鈴を返さなかったことを思い出した。ふたりは火の前で互いの弱さを認め、鈴をアリアへ差し出す。鈴の音が森へ広がると、炎は消え、翌朝は初めて巻き戻らなかった。千尋は罪悪感を抱えたまま、リルと並んで村の小道を歩き出した。

タイトル: 鈴の音は森に還る

第1節
これは二周目の下書きで、完成済みの中編小説の後ろに誤って再開した断片である。`;

const cleanedMedium = cleanOutputForPublicMode(mediumWithRestart, 'medium');
assert.match(cleanedMedium, /^第3節/m);
assert.doesNotMatch(cleanedMedium, /これは二周目の下書き/);
assert.doesNotMatch(cleanedMedium, /\nタイトル: 鈴の音は森に還る\n\n第1節/);
assert.equal((cleanedMedium.match(/^第1節/gm) || []).length, 1);
assert.match(cleanedMedium, footerPattern);

const mediumWithTrailingTitle = `【ミニショップ陽だまりの一日】

第1節
朝の店内で副店長の和真は、突然休んだ店長の代わりに慌ただしくレジへ立った。

第2節
新人の茜は値札を間違え、客は笑い、和真は怒るよりも先に店を回すしかなかった。

第3節
閉店後、ふたりは売れ残ったどら焼きを分け合い、今日一日をやり切った手応えを黙って確かめた。
タイトル: ミニショップ陽だまりの一日`;

const cleanedMediumTrailingTitle = cleanOutputForPublicMode(mediumWithTrailingTitle, 'medium');
assert.doesNotMatch(cleanedMediumTrailingTitle, /\nタイトル: ミニショップ陽だまりの一日\s*\n\nCreated By AI Story Maker/);
assert.match(cleanedMediumTrailingTitle, /どら焼きを分け合い/);
assert.match(cleanedMediumTrailingTitle, footerPattern);

const mediumWithInlineTrailingTitle = `【さびしき駆け込みコンビニ】

第1節
レジの蛍光灯が鳴っていた。

第2節
客は小さく礼を言った。

第3節
残り香、油の匂い、指に残る冷たさ。どれもがここに集まった人々の証だった。タイトル: さびしき駆け込みコンビニ`;

const cleanedMediumInlineTrailingTitle = cleanOutputForPublicMode(mediumWithInlineTrailingTitle, 'medium');
assert.match(cleanedMediumInlineTrailingTitle, /^タイトル: さびしき駆け込みコンビニ/m);
assert.equal((cleanedMediumInlineTrailingTitle.match(/タイトル: さびしき駆け込みコンビニ/g) || []).length, 1);
assert.match(cleanedMediumInlineTrailingTitle, /ここに集まった人々の証だった。/);
assert.match(cleanedMediumInlineTrailingTitle, footerPattern);

const mediumTrailingChoiceTitle = `明日もどうせ、誰かの大事に巻き込まれながら、また一日が始まるのだ。(ア) タイトル: ヘイワマートの客は止まらない`;
const cleanedMediumTrailingChoiceTitle = cleanOutputForPublicMode(mediumTrailingChoiceTitle, 'medium');
assert.doesNotMatch(cleanedMediumTrailingChoiceTitle, /\(ア\)|タイトル: ヘイワマート/);
assert.match(cleanedMediumTrailingChoiceTitle, new RegExp(`また一日が始まるのだ。\\n\\n${escapeRegExp(STORY_MAKER_FOOTER)}`));

const mediumTrailingChoiceTitleWithoutPeriod = `明日もどうせ、誰かの大事に巻き込まれながら、また一日が始まるのだ (ア) タイトル: ヘイワマートの客は止まらない`;
const cleanedMediumTrailingChoiceTitleWithoutPeriod = cleanOutputForPublicMode(mediumTrailingChoiceTitleWithoutPeriod, 'medium');
assert.doesNotMatch(cleanedMediumTrailingChoiceTitleWithoutPeriod, /\(ア\)|タイトル: ヘイワマート/);
assert.match(cleanedMediumTrailingChoiceTitleWithoutPeriod, new RegExp(`また一日が始まるのだ。\\n\\n${escapeRegExp(STORY_MAKER_FOOTER)}`));

const trailingTitleAcrossModes = {
  '4koma': `タイトル: 小さな会計
1コマ目: レジ前で客が小銭を探す。
2コマ目: 店員が袋を開く。
3コマ目: 後ろの客が笑う。
4コマ目: みんなで小さく頭を下げる。タイトル: 余計な下書き`,
  '4koma_scenario': `Topic: 小さな会計
Logline: レジ前の小さな混乱が笑いに変わる。
Location: コンビニ
Outfit: エプロン
Punchline: 小銭がポケットから出る
Scenario:
[1コマ目]
[2コマ目]
[3コマ目]
[4コマ目]
狙い: 最後は関係の変化で閉じる。タイトル: 余計な下書き`,
  short_short: `短い出来事が一度だけ起き、主人公は黙って会釈した。タイトル: 余計な下書き`,
  novel: `店内の空気が変わり、主人公は置き忘れた傘をそっと返した。タイトル: 余計な下書き`,
  medium: mediumWithInlineTrailingTitle,
  scenario: `タイトル: 小さな会計
登場人物: 店員、客
場面: レジ前
店員: こちらで大丈夫です。タイトル: 余計な下書き`,
  manga: `タイトル: 小さな会計
ページ1
コマ1: レジ前。
セリフ: こちらで大丈夫です。タイトル: 余計な下書き`,
  essay: `主張: 日常の小さな確認は、人の距離を少し近づける。

観察: レジ前の短い沈黙にも、互いを待つ姿勢が出る。

考察: その間合いは効率とは別の信頼を作る。

結論: 小さな手間は、場の空気を変える。タイトル: 余計な下書き`,
  poem: `タイトル: 小さな灯
夜のレジ
指先の硬貨
少しだけ笑う。タイトル: 余計な下書き`,
  fairy: `小さな店の奥で、少年はなくしたボタンを見つけ、店主に笑って返した。タイトル: 余計な下書き`,
  letter: `宛先: 友人へ

本文: 今日は助けてくれてありがとう。

結び: また明日。

差出人: 私。タイトル: 余計な下書き`,
  diary: `日付: 今日
天気: 晴れ
本文: レジで小さな失敗をしたが、最後には笑えた。タイトル: 余計な下書き`,
  documentary: `ナレーション: 夕方の店内には短い列ができていた。
証言: 常連客は、いつもの会釈が戻ったと語った。タイトル: 余計な下書き`,
  radio: `タイトル: 小さな会計
登場人物: 店員、客
BGM: 小さく
店員: こちらで大丈夫です。タイトル: 余計な下書き`,
};

for (const [mode, sample] of Object.entries(trailingTitleAcrossModes)) {
  const cleaned = cleanOutputForPublicMode(sample, mode);
  assert.doesNotMatch(cleaned, /タイトル: 余計な下書き/, `${mode} should remove trailing title artifacts`);
  assert.match(cleaned, footerPattern, `${mode} should keep the footer`);
}

const cleanedBracketedMediumTitle = cleanOutputForPublicMode(`【商店街の福引き】

第1節

朝の店先で準備が始まった。

第2節

小さな失敗が重なった。

第3節

最後は笑いながら片付けた。`, 'medium');
assert.match(cleanedBracketedMediumTitle, /^タイトル: 商店街の福引き/m);
assert.doesNotMatch(cleanedBracketedMediumTitle, /^【商店街の福引き】/m);
assert.match(cleanedBracketedMediumTitle, footerPattern);

const cleanedDocumentaryRestart = cleanOutputForPublicMode(`タイトル: 商店街の一日

ナレーション:
朝の店先に小さな緊張があった。

記録映像:
レジ横の貼り紙が揺れている。

証言/インタビュー: 店主
「今日は、なんとか店を開けたかったんです」

締め:
小さな店は、失敗ごと明日へ進んでいった。タイトル:

ナレーション:
これは二本目の下書きである。`, 'documentary');
assert.match(cleanedDocumentaryRestart, /^締め:/m);
assert.doesNotMatch(cleanedDocumentaryRestart, /これは二本目の下書き/);
assert.match(cleanedDocumentaryRestart, footerPattern);

const cleanedDocumentaryBareTitle = cleanOutputForPublicMode(`深夜スマイル偏愛店

ナレーション:
曇った朝、店の灯りがついた。

記録映像:
レジ横の貼り紙が揺れている。

証言/インタビュー:
店主が小さくうなずいた。

締め:
店は明日へ進んだ。`, 'documentary');
assert.match(cleanedDocumentaryBareTitle, /^タイトル: 深夜スマイル偏愛店/m);
assert.match(cleanedDocumentaryBareTitle, footerPattern);

const originalDocument = globalThis.document;
try {
  const fakeGenerateButton = { disabled: false };
  globalThis.document = {
    documentElement: { dataset: {} },
    getElementById(id) {
      return id === 'btn-generate' ? fakeGenerateButton : null;
    },
  };

  assert.equal(isGenerationInProgress({ textContent: 'AIの思考を待っています...', dataset: {} }), true);
  assert.equal(isGenerationInProgress({ textContent: 'AIが考えています... 10秒経過', dataset: {} }), true);
  assert.equal(isGenerationInProgress({ textContent: '受信待機中... 10秒経過', dataset: {} }), true);
  assert.equal(isGenerationInProgress({ textContent: '完成本文', dataset: { longifyRendering: 'true' } }), true);
  assert.equal(isGenerationInProgress({ textContent: '完成本文', dataset: {} }), false);
  globalThis.document.documentElement.dataset.longifyRendering = 'true';
  assert.equal(isGenerationInProgress({ textContent: '完成本文', dataset: {} }), true);
  delete globalThis.document.documentElement.dataset.longifyRendering;
  fakeGenerateButton.disabled = true;
  assert.equal(isGenerationInProgress({ textContent: '完成本文', dataset: {} }), true);
} finally {
  if (originalDocument === undefined) delete globalThis.document;
  else globalThis.document = originalDocument;
}

console.log('outputCleanup tests passed');
