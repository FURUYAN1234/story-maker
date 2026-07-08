import assert from 'node:assert/strict';
import { STORY_MAKER_FOOTER } from '../src/version.js';
import {
  AUTO_BRUSHUP_MAX_ATTEMPTS,
  AI_REVIEW_PASS_SCORE,
  LONGIFY_TARGET_POLICY,
  auditLongifyFormat,
  buildAiLongifyReview,
  buildLongifyTargetOptions,
  extractAiReviewScore,
  formatLongifyReviewCopyText,
  buildLongifyAiReviewPrompt,
  buildLongifyBrushupChapterPrompt,
  buildLongifyBrushupCritiquePrompt,
  buildLongifyBrushupProgressionGuide,
  buildLongifyBrushupStructureGuide,
  buildLongifyChapterPrompt,
  buildLongifyEndingRepairPrompt,
  buildLongifyLedgerPrompt,
  buildLongifyReview,
  buildLongifyTopupPrompt,
  buildBrushupProgressionLedgers,
  canLongifyOutput,
  cleanLongifyDraft,
  compactLongifyChapterToMax,
  countLongifyChapterHeadings,
  createBrushupChapterTargetPlan,
  createLongifyChapterGenerationPlan,
  createLongifyChapterTargetRange,
  createLongifyRunOptions,
  extractExpectedLongifyChapterDraft,
  extractLongifyEndingAnchors,
  formatLongifyOutput,
  hasLongifyFormatArtifacts,
  hasLongifySeed,
  installLongifyBeta,
  isLongifyBetaRuntimeEnabled,
  isLongifiedOutputText,
  longifyChapterBodyCharLength,
  normalizeLongifyPublicText,
  normalizeLongifySeed,
  normalizeLongifyUiTargetChars,
  resolveLongifyPanelState,
  resolveLongifyProgressDisplay,
  resolveLongifyProviderWarningState,
  runLongifyBrushupBeta,
  runLongifyBeta,
  sanitizeLongifyBrushupCritique,
  detectBrushupEventRepetition,
  shouldAutoBrushupClearCheckbox,
  setSettingsPanelBusy,
  shouldAutoBrushupContinue,
  shouldPreserveRenderedLongifyReview,
  splitLongifyManuscript,
  submissionCharLength,
  syncLongifyTargetSelect,
  validateBrushupQualityContract,
  validateLongifyChapterDraft,
  validateLongifyEndingCompletion,
} from '../src/longifyBeta.js';

assert.equal(isLongifyBetaRuntimeEnabled({
  locationLike: { protocol: 'http:', hostname: '127.0.0.1', search: '?longifyBetaDev=1' },
}), true);
assert.equal(isLongifyBetaRuntimeEnabled({
  locationLike: { protocol: 'http:', hostname: 'localhost', search: '?longifyBetaDev=1&codex=1' },
}), true);
assert.equal(isLongifyBetaRuntimeEnabled({
  locationLike: { protocol: 'https:', hostname: 'furuyan1234.github.io', search: '?longifyBetaDev=1' },
}), true);
assert.equal(isLongifyBetaRuntimeEnabled({
  locationLike: { protocol: 'http:', hostname: '127.0.0.1', search: '' },
}), true);

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
function createMockClassList() {
  const classes = new Set();
  return {
    add: (...names) => names.forEach(name => classes.add(name)),
    remove: (...names) => names.forEach(name => classes.delete(name)),
    toggle: (name, force) => {
      const shouldAdd = force === undefined ? !classes.has(name) : Boolean(force);
      if (shouldAdd) classes.add(name);
      else classes.delete(name);
      return shouldAdd;
    },
    contains: name => classes.has(name),
  };
}
function createMockElement() {
  const attributes = new Map();
  return {
    checked: false,
    classList: createMockClassList(),
    dataset: {},
    disabled: false,
    innerText: '',
    textContent: '',
    title: '',
    getAttribute: name => attributes.get(name),
    setAttribute: (name, value) => attributes.set(name, String(value)),
    addEventListener() {},
    appendChild(child) {
      this.options ??= [];
      this.options.push(child);
    },
    querySelector() {
      return null;
    },
    set innerHTML(value) {
      assert.equal(value, '');
      this.options = [];
    },
  };
}
{
  const previousDocument = globalThis.document;
  const previousLocation = globalThis.location;
  const previousMutationObserver = globalThis.MutationObserver;
  const previousWindow = globalThis.window;
  const elements = new Map([
    ['output', createMockElement()],
    ['btn-longify-beta', createMockElement()],
    ['btn-longify-stop', createMockElement()],
    ['longify-auto-brushup-until-pass', { ...createMockElement(), checked: true }],
    ['longify-beta-status', createMockElement()],
    ['longify-target-chars', createMockElement()],
    ['longify-beta', createMockElement()],
  ]);
  elements.get('btn-longify-stop').disabled = true;
  elements.get('longify-target-chars').value = '';
  globalThis.location = { protocol: 'https:', hostname: 'furuyan1234.github.io', search: '' };
  globalThis.window = {
    name: '',
    sessionStorage: { getItem: () => null },
    addEventListener() {},
  };
  globalThis.MutationObserver = class {
    observe() {}
  };
  globalThis.document = {
    getElementById: id => elements.get(id) || null,
    createElement: tagName => {
      assert.equal(tagName, 'option');
      return createMockElement();
    },
  };
  try {
    installLongifyBeta();
  } finally {
    if (previousDocument === undefined) delete globalThis.document;
    else globalThis.document = previousDocument;
    if (previousLocation === undefined) delete globalThis.location;
    else globalThis.location = previousLocation;
    if (previousMutationObserver === undefined) delete globalThis.MutationObserver;
    else globalThis.MutationObserver = previousMutationObserver;
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
  const button = elements.get('btn-longify-beta');
  const statusEl = elements.get('longify-beta-status');
  const stopButton = elements.get('btn-longify-stop');
  const autoBrushupCheckbox = elements.get('longify-auto-brushup-until-pass');
  const targetSelect = elements.get('longify-target-chars');
  const rootEl = elements.get('longify-beta');
  assert.equal(button.disabled, true);
  assert.equal(button.getAttribute('aria-disabled'), 'true');
  assert.equal(button.classList.contains('is-disabled'), true);
  assert.equal(button.dataset.longifyInstallerAttached, 'true');
  assert.equal(button.dataset.longifyAction, 'longify');
  assert.equal(button.textContent, 'この小説を長編化');
  assert.equal(statusEl.textContent, 'Output生成・貼り付け・TXTインポート後に使用できます');
  assert.equal(stopButton.disabled, true);
  assert.equal(autoBrushupCheckbox.checked, true);
  assert.equal(autoBrushupCheckbox.disabled, false);
  assert.equal(targetSelect.disabled, true);
  assert.ok(targetSelect.options.some(option => option.value === '10000' && !option.disabled));
  assert.ok(targetSelect.options.some(option => option.value === '20000' && !option.disabled));
  assert.ok(targetSelect.options.some(option => option.value === '30000' && option.disabled));
  assert.equal(rootEl.classList.contains('is-unavailable'), true);
  assert.equal(rootEl.getAttribute('aria-disabled'), 'true');
}
assert.deepEqual(resolveLongifyProviderWarningState({ provider: 'gemini' }), {
  provider: 'gemini',
  visible: true,
  ariaHidden: 'false',
});
assert.deepEqual(resolveLongifyProviderWarningState({ provider: 'openai' }), {
  provider: 'openai',
  visible: false,
  ariaHidden: 'true',
});
const activeLongifyTargetMax = LONGIFY_TARGET_POLICY.activeMax;
assert.equal(normalizeLongifyUiTargetChars(LONGIFY_TARGET_POLICY.min), LONGIFY_TARGET_POLICY.min);
assert.equal(normalizeLongifyUiTargetChars(activeLongifyTargetMax + LONGIFY_TARGET_POLICY.min), activeLongifyTargetMax);
assert.equal(normalizeLongifyUiTargetChars('invalid'), activeLongifyTargetMax);
assert.deepEqual(
  buildLongifyTargetOptions().filter(option => !option.disabled).map(option => option.value),
  LONGIFY_TARGET_POLICY.choices.filter(value => value <= activeLongifyTargetMax),
);
assert.equal(buildLongifyTargetOptions().some(option => option.disabled), true);
const originalDocument = globalThis.document;
const fakeTargetSelect = {
  value: String(activeLongifyTargetMax + LONGIFY_TARGET_POLICY.unitChars),
  options: [],
  set innerHTML(value) {
    assert.equal(value, '');
    this.options = [];
  },
  appendChild(option) {
    this.options.push(option);
  },
};
globalThis.document = {
  createElement(tagName) {
    assert.equal(tagName, 'option');
    return {
      value: '',
      textContent: '',
      disabled: false,
    };
  },
};
assert.equal(syncLongifyTargetSelect(fakeTargetSelect), activeLongifyTargetMax);
assert.equal(fakeTargetSelect.value, String(activeLongifyTargetMax));
assert.equal(fakeTargetSelect.options.length, buildLongifyTargetOptions().length);
assert.equal(fakeTargetSelect.options[0].value, String(LONGIFY_TARGET_POLICY.min));
assert.equal(fakeTargetSelect.options[0].textContent, `最低${LONGIFY_TARGET_POLICY.min.toLocaleString()}字`);
assert.equal(fakeTargetSelect.options[0].disabled, false);
assert.ok(fakeTargetSelect.options.some(option => option.value === String(activeLongifyTargetMax) && !option.disabled));
assert.ok(fakeTargetSelect.options
  .filter(option => Number(option.value) > activeLongifyTargetMax)
  .every(option => option.disabled && option.textContent.includes('当面停止')));
globalThis.document = originalDocument;
assert.deepEqual(resolveLongifyProgressDisplay({
  progressMode: 'brushup',
  brushupAttempt: 2,
  maxBrushupAttempts: 3,
  chapterNumber: 1,
  chapterCount: 3,
}), {
  mode: 'brushup',
  modeLabel: 'ブラッシュアップ 2周目/3',
  brushupAttempt: 2,
  maxBrushupAttempts: 3,
  chapterLabel: '1/3章',
  progressLabel: 'ブラッシュアップ 2周目/3・1/3章',
});
assert.equal(resolveLongifyProgressDisplay({
  progressMode: 'longify',
  chapterNumber: 4,
  chapterCount: 6,
}).progressLabel, '長編化・4/6章');
const exportedReviewText = formatLongifyReviewCopyText({
  modeLabel: '長編化後',
  source: 'ai',
  score: 82,
  passLabel: '合格点',
  summary: '章ごとの因果は確認済みです。',
  details: ['構造チェック済み'],
  aiReviewText: 'AI総合点: 82点\n次回方針: 終盤の象徴回収を強める。',
});
assert.match(exportedReviewText, /長編化後 AI講評: 82点/);
assert.match(exportedReviewText, /講評:\nAI総合点: 82点/);
assert.match(exportedReviewText, /確認項目:\n- 構造チェック済み/);
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
    targetChars: '最低3,960字（空白・改行除外 / 理想4,500字 / 上限目安5,625字）',
    chapterTargetRange: { min: 3960, ideal: 4500, max: 5625 },
    chapterRangeLabel: '3,960〜5,625字（理想4,500字 / 空白・改行除外）',
    minChapterChars: 3960,
    recommendedChapterChars: 4500,
    maxChapterChars: 5625,
    styleMode: 'intensify',
    styleInstruction: '原作の文体を少し強める',
    endingMode: 'restructure',
    endingInstruction: '結末の意味を残して再構成する',
  }
);
for (const { max, chapterCount } of LONGIFY_TARGET_POLICY.chapterBreakpoints) {
  assert.equal(createLongifyRunOptions({ targetTotalChars: max }).chapterCount, chapterCount);
}
assert.equal(
  createLongifyRunOptions({ targetTotalChars: LONGIFY_TARGET_POLICY.max }).chapterCount,
  LONGIFY_TARGET_POLICY.maxChapterCount,
);
const chapterRange = createLongifyChapterTargetRange({ targetTotalChars: 30000, chapterCount: 6 });
assert.deepEqual(chapterRange, {
  min: 4400,
  ideal: 5000,
  max: 6250,
  label: '4,400〜6,250字（理想5,000字 / 空白・改行除外）',
});
const dynamicRunOptions = createLongifyRunOptions({ targetTotalChars: 30000, chapterCount: 6 });
const firstDynamicChapterPlan = createLongifyChapterGenerationPlan({
  runOptions: dynamicRunOptions,
  completedChars: 0,
  chapterNumber: 1,
});
assert.deepEqual(
  {
    min: firstDynamicChapterPlan.min,
    ideal: firstDynamicChapterPlan.ideal,
    max: firstDynamicChapterPlan.max,
    maxOutputTokens: firstDynamicChapterPlan.maxOutputTokens,
  },
  { min: 4400, ideal: 5000, max: 5750, maxOutputTokens: 5635 },
);
const squeezedDynamicChapterPlan = createLongifyChapterGenerationPlan({
  runOptions: dynamicRunOptions,
  completedChars: 26000,
  chapterNumber: 5,
});
assert.ok(squeezedDynamicChapterPlan.max < firstDynamicChapterPlan.max);
assert.equal(squeezedDynamicChapterPlan.maxOutputTokens, 2254);

const ledgerPrompt = buildLongifyLedgerPrompt(seedStory, { chapterCount: 6, styleMode: 'intensify', endingMode: 'restructure' });
assert.match(ledgerPrompt, /\u672c\u7b4b\u3092\u5909\u3048\u306a\u3044/);
assert.match(ledgerPrompt, /\u66f2\u3052\u3066\u306f\u3044\u3051\u306a\u3044\u56e0\u679c/);
assert.match(ledgerPrompt, /\u51686\u7ae0\u306e\u7ae0\u53f0\u5e33/);
assert.match(ledgerPrompt, /\u53cd\u5fa9\u7981\u6b62\u8868/);
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
assert.match(chapterPrompt, /\u5b57\u6570\u30ec\u30f3\u30b8/);
assert.match(chapterPrompt, /\u76ee\u899a\u3081/);
assert.match(chapterPrompt, /\u56fa\u5b9a\u53f0\u5e33\u306e\u7b2c3\u7ae0\u306e\u5f79\u5272/);
assert.match(chapterPrompt, /\u5168\u7ae0\u5f79\u5272\u8868/);
assert.match(chapterPrompt, /\u7b2c3\u7ae0\u306e\u5f79\u5272/);
assert.match(chapterPrompt, /\u7b2c1\u7ae0\u3068\u540c\u3058\u5c0e\u5165/);
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
const warningTopupPrompt = buildLongifyTopupPrompt({
  seedText: seedStory,
  ledgerText: 'Fixed ledger',
  currentText: 'Current long draft tail',
  deficitChars: 2400,
  targetTotalChars: 18000,
  chapterCount: 4,
  structureWarnings: [
    { code: 'episode_retake', chapter: 2, message: '\u7b2c2\u7ae0: same episode arc is being retold.' },
  ],
});
assert.match(warningTopupPrompt, /\u540c\u3058\u30a8\u30d4\u30bd\u30fc\u30c9/);
assert.match(warningTopupPrompt, /\u4e0d\u53ef\u9006/);
assert.match(warningTopupPrompt, /same episode arc/);

assert.equal(
  cleanLongifyDraft(`\u4ee5\u4e0b\u306b\u672c\u6587\u3092\u66f8\u304d\u307e\u3059\u3002\n\n\u7b2c1\u7ae0\u3000Rain\n\nAkari waited.\n\n${STORY_MAKER_FOOTER}`),
  '\u7b2c1\u7ae0\u3000Rain\n\nAkari waited.'
);
assert.equal(cleanLongifyDraft('\u7b2c5\u7ae0\n\nAkari waited.\n\n\uff08\u3064\u3065\u304f\uff09'), '\u7b2c5\u7ae0\n\nAkari waited.');
assert.equal(
  cleanLongifyDraft('\u7b2c1\u7ae0\n\n\u30bf\u30a4\u30c8\u30eb: \u7802\u7cd6\u83d3\u5b50\u3068\u9a0e\u58eb\u305f\u3061\u306e\u8a93\u3044\n\n\u7b2c1\u7bc0\n\nAkari waited.\n\n\u3010\u5b8c\u3011'),
  '\u7b2c1\u7ae0\n\nAkari waited.'
);
assert.equal(
  cleanLongifyDraft('\u7b2c1\u7ae0\n\n# \u7b2c1\u7bc0\n\nAkari waited.\n\n## \u7b2c2\u7bc0\n\nThe shop opened.'),
  '\u7b2c1\u7ae0\n\nAkari waited.\n\nThe shop opened.'
);
assert.equal(
  cleanLongifyDraft('\u7b2c3\u7ae0\n\n\u30bf\u30a4\u30c8\u30eb:  \n\u7070\u306e\u9b54\u6cd5\u9663\u3068\u4e94\u4eba\u306e\u5c11\u5973\u305f\u3061\n\n\u671d\u9732\u304c\u307e\u3060\u6d88\u3048\u306a\u3044\u3002'),
  '\u7b2c3\u7ae0\n\n\u671d\u9732\u304c\u307e\u3060\u6d88\u3048\u306a\u3044\u3002'
);
assert.equal(
  cleanLongifyDraft('\u7b2c1\u7ae0\n\n1\u30b3\u30de\u76ee\n\u7d75/\u72b6\u6cc1: Akari found the candy.\n\u30bb\u30ea\u30d5: Akari: \"We share it.\"\n\u72d9\u3044: Theme explanation.\n\nShe opened the door.'),
  '\u7b2c1\u7ae0\n\nAkari found the candy.\n\nShe opened the door.'
);
assert.equal(
  cleanLongifyDraft('\u7b2c2\u7ae0\n\nAkari waited.\n\n*\n\nShe opened the door.\n\n\uff0a\n\nThe tide moved.\n\n\u203b\n\nDawn came.'),
  '\u7b2c2\u7ae0\n\nAkari waited.\n\nShe opened the door.\n\nThe tide moved.\n\nDawn came.'
);
// cleanLongifyDraft strips **1\u30b3\u30de\u76ee** wrapper line
assert.equal(
  cleanLongifyDraft('\u7b2c1\u7ae0\n\n**1\u30b3\u30de\u76ee**\nShe opened the door.'),
  '\u7b2c1\u7ae0\n\nShe opened the door.'
);
// hasLongifyFormatArtifacts flags **3\u30b3\u30de\u76ee** (markdown emphasis wrapper)
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n**3\u30b3\u30de\u76ee**\nShe opened the door.'),
  true
);
// hasLongifyFormatArtifacts flags full-width \uff0a\uff0a1\u30b3\u30de\u76ee\uff0a\uff0a
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n\uff0a\uff0a1\u30b3\u30de\u76ee\uff0a\uff0a\nShe opened the door.'),
  true
);
// inline bold prose not falsely flagged as a manga panel heading
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n**\u3042\u308b\u671d**\u3001\u5f7c\u306f\u6b69\u3044\u305f\u3002'),
  false
);
// cleanLongifyDraft unwraps **\u7d75/\u72b6\u6cc1:** X and strips the script label, keeping the prose
assert.equal(
  cleanLongifyDraft('\u7b2c1\u7ae0\n\n**\u7d75/\u72b6\u6cc1:** \u591c\u660e\u3051\u524d\u306e\u5546\u5e97\u8857\u3002'),
  '\u7b2c1\u7ae0\n\n\u591c\u660e\u3051\u524d\u306e\u5546\u5e97\u8857\u3002'
);
// cleanLongifyDraft drops a standalone **\u30bb\u30ea\u30d5:** label line
assert.equal(
  cleanLongifyDraft('\u7b2c1\u7ae0\n\n**\u30bb\u30ea\u30d5:**\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002'),
  '\u7b2c1\u7ae0\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002'
);
// guard flags markdown-wrapped script label **\u7d75/\u72b6\u6cc1:**
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n**\u7d75/\u72b6\u6cc1:** \u591c\u660e\u3051\u524d\u306e\u5546\u5e97\u8857\u3002'),
  true
);
// guard flags markdown-wrapped storyboard meta **\u72d9\u3044:**
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n**\u72d9\u3044:** \u4e09\u4eba\u306e\u6c7a\u610f\u3092\u793a\u3059\u3002'),
  true
);
// inline bold prose with a colon that is not a script label stays clean
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n\u5f7c\u306f\u8a00\u3063\u305f\u3002**\u91cd\u8981\u3060\u3063\u305f**\u3002'),
  false
);
const naturalDialogueDraft = '\u7b2c1\u7ae0\n\n\u6faa\u306f\u300c\u3053\u306e\u706f\u308a\u3092\u6d88\u3057\u305f\u304f\u306a\u3044\u300d\u3068\u8a00\u3063\u305f\u3002\n\n\u6625\u4eba\u3082\u300c\u4ffa\u3082\u624b\u4f1d\u3046\u300d\u3068\u3046\u306a\u305a\u3044\u305f\u3002';
assert.equal(hasLongifyFormatArtifacts(naturalDialogueDraft), false);
assert.equal(cleanLongifyDraft(naturalDialogueDraft), naturalDialogueDraft);
const storyboardPreludeDraft = [
  '第1章',
  '',
  '夜の商店街、古びた金物屋の前に立つ澪。雨上がりの湿った空気の中、澪が錆びたシャッターをそっと撫でている。  ',
  '「……これ、祖父ちゃんが描いたのかな」  ',
  '',
  '翌朝、喫茶店の暗がり。澪、春人、奈央がテーブルを囲み、テーブルの上に地図が広げられている。  ',
  '「誰かのイタズラじゃない？」  ',
  '',
  '---',
  '',
  '夜をひときわ冷たくする雨の名残が、澪の足元から薄い霧となって立ち上っていた。',
].join('\n');
assert.equal(hasLongifyFormatArtifacts(storyboardPreludeDraft), true);
assert.equal(
  cleanLongifyDraft(storyboardPreludeDraft),
  '第1章\n\n夜をひときわ冷たくする雨の名残が、澪の足元から薄い霧となって立ち上っていた。'
);
const storyboardPreludeWithoutSeparator = [
  '第3章',
  '',
  '雨上がりの朝、澪が金物屋の前に立ち、湿った路面と店の古びた扉を見つめている。  ',
  '「あの上映会の余韻が、まだこの空気に残ってる気がする……」  ',
  '',
  '澪が祖父の工具箱から磨ききれない真鍮の札を取り出し、優しく指先でなぞる場面。店の前を奈央が眠そうな顔で歩いてきて、静かに手を振る。  ',
  '「昨日……すごかったね」　澪「うん、でも、まだ、何か足りない気がする」  ',
  '',
  '春人がパン屋の袋を提げて現れ、三人が自然と出会ってしまう。三人の足元にはまだ水たまりが残る。  ',
  '「パン屋、開いてたよ」　奈央「……会いに行こうか」  ',
  '',
  '雨上がりの朝、金物屋の軒下にはまだ水滴が残っていた。澪は工具箱を胸に抱え、昨夜から続く決意を言葉にしようとしていた。',
].join('\n');
assert.equal(hasLongifyFormatArtifacts(storyboardPreludeWithoutSeparator), true);
assert.equal(
  cleanLongifyDraft(storyboardPreludeWithoutSeparator),
  '第3章\n\n雨上がりの朝、金物屋の軒下にはまだ水滴が残っていた。澪は工具箱を胸に抱え、昨夜から続く決意を言葉にしようとしていた。'
);
const proseSceneWithDialogueDraft = [
  '第3章',
  '',
  '雨上がりの朝、澪は金物屋の前に立ち、濡れた路面に映る灯りを見つめていた。  ',
  '「昨日の上映会の余韻が、まだこの空気に残ってる気がする……」',
  '',
  '店の前を奈央が眠そうな顔で歩いてきて、澪の手にある真鍮の札を覗き込んだ。  ',
  '「昨日……すごかったね」',
  '',
  '澪は札を握り直し、昨夜から続く決意を言葉にしようとしていた。',
].join('\n');
assert.equal(hasLongifyFormatArtifacts(proseSceneWithDialogueDraft), false);
assert.equal(cleanLongifyDraft(proseSceneWithDialogueDraft), proseSceneWithDialogueDraft);
assert.equal(hasLongifyFormatArtifacts('第3章\n\n1コマ目の後、三人はぬかるみの石畳を一歩ずつ進む。'), true);
assert.equal(
  cleanLongifyDraft('第3章\n\n1コマ目の後、三人はぬかるみの石畳を一歩ずつ進む。'),
  '第3章\n\n三人はぬかるみの石畳を一歩ずつ進む。'
);
assert.equal(hasLongifyFormatArtifacts('【追加本文】\n\n本文が続く。'), true);
assert.equal(hasLongifyFormatArtifacts('【雨上がりの灯台商店街　―長編化計画―】\n\n本文が続く。'), true);
assert.equal(
  hasLongifyFormatArtifacts('【雨上がりの灯台商店街】\n\n第1章　雨上がりの手紙\n\n本文が続く。'),
  false
);
assert.equal(hasLongifyFormatArtifacts('第3章\n\n【雨上がりの灯台商店街】\n\n雨が上がったばかりの朝。商店街の薄曇りの通り。澪と春人、奈央がリボンを手に歩き始めている。  \n\n「朝の空気、まだ雨の匂いが残ってる……」'), true);
assert.equal(
  cleanLongifyDraft('第3章\n\n【雨上がりの灯台商店街】\n\n本文が続く。'),
  '第3章\n\n本文が続く。'
);
assert.equal(hasLongifyFormatArtifacts('第2章\n\n（澪）「昨日の灯り、やっぱり夢じゃなかったはず……」'), true);
assert.equal(
  cleanLongifyDraft('第2章\n\n（澪）「昨日の灯り、やっぱり夢じゃなかったはず……」'),
  '第2章\n\n「昨日の灯り、やっぱり夢じゃなかったはず……」'
);
const browserBrushupLeakDraft = [
  '【雨上がりの灯台商店街】',
  '',
  '第2章',
  '',
  '（澪）「もう一度この地図を見て、確かめよう」  ',
  '（ここで第2章終幕・4コマ目での「次なる行動」への引きを残し、余韻で閉じる）',
  '【雨上がりの灯台商店街】第2章 増補本文',
  '増補本文ここから――',
  '',
  '本文として残す場面。',
  '',
  '――第2章の増補本文ここまで。',
].join('\n');
assert.equal(hasLongifyFormatArtifacts(browserBrushupLeakDraft), true);
const cleanedBrowserBrushupLeakDraft = cleanLongifyDraft(browserBrushupLeakDraft);
assert.equal(cleanedBrowserBrushupLeakDraft.includes('増補本文'), false);
assert.equal(cleanedBrowserBrushupLeakDraft.includes('4コマ目'), false);
assert.equal(cleanedBrowserBrushupLeakDraft.includes('（澪）'), false);
assert.ok(cleanedBrowserBrushupLeakDraft.includes('本文として残す場面。'));
const browserBrushupLeakAudit = auditLongifyFormat(browserBrushupLeakDraft);
assert.equal(browserBrushupLeakAudit.dirty, true);
assert.equal(browserBrushupLeakAudit.ok, true);
assert.ok(browserBrushupLeakAudit.issues.length >= 2);
assert.equal(browserBrushupLeakAudit.remainingIssues.length, 0);
const quotedMetaHeadingLeak = '第3章\n\n「4コマ漫画風長編化・本編差し込み追加本文」\n\n映写会が始まる直前の薄暗い映写室。';
assert.equal(hasLongifyFormatArtifacts(quotedMetaHeadingLeak), true);
assert.equal(
  cleanLongifyDraft(quotedMetaHeadingLeak),
  '第3章\n\n映写会が始まる直前の薄暗い映写室。'
);
assert.equal(
  hasLongifyFormatArtifacts('第3章\n\n八百屋の奥さん「こうやって誰かが来てくれるだけで、まだお店やってるんだって思えるのよ」'),
  true
);
assert.equal(
  cleanLongifyDraft('第3章\n\n八百屋の奥さん「こうやって誰かが来てくれるだけで、まだお店やってるんだって思えるのよ」'),
  '第3章\n\n「こうやって誰かが来てくれるだけで、まだお店やってるんだって思えるのよ」'
);
assert.equal(
  cleanLongifyDraft('\u3010\u7b2c4\u7ae0\u3000\u624b\u6e21\u3057\u306e\u591c\u3011\n\n\u3010\u30bf\u30a4\u30c8\u30eb\u3011\u96e8\u4e0a\u304c\u308a\u306e\u706f\u53f0\u5546\u5e97\u8857\n\n\u6faa\uff08\u5c0f\u58f0\u3067\uff09\u300c\u2026\u2026\u5546\u5e97\u8857\u306b\u3001\u706f\u53f0\u2026\u2026\uff1f\u300d\n\n\u4e09\u4eba\u304c\u77e5\u3089\u305a\u77e5\u3089\u305a\u201c\u6614\u306e\u601d\u3044\u51fa\u201d\u306b\u5f15\u304d\u623b\u3055\u308c\u308b\u77ac\u9593\u3092\u6f14\u51fa\u3002\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002'),
  '\u7b2c4\u7ae0\u3000\u624b\u6e21\u3057\u306e\u591c\n\n\u300c\u2026\u2026\u5546\u5e97\u8857\u306b\u3001\u706f\u53f0\u2026\u2026\uff1f\u300d\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002'
);
assert.equal(
  hasLongifyFormatArtifacts('\u7b2c1\u7ae0\n\n\u6faa\uff08\u5c0f\u58f0\u3067\uff09\u300c\u2026\u2026\u5546\u5e97\u8857\u306b\u3001\u706f\u53f0\u2026\u2026\uff1f\u300d'),
  true
);
const formattedStoryboardLeak = formatLongifyOutput({
  title: '\u96e8\u4e0a\u304c\u308a\u306e\u706f\u53f0\u5546\u5e97\u8857',
  chapters: [
    '\u7b2c1\u7ae0\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002',
    '\u7b2c2\u7ae0\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002',
    '\u7b2c3\u7ae0\n\n\u672c\u6587\u304c\u7d9a\u304f\u3002',
    `\u3010\u7b2c4\u7ae0\u3000\u624b\u6e21\u3057\u306e\u591c\u3011\n\n\u3010\u30bf\u30a4\u30c8\u30eb\u3011\u96e8\u4e0a\u304c\u308a\u306e\u706f\u53f0\u5546\u5e97\u8857\n\n\u6625\u4eba\u300c\u307e\u305f\u6faa\u306e\u3001\u5909\u306a\u5b9d\u63a2\u3057\uff1f\u300d\n\n\u73fe\u5728\u3068\u904e\u53bb\u306e\u8ddd\u96e2\u306e\u5bfe\u6bd4\u3092\u898b\u305b\u308b\u3002\n\n${'\u672c\u6587\u304c\u7d9a\u304f\u3002'.repeat(80)}`,
  ],
});
assert.match(formattedStoryboardLeak, /\n\n\u7b2c4\u7ae0\u3000\u624b\u6e21\u3057\u306e\u591c\n\n/u);
assert.doesNotMatch(formattedStoryboardLeak, /\u3010\u7b2c4\u7ae0|\u3010\u30bf\u30a4\u30c8\u30eb\u3011|\u6625\u4eba\u300c|\u5bfe\u6bd4\u3092\u898b\u305b\u308b/u);
assert.match(formattedStoryboardLeak, /\u300c\u307e\u305f\u6faa\u306e\u3001\u5909\u306a\u5b9d\u63a2\u3057\uff1f\u300d/u);
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
  'THIS BODY SHOULD BE SALVAGED. '.repeat(170),
].join('\n');
const emptyExpectedThenMisnumberedBody = extractExpectedLongifyChapterDraft(emptyExpectedThenForeignChapterRaw, 1);
assert.match(emptyExpectedThenMisnumberedBody, /^\u7b2c1\u7ae0\u3000Kitchen/);
assert.doesNotMatch(emptyExpectedThenMisnumberedBody, /^\u7b2c2\u7ae0/m);
assert.match(emptyExpectedThenMisnumberedBody, /THIS BODY SHOULD BE SALVAGED/);
assert.ok(longifyChapterBodyCharLength(emptyExpectedThenMisnumberedBody) > 4100);
assert.equal(validateLongifyChapterDraft('\u7b2c1\u7ae0\n\nshort', { chapterNumber: 1, targetChars: 5000 }).ok, false);
assert.equal(validateLongifyChapterDraft(emptyExpectedThenMisnumberedBody, { chapterNumber: 1, targetChars: 5000 }).ok, true);
const storyboardFormattedChapter = [
  '\u7b2c1\u7ae0\u3000Festival',
  '',
  'The town waited for the lanterns. '.repeat(180),
  '',
  '# \u9cf3\u51f0\u795e\u8f3f\u3001\u518d\u3073',
  '',
  '## 1\u30b3\u30de\u76ee',
  '',
  'The shop lights blinked in the rain. '.repeat(80),
  '',
  '\u85e4\u91ce: \u2026\u305d\u3046\u3060\u306a\u3002',
].join('\n');
assert.equal(hasLongifyFormatArtifacts(storyboardFormattedChapter), true);
const cleanedStoryboardChapter = cleanLongifyDraft(storyboardFormattedChapter);
assert.doesNotMatch(cleanedStoryboardChapter, /^\s*#\s+/m);
assert.doesNotMatch(cleanedStoryboardChapter, /\u30b3\u30de\u76ee/);
assert.doesNotMatch(cleanedStoryboardChapter, /^\u85e4\u91ce\s*[:\uff1a]/m);
const storyboardChapterValidation = validateLongifyChapterDraft(storyboardFormattedChapter, {
  chapterNumber: 1,
  targetChars: 5000,
  rawText: storyboardFormattedChapter,
});
assert.equal(storyboardChapterValidation.ok, false);
assert.match(storyboardChapterValidation.reason, /\u5c0f\u8aac\u672c\u6587\u3067\u306f\u306a\u3044\u5f62\u5f0f/);
assert.equal(validateLongifyChapterDraft(cleanedStoryboardChapter, {
  chapterNumber: 1,
  targetChars: 5000,
}).ok, true);
const compactedOverlongChapter = compactLongifyChapterToMax(`\u7b2c1\u7ae0\u3000Compact\n\n${'opening choice and cost. '.repeat(120)}\n\n${'middle repetition. '.repeat(180)}\n\n${'ending anchor remains. '.repeat(80)}`, {
  chapterNumber: 1,
  maxChars: 1800,
  minChars: 700,
});
assert.match(compactedOverlongChapter, /^\u7b2c1\u7ae0\u3000Compact/);
assert.ok(longifyChapterBodyCharLength(compactedOverlongChapter) <= 1800);
assert.match(compactedOverlongChapter, /opening choice/);
assert.match(compactedOverlongChapter, /ending anchor/);
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

const headingRepairedFormatted = formatLongifyOutput({
  title: 'Harbor Light',
  chapters: [
    '\u7b2c1\u7ae0\u3000Rain\n\nAkari waited.',
    'This body lost its chapter heading but still belongs to chapter two.',
    '\u7b2c3\u7ae0\u3000Dawn\n\nAkari opened the door.',
  ],
});
assert.equal(countLongifyChapterHeadings(headingRepairedFormatted), 3);
assert.match(headingRepairedFormatted, /\u7b2c2\u7ae0\s+This body lost its chapter heading/u);

const longChapterBody = 'Akari noticed the tide, the counter stains, the old photograph, and the owner silence while choosing what not to ask. ';
const longChapterBodyRain = 'Akari found the photograph under the register, listened to the rain on the cafe shutters, and chose to ask the owner about the missing umbrella. ';
const longChapterBodyTide = 'At full tide, the owner unlocked the back room, showed Akari the salt-stained letter, and asked her to keep the harbor light burning. ';
function repeatedMockChapterBody(chapterNumber, repeat = 58, suffix = '') {
  const body = Number(chapterNumber) === 1 ? longChapterBodyRain : longChapterBodyTide;
  return `${body.repeat(repeat)}${suffix}`;
}
const longManuscript = `\u3010Harbor Light\u3011

\u7b2c1\u7ae0\u3000Rain

${longChapterBodyRain.repeat(55)}

\u7b2c2\u7ae0\u3000Tide

${longChapterBodyTide.repeat(55)}

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
assert.match(buildLongifyAiReviewPrompt(longManuscript), /\u30ec\u30d3\u30e5\u30fc\u7528\u629c\u7c8b\u30d1\u30b1\u30c3\u30c8/);
assert.match(buildLongifyAiReviewPrompt(longManuscript), /\u69cb\u9020\u30fb\u5f62\u5f0f\u306e\u5fc5\u9808\u6e1b\u70b9\u8ef8/);
assert.doesNotMatch(buildLongifyAiReviewPrompt(longManuscript), /EVALUATION_TARGET_MANUSCRIPT/);
assert.equal(extractAiReviewScore('AI\u7dcf\u5408\u70b9: 86\u70b9\nAI\u8b1b\u8a55:'), 86);
assert.equal(extractAiReviewScore('\u30b9\u30b3\u30a2: 74'), 74);
assert.equal(extractAiReviewScore('\u70b9\u6570\u306a\u3057'), null);
assert.equal(extractAiReviewScore(JSON.stringify({
  score: 82,
  commentary: 'JSON review',
  positives: ['keeps the promise'],
  problems: ['needs quieter repetition'],
  chapterDirections: ['第2章の会話を整える'],
  nextBrushupPlan: '余韻を足す',
})), 82);
const reviewPreserveSample = formatLongifyOutput({
  title: 'Review Preserve',
  chapters: ['\u7b2c1\u7ae0\u3000Keep\n\nAkari waited for the full tide.'],
});
const reviewPreserve = buildAiLongifyReview({
  text: reviewPreserveSample,
  reviewText: 'AI\u7dcf\u5408\u70b9: 81\u70b9\nAI\u8b1b\u8a55:\n\u4fdd\u6301\u78ba\u8a8d\u3002',
  structureAudit: { ok: true, blocking: [], warnings: [] },
});
assert.ok(reviewPreserve.details.includes('構造チェック: 合格'));
const reviewFormatCapped = buildAiLongifyReview({
  text: reviewPreserveSample,
  reviewText: 'AI\u7dcf\u5408\u70b9: 92\u70b9\nAI\u8b1b\u8a55:\n\u8868\u5c64\u306f\u8aad\u307f\u3084\u3059\u3044\u3002',
  formatAudit: {
    ok: false,
    dirty: true,
    changed: true,
    issues: ['\u5897\u88dc\u672c\u6587\u30e1\u30bf'],
    remainingIssues: ['\u8a71\u8005\u30e9\u30d9\u30eb'],
  },
  structureAudit: { ok: true, blocking: [], warnings: [] },
});
assert.equal(reviewFormatCapped.score, 69);
assert.ok(reviewFormatCapped.details.some(detail => detail.includes('\u5f62\u5f0f\u30c1\u30a7\u30c3\u30af')));
assert.ok(reviewFormatCapped.details.some(detail => detail.includes('92\u70b9 -> 69\u70b9')));
assert.equal(shouldPreserveRenderedLongifyReview({
  reviewSource: 'ai',
  textSignature: reviewPreserve.signature,
  outputText: reviewPreserveSample,
}), true);
assert.equal(shouldPreserveRenderedLongifyReview({
  reviewSource: 'failed',
  textSignature: reviewPreserve.signature,
  outputText: reviewPreserveSample,
}), true);
assert.equal(shouldPreserveRenderedLongifyReview({
  reviewSource: 'local',
  textSignature: reviewPreserve.signature,
  outputText: reviewPreserveSample,
}), false);
assert.equal(shouldPreserveRenderedLongifyReview({
  reviewSource: 'failed',
  textSignature: reviewPreserve.signature,
  outputText: `${reviewPreserveSample}\nextra`,
}), false);
assert.equal(shouldPreserveRenderedLongifyReview({
  reviewSource: 'format',
  textSignature: reviewPreserve.signature,
  outputText: reviewPreserveSample,
}), true);
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
const repeatedEventWarning = detectBrushupEventRepetition({
  chapterNumber: 1,
  eventKeywords: ['search', 'confront', 'photo'],
  participantKeywords: ['hero', 'owner'],
  outcomeKeywords: ['promise', 'light'],
}, {
  chapterNumber: 2,
  eventKeywords: ['search', 'confront', 'photo'],
  participantKeywords: ['hero', 'owner'],
  outcomeKeywords: ['promise', 'light'],
});
assert.equal(repeatedEventWarning.repeated, true);
assert.match(repeatedEventWarning.reason, /same event/i);
const escalatedEventWarning = detectBrushupEventRepetition({
  chapterNumber: 1,
  eventKeywords: ['search', 'confront', 'photo'],
  participantKeywords: ['hero', 'owner'],
  outcomeKeywords: ['promise', 'light'],
}, {
  chapterNumber: 2,
  eventKeywords: ['escape', 'confess', 'letter'],
  participantKeywords: ['hero', 'owner'],
  outcomeKeywords: ['loss', 'truth'],
});
assert.equal(escalatedEventWarning.repeated, false);
const eventTargetRepeatWarning = detectBrushupEventRepetition({
  chapterNumber: 1,
  eventKeywords: ['question', 'door'],
  participantKeywords: ['mentor'],
  outcomeKeywords: ['warning'],
  qualityDeltas: { eventTypeTargets: ['question:mentor'] },
}, {
  chapterNumber: 2,
  eventKeywords: ['question', 'archive'],
  participantKeywords: ['mentor'],
  outcomeKeywords: ['map'],
  qualityDeltas: { eventTypeTargets: ['question:mentor'] },
});
assert.equal(eventTargetRepeatWarning.repeated, true);
assert.match(eventTargetRepeatWarning.reason, /event-target/i);
const progressionLedgers = buildBrushupProgressionLedgers([
  'Chapter 1\nAkari finds a hidden photo, confronts the cafe owner, and promises to keep the light on.',
  'Chapter 2\nAkari leaves the cafe, loses the old key, and learns that her brother protected a child.',
]);
assert.equal(progressionLedgers.length, 2);
assert.equal(progressionLedgers[0].chapterNumber, 1);
assert.ok(progressionLedgers[0].openingExcerpt.includes('Akari'));
assert.ok(progressionLedgers[0].closingExcerpt.includes('light'));
assert.ok(progressionLedgers[0].newFacts.includes('hidden'));
assert.ok(progressionLedgers[0].openThreads.includes('photo'));
assert.ok(progressionLedgers[0].forbiddenRepeats.some(token => token.startsWith('confront')));
assert.ok(progressionLedgers[0].qualityDeltas);
assert.ok(progressionLedgers[0].qualityDeltas.openingState.includes('akari'));
assert.ok(progressionLedgers[0].qualityDeltas.turningAction.includes('confronts'));
assert.ok(progressionLedgers[0].qualityDeltas.endingState.includes('light'));
assert.ok(progressionLedgers[0].qualityDeltas.requiredDelta.includes('light'));
assert.ok(progressionLedgers[0].qualityDeltas.concreteAnchors.includes('photo'));
assert.ok(progressionLedgers[0].qualityDeltas.eventTypeTargets.some(key => key.includes('confronts:akari')));
const validQualityContract = validateBrushupQualityContract(progressionLedgers[0].qualityDeltas);
assert.equal(validQualityContract.valid, true);
const invalidQualityContract = validateBrushupQualityContract({
  opening_state: ['start'],
  turning_action: ['choice'],
  ending_state: ['changed'],
  required_delta: [],
  concrete_anchors: ['letter'],
});
assert.equal(invalidQualityContract.valid, false);
assert.ok(invalidQualityContract.emptyFields.includes('required_delta'));
const progressionGuide = buildLongifyBrushupProgressionGuide({
  chapterNumber: 2,
  chapterCount: 3,
  sourceLedger: progressionLedgers[1],
  priorLedgers: [progressionLedgers[0]],
  repeatWarnings: [repeatedEventWarning],
});
assert.match(progressionGuide, /Progression ledger/i);
assert.match(progressionGuide, /irreversible progression/i);
assert.match(progressionGuide, /structured_state/i);
assert.match(progressionGuide, /new_facts/i);
assert.match(progressionGuide, /open_threads/i);
assert.match(progressionGuide, /forbidden_repeats/i);
assert.match(progressionGuide, /quality_precision_contract/i);
assert.match(progressionGuide, /opening_state/i);
assert.match(progressionGuide, /turning_action/i);
assert.match(progressionGuide, /ending_state/i);
assert.match(progressionGuide, /required_delta/i);
assert.match(progressionGuide, /concrete_anchors/i);
assert.match(progressionGuide, /event_type_targets/i);
assert.match(progressionGuide, /contract_valid/i);
assert.match(progressionGuide, /Chapter 1/i);
assert.match(progressionGuide, /same event/i);
assert.doesNotMatch(progressionGuide, /undefined/);
const progressionPrompt = buildLongifyBrushupChapterPrompt({
  title: splitLong.title,
  critiqueText: '\u7b2c2\u7ae0\u306e\u9032\u5c55\u3092\u5f37\u3081\u308b',
  chapterText: splitLong.chapters[1],
  chapterNumber: 2,
  chapterCount: 3,
  progressionGuide,
});
assert.match(progressionPrompt, /Progression ledger/i);
assert.match(progressionPrompt, /irreversible progression/i);
assert.match(progressionPrompt, /quality precision/i);
const qualityReviewPrompt = buildLongifyAiReviewPrompt(formatLongifyOutput({
  title: splitLong.title,
  chapters: splitLong.chapters,
}), {
  mode: 'brushup',
  targetChars: 9000,
  chapterCount: splitLong.chapters.length,
});
assert.match(qualityReviewPrompt, /quality_precision_review/i);
assert.match(qualityReviewPrompt, /opening_state -> turning_action -> ending_state/i);
assert.match(buildLongifyBrushupChapterPrompt({
  title: splitLong.title,
  critiqueText: '\u7b2c1\u7ae0\u306e\u611f\u60c5\u5909\u5316\u3092\u5f37\u3081\u308b',
  chapterText: splitLong.chapters[0],
  chapterNumber: 1,
  chapterCount: 2,
}), /\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7/);
const compressionPlan = createBrushupChapterTargetPlan({
  chapterText: '\u3042'.repeat(12000),
  chapterCount: 6,
  targetTotalChars: 30000,
  sourceTotalChars: 72000,
});
assert.equal(compressionPlan.compressionMode, true);
assert.equal(compressionPlan.strategy, 'compress');
assert.deepEqual(
  {
    min: compressionPlan.min,
    ideal: compressionPlan.ideal,
    max: compressionPlan.max,
    hardMinimum: compressionPlan.hardMinimum,
  },
  { min: 4100, ideal: 5000, max: 5900, hardMinimum: 2255 },
);
const compressionPrompt = buildLongifyBrushupChapterPrompt({
  title: splitLong.title,
  critiqueText: '\u540c\u578b\u306e\u5192\u982d\u3092\u524a\u308b',
  chapterText: splitLong.chapters[0],
  chapterNumber: 1,
  chapterCount: 6,
  targetPlan: compressionPlan,
});
assert.match(compressionPrompt, /\u904e\u9577\u539f\u7a3f\u306e\u5727\u7e2e\u6539\u7a3f/);
assert.match(compressionPrompt, /\u5143\u7ae0\u3088\u308a\u77ed\u304f\u3057\u3066\u3088\u3044/);
assert.match(compressionPrompt, /\u5168\u6587\u3092\u9010\u8a9e\u7684\u306b\u518d\u73fe\u3057\u306a\u3044/);
assert.match(compressionPrompt, /\u76ee\u899a\u3081/);
const malformedCritique = `\u7b2c1\u7ae0\u3000Rain\n\n${longChapterBody.repeat(45)}\n\n\u7b2c2\u7ae0\u3000Tide\n\n${longChapterBody.repeat(45)}`;
const sanitizedCritique = sanitizeLongifyBrushupCritique(malformedCritique, {
  manuscript: longManuscript,
  compressionMode: true,
  targetTotalChars: 30000,
  sourceTotalChars: 72000,
  chapterCount: 6,
});
assert.match(sanitizedCritique, /\u30ed\u30fc\u30ab\u30eb\u5727\u7e2e\u65b9\u91dd/);
assert.match(sanitizedCritique, /\u9010\u8a9e\u7684\u306b\u518d\u73fe\u3057\u306a\u3044/);
assert.doesNotMatch(sanitizedCritique, /^\u7b2c1\u7ae0/);
const storyboardCritique = `## \u96e8\u306e\u5546\u5e97\u8857\u3068\u4e09\u3064\u306e\u706f\u308a

### 1\u30b3\u30de\u76ee

${longChapterBody.repeat(22)}`;
const sanitizedStoryboardCritique = sanitizeLongifyBrushupCritique(storyboardCritique, {
  manuscript: longManuscript,
  targetTotalChars: 30000,
  sourceTotalChars: 30000,
  chapterCount: 6,
});
assert.match(sanitizedStoryboardCritique, /\u30ed\u30fc\u30ab\u30eb\u6539\u7a3f\u65b9\u91dd/);
assert.doesNotMatch(sanitizedStoryboardCritique, /1\u30b3\u30de\u76ee/);
const proseDraftCritique = `\u307f\u305a\u307b\u30de\u30fc\u30c8\u306e\u9589\u5e97\u5f8c\u3001\u85e4\u91ce\u306f\u4f11\u61a9\u5ba4\u3067\u53e4\u3044\u5199\u771f\u3092\u898b\u3064\u3081\u3066\u3044\u308b\u3002\u5f7c\u306e\u8868\u60c5\u306b\u306f\u5bc2\u3057\u3055\u3068\u8907\u96d1\u306a\u611f\u60c5\u304c\u5165\u308a\u6df7\u3058\u3063\u3066\u3044\u308b\u3002\n\n${longChapterBody.repeat(14)}`;
const sanitizedProseDraftCritique = sanitizeLongifyBrushupCritique(proseDraftCritique, {
  manuscript: longManuscript,
  targetTotalChars: 30000,
  sourceTotalChars: 30000,
  chapterCount: 6,
});
assert.match(sanitizedProseDraftCritique, /\u30ed\u30fc\u30ab\u30eb\u6539\u7a3f\u65b9\u91dd/);
assert.doesNotMatch(sanitizedProseDraftCritique, /\u8907\u96d1\u306a\u611f\u60c5/);
const validCritique = '\u8b1b\u8a55\u30e1\u30e2:\n\u7b2c1\u7ae0\u306f\u53cd\u5fa9\u3092\u524a\u308a\u3001\u7b2c2\u7ae0\u306f\u4ee3\u511f\u3092\u5177\u4f53\u5316\u3059\u308b\u3002';
assert.equal(sanitizeLongifyBrushupCritique(validCritique, { manuscript: longManuscript }), validCritique);
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

const longManuscriptSplit = splitLongifyManuscript(longManuscript);
const structuralGuide = buildLongifyBrushupStructureGuide({
  critiqueText: '第1章と第2章の導入が重複し、第6章にクライマックスが集中している。時系列に沿って再構成する。',
  sourceChapters: longManuscriptSplit.chapters,
  targetTotalChars: 30000,
});
assert.match(structuralGuide, /全体再構成台帳/);
assert.match(structuralGuide, /章単位の磨きではなく/);
assert.match(structuralGuide, /第1章の役割/);
assert.match(structuralGuide, /第2章の役割/);
assert.match(structuralGuide, /現原稿素材マップ/);

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
    const rewrittenBody = context.chapterNumber === 1
      ? 'Akari returns to the rainy cafe, asks about the photograph, and decides to wait for the full tide with the owner. '
      : 'At the harbor room, Akari reads the salt-stained letter, understands her brother choice, and leaves the light burning. ';
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Polished\n\n${rewrittenBody.repeat(58)}The silence now carried a clearer cost.`,
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
assert.ok(brushupCalls[1].prompt.includes('全体再構成台帳'));
assert.ok(brushupCalls[1].prompt.includes('第1章の役割'));
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

const missingHeadingBrushupResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  callText: async (prompt, context) => {
    if (context.stage === 'brushupCritique') {
      return {
        text: '\u7ae0\u898b\u51fa\u3057\u304c\u6d88\u3048\u3066\u3082\u672c\u6587\u69cb\u9020\u3092\u4fdd\u6301\u3059\u308b\u3002',
        usedModel: 'mock-missing-heading-critique',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 70\u70b9\nAI\u8b1b\u8a55:\n\u7ae0\u898b\u51fa\u3057\u306f\u30a2\u30d7\u30ea\u5074\u3067\u5fa9\u5143\u3055\u308c\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u3068\u7b2c2\u7ae0\u306e\u5dee\u3092\u5f37\u3081\u308b\u3002',
        usedModel: 'mock-missing-heading-review',
      };
    }
    return {
      text: repeatedMockChapterBody(context.chapterNumber, 58, `The chapter body intentionally has no heading ${context.chapterNumber}.`),
      usedModel: `mock-missing-heading-${context.chapterNumber}`,
    };
  },
});
assert.equal(countLongifyChapterHeadings(missingHeadingBrushupResult.text), 2);
assert.match(missingHeadingBrushupResult.text, /\u7b2c1\u7ae0\s+Akari found/);
assert.match(missingHeadingBrushupResult.text, /\u7b2c2\u7ae0\s+At full tide/);
assert.equal(isLongifiedOutputText(missingHeadingBrushupResult.text), true);

await assert.rejects(
  () => runLongifyBrushupBeta({
    storyText: longManuscript,
    apiKey: '123456789012345678901234567890',
    model: 'gemini-test',
    expectedChapterCount: 3,
    callText: async () => {
      throw new Error('unexpected brushup call');
    },
  }),
  /\u7ae0\u898b\u51fa\u3057/,
);

const priorReviewReuseCalls = [];
const priorReviewReuseText = 'AI\u7dcf\u5408\u70b9: 75\u70b9\nAI\u8b1b\u8a55:\n\u53cd\u5fa9\u3092\u6e1b\u3089\u3057\u3001\u55ab\u8336\u5e97\u304b\u3089\u59cb\u3081\u308b\u5c0e\u5165\u306b\u5909\u3048\u308b\u3002\n\u554f\u984c\u70b9:\n\u5404\u7ae0\u306e\u5192\u982d\u304c\u4f3c\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u55ab\u8336\u5e97\u304b\u3089\u59cb\u3081\u308b\u56fa\u6709\u5c0e\u5165\u306b\u3059\u308b\u3002';
const priorReviewReuseResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  priorReviewText: priorReviewReuseText,
  callText: async (prompt, context) => {
    priorReviewReuseCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return {
        text: `\u7b2c1\u7ae0\n\n${longChapterBody.repeat(90)}`,
        usedModel: 'mock-body-shaped-critique',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 81\u70b9\nAI\u8b1b\u8a55:\n\u524d\u56de\u8b1b\u8a55\u306b\u5f93\u3063\u3066\u5c0e\u5165\u304c\u6539\u5584\u3057\u305f\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u3053\u306e\u8abf\u5b50\u3092\u4fdd\u3064\u3002',
        usedModel: 'mock-prior-review-reuse-review',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Prior Reuse\n\n${repeatedMockChapterBody(context.chapterNumber, 58, 'The revised opening now starts from the cafe counter.')}`,
      usedModel: `mock-prior-review-reuse-${context.chapterNumber}`,
    };
  },
});
const firstPriorReuseChapterCall = priorReviewReuseCalls.find(call => call.context.stage === 'brushupChapter');
assert.ok(priorReviewReuseResult.critiqueText.includes('\u55ab\u8336\u5e97\u304b\u3089\u59cb\u3081\u308b'));
assert.ok(firstPriorReuseChapterCall.prompt.includes('\u55ab\u8336\u5e97\u304b\u3089\u59cb\u3081\u308b'));

const regressionGuardResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  priorReviewText: 'AI\u7dcf\u5408\u70b9: 86\u70b9\nAI\u8b1b\u8a55:\n\u73fe\u72b6\u306f\u5408\u683c\u70b9\u3060\u304c\u5c0f\u3055\u3044\u53cd\u5fa9\u304c\u6b8b\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u5192\u982d\u3092\u5c11\u3057\u77ed\u304f\u3059\u308b\u3002',
  callText: async (prompt, context) => {
    if (context.stage === 'brushupCritique') {
      return { text: '\u53cd\u5fa9\u3092\u5c11\u3057\u524a\u308b\u3002', usedModel: 'mock-regression-critique' };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 85\u70b9\nAI\u8b1b\u8a55:\n\u6539\u7a3f\u5f8c\u306b\u69cb\u6210\u304c\u5c11\u3057\u5f31\u304f\u306a\u3063\u305f\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u5143\u306b\u623b\u3059\u3002',
        usedModel: 'mock-regression-review',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Regression\n\n${repeatedMockChapterBody(context.chapterNumber, 58, 'This revision lost the prior quality.')}`,
      usedModel: `mock-regression-${context.chapterNumber}`,
    };
  },
});
assert.equal(regressionGuardResult.scoreRegressionBlocked, true);
assert.equal(regressionGuardResult.retainedScore, 86);
assert.equal(regressionGuardResult.rejectedScore, 85);
assert.equal(regressionGuardResult.reviewSource, 'ai');
assert.match(regressionGuardResult.aiReviewText, /86\u70b9/);
assert.equal(countLongifyChapterHeadings(regressionGuardResult.text), 2);
assert.equal((regressionGuardResult.text.match(/Created By AI Story Maker/g) || []).length, 1);
assert.doesNotMatch(regressionGuardResult.text, /Regression/);

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
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Polished Retry\n\n${repeatedMockChapterBody(context.chapterNumber, 58, 'The scene stayed full after the retry.')}`,
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

const sanitizedBestCandidateCalls = [];
const sanitizedBestCandidateStages = [];
const sanitizedBestCandidateBody = `${longChapterBodyRain.repeat(34)}Sanitized candidate kept the shopkeeper argument, wet sleeves, and changed choice.`;
const sanitizedBestCandidateResult = await runLongifyBrushupBeta({
  storyText: longManuscript,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  targetTotalChars: 9000,
  onStage: stage => sanitizedBestCandidateStages.push(stage),
  callText: async (prompt, context) => {
    sanitizedBestCandidateCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return {
        text: '\u7b2c1\u7ae0\u306f\u5546\u5e97\u4e3b\u3068\u306e\u5bfe\u7acb\u3092\u5177\u4f53\u5316\u3059\u308b\u3002',
        usedModel: 'mock-best-candidate-critique',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 81\u70b9\nAI\u8b1b\u8a55:\n\u6700\u826f\u5019\u88dc\u306e\u63a1\u7528\u3067\u7ae0\u306e\u5177\u4f53\u6027\u304c\u6b8b\u3063\u305f\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u4f59\u767d\u3092\u8abf\u6574\u3059\u308b\u3002',
        usedModel: 'mock-best-candidate-review',
      };
    }
    if (context.stage === 'brushupChapter' && context.chapterNumber === 1 && context.retryAttempt === 1) {
      return {
        text: [
          '\u7b2c1\u7ae0\u3000Candidate',
          '',
          '# \u51e4\u51f0\u795e\u8f3f\u3001\u518d\u3073',
          '',
          '## 1\u30b3\u30de\u76ee',
          '',
          sanitizedBestCandidateBody,
          '',
          '\u85e4\u91ce: \u2026\u305d\u3046\u3060\u306a\u3002',
        ].join('\n'),
        usedModel: 'mock-best-candidate-first',
      };
    }
    if (context.stage === 'brushupChapter' && context.chapterNumber === 1 && context.retryAttempt === 2) {
      return {
        text: '\u7b2c1\u7ae0\u3000Worse\n\n\u77ed\u3044\u3002',
        usedModel: 'mock-best-candidate-worse',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Stable\n\n${repeatedMockChapterBody(context.chapterNumber, 58, 'The second chapter stayed stable.')}`,
      usedModel: `mock-best-candidate-${context.chapterNumber}`,
    };
  },
});
assert.ok(sanitizedBestCandidateCalls.filter(call => call.context.stage === 'brushupChapter' && call.context.chapterNumber === 1).length >= 1);
assert.ok(sanitizedBestCandidateStages.some(stage => stage.phase === 'brushupChapterSanitized' && stage.chapterNumber === 1));
assert.match(sanitizedBestCandidateResult.text, /Sanitized candidate kept/);
assert.doesNotMatch(sanitizedBestCandidateResult.text, /^\s*#\s+/m);
assert.doesNotMatch(sanitizedBestCandidateResult.text, /\u30b3\u30de\u76ee/);
assert.doesNotMatch(sanitizedBestCandidateResult.text, /^\u85e4\u91ce\s*[:\uff1a]/m);
assert.equal(sanitizedBestCandidateResult.reviewSource, 'ai');
assert.equal(isLongifiedOutputText(sanitizedBestCandidateResult.text), true);

const preserveBrushupCalls = [];
const preserveBrushupStages = [];
const longManuscriptWithStoryboardTail = longManuscript.replace(
  STORY_MAKER_FOOTER,
  `\n# \u9cf3\u51f0\u795e\u8f3f\u3001\u518d\u3073\n\n## 1\u30b3\u30de\u76ee\n\n${longChapterBody.repeat(10)}\n\n\u85e4\u91ce: \u2026\u305d\u3046\u3060\u306a\u3002\n\n${STORY_MAKER_FOOTER}`,
);
const preserveBrushupResult = await runLongifyBrushupBeta({
  storyText: longManuscriptWithStoryboardTail,
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
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Preserve Pass\n\n${repeatedMockChapterBody(context.chapterNumber, 58, 'The scene remained complete.')}`,
      usedModel: `mock-preserve-${context.chapterNumber}`,
    };
  },
});
const preserveChapterTwoCalls = preserveBrushupCalls.filter(call => call.context.stage === 'brushupChapter' && call.context.chapterNumber === 2);
assert.equal(preserveChapterTwoCalls.length, 2);
assert.ok(preserveBrushupStages.some(stage => stage.phase === 'brushupChapterPreserve' && stage.chapterNumber === 2));
assert.equal(preserveBrushupResult.chapterCount, 2);
assert.ok(preserveBrushupResult.text.includes('\u7b2c2\u7ae0\u3000Tide'));
assert.doesNotMatch(preserveBrushupResult.text, /^\s*#\s+/m);
assert.doesNotMatch(preserveBrushupResult.text, /\u30b3\u30de\u76ee/);
assert.doesNotMatch(preserveBrushupResult.text, /^\u85e4\u91ce\s*[:\uff1a]/m);
assert.equal(preserveBrushupResult.reviewSource, 'ai');
assert.equal(isLongifiedOutputText(preserveBrushupResult.text), true);

const topupSourceBlock = '\u3042'.repeat(3000);
const topupCompactBlock = '\u3044'.repeat(2300);
const topupAdditionBlock = '\u3046'.repeat(2600);
const topupCompactBlocks = {
  1: 'Akari checks the rain ledger in the cafe kitchen, finds a missing receipt, and decides to ask the harbor clerk before dawn. '.repeat(22),
  2: 'Riku crosses the wet shopping street, loses the clerk as a witness, and chooses to confront the town-hall vote at noon. '.repeat(22),
  3: 'Mio carries the repaired lantern to the ferry office, trades the receipt for a promise, and leaves the counter light burning. '.repeat(22),
};
const topupBrushupSource = `\u3010Topup Check\u3011

\u7b2c1\u7ae0\u3000A

${topupSourceBlock}

\u7b2c2\u7ae0\u3000B

${topupSourceBlock}

\u7b2c3\u7ae0\u3000C

${topupSourceBlock}

${STORY_MAKER_FOOTER}`;
const topupBrushupCalls = [];
let contaminatedTopupReturned = false;
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
      if (!contaminatedTopupReturned) {
        contaminatedTopupReturned = true;
        return {
          text: [
            '【Topup Check】',
            '',
            '雨が上がったばかりの朝。商店街の薄曇りの通り。澪と春人、奈央がリボンを手に歩き始めている。  ',
            '「朝の空気、まだ雨の匂いが残ってる……」',
            '',
            '八百屋の奥さん「こうやって誰かが来てくれるだけで、まだお店やってるんだって思えるのよ」',
            '本文形式に見えるが別稿の再開として混入した補強。'.repeat(20),
          ].join('\n'),
          usedModel: 'mock-topup-contaminated',
        };
      }
      return { text: topupAdditionBlock, usedModel: 'mock-topup-addition' };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 82\u70b9\nAI\u8b1b\u8a55:\n\u6700\u4f4e\u6587\u5b57\u6570\u88dc\u5f37\u5f8c\u306f\u9577\u7de8\u6271\u3044\u3092\u7dad\u6301\u3057\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c3\u7ae0\u306f\u4f59\u97fb\u3092\u6b8b\u3059\u3002',
        usedModel: 'mock-topup-review',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Compact\n\n${topupCompactBlocks[context.chapterNumber] || topupCompactBlock}`,
      usedModel: `mock-topup-chapter-${context.chapterNumber}-${context.retryAttempt}`,
    };
  },
});
const targetTopupCalls = topupBrushupCalls.filter(call => call.context.stage === 'brushupTopup');
assert.ok(targetTopupCalls.length >= 2);
assert.ok(targetTopupCalls[0].prompt.includes('14,000'));
assert.equal(isLongifiedOutputText(topupBrushupResult.text), true);
assert.equal(topupBrushupResult.formatAudit.ok, true);
assert.equal((topupBrushupResult.text.match(/【Topup Check】/g) || []).length, 1);
assert.equal(topupBrushupResult.text.includes('八百屋の奥さん'), false);
assert.ok(topupBrushupResult.text.includes(topupAdditionBlock));
assert.ok(submissionCharLength(topupBrushupResult.text) >= 14000);

const brushupClosureCalls = [];
const brushupClosureStages = [];
const brushupClosureSource = `\u3010Brushup Closure\u3011

\u7b2c1\u7ae0\u3000Open Stall

${'Akari counts the stall receipts, changes one promise into one concrete debt, and ends the scene with the shutters locked. '.repeat(28)}

\u7b2c2\u7ae0\u3000Rain Account

${'Riku carries the rain account to the arcade office, loses a witness, and ends the scene by choosing the next public step. '.repeat(28)}

\u7b2c3\u7ae0\u3000Morning Light

${'Mio returns the lantern to the cafe counter, accepts the cost, and ends the scene with the morning light steady. '.repeat(28)}

${STORY_MAKER_FOOTER}`;
const brushupClosureChapters = {
  1: `\u7b2c1\u7ae0\u3000Open Stall\n\n${'Akari counts the stall receipts, changes one promise into one concrete debt, and ends the scene with the shutters locked. '.repeat(24)}`,
  2: `\u7b2c2\u7ae0\u3000Rain Account\n\n${'Riku carries the rain account to the arcade office, loses a witness, and ends the scene by choosing the next public step. '.repeat(24)}`,
  3: `\u7b2c3\u7ae0\u3000Morning Light\n\n${'Mio returns the lantern to the cafe counter, accepts the cost, and ends the scene with the morning light steady. '.repeat(24)}`,
};
const brushupTruncatedTopup = `${'The added closing scene keeps the debt visible, moves the crowd through the arcade, and returns to the cafe light. '.repeat(20)}The final shared breath remains`;
const brushupClosureResult = await runLongifyBrushupBeta({
  storyText: brushupClosureSource,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  targetTotalChars: 10000,
  onStage: stage => brushupClosureStages.push(stage),
  callText: async (prompt, context) => {
    brushupClosureCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return { text: 'Keep the final debt visible and prevent the top-up from ending mid-sentence.', usedModel: 'mock-brushup-closure-critique' };
    }
    if (context.stage === 'brushupTopup') {
      return { text: brushupTruncatedTopup, usedModel: 'mock-brushup-closure-topup' };
    }
    if (context.stage === 'brushupFinalClosureRepair') {
      return {
        text: ' and closes when Akari locks the cafe door, thanks the gathered neighbors, and lets the repaired promise rest.',
        usedModel: 'mock-brushup-closure-repair',
      };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u88dc\u5f37\u5f8c\u306e\u7d42\u7aef\u88dc\u5b8c\u307e\u3067\u53cd\u6620\u3055\u308c\u3066\u3044\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c3\u7ae0\u306e\u4f59\u97fb\u3092\u3055\u3089\u306b\u6b8b\u3059\u3002',
        usedModel: 'mock-brushup-closure-review',
      };
    }
    return {
      text: brushupClosureChapters[context.chapterNumber] || brushupClosureChapters[3],
      usedModel: `mock-brushup-closure-chapter-${context.chapterNumber}`,
    };
  },
});
assert.ok(brushupClosureCalls.some(call => call.context.stage === 'brushupFinalClosureRepair'));
assert.ok(brushupClosureStages.some(stage => stage.phase === 'brushupFinalClosureRepair' && stage.chapterNumber === 3));
assert.equal(brushupClosureResult.reviewSource, 'ai');
assert.equal(brushupClosureResult.structureAudit.ok, true);
assert.ok(brushupClosureResult.text.includes('lets the repaired promise rest'));

const preTopupLoopCalls = [];
const preTopupLoopStages = [];
const preTopupLoopBody = 'Akari opens the cafe ledger, crosses the wet alley, argues at the harbor office, and burns the same receipt before dawn. '.repeat(28);
const preTopupLoopResult = await runLongifyBrushupBeta({
  storyText: topupBrushupSource,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  targetTotalChars: 14000,
  onStage: stage => preTopupLoopStages.push(stage),
  callText: async (prompt, context) => {
    preTopupLoopCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return { text: 'Repeat structure should be repaired before adding more text.', usedModel: 'mock-pretopup-critique' };
    }
    if (context.stage === 'brushupTopup') {
      throw new Error('brushup top-up should not run while a chapter loop is already detected');
    }
    if (context.stage === 'brushupReview') {
      throw new Error('AI review should not run before the structure issue is repaired');
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Loop Guard\n\n${preTopupLoopBody}`,
      usedModel: `mock-pretopup-loop-${context.chapterNumber}`,
    };
  },
});
assert.equal(preTopupLoopResult.reviewSource, 'structure');
assert.ok(preTopupLoopResult.structureAudit.blocking.some(issue => issue.code === 'chapter_loop'));
assert.equal(preTopupLoopCalls.some(call => call.context.stage === 'brushupTopup'), false);
assert.ok(preTopupLoopStages.some(stage => stage.phase === 'brushupStructurePreTopup'));

const compressionSourceChapter = '\u3042'.repeat(7000);
const compressionRewrittenChapter = '\u3044'.repeat(5000);
const compressionBrushupSource = [
  '\u3010Compression Check\u3011',
  ...Array.from({ length: 6 }, (_, index) => `\u7b2c${index + 1}\u7ae0\u3000Source ${index + 1}\n\n${compressionSourceChapter}`),
  STORY_MAKER_FOOTER,
].join('\n\n');
const compressionBrushupCalls = [];
const compressionBrushupResult = await runLongifyBrushupBeta({
  storyText: compressionBrushupSource,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  targetTotalChars: 30000,
  callText: async (prompt, context) => {
    compressionBrushupCalls.push({ prompt, context });
    if (context.stage === 'brushupCritique') {
      return { text: '\u7ae0\u3054\u3068\u306e\u540c\u578b\u53cd\u5fa9\u3092\u524a\u308b\u3002', usedModel: 'mock-compress-critique' };
    }
    if (context.stage === 'brushupReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 83\u70b9\nAI\u8b1b\u8a55:\n\u904e\u9577\u53cd\u5fa9\u304c\u6574\u7406\u3055\u308c\u3001\u7ae0\u3054\u3068\u306e\u5f79\u5272\u304c\u660e\u78ba\u306b\u306a\u3063\u305f\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c6\u7ae0\u306f\u7740\u5730\u306e\u4f59\u97fb\u3092\u4fdd\u3064\u3002',
        usedModel: 'mock-compress-review',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Compressed ${context.chapterNumber}\n\n${compressionRewrittenChapter}`,
      usedModel: `mock-compress-${context.chapterNumber}`,
    };
  },
});
assert.equal(compressionBrushupCalls.some(call => call.context.stage === 'brushupTopup'), false);
assert.match(compressionBrushupCalls.find(call => call.context.stage === 'brushupCritique').prompt, /\u904e\u9577/);
assert.match(compressionBrushupCalls.find(call => call.context.stage === 'brushupChapter').prompt, /\u904e\u9577\u539f\u7a3f\u306e\u5727\u7e2e\u6539\u7a3f/);
assert.ok(submissionCharLength(compressionBrushupResult.text) < submissionCharLength(compressionBrushupSource));
assert.ok(submissionCharLength(compressionBrushupResult.text) >= 30000);
assert.equal(isLongifiedOutputText(compressionBrushupResult.text), true);

const overlongCompressionCalls = [];
let overlongCompressionError = null;
try {
  await runLongifyBrushupBeta({
    storyText: compressionBrushupSource,
    apiKey: '123456789012345678901234567890',
    model: 'gemini-test',
    targetTotalChars: 30000,
    callText: async (prompt, context) => {
      overlongCompressionCalls.push({ prompt, context });
      if (context.stage === 'brushupCritique') {
        return { text: '\u7b2c1\u7ae0\u3000Bad\n\n\u672c\u6587\u306e\u3088\u3046\u306a\u8b1b\u8a55\u5931\u6557\u3002\n\n\u7b2c2\u7ae0\u3000Bad\n\n\u7d9a\u304d\u3082\u672c\u6587\u3002', usedModel: 'mock-overlong-critique' };
      }
      if (context.stage === 'brushupReview') {
        throw new Error('overlong compression must stop before review');
      }
      return {
        text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Still Too Long\n\n${'\u3042'.repeat(9000)}`,
        usedModel: `mock-overlong-${context.chapterNumber}-${context.retryAttempt}`,
      };
    },
  });
} catch (error) {
  overlongCompressionError = error;
}
assert.ok(overlongCompressionError);
assert.match(overlongCompressionError.message, /\u5727\u7e2e\u6539\u7a3f\u306b\u5931\u6557/);
assert.equal(overlongCompressionCalls.filter(call => call.context.stage === 'brushupChapter').length, 3);
assert.ok(overlongCompressionCalls
  .filter(call => call.context.stage === 'brushupChapter')
  .every(call => call.context.options.maxOutputTokens <= 3894));
assert.ok(overlongCompressionCalls.some(call => call.context.stage === 'brushupCritique'));
assert.equal(overlongCompressionCalls.some(call => call.context.stage === 'brushupReview'), false);

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
    // Each chapter uses distinct content so the (real) re-enactment/overlap
    // detector does not reject the stubbed manuscript.
    const distinctBodies = {
      1: 'Akari opens the harbor cafe at dawn, wiping counter stains while gulls cry over the grey tide. ',
      2: 'A storm traps two strangers inside; Akari argues with the fisherman about the missing ledger of debts. ',
      3: 'Akari finally rows out to the lighthouse, returns the photograph, and lets the brother go for good. ',
    };
    const chapterBody = distinctBodies[context.chapterNumber]
      || `Unique scene number ${context.chapterNumber} with its own people, place, and irreversible choice. `;
    if (context.chapterNumber === 1) {
      return {
        text: [
          '\u3010Harbor Light Complete Draft\u3011',
          '',
          '## \u7b2c1\u7ae0\u3000Harbor',
          '',
          chapterBody.repeat(60),
          '',
          '## \u7b2c2\u7ae0\u3000Copied Source Must Drop',
          '',
          'THIS SOURCE CHAPTER MUST NOT REMAIN. '.repeat(40),
        ].join('\n'),
        usedModel: 'mock-chapter-1',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Harbor\n\n${chapterBody.repeat(60)}`,
      usedModel: `mock-chapter-${context.chapterNumber}`,
    };
  },
});

assert.ok(calls.length >= 5);
assert.equal(calls[0].context.stage, 'ledger');
assert.equal(calls[1].context.stage, 'chapter');
assert.ok(calls.some(call => call.context.stage === 'chapter' && call.context.chapterNumber === 3));
assert.equal(calls[calls.length - 1].context.stage, 'longifyReview');
assert.ok(calls[1].prompt.includes('Fixed ledger'));
assert.ok(calls[1].prompt.includes('元短編の出来事順'));
assert.ok(calls[1].context.options.signal === undefined);
assert.match(calls[2].prompt, /\u7b2c1\u7ae0\u306e\u78ba\u5b9a/);
assert.equal(result.chapters.length, 3);
for (const modelName of ['mock-ledger', 'mock-chapter-1', 'mock-chapter-2', 'mock-chapter-3', 'mock-review']) {
  assert.ok(result.usedModels.includes(modelName));
}
assert.equal(result.reviewSource, 'ai');
assert.equal(result.formatAudit.ok, true);
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

const structureGateCalls = [];
const structureLoopA = 'Akari keeps the blue cafe light beside the old harbor compass, remembers the brother promise, and listens while the morning tide shakes the window. ';
const structureLoopB = 'Akari keeps the blue cafe light beside the old harbor compass, remembers the brother promise, and listens as the morning tide shakes the window. ';
const structureGateResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 2,
  targetTotalChars: 15000,
  callText: async (prompt, context) => {
    structureGateCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari follows one source timeline from cafe light to final promise.',
        usedModel: 'mock-structure-ledger',
      };
    }
    if (context.stage === 'longifyReview') {
      throw new Error('AI review must not be called when structure audit fails');
    }
    const chapterNumber = context.chapterNumber || 1;
    return {
      text: `第${chapterNumber}章　Structure Gate\n\n${(chapterNumber === 1 ? structureLoopA : structureLoopB).repeat(70)}`,
      usedModel: `mock-structure-chapter-${chapterNumber}`,
    };
  },
});
assert.equal(structureGateResult.reviewSource, 'structure');
assert.equal(structureGateResult.structureAudit.ok, false);
assert.ok(structureGateResult.structureAudit.blocking.some(issue => issue.code === 'chapter_loop'));
assert.doesNotMatch(structureGateResult.aiReviewText, /AI総合点: 8[0-9]点/);
assert.ok(!structureGateCalls.some(call => call.context.stage === 'longifyReview'));
assert.ok(result.text.includes('\u7b2c3\u7ae0\u3000Harbor'));
assert.equal((result.text.match(/Created By AI Story Maker/g) || []).length, 1);

const sanitizedAdoptCalls = [];
const sanitizedAdoptStages = [];
const sanitizedAdoptResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => sanitizedAdoptStages.push(stage),
  callText: async (prompt, context) => {
    sanitizedAdoptCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return { text: 'Fixed ledger: Akari protects the cafe light.', usedModel: 'mock-sanitize-ledger' };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 82\u70b9\nAI\u8b1b\u8a55:\n\u5f62\u5f0f\u6383\u9664\u5f8c\u306e\u672c\u6587\u3092\u78ba\u8a8d\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u5192\u982d\u306e\u884c\u52d5\u3092\u5f37\u3081\u308b\u3002',
        usedModel: 'mock-sanitize-review',
      };
    }
    const chapterBodies = {
      1: 'Akari unlocks the shuttered shop, finds the brass map behind the clock, and writes down the first route before the rain stops. ',
      2: 'At the library desk, Riku compares old town records, refuses the demolition notice, and schedules a public screening with witnesses. ',
      3: 'Inside the small theater, the neighbors gather evidence, decide who will speak at city hall, and leave with the clock ticking again. ',
    };
    const repeatCounts = { 1: 32, 2: 24, 3: 24 };
    const chapterBody = chapterBodies[context.chapterNumber] || chapterBodies[1];
    if (context.chapterNumber === 1) {
      return {
        text: [
          '\u7b2c1\u7ae0\u3000Sanitized',
          '',
          chapterBody.repeat(26),
          '',
          '# Extra panel heading',
          '',
          '## 1\u30b3\u30de\u76ee',
          '',
          'Akari: \"This line must be stripped.\"',
          '',
          chapterBody.repeat(6),
        ].join('\n'),
        usedModel: 'mock-sanitize-chapter-1',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Clean\n\n${`${chapterBody}Chapter ${context.chapterNumber} adds a distinct place and cost. `.repeat(repeatCounts[context.chapterNumber] || 24)}`,
      usedModel: `mock-sanitize-chapter-${context.chapterNumber}`,
    };
  },
});
assert.equal(
  sanitizedAdoptCalls.filter(call => call.context.stage === 'chapter' && call.context.chapterNumber === 1).length,
  1,
);
assert.ok(sanitizedAdoptStages.some(stage => stage.phase === 'chapterSanitized' && stage.chapterNumber === 1));
assert.equal(sanitizedAdoptResult.chapters.length, 3);
assert.doesNotMatch(sanitizedAdoptResult.text, /1\u30b3\u30de\u76ee|Extra panel heading|Akari:/);
assert.equal(sanitizedAdoptResult.reviewSource, 'ai');

const duplicateGateCalls = [];
const duplicateGateStages = [];
const duplicateSentence = 'first-chapter-only rhythm keeps the old photograph, cafe light, and tide in the same order. ';
const distinctSentence = 'second chapter distinct choice moves through the locked alley, wet key, and changed promise. ';
const duplicateGateResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => duplicateGateStages.push(stage),
  callText: async (prompt, context) => {
    duplicateGateCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return { text: 'Fixed ledger: each chapter must move to a different place and choice.', usedModel: 'mock-duplicate-ledger' };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u91cd\u8907\u7ae0\u306f\u518d\u751f\u6210\u3055\u308c\u305f\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c2\u7ae0\u306f\u4ee3\u511f\u3092\u6b8b\u3059\u3002',
        usedModel: 'mock-duplicate-review',
      };
    }
    if (context.chapterNumber === 1) {
      return {
        text: `\u7b2c1\u7ae0\u3000Original\n\n${duplicateSentence.repeat(42)}`,
        usedModel: 'mock-duplicate-chapter-1',
      };
    }
    if (context.chapterNumber === 2 && context.retryAttempt === 0) {
      return {
        text: `\u7b2c2\u7ae0\u3000Duplicated\n\n${duplicateSentence.repeat(42)}`,
        usedModel: 'mock-duplicate-chapter-2-bad',
      };
    }
    if (context.chapterNumber === 2) {
      return {
        text: `\u7b2c2\u7ae0\u3000Distinct\n\n${distinctSentence.repeat(42)}`,
        usedModel: 'mock-duplicate-chapter-2-fixed',
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Clean\n\n${longChapterBody.repeat(45)}`,
      usedModel: `mock-duplicate-chapter-${context.chapterNumber}`,
    };
  },
});
assert.ok(duplicateGateCalls.filter(call => call.context.stage === 'chapter' && call.context.chapterNumber === 2).length >= 2);
assert.ok(duplicateGateStages.some(stage => stage.phase === 'chapterRetry' && stage.chapterNumber === 2));
const duplicateRetryPrompt = duplicateGateCalls.find(
  call => call.context.stage === 'chapter'
    && call.context.chapterNumber === 2
    && call.context.retryAttempt === 1,
)?.prompt || '';
// The rejected bulk duplicate draft must not be echoed back in the overlap
// retry. (The brief continuity memo may reference chapter 1's summary, but the
// 42x-repeated draft body must not be re-fed.)
assert.doesNotMatch(duplicateRetryPrompt, /前回の本文候補/);
assert.match(duplicateRetryPrompt, /前回候補は既存章と重なったため参照しない/);
assert.match(splitLongifyManuscript(duplicateGateResult.text).chapters[1], /second chapter distinct choice/);
assert.doesNotMatch(splitLongifyManuscript(duplicateGateResult.text).chapters[1], /first-chapter-only rhythm/);
assert.equal(duplicateGateResult.reviewSource, 'ai');

const episodeRetakeGateCalls = [];
const episodeRetakeGateStages = [];
const episodeA = [
  '澪は古い写真を発見し、春人に相談した。',
  '二人は保存計画を実行しようと決め、関係者から証言を受け取った。',
  '反対する担当者に止められたが、祖父が写真を残した理由が分かった。',
  '最後に記録を公開し、止まっていた時計が動き始めた。',
].join('');
const episodeBRetake = [
  '終盤では記録が公開され、時計が時を刻みはじめる。',
  '春人の視点では、古い写真を発見する場面から始まる。',
  '証言を受け取ったあと担当者に止められ、祖父の理由を知る。',
  '澪に相談し、保存計画を実行しようと決める。',
].join('');
const episodeBDistinct = [
  '翌朝、澪は保存申請の締切表を読み、必要書類の束を前に息を整えた。',
  '春人は濡れた申請書を直し、名前の抜けを補修した。',
  '二人は新しい手続きのため署名欄を整え、提出の準備をした。',
  '期限が迫る中でどちらが責任を負うか言い争い、澪は謝りきれないまま朝を迎えた。',
].join('');
const expandJapaneseChapter = (body, count, label) => {
  const variants = {
    公開後の余波: '店先の古い照明が揺れ、澪は濡れた封筒の角を押さえながら返事を待った。',
    別視点の余波: '帳簿の余白に残った鉛筆跡を春人がなぞり、言えなかった疑問だけが残った。',
    申請準備の余波: '役場の蛍光灯の下で申請書の端が乾き、澪は空欄の責任者名を見つめた。',
  };
  const tail = variants[label] || 'それぞれの場面に固有の沈黙が残り、次の行動だけが手元に残った。';
  return `${body}${Array.from({ length: count }, (_, index) => (
    `${label}${index + 1}。${tail}`
  )).join('')}`;
};
const episodeRetakeGateResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => episodeRetakeGateStages.push(stage),
  callText: async (prompt, context) => {
    episodeRetakeGateCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return { text: 'Fixed ledger: each chapter must advance the town-photo story instead of retelling it.', usedModel: 'mock-retake-ledger' };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI総合点: 84点\nAI講評:\n章ごとの前進を確認。\n章別の改稿指示:\n第2章は保存申請の摩擦を強める。',
        usedModel: 'mock-retake-review',
      };
    }
    if (context.chapterNumber === 1) {
      return {
        text: `第1章　写真の公開\n\n${expandJapaneseChapter(episodeA, 65, '公開後の余波')}`,
        usedModel: 'mock-retake-chapter-1',
      };
    }
    if (context.chapterNumber === 2 && context.retryAttempt === 0) {
      return {
        text: `第2章　別視点の写真\n\n${expandJapaneseChapter(episodeBRetake, 65, '別視点の余波')}`,
        usedModel: 'mock-retake-chapter-2-bad',
      };
    }
    if (context.chapterNumber === 2) {
      return {
        text: `第2章　保存申請\n\n${expandJapaneseChapter(episodeBDistinct, 65, '申請準備の余波')}`,
        usedModel: 'mock-retake-chapter-2-fixed',
      };
    }
    return {
      text: `第${context.chapterNumber}章　次の選択\n\n${longChapterBody.repeat(45)}`,
      usedModel: `mock-retake-chapter-${context.chapterNumber}`,
    };
  },
});
assert.ok(episodeRetakeGateCalls.filter(call => call.context.stage === 'chapter' && call.context.chapterNumber === 2).length >= 2);
assert.ok(episodeRetakeGateStages.some(stage => stage.phase === 'chapterRetry' && stage.chapterNumber === 2));
const episodeRetakeRetryPrompt = episodeRetakeGateCalls.find(
  call => call.context.stage === 'chapter'
    && call.context.chapterNumber === 2
    && call.context.retryAttempt === 1,
)?.prompt || '';
assert.match(episodeRetakeRetryPrompt, /前回候補は既存章と重なったため参照しない/);
assert.match(episodeRetakeRetryPrompt, /発見→相談→決意→実行→対立→判明→公開\/解決/);
assert.match(splitLongifyManuscript(episodeRetakeGateResult.text).chapters[1], /保存申請/);
assert.doesNotMatch(splitLongifyManuscript(episodeRetakeGateResult.text).chapters[1], /別視点の写真/);
assert.equal(episodeRetakeGateResult.reviewSource, 'ai');

const episodeRetakeRescueCalls = [];
const episodeRetakeRescueStages = [];
const episodeRetakeRescueResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => episodeRetakeRescueStages.push(stage),
  callText: async (prompt, context) => {
    episodeRetakeRescueCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return { text: 'Fixed ledger: keep retrying generic retakes, but do not fail a valid chapter forever.', usedModel: 'mock-retake-rescue-ledger' };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI総合点: 84点\nAI講評:\n章ごとの前進を確認。',
        usedModel: 'mock-retake-rescue-review',
      };
    }
    if (context.chapterNumber === 1) {
      return {
        text: `第1章　写真の公開\n\n${expandJapaneseChapter(episodeA, 65, '公開後の余波')}`,
        usedModel: 'mock-retake-rescue-chapter-1',
      };
    }
    if (context.chapterNumber === 2) {
      return {
        text: `第2章　別視点の写真\n\n${expandJapaneseChapter(episodeBRetake, 65, '別視点の余波')}`,
        usedModel: `mock-retake-rescue-chapter-2-${context.retryAttempt || 0}`,
      };
    }
    return {
      text: `第${context.chapterNumber}章　次の選択\n\n${longChapterBody.repeat(45)}`,
      usedModel: `mock-retake-rescue-chapter-${context.chapterNumber}`,
    };
  },
});
assert.ok(episodeRetakeRescueCalls.filter(call => call.context.stage === 'chapter' && call.context.chapterNumber === 2).length >= 4);
assert.ok(episodeRetakeRescueStages.some(stage => stage.phase === 'chapterWarning' && stage.chapterNumber === 2));
assert.match(splitLongifyManuscript(episodeRetakeRescueResult.text).chapters[1], /別視点の写真/);

const reviewRetryCalls = [];
const reviewRetryStages = [];
const reviewRetryResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => reviewRetryStages.push(stage),
  callText: async (prompt, context) => {
    reviewRetryCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari protects the cafe light and returns to the same ending anchors.',
        usedModel: 'mock-retry-ledger',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'タイトル: 五つの光と記憶の結晶\n\n第1節\n\nこれは講評ではなく本文の書き出しです。'.repeat(20),
        usedModel: 'mock-bad-review',
      };
    }
    if (context.stage === 'longifyReviewRetry') {
      assert.ok(prompt.includes('前回の応答は講評形式ではありませんでした'));
      assert.ok(prompt.includes('レビュー用抜粋パケット'));
      return {
        text: 'AI総合点: 83点\nAI講評:\n講評形式へ復帰した。\n良い点:\n芯は残っている。\n問題点:\n終盤の余韻を足す。\n章別の改稿指示:\n第3章の代償を明確にする。\n次回ブラッシュアップ方針:\n会話と行動で補強する。',
        usedModel: 'mock-review-retry',
      };
    }
    const chapterNumber = context.chapterNumber || 3;
    const distinctRetryBodies = {
      1: 'Akari unlocks the cafe before dawn, scrubbing the burner and counting yesterday coins. ',
      2: 'A creditor corners Akari in the alley; the argument over the missing brother turns physical. ',
      3: 'Akari burns the old promise note on the pier and walks home in the new tide light. ',
    };
    const chapterBody = distinctRetryBodies[chapterNumber]
      || `Distinct topup scene ${chapterNumber} with its own concrete action and changed object. `;
    return {
      text: `第${chapterNumber}章　Retry Harbor\n\n${chapterBody.repeat(30)}`,
      usedModel: `mock-retry-chapter-${context.chapterNumber || 'topup'}`,
    };
  },
});
assert.ok(reviewRetryCalls.some(call => call.context.stage === 'longifyReviewRetry'));
assert.ok(reviewRetryStages.some(stage => stage.phase === 'aiReviewRetry'));
assert.equal(reviewRetryResult.reviewSource, 'ai');
const repairedAiReview = buildAiLongifyReview({
  text: reviewRetryResult.text,
  reviewText: reviewRetryResult.aiReviewText,
  chapterCount: reviewRetryResult.chapters.length,
});
assert.equal(repairedAiReview.score, 83);
assert.doesNotMatch(reviewRetryResult.aiReviewText, /^タイトル:/);

const reviewFailedCalls = [];
const reviewFailedResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  callText: async (prompt, context) => {
    reviewFailedCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari protects the cafe light.',
        usedModel: 'mock-failed-ledger',
      };
    }
    if (context.stage === 'longifyReview' || context.stage === 'longifyReviewRetry') {
      return {
        text: '\u30bf\u30a4\u30c8\u30eb: \u4e94\u3064\u306e\u5149\n\n\u7b2c1\u7bc0\n\n\u8b1b\u8a55\u3067\u306f\u306a\u304f\u672c\u6587\u3067\u3059\u3002'.repeat(16),
        usedModel: `mock-${context.stage}`,
      };
    }
    const chapterNumber = context.chapterNumber || 3;
    const failedReviewBodies = {
      1: 'Akari catalogues the cafe receipts, hides the cracked lantern, and decides to ask the station clerk about her brother. ',
      2: 'Riku follows the warehouse ledger to the riverside office, bargains with the owner, and loses the first signed petition. ',
      3: 'The neighbors enter city hall before sunset, show the recovered film reel, and accept that the final vote will cost them the cafe. ',
    };
    const chapterBody = failedReviewBodies[chapterNumber] || failedReviewBodies[3];
    return {
      text: `\u7b2c${chapterNumber}\u7ae0\u3000Failed Review Harbor\n\n${chapterBody.repeat(30)}`,
      usedModel: `mock-failed-chapter-${context.chapterNumber || 'topup'}`,
    };
  },
});
assert.ok(reviewFailedCalls.some(call => call.context.stage === 'longifyReviewRetry'));
assert.equal(reviewFailedResult.reviewSource, 'failed');
assert.match(reviewFailedResult.aiReviewText, /AI\u8b1b\u8a55: \u53d6\u5f97\u5931\u6557/);
assert.equal(extractAiReviewScore(reviewFailedResult.aiReviewText), null);

const expandShortChapterCalls = [];
const expandShortChapterStages = [];
const repeatedShortChapter = `\u7b2c2\u7ae0\u3000Short Loop\n\n${'短い章本文だが、登場人物は砂糖菓子と誓いについて話し合う。'.repeat(30)}`;
const expandShortChapterResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => expandShortChapterStages.push(stage),
  callText: async (prompt, context) => {
    expandShortChapterCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari protects the cafe light and shares the final promise.',
        usedModel: 'mock-expand-ledger',
      };
    }
    if (context.stage === 'chapter' && context.chapterNumber === 2) {
      return {
        text: repeatedShortChapter,
        usedModel: `mock-expand-short-${context.retryAttempt}`,
      };
    }
    if (context.stage === 'chapterExpand') {
      assert.ok(prompt.includes('\u5897\u88dc\u672c\u6587'));
      assert.ok(prompt.includes('\u898b\u51fa\u3057'));
      return {
        text: `${'アカリは友人たちの沈黙を受け止め、包み紙の匂い、校庭の冷え、指先の震えを確かめながら、分け合うことの怖さを言葉にした。'.repeat(45)}`,
        usedModel: 'mock-chapter-expand',
      };
    }
    if (context.stage === 'topup') {
      return {
        text: `${'最終章の直前、五人は灯火の前で小さな選択を重ね、約束の意味を行動で確かめた。'.repeat(90)}`,
        usedModel: 'mock-expand-topup',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u77ed\u3044\u7ae0\u3092\u5897\u88dc\u3057\u3066\u9577\u7de8\u306e\u9aa8\u683c\u3092\u7dad\u6301\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c2\u7ae0\u306f\u4f1a\u8a71\u306e\u4f59\u97fb\u3092\u6574\u3048\u308b\u3002',
        usedModel: 'mock-expand-review',
      };
    }
    const chapterNumber = context.chapterNumber || 3;
    const expandChapterBodies = {
      1: 'Akari opens the cafe cellar, finds the sugar tin ledger, and marks the first name that links her brother to the town hall. ',
      3: 'After the expanded confession, Akari carries the repaired lantern to the harbor office and chooses a public accusation. ',
    };
    const chapterBody = expandChapterBodies[chapterNumber]
      || `Distinct expanded chapter ${chapterNumber} changes the object, place, witness, and consequence. `;
    return {
      text: `\u7b2c${chapterNumber}\u7ae0\u3000Expand Harbor\n\n${chapterBody.repeat(30)}`,
      usedModel: `mock-expand-chapter-${context.chapterNumber || 'unknown'}`,
    };
  },
});
assert.ok(expandShortChapterCalls.some(call => call.context.stage === 'chapterExpand' && call.context.chapterNumber === 2));
assert.ok(expandShortChapterStages.some(stage => stage.phase === 'chapterExpandDone' && stage.chapterNumber === 2));
assert.equal(expandShortChapterResult.reviewSource, 'ai');
assert.ok(longifyChapterBodyCharLength(expandShortChapterResult.chapters[1]) >= 1333);
assert.ok(expandShortChapterResult.usedModels.includes('mock-chapter-expand'));

const multiExpandCalls = [];
const multiExpandStages = [];
const multiExpandResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => multiExpandStages.push(stage),
  callText: async (prompt, context) => {
    multiExpandCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: chapter two must be expanded until it clears the safety margin.',
        usedModel: 'mock-multi-expand-ledger',
      };
    }
    if (context.stage === 'chapter' && context.chapterNumber === 2) {
      return {
        text: `第2章　Still Short\n\n${'澪は濡れた商店街で、小さな灯りの意味を確かめる。'.repeat(45)}`,
        usedModel: `mock-multi-expand-short-${context.retryAttempt}`,
      };
    }
    if (context.stage === 'chapterExpand' && multiExpandCalls.filter(call => call.context.stage === 'chapterExpand').length === 1) {
      return {
        text: '澪は一度だけ立ち止まり、古い地図の端を撫でた。'.repeat(12),
        usedModel: 'mock-multi-expand-too-small',
      };
    }
    if (context.stage === 'chapterExpand') {
      return {
        text: '澪は春人と奈央を別々の店先へ向かわせ、戻ってこなかった常連の名前、錆びた鍵、映写室の埃、祖父の沈黙を一つずつ確かめた。'.repeat(80),
        usedModel: 'mock-multi-expand-enough',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI総合点: 84点\nAI講評:\n短章を複数回増補してから採点した。\n章別の改稿指示:\n第2章は増補済み。',
        usedModel: 'mock-multi-expand-review',
      };
    }
    const chapterNumber = context.chapterNumber || 3;
    const multiExpandBodies = {
      1: 'Mio sorts repair invoices in the closed hardware shop, finds the projector receipt, and sends Haruto to check the archive. ',
      3: 'After the expanded search, Mio confronts the council clerk, screens the film reel, and accepts the shop may not reopen. ',
    };
    const chapterBody = multiExpandBodies[chapterNumber]
      || `Mio changes the witness, place, object, and consequence in chapter ${chapterNumber}. `;
    return {
      text: `第${chapterNumber}章　Shop Light\n\n${chapterBody.repeat(30)}`,
      usedModel: `mock-multi-expand-chapter-${chapterNumber}`,
    };
  },
});
assert.ok(multiExpandCalls.filter(call => call.context.stage === 'chapterExpand' && call.context.chapterNumber === 2).length >= 2);
assert.ok(multiExpandStages.some(stage => (
  (stage.phase === 'chapterExpandDone' || stage.phase === 'chapterCompact')
    && stage.chapterNumber === 2
)));
assert.ok(multiExpandStages.some(stage => stage.phase === 'chapterDone' && stage.chapterNumber === 2));
assert.equal(multiExpandResult.reviewSource, 'ai');

const extendedTopupCalls = [];
const extendedBaseChapters = {
  1: `\u7b2c1\u7ae0\u3000Harbor Light\n\n${'Akari opens the harbor cafe, compares the old photograph with the register, and learns the owner paid for a secret boat ticket. '.repeat(32)}`,
  2: `\u7b2c2\u7ae0\u3000Ferry Receipt\n\n${'At the ferry office, Riku finds the missing receipt, loses the clerk as a witness, and decides to make the screening public. '.repeat(32)}`,
  3: `\u7b2c3\u7ae0\u3000Dawn Counter\n\n${'Before dawn, Akari brings the reel to the cafe counter, accepts the demolition vote is not over, and leaves the light burning. '.repeat(32)}`,
};
const extendedTopupPiece = 'A small extra scene tests Akari, keeps the lantern alive, and returns to the promise. '.repeat(12);
const extendedTopupResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 1,
  targetTotalChars: 13000,
  callText: async (prompt, context) => {
    extendedTopupCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari leaves the light on for her brother at dawn.',
        usedModel: 'mock-extended-topup-ledger',
      };
    }
    if (context.stage === 'chapter') {
      return {
        text: extendedBaseChapters[context.chapterNumber] || extendedBaseChapters[1],
        usedModel: `mock-extended-topup-chapter-${context.chapterNumber || 1}`,
      };
    }
    if (context.stage === 'topup') {
      return {
        text: extendedTopupPiece,
        usedModel: `mock-extended-topup-${context.attempt}`,
      };
    }
    if (context.stage === 'endingRepair') {
      return {
        text: 'At dawn, Akari chose not to turn off the cafe light, because she wanted to leave one place where her brother could return. The drops on the counter and the smell of salt proved the conversation had not been a dream.',
        usedModel: 'mock-extended-topup-ending',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u6700\u4f4e\u6587\u5b57\u6570\u306b\u5230\u9054\u3057\u305f\u5f8c\u306b\u63a1\u70b9\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c1\u7ae0\u306f\u706f\u308a\u306e\u4f59\u97fb\u3092\u5f37\u3081\u308b\u3002',
        usedModel: 'mock-extended-topup-review',
      };
    }
    return {
      text: extendedBaseChapters[context.chapterNumber] || extendedBaseChapters[1],
      usedModel: 'mock-extended-topup-default',
    };
  },
});
const extendedTopupOnlyCalls = extendedTopupCalls.filter(call => call.context.stage === 'topup');
assert.ok(extendedTopupOnlyCalls.length >= 1);
assert.equal(extendedTopupResult.reviewSource, 'ai');
assert.ok(submissionCharLength(extendedTopupResult.text) >= 13000);

const finalClosureCalls = [];
const finalClosureStages = [];
const finalClosureBaseChapters = {
  1: `第1章　Harbor Light\n\n${'Akari opens the harbor cafe, compares the old photograph with the register, and learns the owner paid for a secret boat ticket. '.repeat(24)}`,
  2: `第2章　Ferry Receipt\n\n${'At the ferry office, Riku finds the missing receipt, loses the clerk as a witness, and decides to make the screening public. '.repeat(24)}`,
  3: `第3章　Dawn Counter\n\n${'Before dawn, Akari brings the reel to the cafe counter, accepts the demolition vote is not over, and leaves the light burning. '.repeat(24)}`,
};
const truncatedTopupPiece = `${'A small extra scene tests Akari, keeps the lantern alive, and returns to the promise. '.repeat(14)}The final gesture remains unfinished`;
const finalClosureResult = await runLongifyBeta({
  storyText: seedStory,
  apiKey: '123456789012345678901234567890',
  model: 'gemini-test',
  chapterCount: 3,
  targetTotalChars: 10000,
  onStage: stage => finalClosureStages.push(stage),
  callText: async (prompt, context) => {
    finalClosureCalls.push({ prompt, context });
    if (context.stage === 'ledger') {
      return {
        text: 'Fixed ledger: Akari keeps the harbor light on and ends with a completed promise.',
        usedModel: 'mock-final-closure-ledger',
      };
    }
    if (context.stage === 'chapter') {
      return {
        text: finalClosureBaseChapters[context.chapterNumber],
        usedModel: `mock-final-closure-chapter-${context.chapterNumber}`,
      };
    }
    if (context.stage === 'topup') {
      return {
        text: truncatedTopupPiece,
        usedModel: 'mock-final-closure-topup',
      };
    }
    if (context.stage === 'finalClosureRepair') {
      assert.equal(context.chapterNumber, 3);
      return {
        text: ' and is completed when Akari closes the register, watches the harbor brighten, and lets the promise rest.',
        usedModel: 'mock-final-closure-repair',
      };
    }
    if (context.stage === 'longifyReviewRetry') {
      return {
        text: 'AI\u7dcf\u5408\u70b9: 84\u70b9\nAI\u8b1b\u8a55:\n\u7d42\u7aef\u88dc\u5b8c\u5f8c\u306b\u63a1\u70b9\u3002\n\u826f\u3044\u70b9:\n\u7d04\u675f\u306e\u4f59\u97fb\u304c\u6b8b\u308b\u3002\n\u554f\u984c\u70b9:\n\u7b2c3\u7ae0\u306e\u4f59\u767d\u3092\u3082\u3046\u5c11\u3057\u5897\u3084\u305b\u308b\u3002\n\u7ae0\u5225\u306e\u6539\u7a3f\u6307\u793a:\n\u7b2c3\u7ae0\u306e\u4f59\u97fb\u3092\u3055\u3089\u306b\u5f37\u3081\u308b\u3002\n\u6b21\u56de\u30d6\u30e9\u30c3\u30b7\u30e5\u30a2\u30c3\u30d7\u65b9\u91dd:\n\u7d42\u7aef\u306e\u611f\u60c5\u3068\u884c\u52d5\u3092\u5897\u3084\u3059\u3002',
        usedModel: 'mock-final-closure-review-retry',
      };
    }
    if (context.stage === 'longifyReview') {
      return {
        text: 'AI総合点: 84点\nAI講評:\n終端補完後に採点。\n章別の改稿指示:\n第3章の余韻をさらに強める。',
        usedModel: 'mock-final-closure-review',
      };
    }
    return {
      text: finalClosureBaseChapters[context.chapterNumber] || finalClosureBaseChapters[3],
      usedModel: 'mock-final-closure-default',
    };
  },
});
assert.ok(finalClosureCalls.some(call => call.context.stage === 'finalClosureRepair'));
assert.ok(finalClosureStages.some(stage => stage.phase === 'finalClosureRepair' && stage.chapterNumber === 3));
assert.equal(finalClosureResult.reviewSource, 'ai');
assert.equal(finalClosureResult.structureAudit.ok, true);
assert.ok(finalClosureResult.text.includes('lets the promise rest'));

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
        text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Follow ${context.chapterNumber}\n\n${`${longChapterBody}Follow chapter ${context.chapterNumber} changes the room, cost, and final action. `.repeat(35)}`,
        usedModel: `mock-follow-chapter-${context.chapterNumber}`,
      };
    }
    if (context.stage === 'topup' || context.stage === 'endingRepair') {
      return {
        text: `${'Additional closing action keeps the ending promise without adding a new chapter heading. '.repeat(60)}`,
        usedModel: `mock-retry-${context.stage}`,
      };
    }
    return {
      text: `\u7b2c2\u7ae0\u3000Misnumbered but substantial\n\n${longChapterBody.repeat(35)}`,
      usedModel: 'mock-retry-chapter',
    };
  },
});
assert.ok(retryLongifyCalls.some(call => call.context.stage === 'chapter' && call.context.retryAttempt === 1));
assert.ok(retryLongifyCalls.some(call => /\u524d\u56de\u51fa\u529b\u306f\u4e0d\u5408\u683c/.test(call.prompt)));
assert.match(retryLongifyResult.text, /\u7b2c1\u7ae0\u3000Misnumbered but substantial/);
assert.doesNotMatch(retryLongifyResult.chapters[0], /^\u7b2c2\u7ae0/m);
assert.doesNotMatch(retryLongifyResult.text, /^\u7b2c2\u7ae0\u3000Misnumbered but substantial/m);
assert.ok(longifyChapterBodyCharLength(retryLongifyResult.chapters[0]) > 2500);

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
        text: `\u7b2c1\u7ae0\u3000Corrected Opening\n\n${`${longChapterBody}Corrected opening has its own counter, window, and choice. `.repeat(35)}`,
        usedModel: 'mock-mixed-corrected',
      };
    }
    if (context.stage === 'topup' || context.stage === 'endingRepair') {
      return {
        text: `${'Additional corrected ending text keeps the same promise without a chapter heading. '.repeat(60)}`,
        usedModel: `mock-mixed-${context.stage}`,
      };
    }
    return {
      text: `\u7b2c${context.chapterNumber}\u7ae0\u3000Follow ${context.chapterNumber}\n\n${`${longChapterBody}Mixed follow chapter ${context.chapterNumber} changes the object and choice. `.repeat(35)}`,
      usedModel: `mock-mixed-follow-${context.chapterNumber}`,
    };
  },
});
assert.ok(mixedLongifyCalls.some(call => call.context.stage === 'chapter' && call.context.retryAttempt === 1));
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
    const endingBodies = {
      1: 'Akari opens the shop shutters, checks the empty flour tin, and decides to follow the customer receipt to the back lane. '.repeat(34),
      2: 'Rin questions the clerk beside the rain barrel, loses the easy alibi, and chooses to split the dorayaki bag in public. '.repeat(34),
      3: 'Miku returns with the packet, notices the mark on the wrapper, and understands why the missing share mattered. '.repeat(34),
    };
    const body = endingBodies[context.chapterNumber] || endingBodies[1];
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
    const fallbackBodies = {
      1: 'Akari opens the shop shutters, checks the empty flour tin, and decides to follow the customer receipt to the back lane. '.repeat(34),
      2: 'Rin questions the clerk beside the rain barrel, loses the easy alibi, and chooses to split the dorayaki bag in public. '.repeat(34),
      3: 'Miku returns with the packet, notices the mark on the wrapper, and understands why the missing share mattered. '.repeat(34),
    };
    const body = fallbackBodies[context.chapterNumber] || fallbackBodies[1];
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
      text: `第${context.chapterNumber}章　湿度の台帳\n\n${`${longChapterBody}Untitled chapter ${context.chapterNumber} changes the phone, ledger, and waiting choice. `.repeat(35)}`,
      usedModel: `mock-untitled-chapter-${context.chapterNumber}`,
    };
  },
});
assert.equal(untitledResult.title, '深夜の電話');
assert.equal(untitledResult.text.includes('名称未設定の小説'), false);
assert.ok(untitledResult.text.startsWith('【深夜の電話】'));

console.log('longifyBeta tests passed');
