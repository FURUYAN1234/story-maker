const SCORE_CONFIG = [
  { key: 'plotRecovery', label: '伏線回収度', target: 85, pattern: /伏線回収度\s*[:：]\s*(\d+)/ },
  { key: 'structure', label: '起承転結の構造', target: 85, pattern: /起承転結の構造\s*[:：]\s*(\d+)/ },
  { key: 'constraint', label: '制約遵守度', target: 90, pattern: /制約遵守度\s*[:：]\s*(\d+)/ },
];

export function createEmptyStandardThoughtScores() {
  return {
    plotRecovery: null,
    structure: null,
    constraint: null,
  };
}

export function parseStandardThoughtScores(text) {
  if (!text) return createEmptyStandardThoughtScores();

  const scores = createEmptyStandardThoughtScores();
  const source = String(text);
  for (const scoreConfig of SCORE_CONFIG) {
    const match = source.match(scoreConfig.pattern);
    if (match) scores[scoreConfig.key] = parseInt(match[1], 10);
  }
  return scores;
}

export function hasStandardThoughtScores(scores = {}) {
  return SCORE_CONFIG.some(scoreConfig => scores[scoreConfig.key] !== null && scores[scoreConfig.key] !== undefined);
}

export function createStandardThoughtScoreMarkup(scores = {}) {
  return SCORE_CONFIG.map(scoreConfig => {
    const value = scores[scoreConfig.key] ?? null;
    const scoreText = value !== null ? `${value}点` : '測定中...';
    const width = value !== null ? `${value}%` : '0%';
    const passed = value !== null && value >= scoreConfig.target;
    const passedClass = passed ? 'passed' : '';
    const statusText = value !== null ? (passed ? '(合格)' : '(不合格)') : '';

    return `
        <div class="score-row ${passedClass}">
          <span class="score-label">${scoreConfig.label} (基準:${scoreConfig.target}点)</span>
          <div class="score-bar-bg">
            <div class="score-bar-fill" style="width: ${width}"></div>
          </div>
          <span class="score-val">${scoreText} ${statusText}</span>
        </div>
      `;
  }).join('');
}

export function renderStandardThoughtScoreBoard(boardElement, scores, { show = false } = {}) {
  if (!boardElement) return { visible: false, reason: 'missing-board' };
  if (!show || !hasStandardThoughtScores(scores)) {
    boardElement.style.display = 'none';
    return { visible: false, reason: show ? 'empty-scores' : 'hidden' };
  }

  boardElement.style.display = 'flex';
  boardElement.innerHTML = createStandardThoughtScoreMarkup(scores);
  return { visible: true };
}
