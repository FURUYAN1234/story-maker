import assert from 'node:assert/strict';
import { STORY_MAKER_FOOTER } from '../src/version.js';
import {
  AUTO_BRUSHUP_MAX_ATTEMPTS,
  AI_REVIEW_PASS_SCORE,
  buildAiLongifyReview,
  extractAiReviewScore,
  buildLongifyAiReviewPrompt,
  buildLongifyBrushupChapterPrompt,
  buildLongifyBrushupCritiquePrompt,
  buildLongifyChapterPrompt,
  buildLongifyEndingRepairPrompt,
  buildLongifyLedgerPrompt,
  buildLongifyReview,
  buildLongifyTopupPrompt,
  canLongifyOutput,
  cleanLongifyDraft,
  countLongifyChapterHeadings,
  createLongifyRunOptions,
  extractExpectedLongifyChapterDraft,
  extractLongifyEndingAnchors,
  formatLongifyOutput,
  hasLongifySeed,
  isLongifiedOutputText,
  longifyChapterBodyCharLength,
  normalizeLongifyPublicText,
  normalizeLongifySeed,
  resolveLongifyPanelState,
  runLongifyBrushupBeta,
  runLongifyBeta,
  shouldAutoBrushupClearCheckbox,
  setSettingsPanelBusy,
  shouldAutoBrushupContinue,
  splitLongifyManuscript,
  submissionCharLength,
  validateLongifyChapterDraft,
  validateLongifyEndingCompletion,
} from '../src/longifyBeta.js';

const seedStory = `Harbor Light

On a rainy night after closing, Akari found an old photograph inside the cafe register.
The picture showed her missing brother and the owner smiling under the same umbrella.
Akari had been visiting the cafe to search for her brother, but the owner only said,
"Wait until the tide is full." When she understood that sentence, she realized her brother had not run away.
He had disappeared to protect someone. At dawn, Akari chose not to turn off the cafe light,
because she wanted to leave one place where her brother could return.
The drops on the counter and the smell of salt proved the conversation had not been a dream.`;

assert.equal(hasLongifySeed(seedStory), true);
assert.equal(canLongifyOutput({ text: seedStory, outputIsEmpty: true, apiKey: '123456789012345678901234567890' }), false);
assert.equal(canLongifyOutput({ text: seedStory, outputIsEmpty: false, apiKey: '********' }), false);
assert.equal(canLongifyOutput({ text: seedStory, outputIsEmpty: false, apiKey: '123456789012345678901234567890' }), true);
assert.deepEqual(resolveLongifyPanelState({ unavailable: false, busy: true, ready: true }), {
  unavailable: true,
  busy: true,
  ready: false,
  ariaDisabled: 'true',
  ariaBusy: 'true',
});
assert.deepEqual(resolveLongifyPanelState({ unavailable: false, busy: false, ready: true }), {
  unavailable: false,
  busy: false,
  ready: true,
  ariaDisabled: 'false',
  ariaBusy: 'false',
});
assert.equal(normalizeLongifySeed(`${seedStory}\n\n${STORY_MAKER_FOOTER}`).includes(STORY_MAKER_FOOTER), false);
assert.equal(submissionCharLength('あ い\nう\r\n　え\tお'), 5);

function createClassList() {
  const classes = new Set();
  return {
    add(value) {
      classes.add(value);
    },
    remove(value) {
      classes.delete(value);
    },
    contains(value) {
      return classes.has(value);
    },
    toggle(value, force) {
      const active = force === undefined ? !classes.has(value) : Boolean(force);
      if (active) classes.add(value);
      else classes.delete(value);
      return active;
    },
  };
}

function createDomElement(controls = []) {
  const attributes = new Map();
  return {
    classList: createClassList(),
    controls,
    disabled: false,
    title: '',
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    hasAttribute(name) {
      return attributes.has(name);
    },
    removeAttribute(name) {
      attributes.delete(name);
    },
    querySelectorAll() {
      return controls;
    },
  };
}

{
  const analyzeButton = createDomElement();
  const alreadyDisabledInput = createDomElement();
  alreadyDisabledInput.disabled = true;
  const elements = {
    settings: createDomElement(),
    'sa-section': createDomElement([analyzeButton, alreadyDisabledInput]),
  };
  globalThis.document = {
    getElementById(id) {
      return elements[id] || null;
    },
  };
  setSettingsPanelBusy(true, '長編化β処理中');
  assert.equal(elements.settings.classList.contains('generating'), true);
  assert.equal(elements['sa-section'].classList.contains('generating'), true);
  assert.equal(elements['sa-section'].getAttribute('aria-disabled'), 'true');
  assert.equal(analyzeButton.disabled, true);
  assert.equal(alreadyDisabledInput.disabled, true);
  setSettingsPanelBusy(false);
  assert.equal(elements.settings.classList.contains('generating'), false);
  assert.equal(elements['sa-section'].classList.contains('generating'), false);
  assert.equal(elements['sa-section'].getAttribute('aria-disabled'), 'false');
  assert.equal(analyzeButton.disabled, false);
  assert.equal(alreadyDisabledInput.disabled, true);
  delete globalThis.document;
}

assert.deepEqual(
  createLongifyRunOptions({ targetTotalChars: 18000, chapterCount: 4, styleMode: 'intensify', endingMode: 'restructure' }),
  {
    chapterCount: 4,
    targetTotalChars: '最低18,000字（空白・改行除外）',
    targetTotalNumber: 18000,
    targetChars: '最低4,500字（空白・改行除外 / 推奨5,000字以上）',
    minChapterChars: 4500,
    recommendedChapterChars: 5000,
    styleMode: 'intensify',
    styleInstruction: '原作の文体を少し強める',
    endingMode: 'restructure',
    endingInstruction: '結末の意味を残して再構成する',
  }
);
assert.equal(createLongifyRunOptions({ targetTotalChars: 10000 }).chapterCount, 3);
assert.equal(createLongifyRunOptions({ targetTotalChars: 18000 }).chapterCount, 4);
assert.equal(createLongifyRunOptions({ targetTotalChars: 30000 }).chapterCount, 6);
assert.equal(createLongifyRunOptions({ targetTotalChars: 80000 }).chapterCount, 8);
assert.equal(createLongifyRunOptions({ targetTotalChars: 150000 }).chapterCount, 10);

const ledgerPrompt = buildLongifyLedgerPrompt(seedStory, { chapterCount: 6, styleMode: 'intensify', endingMode: 'restructure' });
assert.match(ledgerPrompt, /\u672c\u7b4b\u3092\u5909\u3048\u306a\u3044/);
assert.match(ledgerPrompt, /\u66f2\u3052\u3066\u306f\u3044\u3051\u306a\u3044\u56e0\u679c/);
assert.match(ledgerPrompt, /\u51686\u7ae0\u306e\u7ae0\u53f0\u5e33/);
assert.match(ledgerPrompt, /\u6700\u4f4e\u7dcf\u91cf/);
assert.match(ledgerPrompt, /\u7a7a\u767d\u30fb\u6539\u884c/);
assert.match(ledgerPrompt, /\u539f\u4f5c\u306e\u6587\u4f53\u3092\u5c11\u3057\u5f37\u3081\u308b/);
assert.match(ledgerPrompt, /\u7d50\u672b\u306e\u610f\u5473\u3092\u6b8b\u3057\u3066\u518d\u69cb\u6210\u3059\u308b/);
assert.ok(ledgerPrompt.includes(seedStory));

const chapterPrompt = buildLongifyChapterPrompt({
  seedText: seedStory,
  ledgerText: 'Fixed ledger: Akari leaves the light on for her brother.',
  chapterNumber: 3,
  chapterCount: 6,
  previousBridge: 'Bridge through chapter 2',
  styleMode: 'intensify',
  endingMode: 'restructure',
});
assert.match(chapterPrompt, /\u7b2c3\u7ae0\u3060\u3051/);
assert.match(chapterPrompt, /\u77ed\u7de8\u306e\u82af\u3092\u4fdd\u6301\u3059\u308b/);
assert.match(chapterPrompt, /\u6587\u4f53\u65b9\u91dd/);
assert.match(chapterPrompt, /\u7d50\u672b\u65b9\u91dd/);
assert.match(chapterPrompt, /\u6700\u4f4e\u91cf/);
assert.match(chapterPrompt, /\u3064\u3065\u304f/);
assert.ok(chapterPrompt.includes('Fixed ledger: Akari leaves the light on for her brother.'));
assert.ok(chapterPrompt.includes('Bridge through chapter 2'));

const topupPrompt = buildLongifyTopupPrompt({
  seedText: seedStory,
  ledgerText: 'Fixed ledger',
  currentText: 'Current long draft tail',
  deficitChars: 2400,
  targetTotalChars: 18000,
  chapterCount: 4,
});
assert.match(topupPrompt, /\u6700\u4f4e\u6587\u5b57\u6570\u306b\u5c4a\u3044\u3066\u3044\u307e\u305b\u3093/);
assert.match(topupPrompt, /\u6700\u4f4e3,000\u5b57\u4ee5\u4e0a/);
assert.ok(topupPrompt.includes('Current long draft tail'));

assert.equal(
  cleanLongifyDraft(`\u4ee5\u4e0b\u306b\u672c\u6587\u3092\u66f8\u304d\u307e\u3059\u3002\n\n\u7b2c1\u7ae0\u3000Rain\n\nAkari waited.\n\n${STORY_MAKER_FOOTER}`),
  '\u7b2c1\u7ae0\u3000Rain\n\nAkari waited.'
);
assert.equal(cleanLongifyDraft('\u7b2c5\u7ae0\n\nAkari waited.\n\n\uff08\u3064\u3065\u304f\uff09'), '\u7b2c5\u7ae0\n\nAkari waited.');
assert.equal(
  cleanLongifyDraft('\u7b2c2\u7ae0\n\nAkari waited.\n\n*\n\nShe opened the door.\n\n\uff0a\n\nThe tide moved.\n\n\u203b\n\nDawn came.'),
  '\u7b2c2\u7ae0\n\nAkari waited.\n\nShe opened the door.\n\nThe tide moved.\n\nDawn came.'
);
const contaminatedChapter = [
  '\u3010Source Title\u3011',
  '',
  '## \u7b2c\u4e00\u7ae0\u3000One',
  '',
  'ONE SHOULD REMAIN. '.repeat(60),
  '',
  '## \u7b2c\u4e8c\u7ae0\u3000Two',
  '',
  'TWO SHOULD DROP. '.repeat(60),
  '',
  '## \u7b2c\u4e09\u7ae0\u3000Three',
  '',
  'THREE SHOULD DROP. '.repeat(60),
].join('\n');
const extractedFirstChapter = extractExpectedLongifyChapterDraft(contaminatedChapter, 1);
assert.match(extractedFirstChapter, /^## \u7b2c\u4e00\u7ae0\u3000One/);
assert.match(extractedFirstChapter, /ONE SHOULD REMAIN/);
assert.doesNotMatch(extractedFirstChapter, /TWO SHOULD DROP/);
assert.doesNotMatch(extractedFirstChapter, /THREE SHOULD DROP/);
const duplicateHeadingChapter = extractExpectedLongifyChapterDraft([
  '\u7b2c2\u7ae0',
  '',
  '## \u7b2c2\u7ae0\u3000Two',
  '',
  'TWO SHOULD REMAIN. '.repeat(60),
  '',
  '\u7b2c3\u7ae0\u3000Three',
  '',
  'THREE SHOULD DROP. '.repeat(60),
].join('\n'), 2);
assert.match(duplicateHeadingChapter, /^## \u7b2c2\u7ae0\u3000Two/);
assert.doesNotMatch(duplicateHeadingChapter, /^\u7b2c2\u7ae0\s*$/m);
assert.doesNotMatch(duplicateHeadingChapter, /THREE SHOULD DROP/);
const emptyExpectedThenForeignChapterRaw = [
  '\u7b2c1\u7ae0',
  '',
  '\u7b2c2\u7ae0\u3000Kitchen',
  '',
  'THIS BODY SHOULD BE SALVAGED. '.repeat(80),
].join('\n');
const emptyExpectedThenMisnumberedBody = extractExpectedLongifyChapterDraft(emptyExpectedThenForeignChapterRaw, 1);
assert.match(emptyExpectedThenMisnumberedBody, /^\u7b2c1\u7ae0\u3000Kitchen/);
assert.doesNotMatch(emptyExpectedThenMisnumberedBody, /^\u7b2c2\u7ae0/m);
assert.match(emptyExpectedThenMisnumberedBody, /THIS BODY SHOULD BE SALVAGED/);
assert.ok(longifyChapterBodyCharLength(emptyExpectedThenMisnumberedBody) > 1200);
assert.equal(validateLongifyChapterDraft('\u7b2c1\u7ae0\n\nshort', { chapterNumber: 1, targetChars: 5000 }).ok, false);
assert.equal(validateLongifyChapterDraft(emptyExpectedThenMisnumberedBody, { chapterNumber: 1, targetChars: 5000 }).ok, true);
const mixedChapterValidation = validateLongifyChapterDraft(emptyExpectedThenMisnumberedBody, {
  chapterNumber: 1,
  targetChars: 5000,
  rawText: emptyExpectedThenForeignChapterRaw,
});
assert.equal(mixedChapterValidation.ok, false);
assert.match(mixedChapterValidation.reason, /\u5225\u7ae0/);
assert.equal(
  normalizeLongifyPublicText('Akari waited.\n\n\n\n*\n\n\n\nShe opened the door.\n\n\u203b\n\nDawn came.'),
  'Akari waited.\n\nShe opened the door.\n\nDawn came.'
);
assert.equal(
  normalizeLongifyPublicText('Akari waited.\n\u3000\n\nShe opened the door.\n \n\t\nDawn came.'),
  'Akari waited.\n\nShe opened the door.\n\nDawn came.'
);

const formatted = formatLongifyOutput({
  title: 'Harbor Light',
  chapters: ['\u7b2c1\u7ae0\u3000Rain\n\nAkari waited.\n\n*', `\u7b2c2\u7ae0\u3000Tide\n\nShe saw a shadow.\n\n\u203b\n\n${STORY_MAKER_FOOTER}`],
});
assert.equal((formatted.match(/Created By AI Story Maker/g) || []).length, 1);
assert.equal(/\n\s*[*\uff0a\u203b]{1,5}\s*\n/u.test(formatted), false);
assert.ok(formatted.endsWith(STORY_MAKER_FOOTER));

const longChapterBody = 'Akari noticed the tide, the counter stains, the old photograph, and the owner silence while choosing what not to ask. ';
const longManuscript = `\u3010Harbor Light\u3011

\u7b2c1\u7ae0\u3000Rain

${longChapterBody.repeat(55)}

\u7b2c2\u7ae0\u3000Tide

${longChapterBody.repeat(55)}

${STORY_MAKER_FOOTER}`;
assert.equal(countLongifyChapterHeadings(longManuscript), 2);
assert.equal(isLongifiedOutputText(longManuscript), true);
assert.equal(isLongifiedOutputText(seedStory), false);
const splitLong = splitLongifyManuscript(longManuscript);
assert.equal(splitLong.title, '\u3010Harbor Light\u3011');
assert.equal(splitLong.chapters.length, 2);
assert.match(buildLongifyBrushupCritiquePrompt(longManuscript), /\u8b1b\u8a55\u30e1\u30e2/);
assert.match(buildLongifyBrushupCritiquePrompt(longManuscript, '\u524d\u56de\u8b1b\u8a55: \u4f59\u97fb\u3092\u5f37\u3081\u308b'), /\u524d\u56de\u8b1b\u8a55/);
assert.match(buildLongifyAiReviewPrompt(longManuscript), /AI\u8b1b\u8a55/);
assert.match(buildLongifyAiReviewPrompt(longManuscript), /\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a/);
assert.match(buildLongifyAiReviewPrompt(longManuscript), /AI\u7dcf\u5408\u70b9/);
assert.equal(extractAiReviewScore('AI\u7dcf\u5408\u70b9: 86\u70b9\nAI\u8b1b\u8a55:'), 86);
assert.equal(extractAiReviewScore('\u30b9\u30b3\u30a2: 74'), 74);
assert.equal(extractAiReviewScore('\u70b9\u6570\u306a\u3057'), null);
assert.equal(AI_REVIEW_PASS_SCORE, 80);
assert.equal(AUTO_BRUSHUP_MAX_ATTEMPTS, 3);
assert.equal(shouldAutoBrushupContinue({ score: 79, autoEnabled: true, attempts: 0 }), true);
assert.equal(shouldAutoBrushupContinue({ score: 79, autoEnabled: true, attempts: 2 }), true);
assert.equal(shouldAutoBrushupContinue({ score: 79, autoEnabled: true, attempts: 3 }), false);
assert.equal(shouldAutoBrushupContinue({ score: 80, autoEnabled: true, attempts: 0 }), false);
assert.equal(shouldAutoBrushupContinue({ score: null, autoEnabled: true, attempts: 0 }), false);
assert.equal(shouldAutoBrushupContinue({ score: 79, autoEnabled: false, attempts: 0 }), false);
assert.equal(shouldAutoBrushupContinue({ score: 88, autoEnabled: true, attempts: 0, targetMet: false }), true);
assert.equal(shouldAutoBrushupContinue({ score: 88, autoEnabled: true, attempts: 3, targetMet: false }), false);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 80, targetMet: true }), true);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 88, targetMet: true }), true);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 79, targetMet: true }), false);
assert.equal(shouldAutoBrushupClearCheckbox({ score: null, targetMet: true }), false);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 88, targetMet: false }), false);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 79, targetMet: true, attempts: 3 }), true);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 88, targetMet: false, attempts: 2 }), false);
assert.equal(shouldAutoBrushupClearCheckbox({ score: 88, targetMet: false, attempts: 3 }), true);
assert.equal(shouldAutoBrushupClearCheckbox({ score: null, targetMet: true, attempts: 3 }), true);
assert.match(buildLongifyBrushupChapterPrompt({
  title: splitLong.title,
  critiqueText: '\u7b2c1\u7ae0\u306e\u611f\u60c5\u5909\u5316\u3092\u5f37\u3081\u308b',
  chapterText: splitLong.chapters[0],
  chapterNumber: 1,
  chapterCount: 2,
}), /\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7/);
const review = buildLongifyReview({
  text: longManuscript,
  mode: 'longify',
  targetChars: submissionCharLength(longManuscript) - 10,
  chapterCount: 2,
});
assert.equal(review.modeLabel, '\u9577\u7de8\u5316\u5f8c');
assert.ok(review.score < 80);
assert.ok(review.positives.length >= 1);
assert.ok(review.negatives.length >= 1);
assert.ok(review.analysis.repeatPenalty > 0);
assert.ok(review.negatives.some(item => /\u53cd\u5fa9\u5019\u88dc/.test(item)));
assert.ok(review.brushupPlan.some(item => /\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7|\u88dc\u5f37/.test(item)));
const makePolishedChapter = chapter => Array.from({ length: 18 }, (_, index) => (
  `"Keep the light on," Akari said in scene ${chapter}-${index}. `
  + `The rain sound, salt smell, cold hand, shadow ${chapter}-${index}, breath, and voice stayed in the room while she chose to open the drawer, wait, ask, and protect what her brother wanted. `
  + `Fear, cost, and a different silence moved through the room ${chapter}-${index}.`
)).join('\n\n');
const polishedManuscript = `\u3010Harbor Light\u3011

\u7b2c1\u7ae0\u3000Rain

${makePolishedChapter(1)}

\u7b2c2\u7ae0\u3000Tide

${makePolishedChapter(2)}

\u7b2c3\u7ae0\u3000Dawn

${makePolishedChapter(3)}

${STORY_MAKER_FOOTER}`;
const polishedReview = buildLongifyReview({
  text: polishedManuscript,
  mode: 'longify',
  targetChars: submissionCharLength(polishedManuscript) - 20,
  chapterCount: 3,
});
assert.ok(polishedReview.score > review.score);
assert.ok(polishedReview.analysis.dialogueCount > 0);
assert.ok(polishedReview.details.some(item => /\u4f1a\u8a71\u91cf/.test(item)));
const normalizedBlankReview = buildLongifyReview({
  text: longManuscript.replace('\n\n\u7b2c2\u7ae0', '\n\u3000\n\n\u7b2c2\u7ae0'),
  mode: 'brushup',
  chapterCount: 2,
});
assert.equal(normalizedBlankReview.details.some(item => /\u6bb5\u843d\u9593/.test(item)), false);

const brushupCalls = [];
const brushupResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  priorReviewText: '\u524d\u56de\u8b1b\u8a55: \u7b2c2\u7ae0\u306e\u4f59\u97fb\u3092\u5f37\u3081\u308b',
  targetTotalChars: 9000,
  callText: async (prompt, context) => {
    brushupCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return {
        text: '\u7b2c1\u7ae0\u306f\u611f\u60c5\u5909\u5316\u3001\u7b2c2\u7ae0\u306f\u4f0f\u7dda\u56de\u53ce\u3092\u5f37\u3081\u308b\u3002',
        usedModel: 'mock-critique',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 78\u70b9\nAI\u8b1b\u8a55:\n\u6539\u7a3f\u5f8c\u3082\u7b2c2\u7ae0\u306e\u4f59\u97fb\u304c\u5f31\u3044\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c2\u7ae0\u306f\u6700\u7d42\u9078\u629e\u306e\u4ee3\u511f\u3092\u5897\u3084\u3059\u3002',
        usedModel: 'mock-brushup-review',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Polished\n\n${longChapterBody.repeat(58)}The silence now carried a clearer cost.`,
      usedModel: `mock-brushup-${context.chapterNumber}`,
    };
  },
});
assert.equal(brushupCalls.length, 4);
assert.equal(brushupCalls[0].context.stage, 'brushupCritique');
assert.ok(brushupCalls[0].prompt.includes('\u524d\u56de\u8b1b\u8a55'));
assert.equal(brushupCalls[1].context.stage, 'brushupChapter');
assert.equal(brushupCalls[2].context.chapterNumber, 2);
assert.equal(brushupCalls[3].context.stage, 'brushupReview');
assert.ok(brushupCalls[3].prompt.includes('9,000'));
assert.equal(brushupResult.mode, 'brushup');
assert.equal(brushupResult.chapterCount, 2);
assert.equal(brushupResult.targetTotalNumber, 9000);
assert.ok(brushupResult.critiqueText.includes('\u611f\u60c5\u5909\u5316'));
assert.equal(brushupResult.reviewSource, 'ai');
assert.ok(brushupResult.aiReviewText.includes('\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a'));
const brushupAiReview = buildAiLongifyReview({ text: brushupResult.text, reviewText: brushupResult.aiReviewText, mode: 'brushup', chapterCount: brushupResult.chapterCount });
assert.equal(brushupAiReview.score, 78);
assert.equal(brushupAiReview.passLabel, '\u8981\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7');
const brushupTargetReview = buildAiLongifyReview({
  text: brushupResult.text,
  reviewText: 'AI\u7dcf\u5408\u70b9: 87\u70b9\nAI\u8b1b\u8a55:\n\u6587\u7ae0\u306f\u6539\u5584\u3057\u305f\u304c\u6700\u4f4e\u6587\u5b57\u6570\u306b\u5c4a\u3044\u3066\u3044\u306a\u3044\u3002',
  mode: 'brushup',
  targetChars: submissionCharLength(brushupResult.text) + 1000,
  chapterCount: brushupResult.chapterCount,
});
assert.equal(brushupTargetReview.score, 87);
assert.equal(brushupTargetReview.targetMet, false);
assert.equal(brushupTargetReview.passLabel, '\u8981\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7');
assert.equal(shouldAutoBrushupContinue({
  score: brushupTargetReview.score,
  autoEnabled: true,
  attempts: 1,
  targetMet: brushupTargetReview.targetMet,
}), true);
assert.equal((brushupResult.text.match(/Created By AI Story Maker/g) || []).length, 1);
assert.ok(brushupResult.text.includes('\u7b2c2\u7ae0\u3000Polished'));
assert.equal(isLongifiedOutputText(brushupResult.text), true);

const retryBrushupCalls = [];
const retryBrushupStages = [];
const retryBrushupResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  onStage: stage => retryBrushupStages.push(stage),
  callText: async (prompt, context) => {
    retryBrushupCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return {
        text: '\u7b2c1\u7ae0\u306f\u5834\u9762\u306e\u7d30\u90e8\u3092\u5897\u3084\u3059\u3002',
        usedModel: 'mock-retry-critique',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u518d\u8a66\u884c\u5f8c\u306f\u5834\u9762\u91cf\u304c\u623b\u3063\u305f\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u4f59\u97fb\u3092\u4fdd\u3064\u3002',
        usedModel: 'mock-retry-review',
      };
    }
    if (context.stage === 'brushupChapter' && context.chapterNumber === 1 && context.retryAttempt === 1) {
      return {
        text: '\u7b2c1\u7ae0\u3000Too Short\n\n\u77ed\u3044\u6539\u7a3f\u3002',
        usedModel: 'mock-short-first',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Polished Retry\n\n${longChapterBody.repeat(58)}The scene stayed full after the retry.`,
      usedModel: `mock-retry-${context.chapterNumber}-${context.retryAttempt}`,
    };
  },
});
const retryChapterOneCalls = retryBrushupCalls.filter(call => call.context.stage === 'brushupChapter' && call.context.chapterNumber === 1);
assert.equal(retryBrushupCalls.length, 5);
assert.equal(retryChapterOneCalls.length, 2);
assert.equal(retryChapterOneCalls[0].context.retryAttempt, 1);
assert.equal(retryChapterOneCalls[1].context.retryAttempt, 2);
assert.match(retryChapterOneCalls[1].prompt, /\u518d\u6539\u7a3f\u6307\u793a/);
assert.ok(retryBrushupStages.some(stage => stage.phase === 'brushupChapterRetry' && stage.chapterNumber === 1));
assert.equal(retryBrushupResult.chapterCount, 2);
assert.ok(retryBrushupResult.text.includes('\u7b2c1\u7ae0\u3000Polished Retry'));
assert.equal(isLongifiedOutputText(retryBrushupResult.text), true);

const preserveBrushupCalls = [];
const preserveBrushupStages = [];
const preserveBrushupResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  onStage: stage => preserveBrushupStages.push(stage),
  callText: async (prompt, context) => {
    preserveBrushupCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return {
        text: '\u7b2c2\u7ae0\u306f\u60c5\u5831\u306e\u4e26\u3073\u3092\u5d29\u3055\u305a\u306b\u6574\u3048\u308b\u3002',
        usedModel: 'mock-preserve-critique',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 82\u70b9\nAI\u8b1b\u8a55:\n\u77ed\u3059\u304e\u308b\u6539\u7a3f\u306f\u63a1\u7528\u305b\u305a\u3001\u5143\u7ae0\u306e\u60c5\u5831\u3092\u4fdd\u3063\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c2\u7ae0\u306f\u6b21\u56de\u306b\u5834\u9762\u91cf\u3092\u5897\u3084\u3059\u3002',
        usedModel: 'mock-preserve-review',
      };
    }
    if (context.stage === 'brushupChapter' && context.chapterNumber === 2) {
      return {
        text: '\u7b2c2\u7ae0\u3000Too Short\n\n\u77ed\u3044\u3002',
        usedModel: 'mock-preserve-short',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Preserve Pass\n\n${longChapterBody.repeat(58)}The scene remained complete.`,
      usedModel: `mock-preserve-${context.chapterNumber}`,
    };
  },
});
const preserveChapterTwoCalls = preserveBrushupCalls.filter(call => call.context.stage === 'brushupChapter' && call.context.chapterNumber === 2);
assert.equal(preserveChapterTwoCalls.length, 2);
assert.ok(preserveBrushupStages.some(stage => stage.phase === 'brushupChapterPreserve' && stage.chapterNumber === 2));
assert.equal(preserveBrushupResult.chapterCount, 2);
assert.ok(preserveBrushupResult.text.includes('\u7b2c2\u7ae0\u3000Tide'));
assert.equal(preserveBrushupResult.reviewSource, 'ai');
assert.equal(isLongifiedOutputText(preserveBrushupResult.text), true);

const topupSourceBlock = '\u3042'.repeat(3000);
const topupCompactBlock = '\u3044'.repeat(2300);
const topupAdditionBlock = '\u3046'.repeat(2600);
const topupBrushupSource = `\u3010Topup Check\u3011

\u7b2c1\u7ae0\u3000A

${topupSourceBlock}

\u7b2c2\u7ae0\u3000B

${topupSourceBlock}

\u7b2c3\u7ae0\u3000C

${topupSourceBlock}

${STORY_MAKER_FOOTER}`;
const topupBrushupCalls = [];
const topupBrushupResult = await runLongifyBrushupBeta({
  storyText: topupBrushupSource,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  targetTotalChars: 14000,
  callText: async (prompt, context) => {
    topupBrushupCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return { text: '\u7ae0\u3054\u3068\u306e\u8981\u7d04\u5316\u3092\u9632\u3050\u3002', usedModel: 'mock-topup-critique' };
    }
    if (context.stage === 'brushupTopup') {
      return { text: topupAdditionBlock, usedModel: 'mock-topup-addition' };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 82\u70b9\nAI\u8b1b\u8a55:\n\u6700\u4f4e\u6587\u5b57\u6570\u88dc\u5f37\u5f8c\u306f\u9577\u7de8\u6271\u3044\u3092\u7dad\u6301\u3057\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c3\u7ae0\u306f\u4f59\u97fb\u3092\u6b8b\u3059\u3002',
        usedModel: 'mock-topup-review',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Compact\n\n${topupCompactBlock}`,
      usedModel: `mock-topup-chapter-${context.chapterNumber}-${context.retryAttempt}`,
    };
  },
});
const targetTopupCalls = topupBrushupCalls.filter(call => call.context.stage === 'brushupTopup');
assert.ok(targetTopupCalls.length >= 2);
assert.ok(targetTopupCalls[0].prompt.includes('14,000'));
assert.equal(isLongifiedOutputText(topupBrushupResult.text), true);
assert.ok(topupBrushupResult.text.includes(topupAdditionBlock));
assert.ok(submissionCharLength(topupBrushupResult.text) >= 14000);

const calls = [];
const stages = [];
const result = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 2,
  targetTotalChars: 18000,
  styleMode: 'intensify',
  endingMode: 'restructure',
  onStage: stage => stages.push(stage),
  callText: async (prompt, context) => {
    calls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari keeps the cafe light on. Chapter ledger: photo, tide, dawn.',
        usedModel: 'mock-ledger',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 88\u70b9\nAI\u8b1b\u8a55:\n\u9577\u7de8\u5316\u5f8c\u306e\u5f31\u70b9\u3092\u7ae0\u5225\u306b\u8a18\u9332\u3059\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c3\u7ae0\u306f\u7d50\u672b\u306e\u4ee3\u511f\u3092\u5177\u4f53\u5316\u3059\u308b\u3002\n\u6b21\u56de\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7\u65b9\u91dd:\n\u53cd\u5fa9\u3092\u524a\u308a\u884c\u52d5\u3067\u88dc\u5f37\u3059\u308b\u3002',
        usedModel: 'mock-review',
      };
    }
    const chapterBody = 'Akari keeps looking at the absent brother, the cafe light, the tide, and the counter stains without bending the short story core. ';
    if (context.chapterNumber === 1) {
      return {
        text: [
          '\u3010Harbor Light Complete Draft\u3011',
          '',
          '## \u7b2c1\u7ae0\u3000Harbor',
          '',
          chapterBody.repeat(90),
          '',
          '## \u7b2c2\u7ae0\u3000Copied Source Must Drop',
          '',
          'THIS SOURCE CHAPTER MUST NOT REMAIN. '.repeat(40),
        ].join('\n'),
        usedModel: 'mock-chapter-1',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Harbor\n\n${chapterBody.repeat(90)}`,
      usedModel: `mock-chapter-${context.chapterNumber}`,
    };
  },
});

assert.equal(calls.length, 5);
assert.equal(calls[0].context.stage, 'ledger');
assert.equal(calls[1].context.stage, 'chapter');
assert.equal(calls[3].context.chapterNumber, 3);
assert.equal(calls[4].context.stage, 'longifyReview');
assert.ok(calls[1].prompt.includes('Fixed ledger'));
assert.ok(calls[1].context.options.signal === undefined);
assert.match(calls[2].prompt, /\u7b2c1\u7ae0\u307e\u3067\u306e\u63a5\u7d9a/);
assert.equal(result.chapters.length, 3);
assert.deepEqual(result.usedModels, ['mock-ledger', 'mock-chapter-1', 'mock-chapter-2', 'mock-chapter-3', 'mock-review']);
assert.equal(result.reviewSource, 'ai');
assert.ok(result.aiReviewText.includes('\u6b21\u56de\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7\u65b9\u91dd'));
const aiReview = buildAiLongifyReview({ text: result.text, reviewText: result.aiReviewText, chapterCount: result.chapters.length });
assert.equal(aiReview.source, 'ai');
assert.equal(aiReview.score, 88);
assert.equal(aiReview.passLabel, '\u5408\u683c\u70b9');
const shortAiReview = buildAiLongifyReview({
  text: result.text,
  reviewText: result.aiReviewText,
  targetChars: submissionCharLength(result.text) + 1000,
  chapterCount: result.chapters.length,
});
assert.equal(shortAiReview.score, 88);
assert.equal(shortAiReview.passLabel, '\u8981\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7');
assert.equal(shortAiReview.targetMet, false);
assert.ok(aiReview.aiReviewText.includes('\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a'));
assert.equal(result.options.styleMode, 'intensify');
assert.equal(result.options.endingMode, 'restructure');
assert.ok(stages.some(stage => stage.phase === 'ledger'));
assert.ok(stages.some(stage => stage.phase === 'chapterDone' && stage.chapterNumber === 3));
assert.doesNotMatch(result.chapters[0], /Copied Source Must Drop/);
assert.doesNotMatch(result.text, /THIS SOURCE CHAPTER MUST NOT REMAIN/);
assert.ok(result.text.includes('\u7b2c3\u7ae0\u3000Harbor'));
assert.equal((result.text.match(/Created By AI Story Maker/g) || []).length, 1);

const retryLongifyCalls = [];
const retryLongifyResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 1,
  targetTotalChars: 10000,
  callText: async (prompt, context) => {
    retryLongifyCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari keeps the cafe light on.',
        usedModel: 'mock-retry-ledger',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u7a7a\u7ae0\u304c\u306a\u3044\u3053\u3068\u3092\u78ba\u8a8d\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u5192\u982d\u306e\u5b58\u5728\u611f\u3092\u5f37\u3081\u308b\u3002',
        usedModel: 'mock-retry-review',
      };
    }
    if (context.stage === 'chapter' && context.chapterNumber === 1 && context.retryAttempt === 0) {
      return {
        text: '\u7b2c1\u7ae0\n\nshort',
        usedModel: 'mock-short-chapter',
      };
    }
    if (context.stage === 'chapter' && context.chapterNumber !== 1) {
      return {
        text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Follow ${context.chapterNumber}\n\n${longChapterBody.repeat(180)}`,
        usedModel: `mock-follow-chapter-${context.chapterNumber}`,
      };
    }
    return {
      text: `\u7b2c2\u7ae0\u3000Misnumbered but substantial\n\n${longChapterBody.repeat(180)}`,
      usedModel: 'mock-retry-chapter',
    };
  },
});
assert.ok(retryLongifyCalls.some(call => call.context.stage === 'chapter' && call.context.retryAttempt === 1));
assert.ok(retryLongifyCalls.some(call => /\u524d\u56de\u51fa\u529b\u306f\u4e0d\u5408\u683c/.test(call.prompt)));
assert.match(retryLongifyResult.text, /\u7b2c1\u7ae0\u3000Misnumbered but substantial/);
assert.doesNotMatch(retryLongifyResult.chapters[0], /^\u7b2c2\u7ae0/m);
assert.doesNotMatch(retryLongifyResult.text, /\u7b2c2\u7ae0\u3000Misnumbered but substantial/);
assert.ok(longifyChapterBodyCharLength(retryLongifyResult.chapters[0]) > 5000);

const mixedLongifyCalls = [];
const mixedLongifyResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 1,
  targetTotalChars: 10000,
  callText: async (prompt, context) => {
    mixedLongifyCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari keeps the cafe light on.',
        usedModel: 'mock-mixed-ledger',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 85\u70b9\nAI\u8b1b\u8a55:\n\u7ae0\u6df7\u5165\u304c\u89e3\u6d88\u3055\u308c\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306e\u8d77\u70b9\u3092\u539a\u304f\u3059\u308b\u3002',
        usedModel: 'mock-mixed-review',
      };
    }
    if (context.stage === 'chapter' && context.chapterNumber === 1 && context.retryAttempt === 0) {
      return {
        text: `\u7b2c1\u7ae0\n\n\u7b2c2\u7ae0\u3000Kitchen Mixin\n\n${longChapterBody.repeat(40)}\n\n\u7b2c3\u7ae0\u3000Noise\n\n${longChapterBody.repeat(8)}`,
        usedModel: 'mock-mixed-broken',
      };
    }
    if (context.stage === 'chapter' && context.chapterNumber === 1) {
      return {
        text: `\u7b2c1\u7ae0\u3000Corrected Opening\n\n${longChapterBody.repeat(60)}`,
        usedModel: 'mock-mixed-corrected',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Follow ${context.chapterNumber}\n\n${longChapterBody.repeat(60)}`,
      usedModel: `mock-mixed-follow-${context.chapterNumber}`,
    };
  },
});
assert.ok(mixedLongifyCalls.some(call => call.context.stage === 'chapter' && call.context.retryAttempt === 1));
assert.ok(mixedLongifyCalls.some(call => /\u5225\u7ae0\u304c\u6df7\u5165/.test(call.prompt)));
assert.match(mixedLongifyResult.chapters[0], /^\u7b2c1\u7ae0\u3000Corrected Opening/);
assert.doesNotMatch(mixedLongifyResult.chapters[0], /Kitchen Mixin/);

const completedDorayakiSeed = `【どら焼き大捜査線】

## 第一章　限定どら焼き

アカリたちは商店街で金色の包みを買った。

## 第二章　消えた包み

写真を撮ったあと、包みが消え、全員で探し始めた。

## 第三章　夕暮れの捜索

リンのカメラにミクの袖が映っていた。

## 第四章　発見

ミクのポケットから金色の包みが見つかった。

## 第五章　分け合う夜

みんなでどら焼きを分け合い、失敗も思い出になると知った。

## 第六章　日常への帰還

「また明日ね」と手を振り、アカリは普通だった日常がほんの少しだけ特別へ変わったことを知った。
春の商店街を照らす光はこれからもここにある。`;
const incompleteDorayakiLong = `【どら焼き大捜査線】

第1章　春風

${'商店街の光と金色の包みを追いかける。'.repeat(100)}

第2章　捜索

${'アカリたちは店を回り、どら焼きの行方を探す。'.repeat(100)}

第3章　発見

リンが写真を見返すと、ミクの袖に包みが映っていた。
「見つけた！」`;
const completeDorayakiLong = `${incompleteDorayakiLong}

ミクは謝り、アカリは泣きながら笑った。全員でどら焼きを分け合い、失敗も思い出になると知った。
「また明日ね」と手を振り、アカリは普通だった日常がほんの少しだけ特別へ変わったことを知った。
春の商店街を照らす光はこれからもここにある。`;
assert.ok(extractLongifyEndingAnchors(completedDorayakiSeed).some(anchor => anchor.includes('春の商店街')));
assert.equal(validateLongifyEndingCompletion(incompleteDorayakiLong, completedDorayakiSeed).ok, false);
assert.equal(validateLongifyEndingCompletion(completeDorayakiLong, completedDorayakiSeed).ok, true);
assert.match(buildLongifyEndingRepairPrompt({
  seedText: completedDorayakiSeed,
  ledgerText: '固定台帳',
  currentText: incompleteDorayakiLong,
  targetTotalChars: 10000,
  chapterCount: 3,
}), /必ずそのまま含める終盤アンカー[\s\S]*春の商店街を照らす光はこれからもここにある/);

const endingRepairCalls = [];
const endingRepairBlock = `ミクは謝り、アカリは泣きながら笑った。${'五人は包みを少しずつ分け合い、春の夜の商店街で息を合わせた。'.repeat(14)}
「また明日ね」と手を振り、アカリは普通だった日常がほんの少しだけ特別へ変わったことを知った。
春の商店街を照らす光はこれからもここにある。`;
const endingRepairResult = await runLongifyBeta({
  storyText: completedDorayakiSeed,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  callText: async (prompt, context) => {
    endingRepairCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: '固定台帳: 金色の包みを探し、最後は分け合って日常へ帰る。',
        usedModel: 'mock-ending-ledger',
      };
    }
    if (context.stage === 'endingRepair') {
      return {
        text: endingRepairBlock,
        usedModel: 'mock-ending-repair',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI総合点: 86点\nAI講評:\n結末回収を確認。\n章別の改稿指示:\n第3章の余韻を磨く。',
        usedModel: 'mock-ending-review',
      };
    }
    const body = '商店街の光と限定どら焼きの行方を、会話と行動で場面として厚く描く。'.repeat(170);
    if (context.chapterNumber === 3) {
      return {
        text: `第3章　発見\n\n${body}\n\nリンが写真を見返すと、ミクの袖に包みが映っていた。\n「見つけた！」`,
        usedModel: 'mock-ending-chapter-3',
      };
    }
    return {
      text: `第${context.chapterNumber}章　捜索\n\n${body}`,
      usedModel: `mock-ending-chapter-${context.chapterNumber}`,
    };
  },
});
assert.ok(endingRepairCalls.some(call => call.context.stage === 'endingRepair'));
assert.ok(endingRepairResult.usedModels.includes('mock-ending-repair'));
assert.equal(validateLongifyEndingCompletion(endingRepairResult.text, completedDorayakiSeed).ok, true);
assert.ok(endingRepairResult.text.includes('春の商店街を照らす光はこれからもここにある'));

const endingFallbackReports = [];
const endingFallbackResult = await runLongifyBeta({
  storyText: completedDorayakiSeed,
  apiKey: '123456789012345678901234567890',
  model: 'openai-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onProgress: entry => endingFallbackReports.push(entry),
  callText: async (prompt, context) => {
    if (context.stage === 'ledger') {
      return {
        text: '固定台帳: 金色の包みを探し、最後は分け合って日常へ帰る。',
        usedModel: 'mock-fallback-ledger',
      };
    }
    if (context.stage === 'endingRepair') {
      return {
        text: `ミクは謝り、アカリは笑いながら、みんなで小さなお菓子を分けた。${'夜風の中で友情を確かめ、次の日も一緒に歩こうと約束した。'.repeat(18)}`,
        usedModel: 'mock-fallback-repair',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI総合点: 82点\nAI講評:\n結末回収を確認。\n章別の改稿指示:\n第3章の余韻を磨く。',
        usedModel: 'mock-fallback-review',
      };
    }
    const body = '商店街の光と限定どら焼きの行方を、会話と行動で場面として厚く描く。'.repeat(170);
    if (context.chapterNumber === 3) {
      return {
        text: `第3章　発見\n\n${body}\n\nリンが写真を見返すと、ミクの袖に包みが映っていた。\n「見つけた！」`,
        usedModel: 'mock-fallback-chapter-3',
      };
    }
    return {
      text: `第${context.chapterNumber}章　捜索\n\n${body}`,
      usedModel: `mock-fallback-chapter-${context.chapterNumber}`,
    };
  },
});
assert.equal(validateLongifyEndingCompletion(endingFallbackResult.text, completedDorayakiSeed).ok, true);
assert.ok(endingFallbackResult.text.includes('春の商店街を照らす光はこれからもここにある'));
assert.ok(endingFallbackReports.some(entry => String(entry || '').includes('元本文の終盤を復帰')));

const untitledSeed = `雨が降り続いている。斎藤文具店の硝子戸は、街灯の鈍い光だけを外から差し込んでくる。

結衣はカウンターの端に置かれた古い黒電話を見つめていた。電話は鳴らないはずだった。
それでも深夜になると、誰かが受けたはずのない声だけが帳簿の余白に残っていく。

帳簿には、結衣の知らない筆跡で「今夜は受けないで」と書かれていた。父の失踪した夜にも、同じ雨が降っていたことを思い出す。
電話線は切れている。受話器の内側には水滴がつき、紙の匂いと鉄の匂いが混ざっている。
結衣は逃げたいと思いながら、店の灯りを消さなかった。鳴らない電話を待つことだけが、父に残された約束を確かめる方法だったからだ。`;
const untitledResult = await runLongifyBeta({
  storyText: untitledSeed,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  callText: async (prompt, context) => {
    if (context.stage === 'ledger') {
      return {
        text: '作品タイトル案: 深夜の電話\n\n固定台帳: 黒電話、帳簿、結衣の迷いを軸にする。',
        usedModel: 'mock-ledger-title',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 82\u70b9\nAI\u8b1b\u8a55:\n\u540d\u79f0\u4fdd\u6301\u3092\u78ba\u8a8d\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306e\u96fb\u8a71\u306e\u4f59\u97fb\u3092\u5f37\u3081\u308b\u3002',
        usedModel: 'mock-title-review',
      };
    }
    return {
      text: `第${context.chapterNumber}章　湿度の台帳\n\n${longChapterBody.repeat(60)}`,
      usedModel: `mock-untitled-chapter-${context.chapterNumber}`,
    };
  },
});
assert.equal(untitledResult.title, '深夜の電話');
assert.equal(untitledResult.text.includes('名称未設定の小説'), false);
assert.ok(untitledResult.text.startsWith('【深夜の電話】'));

console.log('longifyBeta tests passed');
