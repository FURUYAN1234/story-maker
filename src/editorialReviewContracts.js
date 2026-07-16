import { hasEditorialModeFormat } from './editorialBrushupCandidate.js';
import { STORY_MAKER_FOOTER } from './version.js';

export const EDITORIAL_PASS_SCORE = 90;
export const EDITORIAL_PUBLISHABLE_SCORE = 85;

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

export function getEditorialScoreTier(score) {
  const numericScore = Number(score);
  if (Number.isFinite(numericScore) && numericScore >= EDITORIAL_PASS_SCORE) {
    return { id: 'editorial_pass', label: '編集合格', autoBrushupRequired: false };
  }
  if (Number.isFinite(numericScore) && numericScore >= EDITORIAL_PUBLISHABLE_SCORE) {
    return { id: 'publishable', label: '公開可能・任意ブラッシュアップ', autoBrushupRequired: false };
  }
  return { id: 'needs_brushup', label: '要ブラッシュアップ', autoBrushupRequired: true };
}

export function buildCognitiveRhythmEditorialGuidance({ mode = '' } = {}) {
  const family = getEditorialReviewFamily(mode);
  if (family === 'script' || family === 'special') return '';
  if (family === 'practical') {
    return [
      '【文章の認知リズム確認】',
      '説明対象の事実、観察、判断を更新しないメタ進行文（例: これから説明する、ここまで見た）を、出力形式上必要な場合を除いて問題点として指摘してください。',
      '抽象的な結論が続く箇所は、原稿にある具体的な根拠・観察・判断との往復を確認してください。',
      '改善案では、新しい事実、人物、出来事、設定を足さず、原稿にある材料だけで説明の接続を整えてください。',
      '未解消の疑問や約束は、本文内で回収するか、残す理由が読者に分かる形になっているかを確認してください。',
      'この確認手順や編集用語を完成稿へ露出させないでください。',
    ].join('\n');
  }
  return [
    '【文章の認知リズム確認】',
    '本文の出来事・観察・判断を更新しないメタ進行文（例: 次は、ここから、これまでの話を）を、形式上必要な場合を除いて問題点として指摘してください。',
    '場面や人物の判断が続く箇所は、原稿にある具体的な出来事・感覚・行動との往復を確認してください。',
    '改善案では、新しい事実、人物、出来事、設定を足さず、原稿にある材料だけで場面の転換や判断の流れを整えてください。',
    '未解消の疑問や約束は、本文内で回収するか、意図して残すなら読者に分かる形になっているかを確認してください。',
    'この確認手順や編集用語を完成稿へ露出させないでください。',
  ].join('\n');
}

export function buildEditorialReviewPrompt({ mode = '', modeLabel = '', text = '' } = {}) {
  const family = getEditorialReviewFamily(mode);
  const mechanicallyValid = hasEditorialModeFormat(text, mode);
  const rhythmGuidance = buildCognitiveRhythmEditorialGuidance({ mode });
  return [
    'あなたは商業編集者です。以下の完成稿だけを講評し、本文を書き直さないでください。',
    `出力モード: ${modeLabel || mode || '未指定'}`,
    `評価軸: ${FAMILY_CRITERIA[family]}`,
    '出力モードが要求する公開ラベル（例: 絵/状況、セリフ、狙い、ページ、コマ、宛先、本文、結び等）は完成稿の正規構成であり、制作メモや内部指示の露出として減点しないこと。',
    `末尾の「${STORY_MAKER_FOOTER}」は製品が付与する必須フッターであり、生成ツール名の混入、メタ情報、契約違反として減点しないこと。`,
    mechanicallyValid
      ? '形式契約はアプリの機械検証に合格済みです。必須ラベル、セリフ欄、狙い欄、製品フッターを形式違反や制作メモ露出として再減点せず、内容・構成・表現・オチの品質を採点してください。'
      : '形式契約はアプリの機械検証に不合格です。欠落している必須構造を問題点と改稿方針へ具体的に記載してください。',
    rhythmGuidance,
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
  const modeFitLabel = '(?:モード契約適合|モード適合度)';
  const problems = source.match(new RegExp(`問題点\\s*[:：]?\\s*([\\s\\S]*?)(?=\\n\\s*(?:改稿方針|${modeFitLabel})\\s*[:：]|$)`))?.[1]?.trim() || '';
  const revisionPlan = source.match(new RegExp(`改稿方針\\s*[:：]?\\s*([\\s\\S]*?)(?=\\n\\s*${modeFitLabel}\\s*[:：]|$)`))?.[1]?.trim() || '';
  const modeFit = source.match(new RegExp(`${modeFitLabel}\\s*[:：]?\\s*([^\\n]*)`))?.[1]?.trim() || '';
  const structuredValid = Boolean(problems && revisionPlan && modeFit);
  return {
    score,
    commentary,
    ...(problems ? { problems } : {}),
    ...(revisionPlan ? { revisionPlan } : {}),
    ...(modeFit ? { modeFit } : {}),
    structuredValid,
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
