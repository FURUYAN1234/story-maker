function defaultEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createStyleAnalyzerTextFileListMarkup(files, escapeHtml = defaultEscape) {
  return (Array.isArray(files) ? files : []).map((file, index) => `
    <div class="sa-file-item">
      <span class="sa-file-name">📄 ${escapeHtml(file?.name)}</span>
      <span class="sa-file-chars">${Number(file?.charCount || 0).toLocaleString()}字</span>
      <button class="sa-file-remove" data-idx="${index}" title="除去">✕</button>
    </div>
  `).join('');
}

function createStyleAnalyzerImageListMarkup(images, escapeHtml = defaultEscape) {
  return (Array.isArray(images) ? images : []).map((image, index) => `
    <div class="sa-image-item">
      <img src="${escapeHtml(image?.previewUrl)}" alt="${escapeHtml(image?.name)}" class="sa-image-thumb" />
      <span class="sa-image-name">${escapeHtml(image?.name)}</span>
      <button class="sa-file-remove" data-img-idx="${index}" title="除去">✕</button>
    </div>
  `).join('');
}

export { createStyleAnalyzerImageListMarkup, createStyleAnalyzerTextFileListMarkup };
