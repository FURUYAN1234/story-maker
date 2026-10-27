import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'vite';
import { NANO_SCENARIO_RULES, NANO_AUTOMATIC_STYLES, NANO_SCENARIO_CONTRACT } from '../src/nanoScenarioContract.js';
import { Jo } from '../src/promptBuilder.js';
import { buildPrompt } from '../src/prompt.js';
import { buildQualityContract } from '../src/modeContracts.js';
import { buildOutputModeStrictContract, buildFinalOutputFormatCheck } from '../src/outputModeContracts.js';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nanoRoot = process.env.NANO_BANANA_PRO_ROOT
  ? path.resolve(process.env.NANO_BANANA_PRO_ROOT)
  : path.resolve(rootDir, '..', 'nano-banana-pro');

const nanoPromptFile = path.join(nanoRoot, 'src', 'lib', 'prompts.js');
// Updated after reviewing the current adjacent Nano Banana Pro STEP2 contract.
const expectedNanoStep2Hash = '698c7efa6d98d89ab57a63f89da8eb963b24ca037e07e7e8445ea76b3d8c0703';

function fail(message) {
  console.error(`[nano-4koma-contract] ${message}`);
  process.exitCode = 1;
}

function hash(text) {
  return crypto.createHash('sha256').update(text.trim()).digest('hex');
}

function extractNanoStep2Contract(source) {
  const startToken = '[1コマ目: 起]';
  const endToken = '全てのセリフの末尾に必ず';
  const start = source.indexOf(startToken);
  if (start < 0) return '';
  const end = source.indexOf(endToken, start);
  if (end < 0) return '';
  const lineEnd = source.indexOf('\n', end);
  return source.slice(start, lineEnd >= 0 ? lineEnd : end + endToken.length).trim();
}

if (!fs.existsSync(nanoPromptFile)) {
  console.warn(`[nano-4koma-contract] skipped: Nano Banana Pro prompt source not found at ${nanoPromptFile}`);
  process.exit(0);
}

// Imported rule exports cover camera, gestures, props, reading/tails, facial
// acting, payoff staging and wardrobe, beyond the old output-block-only hash.
const server = await createServer({ root: nanoRoot, appType: 'custom', logLevel: 'silent', server: { middlewareMode: true, watch: null } });
try {
  // Nano now assembles both panel modes dynamically. Inspect the emitted ordinary
  // four-panel contract rather than relying on a literal source-template heading.
  const { getScenarioPrompt } = await server.ssrLoadModule('/src/lib/prompts.js');
  const nanoContract = extractNanoStep2Contract(getScenarioPrompt({ inputMode: 'manual', manualTopic: '契約確認', targetDate: '2026-10-15', punchlineType: 'Auto', comedyTone: 'standard', customLocation: '', customOutfit: '', newsContext: '', ragReactions: '' }));
  if (!nanoContract) fail('Nano Banana Pro STEP2 contract block was not found. Review Story Maker 4koma_scenario before deploy.');
  else if (hash(nanoContract) !== expectedNanoStep2Hash) fail('Nano Banana Pro STEP2 contract changed. Review Story Maker 4koma_scenario before deploy.');
  for (const rule of NANO_SCENARIO_RULES) {
    const current = await server.ssrLoadModule('/src/lib/'+rule.file);
    if (current[rule.name] !== rule.text) fail(rule.name+' changed. Review the shared Story Maker scenario contract.');
  }
  const current = await server.ssrLoadModule('/src/lib/constants.js');
  const styles = Object.entries(current.STYLE_DRAWING_CONTRACTS).filter(([, value]) => value.automatic).map(([tag]) => ({ tag, recipe: current.COMPACT_EMOTION_STYLES[tag] || current.EMOTION_STYLES[tag].prompt }));
  if (JSON.stringify(styles) !== JSON.stringify(NANO_AUTOMATIC_STYLES)) fail('Automatic styles or drawing recipes changed. Review Story Maker scenario styles.');
} finally { await server.close(); }

const settings = { mode: '4koma_scenario' };
for (const prompt of [Jo(settings).prompt, buildPrompt(settings), buildQualityContract(settings.mode), buildOutputModeStrictContract(settings), buildFinalOutputFormatCheck(settings)]) {
  for (const marker of ['VisualEvidence:', 'BalloonLayout:', 'セリフなし', '無言なら[]', 'anchor', 'route']) {
    if (!prompt.includes(marker)) fail('An emitted Story prompt is missing '+marker);
  }
  if (/無言.*だけのコマは禁止|重複禁止|全コマで吹き出し用セリフ/.test(prompt)) fail('An emitted Story prompt retains contradictory obsolete rules.');
}
if (!Jo(settings).prompt.includes(NANO_SCENARIO_CONTRACT)) fail('The ordinary generation entry point must include the shared Nano rules.');

if (!process.exitCode) console.log('[nano-4koma-contract] Current Nano rule exports, automatic styles and Story generation/revision contracts match.');
