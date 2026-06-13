const MALE_NAME_SUFFIXES = ['郎', '太', '介', '彦', '夫', '馬', '輝', '人', '也', '斗', '志', '樹', '大', '助'];
const FEMALE_NAME_SUFFIXES = ['子', '美', '奈', '香', '音', '菜', '花', '依', '梨', '沙', '里', '愛', '彩'];

export function inferSexFromName(name) {
  if (!name) return null;
  const suffix = String(name).slice(-1);
  if (MALE_NAME_SUFFIXES.includes(suffix)) return 'M';
  if (FEMALE_NAME_SUFFIXES.includes(suffix)) return 'F';
  return null;
}

export function inferSexFromDescription(description) {
  if (!description) return null;
  const text = String(description);
  if (text.includes('男性') || text.includes('男,')) return 'M';
  if (text.includes('女性') || text.includes('女,')) return 'F';
  return null;
}

export {
  inferSexFromName as Ca,
  inferSexFromDescription as Na,
};

