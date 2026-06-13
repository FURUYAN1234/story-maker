import { Hd, Jd, Kd, Ud, pt, qd } from './axisPromptDetails.js';
import { hf } from './selectionHelpers.js';

function rt(e){const t=(G,j)=>{const W=String(G||"").trim();return!W||["ランダム","未設定","おまかせ","AIおまかせ"].includes(W)?j:W},n=t(e.genreCustom||e.genre,"コメディ"),o=t(e.themeCustom||e.theme,"選択"),r=t(e.worldviewCustom||e.worldview,"現代日本"),a=t(e.eraCustom||e.era,"現代"),i=t(e.targetCustom||e.target,"全年齢"),c=t(e.endingCustom||e.ending,"意外な結末"),p=t(e.narrCustom||e.narration,"三人称・客観"),g=Array.isArray(e.characters)&&e.characters.length>0;let h;g?h=`【必須登場人物（ユーザー指定・作中登場ノルマ）】
${e.characters.map((G,j)=>{const W=G.name||`(AI命名:キャラ${j+1})`,se=G.role||"未定",B=G.sex?`性別:${G.sex}, `:"",Z=G.personality||"未定",R=G.note?` [${G.note}]`:"";return`${j+1}. ${W} (${se}) — ${B}性格:${Z}${R}`}).join(`
`)}

【AI追加人物の扱い】
・上記の人物数は上限ではない。指定人物は必ず登場させるノルマとして扱うこと。
・長編の文章量、章数、テーマ、世界観に対して人物が不足する場合、長編シナリオエージェントとして追加人物を設計してよい。
・追加人物は、必須登場人物の見せ場を奪うためではなく、葛藤・伏線・関係性・世界観の奥行きを増やすために配置すること。`:h=`【AI設計キャスト】
・ユーザー指定の必須人物は未設定。
・短編向けの2〜3人に固定せず、長編の規模・章数・テーマに見合う人数をAIが設計すること。
・主人公、対立軸を担う人物、関係性を揺らす人物、舞台や事件を動かす脇役を必要に応じて追加してよい。
・ただし人数を増やすだけの水増しは禁止。追加人物には必ず物語上の役割、欲望、弱点、主人公との関係、初登場予定章を持たせること。`;const v=`【長編人物ロスター運用ルール】
・必須登場人物は、全体プロット上の役割と登場予定章を必ず内部設計すること。
・AIが追加した人物は「AI追加人物」として扱い、名前、役割、性格/欲望、主人公や必須人物との関係、初登場章、現在地/状態を管理すること。
・各章の文脈維持メモには、追加・変化した人物情報を【人物ロスター更新メモ】として必ず記録すること。
・一度出したAI追加人物を後半で忘れないこと。退場・死亡・離脱・和解などの状態変化があれば、文脈維持メモに明記すること。`,y=e.supplement?`
【追加指示】
${e.supplement}`:"",S=["現代","ランダム",""].includes(a)?"":`

【時代考証ルール（厳守）】
・時代設定「`+a+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること。`,b=pt(n,Kd),$=pt(c,Ud),k=pt(r,qd),x=pt(i,Hd),I=pt(p,Jd);let M="";b&&(M+=`

【ジャンル文体指定：${n}】
${b}`),$&&(M+=`

【結末演出指定：${c}】
${$}`),k&&(M+=`

【世界観演出指定：${r}】
${k}`),x&&(M+=`

【ターゲット層文体指定：${i}】
${x}`),I&&(M+=`

【語り口指定：${p}】
${I}`);const T=hf(e.charCount);let K;if(T>0){const G=Math.min(Math.max(Math.round(T/8e3),6),12),j=Math.round(T/G),W=Math.max(4500,Math.min(9e3,Math.round(j*.6)));K=`全${G}章構成（目安）、各章約${Math.round(j/1e3)}千字、各章本文は最低${W.toLocaleString()}字、予定総文字数：約${Math.round(T/1e4)}万字`}else K="10万字以上を目安に、物語の内容に最適な章数と文字数をAI自身が自由に設計してください（推奨: 8〜12章、各章8千〜1万5千字、各章本文は最低6千字）";return{genre:n,theme:o,worldview:r,era:a,target:i,ending:c,narr:p,charDesc:h,characterRosterRule:v,supplement:y,eraRule:S,allCategoryGuides:M,chapterGuidance:K}}

export {
  rt,
};
