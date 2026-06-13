import assert from 'node:assert/strict';
import { cleanOutputForPublicMode } from '../src/outputCleanup.js';

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
assert.match(cleanedScenario, /Created By AI Story Maker V5\.0\.3/);

const documentaryWithoutClosing = `ナレーション: 商店街の小さなコンビニは、今日も朝から油の匂いを漂わせている。

記録映像: レジ前で店主が焦げ跡をタオルで拭き、客が苦笑いしながら待っている。

証言/インタビュー:
常連客: 「あの不器用さが、この店らしいんです。」

店主は最後にシャッターを半分だけ下ろし、明日の仕込み表をポケットにしまった。`;

const cleanedDocumentary = cleanOutputForPublicMode(documentaryWithoutClosing, 'documentary');
assert.match(cleanedDocumentary, /^締め:\n店主は最後に/m);
assert.match(cleanedDocumentary, /Created By AI Story Maker V5\.0\.3/);

const documentaryFootageClosing = `ナレーション: 店はまだ薄暗い。

記録映像: レジが鳴る。

証言: 常連は笑う。

記録映像（締め）: 夕暮れの店先で灯りがともる。`;

const cleanedFootageClosing = cleanOutputForPublicMode(documentaryFootageClosing, 'documentary');
assert.match(cleanedFootageClosing, /^締め: 夕暮れの店先/m);

console.log('outputCleanup tests passed');
