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
  { id: 'street', tokens: ['坂', '道', '橋', '川', '店', '通り', '路地'] },
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

const EPISODE_EVENT_CATEGORIES = [
  { id: 'discover', label: '発見', tokens: [/見つけ/u, /発見/u, /気づ/u, /拾/u, /現れ/u, /浮かび/u, /残され/u] },
  { id: 'consult', label: '相談', tokens: [/相談/u, /話し合/u, /語り合/u, /打ち合わせ/u, /問いかけ/u, /尋ね/u] },
  { id: 'decide', label: '決意', tokens: [/決め/u, /決意/u, /覚悟/u, /約束/u, /誓/u, /やろう/u, /しよう/u] },
  { id: 'move', label: '移動/到着', tokens: [/向か/u, /訪ね/u, /訪れ/u, /到着/u, /たどり着/u, /中へ/u, /足を運/u, /戻/u, /帰/u] },
  { id: 'investigate', label: '調査', tokens: [/探/u, /探索/u, /調べ/u, /見回/u, /聞き込/u, /確かめ/u, /跡を追/u] },
  { id: 'act', label: '実行', tokens: [/試/u, /実行/u, /始め/u, /動き出/u, /取りかか/u, /作業/u, /準備/u, /進め/u, /片付/u] },
  { id: 'repair', label: '修復', tokens: [/直し/u, /直す/u, /修理/u, /修復/u, /繕/u, /補修/u] },
  { id: 'confront', label: '障壁/対立', tokens: [/立ちはだか/u, /阻/u, /反対/u, /止め/u, /責め/u, /言い放/u, /脅/u, /争/u, /交渉/u, /拒/u] },
  { id: 'obtain', label: '取得/証拠', tokens: [/受け取/u, /手に入/u, /預か/u, /渡され/u, /証言/u, /記録/u, /写真/u, /地図/u, /鍵/u] },
  { id: 'reveal', label: '判明', tokens: [/わか/u, /分か/u, /判明/u, /明か/u, /知っ/u, /思い出/u, /真相/u, /意味/u, /理由/u] },
  { id: 'present', label: '公開/実行', tokens: [/上映/u, /発表/u, /見せ/u, /披露/u, /公開/u, /集め/u, /拍手/u] },
  { id: 'resolve', label: '解決', tokens: [/解決/u, /救/u, /守/u, /残せ/u, /動き始め/u, /刻みはじめ/u, /終わ/u] },
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

function tokenMatches(sentence, token) {
  if (token instanceof RegExp) return token.test(sentence);
  return sentence.includes(token);
}

function eventLabel(id) {
  return EPISODE_EVENT_CATEGORIES.find(event => event.id === id)?.label || id;
}

export function extractEpisodeArc(text) {
  const body = stripChapterHeading(text);
  const arc = [];
  const seen = new Set();
  for (const sentence of splitSentences(body)) {
    for (const event of EPISODE_EVENT_CATEGORIES) {
      if (seen.has(event.id)) continue;
      if (!event.tokens.some(token => tokenMatches(sentence, token))) continue;
      seen.add(event.id);
      arc.push(event.id);
    }
  }
  return arc;
}

function extractEpisodeEventSequence(text) {
  const body = stripChapterHeading(text);
  const sequence = [];
  for (const sentence of splitSentences(body)) {
    for (const event of EPISODE_EVENT_CATEGORIES) {
      if (!event.tokens.some(token => tokenMatches(sentence, token))) continue;
      if (sequence[sequence.length - 1] === event.id) continue;
      sequence.push(event.id);
    }
  }
  return sequence;
}

function sameSequenceWindow(sequence, leftStart, rightStart, size) {
  for (let offset = 0; offset < size; offset += 1) {
    if (sequence[leftStart + offset] !== sequence[rightStart + offset]) return false;
  }
  return true;
}

function windowKey(events) {
  return [...new Set(events)].sort().join('|');
}

export function detectIntraChapterEventLoop(text) {
  const sequence = extractEpisodeEventSequence(text);
  if (charLength(stripChapterHeading(text)) < 240 || sequence.length < 12) {
    return { ok: true, sequence };
  }

  let best = null;
  const maxPatternSize = Math.min(10, Math.floor(sequence.length / 2));
  for (let size = maxPatternSize; size >= 4; size -= 1) {
    for (let start = 0; start + size * 2 <= sequence.length; start += 1) {
      const pattern = sequence.slice(start, start + size);
      if (new Set(pattern).size < Math.min(4, size)) continue;
      let count = 1;
      let cursor = start + size;
      while (cursor + size <= sequence.length && sameSequenceWindow(sequence, start, cursor, size)) {
        count += 1;
        cursor += size;
      }
      const strongLoop = count >= 3 || (count >= 2 && size >= 7);
      if (!strongLoop) continue;
      const weight = count * size;
      if (!best || weight > best.weight) {
        best = { start, size, count, pattern, weight };
      }
    }
  }

  const canonicalWindows = new Map();
  for (let size = Math.min(10, sequence.length); size >= 6; size -= 1) {
    for (let start = 0; start + size <= sequence.length; start += 1) {
      const pattern = sequence.slice(start, start + size);
      const unique = [...new Set(pattern)];
      if (unique.length < 6) continue;
      const key = windowKey(pattern);
      const entry = canonicalWindows.get(key) || { starts: [], pattern: unique, size };
      entry.starts.push(start);
      canonicalWindows.set(key, entry);
    }
  }
  for (const entry of canonicalWindows.values()) {
    const nonOverlappingStarts = [];
    for (const start of entry.starts) {
      const previous = nonOverlappingStarts[nonOverlappingStarts.length - 1];
      if (previous !== undefined && start < previous + entry.size) continue;
      nonOverlappingStarts.push(start);
    }
    const count = nonOverlappingStarts.length;
    if (count < 3) continue;
    if (!best || count * entry.size > best.weight) {
      best = {
        start: -1,
        size: entry.size,
        count,
        pattern: entry.pattern,
        weight: count * entry.size,
      };
    }
  }

  if (!best) return { ok: true, sequence };

  return {
    ok: false,
    reason: `章内で同じエピソード列を${best.count}回繰り返しています（${best.pattern.map(eventLabel).join(' → ')}）。`,
    sequence,
    repeatedPattern: best.pattern,
    repeatCount: best.count,
  };
}

function longestCommonSubsequenceLength(left, right) {
  if (!left.length || !right.length) return 0;
  const prev = Array(right.length + 1).fill(0);
  const curr = Array(right.length + 1).fill(0);
  for (let i = 1; i <= left.length; i += 1) {
    curr.fill(0);
    for (let j = 1; j <= right.length; j += 1) {
      curr[j] = left[i - 1] === right[j - 1]
        ? prev[j - 1] + 1
        : Math.max(prev[j], curr[j - 1]);
    }
    for (let j = 0; j <= right.length; j += 1) prev[j] = curr[j];
  }
  return prev[right.length];
}

export function detectEpisodeRetake(currentText, previousTexts = []) {
  const previous = (Array.isArray(previousTexts) ? previousTexts : [previousTexts]).filter(Boolean);
  if (!previous.length) return { ok: true };
  if (charLength(stripChapterHeading(currentText)) < 240) return { ok: true };

  const currentArc = extractEpisodeArc(currentText);
  if (currentArc.length < EPISODE_RETAKE_MIN_EVENTS) {
    return { ok: true, currentArc };
  }

  let best = {
    sharedCount: 0,
    currentRatio: 0,
    previousRatio: 0,
    lcsRatio: 0,
    previousArc: [],
    sharedEvents: [],
  };

  for (const prev of previous) {
    const previousArc = extractEpisodeArc(prev);
    if (previousArc.length < EPISODE_RETAKE_MIN_EVENTS) continue;
    const previousSet = new Set(previousArc);
    const sharedEvents = currentArc.filter(event => previousSet.has(event));
    const sharedCount = sharedEvents.length;
    const currentRatio = sharedCount / currentArc.length;
    const previousRatio = sharedCount / previousArc.length;
    const lcs = longestCommonSubsequenceLength(currentArc, previousArc);
    const lcsRatio = lcs / Math.min(currentArc.length, previousArc.length);
    const candidate = {
      sharedCount,
      currentRatio,
      previousRatio,
      lcsRatio,
      previousArc,
      sharedEvents,
    };
    if (
      candidate.sharedCount > best.sharedCount
      || candidate.lcsRatio > best.lcsRatio
      || (candidate.currentRatio + candidate.previousRatio) > (best.currentRatio + best.previousRatio)
    ) {
      best = candidate;
    }
  }

  const orderedRetake = best.sharedCount >= EPISODE_RETAKE_MIN_EVENTS
    && best.currentRatio >= EPISODE_RETAKE_SHARED_RATIO
    && best.previousRatio >= EPISODE_RETAKE_SHARED_RATIO
    && best.lcsRatio >= EPISODE_RETAKE_LCS_RATIO;
  const broadRetake = best.sharedCount >= EPISODE_RETAKE_BROAD_MIN_EVENTS
    && best.currentRatio >= EPISODE_RETAKE_BROAD_SHARED_RATIO
    && best.previousRatio >= EPISODE_RETAKE_BROAD_SHARED_RATIO;
  const isRetake = orderedRetake || broadRetake;

  if (!isRetake) {
    return { ok: true, currentArc, ...best };
  }

  return {
    ok: false,
    reason: `前章までと同じエピソード列を変奏しています（${best.sharedEvents.map(eventLabel).join(' → ')}）。`,
    currentArc,
    orderedRetake,
    broadRetake,
    ...best,
  };
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
const EPISODE_RETAKE_MIN_EVENTS = 4;
const EPISODE_RETAKE_SHARED_RATIO = 0.72;
const EPISODE_RETAKE_LCS_RATIO = 0.67;
const EPISODE_RETAKE_BROAD_MIN_EVENTS = 8;
const EPISODE_RETAKE_BROAD_SHARED_RATIO = 0.8;
const STORYBOARD_SEPARATOR = /^[\t \u3000]*(?:-{3,}|…{2,}|・・・|···)[\t \u3000]*$/u;
const STORYBOARD_LABEL = /^[\t \u3000]*【(?:追加本文|[^】]{0,80}長編化計画[^】]{0,80})】[\t \u3000]*$/u;
const STORYBOARD_STANDALONE_TITLE = /^[\t \u3000]*【(?![\t \u3000]*第[\d０-９一二三四五六七八九十百]+[\t \u3000]*章)(?![\t \u3000]*(?:追加本文|小説タイトル|タイトル|題名|作品名))[^】\n]{2,80}】[\t \u3000]*$/u;
const STORYBOARD_PANEL_LEAD = /^[\t \u3000]*(?:#{1,6}[\t \u3000]*)?(?:第?[\d０-９一二三四五六七八九十百]+[\t \u3000]*)?(?:コマ目|コマめ|カット)(?:の(?:後|あと|場面|続き)|では|から|、|に|で)?[\t \u3000、:：\-ー―]*/u;
const STORYBOARD_INLINE_SCRIPT_DIALOGUE = /[」』][\t \u3000]*(?!と|って|と、|と。)[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_・]{1,14}(?:[（(][^）)\n]{1,18}[）)])?[\t \u3000]*[「『]/u;
const STORYBOARD_SCRIPT_QUOTED_SPEAKER = /^[\t \u3000]*(?!第[\t \u3000]*[0-9０-９一二三四五六七八九十百]+[\t \u3000]*章(?:[\t \u3000:：\-ー―／/・]|$))[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}A-Za-z0-9_・]{1,14}(?:[（(][^）)\n]{1,18}[）)])?[\t \u3000]*[「『]/u;
const STORYBOARD_PROSE_CUE_PARTICLE_TAIL = /(?:は|が|も|を|に|へ|で|と|から|まで|より|、|。|[,.!?！？])$/u;
const STORYBOARD_SCENE_LOCATION = /(?:場所|背景|時刻|場面|朝|昼|夕方|夜|翌日|雨|雪|風|光|影|街|町|村|通り|路地|道路|橋|川|広場|公園|空き地|跡地|店|店先|店内|部屋|家|学校|駅|港|森|山|海|入口|出口|裏口|屋上|地下|階段|廊下|扉|窓|机|棚|床|壁|椅子|テーブル|カウンター|看板|鍵|地図|写真|札|紙|本|手紙|記録|箱|袋|工具|足元|路面|水たまり|軒下)/u;
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
  const episodeArc = extractEpisodeArc(chapterText);
  return [
    `【第${chapterNumber}章の確定（次章はこの後から始める）】`,
    `到達状態: ${clip(endingState, 120) || '（抽出不可）'}`,
    keySentences.length ? `この章の主な出来事:\n${keySentences.join('\n')}` : '',
    beats.length ? `使用済みビート(再演禁止): ${beats.join(' / ')}` : '',
    episodeArc.length ? `使用済みイベント列(同じ話のリテイク禁止): ${episodeArc.map(eventLabel).join(' → ')}` : '',
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
    const episodeRetake = detectEpisodeRetake(chapter, bodies.slice(0, index));
    if (!episodeRetake.ok) {
      blocking.push({ code: 'episode_retake', chapter: num, message: `第${num}章: ${episodeRetake.reason}` });
    }
  });

  return { ok: blocking.length === 0, blocking, warnings };
}
