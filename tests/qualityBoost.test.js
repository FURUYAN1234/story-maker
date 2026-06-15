import assert from 'node:assert/strict';
import fs from 'node:fs';

import { detectPublicRewriteIssue, detectPublicSemanticLoopIssue } from '../src/qualityBoost.js';

const attachedMediumLoop = 'C:/Users/sx717/.codex/attachments/af7f849d-0ae7-456b-a931-06b616c8a529/pasted-text.txt';

if (fs.existsSync(attachedMediumLoop)) {
  const text = fs.readFileSync(attachedMediumLoop, 'utf8');
  const issue = detectPublicSemanticLoopIssue('medium', text);
  assert.ok(issue, `expected attached v5.0.9 medium loop artifact to fail semantic loop gate`);
  const streamText = text.replace(/Created By AI Story Maker V[\d.]+\s*$/i, '').trim();
  const rewriteIssue = detectPublicRewriteIssue('medium', streamText, 5500, { strictLabels: false });
  assert.equal(rewriteIssue, issue, 'expected attached artifact to fail through the stream rewrite gate');
}

const compactLoop = `
第1節

雨の駅で、アカリは壊れた時計を握りしめた。ヒカリは濡れた切符を拾い、リンは古い案内板の裏に残された走り書きを見つけた。サエコは駅員に話を聞き、ミクは待合室の床に落ちていた赤い糸を見つめた。

第2節

走り書きは十年前の事故と、閉じられたホームに残された約束を示していた。アカリは逃げたい気持ちを飲み込み、ヒカリの推理を信じて夜のホームへ向かった。リンは案内板の欠けた文字を読み解き、サエコは鍵の束を借り、ミクは赤い糸を結び直した。

第3節

閉じたホームで、アカリは時計を戻すのではなく、止まっていた針を自分の手で進めた。約束を守れなかった少年の声は雨音に溶け、五人は朝の光の中で駅を出た。

アカリは、駅前に小さな喫茶店を開いた。彼女の店は町の人々に愛され、甘い香りと笑顔で満ちていた。アカリは心から幸せを感じていた。

ヒカリは、郷土資料館の研究員として働く傍ら、古い駅の記録を整理していた。彼女の知識は皆から信頼され、穏やかな日々が続いていた。

リンは、古書店の店主として子供たちに愛されていた。彼女は新しい物語を見つけるたび、温かな笑顔を浮かべていた。

サエコは、町の安全を守る隊長として規律を重んじ、住民から信頼されていた。彼女の人生は確かに輝き始めていた。

ミクは、駅前の服飾店で働く傍ら、町に新しい流行を運んだ。仲間たちの温かさに包まれ、心から満たされていた。
`;

for (const mode of ['short_short', 'novel', 'medium', 'scenario', 'manga', 'fairy', 'documentary', 'radio']) {
  const issue = detectPublicSemanticLoopIssue(mode, compactLoop);
  assert.ok(issue, `expected ${mode} to fail repeated profile-roundup loop`);
}

const progressingStory = `
第1節

雨の駅で、アカリは壊れた時計を拾った。針は午前零時を指したまま動かない。ヒカリは時計の裏に刻まれた番号を読み、リンは古い案内板の欠けた文字と番号が一致することに気づいた。サエコは駅員室の記録を調べ、ミクは待合室の床に残る赤い糸を見つけた。

第2節

五人は閉鎖されたホームへ向かった。そこには十年前、最終電車を待ち続けた少年の影が残っていた。時計を戻せば少年は救えるかもしれない。けれど戻した時間には、今の町で出会った人々の記憶も巻き込まれる。アカリは震えながら、戻すことではなく、止まった時間を進める方法を探すと決めた。

第3節

アカリは時計をホームの古い柱時計にはめ込んだ。針が一つ進むたび、少年の影は自分が待っていた理由を思い出していく。彼は迎えを待っていたのではなく、誰かに謝る勇気を待っていたのだ。朝の始発ベルが鳴る頃、少年は「もう行ける」と笑った。五人は疲れ切って駅を出たが、赤い糸だけはアカリの手首に残り、次に迷った誰かを導く小さな印になった。
`;

assert.equal(detectPublicSemanticLoopIssue('medium', progressingStory), '');

const rawOverMinimumButPublicShort = `${'あ'.repeat(5488)}

タイトル: これは公開表示から消える余計な下書きタイトルです`;
assert.match(
  detectPublicRewriteIssue('medium', rawOverMinimumButPublicShort, 5500, { strictLabels: false }),
  /短すぎ|short/i,
);

const scenarioCollapsedToNovel = `【商店街の朝】
店主はレジ前で深く息をついた。アルバイトが駆け込んできて、二人は昨日の祭りの片付けを始めた。`;
assert.match(
  detectPublicRewriteIssue('scenario', scenarioCollapsedToNovel, 0),
  /登場人物|場面|蠢・亥ｽ｢蠑上Λ繝吶Ν/,
);

const validStoryMakerFooter = `商店街の雨よけの下で、惣菜屋の灯りだけが夕方の湿気を受け止めていた。藤井は売れ残った弁当の輪ゴムを外し、厨房の奥にいる店長へ「今日は早めに閉めましょう」と声をかけた。返事は新聞紙を畳む音だけだった。

閉店作業の途中、常連の鈴木が息を切らして戻ってきた。財布を忘れたのではなく、昼に渡された小さなメモを返しに来たのだ。そこには、惣菜を買った客からの短い礼と、明日も来るという一行があった。藤井はその文字を読み、油の匂いが染みたエプロンを握りしめた。

店長は何も言わず、売れ残ったから揚げを二つ皿に移した。藤井と鈴木はカウンターの端でそれを分け合った。雨音が店のシャッターを叩くたび、今日の失敗が少しずつ別の形に変わっていく気がした。

Created By AI Story Maker V5.0.9`;
assert.equal(
  detectPublicRewriteIssue('short_short', validStoryMakerFooter, 0),
  '',
  'expected the valid Story Maker footer to be ignored by internal artifact detection',
);

assert.match(
  detectPublicRewriteIssue('short_short', '本文中にGemini APIの説明が混入しています。', 0),
  /生成ツール名またはAPI名/,
);

const repeatedMotifButProgressing = Array.from({ length: 5 }, (_, index) => `
第${index + 1}節

商店街の会議では、デジタルサイネージの扱いについて別々の課題が話し合われた。${index + 1}回目の議題は、設置場所、電源、近所の店主の不安、子供たちの通学路、夕方の反射光など、前の場面とは違う具体的な問題に向かって進んでいく。主人公はその都度、相手の言葉を聞き直し、古いノートに解決策を書き足した。画面に映す文字の大きさも、魚屋の値札も、雨の日の足元も、少しずつ別の判断材料になっていった。
`).join('\n\n');
assert.equal(
  detectPublicSemanticLoopIssue('medium', repeatedMotifButProgressing),
  '',
  'expected a recurring story motif to pass when scenes keep progressing',
);

const repeatedHiraganaStylePhrase = Array.from({ length: 8 }, (_, index) => `
第${index + 1}節

閉店後の店内で、主人公は前の場面とは違う相手と向き合った。棚の隙間、雨の音、古い伝票、冷めたコーヒーの匂いが、それぞれ別の問題を浮かび上がらせる。彼は一つずつ確認し、言葉を選び、次の行動へ進んだ。その沈黙は、まだ答えを探しているかのようだった。
`).join('\n\n');
assert.equal(
  detectPublicSemanticLoopIssue('medium', repeatedHiraganaStylePhrase),
  '',
  'expected repeated hiragana-only style phrases not to be treated as content loops',
);

console.log('qualityBoost semantic loop tests passed');
