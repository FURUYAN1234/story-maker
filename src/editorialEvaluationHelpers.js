import { jt } from './footerHelpers.js';
import { rt } from './longSettingsFormatter.js';

function Jf(e,t="standard"){const n=rt(e||{}),o=t==="long",r=o?"each chapter and the completed long novel":"the visible narrative output",a=/^(?:essay|poem|letter|diary)$/i.test(String(e&&e.mode||""));return`

[Story Maker narrative method stack / internal only]
- Apply the README narrative-engineering stack to ${r}${a?" where the selected format is narrative; do not force foreshadowing into a non-narrative form.":"."}
- Category guide obedience: selected/manual axes are executable writing rules, not labels. Use the injected genre, ending, worldview, target, and narration guides as constraints; never drift to another axis or detail. Current fixed axes: genre=${n.genre} / theme=${n.theme} / era=${n.era} / worldview=${n.worldview} / narration=${n.narr} / target=${n.target} / ending=${n.ending}.
- Multi-axis de-biasing: build novelty from Character x Theme x Genre x Era x Ending x Perspective. Do not repeatedly default to electronics, AI, SNS, gadgets, smartphones, apps, cyber systems, quantum, robots, or surveillance unless the fixed settings explicitly call for them.
- Method coverage: Setup-Payoff, Emotion Gap Design, Motif Recurrence, 15-beat Emotion Curve, GMC+S, Show Don't Tell, Subtext, sensory balance, world-grounded metaphor, and Character Knowledge Boundary must all be considered before drafting.
- Emotion Gap Design: every narrative unit needs a planned expectation-to-reality gap. Choose and combine substitution, exaggeration, reversal, absurdity, tension-release, or normalcy-return; make the gap visible through action and consequence, not an explanation.
- Motif Recurrence and setup-payoff: introduce concrete motifs, habits, objects, phrases, scenery, or actions early, return them in changed contexts, and connect at least one to the emotional peak. Do not solve late plot turns with brand-new convenience facts.
- Scene force: each major scene needs place, goal, motivation, obstacle, stakes, subtextual dialogue or silence, physical action, and consequence. A chapter cannot be only premise explanation, mood, or recap.
- Texture discipline: after visual description, add sound, touch, smell, taste, body pressure, temperature, or silence. Use metaphors sourced from the selected era/worldview rather than stock phrases.
- Character knowledge boundary: before dialogue or interiority, check what that character actually knows. Do not let them leak future reveals, off-screen secrets, or author-only logic.
- Long-novel carry-forward: ${o?"saved chapters and context memos are canon; keep character roster, motif status, wounds, losses, promises, debts, items, relationships, and unresolved crises continuous across chapters.":"if this is a shorter narrative, still preserve setup, payoff, and character knowledge within the output."}
- Quality gate before output: reject and revise internally if Setup-Payoff, emotion gap, motif recurrence, GMC+S, sensory balance, metaphor originality, character agency, category obedience, de-biasing, or knowledge boundaries are weak.
- Do not output this method stack, quality-gate checklist, design labels, self-audit notes, or planning tables.`}function _(e,t="standard"){const n=rt(e||{}),o=t==="long"?"per chapter":"for the whole output";return`

[Gen-4 quality contract / internal only]
- Preflight fact audit: before drafting, internally check dates, money, transit, school/work rules, geography, tools, laws, products, communication methods, and era customs. If a real-world detail is uncertain, verify it through available grounding/general knowledge or make it safely fictional.
- Never change user settings to fix facts. Fixed settings: genre=`+n.genre+" / theme="+n.theme+" / era="+n.era+" / worldview="+n.worldview+" / narration="+n.narr+" / target="+n.target+" / ending="+n.ending+`.
- Emotional arc ledger: `+o+`, internally plan pressure, expectation, reversal, cost, catharsis, and aftertaste. Include at least one irreversible choice, visible cost, and expectation reversal in the visible prose.
- Controlled human noise: avoid a polished emotional landing only. Add 1-3 concrete human frictions: an ugly line, half-finished sentence, bodily discomfort, unfinished chore, payment, dirt, small sound, silence, or contradictory gesture. Typos, broken prose, mojibake, or design notes are not valid noise.
- Anti-uniform ending: do not end only with sunset, sky, wind, light, tears, echo, or a neat smile. Land the ending on action, object, dialogue, practical friction, or an unpaid cost.
- Anti-AI smoothness: vary sentence endings, paragraph length, and metaphor types. Do not make every paragraph the same clean emotional gloss.
- Paragraph discipline: use single-newline paragraph breaks, not blank empty lines after every sentence. In prose, one visible paragraph should usually contain 2-4 sentences or 80-350 Japanese characters; blank lines are allowed only around chapter headings, section headers, scene breaks, and memo blocks.
- Do not output this contract, design tables, self-audit notes, evaluation notes, or hidden planning.`+Jf(e,t)}function Wf(e,t){const n=rt(t||{}),o=jt(e).slice(0,14e3);return`You are a professional fiction editor, fact checker, and commercial fiction judge. Evaluate only the visible generated prose below. Do not reveal internal reasoning.

[Fixed user settings]
genre: `+n.genre+`
theme: `+n.theme+`
era: `+n.era+`
worldview: `+n.worldview+`
narration: `+n.narr+`
target: `+n.target+`
ending: `+n.ending+`

[Rubric]
1. fact_logic: factual, era, and setting logic safety
2. emotional_arc: pressure, reversal, cost, catharsis
3. human_noise: human friction that breaks over-clean AI prose
4. constraint_fit: obedience to selected/manual user settings
5. prose_commercial: scene force, texture, commercial readability
6. narrative_methods: Setup-Payoff, Emotion Gap, Motif Recurrence, GMC+S, Show Don't Tell, Subtext, sensory balance, world-grounded metaphors, and Character Knowledge Boundary
7. category_guides: the selected/manual genre, ending, worldview, target, and narration guides remain active as writing rules
8. de_biasing: novelty comes from multi-axis randomization and does not default to electronics/AI/gadget/cyber motifs without explicit settings

Return JSON only:
{"scores":{"fact_logic":0,"emotional_arc":0,"human_noise":0,"constraint_fit":0,"prose_commercial":0,"narrative_methods":0,"category_guides":0,"de_biasing":0},"strongest_point":"","weakest_point":"","findings":[""],"revision_hint":"","pass":true}

[Text]
`+o}function np(e){let t=String(e||"").trim();const n=t.match(/\{[\s\S]*\}/);n&&(t=n[0]);const o=JSON.parse(t),r=o.scores||{},a=i=>Math.max(0,Math.min(100,Math.round(Number(r[i])||0)));return{scores:{fact_logic:a("fact_logic"),emotional_arc:a("emotional_arc"),human_noise:a("human_noise"),constraint_fit:a("constraint_fit"),prose_commercial:a("prose_commercial"),narrative_methods:a("narrative_methods"),category_guides:a("category_guides"),de_biasing:a("de_biasing")},strongest_point:String(o.strongest_point||""),weakest_point:String(o.weakest_point||""),findings:Array.isArray(o.findings)?o.findings.map(i=>String(i)).filter(Boolean).slice(0,5):[],revision_hint:String(o.revision_hint||""),pass:o.pass!==!1}}function op(e){if(!e)return"";const t=e.scores||{},n=["【Gen-4 AI Evaluation / 第4世代AI編集評価】","- Fact/Logic / ファクト・ロジック: "+t.fact_logic,"- Emotional Arc / 感情曲線: "+t.emotional_arc,"- Human Noise / 人間的ノイズ: "+t.human_noise,"- Constraint Fit / 指定遵守: "+t.constraint_fit,"- Commercial Prose / 商業読後感: "+t.prose_commercial,"- Narrative Methods / 物語メソッド適用: "+t.narrative_methods,"- Category Guides / カテゴリ文体ガイド遵守: "+t.category_guides,"- De-biasing / 多軸ランダム偏り抑制: "+t.de_biasing];return e.strongest_point&&n.push("- Strongest / 強み: "+e.strongest_point),e.weakest_point&&n.push("- Weakest / 弱点: "+e.weakest_point),e.revision_hint&&n.push("- Revision Hint / 改稿ヒント: "+e.revision_hint),e.findings&&e.findings.length&&n.push("- Findings / 所見: "+e.findings.join(" / ")),n.join(`
`)}

export {
  Jf,
  Wf,
  _,
  np,
  op,
};
