// Story Maker v5.0.2 public output cleanup.
// Mode-scoped final formatting only: remove artifacts, preserve story content.

import {
  MODE_LENGTH_TARGETS,
  PUBLIC_MODE_VALUES,
  detectModeFromText,
} from './modeContracts.js';
import { STORY_MAKER_FOOTER } from './version.js';

const MODE_MAX_CHARS = Object.fromEntries(
  Object.entries(MODE_LENGTH_TARGETS)
    .filter(([, spec]) => Number(spec.cleanupMax) > 0)
    .map(([mode, spec]) => [mode, spec.cleanupMax]),
);

const FOOTER_TEXT = STORY_MAKER_FOOTER;
const FOOTER_PATTERN = /\n*\s*(?:Generated|Created)\s+By\s+AI\s+Story\s+Maker\s+V[\d.]+\.?\s*$/i;
const TOOL_NAME_PATTERN = /AI\s*Story\s*Maker|Story\s*Maker|ストーリーメーカー|物語メーカー|生成ツール|作成ツール|ChatGPT|Gemini|OpenAI/i;
const NARRATIVE_RESTART_MODES = new Set(['short_short', 'novel', 'medium', 'long_10000', 'fairy']);
const TITLE_LABEL_PATTERN = '\\u30bf\\u30a4\\u30c8\\u30eb';
const TITLE_SEPARATOR_PATTERN = '[:\\uff1a]';
const TITLE_LINE_PATTERN = `${TITLE_LABEL_PATTERN}\\s*${TITLE_SEPARATOR_PATTERN}`;
const TITLE_CHOICE_MARKER_PATTERN = '(?:[\\(\\uff08][^\\)\\uff09\\n]{1,8}[\\)\\uff09]\\s*)?';
const TITLE_TRAILING_PREFIX_PATTERN = `(?:\\n+\\s*|\\s+|(?<=[\\u3002\\uff01\\uff1f!?\\.]))${TITLE_CHOICE_MARKER_PATTERN}`;
const SENTENCE_END_PATTERN = /[\u3002\uff01\uff1f!?\u300d\u300f\uff09\)]$/u;
const SENTENCE_TAIL_PATTERN = /[\u3040-\u30ff\u3400-\u9fff\u3005\u30fcA-Za-z0-9]$/u;

function charLength(text) {
  return Array.from(String(text || '')).length;
}

function currentMode() {
  const active = document.querySelector('#mode-chips button.active');
  const activeValue = active?.dataset?.v || '';
  if (PUBLIC_MODE_VALUES.includes(activeValue)) return activeValue;
  return detectModeFromText([
    active?.textContent,
    document.getElementById('mode-custom')?.value,
  ].filter(Boolean).join(' '));
}

function stripInternalLead(text) {
  let next = String(text || '');
  next = next.replace(/^【[^】]{0,80}(?:本文|配置|接続詞|リズム|注意)[^】]{0,80}】\s*/u, '');
  next = next.replace(/^(?:余計な接続詞|リズムに緩急|人間臭さを出すため|タイトルは禁止|本文は)[^\n]{0,160}\n+/u, '');
  return next;
}

function normalizeBreaks(text) {
  return String(text || '')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function stripPublicArtifacts(text) {
  return normalizeBreaks(stripInternalLead(text)
    .replace(/<thought>[\s\S]*?<\/thought>/gi, '')
    .replace(/<thought>[\s\S]*$/gi, '')
    .replace(/<\/?thought>/gi, '')
    .replace(/\n?【?\s*\d+\s*出力モード厳守[\s\S]*$/u, '')
    .replace(/\n?【?[^\n]{0,40}この見出しは本文に出力しない[^\n]*】?[\s\S]*$/u, '')
    .replace(/\n?今回の出力モードは[「『][^」』]+[」』]です。[\s\S]*$/u, '')
    .replace(/\n?ジャンル・テーマよりも出力形式を優先してください。[\s\S]*$/u, '')
    .replace(/\n*(?:【最終自己採点結果】|\[進捗\]|自己採点[:：]|評価理由[:：]|伏線回収度[:：]|起承転結の構造[:：]|制約遵守度[:：]|\*\*修正版プロット\*\*|修正版プロット[:：]|-{8,}|─{8,})[\s\S]*$/u, '')
    .replace(FOOTER_PATTERN, '')
    .replace(/\n?【完】\s*/g, '\n')
    .replace(/\n?完結\s*(?=\n|$)/g, ''));
}

function stripFooter(text) {
  return String(text || '').replace(FOOTER_PATTERN, '').trimEnd();
}

function hasPromptArtifact(text) {
  return /<thought|<\/thought>|出力モード厳守|この見出しは本文に出力しない|今回の出力モードは|ジャンル・テーマよりも出力形式を優先してください|以下の必須形式を満たさない出力は禁止|【最終自己採点結果】|\[進捗\]|自己採点[:：]|評価理由[:：]|伏線回収度[:：]|起承転結の構造[:：]|制約遵守度[:：]|\*\*修正版プロット\*\*|修正版プロット[:：]|AI\s*Story\s*Maker|Story\s*Maker|ストーリーメーカー|物語メーカー|生成ツール|作成ツール|ChatGPT|Gemini|OpenAI/i.test(String(text || ''));
}

function normalizeFormatLabelMarkdown(text) {
  const labels = [
    '主張', '観察', '考察', '結論',
    '宛先', '本文', '結び', '差出人',
    '日付', '天気',
    'タイトル', '登場人物',
    'ナレーション', '記録映像', '証言', 'インタビュー', '締め',
    'BGM', 'SE',
  ].join('|');
  const labelPattern = new RegExp(`^(\\s*)\\*\\*\\s*(${labels})\\s*[:：]\\s*\\*\\*\\s*`, 'gm');
  return String(text || '')
    .replace(labelPattern, '$1$2:')
    .replace(new RegExp(`^(\\s*)\\*\\*\\s*(${labels})\\s*\\*\\*\\s*[:：]\\s*`, 'gm'), '$1$2:');
}

function normalizeLeadingTitle(text) {
  return String(text || '')
    .replace(/^\s*【\s*#{1,6}\s*([^】\n]+?)\s*】/u, 'タイトル: $1')
    .replace(/^\s*#{1,6}\s*([^\n]+?)\s*$/u, 'タイトル: $1');
}

function normalizeBracketedLeadingTitle(text) {
  return String(text || '')
    .replace(/^\s*【([^】\n]{1,80})】\s*\n+/u, 'タイトル: $1\n\n');
}

function trimToSentencePreserveBreaks(text, maxChars) {
  const source = String(text || '');
  if (!maxChars || charLength(source) <= maxChars) return source;
  const sliced = Array.from(source).slice(0, maxChars).join('');
  const searchFrom = Math.max(0, sliced.length - 700);
  const tail = sliced.slice(searchFrom);
  const sentenceEnd = Math.max(
    tail.lastIndexOf('。'),
    tail.lastIndexOf('！'),
    tail.lastIndexOf('？'),
    tail.lastIndexOf('」'),
    tail.lastIndexOf('』')
  );
  const trimmed = sentenceEnd >= 0 ? sliced.slice(0, searchFrom + sentenceEnd + 1) : sliced;
  return normalizeBreaks(trimmed);
}

function hasDanglingJapaneseTail(line) {
  const value = String(line || '').trim();
  if (!value) return false;
  return /(?:、|と|に|で|て|を|が|は|も|へ|から|まで|だけ|ながら|けれど|けど|そして|しかし)$/.test(value);
}

function removeDanglingTail(text) {
  const lines = String(text || '').split('\n');
  while (lines.length > 1 && hasDanglingJapaneseTail(lines[lines.length - 1])) {
    lines.pop();
  }
  return normalizeBreaks(lines.join('\n'));
}

function removeUnclosedTail(text) {
  let next = normalizeBreaks(text);
  if (!next) return next;
  const pairs = [
    ['「', '」'],
    ['『', '』'],
    ['（', '）'],
    ['(', ')'],
    ['【', '】'],
  ];
  for (const [open, close] of pairs) {
    const lastOpen = next.lastIndexOf(open);
    const lastClose = next.lastIndexOf(close);
    if (lastOpen > lastClose && lastOpen >= Math.max(0, next.length - 900)) {
      next = normalizeBreaks(next.slice(0, lastOpen));
    }
  }
  return next;
}

function removeTrailingJapaneseTitleArtifact(text) {
  const source = normalizeBreaks(text);
  const trailingTitlePattern = new RegExp(`${TITLE_TRAILING_PREFIX_PATTERN}${TITLE_LINE_PATTERN}[^\\n]{1,120}\\s*$`, 'u');
  const next = source.replace(trailingTitlePattern, '').trimEnd();
  return restoreSentenceEndAfterTitleRemoval(source, next);
}

function restoreSentenceEndAfterTitleRemoval(source, next) {
  if (source === next) return next;
  if (!next || SENTENCE_END_PATTERN.test(next)) return next;
  return SENTENCE_TAIL_PATTERN.test(next) ? `${next}\u3002` : next;
}

function finishPublicText(text) {
  const body = stripFooter(normalizeBracketedLeadingTitle(normalizeLeadingTitle(normalizeFormatLabelMarkdown(removeTrailingJapaneseTitleArtifact(removeUnclosedTail(removeDanglingTail(text))))))).trimEnd();
  return body ? `${body}\n\n${FOOTER_TEXT}` : '';
}

function removeTrailingHeaderRestart(text) {
  return normalizeBreaks(text).replace(
    /([。！？」』）])\s*(?:タイトル\s*[:：][^\n]{0,120}\n(?=(?:登場人物|場面|主張|宛先|日付|ナレーション|BGM)\s*[:：])|【[^】\n]{1,80}】\n(?=(?:登場人物|場面|主張|宛先|日付|ナレーション|BGM)\s*[:：]))[\s\S]*$/u,
    '$1',
  );
}

function removeRestartedDrafts(text) {
  const source = removeTrailingHeaderRestart(text);
  const restarts = [...source.matchAll(/(?:^|\n)(?:タイトル[:：]|【[^】\n]{1,80}】)/g)];
  if (restarts.length < 2) return source;
  const candidates = restarts
    .map((match, index) => {
      const start = match.index + (match[0].startsWith('\n') ? 1 : 0);
      const end = restarts[index + 1]
        ? restarts[index + 1].index + (restarts[index + 1][0].startsWith('\n') ? 1 : 0)
        : source.length;
      return source.slice(start, end).trim();
    })
    .filter(Boolean);
  if (!candidates.length) return source;
  return candidates.reduce((best, candidate) => (
    charLength(candidate) >= charLength(best) ? candidate : best
  ), candidates[0]);
}

function removeNarrativeDraftRestart(text, mode) {
  if (!NARRATIVE_RESTART_MODES.has(mode)) return text;
  const source = normalizeBreaks(text);
  const min = Number(MODE_LENGTH_TARGETS[mode]?.min || 0);
  const candidates = [];
  const pushCandidate = index => {
    if (index <= 0) return;
    const before = source.slice(0, index).trim();
    const enoughBody = !min || bodyLength(before) >= Math.min(min, 6000);
    const completedMedium = mode === 'medium' && /^第3節/m.test(before);
    if (enoughBody || completedMedium) candidates.push(index);
  };

  for (const match of source.matchAll(/\n\s*タイトル\s*[:：][^\n]{1,120}\n+\s*(?:第1節|第1章|一[、.．]|1[.．])/g)) {
    pushCandidate(match.index);
  }

  if (mode === 'medium') {
    const section3 = source.search(/^第3節/m);
    if (section3 >= 0) {
      const afterSection3 = source.slice(section3 + 1);
      const sectionRestart = afterSection3.search(/\n\s*第1節(?=\s|$)/m);
      if (sectionRestart >= 0) pushCandidate(section3 + 1 + sectionRestart);
    }
  }

  if (!candidates.length) return source;
  return normalizeBreaks(source.slice(0, Math.min(...candidates))).trim();
}

function removeTrailingNarrativeTitleArtifact(text, mode) {
  if (!NARRATIVE_RESTART_MODES.has(mode)) return text;
  const source = normalizeBreaks(text);
  const trailingTitlePattern = new RegExp(`${TITLE_TRAILING_PREFIX_PATTERN}${TITLE_LINE_PATTERN}[^\\n]{1,120}\\s*$`, 'u');
  const next = source
    .replace(trailingTitlePattern, '')
    .replace(/\n+\s*タイトル\s*[:：][^\n]{1,120}\s*$/u, '')
    .trimEnd();
  return restoreSentenceEndAfterTitleRemoval(source, next);
}

function finishPublicTextPreserveBody(text) {
  const body = stripFooter(normalizeBracketedLeadingTitle(normalizeLeadingTitle(normalizeFormatLabelMarkdown(removeTrailingJapaneseTitleArtifact(normalizeBreaks(text)))))).trimEnd();
  return body ? `${body}\n\n${FOOTER_TEXT}` : '';
}

function bodyLength(text) {
  return charLength(stripFooter(String(text || '')).trim());
}

function documentaryMinChars() {
  return Number(MODE_LENGTH_TARGETS.documentary?.min || 0);
}

function documentaryLabelSource(text) {
  return normalizeFormatLabelMarkdown(normalizeBreaks(stripFooter(String(text || ''))));
}

function hasDocumentaryCoreLabels(text) {
  const source = documentaryLabelSource(text);
  return /^ナレーション\s*[:：](?:\s*\S+|\s*\n\s*\S+)/m.test(source)
    && /^記録映像\s*[:：](?:\s*\S+|\s*\n\s*\S+)/m.test(source)
    && /^(?:証言\s*(?:[\/／]\s*インタビュー)?|インタビュー)\s*[:：](?:\s*\S+|\s*\n\s*\S+)/m.test(source);
}

function hasNonEmptyDocumentaryClosing(text) {
  return /^締め\s*[:：](?:\s*\S+|\s*\n\s*\S+)/m.test(documentaryLabelSource(text));
}

function removeEmptyTrailingDocumentaryClosing(text) {
  const closingLabel = '\u7de0\u3081';
  return normalizeBreaks(String(text || '').replace(
    new RegExp(`(?:^|\\n)\\s*${closingLabel}\\s*[:\uff1a]\\s*$`, 'u'),
    '',
  ));
}

function documentaryCandidateSafeToCut(candidate, source) {
  if (!hasDocumentaryCoreLabels(candidate) || !hasNonEmptyDocumentaryClosing(candidate)) return false;
  const min = documentaryMinChars();
  if (!min) return true;
  const sourceLen = bodyLength(source);
  const candidateLen = bodyLength(candidate);
  if (sourceLen < min) return true;
  return candidateLen >= Math.min(min, Math.ceil(sourceLen * 0.55));
}

function hasDocumentaryDraftRestartArtifact(text) {
  const source = documentaryLabelSource(text);
  if ((source.match(/^タイトル\s*[:：]/gm) || []).length > 1) return true;

  const titleLabel = '\u30bf\u30a4\u30c8\u30eb';
  const narrationLabel = '\u30ca\u30ec\u30fc\u30b7\u30e7\u30f3';
  const footageLabel = '\u8a18\u9332\u6620\u50cf';
  const testimonyLabel = '\u8a3c\u8a00';
  const interviewLabel = '\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc';
  const closingLabel = '\u7de0\u3081';
  const closingPattern = new RegExp(`(?:^|\\n)\\s*${closingLabel}\\s*[:\uff1a]`, 'gm');
  const restartPattern = new RegExp(
    `(?:\\n\\s*)?(?:${titleLabel}|${narrationLabel}|${footageLabel}|${testimonyLabel}\\s*[\\/\uff0f]\\s*${interviewLabel}|${testimonyLabel}|${interviewLabel})\\s*[:\uff1a]`,
    'm',
  );

  for (const match of source.matchAll(closingPattern)) {
    const afterClosingStart = match.index + match[0].length;
    const tail = source.slice(afterClosingStart);
    const restart = tail.search(restartPattern);
    if (restart <= 0) continue;
    const candidate = normalizeBreaks(source.slice(0, afterClosingStart + restart));
    if (documentaryCandidateSafeToCut(candidate, source)) return true;
  }
  return false;
}

function paragraphizeSentences(text, sentencesPerParagraph = 2) {
  const source = normalizeBreaks(text);
  if ((source.match(/\n/g) || []).length >= 2 || charLength(source) < 500) return source;
  const sentences = source.match(/[^。！？!?]+[。！？!?」』]?/g) || [source];
  const paragraphs = [];
  for (let index = 0; index < sentences.length; index += sentencesPerParagraph) {
    paragraphs.push(sentences.slice(index, index + sentencesPerParagraph).join('').trim());
  }
  return paragraphs.filter(Boolean).join('\n\n');
}

function normalizeSenderCandidate(value) {
  return String(value || '')
    .trim()
    .replace(/[ 　]+/g, '')
    .replace(/[（(][^）)\n]{0,40}[）)]/g, '')
    .trim();
}

function likelyLetterSenderName(value) {
  const candidate = normalizeSenderCandidate(value);
  if (!candidate) return '';
  if (TOOL_NAME_PATTERN.test(candidate)) return '';
  if (/^(宛先|本文|結び|追伸|タイトル|日付|天気|主張|観察|考察|結論)$/.test(candidate)) return '';
  if (/[。、！？「」『』:：]/.test(candidate)) return '';
  if (/どうして|本当|本当に|心から|景色|気が|見て|書いて|終え|読んで|思い|感じ|なりません|ください|ありがとう|よろしく|もっと|きっと|ずっと|そして|しかし|けれど/.test(candidate)) return '';
  if (!/^[一-龠ぁ-んァ-ンーA-Za-z0-9・]+$/.test(candidate)) return '';
  const length = charLength(candidate);
  if (length < 2 || length > 14) {
    if (!/^(私|わたし|僕|俺|父|母|兄|姉|弟|妹)$/.test(candidate)) return '';
  }
  if (!/^(私|わたし|僕|俺)$/.test(candidate) && /^[ぁ-んー]+$/.test(candidate) && length > 6) return '';
  return candidate;
}

function inferLetterSender(text) {
  const source = stripFooter(normalizeBreaks(text));
  const beforeClosing = source.split(/\n結び\s*[:：]/)[0] || source;
  const signoffLines = beforeClosing
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .slice(-10)
    .reverse();
  for (const line of signoffLines) {
    const candidate = likelyLetterSenderName(line);
    if (candidate) return candidate;
  }
  const signoff = source.match(/\n([一-龠ぁ-んァ-ンーA-Za-z0-9・]{2,18})(?:[（(][^）)\n]{0,40}[）)])?\n\s*結び\s*[:：]/);
  const signoffName = likelyLetterSenderName(signoff?.[1]);
  if (signoffName) return signoffName;
  const patterns = [
    /(?:私|わたし|僕|俺)[、,]\s*([一-龠ぁ-んァ-ンーA-Za-z0-9・]{2,18})(?:は|が|です)/,
  ];
  for (const pattern of patterns) {
    const match = source.match(pattern);
    const name = likelyLetterSenderName(match?.[1]);
    if (name) return name;
  }
  if (/僕/.test(source)) return '僕';
  if (/俺/.test(source)) return '俺';
  if (/私/.test(source)) return '私';
  if (/わたし/.test(source)) return 'わたし';
  return '私';
}

function invalidLetterSender(sender) {
  const value = String(sender || '').trim();
  if (!value) return true;
  return !likelyLetterSenderName(value);
}

function repairLetterSender(text) {
  return normalizeBreaks(text).replace(/^(差出人\s*[:：]\s*)([^\n]*)$/m, (line, label, sender) => {
    if (!invalidLetterSender(sender)) return line;
    return `${label}${inferLetterSender(text)}`;
  });
}

function normalizeEssayStructure(text) {
  let next = normalizeBreaks(text)
    .replace(/^【\s*(主張|観察|考察|結論)\s*[:：]?\s*】\s*$/gm, '$1:')
    .replace(/([^\n])\s*【\s*(主張|観察|考察|結論)\s*[:：]?\s*】/g, '$1\n\n$2:')
    .replace(/([^\n])\s*(観察|考察|結論)\s*[:：]/g, '$1\n\n$2:');
  const hasConclusion = /^結論\s*[:：]/m.test(next);
  if (hasConclusion) return next;

  const paragraphs = next.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  if (paragraphs.length < 2) return next;
  const last = paragraphs[paragraphs.length - 1];
  if (/^(主張|観察|考察)\s*[:：]/.test(last)) return next;
  paragraphs[paragraphs.length - 1] = `結論:${last}`;
  return paragraphs.join('\n\n');
}

function ensureEssayLabels(text) {
  const source = normalizeBreaks(text);
  const required = ['主張', '観察', '考察', '結論'];
  const counts = Object.fromEntries(required.map(label => [
    label,
    (source.match(new RegExp(`^${label}\\s*[:：]`, 'gm')) || []).length,
  ]));
  if (required.every(label => counts[label] === 1)) return source;

  const min = Number(MODE_LENGTH_TARGETS.essay?.min || 0);
  if (min && bodyLength(source) < min) return source;

  let units = source
    .split(/\n{2,}/)
    .map(part => part.trim().replace(/^(主張|観察|考察|結論)\s*[:：]\s*/u, '').trim())
    .filter(Boolean);
  if (units.length < 4) {
    units = (source.match(/[^。！？\n]+[。！？]+(?:[」』）\]])?/gu) || [])
      .map(part => part.trim().replace(/^(主張|観察|考察|結論)\s*[:：]\s*/u, '').trim())
      .filter(part => charLength(part) >= 24);
  }
  if (units.length < 4) {
    const plain = source
      .replace(/^(主張|観察|考察|結論)\s*[:：]\s*/gmu, '')
      .replace(/\n+/g, ' ')
      .trim();
    const chars = Array.from(plain);
    const chunkSize = Math.ceil(chars.length / 4);
    units = required
      .map((_, index) => chars.slice(index * chunkSize, (index + 1) * chunkSize).join('').trim())
      .filter(Boolean);
  }
  if (units.length < 4) return source;

  const groups = required.map(() => []);
  units.forEach((unit, index) => {
    const groupIndex = Math.min(3, Math.floor(index * 4 / units.length));
    groups[groupIndex].push(unit);
  });
  if (groups.some(group => !group.length)) return source;
  return groups
    .map((group, index) => `${required[index]}:\n${group.join('\n\n')}`)
    .join('\n\n');
}

function keepSingleEssayDraft(text) {
  const source = normalizeBreaks(text);
  const starts = [...source.matchAll(/^主張\s*[:：]/gm)];
  if (starts.length < 2) return source;
  const candidates = starts.map((match, index) => {
    const start = match.index;
    const end = starts[index + 1]?.index ?? source.length;
    return source.slice(start, end).trim();
  }).filter(candidate => (
    /^主張\s*[:：]/m.test(candidate)
    && /^観察\s*[:：]/m.test(candidate)
    && /^考察\s*[:：]/m.test(candidate)
    && /^結論\s*[:：]/m.test(candidate)
  ));
  if (!candidates.length) return source;
  return candidates.reduce((best, candidate) => (
    charLength(candidate) >= charLength(best) ? candidate : best
  ), candidates[0]);
}

function keepFirstEssayCycle(text) {
  const source = normalizeBreaks(text);
  const labels = [...source.matchAll(/^(主張|観察|考察|結論)\s*[:：]/gm)]
    .map(match => ({ label: match[1], index: match.index }));
  const claim = labels.find(item => item.label === '主張');
  const observation = labels.find(item => item.label === '観察' && (!claim || item.index > claim.index));
  const consideration = labels.find(item => item.label === '考察' && observation && item.index > observation.index);
  const conclusion = labels.find(item => item.label === '結論' && consideration && item.index > consideration.index);
  if (!claim || !observation || !consideration || !conclusion) return source;

  const nextRestart = labels.find(item => item.index > conclusion.index && item.label !== '結論');
  if (!nextRestart) return source;
  const candidate = source.slice(claim.index, nextRestart.index).trim();
  const min = Number(MODE_LENGTH_TARGETS.essay?.min || 0);
  return !min || bodyLength(candidate) >= min ? candidate : source;
}

function demoteRepeatedEssayLabels(text) {
  const lines = normalizeBreaks(text).split('\n');
  const labelLines = lines
    .map((line, index) => ({ index, match: line.match(/^(主張|観察|考察|結論)\s*[:：]\s*(.*)$/) }))
    .filter(item => item.match);
  if (labelLines.length <= 4) return lines.join('\n');

  const seen = new Set();
  const conclusionLines = labelLines.filter(item => item.match[1] === '結論');
  const lastConclusionIndex = conclusionLines[conclusionLines.length - 1]?.index;
  const demotions = {
    主張: '言い換えるなら、',
    観察: '別の場面でも、',
    考察: 'さらに考えると、',
    結論: 'ここで一度言えるのは、',
  };

  for (const item of labelLines) {
    const label = item.match[1];
    const content = item.match[2] || '';
    if (label === '結論') {
      if (item.index === lastConclusionIndex && !seen.has(label)) {
        seen.add(label);
      } else {
        lines[item.index] = `${demotions[label]}${content}`;
      }
      continue;
    }
    if (seen.has(label)) {
      lines[item.index] = `${demotions[label]}${content}`;
    } else {
      seen.add(label);
    }
  }
  return normalizeBreaks(lines.join('\n'));
}

function removeTrailingEssayRestart(text) {
  const source = normalizeBreaks(text);
  const conclusion = source.search(/^結論[:：]/m);
  if (conclusion < 0) return source;
  const afterConclusion = source.slice(conclusion);
  const inlineRestart = afterConclusion.search(/(?:。|\n)\s*タイトル[:：][^\n]{0,120}主張[:：]/);
  const labelRestart = afterConclusion.search(/\n\s*主張[:：]/);
  const restarts = [inlineRestart, labelRestart].filter(index => index >= 0);
  if (!restarts.length) return source;
  const cutAt = conclusion + Math.min(...restarts) + 1;
  return normalizeBreaks(source.slice(0, cutAt));
}

function hasDraftRestartArtifact(text, mode) {
  const source = normalizeBreaks(stripFooter(String(text || '')));
  if (!source) return false;
  if (mode === 'essay') {
    if ((source.match(/^主張[:：]/gm) || []).length > 1) return true;
    return /^結論[:：][\s\S]+(?:。|\n)\s*タイトル[:：][^\n]{0,120}主張[:：]/m.test(source);
  }
  if (mode === 'letter') return (source.match(/^宛先[:：]/gm) || []).length > 1;
  if (mode === 'diary') return (source.match(/^日付[:：]/gm) || []).length > 1;
  if (mode === 'documentary') return hasDocumentaryDraftRestartArtifact(source);
  if (mode === 'radio') return (source.match(/^タイトル[:：]/gm) || []).length > 1;
  if (mode === '4koma_scenario') return (source.match(/^Topic:/gm) || []).length > 1;
  if (mode === '4koma') return (source.match(/(?:^|\n)1コマ目/g) || []).length > 1;
  if (mode === 'medium') {
    const section3 = source.search(/^第3節/m);
    if (section3 >= 0) {
      const afterSection3 = source.slice(section3 + 1);
      if (/\n\s*タイトル\s*[:：][^\n]{1,120}\n+\s*第1節/m.test(afterSection3)) return true;
      if (/\n\s*第1節(?=\s|$)/m.test(afterSection3)) return true;
    }
  }
  return (source.match(/(?:^|\n)タイトル[:：]/g) || []).length > 1;
}

const JP_LABEL = {
  claim: '\u4e3b\u5f35',
  observation: '\u89b3\u5bdf',
  consideration: '\u8003\u5bdf',
  conclusion: '\u7d50\u8ad6',
  title: '\u30bf\u30a4\u30c8\u30eb',
  address: '\u5b9b\u5148',
  date: '\u65e5\u4ed8',
  narration: '\u30ca\u30ec\u30fc\u30b7\u30e7\u30f3',
  cast: '\u767b\u5834\u4eba\u7269',
};

function cleanJapaneseEssayRestarts(text) {
  const source = normalizeFormatLabelMarkdown(normalizeBreaks(text));
  const claim = source.search(new RegExp(`^${JP_LABEL.claim}[:\uff1a]`, 'm'));
  const observation = source.search(new RegExp(`^${JP_LABEL.observation}[:\uff1a]`, 'm'));
  const consideration = source.search(new RegExp(`^${JP_LABEL.consideration}[:\uff1a]`, 'm'));
  const conclusion = source.search(new RegExp(`^${JP_LABEL.conclusion}[:\uff1a]`, 'm'));
  if (claim < 0 || observation < claim || consideration < observation || conclusion < consideration) {
    return source;
  }
  const afterConclusion = source.slice(conclusion);
  const titleRestart = afterConclusion.search(new RegExp(`(?:\u3002|\\n)\\s*${JP_LABEL.title}[:\uff1a][^\\n]{0,240}${JP_LABEL.claim}[:\uff1a]`));
  const titleOnlyRestart = afterConclusion.search(new RegExp(`(?:\u3002|\\n)\\s*${JP_LABEL.title}[:\uff1a]`));
  const claimRestart = afterConclusion.search(new RegExp(`\\n\\s*${JP_LABEL.claim}[:\uff1a]`));
  const restarts = [titleRestart, titleOnlyRestart, claimRestart].filter(index => index >= 0);
  if (!restarts.length) return source;
  const candidate = normalizeBreaks(source.slice(claim, conclusion + Math.min(...restarts) + 1));
  const min = Number(MODE_LENGTH_TARGETS.essay?.min || 0);
  return !min || bodyLength(candidate) >= min ? candidate : source;
}

function hasJapaneseDraftRestartArtifact(text, mode) {
  const source = normalizeFormatLabelMarkdown(normalizeBreaks(stripFooter(String(text || ''))));
  if (!source) return false;
  if (mode === 'essay') {
    if ((source.match(new RegExp(`^${JP_LABEL.claim}[:\uff1a]`, 'gm')) || []).length > 1) return true;
    return new RegExp(`^${JP_LABEL.conclusion}[:\uff1a][\\s\\S]+(?:\u3002|\\n)\\s*${JP_LABEL.title}[:\uff1a]`, 'm').test(source);
  }
  if (mode === 'letter') return (source.match(new RegExp(`^${JP_LABEL.address}[:\uff1a]`, 'gm')) || []).length > 1;
  if (mode === 'diary') return (source.match(new RegExp(`^${JP_LABEL.date}[:\uff1a]`, 'gm')) || []).length > 1;
  if (mode === 'documentary') return hasDocumentaryDraftRestartArtifact(source);
  if (mode === 'radio') return (source.match(new RegExp(`^${JP_LABEL.title}[:\uff1a]`, 'gm')) || []).length > 1;
  return false;
}

function cleanEssay(text) {
  let next = stripPublicArtifacts(text);
  next = normalizeEssayStructure(next);
  next = ensureEssayLabels(next);
  next = keepSingleEssayDraft(next);
  next = keepFirstEssayCycle(next);
  next = demoteRepeatedEssayLabels(next);
  next = removeTrailingEssayRestart(next);
  next = cleanJapaneseEssayRestarts(next);
  const firstBlock = next.search(/主張:/);
  if (firstBlock > 0 && firstBlock < 220) next = next.slice(firstBlock);
  next = next.replace(/^タイトル:[^\n]*(?=主張:)/u, '');
  const firstJapaneseBlock = next.search(new RegExp(`${JP_LABEL.claim}[:\uff1a]`));
  if (firstJapaneseBlock > 0 && firstJapaneseBlock < 220) next = next.slice(firstJapaneseBlock);
  next = next.replace(new RegExp(`^${JP_LABEL.title}[:\uff1a][^\\n]*(?=${JP_LABEL.claim}[:\uff1a])`, 'u'), '');
  next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS.essay);
  return finishPublicText(next);
}

function cleanPoem(text) {
  let next = stripPublicArtifacts(text)
    .replace(/^タイトル[:：]\s*([^\n]{1,60})\n+/u, '【$1】\n');
  const lines = next.split('\n').map(line => line.trim()).filter(Boolean);
  const maxPoemLines = 80;
  if (lines.length > maxPoemLines) {
    const title = /^【[^】]{1,60}】$/.test(lines[0]) ? [lines[0]] : [];
    const body = lines.slice(title.length, title.length + (maxPoemLines - title.length));
    next = [...title, ...body].join('\n');
  }
  return finishPublicText(next);
}

function cleanLetter(text) {
  let next = stripPublicArtifacts(text)
    .replace(/(拝啓|前略|親愛なる[^\n。、]{1,40}へ)\s*/u, '$1\n\n')
    .replace(/\s*(敬具|草々|かしこ|追伸[:：]?)/u, '\n\n$1')
    .replace(/\n{2,}[、,]\s*/g, '\n\n');
  next = next.replace(
    /^宛先\s*[:：]\s*\n+\s*本文\s*[:：]\s*\n+([^\n]{2,80})\n+/m,
    '宛先: $1\n\n本文:\n',
  );
  next = next
    .replace(/^宛先\s*[:：]\s*\n+([^\n]{1,80})/m, '宛先: $1')
    .replace(/^差出人\s*[:：]\s*\n+([^\n]{1,80})/m, '差出人: $1')
    .replace(/([^\n])\n(本文|結び|差出人|追伸)\s*[:：]/g, '$1\n\n$2:');
  const firstAddress = next.search(/^宛先:/m);
  if (firstAddress > 0 && firstAddress < 400) next = next.slice(firstAddress);
  next = repairLetterSender(next);
  return finishPublicText(paragraphizeSentences(next, 2));
}

function demoteRepeatedLineLabel(text, label, replacement) {
  let seen = false;
  const pattern = new RegExp(`^(${label})\\s*[:\\uff1a]`, 'u');
  return normalizeBreaks(text).split('\n').map(line => {
    if (!pattern.test(line.trim())) return line;
    if (!seen) {
      seen = true;
      return line;
    }
    return line.replace(pattern, replacement);
  }).join('\n');
}

function cleanDiary(text) {
  let next = stripPublicArtifacts(text)
    .replace(/^【\s*日付\s*[:：]\s*([^】]+)】/u, '日付: $1')
    .replace(/^天気\s*[:：]\s*([^\n]+)\n(?!\s*本文\s*[:：])/m, '天気: $1\n\n本文:\n');
  next = demoteRepeatedLineLabel(next, '日付', 'この日の記録');
  next = demoteRepeatedLineLabel(next, '天気', '空模様');
  next = demoteRepeatedLineLabel(next, '本文', 'この日の続き');
  return finishPublicText(paragraphizeSentences(next, 2));
}

function cleanRadio(text) {
  let next = stripPublicArtifacts(text)
    .replace(/^【([^】\n]{1,80})】\n+/u, 'タイトル: $1\n\n');
  if (!/^タイトル\s*[:：]/m.test(next)) {
    const firstLine = next.split('\n').find(line => line.trim());
    if (firstLine && charLength(firstLine.trim()) <= 80 && !/[:：]$/.test(firstLine.trim())) {
      next = next.replace(firstLine, `タイトル: ${firstLine.trim()}`);
    }
  }
  return finishPublicText(next);
}

function cleanManga(text) {
  let next = stripPublicArtifacts(text);
  next = next.replace(/\n+(?:P?\d+ページ|第?\d+コマ|ページ|コマ|セリフ|構図|背景|演出)[:：]?\s*$/u, '');
  next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS.manga);
  return finishPublicText(next);
}

function clean4koma(text) {
  let next = stripPublicArtifacts(text)
    .replace(/\n?\s*(?:狙い|意図|解説)\s*[:：][^\n]*(?=\n|$)/g, '');
  const lines = next.split('\n');
  let inSpeechBlock = false;
  next = lines.filter(line => {
    const trimmed = line.trim();
    if (/^[1-4１-４一二三四]\s*コマ目/.test(trimmed) || /^絵\/状況[:：]/.test(trimmed)) {
      inSpeechBlock = false;
      return true;
    }
    if (/^セリフ[:：]/.test(trimmed)) {
      inSpeechBlock = true;
      return true;
    }
    if (
      inSpeechBlock
      && trimmed.length > 18
      && !/[「」『』]/.test(trimmed)
      && !/[！？!?]$/.test(trimmed)
      && !/^[^:：]{1,14}[:：]/.test(trimmed)
    ) {
      return false;
    }
    return true;
  }).join('\n');
  next = normalizeBreaks(next);
  return finishPublicText(next);
}

function scenarioChunkIsComplete(text) {
  const source = String(text || '');
  return /^Topic:/m.test(source)
    && /^Scenario:/m.test(source)
    && /\[1コマ目/m.test(source)
    && /\[2コマ目/m.test(source)
    && /\[3コマ目/m.test(source)
    && /\[4コマ目/m.test(source)
    && (source.match(/\[EMOTION:/g) || []).length >= 4
    && (source.match(/\[Camera:/g) || []).length >= 4
    && (source.match(/^状況:/gm) || []).length >= 4
    && (source.match(/^絵:/gm) || []).length >= 4
    && (source.match(/^セリフ:/gm) || []).length >= 4
    && (source.match(/^演出:/gm) || []).length >= 4
    && (source.match(/^狙い:/gm) || []).length >= 4
    && scenarioFinalAimIsComplete(source);
}

function finalScenarioAimBlock(text) {
  const source = stripFooter(normalizeBreaks(text));
  const finalPanelMatch = [...source.matchAll(/^\[4コマ目\]/gm)].pop();
  const finalPanelStart = finalPanelMatch ? finalPanelMatch.index : source.lastIndexOf('[4コマ目]');
  const finalPanel = finalPanelStart >= 0 ? source.slice(finalPanelStart) : source;
  const aims = [...finalPanel.matchAll(/^狙い\s*[:：]/gm)];
  if (!aims.length) return '';
  const aimStart = aims[aims.length - 1].index;
  const afterAim = finalPanel.slice(aimStart);
  const restartMatch = afterAim.match(/\n\s*(?:Topic:|Logline:|Location:|Outfit:|Punchline:|Scenario:|\[[1-4]コマ目\])/);
  const aimEnd = restartMatch?.index > 0 ? restartMatch.index : afterAim.length;
  return afterAim.slice(0, aimEnd).trim();
}

function scenarioFinalAimIsComplete(text) {
  const content = finalScenarioAimBlock(text)
    .replace(/^狙い\s*[:：]\s*/u, '')
    .replace(FOOTER_PATTERN, '')
    .replace(/\s+/g, ' ')
    .trim();
  return charLength(content) >= 24 && !/^(?:Generated|Created)\s+By\s+AI\s+Story\s+Maker/i.test(content);
}

function keepFirstComplete4komaScenario(text) {
  const source = normalizeBreaks(text);
  const repeatedTopic = source.indexOf('Topic:', 1);
  if (repeatedTopic > 0) {
    const beforeRepeatedTopic = source.slice(0, repeatedTopic).trim();
    if (scenarioChunkIsComplete(beforeRepeatedTopic)) return beforeRepeatedTopic;
  }

  const starts = [...source.matchAll(/^\[1コマ目(?::\s*[起承転結])?\]/gm)];
  if (starts.length <= 1) return source;
  const firstPass = source.slice(0, starts[1].index).trim();
  if (scenarioChunkIsComplete(firstPass)) return firstPass;

  for (let index = 1; index < starts.length; index += 1) {
    const end = starts[index + 1]?.index ?? source.length;
    const candidate = source.slice(0, end).trim();
    if (scenarioChunkIsComplete(candidate)) return candidate;
  }
  return source;
}

function trimAfterFinalScenarioAim(text) {
  const source = normalizeBreaks(text);
  const aims = [...source.matchAll(/^狙い:[^\n]*/gm)];
  if (aims.length < 4) return source;
  const finalAim = aims[aims.length - 1];
  const afterAim = source.slice(finalAim.index);
  const restartMatch = afterAim.match(/\n\s*(?:Topic:|Logline:|Location:|Outfit:|Punchline:|Scenario:|\[[1-4]コマ目\])/);
  if (!restartMatch || restartMatch.index <= 0) return source;
  return normalizeBreaks(source.slice(0, finalAim.index + restartMatch.index));
}

function balanceScenarioTopicLine(text) {
  return String(text || '').replace(/^Topic:[^\n]*/m, line => {
    const openCount = (line.match(/「/g) || []).length;
    const closeCount = (line.match(/」/g) || []).length;
    if (openCount <= closeCount) return line;
    return `${line}${'」'.repeat(openCount - closeCount)}`;
  });
}

function normalizeScenarioPanelLabels(text) {
  return String(text || '').replace(
    /^\[([1-4１２３４一二三四])\s*コマ目(?:\s*[:：]\s*[起承転結])?\]\s*$/gm,
    (_, panel) => {
      const normalized = { '１': '1', '２': '2', '３': '3', '４': '4', '一': '1', '二': '2', '三': '3', '四': '4' }[panel] || panel;
      return `[${normalized}コマ目]`;
    },
  );
}

function removeScenarioPrefaceBeforeFirstPanel(text) {
  return normalizeBreaks(text).replace(
    /^(Scenario:\s*)\n+[\s\S]*?(?=^\[1コマ目\])/m,
    (_, label) => `${label}\n`,
  );
}

function clean4komaScenario(text) {
  let next = stripPublicArtifacts(text);
  const firstTopic = next.search(/^Topic:/m);
  if (firstTopic > 0) next = next.slice(firstTopic);
  const chunks = next.split(/(?=^Topic:)/m).map(chunk => chunk.trim()).filter(Boolean);
  if (chunks.length > 1) {
    next = chunks.find(scenarioChunkIsComplete)
      || chunks.slice().reverse().find(chunk => /\[4コマ目/m.test(chunk))
      || chunks[0];
  }
  next = next
    .replace(/^【Topic:\s*([^】]+)】/u, 'Topic: $1')
    .replace(/\n+(?:このプロットでシナリオを作成します|全て基準値を超えています)[\s\S]*$/u, '');
  next = normalizeScenarioPanelLabels(next);
  next = removeScenarioPrefaceBeforeFirstPanel(next);
  next = balanceScenarioTopicLine(trimAfterFinalScenarioAim(keepFirstComplete4komaScenario(next)));
  if (MODE_MAX_CHARS['4koma_scenario']) {
    next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS['4koma_scenario']);
  }
  return finishPublicText(next);
}

function ensureDocumentaryClosingLabel(text) {
  let source = removeEmptyTrailingDocumentaryClosing(text);
  source = source.replace(/^記録映像（締め）\s*[:：]\s*/m, '締め: ');
  if (hasNonEmptyDocumentaryClosing(source)) return source;

  const parts = source.split(/\n{2,}/).map(part => part.trim()).filter(Boolean);
  if (!parts.length) return source;
  const lastIndex = parts.length - 1;
  if (/^(?:ナレーション|記録映像|証言\s*(?:[\/／]\s*インタビュー)?|インタビュー)\s*[:：]/.test(parts[lastIndex])) {
    parts[lastIndex] = parts[lastIndex].replace(
      /^(?:ナレーション|記録映像|証言\s*(?:[\/／]\s*インタビュー)?|インタビュー)\s*[:：]\s*/u,
      '締め: ',
    );
  } else {
    parts[lastIndex] = `締め:\n${parts[lastIndex]}`;
  }
  return normalizeBreaks(parts.join('\n\n'));
}

function keepFirstDocumentaryCycle(text) {
  const source = normalizeBreaks(text);
  const titleLabel = '\u30bf\u30a4\u30c8\u30eb';
  const narrationLabel = '\u30ca\u30ec\u30fc\u30b7\u30e7\u30f3';
  const footageLabel = '\u8a18\u9332\u6620\u50cf';
  const testimonyLabel = '\u8a3c\u8a00';
  const interviewLabel = '\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc';
  const closingLabel = '\u7de0\u3081';
  const closingPattern = new RegExp(`(?:^|\\n)\\s*${closingLabel}\\s*[:\uff1a]`, 'gm');
  const restartPattern = new RegExp(
    `(?:\\n\\s*)?(?:${titleLabel}|${narrationLabel}|${footageLabel}|${testimonyLabel}\\s*[\\/\uff0f]\\s*${interviewLabel}|${testimonyLabel}|${interviewLabel})\\s*[:\uff1a]`,
    'm',
  );
  for (const match of source.matchAll(closingPattern)) {
    const afterClosingStart = match.index + match[0].length;
    const tail = source.slice(afterClosingStart);
    const restart = tail.search(restartPattern);
    if (restart <= 0) continue;
    const candidate = normalizeBreaks(source.slice(0, afterClosingStart + restart));
    if (documentaryCandidateSafeToCut(candidate, source)) return candidate;
  }
  return source;
}

function ensureDocumentaryTitleLabel(text) {
  const lines = normalizeBreaks(text).split('\n');
  const firstIndex = lines.findIndex(line => line.trim());
  if (firstIndex < 0) return lines.join('\n');
  const first = lines[firstIndex].trim();
  const titleLabel = '\u30bf\u30a4\u30c8\u30eb';
  const narrationLabel = '\u30ca\u30ec\u30fc\u30b7\u30e7\u30f3';
  if (new RegExp(`^${titleLabel}\\s*[:\uff1a]`).test(first)) return lines.join('\n');
  const next = lines.slice(firstIndex + 1, firstIndex + 5).join('\n');
  if (charLength(first) <= 80 && !/[:\uff1a]$/.test(first) && new RegExp(`${narrationLabel}\\s*[:\uff1a]`).test(next)) {
    lines[firstIndex] = `${titleLabel}: ${first}`;
  }
  return normalizeBreaks(lines.join('\n'));
}

function cleanDocumentary(text) {
  const source = stripPublicArtifacts(text);
  let next = source;
  next = removeRestartedDrafts(next);
  next = removeEmptyTrailingDocumentaryClosing(next);
  next = ensureDocumentaryTitleLabel(next);
  next = ensureDocumentaryClosingLabel(next);
  next = keepFirstDocumentaryCycle(next);
  const cleaned = finishPublicText(next);

  const min = documentaryMinChars();
  if (
    min
    && bodyLength(cleaned) < min
    && bodyLength(source) >= min
    && !hasPromptArtifact(source)
  ) {
    const fallback = finishPublicTextPreserveBody(ensureDocumentaryClosingLabel(
      ensureDocumentaryTitleLabel(removeEmptyTrailingDocumentaryClosing(source)),
    ));
    if (bodyLength(fallback) >= min && hasDocumentaryCoreLabels(fallback)) return fallback;
  }
  return cleaned;
}

function cleanGenericPublicMode(text, mode) {
  let next = stripPublicArtifacts(String(text || ''));
  next = removeRestartedDrafts(next);
  next = removeNarrativeDraftRestart(next, mode);
  next = removeTrailingNarrativeTitleArtifact(next, mode);
  if (MODE_MAX_CHARS[mode]) next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS[mode]);
  return finishPublicText(next);
}

export function cleanOutputForPublicMode(text, mode = currentMode()) {
  if (!PUBLIC_MODE_VALUES.includes(mode)) return String(text || '');
  if (mode === 'essay') return cleanEssay(text);
  if (mode === 'poem') return cleanPoem(text);
  if (mode === 'letter') return cleanLetter(text);
  if (mode === 'diary') return cleanDiary(text);
  if (mode === 'documentary') return cleanDocumentary(text);
  if (mode === 'radio') return cleanRadio(text);
  if (mode === 'manga') return cleanManga(text);
  if (mode === '4koma') return clean4koma(text);
  if (mode === '4koma_scenario') return clean4komaScenario(text);
  return cleanGenericPublicMode(text, mode);
}

function updateOutputCounter(text) {
  const counter = document.querySelector('.char-counter');
  if (counter) counter.textContent = `${charLength(text).toLocaleString()} 字`;
}

export function isGenerationInProgress(output) {
  if (output?.dataset?.longifyRendering === 'true') return true;
  if (output?.dataset?.editorialBrushupRendering === 'true') return true;
  if (output?.dataset?.longifyOutput === 'true') return true;
  const doc = typeof document !== 'undefined' ? document : null;
  if (doc?.documentElement?.dataset?.longifyRendering === 'true') return true;
  const generateButton = doc?.getElementById?.('btn-generate');
  const text = output?.innerText || output?.textContent || '';
  return (
    !!generateButton?.disabled
    || /^AI(?:の思考を待っています|が考えています)/.test(text)
    || /^受信待機中/.test(text)
  );
}

export function installPublicOutputCleanup() {
  const output = document.getElementById('output');
  if (!output) return;

  let applying = false;
  const apply = () => {
    if (applying) return;
    if (isGenerationInProgress(output)) return;
    if (output?.dataset?.manualOutput === 'true') return;
    const mode = currentMode();
    if (!PUBLIC_MODE_VALUES.includes(mode)) return;
    const text = output.innerText || output.textContent || '';
    if (!text || /^はじめ方\s*\n/.test(text) || charLength(text) < 80) return;
    let cleaned = cleanOutputForPublicMode(text, mode);
    const minChars = Number(MODE_LENGTH_TARGETS[mode]?.min || 0);
    if (minChars && bodyLength(cleaned) < minChars) {
      const sourceBody = stripPublicArtifacts(text);
      if (
        bodyLength(sourceBody) >= minChars
        && !hasPromptArtifact(sourceBody)
        && !hasDraftRestartArtifact(sourceBody, mode)
        && !hasJapaneseDraftRestartArtifact(sourceBody, mode)
      ) {
        cleaned = finishPublicTextPreserveBody(sourceBody);
      }
    }
    if (cleaned === text) return;
    applying = true;
    output.textContent = cleaned;
    updateOutputCounter(cleaned);
    applying = false;
  };

  new MutationObserver(apply).observe(output, {
    childList: true,
    characterData: true,
    subtree: true,
  });
  setInterval(apply, 1000);
}
