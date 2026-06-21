const LONG_MODE_PATTERN = /\blong\b|long[-\s_]*novel|長編/i;

export function isLongModeSignal(value) {
  return LONG_MODE_PATTERN.test(String(value || ''));
}

export function collectPublicModeSignal({
  state = {},
  modeCustomInputValue = '',
  activeModeValue = '',
} = {}) {
  return [
    state.mode,
    state.modeCustom,
    modeCustomInputValue,
    activeModeValue,
  ].filter(Boolean).join(' ');
}

export function normalizePublicModeOptions(options = [], fallbackOptions = []) {
  const source = Array.isArray(options) && options.length ? options : fallbackOptions;
  const normalized = source
    .map((option) => ({
      value: String(option?.value || '').trim(),
      label: String(option?.label || option?.value || '').trim(),
      button: option?.button,
    }))
    .filter((option) => option.value
      && option.value !== 'long'
      && !isLongModeSignal(`${option.value} ${option.label}`));

  if (normalized.length || source === fallbackOptions) {
    return normalized;
  }

  return normalizePublicModeOptions(fallbackOptions, []);
}

export function pickPublicModeOption(options = [], currentMode = '', random = Math.random) {
  if (!Array.isArray(options) || !options.length) {
    return null;
  }

  const poolWithoutCurrent = options.filter((option) => option.value !== currentMode);
  const pool = poolWithoutCurrent.length ? poolWithoutCurrent : options;
  const randomValue = typeof random === 'function' ? Number(random()) : Number(random);
  const safeRandom = Number.isFinite(randomValue) ? Math.min(Math.max(randomValue, 0), 0.999999999) : 0;
  return pool[Math.floor(safeRandom * pool.length)] || null;
}

export function resolveOutputModeFromText(value, fallback = '4koma') {
  const text = String(value || '').trim();
  if (/4koma_scenario|STEP2|シナリオ連携/i.test(text)) return '4koma_scenario';
  if (/4コマ|四コマ|4koma/i.test(text)) return '4koma';
  if (/ショート|掌編|short_short|short/i.test(text)) return 'short_short';
  if (/短編|novel/i.test(text)) return 'novel';
  if (/中編|medium/i.test(text)) return 'medium';
  if (/脚本|台本|scenario/i.test(text)) return 'scenario';
  if (/漫画|manga/i.test(text)) return 'manga';
  if (/エッセイ|essay/i.test(text)) return 'essay';
  if (/詩|ポエム|poem/i.test(text)) return 'poem';
  if (/童話|絵本|fairy/i.test(text)) return 'fairy';
  if (/手紙|書簡|letter/i.test(text)) return 'letter';
  if (/日記|独白|diary/i.test(text)) return 'diary';
  if (/ドキュメンタリー|documentary/i.test(text)) return 'documentary';
  if (/ラジオ|radio/i.test(text)) return 'radio';
  return fallback;
}
