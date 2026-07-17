import {
  EDITORIAL_PASS_SCORE,
  EDITORIAL_PUBLISHABLE_SCORE,
  buildCognitiveRhythmEditorialGuidance,
  buildEditorialReviewPrompt,
  getEditorialScoreTier,
  parseEditorialReview,
} from './editorialReviewContracts.js';
import { evaluateBrushupCandidate, hasEditorialModeFormat } from './editorialBrushupCandidate.js';
import { stripGeneratedFooter, withStoryMakerFooter } from './footerHelpers.js';
import { getGenerationTimeoutMs } from './generationTimeoutPolicy.js';
import { buildFinalOutputFormatCheck } from './outputModeContracts.js';
import { cleanOutputForPublicMode } from './outputCleanup.js';

const EDITORIAL_BRUSHUP_TARGET_SCORE = 100;

export function buildEditorialBrushupPrompt({ text = '', review = {}, mode = '', modeLabel = '', rejectedCandidate = null } = {}) {
  const highScoreGuidance = Number(review?.score) >= EDITORIAL_PUBLISHABLE_SCORE
    ? [
      '【高得点向け精密改稿】',
      '修正対象を最大3箇所に絞り、講評の問題点と改稿方針へ直接対応する場面だけを精密に直してください。',
      'それ以外の場面、既に機能している台詞、人物関係、事実、伏線、結末、文体は極力維持してください。',
      '新しい事件を足して派手にするのではなく、因果、人物の選択と変化、伏線の回収、場面の具体性を既存材料の範囲で強めてください。',
    ].join('\n')
    : '';
  const rejectedGuidance = rejectedCandidate
    ? [
      '【前回不採用候補からの注意】',
      '前回候補は不採用です。その候補で加えた変更は受理済み原稿に存在すると仮定しないでください。',
      `不採用理由: ${(rejectedCandidate.issues || []).join('・') || '採用条件未達'}`,
      `不採用候補の講評: ${rejectedCandidate.review?.commentary || 'なし'}`,
      `不採用候補の問題点: ${rejectedCandidate.review?.problems || 'なし'}`,
      '以下の受理済み原稿とその講評を正として、同じ失敗を避けた別の局所修正を行ってください。',
    ].join('\n')
    : '';
  return [
    'あなたは商業編集者兼リライターです。元原稿の主題、人物、事実、結末、出力形式を維持して改稿してください。',
    '文字数を増やすこと自体を目的にせず、講評で指摘された問題だけを改善してください。',
    '前置き、講評、点数、Markdownコードフェンスは出力せず、完成稿本文だけを返してください。',
    `出力モード: ${modeLabel || '未指定'}`,
    `直近の点数: ${Number.isFinite(review?.score) ? review.score : '未採点'}`,
    `直近の講評: ${review?.commentary || '改善点を本文から判断する'}`,
    '--- 元原稿 ---',
    `未解消の問題点: ${review?.problems || '本文と総評から特定する'}`,
    `必須の改稿方針: ${review?.revisionPlan || '総評の弱点を具体的な場面修正へ変換する'}`,
    '問題点を一つずつ本文上の変更へ対応させ、前回すでに改善した要素を壊さないでください。',
    highScoreGuidance,
    rejectedGuidance,
    buildCognitiveRhythmEditorialGuidance({ mode }),
    String(text || '').trim(),
  ].join('\n');
}

export function formatEditorialProgress({ phase = '', attempt = 0, maxAttempts = 3, decision = null } = {}) {
  if (phase === 'decision') {
    decision ||= {};
    const issueLabels = {
      score_not_improved: '点数が上がっていない',
      content_loss: '本文が短くなりすぎた',
      format: '出力形式違反',
      unclosed_ending: '未完結',
      duplicate_paragraph: '段落重複',
    };
    const currentScore = Number.isFinite(decision.currentScore) ? decision.currentScore : '―';
    const candidateScore = Number.isFinite(decision.candidateScore) ? decision.candidateScore : '―';
    const verdict = decision.adopt
      ? '採用'
      : `不採用: ${(decision.issues || []).map(issue => issueLabels[issue] || issue).join('・') || '採用条件未達'}`;
    return `採点結果（${Math.max(1, Number(attempt) || 1)}/${Math.max(1, Number(maxAttempts) || 3)}回）: 前回${currentScore}点 → 候補${candidateScore}点（${verdict}）`;
  }
  const step = `${Math.max(1, Number(attempt) || 1)}/${Math.max(1, Number(maxAttempts) || 3)}回・100点目標`;
  if (phase === 'brushup') return `API稼働中: 改稿を生成中（${step}）...`;
  if (phase === 'review' && Number(attempt) > 0) return `API稼働中: 改稿後を再採点中（${step}）...`;
  return 'API稼働中: 元原稿を講評中...';
}

export function buildEditorialFormatRepairPrompt({ text = '', mode = '', modeLabel = '' } = {}) {
  return [
    '以下の完成稿は指定された出力モードの必須形式を満たしていません。内容、人物、事実、オチを維持したまま、形式だけを修正してください。',
    '説明、講評、採点、Markdownコードフェンスは出力せず、修正済みの完成稿だけを返してください。',
    buildFinalOutputFormatCheck({ mode, modeLabel }),
    '--- 修正対象本文 ---',
    stripGeneratedFooter(String(text || '')).trim(),
  ].join('\n');
}

export function formatEditorialElapsedProgress(message = '', elapsedSeconds = 0) {
  return `${String(message || '').trim()}（開始から${Math.max(0, Math.floor(Number(elapsedSeconds) || 0))}秒経過）`;
}

export function updateEditorialProgressSurface({ titleElement, logElement, message = '', reset = false } = {}) {
  const text = String(message || '').trim();
  if (!text) return;
  if (titleElement) titleElement.textContent = `AI進捗・思考ログ: ${text}`;
  if (!logElement) return;
  const prior = reset ? '【ブラッシュアップ進捗】' : String(logElement.textContent || '').trim();
  logElement.textContent = [prior, text].filter(Boolean).join('\n');
  const container = logElement.closest?.('#progress-content');
  if (container) container.scrollTop = container.scrollHeight;
}

export function updateEditorialAuxiliaryUi({ alertElement, scoreBoard, message = '', active = false } = {}) {
  if (scoreBoard && active) {
    scoreBoard.innerHTML = '';
    scoreBoard.style.display = 'none';
  }
  if (!alertElement) return;
  if (!active) {
    alertElement.style.display = 'none';
    return;
  }
  const detail = String(message || 'ブラッシュアップ処理中...').trim().replace(/^API稼働中:\s*/, '');
  alertElement.textContent = `⚠️ API稼働中: ${detail}`;
  alertElement.style.display = 'flex';
}

export function createEditorialTypewriterFrames(text = '', { chunkSize } = {}) {
  const characters = Array.from(String(text || ''));
  if (!characters.length) return [''];
  const size = Math.max(1, Number(chunkSize) || Math.max(2, Math.min(48, Math.ceil(characters.length / 600))));
  const frames = [];
  for (let end = size; end < characters.length; end += size) {
    frames.push(characters.slice(0, end).join(''));
  }
  frames.push(characters.join(''));
  return frames;
}

export function prepareEditorialReveal(text = '') {
  const bodyText = stripGeneratedFooter(String(text || '')).trimEnd();
  return { bodyText, finalText: withStoryMakerFooter(bodyText) };
}

export function editorialTextFingerprint(text = '') {
  return stripGeneratedFooter(String(text || '')).replace(/\r\n?/g, '\n').trim();
}

export function shouldStartAutomaticBrushup({ checked = false, review = null, running = false } = {}) {
  return Boolean(checked && !running && review?.valid && review.score < EDITORIAL_BRUSHUP_TARGET_SCORE);
}

export function formatEditorialCompletion({ score = 0, attempts = 0, maxAttempts = 3 } = {}) {
  const numericScore = Number.isFinite(Number(score)) ? Number(score) : 0;
  const tier = getEditorialScoreTier(numericScore);
  if (tier.id === 'editorial_pass') return `ブラッシュアップ完了・編集合格（${numericScore}点）`;
  if (tier.id === 'publishable') return `ブラッシュアップ完了・公開可能（${numericScore}点／編集合格${EDITORIAL_PASS_SCORE}点）`;
  if (attempts >= maxAttempts) return `最大${maxAttempts}回終了・要ブラッシュアップ（${numericScore}点／公開可能${EDITORIAL_PUBLISHABLE_SCORE}点）`;
  return `ブラッシュアップ${attempts}回終了・要ブラッシュアップ（${numericScore}点／公開可能${EDITORIAL_PUBLISHABLE_SCORE}点）`;
}

export function prepareEditorialReviewText(text = '', mode = '', cleaner = cleanOutputForPublicMode) {
  const cleaned = cleaner(String(text || ''), mode);
  return withStoryMakerFooter(cleaned);
}

export async function renderEditorialTypewriterOutput(output, text, { timers = globalThis, delayMs = 20, onFrame } = {}) {
  if (!output) return;
  const frames = createEditorialTypewriterFrames(text);
  output.classList?.remove?.('empty');
  output.classList?.add?.('text-selectable');
  if (output.dataset) output.dataset.editorialBrushupRendering = 'true';
  try {
    for (const frame of frames) {
      output.textContent = frame;
      const counter = output.ownerDocument?.querySelector?.('.char-counter');
      if (counter) counter.textContent = `${Array.from(frame).length.toLocaleString()} 字`;
      output.scrollTop = output.scrollHeight;
      onFrame?.(frame);
      if (frame !== frames[frames.length - 1] && Number(delayMs) > 0) {
        await new Promise(resolve => timers.setTimeout(resolve, delayMs));
      }
    }
  } finally {
    if (output.dataset) delete output.dataset.editorialBrushupRendering;
  }
}

export async function runEditorialReview({ text, mode, modeLabel, callAi, onProgress, attempt = 0, maxAttempts = 3, requireStructured = false } = {}) {
  if (typeof callAi !== 'function') throw new TypeError('callAi is required');
  const prompt = buildEditorialReviewPrompt({ text, mode, modeLabel });
  onProgress?.({ phase: 'review', attempt, maxAttempts });
  let response = await callAi(prompt, { stage: 'review', mode, charLength: String(text || '').length });
  let parsed = parseEditorialReview(response?.text || response || '');
  if (!parsed.valid || (requireStructured && !parsed.structuredValid)) {
    response = await callAi(`${prompt}\n\n前回は形式不正でした。AI総合点、AI講評、良い点、問題点、改稿方針、モード契約適合の全見出しを省略せず、指定形式だけで再回答してください。`, { stage: 'reviewRetry', mode, charLength: String(text || '').length });
    parsed = parseEditorialReview(response?.text || response || '');
  }
  if (requireStructured && !parsed.structuredValid) {
    return { ...parsed, valid: false, formatError: 'structured_review_required' };
  }
  return parsed;
}

export async function runEditorialBrushup({
  text = '',
  mode = '',
  modeLabel = '',
  autoUntilPass = false,
  maxAttempts = 3,
  callAi,
  onProgress,
  formatCheck = hasEditorialModeFormat,
  initialReview = null,
} = {}) {
  const originalText = String(text || '');
  let currentText = originalText;
  const attemptLimit = Math.max(1, Math.min(3, Number(maxAttempts) || 3));
  let currentReview = initialReview?.valid && initialReview?.structuredValid
    ? initialReview
    : await runEditorialReview({ text: currentText, mode, modeLabel, callAi, onProgress, attempt: 0, maxAttempts: attemptLimit, requireStructured: true });
  if (!currentReview.valid) throw new Error('AI講評の必須項目を取得できませんでした');
  let rejectedCandidate = null;
  let attempts = 0;
  const decisions = [];
  while (
    attempts < attemptLimit
    && (attempts === 0 || (autoUntilPass && currentReview.score < EDITORIAL_BRUSHUP_TARGET_SCORE))
  ) {
    attempts += 1;
    onProgress?.({ phase: 'brushup', attempt: attempts, maxAttempts: attemptLimit });
    const rewrite = await callAi(buildEditorialBrushupPrompt({ text: currentText, review: currentReview, mode, modeLabel, rejectedCandidate }), {
      stage: 'brushup', mode, charLength: currentText.length, attempt: attempts,
    });
    const candidateText = String(rewrite?.text || rewrite || '').trim();
    const candidateReview = await runEditorialReview({ text: candidateText, mode, modeLabel, callAi, onProgress, attempt: attempts, maxAttempts: attemptLimit, requireStructured: true });
    const decision = evaluateBrushupCandidate({
      originalText, currentText, candidateText, mode, currentReview, candidateReview,
      formatOk: Boolean(formatCheck(candidateText, mode)),
    });
    decisions.push(decision);
    onProgress?.({ phase: 'decision', attempt: attempts, maxAttempts: attemptLimit, decision });
    if (decision.adopt) {
      currentText = candidateText;
      currentReview = candidateReview;
      rejectedCandidate = null;
    } else {
      rejectedCandidate = { review: candidateReview, issues: decision.issues };
    }
    if (currentReview.score >= EDITORIAL_BRUSHUP_TARGET_SCORE || !autoUntilPass) break;
  }
  return { originalText, text: currentText, review: currentReview, attempts, maxAttempts: attemptLimit, decisions };
}

function escapeEditorialHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

export function createEditorialReviewMarkup(review, { attempts = 0, error = '' } = {}) {
  if (error) return `<div class="editorial-review-error"><strong>AI講評を取得できませんでした。</strong><span>本文は保持されています。</span><pre>${escapeEditorialHtml(error)}</pre></div>`;
  const valid = Boolean(review?.valid && Number.isFinite(review?.score));
  const score = valid ? Math.max(0, Math.min(100, review.score)) : 0;
  const tier = getEditorialScoreTier(score);
  return [
    '<div class="editorial-review-card">',
    '<div class="editorial-review-score-panel">',
    `<div class="editorial-review-score-label">AI総合点 <span>${valid ? tier.label : '要ブラッシュアップ'}</span></div>`,
    `<div class="editorial-review-score-value">${valid ? score : '—'}<small>/100</small></div>`,
    `<div class="editorial-review-score-bar"><div class="editorial-review-score-bar-fill ${tier.id === 'editorial_pass' ? 'passed' : ''}" style="width:${score}%"></div></div>`,
    attempts ? `<div class="editorial-review-attempts">ブラッシュアップ回数: ${attempts}回</div>` : '',
    '</div>',
    '<div class="editorial-review-detail">',
    '<h4>総評</h4>',
    `<pre class="editorial-review-commentary">${escapeEditorialHtml(review?.commentary || '講評を取得できませんでした。')}</pre>`,
    '<h4>点数を上げるための問題点</h4>',
    `<pre class="editorial-review-problems">${escapeEditorialHtml(review?.problems || '具体的な問題点を取得できませんでした。')}</pre>`,
    '<h4>次の改稿で行うこと</h4>',
    `<pre class="editorial-review-revision-plan">${escapeEditorialHtml(review?.revisionPlan || '具体的な改稿方針を取得できませんでした。')}</pre>`,
    '</div>',
    '</div>',
  ].join('');
}

export function renderEditorialReview(review, element, { attempts = 0, error = '' } = {}) {
  if (!element) return;
  element.classList?.remove?.('hidden');
  element.innerHTML = createEditorialReviewMarkup(review, { attempts, error });
}

export function isEditorialBrushupReady(output) {
  return Boolean(
    output
    && !output.classList?.contains?.('empty')
    && String(output.textContent || '').trim().length >= 20
  );
}

export function setEditorialBrushupRunningState({ button, statusElement, running } = {}) {
  if (!button) return;
  if (running) {
    button.disabled = true;
    button.textContent = 'ブラッシュアップ中...';
    if (statusElement) {
      statusElement.textContent = 'ブラッシュアップを開始しました。しばらくお待ちください...';
    }
    return;
  }
  button.textContent = 'この小説をブラッシュアップ';
}

export function resetEditorialBrushupForNewGeneration({ doc, sectionElement, button, reviewElement, statusElement, autoCheckbox } = {}) {
  sectionElement?.classList?.add?.('is-waiting');
  sectionElement?.setAttribute?.('aria-disabled', 'true');
  if (button) {
    button.disabled = true;
    button.textContent = 'この小説をブラッシュアップ';
  }
  if (autoCheckbox) autoCheckbox.disabled = true;
  if (reviewElement) {
    reviewElement.innerHTML = '';
    reviewElement.classList?.add?.('hidden');
  }
  if (statusElement) statusElement.textContent = '新しい本文の生成・AI講評を待っています...';
  const dataset = doc?.documentElement?.dataset;
  if (dataset) {
    delete dataset.editorialReviewResult;
    delete dataset.editorialReviewScore;
    delete dataset.editorialBrushupResult;
    delete dataset.editorialBrushupOutcome;
    delete dataset.editorialBrushupAttempts;
  }
}

export function installEditorialBrushupRuntime({ doc = globalThis.document, timers = globalThis, callAi } = {}) {
  const brushupButton = doc?.getElementById?.('btn-longify-beta');
  const sectionElement = doc?.getElementById?.('longify-beta');
  const generateButton = doc?.getElementById?.('btn-generate');
  const settingsElement = doc?.getElementById?.('settings');
  const output = doc?.getElementById?.('output');
  const reviewElement = doc?.getElementById?.('longify-beta-review');
  const statusElement = doc?.getElementById?.('longify-beta-status');
  const progressTitleElement = doc?.getElementById?.('progress-title-text');
  const progressLogElement = doc?.getElementById?.('progress-log');
  const globalAlertElement = doc?.getElementById?.('global-alert');
  const thoughtScoreBoard = doc?.getElementById?.('thought-score-board');
  const autoCheckbox = doc?.getElementById?.('longify-auto-brushup-until-pass');
  if (!brushupButton || !output || typeof callAi !== 'function') return () => {};
  let reviewRun = 0;
  let brushupRunning = false;
  let awaitingGenerationReview = false;
  let latestReview = null;
  let latestReviewText = '';
  let generationInitialText = '';
  let reviewStartQueued = false;
  let startPendingReview = () => {};
  let queueAutomaticBrushup = () => {};
  const currentMode = () => doc.querySelector?.('#mode-chips .chip.active')?.dataset?.v || '';
  const currentModeLabel = () => doc.querySelector?.('#mode-chips .chip.active')?.textContent?.trim() || currentMode();
  const hasText = () => isEditorialBrushupReady(output);
  const setReady = () => { brushupButton.disabled = brushupRunning || awaitingGenerationReview || Boolean(generateButton?.disabled) || !hasText(); };
  const Observer = doc.defaultView?.MutationObserver || globalThis.MutationObserver;
  const outputObserver = typeof Observer === 'function' ? new Observer(setReady) : null;
  outputObserver?.observe?.(output, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  const generationLockObserver = typeof Observer === 'function' ? new Observer(() => {
    startPendingReview();
    setReady();
  }) : null;
  generationLockObserver?.observe?.(generateButton, { attributes: true, attributeFilter: ['disabled'] });
  generationLockObserver?.observe?.(settingsElement, { attributes: true, attributeFilter: ['class'] });
  const reviewCurrentOutput = async () => {
    if (!hasText()) return null;
    const token = ++reviewRun;
    const reviewGenerateWasDisabled = Boolean(generateButton?.disabled);
    const reviewSettingsWasGenerating = Boolean(settingsElement?.classList?.contains?.('generating'));
    if (generateButton) generateButton.disabled = true;
    settingsElement?.classList?.add?.('generating');
    setReady();
    try {
      const mode = currentMode();
      const modeLabel = currentModeLabel();
      let reviewedText = prepareEditorialReviewText(output.textContent, mode);
      if (reviewedText !== output.textContent) {
        if (output.dataset) output.dataset.editorialBrushupRendering = 'true';
        try {
          output.textContent = reviewedText;
          await Promise.resolve();
        } finally {
          if (output.dataset) delete output.dataset.editorialBrushupRendering;
        }
      }
      if (!hasEditorialModeFormat(reviewedText, mode)) {
        const repairMessage = 'API稼働中: 出力モードの必須形式を自動修正中...';
        statusElement && (statusElement.textContent = repairMessage);
        updateEditorialProgressSurface({ titleElement: progressTitleElement, logElement: progressLogElement, message: repairMessage, reset: true });
        updateEditorialAuxiliaryUi({ alertElement: globalAlertElement, scoreBoard: thoughtScoreBoard, message: repairMessage, active: true });
        const repair = await callAi(buildEditorialFormatRepairPrompt({ text: reviewedText, mode, modeLabel }), {
          stage: 'brushup', mode, charLength: reviewedText.length, attempt: 0,
        });
        const repairedText = String(repair?.text || repair || '').trim();
        if (!hasEditorialModeFormat(repairedText, mode)) throw new Error('出力モードの必須形式を自動修正できませんでした');
        reviewedText = withStoryMakerFooter(repairedText);
        if (output.dataset) output.dataset.editorialBrushupRendering = 'true';
        try {
          output.textContent = reviewedText;
          await Promise.resolve();
        } finally {
          if (output.dataset) delete output.dataset.editorialBrushupRendering;
        }
        const repairedCounter = output.ownerDocument?.querySelector?.('.char-counter');
        if (repairedCounter) repairedCounter.textContent = `${Array.from(reviewedText).length.toLocaleString()} 字`;
      }
      const reviewMessage = 'API稼働中: 新しい本文を講評中...';
      statusElement && (statusElement.textContent = reviewMessage);
      updateEditorialProgressSurface({ titleElement: progressTitleElement, logElement: progressLogElement, message: reviewMessage, reset: true });
      updateEditorialAuxiliaryUi({ alertElement: globalAlertElement, scoreBoard: thoughtScoreBoard, message: reviewMessage, active: true });
      const review = await runEditorialReview({ text: reviewedText, mode: currentMode(), modeLabel: currentModeLabel(), callAi, requireStructured: true });
      if (token !== reviewRun) return null;
      latestReview = review.valid ? review : null;
      latestReviewText = review.valid ? editorialTextFingerprint(output.textContent) : '';
      renderEditorialReview(review, reviewElement);
      sectionElement?.classList?.remove?.('is-waiting');
      sectionElement?.setAttribute?.('aria-disabled', 'false');
      statusElement && (statusElement.textContent = review.valid ? `AI講評: ${getEditorialScoreTier(review.score).label}` : 'AI講評: 要ブラッシュアップ');
      doc.documentElement.dataset.editorialReviewResult = review.valid ? 'completed' : 'failed';
      doc.documentElement.dataset.editorialReviewScore = review.valid ? String(review.score) : '';
      if (shouldStartAutomaticBrushup({ checked: autoCheckbox?.checked, review, running: brushupRunning })) {
        queueAutomaticBrushup();
      }
      return review;
    } catch (error) {
      if (token !== reviewRun) return null;
      renderEditorialReview(null, reviewElement, { error: error?.message || String(error) });
      statusElement && (statusElement.textContent = 'AI講評を取得できませんでした（本文は保持）');
      doc.documentElement.dataset.editorialReviewResult = 'failed';
      sectionElement?.classList?.remove?.('is-waiting');
      sectionElement?.setAttribute?.('aria-disabled', 'false');
      return null;
    } finally {
      if (token === reviewRun) {
        awaitingGenerationReview = false;
        if (generateButton) generateButton.disabled = reviewGenerateWasDisabled;
        if (!reviewSettingsWasGenerating) settingsElement?.classList?.remove?.('generating');
        if (autoCheckbox) autoCheckbox.disabled = false;
        updateEditorialAuxiliaryUi({ alertElement: globalAlertElement, scoreBoard: thoughtScoreBoard, active: false });
      }
      setReady();
    }
  };
  startPendingReview = () => {
    if (!awaitingGenerationReview || reviewStartQueued || generateButton?.disabled) return;
    if (output.textContent === generationInitialText || !hasText()) return;
    reviewStartQueued = true;
    reviewCurrentOutput();
  };
  const onBrushup = async event => {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();
    if (!hasText()) return;
    brushupRunning = true;
    const generateWasDisabled = Boolean(generateButton?.disabled);
    const settingsWasGenerating = Boolean(settingsElement?.classList?.contains?.('generating'));
    const autoWasDisabled = Boolean(autoCheckbox?.disabled);
    if (generateButton) generateButton.disabled = true;
    settingsElement?.classList?.add?.('generating');
    sectionElement?.classList?.add?.('is-busy');
    sectionElement?.setAttribute?.('aria-disabled', 'true');
    if (autoCheckbox) autoCheckbox.disabled = true;
    setEditorialBrushupRunningState({ button: brushupButton, statusElement, running: true });
    updateEditorialProgressSurface({
      titleElement: progressTitleElement,
      logElement: progressLogElement,
      message: 'ブラッシュアップ開始・API接続準備中...',
      reset: true,
    });
    updateEditorialAuxiliaryUi({
      alertElement: globalAlertElement,
      scoreBoard: thoughtScoreBoard,
      message: 'ブラッシュアップ開始・API接続準備中...',
      active: true,
    });
    const source = output.textContent;
    const reusableReview = latestReview?.valid && latestReview?.structuredValid ? latestReview : null;
    const startedAt = Date.now();
    let currentProgressMessage = reusableReview
      ? 'API稼働中: 初回講評を再利用して改稿準備中...'
      : 'API稼働中: 元原稿を講評中...';
    const renderElapsedProgress = () => {
      const elapsedMessage = formatEditorialElapsedProgress(currentProgressMessage, (Date.now() - startedAt) / 1000);
      brushupButton.textContent = elapsedMessage;
      if (statusElement) statusElement.textContent = elapsedMessage;
      if (progressTitleElement) progressTitleElement.textContent = `AI進捗・思考ログ: ${elapsedMessage}`;
      if (progressLogElement) {
        const lines = String(progressLogElement.textContent || '').split('\n');
        if (lines.length) lines[lines.length - 1] = elapsedMessage;
        progressLogElement.textContent = lines.join('\n');
      }
      updateEditorialAuxiliaryUi({ alertElement: globalAlertElement, scoreBoard: thoughtScoreBoard, message: elapsedMessage, active: true });
    };
    const elapsedTimer = timers.setInterval(renderElapsedProgress, 1000);
    doc.documentElement.dataset.editorialBrushupResult = 'running';
    try {
      const result = await runEditorialBrushup({
        text: source,
        mode: currentMode(),
        modeLabel: currentModeLabel(),
        autoUntilPass: autoCheckbox?.checked === true,
        callAi,
        initialReview: reusableReview,
        onProgress: progress => {
          const message = formatEditorialProgress(progress);
          currentProgressMessage = message;
          brushupButton.textContent = message;
          if (statusElement) statusElement.textContent = message;
          updateEditorialProgressSurface({ titleElement: progressTitleElement, logElement: progressLogElement, message });
          updateEditorialAuxiliaryUi({ alertElement: globalAlertElement, scoreBoard: thoughtScoreBoard, message, active: true });
        },
      });
      currentProgressMessage = 'ブラッシュアップ本文を流れる表示で反映中...';
      if (statusElement) statusElement.textContent = currentProgressMessage;
      updateEditorialProgressSurface({
        titleElement: progressTitleElement,
        logElement: progressLogElement,
        message: 'ブラッシュアップ本文を流れる表示で反映中...',
      });
      updateEditorialAuxiliaryUi({
        alertElement: globalAlertElement,
        scoreBoard: thoughtScoreBoard,
        message: 'ブラッシュアップ本文を流れる表示で反映中...',
        active: true,
      });
      const reveal = prepareEditorialReveal(result.text);
      await renderEditorialTypewriterOutput(output, reveal.bodyText, { timers });
      output.textContent = reveal.finalText;
      const finalCounter = output.ownerDocument?.querySelector?.('.char-counter');
      if (finalCounter) finalCounter.textContent = `${Array.from(reveal.finalText).length.toLocaleString()} 字`;
      renderEditorialReview(result.review, reviewElement, { attempts: result.attempts });
      latestReview = result.review?.valid ? result.review : null;
      latestReviewText = latestReview ? editorialTextFingerprint(reveal.finalText) : '';
      const completionMessage = formatEditorialCompletion({ score: result.review.score, attempts: result.attempts, maxAttempts: result.maxAttempts });
      statusElement && (statusElement.textContent = completionMessage);
      updateEditorialProgressSurface({
        titleElement: progressTitleElement,
        logElement: progressLogElement,
        message: completionMessage,
      });
      doc.documentElement.dataset.editorialBrushupResult = 'completed';
      doc.documentElement.dataset.editorialBrushupOutcome = getEditorialScoreTier(result.review.score).id;
      doc.documentElement.dataset.editorialReviewScore = String(result.review.score);
      doc.documentElement.dataset.editorialBrushupAttempts = String(result.attempts);
    } catch (error) {
      output.textContent = source;
      renderEditorialReview(null, reviewElement, { error: error?.message || String(error) });
      statusElement && (statusElement.textContent = 'ブラッシュアップ失敗（元原稿を保持）');
      updateEditorialProgressSurface({
        titleElement: progressTitleElement,
        logElement: progressLogElement,
        message: `ブラッシュアップ失敗・元原稿を保持（${error?.message || String(error)}）`,
      });
      doc.documentElement.dataset.editorialBrushupResult = 'failed';
    } finally {
      timers.clearInterval(elapsedTimer);
      brushupRunning = false;
      if (generateButton) generateButton.disabled = generateWasDisabled;
      if (!settingsWasGenerating) settingsElement?.classList?.remove?.('generating');
      sectionElement?.classList?.remove?.('is-busy');
      sectionElement?.setAttribute?.('aria-disabled', 'false');
      if (autoCheckbox) autoCheckbox.disabled = autoWasDisabled;
      updateEditorialAuxiliaryUi({ alertElement: globalAlertElement, scoreBoard: thoughtScoreBoard, active: false });
      setEditorialBrushupRunningState({ button: brushupButton, statusElement, running: false });
      setReady();
    }
  };
  brushupButton.addEventListener('click', onBrushup, { capture: true });
  queueAutomaticBrushup = () => {
    timers.setTimeout(() => {
      if (!brushupRunning && autoCheckbox?.checked && latestReview?.valid && latestReview.score < EDITORIAL_BRUSHUP_TARGET_SCORE) {
        onBrushup();
      }
    }, 0);
  };
  const onGenerate = () => {
    reviewRun += 1;
    awaitingGenerationReview = true;
    reviewStartQueued = false;
    latestReview = null;
    latestReviewText = '';
    resetEditorialBrushupForNewGeneration({
      doc,
      sectionElement,
      button: brushupButton,
      reviewElement,
      statusElement,
      autoCheckbox,
    });
    generationInitialText = output.textContent;
    const poll = timers.setInterval(() => {
      startPendingReview();
      if (reviewStartQueued) timers.clearInterval(poll);
    }, 50);
  };
  generateButton?.addEventListener?.('click', onGenerate);
  if (!hasText()) resetEditorialBrushupForNewGeneration({ doc, sectionElement, button: brushupButton, reviewElement, statusElement, autoCheckbox });
  setReady();
  return () => {
    reviewRun += 1;
    outputObserver?.disconnect?.();
    generationLockObserver?.disconnect?.();
    brushupButton.removeEventListener?.('click', onBrushup, { capture: true });
    generateButton?.removeEventListener?.('click', onGenerate);
  };
}

export function editorialCallOptions({ stage, mode, charLength } = {}) {
  const timeoutMs = getGenerationTimeoutMs({ stage, mode, charLength });
  return {
    editorialStage: stage,
    disableGoogleSearch: true,
    maxTokens: stage === 'brushup' ? 32768 : 4096,
    maxOutputTokens: stage === 'brushup' ? 32768 : 4096,
    timeoutMs: timeoutMs || (stage === 'brushup' ? 300000 : 120000),
    temperature: stage === 'brushup' ? 0.5 : 0.1,
  };
}
