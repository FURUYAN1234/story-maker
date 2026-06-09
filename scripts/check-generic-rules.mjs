import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shouldFix = process.argv.includes('--fix');

const defaultRuleFiles = [
  'src/modeContracts.js',
  'src/qualityBoost.js',
  'src/outputCleanup.js',
  'src/publicRuntime.js',
  'src/prompt.js',
];

const ruleFiles = process.env.SMK_GENERIC_RULE_FILES
  ? process.env.SMK_GENERIC_RULE_FILES
    .split(/[;,]/)
    .map(file => file.trim())
    .filter(Boolean)
  : defaultRuleFiles;

function u(escaped) {
  return JSON.parse(`"${escaped}"`);
}

const generic = {
  setting: u('\\u9078\\u629e\\u6e08\\u307f\\u306e\\u821e\\u53f0'),
  role: u('\\u5165\\u529b\\u3067\\u6307\\u5b9a\\u3055\\u308c\\u305f\\u4eba\\u7269'),
  person: u('\\u5165\\u529b\\u3067\\u6307\\u5b9a\\u3055\\u308c\\u305f\\u4eba\\u7269\\u540d'),
  facility: u('\\u5165\\u529b\\u3067\\u6307\\u5b9a\\u3055\\u308c\\u305f\\u65bd\\u8a2d\\u540d'),
  item: u('\\u5165\\u529b\\u3067\\u6307\\u5b9a\\u3055\\u308c\\u305f\\u5c0f\\u9053\\u5177'),
  clue: u('\\u5165\\u529b\\u3067\\u6307\\u5b9a\\u3055\\u308c\\u305f\\u8a3c\\u62e0\\u54c1'),
};

const replacementRules = [
  [u('\\u8fd1\\u6240\\u306e\\u5e97'), generic.setting, 'fixed setting'],
  [u('\\u7814\\u7a76\\u65bd\\u8a2d'), generic.setting, 'fixed setting'],
  [u('\\u30b3\\u30f3\\u30d3\\u30cb'), generic.setting, 'fixed setting'],
  [u('\\u5546\\u5e97\\u8857'), generic.setting, 'fixed setting'],
  [u('\\u30aa\\u30d5\\u30a3\\u30b9'), generic.setting, 'fixed setting'],
  [u('\\u5b66\\u6821'), generic.setting, 'fixed setting'],
  [u('\\u795e\\u793e'), generic.setting, 'fixed setting'],
  [u('\\u5e38\\u9023\\u5ba2'), generic.role, 'fixed role'],
  [u('\\u5e97\\u9577'), generic.role, 'fixed role'],
  [u('\\u5e97\\u54e1'), generic.role, 'fixed role'],
  [u('\\u5e38\\u9023'), generic.role, 'fixed role'],
  [u('\\u5c71\\u7530\\u592a\\u90ce'), generic.person, 'fixed person name'],
  [u('\\u4f50\\u85e4'), generic.person, 'fixed person name'],
  [u('\\u7530\\u4e2d'), generic.person, 'fixed person name'],
  [u('\\u718a\\u7530'), generic.person, 'fixed person name'],
  [u('\\u30b9\\u30c8\\u30a2'), generic.facility, 'fixed shop name fragment'],
  [u('\\u30de\\u30fc\\u30c8'), generic.facility, 'fixed shop name fragment'],
  [u('\\u30dd\\u30a4\\u30f3\\u30c8\\u30ab\\u30fc\\u30c9'), generic.item, 'fixed item'],
  [u('\\u30bf\\u30d0\\u30b3'), generic.item, 'fixed item'],
  [u('\\u7159\\u8349'), generic.item, 'fixed item'],
  [u('\\u30b7\\u30d5\\u30c8\\u30e1\\u30e2'), generic.clue, 'fixed clue item'],
  [u('\\u7d19\\u30ec\\u30b7\\u30fc\\u30c8'), generic.clue, 'fixed clue item'],
  [u('\\u73fe\\u91d1\\u5dee\\u7570'), generic.clue, 'fixed clue item'],
  [u('\\u7d0d\\u54c1\\u66f8'), generic.clue, 'fixed clue item'],
  [u('\\u68da\\u672d'), generic.clue, 'fixed clue item'],
].sort((a, b) => b[0].length - a[0].length);

const mojibakeTerms = [
  '\\u7e67',
  '\\u7e3a',
  '\\u8b41',
  '\\u8373',
  '\\u8708',
  '\\u90b1',
  '\\u87c6',
  '\\u9adf',
  '\\u8811',
].map(u);

const failures = [];
const fixed = [];

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function findHits(file, text, term, kind) {
  let index = text.indexOf(term);
  while (index !== -1) {
    failures.push({
      file,
      line: lineNumber(text, index),
      term,
      kind,
    });
    index = text.indexOf(term, index + term.length);
  }
}

function replaceAllLiteral(text, search, replacement) {
  return text.split(search).join(replacement);
}

for (const file of ruleFiles) {
  const absolute = path.join(rootDir, file);
  if (!fs.existsSync(absolute)) {
    failures.push({ file, line: 1, term: '(missing file)', kind: 'rule file missing' });
    continue;
  }

  let text = fs.readFileSync(absolute, 'utf8');
  if (shouldFix) {
    let next = text;
    for (const [term, replacement, kind] of replacementRules) {
      if (!next.includes(term)) continue;
      const count = next.split(term).length - 1;
      next = replaceAllLiteral(next, term, replacement);
      fixed.push({ file, term, replacement, kind, count });
    }
    if (next !== text) {
      fs.writeFileSync(absolute, next, 'utf8');
      text = next;
    }
  }

  for (const [term, , kind] of replacementRules) {
    findHits(file, text, term, kind);
  }

  for (const term of mojibakeTerms) {
    findHits(file, text, term, 'mojibake sentinel');
  }
}

if (shouldFix) {
  if (fixed.length) {
    console.log('Generic rule fixer rewrote non-generic public rules:');
    for (const item of fixed) {
      console.log(`- ${item.file}: ${item.kind}: ${item.count} x ${item.term} -> ${item.replacement}`);
    }
  } else {
    console.log(`Generic rule fixer found nothing to rewrite: ${ruleFiles.length} files scanned.`);
  }
}

if (failures.length) {
  console.error('Generic rule guard failed after fix.');
  console.error('Known concrete examples are auto-rewritten with --fix.');
  console.error('Remaining failures need a human or agent rewrite because they are missing files or unreadable/mojibake rule text.');
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} ${failure.kind}: ${failure.term}`);
  }
  process.exit(1);
}

console.log(`Generic rule guard passed: ${ruleFiles.length} files scanned.`);
