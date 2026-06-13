import { allowedNamesForScene } from './storyBible.js';
import { countChars, validateSceneDraft } from './localValidator.js';
import { summarizeIssueSeverities } from './severityPolicy.js';

export function minimumCharsForChapter(chapter) {
  const sceneMinimum = (chapter.scenes || [])
    .reduce((total, scene) => total + (scene.targetChars?.[0] || 0), 0);
  return Math.max(900, Math.floor(sceneMinimum * 0.48));
}

export function buildChapterEditorialPrompt({
  chapter,
  bible,
  chapterText,
  previousChapterNotes = [],
  qualityWarnings = [],
  attempt = 1,
  provider = 'gemini',
}) {
  const allowedNames = allowedNamesForScene(bible, {});
  const role = chapter.role || {};
  const minChars = minimumCharsForChapter(chapter);
  const targetChars = Math.max(minChars + 450, Math.floor(minChars * 1.18));
  const providerHint = provider === 'gemini'
    ? 'Gemini向け補正: きれいな要約、説明的な結論、優等生的な感想文調を削る。余白、言いよどみ、具体動作で人間臭さを残す。'
    : 'OpenAI向け補正: 勢いで設定を増やさない。過剰な比喩、外部固有名詞、長すぎる独白を抑え、入力内の出来事を濃くする。元の各シーンの会話や地の文のディテールを省略せず、元の文章量の90%以上を維持してください。絶対に要約して短くしすぎないこと。';

  const warningSection = qualityWarnings.length
    ? [
        'Scene-level warnings to resolve during this chapter edit:',
        ...qualityWarnings.map(warning => `- ${warning.sceneId || 'scene'} / ${warning.code}: ${warning.message || ''}`),
        '',
      ]
    : [];

  return [
    'あなたは長編小説の章単位の編集者兼小説家です。',
    '以下の章本文を、公開原稿として一章分に再編集してください。',
    '出力は本文だけ。見出し、章番号、箇条書き、講評、修正メモ、JSON、Markdownは禁止。',
    '漫画・脚本・メモ形式のラベルは禁止。行頭に「絵/状況:」「セリフ:」「1コマ目:」「ト書き:」「狙い:」などを書かず、地の文と会話文へ変換する。',
    '本文末に Created By などのフッターは書かない。',
    providerHint,
    ...warningSection,
    provider === 'openai'
      ? 'OpenAI向け補正: 章編集で短く圧縮しすぎない。入力内の出来事を濃くし、選択・発見・代償・関係変化を場面として残す。元の文章からディテール（具体的な対話、手の動き、沈黙の瞬間）を省略せずに繋ぎ合わせ、文章のボリュームを削らないこと。要約による文字数削減は厳禁です。'
      : 'Gemini向け補正: 説明で整えすぎず、会話・手の動き・沈黙の反応で人物の揺れを残す。',
    `最低文字数: ${minChars}字以上。これは上限ではなく採用下限。`,
    `推奨分量: ${targetChars}字前後。圧縮は重複削除で行い、章の選択・発見・代償・関係変化の場面は削らない。`,
    '文字数不足を避けるため、章の終盤には会話、動作、物の位置変化を1段落ずつ残す。',
    '終盤禁止: 「心の奥」「少しだけ和らいだ」「気がした」「余韻」「静かに朝が始まった」などの感情総括で閉じない。最後の一文は、人物の選択、手の動き、物の配置変化、扉や紙や灯りの状態で閉じる。',
    provider === 'gemini'
      ? 'Gemini追加補正: 「それは〜行為だった」「何を考えているのかは分からなかった。だが」「少なくとも、この瞬間は〜」「選択で終わった」「それが、自分にできること」「新しい始まり」のような優等生的な説明締めを削る。説明で意味を確定させず、物と沈黙と動作の配置で読ませる。感情は「感じた」「思った」「気がした」で処理せず、身体反応と行動に置き換える。'
      : 'OpenAI追加補正: 強い比喩や決め台詞で締めすぎず、入力内の出来事と物の位置変化を最後まで残す。',
    '',
    '編集目的',
    '- 反復圧縮: 同じ感情、同じ沈黙、同じ物の説明を削り、意味が進む箇所だけ残す。',
    '- 見せ場強化: この章でしか起きない選択、衝突、発見を一つはっきり読ませる。',
    '- 伏線回収: 物証や過去の言葉は説明でなく、人物が扱う動作として意味を変える。',
    '- 選択の明確化: 主人公が何を欲し、何を誤解し、何を知り、何を支払い、関係がどう動いたかを場面内で成立させる。',
    '- 次章への前進: 前章と同じ感情を繰り返さず、必ず一段先の状態で終える。',
    '- 章固有の見せ場: この章でしか起きない見せ場を1つ明確に残す。削らない。',
    '- 関係位置の変化: 章頭と章末で関係の位置が変わっていない場合は修正する。',
    '- 小物反復の制限: 小物の反復は、意味が変わる箇所だけ残す。同じ扱いの反復は削る。',
    '- 章末の差別化: 章末が「机の上に残った」「封筒が置かれた」系に寄りすぎないよう、章ごとの物理的変化を差別化する。',
    '- 行動で見せる: 主人公が何を選んだかを、説明ではなく行動で見せる。',
    '',
    '章の役割',
    `- 章: ${chapter.num}`,
    `- ゴール: ${role.goal || ''}`,
    `- 欲望: ${role.desire || ''}`,
    `- 誤解: ${role.misconception || ''}`,
    `- 発見: ${role.discovery || ''}`,
    `- 代償: ${role.cost || ''}`,
    `- 関係変化: ${role.relationshipShift || ''}`,
    `- 見せ場: ${role.showcase || ''}`,
    `- 不可逆変化: ${role.irreversibleChange || ''}`,
    `- 次の問い: ${role.nextQuestion || ''}`,
    `- 避ける反復: ${role.avoidEmotion || ''}`,
    `- 新情報: ${role.newInformation || ''}`,
    `- 不可逆行動: ${role.irreversibleAction || ''}`,
    `- 関係の前後差: ${role.relationshipDelta || ''}`,
    `- 小物状態変化: ${role.objectStateChange || ''}`,
    `- 場所移動圧: ${role.sceneVenueShift || ''}`,
    `- 次章を読む理由: ${role.readerHook || ''}`,
    '',
    'Story Bible制約',
    `- 使用できる人物名: ${allowedNames.join(' / ')}`,
    `- 既定事実: ${(bible.facts || []).map(fact => fact.text).join(' / ')}`,
    `- 未解決の問い: ${(bible.openThreads || []).map(thread => thread.text).join(' / ')}`,
    '',
    previousChapterNotes.length ? '前章までの進行メモ' : '',
    ...previousChapterNotes.map(note => `- ${note}`),
    '',
    '再編集ルール',
    '- 章本文の出来事は大きく捨てない。ただし重複した説明や似た心理は圧縮する。',
    '- 章本文の感情表現を「思った」「感じた」等の抽象的な説明語でまとめず、元の各シーンにあった具体的な動作、対話、身体反応による描写（Show, Don\'t Tell）をそのまま維持すること。',
    '- 安易なハッピーエンド調のまとめや、大袈裟な決め台詞による結末で閉じず、物語の葛藤や緊張感を保持したまま次の章に繋げること。コメディ的なギャグ表現は一切禁止。',
    '- 新しい主要人物名、地名、組織名、商品名、ブランド名を増やさない。',
    '- 漫画・脚本・メモ用の形式ラベルがあれば、通常の小説本文に直してから出力する。',
    '- 章の最後は抽象語でまとめず、具体的な会話・動作・物の位置変化で閉じる。',
    '- AIらしい「つまり」「これは」「彼らは理解した」型の説明で締めない。',
    '- 短くしすぎない。章として読める密度と場面の連続性を保つ。',
    `- attempt: ${attempt}`,
    '',
    '編集前の章本文',
    chapterText,
  ].filter(line => line !== '').join('\n');
}

export function buildChapterEditorialRepairPrompt({ draft, issues, chapter, priorPrompt }) {
  const minChars = minimumCharsForChapter(chapter);
  const currentChars = countChars(draft);
  const issueText = (issues || [])
    .map(issue => `- ${issue.code}: ${issue.message}`)
    .join('\n');
  return [
    '次の章本文はローカル検査を通りませんでした。本文だけの形でもう一度再編集してください。',
    '見出し、章番号、箇条書き、講評、修正メモ、JSON、Markdownは禁止。Created By などのフッターも禁止。',
    '漫画・脚本・メモ形式のラベルは禁止。「絵/状況:」「セリフ:」「1コマ目:」「ト書き:」「狙い:」などは通常の小説本文に変換してください。',
    '短くせず、章の欲望、誤解、発見、代償、関係変化を場面内で成立させてください。要約による文字数の大幅な削減は厳禁です。',
    '',
    '検査エラー',
    issueText || '- local validation failed',
    '',
    '修復必須条件',
    `- 文字数不足の場合は最低 ${minChars}字以上に戻す。現在は ${currentChars}字。元の各シーンに含まれていた対話、身体反応、心理描写、小物のやり取りをできるだけ多く残すことで、十分な文字数を確保してください。`,
    '- 章編集で短く崩れる場合は、前回の編集指示に含まれる編集前の章本文を土台に戻し、そこからラベル除去・重複圧縮・接続補強だけを行う。要約で再構成しない。',
    '- シーンごとの出来事、会話、選択、代償を削らず、章としてつなぎ直す。短い講評文・あらすじ文への置換は禁止。',
    '- 不足分は説明の水増しではなく、会話、手の動き、物の位置、沈黙の反応、選択後の代償の具体化で補う。',
    '- 形式ラベルを削るだけで短くしない。ラベルが担っていた状況は地の文に、セリフは自然な会話文に置き換える。',
    '- 終盤は「心の奥」「少しだけ和らいだ」「気がした」「余韻」「静かに朝が始まった」などの感情総括で閉じず、人物の選択、手の動き、物の配置変化で閉じる。',
    '- 「それは〜行為だった」「何を考えているのかは分からなかった。だが」「少なくとも、この瞬間は〜」「選択で終わった」「それが、自分にできること」「新しい始まり」の説明締めも削り、具体物と動作に置き換える。',
    '',
    `対象章: ${chapter?.num || ''}`,
    '',
    '前回の編集指示',
    priorPrompt,
    '',
    '不合格の章本文',
    draft,
  ].join('\n');
}

export function validationContextForChapter(chapter, bible) {
  return {
    minChars: minimumCharsForChapter(chapter),
    bible,
    allowedNames: allowedNamesForScene(bible, {}),
    chapterEdit: true,
    isFinalChapter: Boolean(chapter?.isFinal),
    validationPosition: chapter?.isFinal ? 'chapter_edit_final' : 'chapter_edit',
  };
}

export function validateChapterDraft(text, context = {}) {
  const validation = validateSceneDraft(text, context);
  const issues = [...(validation.issues || [])];
  const charCount = countChars(text);
  const paragraphCount = String(text || '').split(/\n{2,}/).filter(Boolean).length;
  const roleSignalCount = countRoleSignals(text);

  if (paragraphCount < 6 && charCount >= 900) {
    issues.push({
      code: 'chapter_paragraph_thin',
      severity: 'warning',
      message: '章としての段落展開が薄い可能性があります。',
    });
  }
  if (roleSignalCount < 2 && charCount >= 1200) {
    issues.push({
      code: 'chapter_role_weak',
      severity: 'warning',
      message: '章の欲望・発見・代償・関係変化が弱い可能性があります。',
      roleSignalCount,
    });
  }

  const severity = summarizeIssueSeverities(issues);
  return {
    ...validation,
    ok: severity.ok,
    fatal: severity.fatal,
    repairRequired: severity.repairRequired,
    issues,
    metrics: {
      ...(validation.metrics || {}),
      charCount,
      paragraphCount,
      roleSignalCount,
    },
  };
}

function countRoleSignals(text) {
  const source = String(text || '');
  const patterns = [
    /欲し|望ん|守りたい|戻りたい|知りたい|確かめ/,
    /思い込|誤解|違っ|間違/,
    /気づ|分か|知っ|見え|発見/,
    /代わりに|失っ|手放|払っ|犠牲|傷つ/,
    /距離|信頼|並ん|離れ|近づ|関係/,
    /選ん|決め|受け入れ|置い|返し|書い/,
  ];
  return patterns.reduce((total, pattern) => total + (pattern.test(source) ? 1 : 0), 0);
}
