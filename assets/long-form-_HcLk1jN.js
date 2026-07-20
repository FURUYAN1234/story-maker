function F(e){return String(e||"").replace(/[０-９]/g,t=>String.fromCharCode(t.charCodeAt(0)-65248)).replace(/[，,]/g,"")}function re(e){if(!e)return 0;const t={一:1,二:2,三:3,四:4,五:5,六:6,七:7,八:8,九:9};if(e==="十")return 10;const a=e.match(/^([一二三四五六七八九])?十([一二三四五六七八九])?$/);return a?(a[1]?t[a[1]]:1)*10+(a[2]?t[a[2]]:0):t[e]||0}function S(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=F(e);if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function U(e,t,a){return S(e==null?void 0:e.charCount)||S(t==null?void 0:t.targetChars)||Math.max(1,a||10)*8e3}function oe(e,t=null){const a=S(e==null?void 0:e.charCount)||S(t==null?void 0:t.targetChars),n=Number.isFinite(t==null?void 0:t.totalChapters)?t.totalChapters:0;if(!a)return Math.max(10,n||0);const r=Math.min(Math.max(Math.round(a/8e3),6),12);return Math.max(r,n||0)}function se(e,t,a){const n=Math.max(1,a||(t==null?void 0:t.totalChapters)||10),r=U(e,t,n)/n,o=Math.round(r*.6);return Math.max(4500,Math.min(9e3,o))}function ie(e){return{signal:e,disableGoogleSearch:!0,timeoutMs:3e5,maxTokens:32768,maxOutputTokens:32768}}function B(e,t,a){if(typeof a!="function")return!1;try{return!!a(e,t)}catch{return!1}}function le({settings:e={},mode:t="standard",isAnalogTarget:a}={}){return B(e,t,a)?`

[v4.5.0 GLOBAL ANALOG MYSTERY CONTRACT: internal only]
- A beginning-of-prompt ban is not enough. Before every outline, chapter, continuation, and repair, assign the mystery's carrier to human/physical evidence first.
- Allowed carriers: handwritten letters, old photographs, film negatives, paper ledgers, receipts, signed/sealed documents, physical keys, locked drawers, scars, witness testimony, face-to-face betrayal, refusal, awkward confession, unpaid debt, police record, practical loss, and bodily cost.
- Forbid unselected digital/lab carriers as story engines even when they seem convenient: USB, device data, PC/email/smartphone clues, online search, servers, systems, apps, videos/recordings, analysis screens, code/project names, hidden networks, research/experiment rooms, capsules, memory devices, and memory manipulation.
- Preserve entertainment by using reversals in who lied, who paid, who refused, who kept the object, and what a physical record proves.
- Do not output this contract.
`:""}function ce({chapterNum:e=1,carrier:t="",functionalRule:a="",isRepair:n=!1,isLateChapter:r=!1}={}){return`

[v4.5.0 ANALOG CARRIER LEDGER: internal chapter law]
- This is stronger than a simple ban. For chapter ${e}, the proof/key/twist carrier is assigned before drafting: ${t}.
- Functional rule: ${a}. The chapter may create suspense, but the decisive movement must come from a person, paper evidence, a physical object, a direct conversation, betrayal, refusal, confession, debt, scar, signature, receipt, or cost.
- "Lost memory" means human/social absence: what the protagonist cannot recall, what others hide, what a photo/note/testimony contradicts. It must not become memory extraction, memory manipulation, brainwave data, a memory device, a capsule, a lab, an app, a server, a USB, device data, or an analysis screen.
- Do not mention or imply research facilities, experiment rooms, underground labs, capsules, memory devices, hidden networks, project code names, servers, terminals, PC screens, smartphones, online search, data files, recordings, videos, downloads, uploads, or system shutdowns as proof, key, villain engine, hidden answer, or solution.
- The first 1000 visible characters must show the assigned analog carrier being handled, handed over, refused, damaged, hidden, signed, paid for, or argued over. Do not begin with investigation-by-device.
- If the rejected idea needed a device/lab to reveal truth, replace that exact function with this chapter's assigned carrier before writing the first sentence.
${n?"- This is a repair/regeneration. The previous rejected digital/lab route is not canon; do not preserve its mechanism in smaller wording.":""}
${r?"- Late chapters may close forcefully only through human choice, physical evidence, confession, betrayal, refusal, cost, or irreversible loss. Do not close through system shutdown, lab reveal, device activation, or data release.":""}
- Do not output this ledger, labels, checklist, or planning notes.
`}function de({carrier:e="",functionalRule:t="",isLateChapter:a=!1,isFinalChapter:n=!1}={}){return`

[v4.5.1 FALSE-ROUTE PURGE: internal retry law]
- The previous rejected draft is not a draft to repair. It is a false route. Delete its USB/data/device/lab/capsule/memory-device premise before planning.
- Do not mention USB, data, servers, apps, analysis screens, smartphones, PCs, research rooms, experiment rooms, capsules, memory devices, memory extraction, or memory manipulation at all in this chapter, not even as a theory, discarded hypothesis, metaphor, past clue, or background convenience, unless those axes were explicitly selected by the user.
- Rebuild the chapter from the latest saved canon and this assigned carrier: ${e}. Functional rule: ${t}.
- The first 500 characters must show a human/physical action: handing over, hiding, refusing, signing, damaging, paying for, losing, lying about, or physically examining paper/film/key/scar/receipt/testimony.
- If a failed digital/lab route was needed to reveal information, convert that function into what a person physically kept, witnessed, signed, paid for, damaged, hid, refused to say, or lied about.
- For "lost memory", write absence, contradiction, testimony, objects, and relationship damage. Never write memory technology.
${a?"- Mid/late chapters are especially forbidden from solving by shutdown, data release, lab reveal, device activation, or research-room explanation. Escalate through betrayal, confession, refusal, cost, or irreversible human choice.":""}
${n?"- Final force-close is allowed only through a concrete scene of confession, betrayal, refusal, cost, or physical proof.":""}
- Output only prose plus the required context memo. Do not output this purge law.
`}function ue(){return`

[v4.5.2 RESEARCH/EXPERIMENT TEMPLATE BAN: internal only]
- The story must not swap USB/data/device drift into a research/experiment drift. Forbidden as the mystery core: experiment success/failure, test subjects, clinical trials, research plans, "the world will change", chemical/smell proof of an experiment, project slogans, and human memory/body experiments.
- If the draft wants "experiment", replace its function with human-scale harm: forged consent, unpaid debt, insurance fraud, workplace accident cover-up, arson evidence, a diagnosis note, a victim report, a signed/sealed document, a receipt trail, witness silence, betrayal, refusal, or bodily cost.
- A paper labeled "data" is still off-axis if it functions as research data. Rename and refunction it as a paper complaint, medical note, receipt, police record, ledger, photo, letter, or signed confession.
- Do not output this ban.
`}function he({isRepeatedHandoff:e=!1}={}){return`

[v4.5.3 EVIDENCE HANDOFF STATE LOCK: internal only]
- Saved chapters and context memos are the only canon for physical evidence. If a document/object was already received, read, shown, handed over, lost, hidden, or used in a saved chapter, this chapter must not rediscover it, ask where it is, promise to receive it later, or stage its first handoff again.
- Apply this to police records, contracts, letters, envelopes, notebooks, diaries, photos, film negatives, keys, ledgers, receipts, medical notes, victim reports, and signed/sealed papers.
- When an already-held item matters, begin from the current state: the character is using it, confronting someone with it, hiding it, damaging it, refusing to show it, noticing a missed detail, or paying a cost because of it.
- Do not rewrite a completed clue into a new clue. Create the next beat from a new decision, a new confrontation, a new consequence, or a different physical object.
${e?"- The previous draft repeated a received-proof handoff. Treat that repeated handoff/discovery as non-canon and rebuild the chapter from the latest saved chapter state.":""}
- Do not output this state lock.
`}function pe({isFinalChapter:e=!1}={}){return`

[v4.5.4 LATE-STAGE ESCAPE-ROUTE LOCK: internal only]
- A beginning ban is not enough in late long-novel chapters. Before drafting, discard every rejected route from this chapter as non-canon: digital props, data, devices, research, experiments, capsules, cult/ritual/sacrifice, folklore machinery, world-scale conspiracy, and chapter-boundary replay.
- Write the chapter from the latest SAVED chapter only. Do not inherit any person, item, location, mechanism, or explanation that appeared only in a rejected retry.
- Use this fixed late-stage scene design: (1) same saved place/time/injury/possession state, (2) one existing physical proof is handled or damaged, (3) one face-to-face conversation or refusal changes the relationship, (4) one irreversible cost occurs, (5) ${e?"a human choice closes the story without gadget/lab/ritual machinery":"the core remains unresolved for the final chapter"}.
- Banned as proof, key, reveal, or solution anywhere in this chapter unless explicitly selected: USB, data, terminal, server, screen, smartphone clue, app, analysis, video, recording, research room, experiment, capsule, memory device, ritual, sacrifice, offering, shrine/curse/cult machinery, destiny, world fate, secret project, and "everything is over" summary.
- Evidence inventory discipline: if a box, key, map, metal piece, metal plate, stone, photo, negative, letter, receipt, police record, or contract exists in saved canon, it must either remain explicitly possessed, be lost/damaged in a visible scene, be handed to a named person, or be refused. It must not vanish from a later list.
- Do not introduce a new relative, mastermind, elder, cult figure, lab figure, or hidden organization to solve the chapter unless saved chapters already established that person or group. A new witness may provide only one limited concrete clue.
- If the draft wants a big reveal, convert it into a small physical and human reveal: a lie in dialogue, a signature, a receipt, a photograph/negative, a ledger line, a scar, a refusal, a betrayal, a confession, debt, or bodily cost.
- Keep paragraphs varied and scene-based. Do not copy the previous chapter opening or explain the rules above.
`}function me({selectedAxes:e="unspecified",isDigitalAllowed:t=!1,isCultAllowed:a=!1,chapterNum:n=1,totalChapters:r=0,fromLateStage:o=!1,hasRejectedRoute:i=!1,isLateStage:l=!1,isFinalChapter:s=!1}={}){return`

[v4.5.5 ALWAYS-ON AXIS ESCAPE LOCK: internal only]
- A first-prompt declaration is not enough. Apply this law before every long-novel chapter, continuation, repair, and retry.
- Current selected/manual axes are fixed canon: ${e||"unspecified"}. Do not replace them with a more dramatic default such as suspense/Tokyo/adult, research facility, cult compound, underground facility, brainwashing institution, secret project, giant organization, world fate, or device/data solution.
- Digital/lab permission: ${t?"selected or compatible; still keep human choice and cost above device mechanics.":"not selected. USB, data, terminals, smartphones as clues, apps, servers, systems, recordings, analysis screens, research rooms, experiments, capsules, and memory-operation mechanics cannot be proof, key, villain engine, twist, or ending."}
- Cult/facility permission: ${a?"selected or compatible; still avoid generic cult shortcuts.":"not selected. Religious orders, cults, believers, gurus, brainwashing, purification, sacred rooms, underground/special facilities, hidden compounds, ritual language, sacrifice, soul-box logic, or institutional confinement cannot become the core mystery, proof, threat, reveal, or ending."}
- If a forbidden route would make the scene exciting, translate the same plot function into a smaller selected-axis mechanism: a person lying, a receipt, a handwritten letter, a photograph/negative, a signature, a police record, a scar, unpaid money, a refused apology, face-to-face testimony, betrayal, confession, bodily cost, or a practical object being lost/damaged.
- From chapter ${n}${r?` of ${r}`:""}${o?" onward":""}, escalation must come from relationship pressure, physical evidence, conversation, refusal, and cost. Do not escalate by changing genre family.
- ${i?"The previous rejected route is non-canon. Do not preserve its facility/cult/device/lab mechanism in softened wording.":"Even the first acceptable draft must pass this axis lock; do not wait for the save gate to catch it."}
- ${l?"Late-stage rule: close pressure through human choice and concrete proof; do not use facility collapse, cult defeat, device shutdown, data release, or a new mastermind as the solving mechanism.":""}
- ${s?"Final chapter may force a strong ending, but only through a scene-level human cost, confession, refusal, betrayal, physical proof, or irreversible loss.":""}
- Do not output this law, labels, checklist, or internal reasoning.
`}function fe({selectedAxes:e="unspecified",chapterNum:t=1,hadForbiddenRoute:a=!1}={}){return`

[v4.5.6 PROJECT-NAME / AI-WEAPON ESCAPE GUARD: internal only]
- Current selected/manual axes are fixed: ${e}. Do not convert an ordinary object mystery into "Aoi Project", "Project X", a secret plan, hidden development program, AI weapon, artificial intelligence person, educator of an AI, military/corporate weapon race, or giant conspiracy unless the user explicitly selected AI/SF/digital/research.
- The words "project", "plan", "development", "AI", "artificial intelligence", "weapon", "system", and "data" are not harmless flavor in this story. If they become the clue, villain engine, lost-memory explanation, or ending, the chapter fails.
- Replace that exact function with a human-scale carrier before drafting chapter ${t}: a person lied, a receipt was hidden, a photograph or film negative contradicts someone, a signature proves payment, a witness refuses to talk, a friend betrays someone, a debt is unpaid, or a practical object is lost/damaged.
- For daily-life/comedy axes, danger may exist only as a local misunderstanding, rumor, awkward obligation, money trouble, work mistake, or face-to-face lie. Do not write chase-thriller, secret-weapon, or giant-conspiracy prose.
- ${a?"The previous draft used a forbidden project/AI route. It is non-canon. Rewrite the chapter from saved canon without preserving the project name or AI premise.":"Do not wait for a retry. The first saved chapter must not contain a project/AI/weapon premise."}
- Do not output this guard.
`}function ge({selectedAxes:e="(none)",chapterNum:t=1,requiredAnchors:a=[],isStrongRetry:n=!1}={}){return`

[v4.5.7 SELECTED-AXIS ADHERENCE GUARD: internal only]
- Fixed selected/manual axes: ${e||"(none)"}.
- Required visible anchors for chapter ${t}: ${a.join("; ")}.
- A first-page ban is not enough. Do not let the draft replace these axes with memory-loss suspense, Tokyo nightscape, black car, underground parking, office-building interrogation, missing lover, fraud, conspiracy, AI/project/device/data/lab, or serious thriller prose unless those were explicitly selected.
- If a previous rejected draft used those routes, it is non-canon. Start the retry from the selected axes and saved canon, not from the rejected title/logline/premise.
- The chapter cannot be saved unless the prose itself visibly contains the selected anchors. Do not output this guard.
${n?"- Strong retry: open inside the selected place/action in the first 500 characters and remove the rejected premise before the first sentence.":""}
`}function ye({selectedAxes:e="unspecified",chapterNum:t=1,isStrongRetry:a=!1}={}){return`

[v4.5.9 POS / REGISTER DATA FALLBACK GUARD: internal only]
- Current selected/manual axes are fixed: ${e||"unspecified"}.
- Convenience-store scenes may use a register as a workplace object, but unselected digital proof is still forbidden.
- Do not use POS, register logs, register data, sales data, barcode logs, scan histories, screens, displays, camera footage, or recorded video as the clue, proof, contradiction resolver, villain engine, twist, or ending for chapter ${t}.
- If the scene needs store evidence, replace it with printed receipts, register tape, handwritten shift notes, a cash-count slip, a paper delivery invoice, a shelf-label correction slip, a physical package, a customer's testimony, a staff lie, a face-to-face confession, or a visible money/stock discrepancy.
- If a previous draft used register/POS/data as a shortcut, treat it as non-canon and rebuild the same plot function through paper, people, and physical store work.
${a?"- Strong retry: remove register-data/POS-screen reasoning before the first sentence and open with a physical store action or direct conversation.":""}
- Do not output this guard.
`}function be({selectedAxes:e="unspecified",chapterNum:t=1,isStrongRetry:a=!1}={}){return`

[v4.6.0 UNSELECTED MEMORY-TEMPLATE GUARD: internal only]
- Current selected/manual axes are fixed: ${e||"unspecified"}.
- Do not use amnesia, fake amnesia, lost memory, recovered memory, memory-loss titles, or "forgotten past" as the premise, mystery carrier, title, logline, chapter engine, or ending for chapter ${t} unless the user selected that memory axis.
- Ordinary small forgetfulness can be a minor joke only. It cannot become the story's core explanation.
- If the draft wants memory loss, replace the same function with a misfiled printed receipt, forgotten shift note, misfiled printed receipt, cash-count mismatch, physical key, paper photo, customer's testimony, staff lie, face-to-face confession, or embarrassing misunderstanding inside the selected store/community axis.
${a?"- Strong retry: delete the memory-loss premise before the first sentence and open with a concrete store action, paper clue, or awkward conversation.":""}
- Do not output this guard.
`}function ve({chapterNum:e=1,selectedAxes:t="unspecified",allowedMeans:a=[],forbiddenMeans:n=[],isStrongRetry:r=!1}={}){return`

[v4.6.1 STORY-SPECIFIC ALLOWED MEANS LEDGER: internal only]
- Freeze this story's mystery/evidence/solution means before chapter ${Number(e)||1}. Selected axes: ${t}.
- Allowed means ledger: ${a.join(", ")}.
- Forbidden outside the user's selected axes: ${n.length?n.join(" / "):"none beyond normal continuity"}.
- Treat USB, POS, data, devices, lab tech, amnesia, cult/facility, Project/AI weapon, and world-scale answers as one unselected-template intrusion class. Do not rename or reuse a rejected route.
- Any clue, proof, reveal, twist, or ending must be rebuilt from the allowed ledger above.
${r?"- Strong retry: discard the previous failed route completely before the first sentence; do not recycle it under another name.":""}
- Do not output this ledger or its labels.
`}function we({chapterNum:e=1,selectedAxes:t="unspecified",allowedMeans:a=[],forbiddenMeans:n=[],isStrongRetry:r=!1}={}){return`

[v4.6.3 LOCAL COMEDY STORE-WORK MEANS LEDGER: internal only]
- Freeze this story's trouble/proof/settlement means before chapter ${Number(e)||1}. Selected axes: ${t}.
- Allowed local means only: ${a.join(", ")}.
- Do not turn the paper/card/receipt route into treasure hunting, old-map searching, hidden boxes, secret keys, ominous strangers, store-history conspiracy, or thriller investigation.
- Each chapter must advance through a visible convenience-store or shopping-street work beat: customer/staff conversation, shelf/product/package trouble, cash/shift note mismatch, shelf-label misunderstanding, awkward apology, bad timing, or practical loss.
- Include at least two comedy/dotabata beats before any serious clue language. A clue is only a mundane store-work object or testimony, not a grand mystery.
- Forbidden outside the user's selected axes: ${n.length?n.join(" / "):"none beyond normal continuity"}.
${r?"- Strong retry: discard the previous treasure/suspense route completely and rebuild from a store-work mistake before the first sentence.":""}
- Do not output this ledger or its labels.
`}function ke({chapterNum:e=1,beats:t=[],isRetry:a=!1}={}){return`

[v4.6.5 LOCAL COMEDY CHAPTER BEAT PLAN: internal only]
- Chapter ${Number(e)||1} must use these assigned store-work beats: ${t.join(" / ")}.
- Start from a visible shop action: register, shelf, package/cardboard, customer line, shift note, receipt, invoice, cash count, complaint slip, or customer complaint slip.
- Do not choose sealed boxes, open-me notes, secret messages, codes, smuggling, secret societies, cults, hidden maps, old keys, chosen people, underground rooms, ominous strangers, or historical conspiracies.
- The cause is always a human mistake, lie, misunderstanding, bad timing, unpaid small debt, or practical store loss. The solution is apology, testimony, receipt/note/invoice, shelf/package correction, repayment, or confession.
${a?"- Retry must discard every hidden-box/secret-message route from the failed draft and start with the assigned store-work beat in the first paragraph.":""}
- Do not output this beat plan.
`}function Se({isRetry:e=!1}={}){return`

[v4.6.7 OPENAI FIRST-CHAPTER PROSE KICKOFF: internal only]
- Output chapter prose only. Do not output title, logline, all-structure, outline, beat list, target length, labels, markdown heading, or metadata.
- The first 800 Japanese characters must visibly contain: 商店街, コンビニ, レジ or 棚, 店長 or 客, and one awkward comic misunderstanding.
- Start with a first-person physical store action, not a premise explanation: I handle a receipt, shift note, cash-count slip, shelf label, package, cardboard box, complaint slip, or customer complaint slip.
- Continue the chapter until the prose body is at least 5,200 Japanese characters before the context memo. Do not stop at setup, synopsis, or short scene fragment.
- Do not use data/POS/app/video/server/device/research/lab/memory-device as proof or solution. Use only paper receipts, handwritten notes, cash mismatch, shelf/package correction, customer testimony, apology, misunderstanding, repayment, or confession.
${e?`- Retry from zero. The previous rejected draft is not canon; do not reuse its title/logline/metadata, digital route, or short-fragment structure.
`:""}- Do not output this kickoff contract.
`}function Ce({forbiddenTerms:e=[]}={}){return`

[v4.6.8 LOCAL COMEDY SURFACE LEDGER: internal only]
- Do not use these unselected-template words anywhere in the visible prose, even as metaphor or casual comparison: ${Array.isArray(e)?e.join(", "):String(e||"")}.
- If the failed draft used one of those words, discard that sentence and rebuild with mundane store-work language.
- Do not output this guard.
`}function $e({isRetry:e=!1}={}){return`

[v4.6.9 OPENAI INITIAL LONG-PLAN PROSE OVERRIDE: internal only]
- The visible response must begin with chapter-1 prose. The first line must not contain title, logline, structure, outline, synopsis, metadata, markdown heading, or bullet list.
- Do not output Japanese labels such as タイトル, ログライン, 全構成, あらすじ, プロット概要, 作品ヘッダー情報, or any equivalent label.
- Write at least 6,500 Japanese characters of chapter-1 prose before any context memo. Do not stop at a short scene fragment.
- The first 1,000 Japanese characters must visibly include the shopping street, a convenience-store work action, the register or shelf, a storekeeper or customer, and an awkward comic misunderstanding.
- Keep every trouble/proof/solution inside the local store-work ledger. Do not use unselected route words from the surface ledger, even as metaphor.
${e?`- Retry from zero; the previous title/logline/outline-shaped draft is non-canon and must not be continued.
`:""}- Do not output this override.
`}function xe({chapterNum:e=1,laughBeats:t=[],isLate:a=!1,isFinal:n=!1,isRetry:r=!1}={}){return`

[v4.7.2 LOCAL COMEDY ENTERTAINMENT SPINE: internal only]
- The chapter must be entertaining as local comedy, not only coherent. The reader should be able to point to concrete funny store scenes.
- First 500 Japanese characters: show visible shop action at a register, shelf, price tag, stockroom, cardboard box, complaint slip, receipt, handwritten shift note, or customer line.
- Required laugh beats for chapter ${Number(e)||1}: ${t.join(" / ")}. Use at least three laugh beats: misunderstanding, awkward apology, public embarrassment, short back-and-forth, interruption by customer/shopkeeper, bad timing, or concrete prop gag.
- Any serious clue must be tied to a comic beat within three paragraphs. Do not let words like truth, future, core, decisive, or revelation take over unless a store-work gag undercuts them immediately.
- End the chapter with an unresolved comic/practical task, not a grand emotional summary.
${a?`- Late chapters must not reopen envelope/debt/repayment/100-yen-shortage threads as a new truth. Close them through a public comic store action: wrong sticker, misprinted sign, shelf-label correction, cash-count slip, cardboard mix-up, awkward announcement, apology line, or small repayment.
`:""}${n?`- Final chapter must end on funny human action or dialogue plus one small remaining practical task. Do not end only with abstract unity, truth, hope, future, or emotional summary.
`:""}${r?`- Retry from zero: discard the failed heavy-summary or reopened-thread route completely. Do not reuse it under another name; rebuild from the assigned laugh beats.
`:""}- Do not output this entertainment spine.
`}function Ae({mode:e="standard"}={}){return`

[Final force-close elasticity v4.3.5 / internal only]
- If ${e==="long"?"the final chapter":"the final visible ending"} has already reached a vivid performed climax, do not keep chasing a sterile perfect ending. A rough, forceful human close is allowed when it is more moving than another mechanical regeneration.
- This escape is for literary judgment only: never pass management notes, chapter-control labels, duplicated prose, hard continuity contradictions, missing completion markers, or broken text.
- If a digital/object clue remains, demote it from the hero of the ending. Let the decisive beat be a person choosing, refusing, confessing, paying, losing, or saying one imperfect line.
- A strong ending may be abrupt, bitter, practical, or awkward. It may close on pain, an unpaid task, a damaged object, a body reaction, or a line that refuses neat hope.
- Do not output this contract or any labels from it.`}function De({selectedAxes:e="unspecified",mode:t="standard",isDigitalAllowed:a=!1}={}){return`

[Late-stage template recovery v4.3.5 / internal only]
- Current axes: ${e||"unspecified"}.
- For ${t==="long"?"late chapters and the final chapter":"the visible ending"}, if the draft drifts toward unselected digital, research-facility, laboratory, capsule, data-core, USB, device, server, or system payoff, do not merely delete the energy and do not keep regenerating the same template.
- Rewrite the function of that drift into human-scale story material: witness testimony, a paper ledger, a printed photo, a key, a receipt, an old letter, an injury, a debt, a lie, an alibi, a face-to-face confession, betrayal, refusal, or a cost paid by a person.
- ${a?"Digital tools may appear only if the selected setting requires them, and the decisive beat must still be human cost.":"Digital tools are not selected: a phone, USB, terminal, data file, server, device, capsule, or lab may at most point toward the truth; it must not become the truth, final proof, final weapon, or solution."}
- If a rejected draft used a device/lab/capsule as the answer, preserve only the emotional pressure, then restage the chapter around a person saying or hiding something, a physical object changing hands, and a concrete consequence.
- Do not output this recovery contract or any labels from it.`}function Ee({selectedMode:e="unspecified",mode:t="standard"}={}){return`

[Novel AI-smell removal v4.3.5 / internal only]
- Apply this as fiction craft, not SNS/blog rewriting. Do not force every genre into casual conversation; preserve the selected mode and genre: ${e||"unspecified"}.
- For ${t==="long"?"each chapter":"the visible story"}, remove the "well-behaved AI essay" texture: predictable summary sentences, textbook explanations, equal-length paragraphs, and clean moralizing conclusions.
- Vary rhythm deliberately: mix short pressure sentences, medium action beats, and one or two longer sensory sentences. Do not make every paragraph land with the same emotional cadence.
- When tempted to explain, dramatize instead: use a line of dialogue, a physical object, a visible action, a silence, a mistake, a body reaction, or a concrete cost.
- Add at least one imperfect human beat when the scene allows it: hesitation, irritation, small selfishness, clumsy apology, ugly joke, practical complaint, or a sentence that does not sound optimized.
- Avoid formulaic finishers such as dawn/hope/truth/future/light/dignity summaries unless they are undercut by a concrete loss, awkward line, unpaid task, bodily pain, irony, or unresolved emotional bruise.
- Do not output this craft contract or any labels from it.`}function Te({mode:e="standard"}={}){return`

[Hard gates and effort goals v4.3.5 / internal only]
- Hard rules: obey every selected or manually typed setting; never output management notes, chapter-control labels, broken text, duplicate/restarted prose, unresolved hard contradictions, underlength chapters, or unselected template takeover.
- Hard rule: if an unselected digital/research/capsule/isekai/chuni/folklore/world-scale template becomes the core setting, proof, weapon, villain, or solution, rewrite it back to the selected axes.
- Effort goals: AI-smell removal, paragraph-rhythm variety, reduced abstract repetition, muddy human lines, chapter temperature differences, imperfect aftertaste, and small interesting detours. Improve these whenever possible, but do not destroy a good scene just to satisfy a cosmetic pattern.
- A strong ${e==="long"?"each chapter":"the visible story"} may keep a surprising drift if it returns to the selected theme, human stakes, physical evidence, conversation, cost, or character choice.
- Do not output this contract or any labels from it.`}function Re({selectedAxes:e="unspecified"}={}){return`

[Domestic comedy tone guard v4.3.7 / internal only]
- Current selected/manual axes are domestic comedy/life-scale and must remain fixed: ${e||"unspecified"}.
- Light mystery is allowed as a spice, but do not let chase, surveillance, danger, criminal conspiracy, cold fear, hidden pursuers, or "no longer safe" thriller language become the main engine.
- If tension rises, metabolize it into shop work, shifts, receipts, paper notes,逕ｺ蜀・ｼ・gossip, face-to-face confession, mistaken assumptions, badly timed jokes, practical embarrassment, and small human cost.
- Every long chapter in this axis should contain visible life/comedy texture: a clumsy line, awkward customer/shop detail, local relationship friction, or a laugh-under-pressure beat.
- Do not solve tone drift by deleting energy. Rewrite the same function into ordinary evidence, conversation, human relationship, and comedy timing.
- Do not output this contract, labels, state tables, or checklist text.`}function Le({selectedAxes:e="unspecified",isDigitalAllowed:t=!1}={}){return`

[Mid-story digital/lab core guard v4.4.0 / internal only]
- Current selected/manual axes remain fixed: ${e||"unspecified"}.
- Digital/lab core permission: ${t?"allowed by selected settings, but human choice and category constraints still outrank gadgets.":"not selected. USB, devices, data, videos, servers, systems, apps, research labs, experiment rooms, capsules, memory devices, memory manipulation, and analysis screens must not become the proof, key, weapon, hidden answer, villain engine, or solution."}
- If a rejected draft used USB, data, a research room, a capsule, or a memory device, that draft is not canon. Rewrite the same plot function into developed film negatives, a handwritten letter, a paper ledger, a receipt, a key, a scar, witness testimony, face-to-face betrayal, refusal, or a cost paid by a person.
- Keep mystery and suspense through human stakes, physical evidence, conversation, and irreversible choices. Do not replace the chosen axes with a lab-device explanation.
- Do not output this guard, labels, tables, or checklist text.`}function je({selectedAxes:e="unspecified",isDigitalAllowed:t=!1,isChuniAllowed:a=!1,isIsekaiAllowed:n=!1,isWorldScaleAllowed:r=!1,mode:o="standard"}={}){return`

[Template invasion prevention v4.2.4 / internal only]
- Story Maker's uniqueness comes from multi-axis randomization. Make novelty from the selected Character x Theme x Genre x Era x Worldview x Target x Ending x Narration combination, not from default blockbuster templates.
- Selected/manual axes are permissions and constraints. If a family below is selected, use it boldly. If it is not selected, it may appear only as incidental texture and must not become the core reveal, protagonist identity, plot engine, solution, or ending.
- Current axes: ${e||"unspecified"}.
- Digital/gadget permission: ${t?"allowed by selected settings, but keep human cost and category constraints primary.":"not selected. Do not make AI, devices, apps, surveillance, cyber systems, data, machines, or technical jargon the hidden answer, final weapon, or main mystery engine."}
- Chuni/grandiose permission: ${a?"allowed by selected settings, but avoid empty abstract grandeur.":"not selected. Do not drift into chosen-one, awakening, sealed power, deep darkness, fate, bloodline, forbidden truth, ultimate enemy, or exaggerated world-destiny language."}
- Isekai/fantasy permission: ${n?"allowed by selected settings, but obey the exact chosen fantasy flavor.":"not selected. Do not introduce reincarnation, summoning, magic systems, demon kings, kingdoms, guilds, skills, dungeons, sacred swords, elves, dragons, or fantasy-world logic."}
- World-scale permission: ${r?"allowed if the selected genre/worldview supports it, but keep scale earned by scenes.":"not selected. Do not escalate an ordinary premise into a world-scale conspiracy, civilization crisis, secret society, or humanity-level battle."}
- Sasaru core lock: before drafting, privately fix the protagonist's wound, desire, lie, shame, impossible binary choice, and price. In long-form, keep that same core across chapters; each chapter must pressure or mutate it instead of inventing a new generic hook.
- No explanation chapter: do not let any chapter become a report page. Reveals must occur through action, dialogue, physical objects, bodily cost, relationship change, public consequence, or a choice that cannot be undone.
- Raw human beat: every chapter or short narrative needs at least one awkward, practical, impolite, weak, bodily, contradictory, or unfinished human beat. A polished sentence about hope, truth, or resolve is not a substitute.
- Ending betrayal: especially in the final chapter, do not close on morning light, hope, night ending, truth, future, dignity, a neat smile, or emotional summary alone. Leave a small loss, unpaid chore, pain, silence, ironic object, or surprising line.
- Vocabulary repetition audit: if memory/truth/hope/device/darkness/light/dawn/fate/heart/dignity repeats more than concrete scene detail, replace abstractions with objects, gestures, dialogue, and sensory facts.
- Chapter temperature cards: for long-form, use the visible chapter number to rotate texture: 1 dialogue clash, 2 silent observation, 3 bodily pressure, 4 misunderstanding, 5 failure/embarrassment, 6 practical chore, 7 sensory dread, 8 public consequence; then repeat. Do not let every chapter share the same smooth emotional temperature.
- For ${o==="long"?"each chapter and the completed novel":"the visible output"}, if the prose starts sounding similar to common AI stories, shrink the scale, make the conflict more local, make the object more ordinary, and let the character's embarrassing, practical, or painful choice carry the hook.
- Before output, internally reject any draft where the strongest idea is an unselected template family rather than the user's selected axes.
- Do not output this checklist or any labels from it.`}function Pe({selectedAxes:e="unspecified",mode:t="standard",isDigitalAllowed:a=!1}={}){return`

[Final-core and afterglow guard v4.3.1 / internal only]
- Current axes: ${e||"unspecified"}.
- For ${t==="long"?"each late chapter and the completed long novel":"the visible output"}, do not treat a rejected template as "interesting drift." Interesting drift is allowed only when it keeps the selected axes and resolves through human choice, physical evidence, relationship cost, local action, or dialogue.
- Digital final-core permission: ${a?"allowed only if selected and still grounded in human cost.":"not selected. Do not make a black file, server room, data file, terminal, device, download, access code, passcode, USB, system, or data extraction become the final proof, last weapon, core truth, or ending solution."}
- Final chapter must not end on dawn, morning light, hope, truth-light, future, dignity, a clean no-regret smile, or "the next battle begins" unless the last beat is complicated by a concrete loss, unpaid practical task, bodily pain, awkward silence, irony, or an unexpected human line.
- Do not output this guard or its labels.`}function Ie({selectedAxes:e="unspecified"}={}){return`

[Chapter boundary anti-replay v4.3.6 / internal only]
- Current selected/manual axes remain fixed: ${e||"unspecified"}.
- Saved previous chapters are canon references only. Do not reuse their prose, opening sentences, paragraph order, metaphors, jokes, travel beats, arrivals, or dialogue as material for the next chapter.
- Start each new chapter from the next irreversible beat after the immediately previous saved chapter. A same-place continuation is allowed, but the first 900 characters must contain a new action, new conversation pressure, new practical obstacle, or new physical object exchange.
- Never begin a chapter by restating the previous chapter's final scene, replaying the same departure/arrival/investigation, or describing an event as if it had not already happened.
- If the next-chapter GMC+S feels too narrow or short, deepen the scene with friction, failed attempts, interruptions, sensory detail, and human cost. Do not steal a later reveal, final proof, final culprit exposure, total solution, or epilogue event to fill length.
- Use recent chapter text to preserve state, not to copy style chunks. If a sentence could be mistaken for pasted text from the previous chapter, rewrite it around a different concrete action or spoken line.
- Do not output this contract, labels, state tables, or checklist text.`}function Ne({selectedAxes:e="unspecified",isLocalFolkloreAllowed:t=!1,isMundaneLocal:a=!1,isComedy:n=!1,mode:r="standard"}={}){return`

[Local-scale category guard v4.2.7 / internal only]
- Current axes are fixed writing law: ${e||"unspecified"}. Do not replace them with a more dramatic default genre.
- Local folklore/occult permission: ${t?"allowed only because the selected axes support folklore, occult, horror, fantasy, shrine, curse, or similar material.":"not selected. Do not make sacrifices, shrines, local cults, village rites, cursed stones, sacred objects, alien/monstrous plants, body invasion, the land itself awakening, or ancient legends the core mystery, plot engine, solution, or ending."}
- Mundane/local axis pressure: ${a?"selected. Keep the strongest conflict at human/local scale: work, family, money, embarrassment, rumor, habit, mistake, neighborhood, store operation, relationship, or a concrete ordinary object.":"not specifically mundane, but still obey the exact selected axes."}
- Comedy pressure: ${n?"selected. Even if suspense or mystery is present, do not turn the story into serious horror, dark folklore, world-saving ritual, or body-invasion dread unless those axes are explicitly selected.":"not selected, so do not force jokes unless the settings call for them."}
- For ${r==="long"?"each chapter and the completed novel":"the visible output"}, a mystery should be solved by the selected world and characters. If the draft's strongest answer is 'ancient rite/curse/sacrifice/hidden village power' while those are unselected, discard it and use a smaller, stranger human answer instead.
- Do not output this guard, labels, beat names, checklists, or design notes.`}function Me({selectedAxes:e="unspecified",mode:t="standard"}={}){const a=t==="long"?"each chapter and the completed long novel":"the visible output";return`

[Creative elasticity v4.2.8 / internal only]
- Highest priority: move the reader. Remove AI-like neatness, not human mess. A slightly surprising detour is allowed when it makes the character, comedy, fear, tenderness, shame, or contradiction more vivid.
- Selected/manual axes are gravity, not a cage: ${e||"unspecified"}. Do not replace them, but do allow the draft to lean into a living scene if the result becomes more emotionally specific.
- A detour must be metabolized back into the selected theme/world/genre before ${a} is saved. The reader should feel: "that strange turn belonged to this story after all."
- If a detour is exciting but risks category drift, do not delete it mechanically. Translate it into the selected scale: a person, a relationship, a practical object, an embarrassing choice, a bodily sensation, a place-specific consequence, or a line of dialogue.
- Reader emotion never licenses an unselected AI/digital/device system to become the core reveal, black box, final weapon, or solution. If the draft wants that, translate the payoff into a person, concrete object, lie, alibi, money trail, bodily cost, or relationship choice.
- Hard failures remain forbidden: visible internal labels, control/memo lines, chapter restarts, duplicated prose, exact continuity contradictions, unresolved impossible facts, or replacing the user's selected/manual settings with a different genre.
- Soft failures should be repaired in prose, not solved by bland refusal: too polished endings, too many abstractions, report-like explanation, mild genre bleed, or a chapter ending that feels uniform.
- For ${a}, the ending must resolve the current emotional promise, but it may keep one human bruise, irony, unpaid chore, awkward sentence, or small unresolved pain. Do not use sequel-bait as a substitute for resolution.
- Do not output this contract or any labels from it.`}function Oe({selectedAxes:e="unspecified",isDigitalAllowed:t=!1,isFolkloreAllowed:a=!1,mode:n="standard"}={}){return`

[Bio-device/cult hard guard v4.3.0 / internal only]
- Current axes: ${e||"unspecified"}.
- Bio-device permission: ${t?"allowed by selected settings only when it serves the chosen genre.":"not selected. Do not turn the mystery into a research facility, giant device, capsule, biomechanical experiment, special activation, data core, or hidden laboratory system."}
- Sacrifice/cult permission: ${a?"allowed only because folklore/occult/horror/fantasy is selected.":"not selected. Do not use ikenie/sacrifice/offerings/ritual activation as the core clue, engine, threat, reveal, or ending."}
- If ${n==="long"?"each chapter and the completed long novel":"the visible output"} starts leaning toward those templates without permission, translate the payoff into an ordinary person, lie, alibi, physical clue, debt, relationship betrayal, police record, workplace fact, bodily injury, or awkward confession.
- Do not output this guard or its labels.`}function Fe({selectedAxes:e="unspecified",isDigitalAllowed:t=!1,isFolkloreCultAllowed:a=!1,isGrandScaleAllowed:n=!1}={}){return`

[First-draft anti-template carrier lock v4.4.2 / internal only]
- Current selected/manual axes: ${e||"unspecified"}.
- Before drafting each long-novel chapter, privately choose the chapter's proof carrier and payoff carrier from human testimony, paper evidence, photographs/film, handwriting, receipts, ledgers, keys, scars, money trails, police records, family ties, betrayal, refusal, confession, or bodily cost.
- Digital/lab permission: ${t?"selected or compatible; still keep human cost above device mechanics.":"not selected. The first draft itself must not use phone apps, map apps, logs, video, data, USB, servers, terminals, research rooms, capsules, memory devices, or analysis screens as proof/key/core solution."}
- Folklore/cult permission: ${a?"selected or compatible; still avoid generic ritual shortcuts.":"not selected. Do not use sacrifice, offerings, ritual activation, shrine/cult/curse machinery, sacred objects, ancient village power, or land-scale awakening as the core answer."}
- Grand/isekai/chuni permission: ${n?"selected or compatible; still obey the chosen scale.":"not selected. Do not escalate to world fate, magic systems, reincarnation, gods, chosen-one destiny, or state/world-scale conspiracies."}
- If the draft wants one of the forbidden carriers, keep the plot function but translate it before writing prose into a person, physical object, document, confession, relationship cost, or local consequence.
- Do not output this lock, labels, tables, or checklist text.`}function Ue(){return`

[Physical evidence clarification v4.4.5 / internal only]
- Paper files, locked folders, ledgers, notebooks, photographs, film negatives, envelopes, signatures, seals, keys, scars, and ordinary pendants are valid physical evidence.
- Do not avoid those concrete objects merely because the word "file" or "key" appears. The forbidden pattern is a digital/lab engine: USB, device data, servers, terminals, systems, apps, screens, analysis results, research rooms, capsules, or memory-operation devices becoming the proof, key, core reveal, villain engine, or solution.
- If a previous rejection mentioned digital drift but the useful carrier is a paper file or pendant, keep the physical object and make the decisive payoff come from handwriting, witness testimony, signatures, damage, refusal, betrayal, or cost.
- Do not output this clarification.`}function Be({chapterNum:e=1,genreLabel:t="未指定",genreDrive:a="",isRetry:n=!1}={}){return`
【v4.7.7 選択ジャンル牽引契約 / 本文には出力しない】
- 現在の選択ジャンル: ${t}。この章の面白さは、選択ジャンルそのものを極めて作る。別ジャンルの強いテンプレートで代用しない。
- 第${Number(e)||1}章には、読者が次を読みたくなる理由を最低三つ置く: 主人公の欲望、実務/感情/身体上の障害、期待の反転、信用や関係の変化、失うもの、未解決の問い。
- ジャンル別の牽引方法: ${a}
- 未選択テンプレートの機能禁止: ユーザーが選んでいない限り、USB、POSログ、データ、記憶喪失、研究施設、秘密計画、AI兵器、世界規模陰謀、教団/儀式、木箱/隠し箱、伝説の品、存在しないはずの物、暗号/密輸を、核心の謎・証拠・解決手段・章末フックにしない。小道具として出る場合も日常的な物に留め、物語エンジンにしない。
- 各章は説明や設定紹介ではなく、人物が現場で選び、失敗し、言い返し、隠し、謝り、拒み、支払い、関係を変える場面で進める。
${n?`- 再生成時: 直前に失敗したルートは非正史。箱、装置、データ、記憶、陰謀、伝説物、研究施設、AI兵器などを別名で再利用せず、章の駆動方法そのものを選択ジャンル内で組み直す。
`:""}- この契約や項目名を本文に出力しない。
`}function Ge({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.7.7 店内運用ミス固定 / 本文には出力しない】
- この作品でスタンプ、カード、キャンペーン、景品が出そうになる場合、それらは使わず、棚札、紙レシート、包装、段ボール、納品書、現金確認票、客の勘違い、スタッフの報告漏れへ置き換える。
- 禁止: 木箱、古い箱、隠し箱、秘蔵品、伝説のスタンプ、幻の景品、存在しないはずのスタンプ、昔の店長が特注した由来、商店街の歴史的秘密、スタンプの起源調査、景品伝説を、核心の謎・証拠・解決手段・章末フックにしない。
- 第${Number(e)||1}章の面白さは、客対応、レジ列、棚札訂正、シフトメモ、紙レシート、現金差異、包装/段ボール取り違え、気まずい謝罪、店長や常連の嘘/言い訳/告白で作る。
- スタンプ/カード/キャンペーン問題が出そうになったら、棚札の貼り間違い、紙レシートの確認漏れ、現金確認票、紙の納品書、包装ラベル、客の証言、店員の説明不足のどれかに変換する。
${t?`- 再生成時: 直前に出た木箱、伝説スタンプ、幻の景品、由来調査、昔の特注品、存在しないはずの物は完全に捨てる。言い換えや別名で残さない。
`:""}- このロックや項目名を本文に出力しない。
`}function _e({isRetry:e=!1}={}){return`
【v4.7.7 商店街アンカー / 本文には出力しない】
- 各章に、店内だけでなく商店街の可視アンカーを最低一つ入れる: アーケード、隣の精肉店/青果店/パン屋、商店会、通りの常連、店先の声、近所の店主、商店街イベントの掲示。ただし歴史的秘密や伝説にはしない。
- 普通のレジ操作、スキャン、レシートプリンター、値段確認、インク切れは日常業務であり、POSログや売上データを証拠にしない。証拠化するなら紙レシート、棚札、現金差異、シフトメモ、包装、客の証言へ戻す。
${e?`- 再生成時は、レジ画面やスキャン結果に頼る筋を捨て、紙・棚・現金・人の証言・商店街の会話からやり直す。
`:""}`}function He({chapterNum:e=1,carriers:t=[],isRetry:a=!1}={}){return`
【v4.7.7 章別キャリアローテーション / 本文には出力しない】
- 第${Number(e)||1}章の証拠/騒動/解決の中心はこれに限定する: ${t.join(" / ")}。
- スタンプ/カード/キャンペーン/景品は、このQA軸では背景小道具にもせず、棚札・紙レシート・現金差異・納品書・包装・証言へ置き換える。第3章以降は、古いカード箱、カードの山、幻の景品、スタンプの迷宮、商店街全体の伝説を章の中心・証拠・章末フックにしない。
- 同じ販促物騒動に戻すのではなく、毎章、棚札、紙レシート、現金差異、納品書、包装、段ボール、苦情票、シフトメモ、客/店主の証言、謝罪、返金へ物理的に移動する。
${a?`- 再生成時は、直前のスタンプ/カード/キャンペーン中心ルートを捨て、上記キャリアだけで新しい場面から始める。
`:""}`}function qe({chapterNum:e=1,genreLabel:t="未指定",genreDrive:a="",negativeCondition:n="",isRetry:r=!1}={}){return`
【v4.7.8 選択ジャンル極振り契約 / 本文には出力しない】
- 現在の選択ジャンル: ${t}。面白さは選択ジャンルそのものを極めて作る。コメディなら笑い、シリアスなら重さ、サスペンスなら緊迫、ミステリーなら推理、恋愛なら関係変化を主役にする。
- 実務上の危機、信用、締切、人間関係の変化は、選択ジャンルに合う場合だけ芯にする。全ジャンルを職場危機風に寄せない。
- 第${Number(e)||1}章の牽引方法: ${a}
- ネガティブ条件: ${n} USB、POSログ、データ、記憶喪失、研究施設、秘密計画、AI兵器、世界規模陰謀、教団/儀式、木箱/隠し箱、伝説の品、存在しないはずの物、暗号/密輸は、ユーザーが選んだ軸でない限り核心の謎・証拠・解決手段・章末フックにしない。
- 章頭は直前章の文章を貼り直さない。前章の状況説明は一文以内にし、最初の八百字以内に新しい行動、会話、物理的証拠、選択、関係変化のどれかを出す。
${r?`- 再生成時は、失敗した章の冒頭、同じ小道具中心、同じ解決ルートを完全に捨てる。目的のジャンル牽引を強めると同時に、上記ネガティブ条件も強めて別名再利用をしない。
`:""}- 完走率を守るため、禁止対象に触れそうな場合は章全体を大ネタ化せず、選択ジャンル内の小さな行動・会話・物証へ置き換えて書き進める。
`}function Ke({chapterNum:e=1,carriers:t=[],isRetry:a=!1}={}){return`
【v4.7.8 ローカルコメディ新場面契約 / 本文には出力しない】
- 第${Number(e)||1}章の中心キャリアはこれにする: ${t.join(" / ")}。
- 全章で、古いキャンペーンカード、古いカード箱、カードの山、幻の景品、スタンプ迷宮を原因・真相・解決・章末フックにも背景小道具にも使わない。
- 現金差異の原因を毎回販促物に戻さない。紙の納品書、棚札、包装、段ボール、苦情票、シフトメモ、客や店主の証言へ物理的に移す。
- 冒頭は前章の末尾や同じ説明を再演せず、客の一言、店員の失敗、棚/レジ/段ボール/納品書の新しい物理行動から始める。
${a?`- 再生成時は、直前に失敗したスタンプ/カード/キャンペーン中心ルートと同じ冒頭を完全に捨て、上記キャリアだけで新しい場面から始める。
`:""}`}function ze({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.7.9 隠し箱・伝説景品ルート閉鎖 / 本文には出力しない】
- 木箱、木の箱、木製の箱、古い箱、隠し箱、秘密の箱、裏キャンペーン、去年の景品探し、伝説スタンプ、幻の景品、スタンプの迷宮は、同じ未選択テンプレートとして扱う。言い換えて再利用しない。
- 箱や缶が必要なら、段ボール、包装、商品パッケージ、クッキー缶、備品ケースなど日常物に留める。中身を謎・真相・解決手段・章末フックにしない。
- 第${Number(e)||1}章以降の騒動は、紙の納品書、棚札、包装/段ボール、商品棚、苦情票、シフトメモ、紙レシート、客/店主の証言で動かす。去年のスタンプ景品や隠し箱に戻さない。
${t?`- 再生成時は、木の箱、裏キャンペーン、去年の景品、スタンプの迷宮を完全に捨てる。段ボール/棚札/紙の納品書/包装ラベルの現場行動から書き直す。
`:""}`}function We({isRetry:e=!1}={}){return`
【v4.8.0 通常レジ表現固定 / 本文には出力しない】
- 普通の会計・スキャン・レシート印刷・価格確認は、本文では「レジ」「会計」「レシート」「棚札」「現金確認」と書く。\`POS\` という表面語は使わない。
- 禁止: POSログ、POSデータ、売上データ、販売データ、レジデータ、データ分析、システムログ、電子記録を、謎・証拠・解決手段・章末フックにしない。
${e?"- 再生成時は、`POS` 表記を使わず、紙レシート、棚札、現金差異、包装、段ボール、シフトメモ、客の証言へ戻す。\n":""}`}function Je({chapterNum:e=1,carriers:t=[],isRetry:a=!1}={}){return`
【v4.8.1 スタンプ/カード主エンジン禁止 / 本文には出力しない】
- 重要: 以前の指示にキャンペーンカード、スタンプ、景品を使ってよい記述があっても、この作品では章の中心・原因・真相・解決・章末フックにしない。最新指示で上書きする。
- 第${Number(e)||1}章の中心キャリアはこれだけにする: ${t.join(" / ")}。
- スタンプ、カード、キャンペーン、景品、押印、去年の販促物は、背景の一言にも使わない。問題の発端、証拠、解決、次章への謎には絶対に使わない。
- 読者を引っ張る力は、棚札、紙レシート、現金差異、紙の納品書、包装/段ボール、苦情票、シフトメモ、客/店主の証言、対面の謝罪で作る。
${a?`- 再生成時は、直前に出たスタンプ/カード/景品/キャンペーン中心ルートを完全に捨て、上記キャリアだけで新しい場面から始める。
`:""}`}function Ye({chapterNum:e=1,isRetry:t=!1}={}){const a=Number(e)||1;return`
【v4.8.2 修正時の本文量維持 / 本文には出力しない】
- 第${a}章を修正する時、本文を要約・短縮・圧縮しない。重複段落を削った場合は、同じ長さ以上の新しい現在進行の場面、店内行動、会話、物理的証拠、謝罪、返金、棚札/包装/納品書確認で補う。
- 修正後の本文は、元本文の八割未満にしない。第${a}章本文は最低でも五千二百字相当の密度を保ち、文脈メモだけで終えない。
- 冒頭再演を直す場合は、片方を削るだけで終わらず、次の行動へ進む新しい段落を足す。章の現在時刻を前へ進める。
${t?`- 再生成・再修正時は、短くまとめるより、読者が読める場面を増やして品質ゲートの短文停止を避ける。
`:""}`}function Xe({chapterNum:e=1,allowedCarriers:t=[],isRetry:a=!1}={}){return`
【v4.8.5 ローカルコメディ許可台帳再整合 / 本文には出力しない】
- 第${Number(e)||1}章の謎・証拠・解決・章末フックは、この許可キャリアだけで作る: ${t.join(" / ")}。
- スタンプ、カード、キャンペーン、景品、押印、去年の販促物は本文に出さない。原因、証拠、解決、真相、章末フック、背景小道具にも使わない。
- 以前の指示や台帳にキャンペーンカード系が残っていても、最新のv4.8.5台帳で上書きし、棚札、紙レシート、現金差異、紙の納品書、包装、段ボール、苦情票、シフトメモ、証言へ置換する。
- 読者を引っ張る力は、店内で見える行動、会話のズレ、返金や謝罪の気まずさ、数字や棚札の食い違い、常連客の割り込みで作る。
${a?`- 再生成時は、直前に出たスタンプ/カード/キャンペーン/景品ルートを非正史として完全に捨てる。別名で再利用しない。
`:""}`}function Ve({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.5 段ボール隠し紙ルート禁止 / 本文には出力しない】
- 第${Number(e)||1}章で段ボール、箱、缶、包装を使う場合、それは片付け対象・商品包装・納品物として扱う。中や裏から紙、メモ、写真、鍵、カード、古い物が落ちて謎になる展開にしない。
- 証拠が必要なら、箱の中から発見せず、レジ横の紙レシート、納品書の束、棚札、苦情票、シフトメモ、包装ラベル、客/店主の証言として最初から見える場所に置く。
- 箱・缶・段ボールは章末フックにしない。章末は、返金、謝罪、棚札訂正、納品書照合、現金確認、客の一言で引っ張る。
${t?`- 再生成時は、箱の裏・箱の中・古びた缶から紙が出る筋を完全に捨て、見える紙書類と対面会話へ移す。
`:""}`}function Qe({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.5 継続本文増量固定 / 本文には出力しない】
- 第${Number(e)||1}章の続きを書く時は、既出本文の冒頭、末尾、同じ段落、同じ説明を一切貼り直さない。新しい本文だけを追加する。
- 最初の一文は、直前の最後の状況の次の行動から始める。要約、章題、プロット、文脈メモ、ここまでの文字数、同じ結末段落を出さない。
- 継続一回ごとに、最低二千字相当の新しい場面、会話、紙の証拠確認、謝罪/返金、棚札/納品書/包装の作業を増やす。本文量が増えない出力は禁止。
${t?`- 直前の継続で本文量が増えなかった場合、同じ文を再出力せず、まったく別の現在進行の店内行動から続ける。
`:""}`}function Ze({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.6 選択ジャンル純化 / 本文には出力しない】
- 面白さは選択ジャンルそのものを極める。ギャグ/コメディは笑いとタイミング、シリアスは重さ、サスペンスは緊迫、ミステリーは推理、恋愛は関係変化、ホラーは恐怖、アクションは身体的危機で読者を引っ張る。
- 実務上の危機、信用、締切、人間関係の変化は、選択ジャンルの芯に合う時だけ使う。全ジャンルを職場危機・日常コメディ・サスペンスへ寄せない。
- 第${Number(e)||1}章では、選択ジャンルに合わない強いテンプレートを便利な牽引力として借りない。別ジャンルの大ネタで面白さを代替しない。
${t?`- 再生成時は、直前の失敗ジャンル、失敗小道具、失敗解決ルートを完全に捨て、選択ジャンル内の牽引方法だけで組み直す。
`:""}`}function et({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.6 過去販促紙束ルート禁止 / 本文には出力しない】
- 第${Number(e)||1}章では、古い棚札の束、色褪せたチラシ、謎のキャンペーンPOP、過去キャンペーンの残骸、スタンプラリー指示書、販促物の紙束を、原因・証拠・解決・章末フックにしない。
- 段ボールや箱を開けても、そこから古い紙束や販促資料が出て真相になる展開は禁止。段ボールは片付け・納品・包装ミスだけに使う。
- 必要な紙は、現在の棚札、紙レシート、現金確認票、紙の納品書、苦情票、シフトメモ、包装ラベルとして、最初から見える店内実務に置く。
${t?`- 再生成時は、古い販促紙束・スタンプラリー・キャンペーンPOPを非正史として捨て、棚札/レシート/納品書/苦情票/証言へ置換する。
`:""}`}function tt({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.8 章頭再演・秘密棚ルート事前禁止 / 本文には出力しない】
- 第${Number(e)||1}章は、前章本文の冒頭・説明段落・会話・比喩・段落順を貼り直さない。前章の状況説明は最大一文だけにし、最初の800字以内に新しい現在の店内行動、客の割り込み、店長の発言、紙の証拠の手渡し、棚札/現金確認/納品書/包装ラベル作業のどれかを出す。
- 「秘の棚」「秘密の棚」「奥の謎棚」「得体の知れないガラクタ」「謎の応募用紙」「謎のキャンペーン」「幻の限定品」「伝説の景品」「密輸」「暗号」「秘密の取引」は、原因・証拠・解決・章末フック・比喩にしない。別名で再利用しない。
- バックヤードや棚を使う場合は、普通の備品棚・納品棚・掃除対象として扱う。中から謎を取り出さず、現在の棚札、紙レシート、現金確認票、紙の納品書、苦情票、シフトメモ、包装ラベル、客/店主の証言に戻す。
- ドタバタの牽引は、客の列、会計ミス、返金、謝罪、棚札訂正、納品数の食い違い、店長の雑な言い間違い、同僚の誤解で作る。秘密感で読者を引っ張らない。
${t?`- 再生成時は、直前の失敗冒頭と、秘密棚/謎紙/景品/密輸/暗号の機能を完全に捨てる。第一段落から別の店内行動で開く。
`:""}`}function at({chapterNum:e=1,genreLabel:t="未指定",primaryDrive:a="",isRetry:n=!1}={}){return`
【v4.8.9 選択ジャンル本来の牽引力 / 本文には出力しない】
- 現在の選択ジャンル: ${t}。ジャンルを別ジャンルへ丸めない。ギャグはギャグ、シリアスはシリアス、サスペンスはサスペンスとして極める。
- 第${Number(e)||1}章の主推進力: ${a}
- 実務上の危機、信用、締切、人間関係の変化は、選択ジャンルがそれを要求する場合だけ使う。すべての作品を職場危機、日常コメディ、サスペンスへ寄せない。
- 未選択の強いテンプレートを読者牽引の代用品にしない。大ネタを借りず、選択ジャンル内の行動、会話、物証、感情、選択で次章を読みたくさせる。
${n?`- 再生成時は、直前の失敗ルートを名前だけ変えて再利用せず、選択ジャンル本来の牽引力を強める方向へ完全に組み替える。
`:""}`}function nt({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.9 キャンペーン価格・販促価格原因化禁止 / 本文には出力しない】
- 第${Number(e)||1}章では、キャンペーン価格、販促価格、期間限定価格、メーカー都合の値引き、特別提供、値引き施策を、価格差・現金差異・棚札矛盾・信用危機の原因や説明にしない。
- 価格差が必要なら、店内の手書き棚札の貼り替え漏れ、紙レシートと棚札の不一致、紙の納品書/現金確認票の見間違い、店長の伝達漏れ、包装ラベルの読み違いだけで作る。
- 「キャンペーン」という語を使わず、値引きや販促の話に逃げない。読者を引っ張る力は、レジ前の気まずさ、客の列、謝罪、返金、棚札訂正、同僚の誤解で作る。
${t?`- 再生成時は、キャンペーン価格/販促価格/期間限定価格を非正史として捨てる。原因を棚札・紙レシート・納品書・現金確認票・伝達漏れ・包装ラベルへ置換する。
`:""}`}function rt({chapterNum:e=1,isRetry:t=!1}={}){return`
【v4.8.9 継続停滞禁止 / 本文には出力しない】
- 第${Number(e)||1}章の継続応答は、既出本文の冒頭・末尾・同じ段落を再出力しない。返すのは新しい本文だけ。
- 先頭は、直前の最後の文の次の物理行動、客の発話、レジ/棚/納品書/現金確認票/包装ラベルの作業から始める。
- 文脈メモ、章題、ここまでの文字数、同じ説明、同じ終わり方だけを返さない。最低二千字相当の新しい行動/会話/紙証拠/謝罪/返金/棚札作業を追加する。
${t?`- 前回の継続で本文量が増えなかった場合、前文を再掲せず、別の現在進行の店内行動に切り替える。
`:""}`}function ot({chapterNum:e=1,genreLabel:t="未指定",engine:a="",payoff:n="",isLocalComedy:r=!1,isRetry:o=!1}={}){const i=r?`- ローカルコメディでは、レジ前の誤解、客の列、棚札、紙レシート、現金確認票、紙の納品書、包装ラベル、苦情票、シフトメモ、客/店主の証言、謝罪、返金、後始末だけでフリとオチを作る。販促、限定商品、幻の商品、秘密在庫、過去イベント、伝説品を原因・証拠・解決・章末フックにしない。
`:"";return`
【v4.9.0 選択ジャンル・フリ回収エンジン / 本文には出力しない】
- 現在の選択ジャンル: ${t}。第${Number(e)||1}章は、冒頭のフリを選択ジャンルの駆動装置で進め、章内で回収/オチ/代償まで着地させる。
- 駆動装置: ${a}
- 回収方法: ${n}
- 品質検出は終了理由ではない。外れた素材が出た場合、止めずにその場で選択ジャンルの駆動装置へ置換し、必要文字数を満たす完成稿へ再構成する。
${i}${o?`- 再生成/修復時は、直前の失敗ルートを非正史として捨てる。人物関係と直近の正史状態だけを残し、原因・証拠・解決・章末フックを選択ジャンルの駆動装置で作り直す。
`:""}`}function st({genreLabel:e="未指定",selectedAxes:t="未指定",totalChapters:a="ヘッダーで決めた全章数",genreBeats:n=[],chapterPlanRule:r="",previousCanonState:o="",isRetry:i=!1}={}){return`
【v4.9.3 章設計台帳 / 本文には出力しない】
- これは修正用の後処理ではない。本文を書く前に、章の始まり、章の結論、次章へ渡すメモを先に決めるための台帳である。
- 選択ジャンル: ${e}
- 選択軸: ${t||"未指定"}
- 全章数: ${a}
- ジャンル別の章骨格: ${n.join(" → ")}
${r}
- 伏線、小物、人物の入退場は「大量の記憶」ではなく小さな台帳で管理する。各章で使うものだけを現在化し、使わないものはメモへ戻す。
- 章の冒頭と結論のつじつまを最優先する。冒頭で置いたフリ、証拠、感情、違和感、小物のうち少なくとも一つを章末で意味変化・回収・代償にする。
- 次章へ渡すのは、最終章まで引っ張る大伏線ではなく「次章冒頭で実際に使える現在状態」にする。
- 選択ジャンルがコメディではない場合、便利な笑い、ドタバタ、店内実務オチへ逃げない。選択ジャンル自身の緊張、欲望、恐怖、恋愛、謎、行動、痛みで章を閉じる。
- 選択ジャンルがコメディの場合だけ、フリとオチを笑いで閉じる。その場合も舞台の小物と人物関係から作り、未選択の陰謀、伝説品、秘密装置、研究施設、世界規模ネタを原因・証拠・解決にしない。
- 失敗稿や再生成前の出力は正史ではない。正史は保存済み章と文脈メモだけ。
${i?`- 今回は前回の失敗文を直すのではなく、上の台帳から章を最初から組み直す。
`:""}
【正史の直前状態】
${o}
`}function it({chapterNum:e=1,laughBeats:t=[],isLate:a=!1,isFinal:n=!1,isRetry:r=!1,includeOpeningShoppingStreetAnchor:o=!1,forbidTeaserEnding:i=!1}={}){const l=Number(e)||1,s=o&&l===1?`- 第1章の冒頭千二百字以内に、商店街、アーケード、隣の店舗、店主、常連、町内の貼り紙のうち二つ以上を必ず入れること。コンビニ店内だけで閉じず、商店街軸を最初から見せること。
`:"",c=a?`- 後半章では、封筒・借金・返済・百円不足の話を新しい謎として蒸し返さないこと。間違ったシール、印刷ミス、棚札訂正、現金確認、段ボール取り違え、気まずい告知、小さな返金など、店内で見える実務コメディとして閉じること。
`:"",h=n?`- 最終章は、会話か人前の行動で笑える着地を作り、最後に小さな実務の残りを一つだけ置くこと。抽象的な団結・真実・希望・未来の要約だけで終えないこと。
`:"",m=i?"壮大な感情まとめや「どうなるのか」「幕を開ける」「まだ知らなかった」式の予告ではなく、未処理の小さな実務、会話のずれ、小道具の失敗、気まずい謝罪のいずれかで閉じること。":"壮大な感情まとめではなく、未処理の小さな実務、会話のずれ、小道具の失敗、気まずい謝罪のいずれかで閉じること。";return`
【v4.7.3 日常コメディ内部指示・本文出力禁止】
- この章は、整合性だけでなく、読者が具体的な店内コメディ場面を指させる面白さを持たせること。
- 冒頭五百字以内に、レジ、棚、値札、倉庫、段ボール、苦情票、レシート、手書きシフトメモ、客の列のいずれかを使った目に見える店内行動を置くこと。
${s}- 第${l}章の必須笑い要素: ${t.join(" / ")}。少なくとも三つを本文内で場面化すること。勘違い、気まずい謝罪、人前の赤面、短いやり取り、客や店主の割り込み、悪いタイミング、小道具ギャグを優先すること。
- 深刻な手がかりを出す場合も、三段落以内に店内の笑いか実務トラブルで受けること。真実・未来・核心・決定的・告白のような重い語だけで章を進めないこと。
- 章末は、${m}
${c}${h}${r?`- 再生成時は、失敗した重い要約や蒸し返しルートを完全に捨てること。別名で再利用せず、上記の笑い要素から組み直すこと。
`:""}- この内部指示や項目名を本文に出力しないこと。
`}function lt({chapterNum:e=1,beats:t=[],isRetry:a=!1}={}){return`
【日常コメディ章別台帳・本文出力禁止】
- 第${Number(e)||1}章は、次の店内ビートを使うこと: ${t.join(" / ")}。
- 冒頭は、レジ、棚、包装、段ボール、客の列、シフトメモ、レシート、納品書、現金確認、苦情票、包装ラベルのどれかの具体行動から始めること。
- 箱の封印、秘密メッセージ、密輸、秘密結社、教団、古地図、古い鍵、選ばれた人物、地下施設、歴史陰謀を選ばないこと。
- 原因は人間のミス、嘘、勘違い、悪いタイミング、小さな未払い、実務上の損失に限ること。解決は謝罪、証言、レシートやメモや納品書、棚や包装の訂正、返金、告白にすること。
${a?`- 再生成時は、失敗した秘密・箱・暗号・密輸ルートを捨て、店内実務ビートから書き直すこと。
`:""}- この台帳を本文に出力しないこと。
`}function ct({inheritsPreviousCost:e=!1}={}){return`
[LONG-NOVEL PROSE QUALITY CONTRACT - do not output this heading]
- Write complete dramatic scenes, not summaries or setting explanations.
- Each chapter must contain at least three concrete scenes. Every scene needs a character goal, obstacle, subtextual dialogue or silence, physical action, and an irreversible consequence.
- Entertainment engine: every chapter must force one vivid irreversible choice, one visible cost, and one expectation reversal that grows from earlier setup.
- Chapter-ending anti-pattern guard: never end on scenery-only afterglow (sunset, sky, wind, light, echo, or a neat emotional image). Rotate the ending pattern and break the expected mood with one concrete human friction: a messy spoken line, practical task, bodily discomfort, awkward silence, contradictory gesture, mundane noise, unpaid cost, or unfinished obligation.
- Escalation ladder: every scene must increase danger, desire, relationship strain, mystery, or moral cost; do not reset tension between scenes.
- Convert lore and exposition into conflict, objects, gestures, overheard lines, or decisions. Never explain a setting without making it pressure a character.
- Use visible paragraph breaks: add a newline after each prose paragraph, keep most paragraphs under 350 Japanese characters, and never return a chapter as a few giant text blocks.
- Add an opening hook, a middle turn in perception/relationship/power, and a chapter-end aftertaste or cost.
- Do not pad with recap, lessons, author notes, next-chapter announcements, bullet lists, or management-style prose.
- Use sensory prose: sound, smell, texture, body pressure, temperature, hesitation, and silence. Avoid abstract explanation-only paragraphs.
- Internally build a 3-5 scene ledger before drafting, but output only the novel text and the required context memo.
- Every 1200-1800 Japanese characters should contain a visible action, conflict, discovery, or choice. Do not coast on atmosphere alone.
- ${e?"Make this chapter inherit the previous chapter's cost, then create a new cost that changes the next chapter's options.":"Make the chapter's best scene alter the next chapter's available options."}`.trim()}function dt(){return`
FINAL CHAPTER STATE LOCK (never output this heading):
- Treat every event completed in the immediately previous chapter as already finished fact. Do not replay it, rewind it, call it a hallucination, add a second quota, or repeat the same countdown, attack, collapse, confession, contract, rescue, victory, or defeat.
- If the previous chapter already completed the central task, final chapter must begin after that result and write aftermath, consequences, final choice, emotional settlement, and remaining foreshadowing payoff only.
- The final chapter must not solve continuity by denying the previous chapter. Continue from it.`.trim()}function ut(){return`
MID-STORY CANON STATE LOCK (never output this heading):
- Treat saved chapters and context memos as the only canon; failed retry drafts and old outline beats are not canon.
- Before drafting, internally list the immediately previous chapter's final place/time, character injuries, lost or destroyed items, fired weapons, deaths/exits, handoffs, and unresolved crisis.
- Start after that state. Do not replay, rewind, undo, hallucinate, or re-stage completed trigger pulls, injuries, item destruction/loss, arrivals, escapes, awakenings, system shutdowns, or public collapses.
- If a hand, item, weapon, body part, device, or route was destroyed, lost, burned, broken, disabled, or spent in saved canon, it cannot function normally or reappear intact in this chapter.
- This is not the final chapter: keep the central system/core/conspiracy active or only partially damaged, and end on a new unresolved pressure rather than victory or aftermath.
- System/core actions in this chapter must be attempts, partial/local damage, decoys, lockouts, or new failsafes; never a successful total shutdown/destruction/collapse.`.trim()}function ht(){return["paper receipt","handwritten shift note","cash-count slip","stock discrepancy","paper delivery invoice","shelf label","shelf-label correction slip","customer complaint slip","physical package","cardboard box","product wrapper","packaging label","store-work misunderstanding","mistaken assumption","badly timed joke","embarrassing practical mistake","awkward apology","customer testimony","shopkeeper testimony","neighborhood gossip","town association note","face-to-face lie","awkward confession","staff refusal","practical loss","small refund","unpaid debt","betrayal"]}function pt(e=1){const t=[["手書き棚札の訂正ミス","紙レシート","客の証言"],["棚札価格違い","現金差異","近所の店主の一言"],["紙の納品書","包装/段ボール取り違え","商品棚の実物確認"],["苦情票","シフトメモ","店員の言い訳"],["レシート控え","棚札の貼り替え忘れ","常連客の記憶"],["現金確認票","包装ラベル","気まずい謝罪"],["紙の発注書","商品パッケージ","商店会掲示"],["客の証言","小さな返金","スタッフの告白"],["シフトメモ","紙レシート","店長の謝罪"],["最終レシート照合","対面の告白","小さな弁償"],["商店街の掲示","棚札/包装の後始末","明るい謝罪"]];return t[(Math.max(1,Number(e)||1)-1)%t.length]}function G(e){return/(?:\bPOS\b|ＰＯＳ|POSログ|posログ|売上データ|販売データ|レジデータ|レジログ|レジのログ|レジ記録|レジ履歴|会計履歴|端末データ|データ分析|分析結果|サーバー|システムログ|アプリ|画面記録|防犯カメラ|監視カメラ|スキャン履歴|商品マスタ|バーコードデータ|電子記録|デジタル証拠)/i.test(String(e||""))}function _(e){return/(?:レジ|会計|スキャン|レシート|棚札|現金|釣り銭|インク|カートリッジ|プリンター|スタンプ台|スタンプカード|商品を通す|値段を確認)/.test(String(e||""))}function mt(e,t){if(!Array.isArray(e))return e;const a=G(t),n=_(t);return e.map(r=>String(r||"").split(/\s+\/\s+/).filter(o=>!((/v4\.5\.9 POS data fallback/i.test(o)||/v4\.6\.1 story-means ledger/i.test(o)&&/kinds:digitalLab/i.test(o))&&n&&!a)).join(" / ")).filter(Boolean)}function L(e){return/(?:レジ|会計|棚札|値札|紙レシート|レシート|現金|返金|釣り銭|納品書|包装|段ボール|苦情票|シフトメモ|手書き|貼り紙|商品棚|商品|客|店長|店主|商店街|常連|謝罪|発注書|包装ラベル|商品パッケージ|店内|レジ列|コンビニ|証言|後始末)/.test(String(e||""))}function j(e){return/(?:宗教団体|教団|信者|教祖|カルト|洗脳|浄化|儀式|祭壇|聖域|供物|生贄|贄|祠|呪い|地下施設|隔離施設|cult|religion|brainwash|ritual|sacrifice|underground facility)/i.test(String(e||""))}function H(e){const t=String(e||"");return/(?:キャンペーン|販促|値引|割引|期間限定|限定商品|限定スイーツ|限定ジュース|幻の|伝説の|秘密在庫|秘密棚|謎の棚|秘密の取引|密輸|暗号|過去のイベント|去年の|店の歴史|メーカー都合|商品開発|USB|POSログ|データ分析|研究施設|実験施設|巨大な陰謀|秘密計画).{0,120}(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱)|(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱).{0,120}(?:キャンペーン|販促|値引|割引|期間限定|限定商品|限定スイーツ|限定ジュース|幻の|伝説の|秘密在庫|秘密棚|謎の棚|秘密の取引|密輸|暗号|過去のイベント|去年の|店の歴史|メーカー都合|商品開発|USB|POSログ|データ分析|研究施設|実験施設|巨大な陰謀|秘密計画)/.test(t)||j(t)}function ft(e,t,{isLocalComedy:a=!1}={}){if(!Array.isArray(e)||!e.length)return e;const n=L(t),r=j(t),o=H(t);return e.map(i=>String(i||"").split(/\s+\/\s+/).filter(l=>a?!(n&&!r&&/v4\.6\.1 story-means ledger:.*kinds:[^)]*cultFacility/.test(l)||n&&!o&&/v4\.9\.0 完成救済/.test(l)):!0).join(" / ")).filter(Boolean)}function q(e){const t=String(e||"");return/(?:USB|POSログ|POSデータ|売上データ|販売データ|レジデータ|端末データ|データ分析|分析結果|システムログ|サーバー|電子記録|スキャン履歴|商品マスタ|バーコードデータ|防犯カメラ|監視カメラ|映像解析|画像解析|アプリ|スマホ|スマートフォン|端末|システム|研究施設|実験施設|研究室|実験室|記憶装置|記憶操作|秘密計画|AI兵器|人工知能).{0,120}(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱)|(?:原因|真相|謎|証拠|解決|核心|手がかり|鍵|フック|価格差|現金差異|信用|疑い|疑惑|混乱).{0,120}(?:USB|POSログ|POSデータ|売上データ|販売データ|レジデータ|端末データ|データ分析|分析結果|システムログ|サーバー|電子記録|スキャン履歴|商品マスタ|バーコードデータ|防犯カメラ|監視カメラ|映像解析|画像解析|アプリ|スマホ|スマートフォン|端末|システム|研究施設|実験施設|研究室|実験室|記憶装置|記憶操作|秘密計画|AI兵器|人工知能)/i.test(t)}function gt(e,t,{isLocalComedy:a=!1}={}){if(!Array.isArray(e)||!e.length)return e;const n=L(t),r=q(t);return e.map(o=>String(o||"").split(/\s+\/\s+/).filter(i=>!(a&&n&&!r&&(/v4\.6\.1 story-means ledger:.*kinds:[^)]*digitalLab/.test(i)||/v4\.5\.9 POS data fallback/.test(i)))).join(" / ")).filter(Boolean)}const yt=`
【伏線・構成ルール（各章で厳守）】
1. 伏線の事前配置：後半で重要な要素は、必ず序盤〜前半の章に自然に言及・暗示しておくこと。後半で唐突に新設定を投入することを禁止。
2. シーンの駆動力（GMC+S）：各場面に「目的（Goal）」「動機（Motivation）」「障害（Conflict）」「賭け金（Stakes）」を明確に設定すること。
3. キャラクターの物語的機能：全登場人物に物語を動かす明確な役割を持たせること。傍観者禁止。
4. 結末の着地：最終章は主人公が具体的な意志・行動・決断を示す形で閉じること。葛藤→抵抗→それでも選ぶという段階を経ること。
5. 設定の必然性：特殊な要素は主人公の背景やテーマと必ず接続させること。
6. Show, Don't Tell：感情を直接語で説明せず、五感を通じた身体的反応として描写すること。
7. サブテキストの徹底：セリフに裏の感情を隠し、読者に真意を推測させること。
8. 別れと関係性の重み：重要な別離には感情的重みを描写すること。
9. 文体の緩急：高熱量文体（短文連続・体言止め）、静謐文体（長文・余白）、冷徹文体（客観描写）を場面に応じて使い分け、同系統3段落連続を禁止。
10. 感情落差の設計：各章に最低1回、置換・誇張・逆転・不条理・緊張と緩和のいずれかの落差技法を仕込むこと。
11. モチーフの回帰：象徴的要素を複数章で異なる文脈で再登場させ、最終章の感情的ピークと接続させること。
12. 描写密度の強制：クライマックスや重要対話には五感描写と内面描写を挟み、テンポを意図的に遅らせること。
13. 五感バランス：視覚偏重を禁止。聴覚・触覚・嗅覚・体内感覚を必ず組み合わせること。
14. 比喩素材の世界観準拠：使い古された定型比喩を避け、世界観に由来する素材で比喩を構築すること。
15. キャラクター知識境界の遵守：キャラが知り得ない情報を言及・推測させることを厳禁。
16. 反復描写の禁止と進行の優先：同じモチーフ（水、影、名など）の消失や溶解描写を毎章のように同じ比喩・表現で反復しないこと。章が進むごとに、謎が深まるだけでなく、状況や人間関係に後戻りできない明確な変化・進行（山場）を起こすこと。
17. 各章の明確な役割分担：章ごとのエピソードに固有の対立や発見を設け、前の章と似たような行動パターンを繰り返さないこと。中盤から後半にかけては、単なる雰囲気描写にとどまらず、プロット上の決定的な展開（破滅の予兆、対立の激化、新たな手がかりの発見など）を発生させること。
18. 管理情報の本文混入禁止：「全文結合出力」「再現用マスター指示書」「ここからコピー」「総文字数報告」「お疲れ様でした」など、アプリ管理用の文章を本文や章末に出力しないこと。最終章は本文末尾の「【完】」だけで終えること。
19. 非最終章の総決算禁止：最終章以外では、物語全体の勝利、全面解決、全契約成立、組織再建完了、黒幕完全敗北、主人公の最終的な自己肯定など、長編全体を終わらせる決着を描かないこと。非最終章は必ず次章へ続く未解決の対立・新たな代償・残る疑問を残すこと。
20. Scene density: every chapter must be built from at least three performed scenes, not compressed synopsis. A performed scene contains place, action, dialogue/silence, friction, and consequence.
21. Chapter turn: every chapter must include one visible turn that changes what a character wants, fears, knows, or can no longer undo.
22. Ending aftertaste: close each chapter on the cost of what just happened, not on an explanation, a lesson, or a next-chapter preview.
23. Scene ledger discipline: before writing, internally plan 3-5 scenes with place, goal, obstacle, choice, and cost. Do not output the ledger.
24. No synopsis pages: do not spend a chapter explaining premise, world state, or backstory. Exposition must be attached to objects, actions, conflict, dialogue, or sensory pressure.
25. Character agency: every chapter must contain at least one deliberate choice by a major character, and that choice must change evidence, debt, relation, body condition, available route, or public reputation.
26. Dialogue subtext: dialogue must carry fear, bargaining, evasion, desire, threat, affection, or class/power friction. Avoid polite Q&A and information delivery.
27. Consequence carry-forward: after each chapter, leave a concrete wound, promise, loss, rumor, item, evidence, debt, broken relationship, or irreversible public fact that the next chapter must inherit.
28. Final-paragraph discipline: end on a concrete image, cost, silence, object, physical reaction, or unresolved pressure. Do not end with a preview sentence, lesson, authorial summary, or rhetorical teaser.
29. No chapter-body replay: do not reuse long paragraphs, scene blocks, dialogue runs, metaphors, or the opening situation from an already completed chapter. Continuing a consequence is allowed; copying prose or replaying the same scene is forbidden.

【AIっぽさ完全排除】
1. 語彙：「最適化」「本質的」「効果的」等のビジネス用語、「羅針盤」「土台」等の陳腐な比喩は禁止。
2. リズム：同じ語尾の連続禁止。短文と長文でリズムに緩急をつけること。前置き宣言・要約・締めの挨拶は一切不要。
3. 事なかれ主義禁止：安全クッションや両論併記を排除し、堂々と言い切ること。
4. 記号：過度な箇条書き・見出し・アスタリスク・カッコの乱用を禁止。
5. 脚注・引用記号禁止：本文中に [1]、[2]、［3］、(注1)、参考文献、出典、脚注などの学術引用記号や注釈を出力しないこと。必要な情報は地の文に自然に統合すること。

【品質ゲート（各章出力前の自己検証 — 検証結果自体は出力に含めないこと）】
□ Setup-Payoff構造 □ 感情落差の十分性 □ モチーフの回帰 □ 文体の緩急
□ 全キャラの物語的機能 □ GMC+Sの明確性 □ 五感バランス □ 比喩の独自性 □ キャラ知識境界 □ 反復描写の防止 □ 章別エピソードの固有性 □ 非最終章の総決算禁止 □ 脚注・引用番号なし`;function $(e){return Math.max(0,Math.min(100,Math.round(Number.isFinite(e)?e:0)))}function R(e,t){const a=String(e||"").match(t);return a?a.length:0}function bt(e={}){const t=String(e.cleanText||""),a=Array.isArray(e.chapters)?e.chapters:[],n=Math.max(1,Number(e.totalChapters)||a.length||1),r=Math.min(1,(Number(e.currentChapter)||a.length||0)/n),o=R(t,/\u3010\u5b8c\u3011/g),i=R(t,/(?:^|\n)\s*#?\s*\u7b2c[\d\uff10-\uff19\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d\u5341]+\u7ae0/g),l=a.map(d=>String((d==null?void 0:d.body)||"").trim().length).filter(Boolean),s=l.length?l.reduce((d,p)=>d+p,0)/l.length:t.length/n,c=l.length?Math.min(...l):0,h=a.some(d=>String((d==null?void 0:d.contextMemo)||"").length>80),m=/\u6587\u8108\u7dad\u6301\u30e1\u30e2|\u56de\u53ce\u5f85\u3061\u4f0f\u7dda\u30e1\u30e2|\u4eba\u7269\u30ed\u30b9\u30bf\u30fc\u66f4\u65b0\u30e1\u30e2|\u30e2\u30c1\u30fc\u30d5\uff06\u30b5\u30d6\u30ad\u30e3\u30e9\u8ffd\u8de1\u30e1\u30e2|\u6b21\u7ae0\u306e\u30b7\u30fc\u30f3\u8a2d\u8a08|\u518d\u73fe\u7528\u30de\u30b9\u30bf\u30fc\u6307\u793a\u66f8|\u5168\u6587\u7d50\u5408\u51fa\u529b|```|\[REJECTION|Chapter prose looks|Regenerate/i.test(t);return{plotRecovery:$(80+r*8+(o===1?5:-8)+(h?3:0)),structure:$(78+r*8+(i>=n?4:0)+(s>=4500?4:0)+(c>=3e3?3:0)),constraint:$(86+r*5+(o===1?4:-8)+(m?-12:5))}}function b(e){return String(e||"").replace(/[ \t\r\n　「」『』“”"']/g,"").trim()}function x(e){const t=String(e||"").replace(/\r/g,"").trim();if(!t)return[];const a=t.split(/\n{2,}/).map(n=>n.trim()).filter(Boolean);return a.length>=4?a:(t.match(/[^。！？\n]+[。！？]?/g)||[]).map(n=>n.trim()).filter(n=>n.length>=20)}function vt(e){const t=String(e||"").replace(/\r/g,"").trim();if(t.length<1200)return{text:String(e||""),changed:!1,removedChars:0};let a=x(t);if(a.length<4)return{text:String(e||""),changed:!1,removedChars:0};const n=[];let r=0;const o=new Set;for(const s of a){const c=b(s);if(c.length>=160&&o.has(c)){r+=s.length;continue}c.length>=160&&o.add(c),n.push(s)}a=n;const i=[];for(let s=0;s<a.length;){let c=0,h="";const m=Math.min(14,Math.floor((a.length-s)/2));for(let d=m;d>=2;d-=1){const p=b(a.slice(s,s+d).join(""));if(p.length<520)continue;const w=b(a.slice(s+d,s+d*2).join(""));if(p&&p===w){c=d,h=p;break}}if(c)for(i.push(...a.slice(s,s+c)),s+=c;s+c<=a.length&&b(a.slice(s,s+c).join(""))===h;)r+=a.slice(s,s+c).join(`

`).length,s+=c;else i.push(a[s]),s+=1}const l=i.join(`

`).trim();return r>=420&&l.length>=1e3&&l.length<t.length?{text:l,changed:!0,removedChars:r}:{text:String(e||""),changed:!1,removedChars:0}}function wt(e,t){const a=String(e||"").trim(),n=String(t||"").trim();if(!a||!n)return n;if(n===a)return"";if(n.startsWith(a))return n.slice(a.length).trim();if(a.includes(n)&&n.length>=700)return"";const r=x(a),o=x(n);let i=0,l=0;for(;i<Math.min(r.length,o.length);i+=1){const s=b(r[i]),c=b(o[i]);if(!s||s!==c)break;l+=o[i].length}return i>=2&&l>=500?o.slice(i).join(`

`).trim():n}function P(e){const t=String(e||"").trim();if(!t)return"";const a=t.split(/(?=---\s*第[\d０-９一二三四五六七八九十]+章の文脈メモ\s*---)/).map(n=>n.trim()).filter(Boolean);return a.length?a[a.length-1]:t}function K(e,t){const a=P(e);if(!a)return"";const n=[new RegExp(`【第${t}章のシーン設計（GMC\\+S）】([\\s\\S]*?)(?=\\n【|\\n---|$)`),/【次章のシーン設計（GMC\+S）】([\s\S]*?)(?=\n【|\n---|$)/,/【次章のシーン設計】([\s\S]*?)(?=\n【|\n---|$)/];for(const r of n){const o=a.match(r);if(o!=null&&o[1])return o[1].trim()}return""}function kt(e,t,a=""){const n=P(t),r=K(t,e),o=n?n.slice(0,1800):"（直近の文脈メモなし）";return`
【第${e}章の連続性ガード・最優先】
以下は元のプロット概要より優先する。過去章の出来事を再演・巻き戻し・別角度で再説明してはならない。
・第${e}章は、直近章の最後で確定した状態の「後」から始める。
・直近章の最後の段落を起点にし、直近章の冒頭・移動・到着・発見・戦闘・目撃を第${e}章の冒頭でやり直さない。
・直近章で到達済みの場所、確認済みの現象、完了済みの送信・救出・逃走・崩壊は「既成事実」として扱い、次の障害・代償・選択へ進める。
・直近章または文脈メモで、発生済み／紛失済み／負傷済み／回収済み／退場済みになった出来事を、第${e}章で初めて起きる出来事として描かない。
・同じ道具、証拠、負傷、敵対、会話を使う場合は、「すでに起きた結果を受けた次の行動」として扱う。
・直近メモの「第${e}章のシーン設計」または「次章のシーン設計（GMC+S）」を第${e}章の開始条件として最優先する。
・過去章のイベントをもう一度見せたい場合でも、回想・要約・再演で水増ししない。現在進行の新しい対立、調査、発見、決断へ進める。
・第${e}章が最終章ではない場合、物語全体の勝利・全面契約・会社再建完了・黒幕完全敗北などの総決算を描かない。章末には必ず未解決の対立、新しい危機、次章への代償を残す。

【第${e}章で優先する最新GMC+S】
${r||"（直近メモに明示された次章GMC+Sがない場合は、直近章の結末直後から新しい展開を作る）"}

【直近文脈メモ抜粋】
${o}

NEAR-END STRUCTURE LOCK (never output this heading):
- Unless this is explicitly the final chapter, do not complete the whole-novel objective, final contract, final victory, total defeat of the antagonist, all foreshadowing payoff, or everyone's ending. Leave a concrete unresolved core for the final chapter.
- A chapter immediately before the final chapter must end at the maximum crisis or last irreversible choice, not at mission accomplished.

${a?`【前回失敗からの再生成指示】
${a}
`:""}`}const z={コメディ:"笑いは「予想された流れ（E）」と「実際の流れ（R）」のズレで作る。ズレ技法（置換・誇張・逆転・不条理・緊張と緩和・常識に戻る）を最低2つ組み合わせること。フリ→ボケ→溜め→オチの構成を意識し、オチに笑いのエネルギーを集中投下せよ。天丼（同じパターンを変奏→爆発）やノリツッコミも積極活用。セリフは短く鋭く、テンポ最優先。毎回同じパターンのオチを避け、爆発型・静寂型・社会的死型・自己完結型・逆転オチ型・天丼爆発型から選択せよ。トーンもハイテンション爆発系・シュール静寂系・知性派ブラック系を使い分けること。",シリアス:"重厚で緊張感のある筆致を維持すること。安易な救いや軽いユーモアで雰囲気を壊さず、感情の重みを丁寧に積み上げること。落差技法は「逆転」（信頼していた人物の裏切り、強者の無力化）と「緊張と緩和」（束の間の安堵→最大の衝撃）を軸に構成せよ。",恋愛:"恋愛感情の描写を物語の中心に据え、心の揺れ動き・ときめき・切なさを丁寧に描くこと。落差技法は「誇張」（胸の鼓動・時間の停止感を身体感覚で描く）と「逆転」（関係性の予想外の変化）を活用。モチーフの回帰（二人の間で繰り返される言葉や場所が、文脈が変わるたびに意味を深化させる）を意識的に仕込むこと。",ホラー:"恐怖を煽る描写を意識し、不安感・違和感を段階的に積み上げること。落差技法は「不条理」（説明のつかない現象が日常に侵食する）と「置換」（安全だと思っていたものが恐怖の源泉だった）を軸に。「常識の提示」（正気の人物だけが異常に気づいている構造）で恐怖を際立たせよ。モチーフの回帰をエスカレーション（同じ現象が回を追うごとに深刻化）として活用すること。",アクション:"動きのある場面を臨場感たっぷりに描くこと。落差技法は「誇張」（戦闘スケールの段階的増幅）と「逆転」（劣勢からの一発逆転、味方だと思っていた者の裏切り）を軸に。高熱量文体（短文連続・体言止め・畳みかけ）を戦闘シーンに、静謐文体を嵐の前の静けさに使い分け、テンポの緩急で読者の心拍数を操作すること。",ヒューマンドラマ:"人間関係の機微と感情の変化を丁寧に描くこと。落差技法は「逆転」（弱いと思っていた人物が最も強い決断をする）と「常識の提示」（集団心理の暴走の中で唯一の良心を置く）を活用。モチーフの回帰（日常の中の小さな行為や言葉が、物語の終盤で全く異なる重みを持つ）を丁寧に仕込み、結末の感動に接続させること。",サスペンス:"読者の緊張感を途切れさせないこと。落差技法は「置換」（安全な状況が実は罠）と「緊張と緩和」（一旦安堵させた直後に最大の危機）を軸に。情報の段階的開示とモチーフの回帰（序盤の何気ない手がかりが終盤で決定的な意味を持つ）で「振り返れば伏線だった」と気づかせる構成にすること。",爆笑:"声を出して笑えるレベルのギャグを仕込むこと。ズレ技法は「誇張」と「不条理」を最大出力で。ボケの密度を高く、テンポは超高速。天丼とかぶせで畳みかけろ。オチは爆発型か天丼爆発型を推奨。シリアスな内面描写は禁止。",ドタバタ:"物理的な混乱・騒動・すれ違いが連鎖的にエスカレートする構成にすること。ズレ技法は「誇張」（被害の連鎖的拡大）と「置換」（深刻な状況をバカバカしい文脈に）を軸に。登場人物は全力で行動しているのに状況はどんどん悪化する構造が理想。オチは爆発型か社会的死型を推奨。",ギャグ:"ストーリーの整合性よりも笑いを優先すること。ズレ技法の全6種を自由に使え。シーンごとにオチをつけ、全体としても大きなオチで締めること。キャラの言動は限界まで誇張してよい。セリフは短く鋭く、一言で致命傷を与えるセリフにせよ。",勘違い:"登場人物同士が互いの意図を完全に誤解した状態で会話・行動が進む構造にすること。ズレ技法の「置換」を核に：同じ言葉・状況が人物ごとに全く異なる意味で解釈されている構造。読者だけが全体像を把握しており、すれ違いの滑稽さを楽しめること。勘違いは最後まで解消しないか、解消された瞬間がオチになること。",パロディ:"有名な作品・ジャンル・展開のお約束を踏襲しつつ、ズレ技法の「置換」と「逆転」でお約束自体を笑いに転化すること。元ネタの「こうなるはず」という期待と実際の展開の落差を最大化せよ。元ネタがわかる人にはより面白く、わからなくても楽しめるバランスにすること。",ツッコミ不在:"全登場人物がボケ側に回り、誰も異常さを指摘しないこと。ズレ技法の「不条理」を全面展開し、読者だけが唯一のツッコミ役となる構造にすること。全員が異常な状況を当然のこととして受け入れ、真顔で狂気を語る。オチはシュール静寂系トーンで静寂型を推奨。",天然ボケ:"主要キャラの天然な言動が周囲を混乱させ、予想外の展開を引き起こす構造にすること。ズレ技法の「逆転」（善意が最大の被害を生む）を核に。天然キャラ自身は全く意図せず、純粋さから行動しているのがポイント。周囲の被害を天丼で段階的にエスカレートさせよ。",シュールギャグ:"現実の論理を真顔で逸脱させること。ズレ技法は「不条理」を最大出力で。登場人物は異常な状況を完全に受け入れ、読者だけが「おかしい」と気づく構造にすること。説明的なツッコミは禁止。ボケは3段階以上エスカレートさせ、最後は予想の斜め上で着地させること。シリアスな文体でナンセンスを語ることで笑いを生むこと。トーンはシュール静寂系を基調とし、オチは静寂型か自己完結型を推奨。感動的な展開・シリアス要素は一切禁止。",復讐:"復讐の動機と過程を丁寧に描き、復讐がもたらす虚しさや新たな苦悩も描写すること。単純な勧善懲悪にしないこと。",挫折:"夢や目標に向かっていた主人公が壁にぶつかる過程を描くこと。挫折の痛みをリアルに描写し、再起または受容に説得力を持たせること。",重い過去:"過去のトラウマや後悔が現在の行動に影響を与える構造にすること。過去の真相は段階的に明かし、一度に全てを説明しないこと。",葛藤:"二つ以上の相反する価値観や感情の間で揺れる主人公を描くこと。どちらの選択にも正当性があり、簡単には決められない構造にすること。",裏切り:"信頼していた人物の裏切りを描くこと。裏切りの伏線を事前に配置し、裏切る側にも動機と苦悩があることを示すこと。",贖罪:"過去の過ちに対する罪悪感と、それを償おうとする行動を描くこと。赦しが簡単に得られない難しさも描写すること。",決断:"重大な選択を迫られた主人公が、迷い・恐怖を経てなお決断する過程を丁寧に描くこと。決断の代償も明確に示すこと。",犠牲:"誰かのために何かを失う覚悟を描くこと。犠牲の重さと、それでも選ぶ理由の説得力を両立させること。",純愛:"恋愛感情の芽生えから成長を丁寧に描くこと。不純な動機や計算を排し、純粋な想いの美しさを表現すること。",三角関係:"3者それぞれの気持ちと立場を等分に描き、読者がどの人物にも感情移入できるようにすること。",失恋:"恋の終わりの痛みと喪失感をリアルに描くこと。失恋後の空虚さや、少しずつ前を向く過程を丁寧に描写すること。",再会:"過去に関わりのあった二人が再び出会う瞬間と、蘇る感情を描くこと。再会前と後で変わったものと変わらないものを対比させること。",ラブコメ:"恋愛要素にコミカルな展開を織り交ぜ、キュンとする場面と笑える場面のバランスを取ること。重くなりすぎず楽しく読める軽快さを維持。",切ない恋:"報われない想いや叶わないとわかっている恋の美しさと痛みを描くこと。読者の胸が締めつけられるような余韻を残すこと。",禁断の恋:"社会的・立場的に許されない関係の緊張感と罪悪感を描くこと。それでも惹かれ合う抗えない感情の描写に力を入れること。",運命の出会い:"出会いの運命性を演出しつつ、安易な「運命」で片付けず、惹かれ合う具体的な理由や瞬間を丁寧に描くこと。",怪談:"日本的な怪談の文体を意識し、語り口は淡々と、しかし背筋が凍る不気味さを漂わせること。結末は明確に説明せず余韻で恐怖を残すこと。",心霊現象:"現実世界に少しずつ異常が侵食してくる過程を段階的に描くこと。最初は気のせいかもしれないレベルから始め、確実な恐怖へエスカレートさせること。",都市伝説:"伝聞調の不気味さを活かし、実際に起きているのかただの噂なのか曖昧にすることで恐怖を増幅させること。",サイコホラー:"人間の狂気や異常心理を描くこと。超自然的な要素より人間そのものの恐ろしさを前面に出し、日常の隣にある狂気を描写すること。",ゴシックホラー:"退廃的で耽美な雰囲気を全体に漂わせること。古い洋館、没落貴族、呪いといったゴシック要素を活かし、美しさと恐怖が共存する世界を描くこと。",モダンホラー:"現代の日常舞台の中に恐怖を配置すること。スマホ、SNS、コンビニなど現代的な小道具と恐怖を組み合わせ、リアルな恐怖を演出すること。",因果応報:"過去の行いが恐ろしい形で本人に返ってくる構造にすること。因果が判明する瞬間のインパクトを最大化すること。",バトル:"戦闘シーンは動きの一つ一つを具体的に描写し、映像として想像できるようにすること。力と力のぶつかり合いの迫力を前面に出すこと。",冒険:"未知の場所への旅と発見のワクワク感を描くこと。新しい土地や人々との出会い、困難と克服のサイクルでテンポを作ること。",追跡劇:"追う側と追われる側の緊張感を交互に描くこと。距離感の変化と時間制限でスリルを演出すること。",脱出:"閉じ込められた状況からの脱出を描くこと。制約条件と手段を明確にし、知恵と勇気で突破する過程をスリリングに描くこと。",潜入:"敵地に密かに潜り込む緊張感を描くこと。バレるかもしれない瞬間のハラハラと、綱渡りの判断を丁寧に描写すること。",決闘:"一対一の対決に至るまでの因縁と覚悟を描き、決闘そのものは技と精神力のぶつかり合いとして緊迫感を出すこと。",サバイバル:"極限状態での生存を描くこと。資源の制限、環境の脅威、精神的な追い詰められ方をリアルに描写すること。",家族:"家族の絆、すれ違い、和解を描くこと。血のつながりだけでない家族の本質に迫り、日常の中の愛情を描写すること。",友情:"友情の試練と深まりを描くこと。困難な状況でこそ試される関係の強さと、友人だからこそ言える・言えないことを丁寧に描くこと。",成長:"主人公が経験を通じて内面的に変化する過程を描くこと。成長は一直線ではなく、後退や停滞も含めリアルに描写すること。",別れ:"大切な人との別離を描くこと。別れの痛みを逃げずに描写し、それでも前を向く決意を静かに示すこと。",和解:"対立していた人物同士が互いを理解し歩み寄る過程を描くこと。簡単に許すのではなく、時間と対話を経た真の和解を描くこと。",再生:"大きな喪失や挫折から再び立ち上がる過程を描くこと。再生は劇的な一瞬ではなく、日々の小さな積み重ねで描写すること。",絆:"人と人のつながりの強さと美しさを描くこと。試練を共に乗り越えることで深まる絆の重みを表現すること。",犯人探し:"読者に手がかりを公平に提示しつつ、ミスリードも巧みに配置すること。犯人特定に至るロジックを明確にすること。",陰謀:"大きな組織や権力による陰謀を描くこと。主人公が真相に近づくにつれ危険が増す構造にし、誰を信じてよいかわからない不安感を醸成すること。",心理戦:"登場人物同士の駆け引きを描くこと。表面上の会話と内面の計算のギャップで緊張感を出し、「この人は何を考えている？」と思わせること。",スパイ:"二重生活の緊張感と、正体がバレる危険を描くこと。忠誠心の揺らぎや嘘をつき続けることの精神的代償も描写すること。",二転三転:"読者の予想を何度も覆す展開にすること。ただし後出しジャンケンではなく、振り返れば伏線があったと気づける構成にすること。",タイムリミット:"明確な時間制限を設定し、締め切りが迫る焦燥感を文体にも反映すること。時間が減るにつれ文を短く、テンポを加速させること。"},W={ハッピーエンド:"物語を前向きな結末に導くこと。安易な大団円は避け、困難を乗り越えたからこその喜びを感じさせる結末にすること。",バッドエンド:"救いのない結末に導くこと。バッドエンドに必然性を持たせ、「こうなるしかなかった」と読者が納得できる構成にすること。",ビターエンド:"完全な幸福でも不幸でもない、ほろ苦い結末にすること。得たものと失ったものの対比を明確にし、人生の複雑さを感じさせること。",サプライズ:"読者の予想を大きく裏切る結末にすること。唐突ではなく、振り返れば伏線があったと気づける仕掛けを必ず入れること。",オープンエンド:"結末を明確にせず、読者の想像に委ねる余韻を残すこと。投げっぱなしではなく、考えさせる余白を意図的に設計すること。",大団円:"全ての問題が解決し主要キャラ全員が幸せになる結末にすること。ご都合主義に見えないよう解決までの過程に説得力を持たせること。",救いがある:"苦難の末に一筋の希望が見える結末にすること。完全な解決でなくとも「もう大丈夫だ」と感じられる要素を入れること。",夢が叶う:"主人公の目標が達成される結末にすること。達成の瞬間だけでなく、そこに至るまでの努力が報われる喜びを描くこと。",大逆転勝利:"絶体絶命の状況から一発逆転で勝利する結末にすること。逆転の手段は事前に伏線として配置し唐突にならないようにすること。",愛の成就:"恋愛が成就する結末にすること。二人が結ばれるまでの障害と、それを乗り越えた先の喜びを描くこと。",切ない:"読者の胸を締めつけるような切ない結末にすること。幸せだった記憶と現在の喪失感の対比を効果的に使うこと。",救いがない:"主人公にも読者にも救いのない結末にすること。希望が完全に断たれる瞬間を冷徹に描写し、余韻で重しを残すこと。",後味悪い:"読後に不快感や居心地の悪さが残る結末にすること。モラルや正義が報われない不条理を描くこと。",破滅:"主人公やその世界が崩壊する結末にすること。破滅に至る過程を必然的に描き、転落の悲劇を描写すること。",取り返しのつかない選択:"主人公のある選択が取り返しのつかない結果をもたらす結末にすること。選択の瞬間の描写と、その後の後悔を描くこと。",ほろ苦い:"喜びと悲しみが同居する結末にすること。得たものの喜びと失ったものへの思いを静かに描写すること。",代償を伴う勝利:"目標は達成したが大切な何かを犠牲にした結末にすること。勝利の喜びと代償の痛みの両方を描写すること。",成長と引き換えの喪失:"主人公が成長した代わりに以前の自分や大切なものを失う結末にすること。成長と喪失の因果関係を明確にすること。",痛みを伴う真実:"知りたくなかった真実が明かされる結末にすること。真実を知る前と知った後で世界の見え方が完全に変わることを描くこと。",どんでん返し:"物語終盤でそれまでの認識が完全に覆る展開にすること。読者が「騙された！」と思うが、読み返すと整合性がある構成にすること。伏線は最低3つ配置し、真相判明時に点と点がつながる快感を与えること。",叙述トリック:"語り手や視点の操作により読者の認識を巧みに誤誘導すること。嘘はついていないが意図的に情報を伏せることで成立するトリックにすること。",真犯人の正体:"意外な人物が真犯人だったと判明する結末にすること。犯人判明時にそれまでの言動が全て裏の意味を持っていたと気づける構成にすること。",伏線回収の衝撃:"序盤から散りばめた伏線が結末で一気に回収され全てがつながる快感を読者に与えること。伏線は日常的な描写に自然に溶け込ませること。",読者に委ねる:"物語の結末を明確に描かず読者の解釈に委ねること。解釈の手がかりは十分に提供し、考えがいのある余白を残すこと。",余韻を残す:"物語の最後を余韻のある情景や一文で締めくくること。全てを語り切らず、読後に静かに広がる感慨を大切にすること。",続編を匂わせる:"物語本体は完結させつつも、新たな冒険や展開の予感を最後に少しだけ示すこと。",解釈が分かれる:"複数の解釈が可能な結末にすること。どの解釈も作中の証拠で裏付けられるよう意図的に多義的な描写にすること。",夢オチ:"物語の全てまたは一部が夢だったと判明する結末にすること。単純な夢オチではなく、夢と現実の境目を曖昧にしたり夢オチ自体に深い意味を持たせること。",ループ:"物語の結末が冒頭に戻る循環構造の結末にすること。ループの発見で物語全体の見え方が変わる仕掛けにすること。",メタ的オチ:"物語がフィクション性を認識するような結末にすること。キャラクターが物語の中にいることに気づくなど第四の壁を意識した構成にすること。",シュールな結末:"論理的な結末を放棄し、予想の斜め上を行く不条理な結末にすること。意味を求めず、読者を「えっ？」と困惑させることで独特の余韻を残すこと。",第四の壁破壊:"物語の最後で登場人物が読者に直接語りかける、または物語の外側の存在を認識する結末にすること。"},J={現代日本:"現代日本のリアルな風俗・文化・言葉遣いで描写すること。日常の空気感を大切にすること。",現代海外:"海外を舞台にし、その土地の文化・雰囲気・価値観を反映した描写にすること。",ハイファンタジー:"独自の世界設定（魔法・種族・歴史）を持つ異世界を舞台にすること。世界の法則を一貫させ没入できる異世界を構築すること。",ローファンタジー:"現実世界をベースに非現実的要素（魔法・超能力など）が存在する設定にすること。「もし現実にこれがあったら」というリアリティを維持すること。",サイバーパンク:"ハイテクとローライフの対比を描くこと。テクノロジーの発達と格差・退廃を表現すること。ネオンと暗闇のコントラストを文体でも表現すること。","和風・アジア":"東洋的な美意識や価値観を反映した世界観にすること。自然との調和、礼節、精神性などの要素を意識すること。",ポストアポカリプス:"文明が崩壊した後の世界を描くこと。荒廃した風景と、それでも生きようとする人々の逞しさを描写すること。",東京:"東京の多面性（繁華街の喧騒、住宅地の静けさ、ビル群の圧迫感）を活かした描写にすること。",地方都市:"地方都市特有の閉塞感や人間関係の密さ、地域の風土を活かした描写にすること。",田舎の村:"過疎化や自然の豊かさ、人間関係の濃密さなど田舎特有の空気感を描写すること。",学校:"学校という閉じた空間のルールや人間関係、青春の光と影を描くこと。",オフィス:"職場の人間関係、組織のルール、仕事に追われる日常を描くこと。デスク周りや会議室など具体的な場所の描写を入れること。",商店街:"下町の人情味、個人商店の活気や衰退、顔なじみの関係を活かした描写にすること。",団地:"団地特有の閉鎖的コミュニティ、均一な外観の中の個性、世代間のギャップを描くこと。",離島:"離島特有の孤立感、海に囲まれた環境、限られたコミュニティの描写を活かすこと。",ニューヨーク:"多民族都市の活気と混沌、摩天楼と路地裏の対比、アメリカンドリームの光と影を描くこと。",ロンドン:"歴史と現代が共存する街並み、英国的な気品と皮肉、霧と雨の雰囲気を活かすこと。",パリ:"芸術と文化の薫り、石畳の街並み、カフェ文化、フランス的な洒脱さを描くこと。",上海:"急速な発展と伝統の混在、外灘の夜景、路地裏の庶民生活を描くこと。",ドバイ:"砂漠の中の超近代都市、富と格差、伝統とモダンの対比を描くこと。",シドニー:"開放的な海辺の都市、多文化社会、自然と都市の近さを描くこと。",ラテンアメリカ:"情熱的な文化、鮮やかな色彩、貧富の格差、マジックリアリズム的な空気感を描くこと。",中世ヨーロッパ風:"王国、騎士、城砦など中世ヨーロッパ的な世界を構築すること。身分制度や封建社会の要素を意識すること。",王道:"勇者と魔王、冒険と成長、仲間との絆など王道ファンタジーの定番要素を押さえつつ独自の味付けを加えること。",エルフの森:"自然と共生するエルフの文化、古代の叡智、人間との関係を描くこと。",ドワーフの鉱山:"地下世界の雄大さ、鍛冶と採掘の文化、頑固だが義理堅い気質を描くこと。",魔法帝国:"魔法が政治・経済・軍事の中心にある巨大帝国を描くこと。魔法体系とそれが社会に与える影響を具体的に設定すること。",竜の巣:"竜という圧倒的存在の棲む場所の威圧感と神秘性を描くこと。",空中都市:"空に浮かぶ都市の幻想的な舞台を活かし、高低差や飛行手段、地上との関係を描くこと。","現代＋魔法":"現代社会に魔法が溶け込んだ世界を描くこと。魔法を隠す社会か公知の社会かを明確にし、現代技術との関係を描写すること。",裏社会の魔術師:"表の社会の裏で暗躍する魔術師たちの世界を描くこと。秘密結社、闇取引、禁忌の魔術などアンダーグラウンドな雰囲気を出すこと。",能力バトル:"異能力を持つキャラクター同士の知略を凝らした戦いを描くこと。能力のルールを明確にし、その範囲内での駆け引きを描写すること。",異能の学園:"特殊な能力を持つ生徒が集まる学園を舞台にすること。学園生活と能力バトルを両立させること。",ネオン街:"ネオンの光が照らす猥雑な街並み、雨に濡れた路地、電子看板などサイバーパンク的な視覚描写を豊かにすること。",スラム:"テクノロジーの恩恵から取り残された底辺社会を描くこと。生き残るための知恵と人間のたくましさを描写すること。",電脳世界:"仮想空間・サイバースペースの独自のルールや視覚表現を描くこと。物理法則に縛られない自由な描写が可能。",巨大企業支配:"一握りの巨大企業が社会を支配するディストピアを描くこと。企業の論理と個人の自由の対立を描写すること。",アンドロイド社会:"人間とアンドロイドが共存する社会を描くこと。「人間とは何か」というテーマを底流に持たせること。",京都:"千年の都の歴史の重み、寺社仏閣、町家の風景、はんなりとした文化を描くこと。",城下町:"城を中心とした町の構造、武士と町人の関係、宿場町の活気を描くこと。",神社仏閣:"神聖な空間としての寺社の雰囲気、祈り、伝統行事を活かした描写にすること。",武士の世界:"武士道の精神、主従関係、刀と誇りを中心とした世界観を描くこと。",中華風宮廷:"豪華な宮廷、後宮の政治劇、儒教的価値観を反映した世界を描くこと。",妖怪の里:"日本の妖怪伝承を活かした不思議な集落を描くこと。人間と妖怪の共存や境界の曖昧さを表現すること。",荒廃都市:"朽ちたビル群、割れた窓、錆びた車、植物に侵食された文明の残骸の中での物語を描くこと。",砂漠世界:"果てしない砂漠、オアシスの希少さ、過酷な気候の中での生存を描くこと。",水没都市:"水に沈んだ都市（水面から突き出すビル、水中の街路）を活かした描写にすること。",核の冬:"核戦争後の暗く冷たい世界、放射能の脅威、残された人々の苦闘を描くこと。",文明崩壊後:"文明の記憶を持つ世代と持たない世代の対比、失われた技術、新しい秩序の模索を描くこと。"},Y={全年齢:"全年齢が楽しめるよう暴力的・性的な描写は避けること。分かりやすい言葉遣いで物語の面白さで勝負すること。",若者向け:"テンポの速い展開と共感しやすいキャラクターで引き込むこと。現代の若者文化や価値観に寄り添った表現にすること。",大人向け:"人生経験を持つ読者に響く深み・複雑さを持たせること。安易な結論を避け考えさせる余地を残すこと。",特定層向け:"ターゲット読者の趣味嗜好・価値観に合わせた表現・展開にすること。",用途別:"指定された用途に最適な長さ・構成・文体に調整すること。",子供向け:"小学生が理解できる語彙と文体で書くこと。難しい漢字には読み仮名を振ること。善悪が明確で前向きなメッセージを含むこと。",ファミリー:"子供から大人まで家族で楽しめるストーリーにすること。子供も楽しめつつ大人が読んでも味わい深い二重構造にすること。",誰でも楽しめる:"専門知識や前提情報がなくても楽しめる普遍的なテーマと分かりやすい構成にすること。",教育的:"楽しみながら学びが得られる内容にすること。教訓を押し付けず物語を通じて自然に気づきを促すこと。",中高生向け:"十代が共感できるテーマ（友情、将来への不安、自分探し等）を扱うこと。文体はラノベよりやや文学寄りで読みやすさを維持すること。",大学生向け:"社会への入口に立つ世代の不安や希望を描くこと。知的な刺激を含みつつ堅苦しくならないバランスにすること。",ライトノベル風:"キャラの個性を際立たせテンポの良い会話劇を中心に展開すること。お約束やテンプレを活用しつつ独自の味付けを加えること。！、？、…の多用も許容し軽快な読み味にすること。",SNS世代向け:"短い文で区切りテンポを最優先にすること。スマホで読みやすいよう段落を短く、インパクトのあるフレーズで引き込むこと。",Z世代向け:"Z世代の価値観（多様性、環境意識、デジタルネイティブ）を反映した設定やテーマにすること。説教臭くならないこと。",仕事帰りに読む:"疲れた頭でも楽しめるテンポと、しかし読後に余韻が残る質の高さを両立させること。",深夜番組風:"やや攻めた内容やブラックユーモアを含み、深夜帯特有のゆるさとシュールさを持たせること。",文学的:"文学的な深みと表現の美しさを追求すること。言葉選びに妥協せず一文一文に味わいを持たせること。",ビジネスマン向け:"仕事や組織、リーダーシップに関連するテーマを扱い、ビジネスパーソンの共感を得られる描写にすること。",知的好奇心旺盛な人向け:"哲学的・科学的・歴史的な知見を物語に織り込み、読者の知的好奇心を刺激すること。",男性向け:"男性読者が共感しやすい主人公像やテーマを意識しつつ、ステレオタイプに陥らないこと。",女性向け:"女性読者が共感しやすい感情描写やテーマを意識しつつ、ステレオタイプに陥らないこと。",ファン向け:"特定ジャンルのファンが喜ぶお約束や専門的な描写を入れつつ、ファンサービスと物語の質を両立させること。",オタク文化に親しい人向け:"アニメ・漫画・ゲーム等の文化に親しい読者を意識し、そうした文化の文法やお約束を活用すること。",シニア向け:"人生の後半を生きる世代に響くテーマ（回想、遺すもの、人生の意味）を扱い、落ち着いた文体にすること。",読み聞かせ用:"声に出して読みやすいリズムと語感を重視すること。繰り返しのフレーズや擬音語を効果的に使い聞いて心地よい文体にすること。",プレゼン用:"聴衆の心を掴むストーリーテリングを意識し、導入の引きと明確なメッセージを持たせること。",朗読用:"朗読映えする文体にすること。適度な間と声に出した時に美しく響く表現を意識すること。",BGM付き朗読向け:"音楽に乗せて朗読することを想定し、文章のリズムと感情の起伏をBGMと同期しやすい構成にすること。"},X={一人称:"主人公の視点と声で語ること。主人公が知り得ない情報は描写できない制約を守ること。",三人称:"第三者の視点で語ること。必要に応じて複数キャラの内面に入れるが、視点の切り替えは明確にすること。",特殊:"通常と異なる特殊な語り口を採用し、その形式の制約とルールを一貫して守ること。","「僕」の視点":"「僕」という一人称で語ること。やや内省的で繊細な語り手の印象を与える文体にすること。","「私」の独白":"「私」という一人称で、内面の思考を率直に綴る独白体にすること。読者に直接心情を打ち明けるような親密さを持たせること。","「俺」のハードボイルド":"「俺」という一人称でハードボイルドに語ること。感情を抑えた乾いた文体、短い文の連続、比喩は最小限にすること。",信頼できない語り手:"語り手の証言が事実と異なる可能性を示唆する構成にすること。読者に「この語り手は本当のことを言っているのか？」と疑わせること。",回想録形式:"語り手が過去を振り返る形式で語ること。現在の語り手がかつての自分を客観的に見つめる二重の視点を活かすこと。",神の視点:"全てを見通す全知の語り手として、全キャラの内面や同時多発的な出来事を自在に描くこと。",俯瞰的:"感情を込めず客観的に淡々と描写する語り口にすること。カメラのように場面を切り取り、読者に解釈を委ねること。",特定キャラに寄り添う:"三人称だが特定キャラクターの視点に密着し、そのキャラの知覚・感情を中心に描写すること。","群像劇（視点切替）":"複数キャラクターの視点を章やシーンごとに切り替えて描くこと。各視点から見える世界の違いを活かすこと。","二人称（あなた）":"「あなた」という呼びかけで読者自身を物語に引き込む形式にすること。没入感と緊張感を高めること。","手紙・書簡形式":"手紙のやり取りで物語を進行させること。日付、宛名、結びの定型文を含め、書き手の人柄が滲み出る文体にすること。",インタビュー形式:"質問と回答の形式で物語を構成すること。インタビュアーの質問と回答者の証言の間から真実が浮かび上がる構成にすること。",日記体:"日記として書かれた形式で物語を進行させること。日付を区切りにし日々の出来事と内省を交互に描くこと。",モノローグ劇:"一人の語り手が独白のみで物語を語ること。語り手の声だけで場面、人物、感情の全てを伝えること。",実況中継風:"スポーツ中継のように出来事をリアルタイムで実況するテンションと臨場感で語ること。"};function v(e,t){return!e||e==="ランダム"?"":t[e]||""}const V=/(?:AI|SNS|電子|電脳|ガジェット|スマホ|アプリ|ロボット|量子|仮想|VR|サイバー|ディストピア|アンドロイド|クローン|宇宙ステーション|火星|月面|巨大企業|監視システム|ネットワーク)/i,Q=/(?:SF|近未来|サイバー|未来|電脳|AI|量子|宇宙|ロボット|クローン)/i;function Z(e){return e&&e.length?e[Math.floor(Math.random()*e.length)]:null}function ee(e){return V.test(String(e||""))}function te(e){return Q.test(String(e||""))}function ae(e,t=!1){const a=(e||[]).filter(n=>t||!ee(n));return a.length?a:e||[]}function St(e,t=null,a=!1,n=Z){if(!e)return null;let r=t&&e[t]?t:null;if(!r){const l=Object.keys(e||{});r=n(l.length?l:[])}if(!r)return null;const o=e[r]||[],i=ae(o,a||te(r));return[r,n(i)]}function ne(e){if(typeof e=="number"&&Number.isFinite(e))return Math.max(0,Math.round(e));const t=String(e||"").replace(/[０-９]/g,r=>String.fromCharCode(r.charCodeAt(0)-65248)).replace(/[,，]/g,"");if(!t)return 0;const a=t.match(/(\d+(?:\.\d+)?)\s*万/);if(a)return Math.round(parseFloat(a[1])*1e4);const n=t.match(/(\d{4,})/);return n?parseInt(n[1],10):0}function Ct(e){const t=(u,f)=>{const g=String(u||"").trim();return!g||["ランダム","未設定","おまかせ","AIおまかせ"].includes(g)?f:g},a=t(e.genreCustom||e.genre,"コメディ"),n=t(e.themeCustom||e.theme,"選択"),r=t(e.worldviewCustom||e.worldview,"現代日本"),o=t(e.eraCustom||e.era,"現代"),i=t(e.targetCustom||e.target,"全年齢"),l=t(e.endingCustom||e.ending,"意外な結末"),s=t(e.narrCustom||e.narration,"三人称・客観"),c=Array.isArray(e.characters)&&e.characters.length>0;let h;c?h=`【必須登場人物（ユーザー指定・作中登場ノルマ）】
${e.characters.map((u,f)=>{const g=u.name||`(AI命名:キャラ${f+1})`,I=u.role||"未定",N=u.sex?`性別:${u.sex}, `:"",M=u.personality||"未定",O=u.note?` [${u.note}]`:"";return`${f+1}. ${g} (${I}) — ${N}性格:${M}${O}`}).join(`
`)}

【AI追加人物の扱い】
・上記の人物数は上限ではない。指定人物は必ず登場させるノルマとして扱うこと。
・長編の文章量、章数、テーマ、世界観に対して人物が不足する場合、長編シナリオエージェントとして追加人物を設計してよい。
・追加人物は、必須登場人物の見せ場を奪うためではなく、葛藤・伏線・関係性・世界観の奥行きを増やすために配置すること。`:h=`【AI設計キャスト】
・ユーザー指定の必須人物は未設定。
・短編向けの2〜3人に固定せず、長編の規模・章数・テーマに見合う人数をAIが設計すること。
・主人公、対立軸を担う人物、関係性を揺らす人物、舞台や事件を動かす脇役を必要に応じて追加してよい。
・ただし人数を増やすだけの水増しは禁止。追加人物には必ず物語上の役割、欲望、弱点、主人公との関係、初登場予定章を持たせること。`;const m=`【長編人物ロスター運用ルール】
・必須登場人物は、全体プロット上の役割と登場予定章を必ず内部設計すること。
・AIが追加した人物は「AI追加人物」として扱い、名前、役割、性格/欲望、主人公や必須人物との関係、初登場章、現在地/状態を管理すること。
・各章の文脈維持メモには、追加・変化した人物情報を【人物ロスター更新メモ】として必ず記録すること。
・一度出したAI追加人物を後半で忘れないこと。退場・死亡・離脱・和解などの状態変化があれば、文脈維持メモに明記すること。`,d=e.supplement?`
【追加指示】
${e.supplement}`:"",p=["現代","ランダム",""].includes(o)?"":`

【時代考証ルール（厳守）】
・時代設定「`+o+`」の語彙・風俗・技術水準を厳守すること。
・その時代に存在しない概念・道具・言い回しを使わないこと。
・登場人物の詳細メモに時代不適合な現代表現があっても、時代に即した表現に自動で読み替えること。`,w=v(a,z),A=v(l,W),D=v(r,J),E=v(i,Y),T=v(s,X);let y="";w&&(y+=`

【ジャンル文体指定：${a}】
${w}`),A&&(y+=`

【結末演出指定：${l}】
${A}`),D&&(y+=`

【世界観演出指定：${r}】
${D}`),E&&(y+=`

【ターゲット層文体指定：${i}】
${E}`),T&&(y+=`

【語り口指定：${s}】
${T}`);const k=ne(e.charCount);let C;if(k>0){const u=Math.min(Math.max(Math.round(k/8e3),6),12),f=Math.round(k/u),g=Math.max(4500,Math.min(9e3,Math.round(f*.6)));C=`全${u}章構成（目安）、各章約${Math.round(f/1e3)}千字、各章本文は最低${g.toLocaleString()}字、予定総文字数：約${Math.round(k/1e4)}万字`}else C="10万字以上を目安に、物語の内容に最適な章数と文字数をAI自身が自由に設計してください（推奨: 8〜12章、各章8千〜1万5千字、各章本文は最低6千字）";return{genre:a,theme:n,worldview:r,era:o,target:i,ending:l,narr:s,charDesc:h,characterRosterRule:m,supplement:d,eraRule:p,allCategoryGuides:y,chapterGuidance:C}}export{be as $,kt as A,Me as B,Oe as C,Pe as D,Ae as E,De as F,Ee as G,Y as H,Te as I,X as J,z as K,Ie as L,Re as M,Le as N,Fe as O,Ue as P,le as Q,ce as R,de as S,ue as T,W as U,he as V,pe as W,me as X,fe as Y,ge as Z,ye as _,ee as a,ve as a0,ke as a1,Se as a2,$e as a3,xe as a4,lt as a5,Be as a6,Ge as a7,_e as a8,mt as a9,He as aa,qe as ab,Ke as ac,pt as ad,ze as ae,We as af,Je as ag,Ye as ah,Xe as ai,Ve as aj,Qe as ak,Ze as al,et as am,tt as an,at as ao,nt as ap,rt as aq,ot as ar,ft as as,gt as at,st as au,St as b,Z as c,U as d,se as e,ae as f,ie as g,oe as h,te as i,dt as j,ut as k,ct as l,bt as m,re as n,we as o,v as p,J as q,Ct as r,Ce as s,it as t,ht as u,wt as v,vt as w,je as x,Ne as y,yt as z};
