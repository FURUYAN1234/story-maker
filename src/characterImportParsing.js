import { At, Et } from './legacyOptionData.js';

function bf(e){let t="",n=!1;for(let o=0;o<e.length;o++){const r=e[o];n?r==="\\"?(t+=r,o+1<e.length&&(t+=e[o+1],o++)):r==='"'?(n=!1,t+=r):r===`
`?t+="\\n":r==="\r"?(t+="\\n",o+1<e.length&&e[o+1]===`
`&&o++):r==="	"?t+="\\t":t+=r:(r==='"'&&(n=!0),t+=r)}return t}function wf(e){const t=e.replace(/```json\s*/gi,"").replace(/```\s*/g,"").trim().match(/\[[\s\S]*\]/);if(!t)throw new Error("AIの応答からキャラクター情報を抽出できませんでした");let n=t[0];try{return JSON.parse(n)}catch(r){console.warn("キャラクターJSON初回パース失敗、修復を試行:",r.message)}let o=bf(n);o=o.replace(/,\s*([\]}])/g,"$1");try{return JSON.parse(o)}catch(r){throw new Error(`AIの応答JSONの解析に失敗しました。元のエラー: ${r.message}`)}}function $f(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return At.find(n=>n===t)||At.find(n=>t.includes(n)||n.includes(t))||t}function Sf(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return Et.find(n=>n===t)||Et.find(n=>t.includes(n)||n.includes(t))||t}

export {
  bf,
  wf,
  $f,
  Sf,
};
