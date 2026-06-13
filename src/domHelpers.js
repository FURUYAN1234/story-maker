// Tiny DOM/string helpers shared by the compatibility runtime.
// The short aliases keep legacyMain call sites stable while the file is split.

export function byId(id) {
  return document.getElementById(id);
}

export function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export { byId as N, escapeHtml as Ce };
