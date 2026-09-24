function escapeRegex(value) {
  return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');
}

function sectionBody(markdown, heading) {
  const lines = (markdown ?? '').split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === heading);
  if (start < 0) return null;
  const level = heading.match(/^#+/)[0].length;
  const endOffset = lines.slice(start + 1).findIndex((line) => {
    const match = /^(#+)\s/.exec(line);
    return match && match[1].length <= level;
  });
  return lines.slice(start + 1, endOffset < 0 ? undefined : start + 1 + endOffset).join('\n');
}

function itemIds(markdown) {
  return [...(markdown ?? '').matchAll(/^\s*-\s+\[([a-z0-9][a-z0-9_-]*)\]\s+.+$/gim)]
    .map((match) => match[1])
    .sort();
}

function sameIds(left, right) {
  return left.length === right.length && left.every((id, index) => id === right[index]);
}

export function validateBilingualReleaseNotes(markdown, version) {
  const errors = [];
  const requiredHeadings = [
    '# Story Maker v' + version,
    '## English',
    "### What's New",
    '### Verification',
    '## 日本語',
    '### 更新内容',
    '### 検証',
  ];

  for (const heading of requiredHeadings) {
    if (!new RegExp('^' + escapeRegex(heading) + '\\s*$', 'm').test(markdown)) {
      errors.push('Missing required heading: ' + heading + '.');
    }
  }
  if (errors.length) return errors;

  const english = sectionBody(markdown, '## English');
  const japanese = sectionBody(markdown, '## 日本語');
  const englishNew = sectionBody(english, "### What's New");
  const englishVerification = sectionBody(english, '### Verification');
  const japaneseNew = sectionBody(japanese, '### 更新内容');
  const japaneseVerification = sectionBody(japanese, '### 検証');

  const pairs = [
    [itemIds(englishNew), itemIds(japaneseNew), 'Japanese "更新内容" IDs must exactly match English "What\'s New" IDs.'],
    [itemIds(englishVerification), itemIds(japaneseVerification), 'Japanese "検証" IDs must exactly match English "Verification" IDs.'],
  ];
  for (const [englishIds, japaneseIds, message] of pairs) {
    if (!englishIds.length || !japaneseIds.length || !sameIds(englishIds, japaneseIds)) errors.push(message);
  }
  return errors;
}

export function validatePagesDeployment(build, expectedCommit) {
  const errors = [];
  if (build?.status !== 'built') {
    errors.push('GitHub Pages latest build must be "built"; received "' + (build?.status ?? 'missing') + '".');
  }
  if (build?.commit !== expectedCommit) {
    errors.push('GitHub Pages latest build commit must be "' + expectedCommit + '"; received "' + (build?.commit ?? 'missing') + '".');
  }
  return errors;
}
