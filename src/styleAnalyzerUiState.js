const V = id => document.getElementById(id);
const STYLE_ANALYZER_LOCKED_ATTR = 'data-sa-generating-locked';

function setStyleAnalyzerDisabled(section, disabled) {
  if (!section) return;
  section.setAttribute?.('aria-disabled', disabled ? 'true' : 'false');
  section.querySelectorAll?.('button, input, textarea, select').forEach(element => {
    if (disabled) {
      if (!element.hasAttribute?.(STYLE_ANALYZER_LOCKED_ATTR)) {
        element.setAttribute?.(STYLE_ANALYZER_LOCKED_ATTR, element.disabled ? 'true' : 'false');
      }
      element.disabled = true;
      return;
    }
    const wasDisabled = element.getAttribute?.(STYLE_ANALYZER_LOCKED_ATTR);
    if (wasDisabled === null || wasDisabled === undefined) return;
    element.disabled = wasDisabled === 'true';
    element.removeAttribute?.(STYLE_ANALYZER_LOCKED_ATTR);
  });
}

function Yd(e){const t=V("settings");t&&t.classList.add("generating");const n=V("sa-section");n&&(n.classList.add("generating"),setStyleAnalyzerDisabled(n,!0));const o=document.querySelector(".btn-generate");o&&(o._origText=o.textContent,o.disabled=!0,o.innerHTML=`<span class="spinner"></span>${e}`);const r=V("sa-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const a=V("sa-reflect-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`,a.classList.remove("hidden"));const i=V("global-alert");i&&(i.innerHTML=`笞・・<strong>遞ｼ蜒堺ｸｭ:</strong> ${e}`,i.style.display="flex");const c=V("thought-score-board");c&&(c.style.display="none")}function Zs(e){const t=V("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const n=V("sa-reflect-api-status");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const o=document.querySelector(".btn-generate");o&&(o.innerHTML=`<span class="spinner"></span>${e}`);const r=V("global-alert");r&&(r.innerHTML=`笞・・<strong>遞ｼ蜒堺ｸｭ:</strong> ${e}`);const a=V("thought-score-board");a&&(a.style.display="none")}function Xd(){const e=V("settings");e&&e.classList.remove("generating");const t=V("sa-section");t&&(t.classList.remove("generating"),setStyleAnalyzerDisabled(t,!1));const n=document.querySelector(".btn-generate");n&&(n.disabled=!1,n.textContent=n._origText||"繧ｹ繝医・繝ｪ繝ｼ逕滓・");const o=V("sa-api-status");o&&o.classList.add("hidden");const r=V("sa-reflect-api-status");r&&r.classList.add("hidden");const a=V("global-alert");a&&(a.style.display="none")}

export {
  Yd,
  Zs,
  Xd,
};
