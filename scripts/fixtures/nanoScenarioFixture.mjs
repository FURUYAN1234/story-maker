// Synthetic contract fixtures, not paid API evidence.
export function scenarioFixture({ silent = true, count = 4, composition = true } = {}) {
  return `Topic: 返却の順番
Logline: 係員が返却札を直し、来訪者が並び直す。
Location: 屋内の受付
VisualEvidence: 返却札、貸出箱
Outfit: 係員は作業用ベスト、来訪者は普段着
Punchline: 静かな余韻
PanelCountReason: 準備、確認、受け渡しと最後の反応に必要な場面を${count}コマで描く。
Scenario:
${composition ? 'PageComposition: '+JSON.stringify({layout:'hero_top',reason:'最初の手渡す動作を大きく見せ、残りの確認と反応を順に読む。',heroPanels:[1],foregrounds:[{panel:1,character:'係員',over:[2],placement:'係員の半身を大きく描き、次のコマの余白の手前へ一続きに重ねる。'}],breakouts:[],bleed:[{panel:1,edges:['top']}]})+'\n' : ''}${Array.from({length: count}, (_, i) => i + 1).map(n => `[${n}コマ目]
[EMOTION: NORMAL]
[Camera: 係員の右後方、高い位置から浅く見下ろす俯瞰。頭頂と箱の天面が見える。]
BalloonLayout: ${silent && n === count ? '[]' : '[{"speaker":"係員","x":0.7,"anchor":"画面右奥の係員の頭","route":"右上の余白から頭の輪郭へ短い尾"}]'}
状況: 係員が右奥で返却札を支え、左手前の来訪者が札を見つめる。札には「返却」と印字されている。係員は右手で札を持つ。左手は箱の縁を支える。来訪者は口を閉じて札へ目を向ける。肩が少し下がる。箱の天面が光を受ける。札を直す選択によって待つ場所が変わり、来訪者が箱を持ち直して一歩進む後始末を見せる。
${silent && n === count ? 'セリフなし' : '係員「こちらへどうぞ。」'}`).join('\n\n')}`;
}
