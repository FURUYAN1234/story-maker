// File/Blob helpers shared by the legacy runtime.
// Browser-only helpers are kept tiny so they can be reused without pulling UI state.

export function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function readFileAsBase64(file) {
  const dataUrl = await readFileAsDataUrl(file);
  return String(dataUrl || '').split(',')[1] || '';
}

export function readFileAsText(file, encoding = 'UTF-8') {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file, encoding);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function formatTimestamp(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
    String(date.getHours()).padStart(2, '0'),
    String(date.getMinutes()).padStart(2, '0'),
    String(date.getSeconds()).padStart(2, '0'),
  ].join('');
}

const STORY_EXPORT_FEATURE_NAMES = {
  output: 'Output',
  story: 'Output',
  text: 'Output',
  body: 'LongNovel',
  '本文': 'LongNovel',
  memo: 'LongNovelNotes',
  notes: 'LongNovelNotes',
  'メモ・指示書': 'LongNovelNotes',
  kakuyomu_form: 'KakuyomuForm',
  'kakuyomu-form-preview': 'KakuyomuForm',
  style_analysis: 'StyleAnalysis',
  style_rewrite: 'StyleRewrite',
  generation_settings: 'GenerationSettings',
  settings: 'GenerationSettings',
  longdev_run_log: 'LongDevRunLog',
  longdev_log: 'LongDevRunLog',
  longdev_json: 'LongDevSnapshot',
  longdev_snapshot: 'LongDevSnapshot',
};

export function normalizeStoryExportFeatureName(value, fallback = 'Output') {
  const raw = String(value || '').trim();
  const mapped = STORY_EXPORT_FEATURE_NAMES[raw] || STORY_EXPORT_FEATURE_NAMES[raw.toLowerCase()];
  if (mapped) return mapped;
  const ascii = raw
    .replace(/[^A-Za-z0-9]+(.)/g, (_, char) => String(char || '').toUpperCase())
    .replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '')
    .replace(/^[a-z]/, char => char.toUpperCase());
  return ascii || fallback;
}

export function buildStoryExportFileName(featureName, extension = 'txt', date = new Date()) {
  const feature = normalizeStoryExportFeatureName(featureName);
  const ext = String(extension || 'txt').replace(/^\.+/, '').replace(/[^A-Za-z0-9]/g, '') || 'txt';
  return `Story_${feature}_${formatTimestamp(date)}.${ext}`;
}

export function buildTimestampedTextFileName(title, label, date = new Date()) {
  return buildStoryExportFileName(label || title || 'Output', 'txt', date);
}

export function sanitizeFileNamePart(value, fallback = 'download') {
  return String(value || fallback).replace(/[\s/\\:*?"<>|]/g, '_') || fallback;
}

export function buildTimestampedJsonFileName(baseName, date = new Date()) {
  return buildStoryExportFileName(baseName || 'StyleAnalysis', 'json', date);
}

export function buildTimestampedPlainTextFileName(baseName, date = new Date()) {
  return buildStoryExportFileName(baseName || 'Output', 'txt', date);
}

export function downloadBlobWithFileName(blob, filename) {
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = filename;
  anchor.click();
}

export function downloadJsonObjectWithTimestamp(data, baseName) {
  const content = JSON.stringify(data, null, 2);
  const blob = new Blob([content], { type: 'application/json' });
  downloadBlobWithFileName(blob, buildTimestampedJsonFileName(baseName));
}

export function downloadTextWithTimestamp(content, baseName) {
  const blob = new Blob([content], { type: 'text/plain' });
  downloadBlobWithFileName(blob, buildTimestampedPlainTextFileName(baseName));
}

export function downloadTimestampedTextFile(content, title, label) {
  const filename = buildTimestampedTextFileName(title, label);
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export {
  readFileAsBase64 as If,
  readFileAsBase64 as vh,
  readFileAsText as Lf,
  readFileAsText as bh,
  downloadTimestampedTextFile as Cp,
  formatTimestamp as Qd,
};
