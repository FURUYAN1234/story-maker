const STANDARD_PROGRESS_TAIL_PATTERN = /\n*(?:【最終自己採点結果】|\[進捗\]|自己採点[:：]|評価理由[:：]|伏線回収度[:：]|起承転結の構造[:：]|制約遵守度[:：])[\s\S]*$/u;
const STORY_MAKER_FOOTER_PATTERN = /\s*Created By AI Story Maker V[\d.]+\.?\s*$/i;
const SENSE_WORD_PATTERN = /匂い|音|手|足|光|汗|泥|息|声|痛|冷|温|影|目/g;
const CHOICE_WORD_PATTERN = /選ぶ|決め|迷|拒|受け入れ|走|触れ|渡|謝|許/g;
const SECTION_HEADING_PATTERN = /^第[一二三四五六七八九十0-9０-９]+[節章]/gm;

export function sanitizeStandardLiveText(text) {
  return String(text || '')
    .replace(/<thought>[\s\S]*?<\/thought>/gi, '')
    .replace(/<thought>[\s\S]*$/gi, '')
    .replace(STANDARD_PROGRESS_TAIL_PATTERN, '')
    .replace(STORY_MAKER_FOOTER_PATTERN, '')
    .trimStart();
}

export function describeStandardLivePhase(text, { mode = '' } = {}) {
  const sanitized = sanitizeStandardLiveText(text);
  const charCount = Array.from(sanitized).length;

  if (mode === 'medium') {
    if (/^第3節/m.test(sanitized)) return '第3節: 着地と余韻を形成中';
    if (/^第2節/m.test(sanitized)) return '第2節: 反転と関係変化を展開中';
    return '第1節: 導入と葛藤を構築中';
  }

  if (/【完】/.test(sanitized)) return '終端: 完結マーカーと余韻を確認中';
  if (charCount < 1200) return '導入: 人物・舞台・違和感を組み立て中';
  if (charCount < 3600) return '展開: 摩擦・選択・伏線を増やし中';
  return '着地: 回収・余韻・後始末を調整中';
}

export function summarizeStandardLiveSignals(text) {
  const sanitized = sanitizeStandardLiveText(text);
  const dialogueCount = (sanitized.match(/「/g) || []).length;
  const senseCount = (sanitized.match(SENSE_WORD_PATTERN) || []).length;
  const choiceCount = (sanitized.match(CHOICE_WORD_PATTERN) || []).length;
  const currentSection = (sanitized.match(SECTION_HEADING_PATTERN) || []).slice(-1)[0] || '本文';
  return `${currentSection} / 会話 ${dialogueCount} / 感覚描写 ${senseCount} / 選択語 ${choiceCount}`;
}

export function createStandardLiveProgressHelpers({ getMode } = {}) {
  const readMode = () => (typeof getMode === 'function' ? getMode() : '');
  return {
    sanitizeText: sanitizeStandardLiveText,
    describePhase(text) {
      return describeStandardLivePhase(text, { mode: readMode() });
    },
    summarizeSignals: summarizeStandardLiveSignals,
  };
}
