function shouldBuildAnalogContract(settings, mode, isAnalogTarget) {
  if (typeof isAnalogTarget !== 'function') return false;
  try {
    return !!isAnalogTarget(settings, mode);
  } catch {
    return false;
  }
}

function buildGlobalAnalogMysteryContract({
  settings = {},
  mode = 'standard',
  isAnalogTarget,
} = {}) {
  if (!shouldBuildAnalogContract(settings, mode, isAnalogTarget)) return '';
  return `

[v4.5.0 GLOBAL ANALOG MYSTERY CONTRACT: internal only]
- A beginning-of-prompt ban is not enough. Before every outline, chapter, continuation, and repair, assign the mystery's carrier to human/physical evidence first.
- Allowed carriers: handwritten letters, old photographs, film negatives, paper ledgers, receipts, signed/sealed documents, physical keys, locked drawers, scars, witness testimony, face-to-face betrayal, refusal, awkward confession, unpaid debt, police record, practical loss, and bodily cost.
- Forbid unselected digital/lab carriers as story engines even when they seem convenient: USB, device data, PC/email/smartphone clues, online search, servers, systems, apps, videos/recordings, analysis screens, code/project names, hidden networks, research/experiment rooms, capsules, memory devices, and memory manipulation.
- Preserve entertainment by using reversals in who lied, who paid, who refused, who kept the object, and what a physical record proves.
- Do not output this contract.
`;
}

function buildAnalogCarrierLedgerContract({
  chapterNum = 1,
  carrier = '',
  functionalRule = '',
  isRepair = false,
  isLateChapter = false,
} = {}) {
  return `

[v4.5.0 ANALOG CARRIER LEDGER: internal chapter law]
- This is stronger than a simple ban. For chapter ${chapterNum}, the proof/key/twist carrier is assigned before drafting: ${carrier}.
- Functional rule: ${functionalRule}. The chapter may create suspense, but the decisive movement must come from a person, paper evidence, a physical object, a direct conversation, betrayal, refusal, confession, debt, scar, signature, receipt, or cost.
- "Lost memory" means human/social absence: what the protagonist cannot recall, what others hide, what a photo/note/testimony contradicts. It must not become memory extraction, memory manipulation, brainwave data, a memory device, a capsule, a lab, an app, a server, a USB, device data, or an analysis screen.
- Do not mention or imply research facilities, experiment rooms, underground labs, capsules, memory devices, hidden networks, project code names, servers, terminals, PC screens, smartphones, online search, data files, recordings, videos, downloads, uploads, or system shutdowns as proof, key, villain engine, hidden answer, or solution.
- The first 1000 visible characters must show the assigned analog carrier being handled, handed over, refused, damaged, hidden, signed, paid for, or argued over. Do not begin with investigation-by-device.
- If the rejected idea needed a device/lab to reveal truth, replace that exact function with this chapter's assigned carrier before writing the first sentence.
${isRepair ? '- This is a repair/regeneration. The previous rejected digital/lab route is not canon; do not preserve its mechanism in smaller wording.' : ''}
${isLateChapter ? '- Late chapters may close forcefully only through human choice, physical evidence, confession, betrayal, refusal, cost, or irreversible loss. Do not close through system shutdown, lab reveal, device activation, or data release.' : ''}
- Do not output this ledger, labels, checklist, or planning notes.
`;
}

function buildFalseRoutePurgeContract({
  carrier = '',
  functionalRule = '',
  isLateChapter = false,
  isFinalChapter = false,
} = {}) {
  return `

[v4.5.1 FALSE-ROUTE PURGE: internal retry law]
- The previous rejected draft is not a draft to repair. It is a false route. Delete its USB/data/device/lab/capsule/memory-device premise before planning.
- Do not mention USB, data, servers, apps, analysis screens, smartphones, PCs, research rooms, experiment rooms, capsules, memory devices, memory extraction, or memory manipulation at all in this chapter, not even as a theory, discarded hypothesis, metaphor, past clue, or background convenience, unless those axes were explicitly selected by the user.
- Rebuild the chapter from the latest saved canon and this assigned carrier: ${carrier}. Functional rule: ${functionalRule}.
- The first 500 characters must show a human/physical action: handing over, hiding, refusing, signing, damaging, paying for, losing, lying about, or physically examining paper/film/key/scar/receipt/testimony.
- If a failed digital/lab route was needed to reveal information, convert that function into what a person physically kept, witnessed, signed, paid for, damaged, hid, refused to say, or lied about.
- For "lost memory", write absence, contradiction, testimony, objects, and relationship damage. Never write memory technology.
${isLateChapter ? '- Mid/late chapters are especially forbidden from solving by shutdown, data release, lab reveal, device activation, or research-room explanation. Escalate through betrayal, confession, refusal, cost, or irreversible human choice.' : ''}
${isFinalChapter ? '- Final force-close is allowed only through a concrete scene of confession, betrayal, refusal, cost, or physical proof.' : ''}
- Output only prose plus the required context memo. Do not output this purge law.
`;
}

function buildResearchExperimentTemplateBan() {
  return `

[v4.5.2 RESEARCH/EXPERIMENT TEMPLATE BAN: internal only]
- The story must not swap USB/data/device drift into a research/experiment drift. Forbidden as the mystery core: experiment success/failure, test subjects, clinical trials, research plans, "the world will change", chemical/smell proof of an experiment, project slogans, and human memory/body experiments.
- If the draft wants "experiment", replace its function with human-scale harm: forged consent, unpaid debt, insurance fraud, workplace accident cover-up, arson evidence, a diagnosis note, a victim report, a signed/sealed document, a receipt trail, witness silence, betrayal, refusal, or bodily cost.
- A paper labeled "data" is still off-axis if it functions as research data. Rename and refunction it as a paper complaint, medical note, receipt, police record, ledger, photo, letter, or signed confession.
- Do not output this ban.
`;
}

function buildEvidenceHandoffStateLock({ isRepeatedHandoff = false } = {}) {
  return `

[v4.5.3 EVIDENCE HANDOFF STATE LOCK: internal only]
- Saved chapters and context memos are the only canon for physical evidence. If a document/object was already received, read, shown, handed over, lost, hidden, or used in a saved chapter, this chapter must not rediscover it, ask where it is, promise to receive it later, or stage its first handoff again.
- Apply this to police records, contracts, letters, envelopes, notebooks, diaries, photos, film negatives, keys, ledgers, receipts, medical notes, victim reports, and signed/sealed papers.
- When an already-held item matters, begin from the current state: the character is using it, confronting someone with it, hiding it, damaging it, refusing to show it, noticing a missed detail, or paying a cost because of it.
- Do not rewrite a completed clue into a new clue. Create the next beat from a new decision, a new confrontation, a new consequence, or a different physical object.
${isRepeatedHandoff ? '- The previous draft repeated a received-proof handoff. Treat that repeated handoff/discovery as non-canon and rebuild the chapter from the latest saved chapter state.' : ''}
- Do not output this state lock.
`;
}

function buildLateStageEscapeRouteLock({ isFinalChapter = false } = {}) {
  return `

[v4.5.4 LATE-STAGE ESCAPE-ROUTE LOCK: internal only]
- A beginning ban is not enough in late long-novel chapters. Before drafting, discard every rejected route from this chapter as non-canon: digital props, data, devices, research, experiments, capsules, cult/ritual/sacrifice, folklore machinery, world-scale conspiracy, and chapter-boundary replay.
- Write the chapter from the latest SAVED chapter only. Do not inherit any person, item, location, mechanism, or explanation that appeared only in a rejected retry.
- Use this fixed late-stage scene design: (1) same saved place/time/injury/possession state, (2) one existing physical proof is handled or damaged, (3) one face-to-face conversation or refusal changes the relationship, (4) one irreversible cost occurs, (5) ${isFinalChapter ? 'a human choice closes the story without gadget/lab/ritual machinery' : 'the core remains unresolved for the final chapter'}.
- Banned as proof, key, reveal, or solution anywhere in this chapter unless explicitly selected: USB, data, terminal, server, screen, smartphone clue, app, analysis, video, recording, research room, experiment, capsule, memory device, ritual, sacrifice, offering, shrine/curse/cult machinery, destiny, world fate, secret project, and "everything is over" summary.
- Evidence inventory discipline: if a box, key, map, metal piece, metal plate, stone, photo, negative, letter, receipt, police record, or contract exists in saved canon, it must either remain explicitly possessed, be lost/damaged in a visible scene, be handed to a named person, or be refused. It must not vanish from a later list.
- Do not introduce a new relative, mastermind, elder, cult figure, lab figure, or hidden organization to solve the chapter unless saved chapters already established that person or group. A new witness may provide only one limited concrete clue.
- If the draft wants a big reveal, convert it into a small physical and human reveal: a lie in dialogue, a signature, a receipt, a photograph/negative, a ledger line, a scar, a refusal, a betrayal, a confession, debt, or bodily cost.
- Keep paragraphs varied and scene-based. Do not copy the previous chapter opening or explain the rules above.
`;
}

function buildAlwaysOnAxisEscapeLock({
  selectedAxes = 'unspecified',
  isDigitalAllowed = false,
  isCultAllowed = false,
  chapterNum = 1,
  totalChapters = 0,
  fromLateStage = false,
  hasRejectedRoute = false,
  isLateStage = false,
  isFinalChapter = false,
} = {}) {
  return `

[v4.5.5 ALWAYS-ON AXIS ESCAPE LOCK: internal only]
- A first-prompt declaration is not enough. Apply this law before every long-novel chapter, continuation, repair, and retry.
- Current selected/manual axes are fixed canon: ${selectedAxes || 'unspecified'}. Do not replace them with a more dramatic default such as suspense/Tokyo/adult, research facility, cult compound, underground facility, brainwashing institution, secret project, giant organization, world fate, or device/data solution.
- Digital/lab permission: ${isDigitalAllowed ? 'selected or compatible; still keep human choice and cost above device mechanics.' : 'not selected. USB, data, terminals, smartphones as clues, apps, servers, systems, recordings, analysis screens, research rooms, experiments, capsules, and memory-operation mechanics cannot be proof, key, villain engine, twist, or ending.'}
- Cult/facility permission: ${isCultAllowed ? 'selected or compatible; still avoid generic cult shortcuts.' : 'not selected. Religious orders, cults, believers, gurus, brainwashing, purification, sacred rooms, underground/special facilities, hidden compounds, ritual language, sacrifice, soul-box logic, or institutional confinement cannot become the core mystery, proof, threat, reveal, or ending.'}
- If a forbidden route would make the scene exciting, translate the same plot function into a smaller selected-axis mechanism: a person lying, a receipt, a handwritten letter, a photograph/negative, a signature, a police record, a scar, unpaid money, a refused apology, face-to-face testimony, betrayal, confession, bodily cost, or a practical object being lost/damaged.
- From chapter ${chapterNum}${totalChapters ? ` of ${totalChapters}` : ''}${fromLateStage ? ' onward' : ''}, escalation must come from relationship pressure, physical evidence, conversation, refusal, and cost. Do not escalate by changing genre family.
- ${hasRejectedRoute ? 'The previous rejected route is non-canon. Do not preserve its facility/cult/device/lab mechanism in softened wording.' : 'Even the first acceptable draft must pass this axis lock; do not wait for the save gate to catch it.'}
- ${isLateStage ? 'Late-stage rule: close pressure through human choice and concrete proof; do not use facility collapse, cult defeat, device shutdown, data release, or a new mastermind as the solving mechanism.' : ''}
- ${isFinalChapter ? 'Final chapter may force a strong ending, but only through a scene-level human cost, confession, refusal, betrayal, physical proof, or irreversible loss.' : ''}
- Do not output this law, labels, checklist, or internal reasoning.
`;
}

function buildProjectAiEscapeGuard({
  selectedAxes = 'unspecified',
  chapterNum = 1,
  hadForbiddenRoute = false,
} = {}) {
  return `

[v4.5.6 PROJECT-NAME / AI-WEAPON ESCAPE GUARD: internal only]
- Current selected/manual axes are fixed: ${selectedAxes}. Do not convert an ordinary object mystery into "Aoi Project", "Project X", a secret plan, hidden development program, AI weapon, artificial intelligence person, educator of an AI, military/corporate weapon race, or giant conspiracy unless the user explicitly selected AI/SF/digital/research.
- The words "project", "plan", "development", "AI", "artificial intelligence", "weapon", "system", and "data" are not harmless flavor in this story. If they become the clue, villain engine, lost-memory explanation, or ending, the chapter fails.
- Replace that exact function with a human-scale carrier before drafting chapter ${chapterNum}: a person lied, a receipt was hidden, a photograph or film negative contradicts someone, a signature proves payment, a witness refuses to talk, a friend betrays someone, a debt is unpaid, or a practical object is lost/damaged.
- For daily-life/comedy axes, danger may exist only as a local misunderstanding, rumor, awkward obligation, money trouble, work mistake, or face-to-face lie. Do not write chase-thriller, secret-weapon, or giant-conspiracy prose.
- ${hadForbiddenRoute ? 'The previous draft used a forbidden project/AI route. It is non-canon. Rewrite the chapter from saved canon without preserving the project name or AI premise.' : 'Do not wait for a retry. The first saved chapter must not contain a project/AI/weapon premise.'}
- Do not output this guard.
`;
}

function buildSelectedAxisAdherenceGuard({
  selectedAxes = '(none)',
  chapterNum = 1,
  requiredAnchors = [],
  isStrongRetry = false,
} = {}) {
  return `

[v4.5.7 SELECTED-AXIS ADHERENCE GUARD: internal only]
- Fixed selected/manual axes: ${selectedAxes || '(none)'}.
- Required visible anchors for chapter ${chapterNum}: ${requiredAnchors.join('; ')}.
- A first-page ban is not enough. Do not let the draft replace these axes with memory-loss suspense, Tokyo nightscape, black car, underground parking, office-building interrogation, missing lover, fraud, conspiracy, AI/project/device/data/lab, or serious thriller prose unless those were explicitly selected.
- If a previous rejected draft used those routes, it is non-canon. Start the retry from the selected axes and saved canon, not from the rejected title/logline/premise.
- The chapter cannot be saved unless the prose itself visibly contains the selected anchors. Do not output this guard.
${isStrongRetry ? '- Strong retry: open inside the selected place/action in the first 500 characters and remove the rejected premise before the first sentence.' : ''}
`;
}

function buildPosRegisterDataFallbackGuard({
  selectedAxes = 'unspecified',
  chapterNum = 1,
  isStrongRetry = false,
} = {}) {
  return `

[v4.5.9 POS / REGISTER DATA FALLBACK GUARD: internal only]
- Current selected/manual axes are fixed: ${selectedAxes || 'unspecified'}.
- Convenience-store scenes may use a register as a workplace object, but unselected digital proof is still forbidden.
- Do not use POS, register logs, register data, sales data, barcode logs, scan histories, screens, displays, camera footage, or recorded video as the clue, proof, contradiction resolver, villain engine, twist, or ending for chapter ${chapterNum}.
- If the scene needs store evidence, replace it with printed receipts, register tape, handwritten shift notes, a cash-count slip, a paper delivery invoice, a shelf-label correction slip, a physical package, a customer's testimony, a staff lie, a face-to-face confession, or a visible money/stock discrepancy.
- If a previous draft used register/POS/data as a shortcut, treat it as non-canon and rebuild the same plot function through paper, people, and physical store work.
${isStrongRetry ? '- Strong retry: remove register-data/POS-screen reasoning before the first sentence and open with a physical store action or direct conversation.' : ''}
- Do not output this guard.
`;
}

function buildUnselectedMemoryTemplateGuard({
  selectedAxes = 'unspecified',
  chapterNum = 1,
  isStrongRetry = false,
} = {}) {
  return `

[v4.6.0 UNSELECTED MEMORY-TEMPLATE GUARD: internal only]
- Current selected/manual axes are fixed: ${selectedAxes || 'unspecified'}.
- Do not use amnesia, fake amnesia, lost memory, recovered memory, memory-loss titles, or "forgotten past" as the premise, mystery carrier, title, logline, chapter engine, or ending for chapter ${chapterNum} unless the user selected that memory axis.
- Ordinary small forgetfulness can be a minor joke only. It cannot become the story's core explanation.
- If the draft wants memory loss, replace the same function with a misfiled printed receipt, forgotten shift note, misfiled printed receipt, cash-count mismatch, physical key, paper photo, customer's testimony, staff lie, face-to-face confession, or embarrassing misunderstanding inside the selected store/community axis.
${isStrongRetry ? '- Strong retry: delete the memory-loss premise before the first sentence and open with a concrete store action, paper clue, or awkward conversation.' : ''}
- Do not output this guard.
`;
}

function buildStorySpecificAllowedMeansLedger({
  chapterNum = 1,
  selectedAxes = 'unspecified',
  allowedMeans = [],
  forbiddenMeans = [],
  isStrongRetry = false,
} = {}) {
  return `

[v4.6.1 STORY-SPECIFIC ALLOWED MEANS LEDGER: internal only]
- Freeze this story's mystery/evidence/solution means before chapter ${Number(chapterNum) || 1}. Selected axes: ${selectedAxes}.
- Allowed means ledger: ${allowedMeans.join(', ')}.
- Forbidden outside the user's selected axes: ${forbiddenMeans.length ? forbiddenMeans.join(' / ') : 'none beyond normal continuity'}.
- Treat USB, POS, data, devices, lab tech, amnesia, cult/facility, Project/AI weapon, and world-scale answers as one unselected-template intrusion class. Do not rename or reuse a rejected route.
- Any clue, proof, reveal, twist, or ending must be rebuilt from the allowed ledger above.
${isStrongRetry ? '- Strong retry: discard the previous failed route completely before the first sentence; do not recycle it under another name.' : ''}
- Do not output this ledger or its labels.
`;
}

function buildLocalComedyStoreWorkMeansLedger({
  chapterNum = 1,
  selectedAxes = 'unspecified',
  allowedMeans = [],
  forbiddenMeans = [],
  isStrongRetry = false,
} = {}) {
  return `

[v4.6.3 LOCAL COMEDY STORE-WORK MEANS LEDGER: internal only]
- Freeze this story's trouble/proof/settlement means before chapter ${Number(chapterNum) || 1}. Selected axes: ${selectedAxes}.
- Allowed local means only: ${allowedMeans.join(', ')}.
- Do not turn the paper/card/receipt route into treasure hunting, old-map searching, hidden boxes, secret keys, ominous strangers, store-history conspiracy, or thriller investigation.
- Each chapter must advance through a visible convenience-store or shopping-street work beat: customer/staff conversation, shelf/product/package trouble, cash/shift note mismatch, shelf-label misunderstanding, awkward apology, bad timing, or practical loss.
- Include at least two comedy/dotabata beats before any serious clue language. A clue is only a mundane store-work object or testimony, not a grand mystery.
- Forbidden outside the user's selected axes: ${forbiddenMeans.length ? forbiddenMeans.join(' / ') : 'none beyond normal continuity'}.
${isStrongRetry ? '- Strong retry: discard the previous treasure/suspense route completely and rebuild from a store-work mistake before the first sentence.' : ''}
- Do not output this ledger or its labels.
`;
}

function buildLocalComedyChapterBeatPlan({
  chapterNum = 1,
  beats = [],
  isRetry = false,
} = {}) {
  return `

[v4.6.5 LOCAL COMEDY CHAPTER BEAT PLAN: internal only]
- Chapter ${Number(chapterNum) || 1} must use these assigned store-work beats: ${beats.join(' / ')}.
- Start from a visible shop action: register, shelf, package/cardboard, customer line, shift note, receipt, invoice, cash count, complaint slip, or customer complaint slip.
- Do not choose sealed boxes, open-me notes, secret messages, codes, smuggling, secret societies, cults, hidden maps, old keys, chosen people, underground rooms, ominous strangers, or historical conspiracies.
- The cause is always a human mistake, lie, misunderstanding, bad timing, unpaid small debt, or practical store loss. The solution is apology, testimony, receipt/note/invoice, shelf/package correction, repayment, or confession.
${isRetry ? '- Retry must discard every hidden-box/secret-message route from the failed draft and start with the assigned store-work beat in the first paragraph.' : ''}
- Do not output this beat plan.
`;
}

function buildOpenAiFirstChapterProseKickoff({ isRetry = false } = {}) {
  return `

[v4.6.7 OPENAI FIRST-CHAPTER PROSE KICKOFF: internal only]
- Output chapter prose only. Do not output title, logline, all-structure, outline, beat list, target length, labels, markdown heading, or metadata.
- The first 800 Japanese characters must visibly contain: 商店街, コンビニ, レジ or 棚, 店長 or 客, and one awkward comic misunderstanding.
- Start with a first-person physical store action, not a premise explanation: I handle a receipt, shift note, cash-count slip, shelf label, package, cardboard box, complaint slip, or customer complaint slip.
- Continue the chapter until the prose body is at least 5,200 Japanese characters before the context memo. Do not stop at setup, synopsis, or short scene fragment.
- Do not use data/POS/app/video/server/device/research/lab/memory-device as proof or solution. Use only paper receipts, handwritten notes, cash mismatch, shelf/package correction, customer testimony, apology, misunderstanding, repayment, or confession.
${isRetry ? '- Retry from zero. The previous rejected draft is not canon; do not reuse its title/logline/metadata, digital route, or short-fragment structure.\n' : ''}- Do not output this kickoff contract.
`;
}

function buildLocalComedySurfaceLedger({ forbiddenTerms = [] } = {}) {
  const terms = Array.isArray(forbiddenTerms)
    ? forbiddenTerms.join(', ')
    : String(forbiddenTerms || '');
  return `

[v4.6.8 LOCAL COMEDY SURFACE LEDGER: internal only]
- Do not use these unselected-template words anywhere in the visible prose, even as metaphor or casual comparison: ${terms}.
- If the failed draft used one of those words, discard that sentence and rebuild with mundane store-work language.
- Do not output this guard.
`;
}

function buildOpenAiInitialLongPlanProseOverride({ isRetry = false } = {}) {
  return `

[v4.6.9 OPENAI INITIAL LONG-PLAN PROSE OVERRIDE: internal only]
- The visible response must begin with chapter-1 prose. The first line must not contain title, logline, structure, outline, synopsis, metadata, markdown heading, or bullet list.
- Do not output Japanese labels such as タイトル, ログライン, 全構成, あらすじ, プロット概要, 作品ヘッダー情報, or any equivalent label.
- Write at least 6,500 Japanese characters of chapter-1 prose before any context memo. Do not stop at a short scene fragment.
- The first 1,000 Japanese characters must visibly include the shopping street, a convenience-store work action, the register or shelf, a storekeeper or customer, and an awkward comic misunderstanding.
- Keep every trouble/proof/solution inside the local store-work ledger. Do not use unselected route words from the surface ledger, even as metaphor.
${isRetry ? '- Retry from zero; the previous title/logline/outline-shaped draft is non-canon and must not be continued.\n' : ''}- Do not output this override.
`;
}

function buildLocalComedyEntertainmentSpine({
  chapterNum = 1,
  laughBeats = [],
  isLate = false,
  isFinal = false,
  isRetry = false,
} = {}) {
  return `

[v4.7.2 LOCAL COMEDY ENTERTAINMENT SPINE: internal only]
- The chapter must be entertaining as local comedy, not only coherent. The reader should be able to point to concrete funny store scenes.
- First 500 Japanese characters: show visible shop action at a register, shelf, price tag, stockroom, cardboard box, complaint slip, receipt, handwritten shift note, or customer line.
- Required laugh beats for chapter ${Number(chapterNum) || 1}: ${laughBeats.join(' / ')}. Use at least three laugh beats: misunderstanding, awkward apology, public embarrassment, short back-and-forth, interruption by customer/shopkeeper, bad timing, or concrete prop gag.
- Any serious clue must be tied to a comic beat within three paragraphs. Do not let words like truth, future, core, decisive, or revelation take over unless a store-work gag undercuts them immediately.
- End the chapter with an unresolved comic/practical task, not a grand emotional summary.
${isLate ? '- Late chapters must not reopen envelope/debt/repayment/100-yen-shortage threads as a new truth. Close them through a public comic store action: wrong sticker, misprinted sign, shelf-label correction, cash-count slip, cardboard mix-up, awkward announcement, apology line, or small repayment.\n' : ''}${isFinal ? '- Final chapter must end on funny human action or dialogue plus one small remaining practical task. Do not end only with abstract unity, truth, hope, future, or emotional summary.\n' : ''}${isRetry ? '- Retry from zero: discard the failed heavy-summary or reopened-thread route completely. Do not reuse it under another name; rebuild from the assigned laugh beats.\n' : ''}- Do not output this entertainment spine.
`;
}

function buildFinalForceCloseElasticity({ mode = 'standard' } = {}) {
  return `

[Final force-close elasticity v4.3.5 / internal only]
- If ${mode === 'long' ? 'the final chapter' : 'the final visible ending'} has already reached a vivid performed climax, do not keep chasing a sterile perfect ending. A rough, forceful human close is allowed when it is more moving than another mechanical regeneration.
- This escape is for literary judgment only: never pass management notes, chapter-control labels, duplicated prose, hard continuity contradictions, missing completion markers, or broken text.
- If a digital/object clue remains, demote it from the hero of the ending. Let the decisive beat be a person choosing, refusing, confessing, paying, losing, or saying one imperfect line.
- A strong ending may be abrupt, bitter, practical, or awkward. It may close on pain, an unpaid task, a damaged object, a body reaction, or a line that refuses neat hope.
- Do not output this contract or any labels from it.`;
}

function buildLateStageTemplateRecovery({
  selectedAxes = 'unspecified',
  mode = 'standard',
  isDigitalAllowed = false,
} = {}) {
  return `

[Late-stage template recovery v4.3.5 / internal only]
- Current axes: ${selectedAxes || 'unspecified'}.
- For ${mode === 'long' ? 'late chapters and the final chapter' : 'the visible ending'}, if the draft drifts toward unselected digital, research-facility, laboratory, capsule, data-core, USB, device, server, or system payoff, do not merely delete the energy and do not keep regenerating the same template.
- Rewrite the function of that drift into human-scale story material: witness testimony, a paper ledger, a printed photo, a key, a receipt, an old letter, an injury, a debt, a lie, an alibi, a face-to-face confession, betrayal, refusal, or a cost paid by a person.
- ${isDigitalAllowed ? 'Digital tools may appear only if the selected setting requires them, and the decisive beat must still be human cost.' : 'Digital tools are not selected: a phone, USB, terminal, data file, server, device, capsule, or lab may at most point toward the truth; it must not become the truth, final proof, final weapon, or solution.'}
- If a rejected draft used a device/lab/capsule as the answer, preserve only the emotional pressure, then restage the chapter around a person saying or hiding something, a physical object changing hands, and a concrete consequence.
- Do not output this recovery contract or any labels from it.`;
}

function buildNovelAiSmellRemoval({
  selectedMode = 'unspecified',
  mode = 'standard',
} = {}) {
  return `

[Novel AI-smell removal v4.3.5 / internal only]
- Apply this as fiction craft, not SNS/blog rewriting. Do not force every genre into casual conversation; preserve the selected mode and genre: ${selectedMode || 'unspecified'}.
- For ${mode === 'long' ? 'each chapter' : 'the visible story'}, remove the "well-behaved AI essay" texture: predictable summary sentences, textbook explanations, equal-length paragraphs, and clean moralizing conclusions.
- Vary rhythm deliberately: mix short pressure sentences, medium action beats, and one or two longer sensory sentences. Do not make every paragraph land with the same emotional cadence.
- When tempted to explain, dramatize instead: use a line of dialogue, a physical object, a visible action, a silence, a mistake, a body reaction, or a concrete cost.
- Add at least one imperfect human beat when the scene allows it: hesitation, irritation, small selfishness, clumsy apology, ugly joke, practical complaint, or a sentence that does not sound optimized.
- Avoid formulaic finishers such as dawn/hope/truth/future/light/dignity summaries unless they are undercut by a concrete loss, awkward line, unpaid task, bodily pain, irony, or unresolved emotional bruise.
- Do not output this craft contract or any labels from it.`;
}

function buildHardGatesAndEffortGoals({ mode = 'standard' } = {}) {
  return `

[Hard gates and effort goals v4.3.5 / internal only]
- Hard rules: obey every selected or manually typed setting; never output management notes, chapter-control labels, broken text, duplicate/restarted prose, unresolved hard contradictions, underlength chapters, or unselected template takeover.
- Hard rule: if an unselected digital/research/capsule/isekai/chuni/folklore/world-scale template becomes the core setting, proof, weapon, villain, or solution, rewrite it back to the selected axes.
- Effort goals: AI-smell removal, paragraph-rhythm variety, reduced abstract repetition, muddy human lines, chapter temperature differences, imperfect aftertaste, and small interesting detours. Improve these whenever possible, but do not destroy a good scene just to satisfy a cosmetic pattern.
- A strong ${mode === 'long' ? 'each chapter' : 'the visible story'} may keep a surprising drift if it returns to the selected theme, human stakes, physical evidence, conversation, cost, or character choice.
- Do not output this contract or any labels from it.`;
}

function buildDomesticComedyToneGuard({ selectedAxes = 'unspecified' } = {}) {
  return `

[Domestic comedy tone guard v4.3.7 / internal only]
- Current selected/manual axes are domestic comedy/life-scale and must remain fixed: ${selectedAxes || 'unspecified'}.
- Light mystery is allowed as a spice, but do not let chase, surveillance, danger, criminal conspiracy, cold fear, hidden pursuers, or "no longer safe" thriller language become the main engine.
- If tension rises, metabolize it into shop work, shifts, receipts, paper notes,逕ｺ蜀・ｼ・gossip, face-to-face confession, mistaken assumptions, badly timed jokes, practical embarrassment, and small human cost.
- Every long chapter in this axis should contain visible life/comedy texture: a clumsy line, awkward customer/shop detail, local relationship friction, or a laugh-under-pressure beat.
- Do not solve tone drift by deleting energy. Rewrite the same function into ordinary evidence, conversation, human relationship, and comedy timing.
- Do not output this contract, labels, state tables, or checklist text.`;
}

function buildMidStoryDigitalLabCoreGuard({
  selectedAxes = 'unspecified',
  isDigitalAllowed = false,
} = {}) {
  return `

[Mid-story digital/lab core guard v4.4.0 / internal only]
- Current selected/manual axes remain fixed: ${selectedAxes || 'unspecified'}.
- Digital/lab core permission: ${isDigitalAllowed ? 'allowed by selected settings, but human choice and category constraints still outrank gadgets.' : 'not selected. USB, devices, data, videos, servers, systems, apps, research labs, experiment rooms, capsules, memory devices, memory manipulation, and analysis screens must not become the proof, key, weapon, hidden answer, villain engine, or solution.'}
- If a rejected draft used USB, data, a research room, a capsule, or a memory device, that draft is not canon. Rewrite the same plot function into developed film negatives, a handwritten letter, a paper ledger, a receipt, a key, a scar, witness testimony, face-to-face betrayal, refusal, or a cost paid by a person.
- Keep mystery and suspense through human stakes, physical evidence, conversation, and irreversible choices. Do not replace the chosen axes with a lab-device explanation.
- Do not output this guard, labels, tables, or checklist text.`;
}

function buildTemplateInvasionPrevention({
  selectedAxes = 'unspecified',
  isDigitalAllowed = false,
  isChuniAllowed = false,
  isIsekaiAllowed = false,
  isWorldScaleAllowed = false,
  mode = 'standard',
} = {}) {
  return `

[Template invasion prevention v4.2.4 / internal only]
- Story Maker's uniqueness comes from multi-axis randomization. Make novelty from the selected Character x Theme x Genre x Era x Worldview x Target x Ending x Narration combination, not from default blockbuster templates.
- Selected/manual axes are permissions and constraints. If a family below is selected, use it boldly. If it is not selected, it may appear only as incidental texture and must not become the core reveal, protagonist identity, plot engine, solution, or ending.
- Current axes: ${selectedAxes || 'unspecified'}.
- Digital/gadget permission: ${isDigitalAllowed ? 'allowed by selected settings, but keep human cost and category constraints primary.' : 'not selected. Do not make AI, devices, apps, surveillance, cyber systems, data, machines, or technical jargon the hidden answer, final weapon, or main mystery engine.'}
- Chuni/grandiose permission: ${isChuniAllowed ? 'allowed by selected settings, but avoid empty abstract grandeur.' : 'not selected. Do not drift into chosen-one, awakening, sealed power, deep darkness, fate, bloodline, forbidden truth, ultimate enemy, or exaggerated world-destiny language.'}
- Isekai/fantasy permission: ${isIsekaiAllowed ? 'allowed by selected settings, but obey the exact chosen fantasy flavor.' : 'not selected. Do not introduce reincarnation, summoning, magic systems, demon kings, kingdoms, guilds, skills, dungeons, sacred swords, elves, dragons, or fantasy-world logic.'}
- World-scale permission: ${isWorldScaleAllowed ? 'allowed if the selected genre/worldview supports it, but keep scale earned by scenes.' : 'not selected. Do not escalate an ordinary premise into a world-scale conspiracy, civilization crisis, secret society, or humanity-level battle.'}
- Sasaru core lock: before drafting, privately fix the protagonist's wound, desire, lie, shame, impossible binary choice, and price. In long-form, keep that same core across chapters; each chapter must pressure or mutate it instead of inventing a new generic hook.
- No explanation chapter: do not let any chapter become a report page. Reveals must occur through action, dialogue, physical objects, bodily cost, relationship change, public consequence, or a choice that cannot be undone.
- Raw human beat: every chapter or short narrative needs at least one awkward, practical, impolite, weak, bodily, contradictory, or unfinished human beat. A polished sentence about hope, truth, or resolve is not a substitute.
- Ending betrayal: especially in the final chapter, do not close on morning light, hope, night ending, truth, future, dignity, a neat smile, or emotional summary alone. Leave a small loss, unpaid chore, pain, silence, ironic object, or surprising line.
- Vocabulary repetition audit: if memory/truth/hope/device/darkness/light/dawn/fate/heart/dignity repeats more than concrete scene detail, replace abstractions with objects, gestures, dialogue, and sensory facts.
- Chapter temperature cards: for long-form, use the visible chapter number to rotate texture: 1 dialogue clash, 2 silent observation, 3 bodily pressure, 4 misunderstanding, 5 failure/embarrassment, 6 practical chore, 7 sensory dread, 8 public consequence; then repeat. Do not let every chapter share the same smooth emotional temperature.
- For ${mode === 'long' ? 'each chapter and the completed novel' : 'the visible output'}, if the prose starts sounding similar to common AI stories, shrink the scale, make the conflict more local, make the object more ordinary, and let the character's embarrassing, practical, or painful choice carry the hook.
- Before output, internally reject any draft where the strongest idea is an unselected template family rather than the user's selected axes.
- Do not output this checklist or any labels from it.`;
}

function buildFinalCoreAfterglowGuard({
  selectedAxes = 'unspecified',
  mode = 'standard',
  isDigitalAllowed = false,
} = {}) {
  return `

[Final-core and afterglow guard v4.3.1 / internal only]
- Current axes: ${selectedAxes || 'unspecified'}.
- For ${mode === 'long' ? 'each late chapter and the completed long novel' : 'the visible output'}, do not treat a rejected template as "interesting drift." Interesting drift is allowed only when it keeps the selected axes and resolves through human choice, physical evidence, relationship cost, local action, or dialogue.
- Digital final-core permission: ${isDigitalAllowed ? 'allowed only if selected and still grounded in human cost.' : 'not selected. Do not make a black file, server room, data file, terminal, device, download, access code, passcode, USB, system, or data extraction become the final proof, last weapon, core truth, or ending solution.'}
- Final chapter must not end on dawn, morning light, hope, truth-light, future, dignity, a clean no-regret smile, or "the next battle begins" unless the last beat is complicated by a concrete loss, unpaid practical task, bodily pain, awkward silence, irony, or an unexpected human line.
- Do not output this guard or its labels.`;
}

function buildChapterBoundaryAntiReplay({ selectedAxes = 'unspecified' } = {}) {
  return `

[Chapter boundary anti-replay v4.3.6 / internal only]
- Current selected/manual axes remain fixed: ${selectedAxes || 'unspecified'}.
- Saved previous chapters are canon references only. Do not reuse their prose, opening sentences, paragraph order, metaphors, jokes, travel beats, arrivals, or dialogue as material for the next chapter.
- Start each new chapter from the next irreversible beat after the immediately previous saved chapter. A same-place continuation is allowed, but the first 900 characters must contain a new action, new conversation pressure, new practical obstacle, or new physical object exchange.
- Never begin a chapter by restating the previous chapter's final scene, replaying the same departure/arrival/investigation, or describing an event as if it had not already happened.
- If the next-chapter GMC+S feels too narrow or short, deepen the scene with friction, failed attempts, interruptions, sensory detail, and human cost. Do not steal a later reveal, final proof, final culprit exposure, total solution, or epilogue event to fill length.
- Use recent chapter text to preserve state, not to copy style chunks. If a sentence could be mistaken for pasted text from the previous chapter, rewrite it around a different concrete action or spoken line.
- Do not output this contract, labels, state tables, or checklist text.`;
}

function buildLocalScaleCategoryGuard({
  selectedAxes = 'unspecified',
  isLocalFolkloreAllowed = false,
  isMundaneLocal = false,
  isComedy = false,
  mode = 'standard',
} = {}) {
  return `

[Local-scale category guard v4.2.7 / internal only]
- Current axes are fixed writing law: ${selectedAxes || 'unspecified'}. Do not replace them with a more dramatic default genre.
- Local folklore/occult permission: ${isLocalFolkloreAllowed ? 'allowed only because the selected axes support folklore, occult, horror, fantasy, shrine, curse, or similar material.' : 'not selected. Do not make sacrifices, shrines, local cults, village rites, cursed stones, sacred objects, alien/monstrous plants, body invasion, the land itself awakening, or ancient legends the core mystery, plot engine, solution, or ending.'}
- Mundane/local axis pressure: ${isMundaneLocal ? 'selected. Keep the strongest conflict at human/local scale: work, family, money, embarrassment, rumor, habit, mistake, neighborhood, store operation, relationship, or a concrete ordinary object.' : 'not specifically mundane, but still obey the exact selected axes.'}
- Comedy pressure: ${isComedy ? 'selected. Even if suspense or mystery is present, do not turn the story into serious horror, dark folklore, world-saving ritual, or body-invasion dread unless those axes are explicitly selected.' : 'not selected, so do not force jokes unless the settings call for them.'}
- For ${mode === 'long' ? 'each chapter and the completed novel' : 'the visible output'}, a mystery should be solved by the selected world and characters. If the draft's strongest answer is 'ancient rite/curse/sacrifice/hidden village power' while those are unselected, discard it and use a smaller, stranger human answer instead.
- Do not output this guard, labels, beat names, checklists, or design notes.`;
}

function buildCreativeElasticity({
  selectedAxes = 'unspecified',
  mode = 'standard',
} = {}) {
  const outputScope = mode === 'long'
    ? 'each chapter and the completed long novel'
    : 'the visible output';
  return `

[Creative elasticity v4.2.8 / internal only]
- Highest priority: move the reader. Remove AI-like neatness, not human mess. A slightly surprising detour is allowed when it makes the character, comedy, fear, tenderness, shame, or contradiction more vivid.
- Selected/manual axes are gravity, not a cage: ${selectedAxes || 'unspecified'}. Do not replace them, but do allow the draft to lean into a living scene if the result becomes more emotionally specific.
- A detour must be metabolized back into the selected theme/world/genre before ${outputScope} is saved. The reader should feel: "that strange turn belonged to this story after all."
- If a detour is exciting but risks category drift, do not delete it mechanically. Translate it into the selected scale: a person, a relationship, a practical object, an embarrassing choice, a bodily sensation, a place-specific consequence, or a line of dialogue.
- Reader emotion never licenses an unselected AI/digital/device system to become the core reveal, black box, final weapon, or solution. If the draft wants that, translate the payoff into a person, concrete object, lie, alibi, money trail, bodily cost, or relationship choice.
- Hard failures remain forbidden: visible internal labels, control/memo lines, chapter restarts, duplicated prose, exact continuity contradictions, unresolved impossible facts, or replacing the user's selected/manual settings with a different genre.
- Soft failures should be repaired in prose, not solved by bland refusal: too polished endings, too many abstractions, report-like explanation, mild genre bleed, or a chapter ending that feels uniform.
- For ${outputScope}, the ending must resolve the current emotional promise, but it may keep one human bruise, irony, unpaid chore, awkward sentence, or small unresolved pain. Do not use sequel-bait as a substitute for resolution.
- Do not output this contract or any labels from it.`;
}

function buildBioDeviceCultHardGuard({
  selectedAxes = 'unspecified',
  isDigitalAllowed = false,
  isFolkloreAllowed = false,
  mode = 'standard',
} = {}) {
  return `

[Bio-device/cult hard guard v4.3.0 / internal only]
- Current axes: ${selectedAxes || 'unspecified'}.
- Bio-device permission: ${isDigitalAllowed ? 'allowed by selected settings only when it serves the chosen genre.' : 'not selected. Do not turn the mystery into a research facility, giant device, capsule, biomechanical experiment, special activation, data core, or hidden laboratory system.'}
- Sacrifice/cult permission: ${isFolkloreAllowed ? 'allowed only because folklore/occult/horror/fantasy is selected.' : 'not selected. Do not use ikenie/sacrifice/offerings/ritual activation as the core clue, engine, threat, reveal, or ending.'}
- If ${mode === 'long' ? 'each chapter and the completed long novel' : 'the visible output'} starts leaning toward those templates without permission, translate the payoff into an ordinary person, lie, alibi, physical clue, debt, relationship betrayal, police record, workplace fact, bodily injury, or awkward confession.
- Do not output this guard or its labels.`;
}

function buildFirstDraftAntiTemplateCarrierLock({
  selectedAxes = 'unspecified',
  isDigitalAllowed = false,
  isFolkloreCultAllowed = false,
  isGrandScaleAllowed = false,
} = {}) {
  return `

[First-draft anti-template carrier lock v4.4.2 / internal only]
- Current selected/manual axes: ${selectedAxes || 'unspecified'}.
- Before drafting each long-novel chapter, privately choose the chapter's proof carrier and payoff carrier from human testimony, paper evidence, photographs/film, handwriting, receipts, ledgers, keys, scars, money trails, police records, family ties, betrayal, refusal, confession, or bodily cost.
- Digital/lab permission: ${isDigitalAllowed ? 'selected or compatible; still keep human cost above device mechanics.' : 'not selected. The first draft itself must not use phone apps, map apps, logs, video, data, USB, servers, terminals, research rooms, capsules, memory devices, or analysis screens as proof/key/core solution.'}
- Folklore/cult permission: ${isFolkloreCultAllowed ? 'selected or compatible; still avoid generic ritual shortcuts.' : 'not selected. Do not use sacrifice, offerings, ritual activation, shrine/cult/curse machinery, sacred objects, ancient village power, or land-scale awakening as the core answer.'}
- Grand/isekai/chuni permission: ${isGrandScaleAllowed ? 'selected or compatible; still obey the chosen scale.' : 'not selected. Do not escalate to world fate, magic systems, reincarnation, gods, chosen-one destiny, or state/world-scale conspiracies.'}
- If the draft wants one of the forbidden carriers, keep the plot function but translate it before writing prose into a person, physical object, document, confession, relationship cost, or local consequence.
- Do not output this lock, labels, tables, or checklist text.`;
}

function buildPhysicalEvidenceClarification() {
  return `

[Physical evidence clarification v4.4.5 / internal only]
- Paper files, locked folders, ledgers, notebooks, photographs, film negatives, envelopes, signatures, seals, keys, scars, and ordinary pendants are valid physical evidence.
- Do not avoid those concrete objects merely because the word "file" or "key" appears. The forbidden pattern is a digital/lab engine: USB, device data, servers, terminals, systems, apps, screens, analysis results, research rooms, capsules, or memory-operation devices becoming the proof, key, core reveal, villain engine, or solution.
- If a previous rejection mentioned digital drift but the useful carrier is a paper file or pendant, keep the physical object and make the decisive payoff come from handwriting, witness testimony, signatures, damage, refusal, betrayal, or cost.
- Do not output this clarification.`;
}

function buildSelectedGenreDriveContract({
  chapterNum = 1,
  genreLabel = '未指定',
  genreDrive = '',
  isRetry = false,
} = {}) {
  return `
【v4.7.7 選択ジャンル牽引契約 / 本文には出力しない】
- 現在の選択ジャンル: ${genreLabel}。この章の面白さは、選択ジャンルそのものを極めて作る。別ジャンルの強いテンプレートで代用しない。
- 第${Number(chapterNum) || 1}章には、読者が次を読みたくなる理由を最低三つ置く: 主人公の欲望、実務/感情/身体上の障害、期待の反転、信用や関係の変化、失うもの、未解決の問い。
- ジャンル別の牽引方法: ${genreDrive}
- 未選択テンプレートの機能禁止: ユーザーが選んでいない限り、USB、POSログ、データ、記憶喪失、研究施設、秘密計画、AI兵器、世界規模陰謀、教団/儀式、木箱/隠し箱、伝説の品、存在しないはずの物、暗号/密輸を、核心の謎・証拠・解決手段・章末フックにしない。小道具として出る場合も日常的な物に留め、物語エンジンにしない。
- 各章は説明や設定紹介ではなく、人物が現場で選び、失敗し、言い返し、隠し、謝り、拒み、支払い、関係を変える場面で進める。
${isRetry ? '- 再生成時: 直前に失敗したルートは非正史。箱、装置、データ、記憶、陰謀、伝説物、研究施設、AI兵器などを別名で再利用せず、章の駆動方法そのものを選択ジャンル内で組み直す。\n' : ''}- この契約や項目名を本文に出力しない。
`;
}

function buildStoreOperationMistakeLock({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.7.7 店内運用ミス固定 / 本文には出力しない】
- この作品でスタンプ、カード、キャンペーン、景品が出そうになる場合、それらは使わず、棚札、紙レシート、包装、段ボール、納品書、現金確認票、客の勘違い、スタッフの報告漏れへ置き換える。
- 禁止: 木箱、古い箱、隠し箱、秘蔵品、伝説のスタンプ、幻の景品、存在しないはずのスタンプ、昔の店長が特注した由来、商店街の歴史的秘密、スタンプの起源調査、景品伝説を、核心の謎・証拠・解決手段・章末フックにしない。
- 第${Number(chapterNum) || 1}章の面白さは、客対応、レジ列、棚札訂正、シフトメモ、紙レシート、現金差異、包装/段ボール取り違え、気まずい謝罪、店長や常連の嘘/言い訳/告白で作る。
- スタンプ/カード/キャンペーン問題が出そうになったら、棚札の貼り間違い、紙レシートの確認漏れ、現金確認票、紙の納品書、包装ラベル、客の証言、店員の説明不足のどれかに変換する。
${isRetry ? '- 再生成時: 直前に出た木箱、伝説スタンプ、幻の景品、由来調査、昔の特注品、存在しないはずの物は完全に捨てる。言い換えや別名で残さない。\n' : ''}- このロックや項目名を本文に出力しない。
`;
}

function buildShoppingStreetAnchorContract({ isRetry = false } = {}) {
  return `
【v4.7.7 商店街アンカー / 本文には出力しない】
- 各章に、店内だけでなく商店街の可視アンカーを最低一つ入れる: アーケード、隣の精肉店/青果店/パン屋、商店会、通りの常連、店先の声、近所の店主、商店街イベントの掲示。ただし歴史的秘密や伝説にはしない。
- 普通のレジ操作、スキャン、レシートプリンター、値段確認、インク切れは日常業務であり、POSログや売上データを証拠にしない。証拠化するなら紙レシート、棚札、現金差異、シフトメモ、包装、客の証言へ戻す。
${isRetry ? '- 再生成時は、レジ画面やスキャン結果に頼る筋を捨て、紙・棚・現金・人の証言・商店街の会話からやり直す。\n' : ''}`;
}

function buildChapterCarrierRotationContract({
  chapterNum = 1,
  carriers = [],
  isRetry = false,
} = {}) {
  return `
【v4.7.7 章別キャリアローテーション / 本文には出力しない】
- 第${Number(chapterNum) || 1}章の証拠/騒動/解決の中心はこれに限定する: ${carriers.join(' / ')}。
- スタンプ/カード/キャンペーン/景品は、このQA軸では背景小道具にもせず、棚札・紙レシート・現金差異・納品書・包装・証言へ置き換える。第3章以降は、古いカード箱、カードの山、幻の景品、スタンプの迷宮、商店街全体の伝説を章の中心・証拠・章末フックにしない。
- 同じ販促物騒動に戻すのではなく、毎章、棚札、紙レシート、現金差異、納品書、包装、段ボール、苦情票、シフトメモ、客/店主の証言、謝罪、返金へ物理的に移動する。
${isRetry ? '- 再生成時は、直前のスタンプ/カード/キャンペーン中心ルートを捨て、上記キャリアだけで新しい場面から始める。\n' : ''}`;
}

function buildSelectedGenreIntensificationContract({
  chapterNum = 1,
  genreLabel = '未指定',
  genreDrive = '',
  negativeCondition = '',
  isRetry = false,
} = {}) {
  return `
【v4.7.8 選択ジャンル極振り契約 / 本文には出力しない】
- 現在の選択ジャンル: ${genreLabel}。面白さは選択ジャンルそのものを極めて作る。コメディなら笑い、シリアスなら重さ、サスペンスなら緊迫、ミステリーなら推理、恋愛なら関係変化を主役にする。
- 実務上の危機、信用、締切、人間関係の変化は、選択ジャンルに合う場合だけ芯にする。全ジャンルを職場危機風に寄せない。
- 第${Number(chapterNum) || 1}章の牽引方法: ${genreDrive}
- ネガティブ条件: ${negativeCondition} USB、POSログ、データ、記憶喪失、研究施設、秘密計画、AI兵器、世界規模陰謀、教団/儀式、木箱/隠し箱、伝説の品、存在しないはずの物、暗号/密輸は、ユーザーが選んだ軸でない限り核心の謎・証拠・解決手段・章末フックにしない。
- 章頭は直前章の文章を貼り直さない。前章の状況説明は一文以内にし、最初の八百字以内に新しい行動、会話、物理的証拠、選択、関係変化のどれかを出す。
${isRetry ? '- 再生成時は、失敗した章の冒頭、同じ小道具中心、同じ解決ルートを完全に捨てる。目的のジャンル牽引を強めると同時に、上記ネガティブ条件も強めて別名再利用をしない。\n' : ''}- 完走率を守るため、禁止対象に触れそうな場合は章全体を大ネタ化せず、選択ジャンル内の小さな行動・会話・物証へ置き換えて書き進める。
`;
}

function buildLocalComedyFreshSceneContract({
  chapterNum = 1,
  carriers = [],
  isRetry = false,
} = {}) {
  return `
【v4.7.8 ローカルコメディ新場面契約 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章の中心キャリアはこれにする: ${carriers.join(' / ')}。
- 全章で、古いキャンペーンカード、古いカード箱、カードの山、幻の景品、スタンプ迷宮を原因・真相・解決・章末フックにも背景小道具にも使わない。
- 現金差異の原因を毎回販促物に戻さない。紙の納品書、棚札、包装、段ボール、苦情票、シフトメモ、客や店主の証言へ物理的に移す。
- 冒頭は前章の末尾や同じ説明を再演せず、客の一言、店員の失敗、棚/レジ/段ボール/納品書の新しい物理行動から始める。
${isRetry ? '- 再生成時は、直前に失敗したスタンプ/カード/キャンペーン中心ルートと同じ冒頭を完全に捨て、上記キャリアだけで新しい場面から始める。\n' : ''}`;
}

function buildHiddenBoxLegendPrizeClosure({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.7.9 隠し箱・伝説景品ルート閉鎖 / 本文には出力しない】
- 木箱、木の箱、木製の箱、古い箱、隠し箱、秘密の箱、裏キャンペーン、去年の景品探し、伝説スタンプ、幻の景品、スタンプの迷宮は、同じ未選択テンプレートとして扱う。言い換えて再利用しない。
- 箱や缶が必要なら、段ボール、包装、商品パッケージ、クッキー缶、備品ケースなど日常物に留める。中身を謎・真相・解決手段・章末フックにしない。
- 第${Number(chapterNum) || 1}章以降の騒動は、紙の納品書、棚札、包装/段ボール、商品棚、苦情票、シフトメモ、紙レシート、客/店主の証言で動かす。去年のスタンプ景品や隠し箱に戻さない。
${isRetry ? '- 再生成時は、木の箱、裏キャンペーン、去年の景品、スタンプの迷宮を完全に捨てる。段ボール/棚札/紙の納品書/包装ラベルの現場行動から書き直す。\n' : ''}`;
}

function buildPlainRegisterWordingLock({ isRetry = false } = {}) {
  return `
【v4.8.0 通常レジ表現固定 / 本文には出力しない】
- 普通の会計・スキャン・レシート印刷・価格確認は、本文では「レジ」「会計」「レシート」「棚札」「現金確認」と書く。\`POS\` という表面語は使わない。
- 禁止: POSログ、POSデータ、売上データ、販売データ、レジデータ、データ分析、システムログ、電子記録を、謎・証拠・解決手段・章末フックにしない。
${isRetry ? '- 再生成時は、`POS` 表記を使わず、紙レシート、棚札、現金差異、包装、段ボール、シフトメモ、客の証言へ戻す。\n' : ''}`;
}

function buildStampCardEngineBan({
  chapterNum = 1,
  carriers = [],
  isRetry = false,
} = {}) {
  return `
【v4.8.1 スタンプ/カード主エンジン禁止 / 本文には出力しない】
- 重要: 以前の指示にキャンペーンカード、スタンプ、景品を使ってよい記述があっても、この作品では章の中心・原因・真相・解決・章末フックにしない。最新指示で上書きする。
- 第${Number(chapterNum) || 1}章の中心キャリアはこれだけにする: ${carriers.join(' / ')}。
- スタンプ、カード、キャンペーン、景品、押印、去年の販促物は、背景の一言にも使わない。問題の発端、証拠、解決、次章への謎には絶対に使わない。
- 読者を引っ張る力は、棚札、紙レシート、現金差異、紙の納品書、包装/段ボール、苦情票、シフトメモ、客/店主の証言、対面の謝罪で作る。
${isRetry ? '- 再生成時は、直前に出たスタンプ/カード/景品/キャンペーン中心ルートを完全に捨て、上記キャリアだけで新しい場面から始める。\n' : ''}`;
}

function buildRepairLengthPreservationContract({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  const chapter = Number(chapterNum) || 1;
  return `
【v4.8.2 修正時の本文量維持 / 本文には出力しない】
- 第${chapter}章を修正する時、本文を要約・短縮・圧縮しない。重複段落を削った場合は、同じ長さ以上の新しい現在進行の場面、店内行動、会話、物理的証拠、謝罪、返金、棚札/包装/納品書確認で補う。
- 修正後の本文は、元本文の八割未満にしない。第${chapter}章本文は最低でも五千二百字相当の密度を保ち、文脈メモだけで終えない。
- 冒頭再演を直す場合は、片方を削るだけで終わらず、次の行動へ進む新しい段落を足す。章の現在時刻を前へ進める。
${isRetry ? '- 再生成・再修正時は、短くまとめるより、読者が読める場面を増やして品質ゲートの短文停止を避ける。\n' : ''}`;
}

function buildLocalComedyAllowedLedgerRealignment({
  chapterNum = 1,
  allowedCarriers = [],
  isRetry = false,
} = {}) {
  return `
【v4.8.5 ローカルコメディ許可台帳再整合 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章の謎・証拠・解決・章末フックは、この許可キャリアだけで作る: ${allowedCarriers.join(' / ')}。
- スタンプ、カード、キャンペーン、景品、押印、去年の販促物は本文に出さない。原因、証拠、解決、真相、章末フック、背景小道具にも使わない。
- 以前の指示や台帳にキャンペーンカード系が残っていても、最新のv4.8.5台帳で上書きし、棚札、紙レシート、現金差異、紙の納品書、包装、段ボール、苦情票、シフトメモ、証言へ置換する。
- 読者を引っ張る力は、店内で見える行動、会話のズレ、返金や謝罪の気まずさ、数字や棚札の食い違い、常連客の割り込みで作る。
${isRetry ? '- 再生成時は、直前に出たスタンプ/カード/キャンペーン/景品ルートを非正史として完全に捨てる。別名で再利用しない。\n' : ''}`;
}

function buildCardboardHiddenPaperRouteBan({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.5 段ボール隠し紙ルート禁止 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章で段ボール、箱、缶、包装を使う場合、それは片付け対象・商品包装・納品物として扱う。中や裏から紙、メモ、写真、鍵、カード、古い物が落ちて謎になる展開にしない。
- 証拠が必要なら、箱の中から発見せず、レジ横の紙レシート、納品書の束、棚札、苦情票、シフトメモ、包装ラベル、客/店主の証言として最初から見える場所に置く。
- 箱・缶・段ボールは章末フックにしない。章末は、返金、謝罪、棚札訂正、納品書照合、現金確認、客の一言で引っ張る。
${isRetry ? '- 再生成時は、箱の裏・箱の中・古びた缶から紙が出る筋を完全に捨て、見える紙書類と対面会話へ移す。\n' : ''}`;
}

function buildContinuationExpansionLock({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.5 継続本文増量固定 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章の続きを書く時は、既出本文の冒頭、末尾、同じ段落、同じ説明を一切貼り直さない。新しい本文だけを追加する。
- 最初の一文は、直前の最後の状況の次の行動から始める。要約、章題、プロット、文脈メモ、ここまでの文字数、同じ結末段落を出さない。
- 継続一回ごとに、最低二千字相当の新しい場面、会話、紙の証拠確認、謝罪/返金、棚札/納品書/包装の作業を増やす。本文量が増えない出力は禁止。
${isRetry ? '- 直前の継続で本文量が増えなかった場合、同じ文を再出力せず、まったく別の現在進行の店内行動から続ける。\n' : ''}`;
}

function buildSelectedGenrePurificationContract({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.6 選択ジャンル純化 / 本文には出力しない】
- 面白さは選択ジャンルそのものを極める。ギャグ/コメディは笑いとタイミング、シリアスは重さ、サスペンスは緊迫、ミステリーは推理、恋愛は関係変化、ホラーは恐怖、アクションは身体的危機で読者を引っ張る。
- 実務上の危機、信用、締切、人間関係の変化は、選択ジャンルの芯に合う時だけ使う。全ジャンルを職場危機・日常コメディ・サスペンスへ寄せない。
- 第${Number(chapterNum) || 1}章では、選択ジャンルに合わない強いテンプレートを便利な牽引力として借りない。別ジャンルの大ネタで面白さを代替しない。
${isRetry ? '- 再生成時は、直前の失敗ジャンル、失敗小道具、失敗解決ルートを完全に捨て、選択ジャンル内の牽引方法だけで組み直す。\n' : ''}`;
}

function buildPastPromoPaperBundleBan({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.6 過去販促紙束ルート禁止 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章では、古い棚札の束、色褪せたチラシ、謎のキャンペーンPOP、過去キャンペーンの残骸、スタンプラリー指示書、販促物の紙束を、原因・証拠・解決・章末フックにしない。
- 段ボールや箱を開けても、そこから古い紙束や販促資料が出て真相になる展開は禁止。段ボールは片付け・納品・包装ミスだけに使う。
- 必要な紙は、現在の棚札、紙レシート、現金確認票、紙の納品書、苦情票、シフトメモ、包装ラベルとして、最初から見える店内実務に置く。
${isRetry ? '- 再生成時は、古い販促紙束・スタンプラリー・キャンペーンPOPを非正史として捨て、棚札/レシート/納品書/苦情票/証言へ置換する。\n' : ''}`;
}

function buildOpeningReplaySecretShelfBan({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.8 章頭再演・秘密棚ルート事前禁止 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章は、前章本文の冒頭・説明段落・会話・比喩・段落順を貼り直さない。前章の状況説明は最大一文だけにし、最初の800字以内に新しい現在の店内行動、客の割り込み、店長の発言、紙の証拠の手渡し、棚札/現金確認/納品書/包装ラベル作業のどれかを出す。
- 「秘の棚」「秘密の棚」「奥の謎棚」「得体の知れないガラクタ」「謎の応募用紙」「謎のキャンペーン」「幻の限定品」「伝説の景品」「密輸」「暗号」「秘密の取引」は、原因・証拠・解決・章末フック・比喩にしない。別名で再利用しない。
- バックヤードや棚を使う場合は、普通の備品棚・納品棚・掃除対象として扱う。中から謎を取り出さず、現在の棚札、紙レシート、現金確認票、紙の納品書、苦情票、シフトメモ、包装ラベル、客/店主の証言に戻す。
- ドタバタの牽引は、客の列、会計ミス、返金、謝罪、棚札訂正、納品数の食い違い、店長の雑な言い間違い、同僚の誤解で作る。秘密感で読者を引っ張らない。
${isRetry ? '- 再生成時は、直前の失敗冒頭と、秘密棚/謎紙/景品/密輸/暗号の機能を完全に捨てる。第一段落から別の店内行動で開く。\n' : ''}`;
}

function buildGenreNativeDriveContract({
  chapterNum = 1,
  genreLabel = '未指定',
  primaryDrive = '',
  isRetry = false,
} = {}) {
  return `
【v4.8.9 選択ジャンル本来の牽引力 / 本文には出力しない】
- 現在の選択ジャンル: ${genreLabel}。ジャンルを別ジャンルへ丸めない。ギャグはギャグ、シリアスはシリアス、サスペンスはサスペンスとして極める。
- 第${Number(chapterNum) || 1}章の主推進力: ${primaryDrive}
- 実務上の危機、信用、締切、人間関係の変化は、選択ジャンルがそれを要求する場合だけ使う。すべての作品を職場危機、日常コメディ、サスペンスへ寄せない。
- 未選択の強いテンプレートを読者牽引の代用品にしない。大ネタを借りず、選択ジャンル内の行動、会話、物証、感情、選択で次章を読みたくさせる。
${isRetry ? '- 再生成時は、直前の失敗ルートを名前だけ変えて再利用せず、選択ジャンル本来の牽引力を強める方向へ完全に組み替える。\n' : ''}`;
}

function buildCampaignPriceCauseBan({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.9 キャンペーン価格・販促価格原因化禁止 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章では、キャンペーン価格、販促価格、期間限定価格、メーカー都合の値引き、特別提供、値引き施策を、価格差・現金差異・棚札矛盾・信用危機の原因や説明にしない。
- 価格差が必要なら、店内の手書き棚札の貼り替え漏れ、紙レシートと棚札の不一致、紙の納品書/現金確認票の見間違い、店長の伝達漏れ、包装ラベルの読み違いだけで作る。
- 「キャンペーン」という語を使わず、値引きや販促の話に逃げない。読者を引っ張る力は、レジ前の気まずさ、客の列、謝罪、返金、棚札訂正、同僚の誤解で作る。
${isRetry ? '- 再生成時は、キャンペーン価格/販促価格/期間限定価格を非正史として捨てる。原因を棚札・紙レシート・納品書・現金確認票・伝達漏れ・包装ラベルへ置換する。\n' : ''}`;
}

function buildContinuationStallBan({
  chapterNum = 1,
  isRetry = false,
} = {}) {
  return `
【v4.8.9 継続停滞禁止 / 本文には出力しない】
- 第${Number(chapterNum) || 1}章の継続応答は、既出本文の冒頭・末尾・同じ段落を再出力しない。返すのは新しい本文だけ。
- 先頭は、直前の最後の文の次の物理行動、客の発話、レジ/棚/納品書/現金確認票/包装ラベルの作業から始める。
- 文脈メモ、章題、ここまでの文字数、同じ説明、同じ終わり方だけを返さない。最低二千字相当の新しい行動/会話/紙証拠/謝罪/返金/棚札作業を追加する。
${isRetry ? '- 前回の継続で本文量が増えなかった場合、前文を再掲せず、別の現在進行の店内行動に切り替える。\n' : ''}`;
}

function buildSelectedGenreForeshadowPayoffEngine({
  chapterNum = 1,
  genreLabel = '未指定',
  engine = '',
  payoff = '',
  isLocalComedy = false,
  isRetry = false,
} = {}) {
  const localComedyRule = isLocalComedy
    ? '- ローカルコメディでは、レジ前の誤解、客の列、棚札、紙レシート、現金確認票、紙の納品書、包装ラベル、苦情票、シフトメモ、客/店主の証言、謝罪、返金、後始末だけでフリとオチを作る。販促、限定商品、幻の商品、秘密在庫、過去イベント、伝説品を原因・証拠・解決・章末フックにしない。\n'
    : '';

  return `
【v4.9.0 選択ジャンル・フリ回収エンジン / 本文には出力しない】
- 現在の選択ジャンル: ${genreLabel}。第${Number(chapterNum) || 1}章は、冒頭のフリを選択ジャンルの駆動装置で進め、章内で回収/オチ/代償まで着地させる。
- 駆動装置: ${engine}
- 回収方法: ${payoff}
- 品質検出は終了理由ではない。外れた素材が出た場合、止めずにその場で選択ジャンルの駆動装置へ置換し、必要文字数を満たす完成稿へ再構成する。
${localComedyRule}${isRetry ? '- 再生成/修復時は、直前の失敗ルートを非正史として捨てる。人物関係と直近の正史状態だけを残し、原因・証拠・解決・章末フックを選択ジャンルの駆動装置で作り直す。\n' : ''}`;
}

function buildChapterDesignLedgerContract({
  genreLabel = '未指定',
  selectedAxes = '未指定',
  totalChapters = 'ヘッダーで決めた全章数',
  genreBeats = [],
  chapterPlanRule = '',
  previousCanonState = '',
  isRetry = false,
} = {}) {
  return `
【v4.9.3 章設計台帳 / 本文には出力しない】
- これは修正用の後処理ではない。本文を書く前に、章の始まり、章の結論、次章へ渡すメモを先に決めるための台帳である。
- 選択ジャンル: ${genreLabel}
- 選択軸: ${selectedAxes || '未指定'}
- 全章数: ${totalChapters}
- ジャンル別の章骨格: ${genreBeats.join(' → ')}
${chapterPlanRule}
- 伏線、小物、人物の入退場は「大量の記憶」ではなく小さな台帳で管理する。各章で使うものだけを現在化し、使わないものはメモへ戻す。
- 章の冒頭と結論のつじつまを最優先する。冒頭で置いたフリ、証拠、感情、違和感、小物のうち少なくとも一つを章末で意味変化・回収・代償にする。
- 次章へ渡すのは、最終章まで引っ張る大伏線ではなく「次章冒頭で実際に使える現在状態」にする。
- 選択ジャンルがコメディではない場合、便利な笑い、ドタバタ、店内実務オチへ逃げない。選択ジャンル自身の緊張、欲望、恐怖、恋愛、謎、行動、痛みで章を閉じる。
- 選択ジャンルがコメディの場合だけ、フリとオチを笑いで閉じる。その場合も舞台の小物と人物関係から作り、未選択の陰謀、伝説品、秘密装置、研究施設、世界規模ネタを原因・証拠・解決にしない。
- 失敗稿や再生成前の出力は正史ではない。正史は保存済み章と文脈メモだけ。
${isRetry ? '- 今回は前回の失敗文を直すのではなく、上の台帳から章を最初から組み直す。\n' : ''}
【正史の直前状態】
${previousCanonState}
`;
}

function buildDailyComedyInternalInstruction({
  chapterNum = 1,
  laughBeats = [],
  isLate = false,
  isFinal = false,
  isRetry = false,
  includeOpeningShoppingStreetAnchor = false,
  forbidTeaserEnding = false,
} = {}) {
  const chapter = Number(chapterNum) || 1;
  const shoppingStreetAnchor = includeOpeningShoppingStreetAnchor && chapter === 1
    ? '- 第1章の冒頭千二百字以内に、商店街、アーケード、隣の店舗、店主、常連、町内の貼り紙のうち二つ以上を必ず入れること。コンビニ店内だけで閉じず、商店街軸を最初から見せること。\n'
    : '';
  const lateRule = isLate
    ? '- 後半章では、封筒・借金・返済・百円不足の話を新しい謎として蒸し返さないこと。間違ったシール、印刷ミス、棚札訂正、現金確認、段ボール取り違え、気まずい告知、小さな返金など、店内で見える実務コメディとして閉じること。\n'
    : '';
  const finalRule = isFinal
    ? '- 最終章は、会話か人前の行動で笑える着地を作り、最後に小さな実務の残りを一つだけ置くこと。抽象的な団結・真実・希望・未来の要約だけで終えないこと。\n'
    : '';
  const endingRule = forbidTeaserEnding
    ? '壮大な感情まとめや「どうなるのか」「幕を開ける」「まだ知らなかった」式の予告ではなく、未処理の小さな実務、会話のずれ、小道具の失敗、気まずい謝罪のいずれかで閉じること。'
    : '壮大な感情まとめではなく、未処理の小さな実務、会話のずれ、小道具の失敗、気まずい謝罪のいずれかで閉じること。';

  return `
【v4.7.3 日常コメディ内部指示・本文出力禁止】
- この章は、整合性だけでなく、読者が具体的な店内コメディ場面を指させる面白さを持たせること。
- 冒頭五百字以内に、レジ、棚、値札、倉庫、段ボール、苦情票、レシート、手書きシフトメモ、客の列のいずれかを使った目に見える店内行動を置くこと。
${shoppingStreetAnchor}- 第${chapter}章の必須笑い要素: ${laughBeats.join(' / ')}。少なくとも三つを本文内で場面化すること。勘違い、気まずい謝罪、人前の赤面、短いやり取り、客や店主の割り込み、悪いタイミング、小道具ギャグを優先すること。
- 深刻な手がかりを出す場合も、三段落以内に店内の笑いか実務トラブルで受けること。真実・未来・核心・決定的・告白のような重い語だけで章を進めないこと。
- 章末は、${endingRule}
${lateRule}${finalRule}${isRetry ? '- 再生成時は、失敗した重い要約や蒸し返しルートを完全に捨てること。別名で再利用せず、上記の笑い要素から組み直すこと。\n' : ''}- この内部指示や項目名を本文に出力しないこと。
`;
}

function buildDailyComedyChapterLedger({
  chapterNum = 1,
  beats = [],
  isRetry = false,
} = {}) {
  return `
【日常コメディ章別台帳・本文出力禁止】
- 第${Number(chapterNum) || 1}章は、次の店内ビートを使うこと: ${beats.join(' / ')}。
- 冒頭は、レジ、棚、包装、段ボール、客の列、シフトメモ、レシート、納品書、現金確認、苦情票、包装ラベルのどれかの具体行動から始めること。
- 箱の封印、秘密メッセージ、密輸、秘密結社、教団、古地図、古い鍵、選ばれた人物、地下施設、歴史陰謀を選ばないこと。
- 原因は人間のミス、嘘、勘違い、悪いタイミング、小さな未払い、実務上の損失に限ること。解決は謝罪、証言、レシートやメモや納品書、棚や包装の訂正、返金、告白にすること。
${isRetry ? '- 再生成時は、失敗した秘密・箱・暗号・密輸ルートを捨て、店内実務ビートから書き直すこと。\n' : ''}- この台帳を本文に出力しないこと。
`;
}

function buildLongNovelProseQualityContract({
  inheritsPreviousCost = false,
} = {}) {
  const finalBeat = inheritsPreviousCost
    ? "Make this chapter inherit the previous chapter's cost, then create a new cost that changes the next chapter's options."
    : "Make the chapter's best scene alter the next chapter's available options.";

  return `
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
- ${finalBeat}`.trim();
}

function buildFinalChapterStateLock() {
  return `
FINAL CHAPTER STATE LOCK (never output this heading):
- Treat every event completed in the immediately previous chapter as already finished fact. Do not replay it, rewind it, call it a hallucination, add a second quota, or repeat the same countdown, attack, collapse, confession, contract, rescue, victory, or defeat.
- If the previous chapter already completed the central task, final chapter must begin after that result and write aftermath, consequences, final choice, emotional settlement, and remaining foreshadowing payoff only.
- The final chapter must not solve continuity by denying the previous chapter. Continue from it.`.trim();
}

function buildMidStoryCanonStateLock() {
  return `
MID-STORY CANON STATE LOCK (never output this heading):
- Treat saved chapters and context memos as the only canon; failed retry drafts and old outline beats are not canon.
- Before drafting, internally list the immediately previous chapter's final place/time, character injuries, lost or destroyed items, fired weapons, deaths/exits, handoffs, and unresolved crisis.
- Start after that state. Do not replay, rewind, undo, hallucinate, or re-stage completed trigger pulls, injuries, item destruction/loss, arrivals, escapes, awakenings, system shutdowns, or public collapses.
- If a hand, item, weapon, body part, device, or route was destroyed, lost, burned, broken, disabled, or spent in saved canon, it cannot function normally or reappear intact in this chapter.
- This is not the final chapter: keep the central system/core/conspiracy active or only partially damaged, and end on a new unresolved pressure rather than victory or aftermath.
- System/core actions in this chapter must be attempts, partial/local damage, decoys, lockouts, or new failsafes; never a successful total shutdown/destruction/collapse.`.trim();
}

export {
  buildAlwaysOnAxisEscapeLock,
  buildAnalogCarrierLedgerContract,
  buildBioDeviceCultHardGuard,
  buildCardboardHiddenPaperRouteBan,
  buildChapterCarrierRotationContract,
  buildChapterBoundaryAntiReplay,
  buildChapterDesignLedgerContract,
  buildCampaignPriceCauseBan,
  buildContinuationExpansionLock,
  buildContinuationStallBan,
  buildCreativeElasticity,
  buildDailyComedyChapterLedger,
  buildDailyComedyInternalInstruction,
  buildDomesticComedyToneGuard,
  buildEvidenceHandoffStateLock,
  buildFalseRoutePurgeContract,
  buildFirstDraftAntiTemplateCarrierLock,
  buildFinalCoreAfterglowGuard,
  buildFinalForceCloseElasticity,
  buildGlobalAnalogMysteryContract,
  buildGenreNativeDriveContract,
  buildHardGatesAndEffortGoals,
  buildHiddenBoxLegendPrizeClosure,
  buildLateStageEscapeRouteLock,
  buildLateStageTemplateRecovery,
  buildFinalChapterStateLock,
  buildLocalScaleCategoryGuard,
  buildLocalComedyChapterBeatPlan,
  buildLocalComedyEntertainmentSpine,
  buildLocalComedyFreshSceneContract,
  buildLocalComedyAllowedLedgerRealignment,
  buildLocalComedyStoreWorkMeansLedger,
  buildLocalComedySurfaceLedger,
  buildLongNovelProseQualityContract,
  buildMidStoryDigitalLabCoreGuard,
  buildMidStoryCanonStateLock,
  buildNovelAiSmellRemoval,
  buildOpenAiFirstChapterProseKickoff,
  buildOpenAiInitialLongPlanProseOverride,
  buildOpeningReplaySecretShelfBan,
  buildPastPromoPaperBundleBan,
  buildPhysicalEvidenceClarification,
  buildPlainRegisterWordingLock,
  buildPosRegisterDataFallbackGuard,
  buildProjectAiEscapeGuard,
  buildResearchExperimentTemplateBan,
  buildRepairLengthPreservationContract,
  buildSelectedGenreDriveContract,
  buildSelectedGenreForeshadowPayoffEngine,
  buildSelectedGenreIntensificationContract,
  buildSelectedGenrePurificationContract,
  buildSelectedAxisAdherenceGuard,
  buildShoppingStreetAnchorContract,
  buildStampCardEngineBan,
  buildStoreOperationMistakeLock,
  buildStorySpecificAllowedMeansLedger,
  buildTemplateInvasionPrevention,
  buildUnselectedMemoryTemplateGuard,
};
