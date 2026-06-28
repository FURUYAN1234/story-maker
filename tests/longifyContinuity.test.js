import assert from 'node:assert/strict';
import {
  auditLongifyStructure,
  buildContinuityDigest,
  detectEpisodeRetake,
  detectIntraChapterEventLoop,
  detectParaphrasedOverlap,
  detectStoryboardResidue,
  detectSettingContradiction,
  extractEpisodeArc,
  extractInvariants,
  isLikelyTruncated,
  renderRollingMemo,
  shingleSimilarity,
  extractBeats,
} from '../src/longifyContinuity.js';
import {
  summarizeForContinuity,
  buildLongifyChapterContinuationPrompt,
  buildLongifyChapterPrompt,
} from '../src/longifyBeta.js';

// --- D. Truncation detection -------------------------------------------------
assert.equal(isLikelyTruncated('第6章\n陽葵はそう言って、「うーん」と考'), true, 'mid-word ending is truncated');
assert.equal(isLikelyTruncated('陽葵は立ち止まり、ゆっくりと頷いた。'), false, 'terminal punctuation = finished');
assert.equal(isLikelyTruncated('「またね」と彼女は笑った。', 'MAX_TOKENS'), true, 'finishReason length overrides');
assert.equal(isLikelyTruncated('扉を閉めた。', 'STOP'), false, 'STOP + terminal = finished');
assert.equal(isLikelyTruncated(''), false, 'empty is not flagged');

// --- C. Beats + paraphrase overlap ------------------------------------------
const beats = extractBeats('陽葵は公園のベンチに座った。それからごみ袋を集積所へ運んだ。');
assert.ok(beats.includes('bench|sit'), 'extracts bench-sit beat');
assert.ok(beats.includes('garbage|carry'), 'extracts garbage-carry beat');

const chapterA = '陽葵は公園のベンチに座り、リボンを握った。沙也加が隣に座った。みんなでごみ袋を集積所へ運んだ。夕日が団地を照らした。リボンを公園に投げた。';
// chapterB re-enacts the same beats with different wording (the loop bug).
const chapterB = 'ベンチに腰を下ろした陽葵は、手の中のリボンを握りしめた。沙也加もベンチに座る。ごみ袋を集積所まで運び、夕日に染まる団地を眺めた。陽葵はリボンを公園へ投げた。';
const overlap = detectParaphrasedOverlap(chapterB.repeat(5), [chapterA.repeat(5)]);
assert.equal(overlap.ok, false, 'paraphrased re-enactment is detected');

const distinct = '克也は朝の教室で答案を配った。先生が出席を取り、窓の外では雨が降っていた。誰も団地の話はしなかった。新しい転校生が自己紹介をした。';
const noOverlap = detectParaphrasedOverlap(distinct.repeat(5), [chapterA.repeat(5)]);
assert.equal(noOverlap.ok, true, 'distinct chapter is not flagged');

const sim = shingleSimilarity('あいうえおかきくけこ', 'あいうえおかきくけこ');
assert.ok(sim.jaccard > 0.9, 'identical text has high jaccard');

const sameEpisodeA = [
  '澪は古い写真を発見し、春人と喫茶店で相談した。',
  '二人は商店街を守る計画を実行しようと決め、店を回って証言を受け取った。',
  '工事業者に反対されたが、祖父が写真を残した理由が分かった。',
  '最後に町の人へ写真を公開し、止まっていた時計が動き始めた。',
].join('');
const sameEpisodeB = [
  '春人の視点では、古い写真に気づく場面から始まる。',
  '澪とカフェで話し合い、商店街のために同じ計画を進めると決意する。',
  '証言を預かったあと工事側に止められ、祖父の行動の意味を知る。',
  '終盤では集まった人々に写真を見せ、時計が時を刻みはじめる。',
].join('');
const sameEpisodeArc = extractEpisodeArc(sameEpisodeA);
assert.ok(sameEpisodeArc.includes('discover'), 'episode arc extracts discovery');
assert.ok(sameEpisodeArc.includes('present'), 'episode arc extracts public action');
const retake = detectEpisodeRetake(sameEpisodeB.repeat(3), [sameEpisodeA.repeat(3)]);
assert.equal(retake.ok, false, 'same generic episode arc retold from another viewpoint is detected');

const shuffledSameEpisode = [
  '終盤では集まった人々に写真を見せ、時計が時を刻みはじめる。',
  '春人の視点では、古い写真に気づく場面から始まる。',
  '証言を預かったあと工事側に止められ、祖父の行動の意味を知る。',
  '澪とカフェで話し合い、商店街のために同じ計画を進めると決意する。',
].join('');
const shuffledRetake = detectEpisodeRetake(shuffledSameEpisode.repeat(3), [sameEpisodeA.repeat(3)]);
assert.equal(
  shuffledRetake.ok,
  false,
  'same generic episode arc is detected even when the retelling shuffles event order',
);

const internalLoop = detectIntraChapterEventLoop([
  sameEpisodeA,
  'その後、澪は別の封筒から古い写真を発見し、春人に相談した。二人はまた保存計画を実行しようと決め、関係者から証言を受け取った。反対する担当者に止められたが、祖父が写真を残した理由が分かった。最後に記録を公開し、止まっていた時計が動き始めた。',
  'さらに翌週、澪は新しい紙片から古い写真を発見し、春人に相談した。二人は三度目の保存計画を実行しようと決め、証言を受け取った。担当者に止められたが、祖父の理由を知り、記録を公開して時計が時を刻みはじめた。',
].join(''));
assert.equal(internalLoop.ok, false, 'same episode arc repeated inside one chapter is detected');

const successorEpisode = [
  '翌朝、澪は写真公開の結果を受けて町役場へ向かった。',
  '工事業者との交渉はこじれたが、今度は保存申請の締切を知る。',
  '前日の発見や公開をやり直さず、町の人から署名を集める準備へ進んだ。',
].join('');
assert.equal(
  detectEpisodeRetake(successorEpisode.repeat(3), [sameEpisodeA.repeat(3)]).ok,
  true,
  'successor chapter that advances after the episode is not treated as a retake',
);

// --- B. Invariants + contradiction ------------------------------------------
const ledger = `00. 不変設定
学年: 小学6年生
年齢: 12歳
時代: 現代
季節: 春`;
const inv = extractInvariants(ledger);
assert.equal(inv.grade, '小学6年生');
assert.equal(inv.schoolLevel, 'elementary');

const contradiction = detectSettingContradiction('ランドセルを背負った陽葵は、中学に行ってもこの団地にいると思った。', inv);
assert.equal(contradiction.ok, false, 'elementary invariant vs 中学 is a contradiction');
assert.equal(detectSettingContradiction('陽葵はランドセルを背負って団地を出た。', inv).ok, true, 'no conflict token = ok');

// --- A. Real continuity digest + rolling memo -------------------------------
const digest = buildContinuityDigest(chapterA, 1);
assert.ok(/到達状態/.test(digest), 'digest has reached-state');
assert.ok(/第1章/.test(digest), 'digest references chapter number');
// Different chapters must produce different digests (old bug: constant boilerplate).
assert.notEqual(buildContinuityDigest(chapterA, 1), buildContinuityDigest(distinct, 1), 'digest depends on content');

const memo = renderRollingMemo([
  buildContinuityDigest(chapterA, 1),
  buildContinuityDigest(distinct, 2),
  buildContinuityDigest(chapterB, 3),
]);
assert.ok(/第3章/.test(memo), 'rolling memo keeps the most recent chapter');
assert.ok(/第1章/.test(memo), 'rolling memo keeps older chapters (compressed)');

// summarizeForContinuity is no longer a constant boilerplate.
assert.notEqual(
  summarizeForContinuity(chapterA, 1),
  summarizeForContinuity(distinct, 1),
  'summarizeForContinuity now depends on actual chapter content',
);

// --- E. Whole-manuscript audit ----------------------------------------------
const audit = auditLongifyStructure({
  chapters: [
    `第1章\n${chapterA.repeat(5)}`,
    `第2章\nランドセルを背負った陽葵は、中学に行ってもと考えた。${chapterA}`,
    `第3章\n${chapterB.repeat(5)}`,
    '第4章\n陽葵はそう言って、「うーん」と考',
  ],
  invariants: inv,
});
assert.equal(audit.ok, false, 'audit flags structural problems');
const codes = new Set(audit.blocking.map(b => b.code));
assert.ok(codes.has('setting_contradiction'), 'audit catches setting contradiction');
assert.ok(codes.has('chapter_loop'), 'audit catches re-enactment loop');
assert.ok(codes.has('truncated'), 'audit catches truncation');

const retakeAudit = auditLongifyStructure({
  chapters: [
    `第1章\n${sameEpisodeA.repeat(3)}`,
    `第2章\n${sameEpisodeB.repeat(3)}`,
  ],
});
assert.equal(retakeAudit.ok, false, 'audit flags same episode retake');
assert.ok(retakeAudit.blocking.some(issue => issue.code === 'episode_retake'), 'audit reports episode_retake');

const storyboardResidueChapter = [
  '第1章',
  '',
  '夜の商店街、古びた金物屋の前に立つ澪。雨上がりの湿った空気の中、澪が錆びたシャッターをそっと撫でている。  ',
  '「……これ、祖父ちゃんが描いたのかな」  ',
  '',
  '翌朝、喫茶店の暗がり。澪、春人、奈央がテーブルを囲み、テーブルの上に地図が広げられている。  ',
  '「誰かのイタズラじゃない？」  ',
  '',
  '---',
  '',
  '夜をひときわ冷たくする雨の名残が、澪の足元から薄い霧となって立ち上っていた。',
].join('\n');
assert.equal(detectStoryboardResidue(storyboardResidueChapter).ok, false, 'storyboard prelude is structural residue');
const storyboardWithoutSeparator = [
  '第3章',
  '',
  '雨上がりの朝、澪が金物屋の前に立ち、湿った路面と店の古びた扉を見つめている。  ',
  '「あの上映会の余韻が、まだこの空気に残ってる気がする……」  ',
  '',
  '澪が祖父の工具箱から磨ききれない真鍮の札を取り出し、優しく指先でなぞる場面。店の前を奈央が眠そうな顔で歩いてきて、静かに手を振る。  ',
  '「昨日……すごかったね」　澪「うん、でも、まだ、何か足りない気がする」  ',
  '',
  '春人がパン屋の袋を提げて現れ、三人が自然と出会ってしまう。三人の足元にはまだ水たまりが残る。  ',
  '「パン屋、開いてたよ」　奈央「……会いに行こうか」  ',
  '',
  '雨上がりの朝、金物屋の軒下にはまだ水滴が残っていた。澪は工具箱を胸に抱え、昨夜から続く決意を言葉にしようとしていた。',
].join('\n');
assert.equal(detectStoryboardResidue(storyboardWithoutSeparator).ok, false, 'storyboard prelude without separator is residue');
const proseSceneWithDialogue = [
  '第3章',
  '',
  '雨上がりの朝、澪は金物屋の前に立ち、濡れた路面に映る灯りを見つめていた。  ',
  '「昨日の上映会の余韻が、まだこの空気に残ってる気がする……」',
  '',
  '店の前を奈央が眠そうな顔で歩いてきて、澪の手にある真鍮の札を覗き込んだ。  ',
  '「昨日……すごかったね」',
  '',
  '澪は札を握り直し、昨夜から続く決意を言葉にしようとしていた。',
].join('\n');
assert.equal(detectStoryboardResidue(proseSceneWithDialogue).ok, true, 'normal prose scene plus dialogue is not storyboard residue');
const midBodyTitleReplay = [
  '第3章',
  '',
  '三人は上映会の後、商店街に残った灯りを見つめていた。',
  '',
  '【雨上がりの灯台商店街】',
  '',
  '雨が上がったばかりの朝。商店街の薄曇りの通り。澪と春人、奈央がリボンを手に歩き始めている。  ',
  '「朝の空気、まだ雨の匂いが残ってる……」',
  '',
  '八百屋の奥さん「こうやって誰かが来てくれるだけで、まだお店やってるんだって思えるのよ」',
].join('\n');
assert.equal(detectStoryboardResidue(midBodyTitleReplay).ok, false, 'mid-body title replay is structural residue');
assert.equal(detectStoryboardResidue('第3章\n\n1コマ目の後、三人はぬかるみの石畳を一歩ずつ進む。').ok, false, 'panel lead residue is blocked');
assert.equal(detectStoryboardResidue('第1章\n\n澪は「この灯りを消したくない」と言った。').ok, true, 'normal prose dialogue is clean');
const storyboardAudit = auditLongifyStructure({ chapters: [storyboardResidueChapter] });
assert.ok(storyboardAudit.blocking.some(issue => issue.code === 'storyboard_residue'), 'audit catches storyboard residue');
const titleReplayAudit = auditLongifyStructure({ chapters: [midBodyTitleReplay] });
assert.ok(titleReplayAudit.blocking.some(issue => issue.code === 'storyboard_residue'), 'audit catches title replay residue');

// --- continuation prompt -----------------------------------------------------
const contPrompt = buildLongifyChapterContinuationPrompt({
  ledgerText: ledger,
  chapterNumber: 6,
  chapterText: '第6章\n陽葵はそう言って、「うーん」と考',
  isLastChapter: true,
});
assert.ok(/続き/.test(contPrompt), 'continuation prompt asks for continuation');
assert.ok(/と考/.test(contPrompt), 'continuation prompt includes the tail');

// chapter prompt injects invariants
const chPrompt = buildLongifyChapterPrompt({ seedText: 'x', ledgerText: ledger, chapterNumber: 2, invariants: inv });
assert.ok(/不変設定/.test(chPrompt), 'chapter prompt injects invariant block');
assert.ok(/小学6年生/.test(chPrompt), 'chapter prompt contains the frozen grade');

console.log('longifyContinuity.test.js: all assertions passed');
