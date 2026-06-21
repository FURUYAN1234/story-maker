const DEFAULT_LETTER_CONTEXT = {
  theme: '最近の出来事',
  genre: '日常',
  worldview: 'いつもの場所',
  ending: '穏やかな結び',
};

export function getLetterRepairContext(settings = {}) {
  try {
    return {
      theme: String(settings.theme || settings.themeCustom || DEFAULT_LETTER_CONTEXT.theme).trim(),
      genre: String(settings.genre || settings.genreCustom || DEFAULT_LETTER_CONTEXT.genre).trim(),
      worldview: String(settings.worldview || settings.worldviewCustom || DEFAULT_LETTER_CONTEXT.worldview).trim(),
      ending: String(settings.ending || settings.endingCustom || DEFAULT_LETTER_CONTEXT.ending).trim(),
    };
  } catch {
    return { ...DEFAULT_LETTER_CONTEXT };
  }
}

export function isLetterOutputInvalid(text, mode) {
  if (mode !== 'letter') {
    return false;
  }

  const value = String(text || '');
  const japaneseCount = (value.match(/[ぁ-んァ-ン一-龯]/g) || []).length;
  const englishWordCount = (value.match(/[A-Za-z]{4,}/g) || []).length;
  const earlyEnglishWordCount = (value.slice(0, 700).match(/[A-Za-z]{4,}/g) || []).length;
  return value.length > 3200
    || japaneseCount < 120
    || englishWordCount > 18
    || earlyEnglishWordCount > 6
    || !/宛先[:：]/.test(value)
    || !/本文[:：]/.test(value)
    || !/結び[:：]/.test(value)
    || !/差出人[:：]/.test(value);
}

export function cleanLetterOutput(text, mode) {
  if (mode !== 'letter') {
    return text;
  }

  let value = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  value = value
    .replace(/^\s*【(?!宛先[:：])[^】\n]{1,80}】\s*\n+/u, '')
    .replace(/\n+\s*【完】\s*$/u, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return value;
}

export function extractLetterCandidateLines(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/(?:Generated|Created)\s+By\s+AI\s+Story\s+Maker\s+V[0-9.]+/gi, '')
    .replace(/^\s*【\s*(宛先[:：][^】]+)\s*】\s*$/gmi, '$1')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !/(?:Internal|Logline|Prompt|Format|Instruction|Body|Title|End\s+with|Scenario)/i.test(line))
    .filter((line) => {
      const englishCount = (line.match(/[A-Za-z]/g) || []).length;
      return (line.match(/[ぁ-んァ-ン一-龯]/g) || []).length > 0 || englishCount <= 8;
    });
}

export function buildLetterFallbackText(text, context = DEFAULT_LETTER_CONTEXT) {
  const lines = extractLetterCandidateLines(text);
  const normalizedContext = getLetterRepairContext(context);
  const recipient = (lines.find((line) => /^宛先[:：]/.test(line)) || '宛先: 大切なあなたへ').replace(/^【|】$/g, '');
  const body = lines
    .filter((line) => !/^(?:宛先|本文|結び|差出人|追伸)[:：]/.test(line))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  const fallbackBody = body.length >= 180
    ? body
    : [
        `${normalizedContext.worldview}で起きた${normalizedContext.theme}のことを、どうしても言葉にして残したくなりました。`,
        'その場ではうまく言えませんでしたが、あなたの何気ない一言や仕草が、こちらの気持ちを少しずつほどいてくれました。',
        `大きな事件ではなくても、日常の中で誰かを思い出し、もう一度向き合おうと思える瞬間があります。今回の${normalizedContext.genre}も、私にとってはそのような出来事でした。`,
        'まだ伝えきれていないことはあります。それでも、今日この手紙を書けたことで、胸の奥に置いたままだった感謝だけは、ようやくあなたへ渡せる気がしています。',
      ].join('\n\n');

  return [
    recipient,
    '',
    '本文:',
    fallbackBody,
    '',
    '結び:',
    normalizedContext.ending.includes('バッド')
      ? '返事は急ぎません。ただ、この気持ちだけは受け取ってください。'
      : 'また近いうちに、落ち着いて話せる日を楽しみにしています。',
    '',
    '差出人: 物語メーカー',
  ].join('\n').trim();
}

export function repairLetterOutputText(text = '', context = DEFAULT_LETTER_CONTEXT) {
  return buildLetterFallbackText(text, context);
}
