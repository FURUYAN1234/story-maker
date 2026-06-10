// Story Maker v5.0.0 public output cleanup.
// Mode-scoped final formatting only: remove artifacts, preserve story content.

import {
  PUBLIC_MODE_VALUES,
  detectModeFromText,
} from './modeContracts.js';

const MODE_MAX_CHARS = {
  novel: 3400,
  medium: 4300,
  scenario: 4200,
  manga: 4200,
  essay: 3400,
  fairy: 2600,
  documentary: 3600,
  radio: 3600,
};

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
    .replace(/\n*\s*Generated\s+By\s+AI\s+Story\s+Maker\s+V[\d.]+\.?\s*$/i, '')
    .replace(/\n?【完】\s*(?=\n|$)/g, '')
    .replace(/\n?完結\s*(?=\n|$)/g, ''));
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

function cleanEssay(text) {
  let next = stripPublicArtifacts(text);
  const firstBlock = next.search(/主張:/);
  if (firstBlock > 0 && firstBlock < 220) next = next.slice(firstBlock);
  next = next.replace(/^タイトル:[^\n]*(?=主張:)/u, '');
  next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS.essay);
  return removeDanglingTail(next);
}

function cleanPoem(text) {
  let next = stripPublicArtifacts(text)
    .replace(/^タイトル[:：]\s*([^\n]{1,60})\n+/u, '【$1】\n');
  const lines = next.split('\n').map(line => line.trim()).filter(Boolean);
  if (lines.length > 16) {
    const title = /^【[^】]{1,60}】$/.test(lines[0]) ? [lines[0]] : [];
    const body = lines.slice(title.length, title.length + (16 - title.length));
    next = [...title, ...body].join('\n');
  }
  return removeDanglingTail(next);
}

function cleanLetter(text) {
  const next = stripPublicArtifacts(text)
    .replace(/(拝啓|前略|親愛なる[^\n。、]{1,40}へ)\s*/u, '$1\n\n')
    .replace(/\s*(敬具|草々|かしこ|追伸[:：]?)/u, '\n\n$1');
  return paragraphizeSentences(next, 2);
}

function cleanManga(text) {
  let next = stripPublicArtifacts(text);
  next = next.replace(/\n+(?:P?\d+ページ|第?\d+コマ|ページ|コマ|セリフ|構図|背景|演出)[:：]?\s*$/u, '');
  next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS.manga);
  return removeDanglingTail(next);
}

function cleanGenericPublicMode(text, mode) {
  let next = stripPublicArtifacts(String(text || ''));
  if (MODE_MAX_CHARS[mode]) next = trimToSentencePreserveBreaks(next, MODE_MAX_CHARS[mode]);
  return removeDanglingTail(next);
}

export function cleanOutputForPublicMode(text, mode = currentMode()) {
  if (!PUBLIC_MODE_VALUES.includes(mode)) return String(text || '');
  if (mode === 'essay') return cleanEssay(text);
  if (mode === 'poem') return cleanPoem(text);
  if (mode === 'letter') return cleanLetter(text);
  if (mode === 'manga') return cleanManga(text);
  return cleanGenericPublicMode(text, mode);
}

function updateOutputCounter(text) {
  const counter = document.querySelector('.char-counter');
  if (counter) counter.textContent = `${charLength(text).toLocaleString()} 字`;
}

export function installPublicOutputCleanup() {
  const output = document.getElementById('output');
  if (!output) return;

  let applying = false;
  const apply = () => {
    if (applying) return;
    const mode = currentMode();
    if (!PUBLIC_MODE_VALUES.includes(mode)) return;
    const text = output.innerText || output.textContent || '';
    if (!text || /^はじめ方\s*\n/.test(text) || charLength(text) < 80) return;
    const cleaned = cleanOutputForPublicMode(text, mode);
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
