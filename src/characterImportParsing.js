import { At, Et } from './legacyOptionData.js';

function bf(e){let t="",n=!1;for(let o=0;o<e.length;o++){const r=e[o];n?r==="\\"?(t+=r,o+1<e.length&&(t+=e[o+1],o++)):r==='"'?(n=!1,t+=r):r===`
`?t+="\\n":r==="\r"?(t+="\\n",o+1<e.length&&e[o+1]===`
`&&o++):r==="	"?t+="\\t":t+=r:(r==='"'&&(n=!0),t+=r)}return t}function wf(text) {
  const cleaned = text.replace(/```(?:json)?\s*/gi, '').trim();
  // Preserve legacy array responses, including the existing recoverable text wrappers.
  // A JSON object must use the explicit characters envelope; never extract an unrelated nested array.
  const raw = /^[{\[]/.test(cleaned) ? cleaned : cleaned.match(/\[[\s\S]*\]/)?.[0];
  if (!raw) throw new Error('AIの応答からキャラクター情報を抽出できませんでした');
  let parsed;
  try { parsed = JSON.parse(raw); }
  catch {
    try { parsed = JSON.parse(bf(raw).replace(/,\s*([\]}])/g, '$1')); }
    catch { throw new Error('AIの応答JSONの解析に失敗しました。'); }
  }
  const characters = Array.isArray(parsed) ? parsed : parsed?.characters;
  if (!Array.isArray(characters)) throw new Error('AIの応答からキャラクター情報を抽出できませんでした');
  const fields = ['name', 'sex', 'role', 'personality', 'note'];
  return characters.map(item => {
    if (!item || typeof item !== 'object' || Array.isArray(item)
      || fields.some(key => item[key] !== undefined && typeof item[key] !== 'string')
      || !(item.name?.trim() || item.note?.trim())) {
      throw new Error('AIの応答に有効なキャラクター情報がありません。');
    }
    return Object.fromEntries(fields.map(key => [key, (item[key] || '').trim()]));
  });
}
function $f(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return At.find(n=>n===t)||At.find(n=>t.includes(n)||n.includes(t))||t}function Sf(e){if(!e)return"";const t=e.replace(/\(推定\)/g,"").trim();return Et.find(n=>n===t)||Et.find(n=>t.includes(n)||n.includes(t))||t}

export {
  bf,
  wf,
  $f,
  Sf,
};
