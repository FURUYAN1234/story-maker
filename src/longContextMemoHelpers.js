function Zd(e){const t=String(e||"").trim();if(!t)return"";const n=t.split(/(?=---\s*第[\d０-９一二三四五六七八九十]+章の文脈メモ\s*---)/).map(o=>o.trim()).filter(Boolean);return n.length?n[n.length-1]:t}function mf(e,t){const n=Zd(e);if(!n)return"";const o=[new RegExp(`【第${t}章のシーン設計（GMC\\+S）】([\\s\\S]*?)(?=\\n【|\\n---|$)`),/【次章のシーン設計（GMC\+S）】([\s\S]*?)(?=\n【|\n---|$)/,/【次章のシーン設計】([\s\S]*?)(?=\n【|\n---|$)/];for(const r of o){const a=n.match(r);if(a!=null&&a[1])return a[1].trim()}return""}function A(e,t,n=""){const o=Zd(t),r=mf(t,e),a=o?o.slice(0,1800):"（直近の文脈メモなし）";return`
【第${e}章の連続性ガード・最優先】
以下は元のプロット概要より優先する。過去章の出来事を再演・巻き戻し・別角度で再説明してはならない。
・第${e}章は、直近章の最後で確定した状態の「後」から始める。
・直近章の最後の段落を起点にし、直近章の冒頭・移動・到着・発見・戦闘・目撃を第${e}章の冒頭でやり直さない。
・直近章で到達済みの場所、確認済みの現象、完了済みの送信・救出・逃走・崩壊は「既成事実」として扱い、次の障害・代償・選択へ進める。
・直近章または文脈メモで、発生済み／紛失済み／負傷済み／回収済み／退場済みになった出来事を、第${e}章で初めて起きる出来事として描かない。
・同じ道具、証拠、負傷、敵対、会話を使う場合は、「すでに起きた結果を受けた次の行動」として扱う。
・直近メモの「第${e}章のシーン設計」または「次章のシーン設計（GMC+S）」を第${e}章の開始条件として最優先する。
・過去章のイベントをもう一度見せたい場合でも、回想・要約・再演で水増ししない。現在進行の新しい対立、調査、発見、決断へ進める。
・第${e}章が最終章ではない場合、物語全体の勝利・全面契約・会社再建完了・黒幕完全敗北などの総決算を描かない。章末には必ず未解決の対立、新しい危機、次章への代償を残す。

【第${e}章で優先する最新GMC+S】
${r||"（直近メモに明示された次章GMC+Sがない場合は、直近章の結末直後から新しい展開を作る）"}

【直近文脈メモ抜粋】
${a}

NEAR-END STRUCTURE LOCK (never output this heading):
- Unless this is explicitly the final chapter, do not complete the whole-novel objective, final contract, final victory, total defeat of the antagonist, all foreshadowing payoff, or everyone's ending. Leave a concrete unresolved core for the final chapter.
- A chapter immediately before the final chapter must end at the maximum crisis or last irreversible choice, not at mission accomplished.

${n?`【前回失敗からの再生成指示】
${n}
`:""}`}

export {
  Zd,
  mf,
  A,
};
