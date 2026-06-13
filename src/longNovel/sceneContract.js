import { allowedNamesForScene, projectBibleForScene } from './storyBible.js';
import { describeVoiceProfiles } from './literaryQualityGuards.js';

export function buildSceneContract({ scene, bible, previousScenes = [], attempt = 1, provider = 'gemini' }) {
  const projected = projectBibleForScene(bible, scene);
  const allowedNames = allowedNamesForScene(bible, scene);
  const allowedPlaces = projected.places.map(place => place.name).filter(Boolean);
  const allowedItems = projected.items.map(item => item.name).filter(Boolean);
  const voiceProfiles = describeVoiceProfiles(bible);
  const minChars = scene.targetChars?.[0] || 1100;
  const providerHint = provider === 'gemini'
    ? 'Gemini向け補正: 優等生的な要約・説明・整いすぎた結論を避ける。人物の迷いは、会話の間、手の動き、物の位置、言い直しで見せる。'
    : 'OpenAI向け補正: 強い設定語や外部固有名詞を増やさない。入力内の人物と物だけで熱を作り、長く出しすぎず場面を濃くする。';

  return [
    'あなたは長編小説の一場面だけを書く小説家です。',
    '出力は日本語の本文だけ。見出し、章番号、シーン番号、箇条書き、解説、JSON、Markdown、AIとしての注記は禁止。',
    '漫画・脚本・メモ形式のラベルは禁止。行頭に「絵/状況:」「セリフ:」「1コマ目:」「ト書き:」「狙い:」などを書かず、すべて地の文と会話文に溶かす。',
    `${minChars}字以上で書く。これは上限ではなく下限。途中で要約せず、場面を最後まで書き切る。`,
    '読者が「AIっぽい」と感じる説明調、感情名の言い切り（「怒りを感じた」「後悔していた」等）、テンプレ和解展開を避ける。',
    '人物の感情は言葉で説明せず、手の震え、喉のつかえ、視線の逸らし、沈黙の長さといった具体的な身体反応や行動（Show, Don\'t Tell）のみで描写すること。',
    '会話は表面的な同調を避け、互いに真意を探り合うような、少しの緊張感と人物の自尊心を残した生々しいやり取りにしてください。ギャグ的・滑稽なコメディ表現は一切禁止。',
    '人物の矛盾、言いよどみ、言い直し、無意識の仕草、物の扱いを自然に混ぜる。',
    '最後は抽象的な総括で閉じない。会話、身体動作、視線、物の移動、具体的変化で終える。',
    '本文末に Created By などのフッターは書かない。',
    providerHint,
    '終盤禁止: 「心の奥」「少しだけ和らいだ」「気がした」「余韻」「静かに朝が始まった」などの感情総括で閉じない。最後の一文は、人物の選択、手の動き、物の配置変化、扉や紙や灯りの状態で閉じる。',
    provider === 'gemini'
      ? 'Gemini追加補正: 「それは〜行為だった」「何を考えているのかは分からなかった。だが」「少なくとも、この瞬間は〜」「選択で終わった」「それが、自分にできること」「新しい始まり」のような優等生的な説明締めを避ける。説明せず、物と沈黙と動作だけで読ませる。感情は「感じた」「思った」「気がした」で処理せず、身体反応と行動に置き換える。'
      : 'OpenAI追加補正: 強い比喩や決め台詞で締めすぎず、入力内の出来事と物の位置変化を最後まで残す。',
    '',
    'Story Bible',
    `- ログライン: ${projected.premise?.logline || ''}`,
    `- トーン: ${projected.premise?.tone || ''}`,
    `- 使用できる人物名: ${allowedNames.join(' / ')}`,
    `- 使用できる場所名: ${allowedPlaces.join(' / ')}`,
    `- 使用できる物: ${allowedItems.join(' / ')}`,
    '- Character voice contract:',
    voiceProfiles,
    `- 既定事実: ${(projected.facts || []).map(fact => fact.text).join(' / ')}`,
    `- 未解決の問い: ${(projected.openThreads || []).map(thread => thread.text).join(' / ')}`,
    '',
    '章の役割',
    ...roleLines(scene.chapterRole),
    '',
    '今回の場面契約',
    `- stage: ${scene.stageId || 'm1'}`,
    `- sceneId: ${scene.id}`,
    `- chapter: ${scene.chapter}`,
    `- phase: ${scene.phase || ''}`,
    `- 視点: ${scene.pov}`,
    `- 時間: ${scene.time}`,
    `- 入り口状態: ${scene.entryState}`,
    `- 場面固有の役割: ${scene.sceneRole || ''}`,
    `- 必須ビート: ${scene.beats.join(' / ')}`,
    `- 出口状態: ${scene.exitState}`,
    '',
    previousScenes.length ? '直前の確定場面' : '',
    ...previousScenes.map(prev => `- ${prev.sceneId}: ${prev.exitState || ''}`),
    '',
    '長編の継続品質ルール',
    '- 前章・前場面と同じ感情をなぞらない。必ず「欲望、誤解、発見、代償、関係変化」のどれかを一段進める。',
    '- 同じ小物、同じ沈黙、同じ謝罪、同じ回想を繰り返して尺を稼がない。出すなら意味か扱いを変える。',
    '- 章末に向けて、人物同士の距離、信頼、責任の位置を変化させる。',
    '- 伏線や物証は説明ではなく、人物が触る、置く、隠す、返す、書く、破るなどの行動で回収する。',
    '- 前章と同じ小物を使う場合、所有者・位置・意味・扱いのうち最低1つを変える。',
    '- その場面で読者が新しく知ることを必ず1つ置く。',
    '- 場面終了時に、主人公の選択可能性を1つ減らすか、代償を1つ増やす。',
    '- 「見つめる・黙る・触れる」だけで終えず、置く・破る・渡す・失う・告げる・拒む等の不可逆動作を入れる。',
    '',
    '禁止',
    '- Story Bibleにない主要人物名、地名、組織名、商品名、ブランド名を増やさない。',
    '- 人物A、場所A、例の商品などの仮名やカテゴリ名を本文に出さない。',
    '- 漫画・脚本・メモ用の形式ラベルを本文に出さない。必要な状況説明は通常の小説本文として書く。',
    '- 失敗報告、修正方針、プロンプトの引用、内部メモを書かない。',
    '- 結末を「新しい一歩」「関係が戻った」「希望が残った」だけで片付けない。',
    'Additional generic quality gates:',
    '- Follow the Character voice contract. A character must not use a forbidden first-person pronoun.',
    '- Avoid repeated low-information words such as ゆっくり, 視線, 沈黙, 静か, 震え, 見つめ; replace them with concrete action, object handling, or spoken friction.',
    '- Do not end with the same static pattern every time: silence, looking away, object-left-on-desk, closing door, or dawn light. Make the last movement distinct.',
    `attempt: ${attempt}`,
  ].filter(line => line !== '').join('\n');
}

export function validationContextForScene(scene, bible, previousScenes = []) {
  return {
    minChars: scene.targetChars?.[0] || 1100,
    bible,
    allowedNames: allowedNamesForScene(bible, scene),
    previousTexts: previousScenes.map(sceneEntry => sceneEntry.body || '').filter(Boolean),
    isChapterFinal: Boolean(scene.isChapterFinal || scene.phase === 'turn'),
    isFinalChapter: Boolean(scene.isFinalChapter),
    validationPosition: scene.isChapterFinal || scene.phase === 'turn' ? 'scene_chapter_end' : 'scene_mid',
  };
}

function roleLines(role = {}) {
  return [
    `- 章ゴール: ${role.goal || ''}`,
    `- 欲望: ${role.desire || ''}`,
    `- 誤解: ${role.misconception || ''}`,
    `- 発見: ${role.discovery || ''}`,
    `- 代償: ${role.cost || ''}`,
    `- 関係変化: ${role.relationshipShift || ''}`,
    `- 見せ場: ${role.showcase || ''}`,
    `- 不可逆変化: ${role.irreversibleChange || ''}`,
    `- 次章へ渡す問い: ${role.nextQuestion || ''}`,
    `- 避ける反復: ${role.avoidEmotion || ''}`,
    `- 新情報: ${role.newInformation || ''}`,
    `- 不可逆行動: ${role.irreversibleAction || ''}`,
    `- 関係の前後差: ${role.relationshipDelta || ''}`,
    `- 小物状態変化: ${role.objectStateChange || ''}`,
    `- 場所移動圧: ${role.sceneVenueShift || ''}`,
    `- 次章を読む理由: ${role.readerHook || ''}`,
  ];
}
