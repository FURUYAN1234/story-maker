import fs from 'node:fs/promises';
import path from 'node:path';
import { cleanOutputForPublicMode } from '../src/outputCleanup.js';
import { detectPublicRewriteIssue, detectPublicSemanticLoopIssue } from '../src/qualityBoost.js';
import { MODE_LENGTH_TARGETS } from '../src/modeContracts.js';

const root = process.argv[2];
if (!root) {
  throw new Error('Usage: node scratch/rescore-full-matrix.mjs <artifact-dir>');
}

const provider = process.argv[3] || 'gemini';
const modes = [
  '4koma',
  '4koma_scenario',
  'short_short',
  'novel',
  'medium',
  'scenario',
  'manga',
  'essay',
  'poem',
  'fairy',
  'letter',
  'diary',
  'documentary',
  'radio',
];

const labels = {
  koma1: '1\u30b3\u30de\u76ee',
  koma2: '2\u30b3\u30de\u76ee',
  koma3: '3\u30b3\u30de\u76ee',
  koma4: '4\u30b3\u30de\u76ee',
  visual: '\u7d75',
  situation: '\u72b6\u6cc1',
  dialogue: '\u30bb\u30ea\u30d5',
  title: '\u30bf\u30a4\u30c8\u30eb',
  section1: '\u7b2c1\u7bc0',
  chapter1: '\u7b2c1\u7ae0',
  chars: '\u767b\u5834\u4eba\u7269',
  page1: '\u30da\u30fc\u30b81',
  thesis: '\u4e3b\u5f35',
  address: '\u5b9b\u5148',
  body: '\u672c\u6587',
  sender: '\u5dee\u51fa\u4eba',
  date: '\u65e5\u4ed8',
  narration: '\u30ca\u30ec\u30fc\u30b7\u30e7\u30f3',
  testimony: '\u8a3c\u8a00',
  interview: '\u30a4\u30f3\u30bf\u30d3\u30e5\u30fc',
};

function re(text, flags = 'u') {
  return new RegExp(text, flags);
}

function stripFooter(text) {
  return String(text || '').replace(/(?:Created|Generated) By AI Story Maker V[0-9.]+/g, '').trim();
}

function countMatches(text, rx) {
  return (String(text || '').match(rx) || []).length;
}

function duplicateParagraphCount(text) {
  const seen = new Map();
  let dup = 0;
  for (const para of String(text || '').split(/\n{2,}/).map(s => s.trim()).filter(Boolean)) {
    const normalized = para.replace(/\s+/g, '');
    if (normalized.length < 60) continue;
    const count = seen.get(normalized) || 0;
    if (count) dup += 1;
    seen.set(normalized, count + 1);
  }
  return dup;
}

function hasLabel(text, label) {
  return re(`${label}[:\uff1a]`).test(text);
}

function requiredFormatIssue(mode, body) {
  const text = String(body || '');
  if (mode === '4koma') {
    for (const label of [labels.koma1, labels.koma2, labels.koma3, labels.koma4]) {
      if (!text.includes(label)) return `missing ${label}`;
    }
    if (!re(`${labels.visual}/${labels.situation}[:\uff1a]|${labels.visual}[:\uff1a]`).test(text)) {
      return 'missing visual label';
    }
    if (!hasLabel(text, labels.dialogue)) return 'missing dialogue label';
  }
  if (mode === '4koma_scenario') {
    for (const label of ['Topic', 'Logline', 'Location', 'Outfit', 'Punchline', 'Scenario']) {
      if (!text.includes(`${label}:`)) return `missing ${label}:`;
    }
    for (const label of [labels.koma1, labels.koma2, labels.koma3, labels.koma4]) {
      if (!text.includes(label)) return `missing ${label}`;
    }
  }
  if (mode === 'medium') {
    if (!hasLabel(text, labels.title) && !/^.\S{1,80}./u.test(text)) return 'missing title';
    if (!text.includes(labels.section1) && !text.includes(labels.chapter1)) return 'missing first section';
  }
  if (mode === 'scenario') {
    if (!hasLabel(text, labels.chars)) return 'missing characters';
    const dialogueLines = countMatches(text, /^[^\n:：]{1,20}[:：]/gm);
    if (dialogueLines < 6) return `too few dialogue lines: ${dialogueLines}`;
  }
  if (mode === 'manga') {
    if (!text.includes(labels.page1)) return 'missing page 1';
    if (!text.includes(labels.koma1)) return 'missing panel 1';
    if (!hasLabel(text, labels.visual)) return 'missing visual label';
    if (!hasLabel(text, labels.dialogue)) return 'missing dialogue label';
  }
  if (mode === 'essay' && !hasLabel(text, labels.thesis)) return 'missing thesis';
  if (mode === 'poem') {
    const lineCount = text.split(/\n/).filter(line => line.trim()).length;
    if (lineCount < 12) return `too few poem lines: ${lineCount}`;
  }
  if (mode === 'letter') {
    for (const label of [labels.address, labels.body, labels.sender]) {
      if (!hasLabel(text, label)) return `missing ${label}`;
    }
  }
  if (mode === 'diary') {
    for (const label of [labels.date, labels.body]) {
      if (!hasLabel(text, label)) return `missing ${label}`;
    }
  }
  if (mode === 'documentary') {
    if (!hasLabel(text, labels.narration)) return 'missing narration';
    const testimony = re(`${labels.testimony}/${labels.interview}[:\uff1a]|${labels.testimony}[:\uff1a]|${labels.interview}[:\uff1a]`);
    if (!testimony.test(text)) return 'missing testimony/interview';
  }
  if (mode === 'radio') {
    for (const label of [labels.chars, 'BGM', 'SE']) {
      if (!hasLabel(text, label)) return `missing ${label}`;
    }
  }
  return '';
}

const results = [];
for (const mode of modes) {
  const file = path.join(root, `${provider}-${mode}.txt`);
  const raw = await fs.readFile(file, 'utf8');
  const clean = cleanOutputForPublicMode(raw, mode);
  const body = stripFooter(clean);
  const min = MODE_LENGTH_TARGETS[mode]?.min || 0;
  const rewriteIssue = detectPublicRewriteIssue(mode, raw, min);
  const semanticIssue = detectPublicSemanticLoopIssue(mode, raw);
  const footerCount = countMatches(clean, /(?:Created|Generated) By AI Story Maker V[0-9.]+/g);
  const formatIssue = requiredFormatIssue(mode, body);
  const duplicateParagraphs = duplicateParagraphCount(body);
  const pass = body.length >= min
    && !rewriteIssue
    && !semanticIssue
    && !formatIssue
    && footerCount === 1
    && duplicateParagraphs === 0;
  const metrics = {
    provider,
    mode,
    pass,
    rawChars: raw.length,
    cleanChars: clean.length,
    bodyChars: body.length,
    min,
    footerCount,
    rewriteIssue,
    semanticIssue,
    formatIssue,
    duplicateParagraphs,
    head: body.slice(0, 90),
    tail: body.slice(-140),
  };
  await fs.writeFile(path.join(root, `${provider}-${mode}.metrics.json`), JSON.stringify(metrics, null, 2), 'utf8');
  results.push(metrics);
}

const summary = {
  provider,
  root,
  total: results.length,
  passed: results.filter(r => r.pass).length,
  failed: results
    .filter(r => !r.pass)
    .map(({ mode, bodyChars, min, rewriteIssue, semanticIssue, formatIssue, footerCount, duplicateParagraphs }) => ({
      mode,
      bodyChars,
      min,
      rewriteIssue,
      semanticIssue,
      formatIssue,
      footerCount,
      duplicateParagraphs,
    })),
  results: results.map(({ head, tail, ...rest }) => rest),
};

await fs.writeFile(path.join(root, `${provider}-matrix-summary.json`), JSON.stringify(summary, null, 2), 'utf8');
console.log(JSON.stringify(summary, null, 2));
