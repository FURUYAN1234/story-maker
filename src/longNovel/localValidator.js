import { resolveIssueSeverity, summarizeIssueSeverities, validationPosition } from './severityPolicy.js';
import { findFormulaicEnding, findLexicalOveruse, findSpeakerPronounIssue } from './literaryQualityGuards.js';

const META_LEAK_PATTERNS = [
  /```/,
  /^\s*(?:JSON|markdown|出力|本文|解説|修正|要約|チェックリスト|プロンプト)\s*[:：]/im,
  /^\s*(?:第\s*\d+\s*章|シーン\s*\d+|Scene\s*\d+|Beat\s*\d+|起|承|転|結)\s*[:：]/im,
  /(?:AI|アシスタント|モデル|生成|回答|申し訳|できません|以下の|こちらが|このシーンでは)/i,
  /Created\s+By\s+AI\s+Story\s+Maker/i,
];

const PLACEHOLDER_PATTERNS = [
  /(?:人物|場所|品物|資料|小物|出来事|事件)[A-ZＡ-Ｚ]/,
  /(?:○○|□□|××|未定|仮名|名前未設定|TBD)/i,
];

const STRUCTURED_FORMAT_LABEL_PATTERNS = [
  /^\s*(?:絵\/状況|絵|状況|セリフ|台詞|ナレーション|モノローグ|ト書き|演出|狙い|SFX|SE|BGM)\s*[:：]/im,
  /^\s*(?:[1-4１-４]\s*コマ目?|第?\s*[1-4１-４]\s*コマ)\s*(?:[（(][^）)]*[）)])?\s*[:：]/im,
  /^\s*(?:タイトル|登場人物|場所|目的|オチ|起|承|転|結)\s*[:：]/im,
];

const COMMON_FAMILY_NAMES = [
  '佐藤', '鈴木', '高橋', '田中', '伊藤', '渡辺', '山本', '中村', '小林', '加藤',
  '吉田', '山田', '佐々木', '山口', '松本', '井上', '木村', '林', '斎藤', '清水',
  '山崎', '森', '池田', '橋本', '阿部', '石川', '山下', '中島', '石井', '小川',
];

const GENERIC_NAME_WORDS = new Set([
  '主人公', '相手', '仲間', '先輩', '後輩', '同僚', '担当者', '責任者', '職員',
  '参加者', '利用者', '店員', '客', '母', '父', '兄', '姉', '弟', '妹',
]);

export function validateSceneDraft(text, context = {}) {
  const source = normalizeText(text);
  const minChars = Math.max(0, Number(context.minChars || context.targetChars?.[0] || 0));
  const issues = [];
  const charCount = countChars(source);

  const add = (code, severity, message, extra = {}) => {
    issues.push({ code, severity: resolveIssueSeverity(code, context, severity), message, ...extra });
  };

  if (!source.trim()) {
    add('empty', 'fatal', '本文が空です。');
  }

  if (minChars && charCount < Math.floor(minChars * 0.85)) {
    add('length_short', 'fatal', `本文が短すぎます (${charCount}/${minChars}字)。`, { charCount, minChars });
  }

  if (META_LEAK_PATTERNS.some(pattern => pattern.test(source))) {
    add('meta_leak', 'fatal', '本文外の説明、見出し、内部メモ、AI弁解文が混入しています。');
  }

  if (PLACEHOLDER_PATTERNS.some(pattern => pattern.test(source))) {
    add('placeholder', 'fatal', '未確定の仮名、カテゴリ名、プレースホルダーが本文に残っています。');
  }

  const formatLabel = findStructuredFormatLabel(source);
  if (formatLabel) {
    add('format_label_leak', 'fatal', '小説本文ではなく、漫画・脚本・メモ用の形式ラベルが本文に混入しています。', { label: formatLabel });
  }

  const bracketIssue = findBracketIssue(source);
  if (bracketIssue) {
    add('broken_punctuation', 'fatal', bracketIssue);
  }

  const repeated = findRepeatedParagraph(source);
  if (repeated) {
    add('repetition', 'fatal', '同一または極端に近い段落の反復があります。', { repeated });
  }

  if (hasAbstractSummaryEnding(source)) {
    add('abstract_summary_ending', 'fatal', '末尾が抽象的な総括で閉じています。最後は会話、動作、物の変化で閉じてください。');
  }

  if (hasClicheClosureEnding(source)) {
    add('cliche_closure_ending', 'fatal', '終盤が常套的な感情総括で閉じています。最後は人物の選択、動作、物の配置変化で閉じてください。');
  }

  const offBibleNames = findOffBibleNames(source, context.allowedNames || []);
  if (offBibleNames.length) {
    add('off_bible_name', 'fatal', 'Story Bibleの許可リスト外の固有名詞が出ています。', { names: offBibleNames });
  }

  const pronounIssue = findSpeakerPronounIssue(source, context.bible || context.storyBible || {});
  if (pronounIssue) {
    add('voice_pronoun_mismatch', 'fatal', 'Character dialogue uses a first-person pronoun forbidden by that character voice profile.', pronounIssue);
  }

  const lexicalOveruse = findLexicalOveruse(source, { minChars: context.finalPolish || context.chapterEdit ? 900 : 1800 });
  if (lexicalOveruse.length) {
    add('lexical_overuse', 'repair', 'The draft overuses low-information motion or atmosphere words and needs concrete variation.', { terms: lexicalOveruse });
  }

  const formulaicEnding = findFormulaicEnding(source);
  if ((context.chapterEdit || context.finalPolish || context.isChapterFinal) && formulaicEnding) {
    add('chapter_ending_formula', 'repair', 'The chapter ending leans on repeated static motion or atmosphere instead of a distinct physical turn.', formulaicEnding);
  }

  const concreteScore = scoreConcreteTexture(source);
  if (concreteScore < 3 && charCount >= 400) {
    add('thin_texture', 'fatal', '会話、身体反応、具体物の動きが少なく、場面のディテール（手触り）が弱いです。', { concreteScore });
  }
  const styleMetrics = measureStyleMetrics(source);
  if (styleMetrics.explanatoryDensity > 0.25 && charCount >= 400) {
    add('explanatory_density', 'warning', '説明調の文末が多く、場面の身体感・会話・物の動きに置き換える余地があります。', {
      explanatoryDensity: styleMetrics.explanatoryDensity,
    });
  }
  if (styleMetrics.emotionNamingRate > 0.2 && charCount >= 400) {
    add('emotion_naming_rate', 'warning', '感情名で処理している箇所が多く、身体反応や行動へ置き換える余地があります。', {
      emotionNamingRate: styleMetrics.emotionNamingRate,
    });
  }
  if ((styleMetrics.dialogueRatio < 0.15 || styleMetrics.dialogueRatio > 0.55) && charCount >= 600) {
    add('dialogue_ratio', 'warning', '会話量の偏りがあります。章編集で地の文・会話・沈黙のバランスを整えてください。', {
      dialogueRatio: styleMetrics.dialogueRatio,
    });
  }

  const severity = summarizeIssueSeverities(issues);
  return {
    ok: severity.ok,
    fatal: severity.fatal,
    repairRequired: severity.repairRequired,
    issues,
    metrics: {
      charCount,
      minChars,
      validationPosition: validationPosition(context),
      concreteScore,
      ...styleMetrics,
      dialogueCount: countMatches(source, /「[^」]{2,}」/g),
      paragraphCount: source.split(/\n{2,}/).filter(Boolean).length,
    },
  };
}

export function normalizeText(text) {
  return String(text || '')
    .replace(/\r\n?/g, '\n')
    .replace(/\u00a0/g, ' ')
    .trim();
}

export function countChars(text) {
  return normalizeText(text).replace(/\s/g, '').length;
}

export function findOffBibleNames(text, allowedNames = []) {
  const allowed = new Set(
    allowedNames
      .flatMap(name => [name, String(name || '').replace(/[さん君ちゃん様]/g, '')])
      .filter(Boolean)
  );
  const found = new Set();
  const namePattern = new RegExp(`(?:${COMMON_FAMILY_NAMES.join('|')})[一-龯]{1,3}(?:さん|君|ちゃん|様)?`, 'g');
  for (const match of normalizeText(text).matchAll(namePattern)) {
    const raw = match[0];
    const base = raw.replace(/[さん君ちゃん様]$/g, '');
    if (GENERIC_NAME_WORDS.has(base)) continue;
    if (!allowed.has(raw) && !allowed.has(base)) found.add(raw);
  }
  return [...found];
}

function findBracketIssue(text) {
  const pairs = [
    ['「', '」'],
    ['『', '』'],
    ['（', '）'],
    ['(', ')'],
  ];
  for (const [open, close] of pairs) {
    if (countMatches(text, new RegExp(escapeRegExp(open), 'g')) !== countMatches(text, new RegExp(escapeRegExp(close), 'g'))) {
      return `括弧または会話記号が閉じていません (${open}${close})。`;
    }
  }
  return '';
}

function findRepeatedParagraph(text) {
  const seen = new Map();
  for (const paragraph of normalizeText(text).split(/\n{2,}/)) {
    const key = paragraph.replace(/\s/g, '').slice(0, 80);
    if (key.length < 28) continue;
    const count = (seen.get(key) || 0) + 1;
    seen.set(key, count);
    if (count >= 2) return paragraph.slice(0, 80);
  }
  return '';
}

function findStructuredFormatLabel(text) {
  const source = normalizeText(text);
  for (const pattern of STRUCTURED_FORMAT_LABEL_PATTERNS) {
    const match = source.match(pattern);
    if (match) return match[0].trim().slice(0, 80);
  }
  return '';
}

function hasAbstractSummaryEnding(text) {
  const tail = normalizeText(text).slice(-240);
  if (!tail) return false;
  const abstractHits = countMatches(tail, /(関係|未来|一歩|始まり|希望|不安|確か|元通り|完全|新しい|ここから|これから)/g);
  const concreteTail = tail.slice(-90);
  const concreteHits = countMatches(concreteTail, /(「[^」]{2,}」|手|指|目|息|声|足|封筒|ノート|紙|扉|窓|机|置いた|開いた|閉じた|渡した|書いた|笑った|頷いた|歩いた|止まった)/g);
  return abstractHits >= 3 && concreteHits === 0;
}

function hasClicheClosureEnding(text) {
  const tail = normalizeText(text).slice(-320);
  if (!tail) return false;
  const softTail = tail.slice(-180);
  const hardTail = tail.slice(-120);
  const concreteTail = tail.slice(-140);
  const clicheHits = countMatches(softTail, /(心の奥.*気がした|痛みが.*和らいだ.*気がした|言葉は軽くなるような気がした|余韻|静かに朝が始まった|新しい朝|新しい始まり|新たな一歩|未来へ|これから始まる|始まりを告げ|何を考えているのかは分からなかった。だが|少なくとも.*この瞬間|選択で終わった|それは.*行為だった|それが、自分にできること|今、この瞬間にできること)/g);
  const hardClicheHits = countMatches(hardTail, /(新しい朝|新しい始まり|新たな一歩|未来へ|これから始まる|始まりを告げ|誰かの返事を待つ必要もなかった|もう.*必要はなかった|もう.*必要はない)/g);
  const concreteHits = countMatches(concreteTail, /(置いた|閉じた|戻した|折った|渡した|拾った|破った|しまった|歩き出した|立ち止まった|書いた|消した|開けた|鍵|封筒|ノート|紙|灯り|椅子|机|扉|「[^」]{2,}」|手|指|声|足)/g);
  if (hardClicheHits >= 1 && concreteHits === 0) return true;
  return clicheHits >= 2 || (clicheHits >= 1 && concreteHits === 0);
}

function scoreConcreteTexture(text) {
  const source = normalizeText(text);
  let score = 0;
  if (/「[^」]{2,}」/.test(source)) score++;
  if (/(手|指|目|肩|息|声|足|胸|喉|背中|視線|表情)/.test(source)) score++;
  if (/(紙|鍵|封筒|ノート|机|椅子|扉|窓|灯|時計|鞄|端末|写真|資料)/.test(source)) score++;
  if (/(置いた|拾った|開いた|閉じた|渡した|触れた|見上げた|振り返った|歩いた|止まった)/.test(source)) score++;
  return score;
}

function measureStyleMetrics(text) {
  const source = normalizeText(text);
  const sentences = source.split(/[。！？!?]\s*/).filter(Boolean);
  const sentenceCount = Math.max(1, sentences.length);
  const explanatoryCount = sentences.filter(sentence => /(だった|なのだ|のである|ということ|つまり|要するに|感じた|思った|気がした|理解した)$/.test(sentence.trim())).length;
  const emotionNamingCount = countMatches(source, /(悲し|嬉し|不安|怒り|後悔|恐怖|安心|寂し|切な|希望|絶望|戸惑|痛み|苦し)/g);
  const dialogueChars = [...source.matchAll(/「([^」]{2,})」/g)].reduce((total, match) => total + countChars(match[1]), 0);
  const totalChars = Math.max(1, countChars(source));
  const lengths = sentences.map(sentence => countChars(sentence)).filter(length => length > 0);
  const average = lengths.reduce((total, length) => total + length, 0) / Math.max(1, lengths.length);
  const variance = lengths.reduce((total, length) => total + ((length - average) ** 2), 0) / Math.max(1, lengths.length);
  return {
    explanatoryDensity: explanatoryCount / sentenceCount,
    emotionNamingRate: emotionNamingCount / sentenceCount,
    dialogueRatio: dialogueChars / totalChars,
    sentenceLengthCv: average ? Math.sqrt(variance) / average : 0,
  };
}

function countMatches(text, pattern) {
  return [...String(text || '').matchAll(pattern)].length;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
