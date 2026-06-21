export function clampScore(value) {
  return Math.max(0, Math.min(100, Math.round(Number.isFinite(value) ? value : 0)));
}

export function countMatches(text, pattern) {
  const matches = String(text || '').match(pattern);
  return matches ? matches.length : 0;
}

export function computeLongNovelCompletionScore(run = {}) {
  const cleanText = String(run.cleanText || '');
  const chapters = Array.isArray(run.chapters) ? run.chapters : [];
  const totalChapters = Math.max(1, Number(run.totalChapters) || chapters.length || 1);
  const progress = Math.min(1, (Number(run.currentChapter) || chapters.length || 0) / totalChapters);
  const finishMarkerCount = countMatches(cleanText, /\u3010\u5b8c\u3011/g);
  const chapterHeadingCount = countMatches(
    cleanText,
    /(?:^|\n)\s*#?\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0/g,
  );
  const chapterLengths = chapters
    .map((chapter) => String(chapter?.body || '').trim().length)
    .filter(Boolean);
  const averageChapterLength = chapterLengths.length
    ? chapterLengths.reduce((sum, length) => sum + length, 0) / chapterLengths.length
    : cleanText.length / totalChapters;
  const shortestChapterLength = chapterLengths.length ? Math.min(...chapterLengths) : 0;
  const hasContextMemo = chapters.some((chapter) => String(chapter?.contextMemo || '').length > 80);
  const hasControlArtifact = /\u6587\u8108\u7dad\u6301\u30e1\u30e2|\u56de\u53ce\u5f85\u3061\u4f0f\u7dda\u30e1\u30e2|\u4eba\u7269\u30ed\u30b9\u30bf\u30fc\u66f4\u65b0\u30e1\u30e2|\u30e2\u30c1\u30fc\u30d5\uff06\u30b5\u30d6\u30ad\u30e3\u30e9\u8ffd\u8de1\u30e1\u30e2|\u6b21\u7ae0\u306e\u30b7\u30fc\u30f3\u8a2d\u8a08|\u518d\u73fe\u7528\u30de\u30b9\u30bf\u30fc\u6307\u793a\u66f8|\u5168\u6587\u7d50\u5408\u51fa\u529b|```|\[REJECTION|Chapter prose looks|Regenerate/i.test(cleanText);

  return {
    plotRecovery: clampScore(80 + progress * 8 + (finishMarkerCount === 1 ? 5 : -8) + (hasContextMemo ? 3 : 0)),
    structure: clampScore(
      78
      + progress * 8
      + (chapterHeadingCount >= totalChapters ? 4 : 0)
      + (averageChapterLength >= 4500 ? 4 : 0)
      + (shortestChapterLength >= 3000 ? 3 : 0),
    ),
    constraint: clampScore(86 + progress * 5 + (finishMarkerCount === 1 ? 4 : -8) + (hasControlArtifact ? -12 : 5)),
  };
}
