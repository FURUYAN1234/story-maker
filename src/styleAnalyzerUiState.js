const V = id => document.getElementById(id);

function Yd(e){const t=V("settings");t&&t.classList.add("generating");const n=V("sa-section");n&&n.classList.add("generating");const o=document.querySelector(".btn-generate");o&&(o._origText=o.textContent,o.disabled=!0,o.innerHTML=`<span class="spinner"></span>${e}`);const r=V("sa-api-status");r&&(r.innerHTML=`<span class="spinner"></span>${e}`,r.classList.remove("hidden"));const a=V("sa-reflect-api-status");a&&(a.innerHTML=`<span class="spinner"></span>${e}`,a.classList.remove("hidden"));const i=V("global-alert");i&&(i.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`,i.style.display="flex");const c=V("thought-score-board");c&&(c.style.display="none")}function Zs(e){const t=V("sa-api-status");t&&(t.innerHTML=`<span class="spinner"></span>${e}`);const n=V("sa-reflect-api-status");n&&(n.innerHTML=`<span class="spinner"></span>${e}`);const o=document.querySelector(".btn-generate");o&&(o.innerHTML=`<span class="spinner"></span>${e}`);const r=V("global-alert");r&&(r.innerHTML=`⚠️ <strong>稼働中:</strong> ${e}`);const a=V("thought-score-board");a&&(a.style.display="none")}function Xd(){const e=V("settings");e&&e.classList.remove("generating");const t=V("sa-section");t&&t.classList.remove("generating");const n=document.querySelector(".btn-generate");n&&(n.disabled=!1,n.textContent=n._origText||"ストーリー生成");const o=V("sa-api-status");o&&o.classList.add("hidden");const r=V("sa-reflect-api-status");r&&r.classList.add("hidden");const a=V("global-alert");a&&(a.style.display="none")}

export {
  Yd,
  Zs,
  Xd,
};
