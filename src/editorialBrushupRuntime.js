import {
  EDITORIAL_PASS_SCORE,
  buildEditorialReviewPrompt,
  parseEditorialReview,
} from './editorialReviewContracts.js';
import { evaluateBrushupCandidate } from './editorialBrushupCandidate.js';
import { getGenerationTimeoutMs } from './generationTimeoutPolicy.js';

export function buildEditorialBrushupPrompt({ text = '', review = {}, modeLabel = '' } = {}) {
  return [
    'あなたは商業編集者兼リライターです。元原稿の主題、人物、事実、結末、出力形式を維持して改稿してください。',
    '文字数を増やすこと自体を目的にせず、講評で指摘された問題だけを改善してください。',
    '前置き、講評、点数、Markdownコードフェンスは出力せず、完成稿本文だけを返してください。',
    `出力モード: ${modeLabel || '未指定'}`,
    `直近の点数: ${Number.isFinite(review?.score) ? review.score : '未採点'}`,
    `直近の講評: ${review?.commentary || '改善点を本文から判断する'}`,
    '--- 元原稿 ---',
    String(text || '').trim(),
  ].join('\n');
}

export async function runEditorialReview({ text, mode, modeLabel, callAi } = {}) {
  if (typeof callAi !== 'function') throw new TypeError('callAi is required');
  const prompt = buildEditorialReviewPrompt({ text, mode, modeLabel });
  let response = await callAi(prompt, { stage: 'review', mode, charLength: String(text || '').length });
  let parsed = parseEditorialReview(response?.text || response || '');
  if (!parsed.valid) {
    response = await callAi(`${prompt}\n\n前回は形式不正でした。指定見出しだけを使って再回答してください。`, { stage: 'reviewRetry', mode, charLength: String(text || '').length });
    parsed = parseEditorialReview(response?.text || response || '');
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
  formatCheck = () => true,
} = {}) {
  const originalText = String(text || '');
  let currentText = originalText;
  let currentReview = await runEditorialReview({ text: currentText, mode, modeLabel, callAi });
  let attempts = 0;
  const decisions = [];
  while (
    attempts < Math.max(1, Math.min(3, Number(maxAttempts) || 3))
    && (attempts === 0 || (autoUntilPass && currentReview.score < EDITORIAL_PASS_SCORE))
  ) {
    attempts += 1;
    const rewrite = await callAi(buildEditorialBrushupPrompt({ text: currentText, review: currentReview, modeLabel }), {
      stage: 'brushup', mode, charLength: currentText.length, attempt: attempts,
    });
    const candidateText = String(rewrite?.text || rewrite || '').trim();
    const candidateReview = await runEditorialReview({ text: candidateText, mode, modeLabel, callAi });
    const decision = evaluateBrushupCandidate({
      originalText, currentText, candidateText, mode, currentReview, candidateReview,
      formatOk: Boolean(formatCheck(candidateText, mode)),
    });
    decisions.push(decision);
    if (decision.adopt) {
      currentText = candidateText;
      currentReview = candidateReview;
    }
    if (currentReview.score >= EDITORIAL_PASS_SCORE || !autoUntilPass) break;
  }
  return { originalText, text: currentText, review: currentReview, attempts, decisions };
}

function escapeEditorialHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

export function createEditorialReviewMarkup(review, { attempts = 0, error = '' } = {}) {
  if (error) return `<div class="editorial-review-error"><strong>AI講評を取得できませんでした。</strong><span>本文は保持されています。</span><pre>${escapeEditorialHtml(error)}</pre></div>`;
  const valid = Boolean(review?.valid && Number.isFinite(review?.score));
  const score = valid ? Math.max(0, Math.min(100, review.score)) : 0;
  const passed = valid && score >= EDITORIAL_PASS_SCORE;
  return [
    '<div class="editorial-review-card">',
    '<div class="editorial-review-score-panel">',
    `<div class="editorial-review-score-label">AI総合点 <span>${passed ? '合格' : '要ブラッシュアップ'}</span></div>`,
    `<div class="editorial-review-score-value">${valid ? score : '—'}<small>/100</small></div>`,
    `<div class="editorial-review-score-bar"><div class="editorial-review-score-bar-fill ${passed ? 'passed' : ''}" style="width:${score}%"></div></div>`,
    attempts ? `<div class="editorial-review-attempts">ブラッシュアップ回数: ${attempts}回</div>` : '',
    '</div>',
    `<pre class="editorial-review-commentary">${escapeEditorialHtml(review?.commentary || '講評を取得できませんでした。')}</pre>`,
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

export function installEditorialBrushupRuntime({ doc = globalThis.document, timers = globalThis, callAi } = {}) {
  const brushupButton = doc?.getElementById?.('btn-longify-beta');
  const generateButton = doc?.getElementById?.('btn-generate');
  const output = doc?.getElementById?.('output');
  const reviewElement = doc?.getElementById?.('longify-beta-review');
  const statusElement = doc?.getElementById?.('longify-beta-status');
  const autoCheckbox = doc?.getElementById?.('longify-auto-brushup-until-pass');
  if (!brushupButton || !output || typeof callAi !== 'function') return () => {};
  let reviewRun = 0;
  const currentMode = () => doc.querySelector?.('#mode-chips .chip.active')?.dataset?.v || '';
  const currentModeLabel = () => doc.querySelector?.('#mode-chips .chip.active')?.textContent?.trim() || currentMode();
  const hasText = () => isEditorialBrushupReady(output);
  const setReady = () => { brushupButton.disabled = !hasText(); };
  const Observer = doc.defaultView?.MutationObserver || globalThis.MutationObserver;
  const outputObserver = typeof Observer === 'function' ? new Observer(setReady) : null;
  outputObserver?.observe?.(output, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  const reviewCurrentOutput = async () => {
    if (!hasText()) return null;
    const token = ++reviewRun;
    try {
      statusElement && (statusElement.textContent = 'AI講評を取得中...');
      const review = await runEditorialReview({ text: output.textContent, mode: currentMode(), modeLabel: currentModeLabel(), callAi });
      if (token !== reviewRun) return null;
      renderEditorialReview(review, reviewElement);
      statusElement && (statusElement.textContent = review.valid && review.score >= EDITORIAL_PASS_SCORE ? 'AI講評: 合格' : 'AI講評: 要ブラッシュアップ');
      doc.documentElement.dataset.editorialReviewResult = review.valid ? 'completed' : 'failed';
      doc.documentElement.dataset.editorialReviewScore = review.valid ? String(review.score) : '';
      return review;
    } catch (error) {
      if (token !== reviewRun) return null;
      renderEditorialReview(null, reviewElement, { error: error?.message || String(error) });
      statusElement && (statusElement.textContent = 'AI講評を取得できませんでした（本文は保持）');
      doc.documentElement.dataset.editorialReviewResult = 'failed';
      return null;
    } finally { setReady(); }
  };
  const onBrushup = async event => {
    event?.preventDefault?.();
    event?.stopImmediatePropagation?.();
    if (!hasText()) return;
    brushupButton.disabled = true;
    const source = output.textContent;
    doc.documentElement.dataset.editorialBrushupResult = 'running';
    try {
      const result = await runEditorialBrushup({ text: source, mode: currentMode(), modeLabel: currentModeLabel(), autoUntilPass: autoCheckbox?.checked === true, callAi });
      output.textContent = result.text;
      renderEditorialReview(result.review, reviewElement, { attempts: result.attempts });
      statusElement && (statusElement.textContent = `ブラッシュアップ完了（${result.review.score}点）`);
      doc.documentElement.dataset.editorialBrushupResult = 'completed';
      doc.documentElement.dataset.editorialReviewScore = String(result.review.score);
      doc.documentElement.dataset.editorialBrushupAttempts = String(result.attempts);
    } catch (error) {
      output.textContent = source;
      renderEditorialReview(null, reviewElement, { error: error?.message || String(error) });
      statusElement && (statusElement.textContent = 'ブラッシュアップ失敗（元原稿を保持）');
      doc.documentElement.dataset.editorialBrushupResult = 'failed';
    } finally { setReady(); }
  };
  brushupButton.addEventListener('click', onBrushup, { capture: true });
  const onGenerate = () => {
    const initial = output.textContent;
    const poll = timers.setInterval(() => {
      if (generateButton?.disabled) return;
      if (output.textContent === initial || !hasText()) return;
      timers.clearInterval(poll);
      reviewCurrentOutput();
    }, 300);
  };
  generateButton?.addEventListener?.('click', onGenerate);
  setReady();
  return () => {
    reviewRun += 1;
    outputObserver?.disconnect?.();
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
