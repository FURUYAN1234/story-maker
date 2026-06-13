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

export function buildTimestampedTextFileName(title, label, date = new Date()) {
  return `${title}_${label}_${formatTimestamp(date)}.txt`;
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
  readFileAsBase64 as vh,
  readFileAsText as bh,
  downloadTimestampedTextFile as Cp,
};
