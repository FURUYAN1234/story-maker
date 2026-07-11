export const EDITORIAL_PASS_SCORE = 82;

const SCRIPT_MODES = new Set(['scenario', 'manga', 'radio']);
const PRACTICAL_MODES = new Set(['letter', 'documentary']);
const SPECIAL_MODES = new Set(['4koma', '4koma_scenario', 'poem']);

const FAMILY_CRITERIA = Object.freeze({
  fiction: '構成、人物、感情曲線、文章、重複、完結性、指定遵守',
  script: '場面進行、台詞、演出可能性、形式、指定遵守',
  practical: '目的適合、明瞭性、トーン、形式、冗長性',
  special: 'モード固有の出力契約、形式、読みやすさ、指定遵守',
});

export function getEditorialReviewFamily(mode = '') {
  const normalized = String(mode || '').trim().toLowerCase();
  if (SCRIPT_MODES.has(normalized) || normalized === 'script') return 'script';
  if (PRACTICAL_MODES.has(normalized)) return 'practical';
  if (SPECIAL_MODES.has(normalized)) return 'special';
  return 'fiction';
}

export function buildEditorialReviewPrompt({ mode = '', modeLabel = '', text = '' } = {}) {
  const family = getEditorialReviewFamily(mode);
  return [
    'あなたは商業編集者です。以下の完成稿だけを講評し、本文を書き直さないでください。',
    `出力モード: ${modeLabel || mode || '未指定'}`,
    `評価軸: ${FAMILY_CRITERIA[family]}`,
    '100点満点で厳密に採点し、次の見出しを順番どおりに必ず出力してください。',
    'AI総合点: 0〜100点',
    'AI講評:',
    '良い点:',
    '問題点:',
    '改稿方針:',
    'モード契約適合: 適合 または 不適合',
    '--- 評価対象本文 ---',
    String(text || '').trim(),
  ].join('\n');
}

export function parseEditorialReview(text = '') {
  const source = String(text || '').trim();
  const scoreMatch = source.match(/AI総合点\s*[:：]\s*(\d{1,3})\s*点?/);
  const commentaryMatch = source.match(/AI講評\s*[:：]\s*([\s\S]*?)(?=\n\s*(?:良い点|問題点|改稿方針|モード契約適合)\s*[:：]|$)/);
  const score = scoreMatch ? Number(scoreMatch[1]) : Number.NaN;
  const commentary = commentaryMatch?.[1]?.trim() || '';
  return {
    score,
    commentary,
    valid: Number.isFinite(score) && score >= 0 && score <= 100 && commentary.length > 0,
  };
}

export function evaluateEditorialPass({ review, mechanicalOk = true } = {}) {
  return {
    passed: Boolean(review?.valid && mechanicalOk && review.score >= EDITORIAL_PASS_SCORE),
    score: Number.isFinite(review?.score) ? review.score : null,
    threshold: EDITORIAL_PASS_SCORE,
  };
}
