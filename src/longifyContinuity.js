// Continuity / structural-integrity helpers for the long-novel (長編化β) pipeline.
//
// These are pure functions, intentionally dependency-free so they can be unit
// tested in isolation. They exist to kill four structural bugs that the prose
// pipeline could not see:
//   A. Re-enactment loops across chapters (no real story-state carried forward).
//   B. Setting drift (e.g. 小学/ランドセル vs 中学 contradictions).
//   C. Paraphrased duplication that exact-match overlap detection misses.
//   D. Token-limit truncation accepted as a finished chapter.

const TERMINAL_PUNCTUATION = /[。．.！!？?」』）)〕】…—–]$/u;

// Places are canonicalized so synonyms collapse to one location id.
const PLACE_CATEGORIES = [
  { id: 'bench', tokens: ['ベンチ'] },
  { id: 'park', tokens: ['公園', '広場', '砂場', '滑り台'] },
  { id: 'garbage', tokens: ['集積所', 'ごみ', 'ゴミ', '収集'] },
  { id: 'danchi', tokens: ['団地'] },
  { id: 'entrance', tokens: ['玄関', '靴箱', '下駄箱'] },
  { id: 'washroom', tokens: ['洗面', '台所'] },
  { id: 'corridor', tokens: ['廊下', '階段'] },
  { id: 'classroom', tokens: ['教室', '体育館', '校門', '正門', '掲示板'] },
  { id: 'station', tokens: ['駅'] },
  { id: 'window', tokens: ['窓', 'ベランダ'] },
  { id: 'desk', tokens: ['机'] },
  { id: 'street', tokens: ['坂', '道', '橋', '川', '店', 'コンビニ', '商店街'] },
];

// Actions are canonicalized so different conjugations (座り / 腰を / 座っ) map to
// the same beat. This is what lets paraphrased re-enactment be detected.
const ACTION_CATEGORIES = [
  { id: 'throw', tokens: ['投げ'] },
  { id: 'sit', tokens: ['座', '腰'] },
  { id: 'carry', tokens: ['運'] },
  { id: 'hold', tokens: ['握'] },
  { id: 'tie', tokens: ['結'] },
  { id: 'walk', tokens: ['歩'] },
  { id: 'pick', tokens: ['拾'] },
  { id: 'standup', tokens: ['立ち上が'] },
  { id: 'wave', tokens: ['振っ', '振り返', '振る', '手を振'] },
  { id: 'touch', tokens: ['触れ', '撫で'] },
  { id: 'hug', tokens: ['抱'] },
  { id: 'hand', tokens: ['渡'] },
  { id: 'put', tokens: ['置'] },
  { id: 'lookup', tokens: ['見上げ'] },
  { id: 'drink', tokens: ['飲'] },
  { id: 'run', tokens: ['走'] },
  { id: 'nod', tokens: ['頷'] },
];

// School-level invariant classes used for contradiction detection.
const SCHOOL_LEVELS = [
  {
    id: 'elementary',
    label: '小学',
    selfTokens: [/小学/u, /ランドセル/u],
    conflictTokens: [/中学/u, /高校/u, /高等学校/u, /大学/u],
  },
  {
    id: 'junior_high',
    label: '中学',
    selfTokens: [/中学/u],
    conflictTokens: [/ランドセル/u, /小学/u, /高校/u, /高等学校/u, /大学/u],
  },
  {
    id: 'high',
    label: '高校',
    selfTokens: [/高校/u, /高等学校/u],
    conflictTokens: [/ランドセル/u, /小学/u, /中学/u],
  },
];

function toStr(value) {
  return String(value == null ? '' : value);
}

function charLength(value) {
  return Array.from(toStr(value)).length;
}

function normalizeForShingle(value) {
  return toStr(value)
    .toLowerCase()
    .replace(/[、。！？!?.,;:「」『』（）()【】\[\]\s　"'“”‘’・…—–]/gu, '');
}

function stripChapterHeading(text) {
  const lines = toStr(text).replace(/\r\n?/g, '\n').split('\n');
  const firstIdx = lines.findIndex(line => line.trim());
  if (firstIdx >= 0 && /^[#＃]?\s*第\s*[\d０-９一二三四五六七八九十]+\s*章/u.test(lines[firstIdx].trim())) {
    lines.splice(firstIdx, 1);
  }
  return lines.join('\n').trim();
}

function splitSentences(text) {
  return toStr(text)
    .split(/[。！？!?.\n]+/u)
    .map(line => line.trim())
    .filter(Boolean);
}

/**
 * D. Truncation detection.
 * A chapter is "likely truncated" when the provider reported a length cap, or
 * when the body does not end on terminal punctuation (the observed failure was
 * a chapter ending mid-word: "「うーん」と考").
 */
export function isLikelyTruncated(bodyText, finishReason = '') {
  const fr = toStr(finishReason).toUpperCase();
  if (fr.includes('MAX_TOKEN') || fr === 'LENGTH') return true;
  const body = stripChapterHeading(bodyText).trimEnd();
  if (!body) return false;
  const tail = Array.from(body).slice(-1).join('');
  return !TERMINAL_PUNCTUATION.test(tail);
}

/**
 * C. Beat extraction: a "beat" is a place keyword co-occurring with an action
 * keyword in the same sentence (e.g. ベンチ|座っ, 集積所|運ん). Repeating the
 * same beats across chapters is the signature of a re-enactment loop even when
 * the wording differs.
 */
function sentenceHasAction(sentence) {
  return ACTION_CATEGORIES.some(action => action.tokens.some(token => sentence.includes(token)));
}

export function extractBeats(text) {
  const body = stripChapterHeading(text);
  const beats = new Set();
  for (const sentence of splitSentences(body)) {
    const places = PLACE_CATEGORIES
      .filter(place => place.tokens.some(token => sentence.includes(token)))
      .map(place => place.id);
    if (!places.length) continue;
    const actions = ACTION_CATEGORIES
      .filter(action => action.tokens.some(token => sentence.includes(token)))
      .map(action => action.id);
    for (const place of places) {
      for (const action of actions) {
        beats.add(`${place}|${action}`);
      }
    }
  }
  return [...beats];
}

function shingles(text, size = 4) {
  const normalized = normalizeForShingle(stripChapterHeading(text));
  const chars = Array.from(normalized);
  const set = new Set();
  if (chars.length < size) {
    if (chars.length) set.add(chars.join(''));
    return set;
  }
  for (let i = 0; i + size <= chars.length; i += 1) {
    set.add(chars.slice(i, i + size).join(''));
  }
  return set;
}

function intersectionSize(a, b) {
  let count = 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  for (const item of small) {
    if (large.has(item)) count += 1;
  }
  return count;
}

/**
 * Similarity between two texts using character 4-gram shingles.
 * Returns both Jaccard and containment (intersection / smaller set) so callers
 * can catch "chapter B re-tells a large part of chapter A" even when B is long.
 */
export function shingleSimilarity(textA, textB, size = 4) {
  const a = shingles(textA, size);
  const b = shingles(textB, size);
  if (!a.size || !b.size) return { jaccard: 0, containment: 0 };
  const inter = intersectionSize(a, b);
  const union = a.size + b.size - inter;
  const jaccard = union ? inter / union : 0;
  const containment = inter / Math.min(a.size, b.size);
  return { jaccard, containment };
}

const OVERLAP_JACCARD_THRESHOLD = 0.34;
const OVERLAP_CONTAINMENT_THRESHOLD = 0.5;
const OVERLAP_BEAT_THRESHOLD = 4;
const STORYBOARD_SEPARATOR = /^[\t \u3000]*(?:-{3,}|…{2,}|・・・|···)[\t \u3000]*$/u;
const STORYBOARD_LABEL = /^[\t \u3000]*【(?:追加本文|[^】]{0,80}長編化計画[^】]{0,80})】[\t \u3000]*$/u;
const STORYBOARD_STANDALONE_TITLE = /^[\t \u3000]*【(?![\t \u3000]*第[\d０-９一二三四五六七八九十百]+[\t \u3000]*章)(?![\t \u3000]*(?:追加本文|小説タイトル|タイトル|題名|作品名))[^】\n]{2,80}】[\t \u3000]*$/u;
const STORYBOARD_PANEL_LEAD = /^[\t \u3000]*(?:#{1,6}[\t \u3000]*)?(?:第?[\d０-９一二三四五六七八九十百]+[\t \u3000]*)?(?:コマ目|コマめ|カット)(?:の(?:後|あと|場面|続き)|では|から|、|に|で)?[\t \u3000、:：\-ー―]*/u;
const STORYBOARD_INLINE_SCRIPT_DIALOGUE = /[」』][\t \u3000]*(?!と|って|と、|と。)[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_・]{1,14}(?:[（(][^）)\n]{1,18}[）)])?[\t \u3000]*[「『]/u;
const STORYBOARD_SCRIPT_QUOTED_SPEAKER = /^[\t \u3000]*(?!第[\t \u3000]*[0-9０-９一二三四五六七八九十百]+[\t \u3000]*章(?:[\t \u3000:：\-ー―／/・]|$))[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_・]{1,14}(?:[（(][^）)\n]{1,18}[）)])?[\t \u3000]*[「『]/u;
const STORYBOARD_PROSE_CUE_PARTICLE_TAIL = /(?:は|が|も|を|に|へ|で|と|から|まで|より|、|。|[,.!?！？])$/u;
const STORYBOARD_SCENE_LOCATION = /(?:商店街|金物屋|喫茶店|カフェ|映画館|路地|通り|店内|店先|店の前|カウンター|パン屋|雑貨屋|空き地|跡地|裏口|翌朝|夕暮れ|深夜|夜|朝|雨上がり|路面|水たまり|シャッター)/u;
const STORYBOARD_SCENE_STAGE = /(?:背景に|背後に|窓の外|視線の先|手元に|足元|指先|場面|並んで|立つ|立っている|立ち止まる|歩く|座っている|囲んでいる|広げている|広げられている|照らしている|揺れている|残っている|現れる|手渡している|眺めている|見つめている|見守る|微笑む|手を振る|差し出す|覗き込む|映っている)/u;

function isDialogueOnlyLine(line) {
  return /^[「『][\s\S]{0,180}[」』]?[。！？!？」』]?[ \t\u3000]*$/u.test(toStr(line).trim());
}

function isInlineScriptDialogueLine(line) {
  return STORYBOARD_INLINE_SCRIPT_DIALOGUE.test(toStr(line).trim());
}

function isScriptQuotedSpeakerLine(line) {
  const trimmed = toStr(line).trim();
  if (!STORYBOARD_SCRIPT_QUOTED_SPEAKER.test(trimmed)) return false;
  const quoteIndices = ['「', '『'].map(quote => trimmed.indexOf(quote)).filter(index => index >= 0);
  const quoteIndex = quoteIndices.length ? Math.min(...quoteIndices) : -1;
  if (quoteIndex <= 0) return false;
  const cue = trimmed.slice(0, quoteIndex).replace(/[（(][^）)\n]{1,24}[）)]/gu, '').trim();
  return Boolean(cue && !STORYBOARD_PROSE_CUE_PARTICLE_TAIL.test(cue));
}

function isStoryboardDialogueLine(line) {
  return isDialogueOnlyLine(line) || isInlineScriptDialogueLine(line) || isScriptQuotedSpeakerLine(line);
}

function isStoryboardSceneCardLine(line) {
  const raw = toStr(line);
  const trimmed = raw.trim();
  if (!trimmed || /^第\s*[\d０-９一二三四五六七八九十百]+\s*章/u.test(trimmed)) return false;
  if (isStoryboardDialogueLine(trimmed)) return false;
  if (STORYBOARD_PANEL_LEAD.test(trimmed)) return true;
  const len = charLength(trimmed);
  if (len < 24 || len > 190) return false;
  if (!STORYBOARD_SCENE_LOCATION.test(trimmed) || !STORYBOARD_SCENE_STAGE.test(trimmed)) return false;
  return /[ \t\u3000]{2,}$/u.test(raw)
    || /(?:背景|背後|窓の外|視線|手元|足元|肩越し|カウンター越し|場面|淡い朝日|色褪せた|濡れた|雨上がり)/u.test(trimmed);
}

export function detectStoryboardResidue(text) {
  const lines = toStr(text).replace(/\r\n?/g, '\n').split('\n');
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index].trim();
    if (STORYBOARD_LABEL.test(trimmed)) {
      return { ok: false, reason: '追加本文ラベルまたは長編化計画が本文に残っています。' };
    }
    if (STORYBOARD_STANDALONE_TITLE.test(trimmed)) {
      return { ok: false, reason: '章中にタイトル再掲または別稿の開始行が残っています。' };
    }
    if (STORYBOARD_PANEL_LEAD.test(trimmed)) {
      return { ok: false, reason: '漫画コマ見出しが文中に残っています。' };
    }
    if (!/^第\s*[\d０-９一二三四五六七八九十百]+\s*章/u.test(trimmed)) continue;
    let nonEmpty = 0;
    let sceneCards = 0;
    let dialogueOnly = 0;
    let hardStoryboardSignals = 0;
    let lastStoryboardIndex = -1;
    for (let cursor = index + 1; cursor < lines.length && nonEmpty < 18; cursor += 1) {
      const current = lines[cursor].trim();
      if (!current) continue;
      if (/^第\s*[\d０-９一二三四五六七八九十百]+\s*章/u.test(current) && nonEmpty > 0) break;
      if (STORYBOARD_SEPARATOR.test(current)) {
        if (nonEmpty >= 4 && sceneCards >= 2 && dialogueOnly >= 2) {
          return { ok: false, reason: '章頭に4コマ/ネーム形式の情景カードが残っています。' };
        }
        break;
      }
      const isPanelLead = STORYBOARD_PANEL_LEAD.test(current);
      const isSceneCard = isStoryboardSceneCardLine(lines[cursor]);
      const isInlineScriptLine = isInlineScriptDialogueLine(lines[cursor]) || isScriptQuotedSpeakerLine(lines[cursor]);
      const isDialogueLine = isStoryboardDialogueLine(lines[cursor]);
      if (isSceneCard || isPanelLead) sceneCards += 1;
      if (isDialogueLine) dialogueOnly += 1;
      if (isPanelLead || isInlineScriptLine) hardStoryboardSignals += 1;
      if (isSceneCard || isPanelLead || isDialogueLine) {
        lastStoryboardIndex = cursor;
      } else if (lastStoryboardIndex >= 0 && nonEmpty >= 4 && sceneCards >= 2 && dialogueOnly >= 2 && hardStoryboardSignals >= 1) {
        return { ok: false, reason: '章頭に4コマ/ネーム形式の情景カードが残っています。' };
      }
      nonEmpty += 1;
    }
    if (lastStoryboardIndex >= 0 && nonEmpty >= 4 && sceneCards >= 2 && dialogueOnly >= 2 && hardStoryboardSignals >= 1) {
      return { ok: false, reason: '章頭に4コマ/ネーム形式の情景カードが残っています。' };
    }
  }
  return { ok: true };
}

/**
 * C. Paraphrase-aware overlap detection across previous chapters.
 * Complements the existing exact-match detector; flags semantic re-enactment.
 */
export function detectParaphrasedOverlap(currentText, previousTexts = [], { useShingle = true } = {}) {
  const previous = (Array.isArray(previousTexts) ? previousTexts : [previousTexts]).filter(Boolean);
  if (!previous.length) return { ok: true };
  if (charLength(stripChapterHeading(currentText)) < 240) return { ok: true };

  let maxJaccard = 0;
  let maxContainment = 0;
  if (useShingle) {
    for (const prev of previous) {
      const { jaccard, containment } = shingleSimilarity(currentText, prev);
      if (jaccard > maxJaccard) maxJaccard = jaccard;
      if (containment > maxContainment) maxContainment = containment;
    }
  }

  const currentBeats = new Set(extractBeats(currentText));
  const previousBeats = new Set();
  previous.forEach(prev => extractBeats(prev).forEach(beat => previousBeats.add(beat)));
  let beatOverlap = 0;
  for (const beat of currentBeats) {
    if (previousBeats.has(beat)) beatOverlap += 1;
  }

  const overlaps = maxJaccard >= OVERLAP_JACCARD_THRESHOLD
    || maxContainment >= OVERLAP_CONTAINMENT_THRESHOLD
    || beatOverlap >= OVERLAP_BEAT_THRESHOLD;
  if (!overlaps) return { ok: true, maxJaccard, maxContainment, beatOverlap };
  return {
    ok: false,
    reason: `既存章と内容が重複しています（言い換え再演の疑い: 類似度${maxJaccard.toFixed(2)} / 包含${maxContainment.toFixed(2)} / 反復ビート${beatOverlap}）。`,
    maxJaccard,
    maxContainment,
    beatOverlap,
  };
}

/**
 * B. Parse frozen invariants out of the fixed ledger text.
 */
export function extractInvariants(ledgerText) {
  const text = toStr(ledgerText);
  const grab = labels => {
    for (const label of labels) {
      const match = text.match(new RegExp(`${label}\\s*[:：]\\s*([^\\n]+)`, 'u'));
      if (match && match[1].trim()) return match[1].trim();
    }
    return '';
  };
  const gradeRaw = grab(['学年', '学年/年齢', '学年・年齢', '年齢/学年']);
  const invariants = {
    grade: gradeRaw,
    age: grab(['年齢']),
    era: grab(['時代', '時代/季節', '時代・季節']),
    season: grab(['季節']),
    raw: text,
  };
  invariants.schoolLevel = classifySchoolLevel(`${gradeRaw} ${invariants.age}`);
  return invariants;
}

function classifySchoolLevel(text) {
  const source = toStr(text);
  for (const level of SCHOOL_LEVELS) {
    if (level.selfTokens.some(token => token.test(source))) return level.id;
  }
  return '';
}

/**
 * B. Deterministic contradiction check between a chapter and the frozen
 * school-level invariant.
 */
export function detectSettingContradiction(text, invariants = {}) {
  const body = stripChapterHeading(text);
  const levelId = invariants.schoolLevel || classifySchoolLevel(invariants.grade || '');
  if (!levelId) return { ok: true };
  const level = SCHOOL_LEVELS.find(item => item.id === levelId);
  if (!level) return { ok: true };
  const conflicts = level.conflictTokens
    .map(token => (body.match(token) || [])[0])
    .filter(Boolean);
  if (!conflicts.length) return { ok: true };
  return {
    ok: false,
    reason: `不変設定（${level.label}）と矛盾する語が本文にあります: ${[...new Set(conflicts)].join(' / ')}`,
    level: level.id,
    conflicts: [...new Set(conflicts)],
  };
}

/**
 * A. Build a REAL continuity digest from a chapter body (replaces the old
 * boilerplate that carried no actual story state forward).
 */
export function buildContinuityDigest(chapterText, chapterNumber) {
  const body = stripChapterHeading(chapterText);
  const sentences = splitSentences(body);
  const endingState = sentences.slice(-2).join('。').trim();
  const keySentences = sentences
    .filter(sentence => /[「『]/u.test(sentence) || sentenceHasAction(sentence))
    .slice(-4)
    .map(sentence => `・${clip(sentence, 60)}`);
  const beats = extractBeats(chapterText);
  return [
    `【第${chapterNumber}章の確定（次章はこの後から始める）】`,
    `到達状態: ${clip(endingState, 120) || '（抽出不可）'}`,
    keySentences.length ? `この章の主な出来事:\n${keySentences.join('\n')}` : '',
    beats.length ? `使用済みビート(再演禁止): ${beats.join(' / ')}` : '',
  ].filter(Boolean).join('\n');
}

/**
 * A. Render the accumulated per-chapter digests into the prompt's
 * "前章までの接続メモ" slot. Recent chapters are kept in full; older ones are
 * compressed to their 到達状態 line to stay within a token budget.
 */
export function renderRollingMemo(digests = [], { fullCount = 2, maxChars = 2000 } = {}) {
  const list = (digests || []).filter(Boolean);
  if (!list.length) return '';
  const recent = list.slice(-fullCount);
  const older = list.slice(0, Math.max(0, list.length - fullCount));
  const olderLines = older.map(digest => {
    const header = (digest.match(/【第\d+章[^】]*】/u) || [])[0] || '';
    const reached = (digest.match(/到達状態:\s*([^\n]+)/u) || [])[1] || '';
    return `${header} ${clip(reached, 80)}`.trim();
  });
  const out = [...olderLines, ...recent].join('\n\n');
  return clip(out, maxChars);
}

function clip(value, max) {
  const chars = Array.from(toStr(value));
  if (chars.length <= max) return chars.join('');
  return `${chars.slice(0, max).join('')}…`;
}

/**
 * E. Whole-manuscript structural audit. Pure, deterministic; intended to run
 * before/alongside the literary critique so structural breakage cannot be
 * scored as a strength.
 */
export function auditLongifyStructure({ chapters = [], invariants = {} } = {}) {
  const bodies = (chapters || []).map(toStr).filter(Boolean);
  const blocking = [];
  const warnings = [];

  bodies.forEach((chapter, index) => {
    const num = index + 1;
    if (isLikelyTruncated(chapter)) {
      blocking.push({ code: 'truncated', chapter: num, message: `第${num}章が途中で切れています（終止記号で終わっていません）。` });
    }
    const storyboardResidue = detectStoryboardResidue(chapter);
    if (!storyboardResidue.ok) {
      blocking.push({ code: 'storyboard_residue', chapter: num, message: `第${num}章: ${storyboardResidue.reason}` });
    }
    const contradiction = detectSettingContradiction(chapter, invariants);
    if (!contradiction.ok) {
      blocking.push({ code: 'setting_contradiction', chapter: num, message: `第${num}章: ${contradiction.reason}` });
    }
    const overlap = detectParaphrasedOverlap(chapter, bodies.slice(0, index));
    if (!overlap.ok) {
      blocking.push({ code: 'chapter_loop', chapter: num, message: `第${num}章: ${overlap.reason}` });
    }
  });

  return { ok: blocking.length === 0, blocking, warnings };
}
