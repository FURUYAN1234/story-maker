# Story Maker Handoff

This file is public-repository safe. Do not include API keys, private credentials, billing data, private tokens, personal local paths, or unreleased account details.

## 2026-06-18 Long-novel structural-bug fixes (v5.1.7)

### Follow-up: format gate + causality-aware review scoring (2026-06-18)

- Added a pre-review `formatAudit` gate in `src/longifyBeta.js` for both `runLongifyBeta` and `runLongifyBrushupBeta`.
- Final assembled text is now audited before `auditLongifyStructure` and before AI critique. If residue is cleanable, chapters are rewritten through `cleanLongifyDraft` and re-audited; if residue remains, the run returns `reviewSource: "format"` instead of sending a polluted manuscript to AI critique.
- AI review prompts now receive a required structural/format deduction block. It explicitly asks the reviewer to penalize broken timeline, scene re-enactment, weak causal deltas, uncollected setup/payoff, weak climax obstacle, and remaining 4-koma/script/augmentation/title residue.
- AI review display now carries `formatAudit` details and caps visible AI score at 69 when format or structure audit fails. The review panel/status now treats `format` like `structure`/`failed` so local NG cards are not reused as prior AI critique.
- Regression tests were added for `auditLongifyFormat`, the score cap, review preservation for `format`, returned `formatAudit` on longify/brush-up results, and the real browser leak shape `「4コマ漫画風長編化・本編差し込み追加本文」`.
- Local verification passed after the final patch: `node --test "tests/**/*.test.js"` (55/55), `npm run check:generic-rules`, `npm run build` (existing >500 kB chunk warning only), and `git diff --check` on touched files (LF/CRLF warning only).
- Real in-app Browser OpenAI run on port 5179 with user-entered key, 10,000-char target, auto brush-up off: completed 3 chapters, 10,780 submission chars, visible `形式チェック: 合格`, visible `構造チェック: 合格`, AI review 76点. Progress showed chapter/top-up format cleanup firing in the live run. AI review explicitly flagged the desired structural weakness: weak `因果差分`, blurred story propulsion, weak setup/payoff/climax concentration, and chapter-specific fixes.
- The same browser run exposed one new final-output residue after the displayed pass: `「4コマ漫画風長編化・本編差し込み追加本文」`. This was patched immediately. Re-audit of the captured browser output with the patched cleaner reports `hasFormatArtifactsBeforeClean === true`, `cleanedHasFormatArtifacts === false`, and the quoted meta heading absent after cleaning. A fresh full API rerun after this tiny detector patch has not been run yet to avoid extra API spend.
- Do not deploy/tag until the user approves.

### Status

- Fixed structural bugs in longify beta (`runLongifyBeta` in `src/longifyBeta.js`) that prose/critique passes could not see. Version bumped 5.1.6 -> 5.1.7 before this verification session.
- All 55 unit tests pass (`node --test "tests/**/*.test.js"`); `npm run build` and generic-rules guard pass after the final follow-up patch.
- Real in-app Browser OpenAI verification on 2026-06-18 used the user-entered key only through the UI. A 10,000-char run with auto brush-up off completed at 10,225 displayed chars / 10,198 generated chars in the progress log, 3 chapters, visible `構造チェック: 合格`, local final re-audit `auditLongifyStructure.ok === true`, and AI review 82点. The review explicitly judged the story axis (`芯`, `一貫`, `因果`, `伏線`, `場面転換`) and still identified literary improvement points, not structural gate failures.
- Manual next brush-up was also run in-app. It expanded to 30,573 chars / 6 chapters and structure check passed, but the score stayed 82点 (no score gain). The captured output exposed remaining format leaks: parenthesized script speaker labels such as `（澪）「...」`, storyboard/4-koma parenthetical notes, and `増補本文` meta lines. These exact leaks are now detected/cleaned and pinned in `tests/longifyBeta.test.js`; the captured brush-up output is artifact-positive before `cleanLongifyDraft` and artifact-free after cleanup. Do not deploy/tag until the user approves.

### What changed

- New pure module `src/longifyContinuity.js` (+ `tests/longifyContinuity.test.js`).
- **A. Re-enactment loop (main cause):** `summarizeForContinuity` no longer returns a content-free boilerplate; it builds a real per-chapter digest (ending state / key events / consumed place×action beats). Digests are accumulated and rendered into every chapter prompt via `renderRollingMemo` (was: last-chapter boilerplate, overwritten each chapter).
- **C. Loop detection:** `detectLongifyChapterOverlap` now also runs `detectParaphrasedOverlap`. Live regeneration gate uses the language-aware beat signal only (`useShingle:false`) to avoid false positives on non-Japanese/uniform text; fuzzy shingle similarity is used in the non-blocking audit.
- **B. Setting drift (学年/ランドセル↔中学):** ledger prompt now emits a frozen `不変設定` block; `extractInvariants` parses it, it is injected into every chapter prompt, and `detectSettingContradiction` gates chapters.
- **D. Truncation (尻切れ "「うーん」と考"):** `isLikelyTruncated` (terminal-punctuation heuristic; finishReason is dropped by the streaming provider layer so it is not relied on) drives an auto-continuation loop (`buildLongifyChapterContinuationPrompt`, ≤3 attempts). Final chapter must close or the run errors instead of silently accepting a cut-off.
- **E. Blind critique:** `auditLongifyStructure` runs on the assembled manuscript before the AI review, reported via `onStage` and returned as `result.structureAudit` (non-blocking; does not alter the literary score path).
- **F. Storyboard/script/augmentation residue after OpenAI proof:** Real OpenAI runs still produced `1コマ目の後...` / no-separator 4-koma storyboard residue, then a later 30k brush-up produced `（澪）「...」` parenthesized speaker labels and `増補本文` meta despite structure pass. Follow-up patches now detect and clean panel-lead residue, inline speaker-dialogue residue, parenthesized speaker labels, no-separator storyboard preludes, parenthesized 4-koma/end-card directives, duplicate in-body titles, and augmentation-meta lines before critique; regression tests pin the exact leaked shapes.

### Notes / follow-ups

- finishReason is NOT wired through `streamTextCall`/`zs` (minified provider). Truncation relies on the punctuation heuristic, which covers the observed failure. Wiring finishReason would be a stronger signal but touches minified `providerClients.js`.
- Plan/diagnosis: `docs/codex_longnovel_bugfix_plan.md`.
- Existing integration fixtures that reused one filler sentence across chapters were made distinct, and one bridge-format assertion updated (`第1章までの接続` → `第1章の確定`).
- Latest OpenAI AI review still found literary improvement points, not structural gate failures: explanation-heavy scenes, weak/abstract scene turns, weak late emotional deepening, and insufficient symbolic payoff. Treat this as next brush-up quality work, not as proof that the structural bug gate failed.
- The next brush-up did not raise the score in the observed run (82 -> 82), so do not claim that the brush-up quality loop is proven to improve score yet. The evidence does prove that structure audit is visible and that the latest captured format leaks are now guarded in code/tests.

## 2026-06-17 Gemini Longify Brush-Up Regression Handoff

### Status

- Current work is NOT passing and should be treated as a regression, not a successful improvement.
- User-visible result after the latest Codex structural patch got worse: real in-app Browser Gemini API proof showed `AI score 45`, not 80+.
- Do not deploy, tag, release, or backup this state.
- Do not claim "pass" unless a fresh real in-app Browser Gemini API run returns AI review score `80+`.
- The active browser run was stopped by reload after saving evidence, to avoid continuing to spend API calls.

### Evidence From Latest Browser Run

- URL used: `http://127.0.0.1:5179/?codexGeminiEventOwnership=20260617&qaOutputFile=/scratch/gemini-low-score-40-source-20260617.txt`
- App title: `Story Maker v5.1.2`
- Engine label: `Gemini API`
- First pass output:
  - AI score observed in banner: `45`
  - submission chars: `30,838`
  - chapter count: `6`
  - footer count: `1`
  - manga/storyboard artifacts: `3`
  - offending visible pattern included Markdown-wrapped panel headings such as `**1コマ目**`, `**3コマ目**`, `**4コマ目**`.
- Auto second pass started but was stopped before completion:
  - ownership plan was prepared.
  - ownership enforcement and uniqueness audit had not run yet when evidence was captured.
  - progress showed short chapter rewrites and failed expansion attempts, e.g. chapter 1 ended around `3,828` chars and expansion retries produced only tiny non-adoptable additions.
  - chapter 2 repeatedly hit script/dialogue-form cleanup and short expansion failures.
- Saved evidence:
  - `scratch/gemini-event-ownership-regression-handoff-20260617.json`
  - `scratch/gemini-event-ownership-regression-handoff-output-20260617.txt`

### What Codex Changed In The Current Uncommitted Diff

- `src/longifyBeta.js`
  - Added Gemini-only prose gates and compression behavior changes.
  - Added deterministic event ownership ledger functions:
    - `buildLongifyEventOwnership`
    - `buildLongifyOwnedWindowConstraint`
    - `detectLongifyOwnershipViolations`
    - `enforceLongifyEventOwnership`
    - `auditLongifyChapterUniqueness`
  - Added ownership prompt injection and local postprocessing for Gemini brush-up.
  - Changed compression thresholds and chapter/top-up attempt behavior.
  - Added additional format cleanup checks for script/dialogue/meta artifacts.
- `src/providerClients.js`
  - Added Gemini `systemInstruction` support for normal and streaming calls.
- `tests/longifyBeta.test.js`
  - Added many local tests for ownership, compression, source fallback, expansion, and format cleanup.
- `tests/providerClients.test.js`
  - Added tests for Gemini `systemInstruction`.

### Verification That Passed Locally

- `node --check src\longifyBeta.js`
- `node tests\longifyBeta.test.js`
- `node tests\providerClients.test.js`
- `npm run lint --if-present`
- `npm run build` passed with the existing large chunk warning.

These local checks were insufficient; the real Gemini browser run still failed and regressed.

### Known Mistakes / Root Cause Notes

- Codex initially gated event ownership so it did not run in compression mode. The real sample is about `37,266` submission chars targeting `30,000`, so compression mode was active. This meant the first ownership attempt was effectively bypassed. That gate was later removed, but the overall patch still failed.
- The latest patch was too broad and changed too many moving parts at once. It made it harder to isolate the true failure.
- A concrete format-cleanup bug remains: `LONGIFY_MANGA_PANEL_HEADING_PATTERN` catches plain `1コマ目`, but does not catch Markdown emphasis wrappers such as `**1コマ目**`. That allowed manga/storyboard artifacts into the final output.
- Local source restoration / compression / ownership backfill paths must reject or clean artifact-bearing units after every local append or fallback. Do not assume only Gemini raw output can contain manga/script labels.
- The ownership ledger plan is visible in progress, but that alone does not prove the final manuscript was structurally fixed.

### Recommended Next Action

1. Consider reverting or shelving the current oversized structural diff before continuing. At minimum, do not build further on it without first isolating the regression.
2. Fix the narrow confirmed artifact leak first:
   - update panel-heading cleanup/detection so Markdown-wrapped labels like `**1コマ目**`, `__1コマ目__`, and full-width variants are removed/rejected.
   - add a unit test directly against `cleanLongifyDraft('**1コマ目**\n本文')` and final manuscript validation.
3. Audit all local fallback append paths:
   - `compactLongifyChapterForFinalFallback`
   - `restoreGeminiCompressionDeficitFromSourceChapters`
   - ownership backfill in `enforceLongifyEventOwnership`
   - uniqueness backfill in `auditLongifyChapterUniqueness`
   - top-up append paths
   Every unit added from source or model output must pass artifact filtering after Markdown wrapper stripping.
4. Only after format artifacts are back to zero should structural scoring be reattempted.
5. If Opus/Claude takes over, give it this file plus the two saved evidence files above. Ask it to produce a smaller patch plan, not another broad rewrite.

### Guardrails For The Next Agent

- Do not ask the user to paste API keys. The user enters keys in the app UI only.
- Do not deploy or backup unless the user explicitly asks.
- Do not claim success from tests alone. Passing means real in-app Browser Gemini API AI review score `80+`.
- Keep score regression guard, 30,000-char minimum, manga/script rejection, and API top-up suppression.
- Prefer small patches with one browser proof after each meaningful change.

### Follow-up 2026-06-17: Broad diff shelved, narrow artifact fix applied on HEAD

- The oversized structural event-ownership diff (~2,028 lines in `src/longifyBeta.js` plus provider/test changes) was shelved via `git stash`, NOT deleted, to restore a clean HEAD baseline and stop confounding browser verification.
  - Recover the shelved work with `git stash pop`, or isolate it with `git stash branch <name> stash@{0}`. (Stash refs are positional; confirm with `git stash list` before popping.)
- Root cause re-scoped: the `45` score was dominated by a pre-existing artifact fail-open, not proof that the ownership approach is wrong. The structural hypothesis was never cleanly tested because manga labels polluted the manuscript first.
- Narrow fix applied on HEAD (`src/longifyBeta.js`, +14/-2):
  - Added `stripLongifyLineEmphasis()` and made manga panel-heading detection tolerant of Markdown emphasis wrappers (`**1コマ目**`, `__...__`, full-width `＊＊...＊＊`).
  - Applied only in `cleanLongifyDraft` and `longifyFormatArtifactIssues` (the cleaner and the guard). No change to deletion behavior, score regression guard, 30,000-char floor, manga/script rejection scope, or API top-up suppression.
- Added 4 unit tests in `tests/longifyBeta.test.js`: wrapper-line cleanup, wrapped detection, full-width detection, and inline-bold non-false-positive.
- Local verification passed: `node --check src/longifyBeta.js`, `node tests/longifyBeta.test.js`, `node tests/providerClients.test.js`, `npm run lint`, `npm run build` (existing large-chunk warning only).
- NOT a pass. Still requires a fresh real in-app Browser Gemini run to confirm manga/storyboard artifacts == `0`, then decide whether to reintroduce structural pieces in small, individually browser-verified increments.
- No deploy, no backup performed.

## 2026-06-13 v5.0.4 Release State

### What Changed

- Restored smooth typewriter-style live preview for standard public generation so large provider chunks are shown progressively in the output box.
- Kept output-panel auto-scroll anchored to the live manuscript, preventing jumps into the style analyzer area during streaming and final rendering.
- Added standard-generation progress signals for current phase, dialogue count, sensory detail count, and choice/action signals.
- Hardened public narrative cleanup and quality checks for medium stories so completed drafts are not followed by a restarted `タイトル:` / `第1節` second draft, and trailing title-only artifacts are removed before the footer.
- Bumped public release identity to v5.0.4.

### Verification

- `node --check` passed for the changed JavaScript files.
- `node tests/outputCleanup.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed with only the existing LF-to-CRLF warnings.
- `npm run build` passed with the existing large chunk warning.
- `npm run deploy` published GitHub Pages.
- `origin/gh-pages:index.html` and the live GitHub Pages URL returned `Story Maker v5.0.4` with asset `index-Dn5sh9Zx.js`.
- No full workspace backup was run because this task was deploy-only.

## 2026-06-13 v5.0.2 Release State

## 2026-06-13 Style Analyzer Progress Log Split

### What Changed

- Added `src/styleAnalyzerProgressLog.js` and moved style-rewrite progress-log string assembly out of the nested `b()` function in `src/legacyMain.js`.
- `src/legacyMain.js` now keeps DOM assignment and scroll syncing local while delegating the history/transient/detail text formatting to `formatStyleRewriteProgressLog(...)`.
- Added `tests/styleAnalyzerProgressLog.test.js` to pin empty output, history-line trailing newline, transient-line formatting, and detail-block separation.
- Style analyzer rewrite API calls, streaming handling, fallback handling, progress scrolling, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerProgressLog.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title shows `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - style analyzer section, progress log, and reflect button render;
  - no Vite error overlay or parse overlay is present;
  - current browser error log is empty.

## 2026-06-13 Style Analyzer File Count Label Split

### What Changed

- Expanded `src/styleAnalyzerTextEntry.js` with `countStyleAnalyzerTextFileChars(...)` and `createStyleAnalyzerFileCountLabel(...)`.
- `src/legacyMain.js` now delegates the style-analyzer text-file count/character label to the helper while keeping file-list DOM updates and remove handlers local.
- Expanded `tests/styleAnalyzerTextEntry.test.js` to pin total character counting, localized count labels, empty arrays, and null input handling.
- Style analyzer file intake, direct-text entry creation, file-list rendering, API calls, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerTextEntry.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/control smoke on `http://127.0.0.1:5179/` confirmed:
  - title shows `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - style analyzer section renders and direct text input still enables the add-text button;
  - API-unset smoke tab keeps `.settings-panel.disabled-panel` with `pointer-events: none`;
  - no Vite error overlay or parse overlay is present;
  - current browser error log is empty.

## 2026-06-13 Style Analyzer Direct Text Entry Split

### What Changed

- Added `src/styleAnalyzerTextEntry.js` and moved direct-style-text entry construction out of `src/legacyMain.js`.
- `src/legacyMain.js` now delegates trimming, sequential entry naming, and character-count calculation to `createDirectStyleTextEntry(...)` while keeping the `Pe` array mutation, field clearing, list rerender, and button refresh local.
- Added `tests/styleAnalyzerTextEntry.test.js` to pin blank-input rejection, whitespace trimming, sequential `直接入力テキスト_N` naming, and character counting.
- Style analyzer API calls, file-drop handling, list rendering, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerTextEntry.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/control smoke on `http://127.0.0.1:5179/` confirmed:
  - title shows `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - typing direct style text enables the add-text button;
  - API-unset smoke tab keeps `.settings-panel.disabled-panel` with `pointer-events: none`, so actual add-button clicking is intentionally blocked without a saved API key;
  - no Vite error overlay or parse overlay is present;
  - current browser error log is empty.

## 2026-06-13 Style Analyzer Result Formatter Split

### What Changed

- Added `src/styleAnalyzerResultFormatter.js` and moved style-analysis result text formatting out of `src/legacyMain.js`.
- `src/legacyMain.js` now keeps `Rf(...)` as a DOM wrapper that clears the error class and assigns `formatStyleAnalysisResult(...)` output to `#sa-result`.
- Added `tests/styleAnalyzerResultFormatter.test.js` to pin narrative voice, sentence style, rhetoric, dialogue, structure, unique features, anti-patterns, and fallback reproduction-prompt formatting.
- Style analyzer API calls, JSON parsing/repair, result storage, copy/download actions, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerResultFormatter.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and heading show `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - style analyzer section and result box render;
  - no Vite error overlay or parse overlay is present;
  - current browser error log is empty.

## 2026-06-13 Style Analyzer Control State Split

### What Changed

- Added `src/styleAnalyzerControlState.js` and moved style-analyzer button state decisions out of `src/legacyMain.js`.
- `src/legacyMain.js` now delegates direct-text add enablement, analyze-button enablement/label/title, and reflect-button enablement to the new pure helper module while keeping DOM reads, file arrays, API execution, and result rendering local.
- Added `tests/styleAnalyzerControlState.test.js` to pin direct text detection, text-character counting, OpenAI text-limit disabling, API/file/input readiness, and reflect-button gating.
- Style analyzer API calls, file intake, output rendering, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerControlState.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/control smoke on `http://127.0.0.1:5179/` confirmed:
  - title shows `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - style analyzer section, file list, and image list containers render;
  - with API unset and empty direct text, add/analyze/reflect controls are disabled;
  - after filling direct style text, add-text becomes enabled while analyze remains disabled because no API key is set;
  - no Vite error overlay or parse overlay is present;
  - current browser error log is empty.

## 2026-06-13 Style Analyzer List Markup Split

### What Changed

- Added `src/styleAnalyzerListMarkup.js` and moved style-analyzer text-file/image-file list HTML construction out of `src/legacyMain.js`.
- `src/legacyMain.js` now calls `createStyleAnalyzerTextFileListMarkup(Pe, Ce)` and `createStyleAnalyzerImageListMarkup(ze, Ce)` while keeping file state arrays, remove-button handlers, object URL revocation, and analyze-button state local.
- Added `tests/styleAnalyzerListMarkup.test.js` to pin text list rows, image list rows, empty input handling, escaping, and index attributes.
- Style analyzer file intake, image preview state, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerListMarkup.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - style analyzer section, text-file list, and image-file list containers render;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Character Datalist Markup Split

### What Changed

- Added `src/characterDatalistsMarkup.js` and moved the character role/personality/sex datalist HTML construction out of `src/legacyMain.js`.
- `src/legacyMain.js` now calls `createCharacterDatalistsMarkup(At, Et, void 0, Ce)` inside `et()` while keeping character card rendering, field event listeners, randomization, and state mutation local.
- Added `tests/characterDatalistsMarkup.test.js` to pin datalist markup, default sex options, empty input handling, default escaping, and custom escaping.
- Character card behavior, character randomization, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/characterDatalistsMarkup.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes remain visibly available and long-form mode remains hidden;
  - character datalists render expected option counts: roles 18, personalities 18, sex 4;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Axis Chip Markup Split

### What Changed

- Added `src/axisChipMarkup.js` and moved axis category/subchip HTML construction out of `src/legacyMain.js`.
- `src/legacyMain.js` now calls `createCategoryChipMarkup(i, Ce)` and `createSubChipMarkup(t, Ce)` while keeping all chip click handlers, state changes, randomization, and default filling local.
- Added `tests/axisChipMarkup.test.js` to pin category markup, subchip markup, empty input handling, default escaping, and custom escaping.
- Axis category rendering, subchip click behavior, public mode visibility, and long-form public sealing were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/axisChipMarkup.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visibly available;
  - the long-form mode button remains hidden and disabled;
  - default active mode is `4コマ漫画風`;
  - all seven axis category groups render visible chips and first subchips;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Mode Chip Markup Split

### What Changed

- Added `src/modeChipMarkup.js` and moved the public mode chip HTML construction out of `src/legacyMain.js`.
- `src/legacyMain.js` now calls `createModeChipMarkup(We, s.mode, Ce)` inside `Zn()` while keeping click handling, random-mode behavior, mode state mutation, and long-form sealing local.
- Added `tests/modeChipMarkup.test.js` to pin active-class placement, empty input handling, default escaping, and custom escaping.
- Public mode visibility, long-form public sealing, and mode click behavior were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/modeChipMarkup.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visibly available;
  - the long-form mode button remains hidden and disabled;
  - default active mode is `4コマ漫画風`;
  - all seven axis category groups render visible chips;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Mode Default Preset Split

### What Changed

- Added `src/modeDefaultPresets.js` and moved the mode-specific default axis preset map (`Xs`) out of `src/legacyMain.js`.
- `src/legacyMain.js` now keeps the `Je(...)` adapter local and initializes `Xs` with `createModeDefaultPresets(Je)`, so mode selection, DOM updates, and state mutation remain unchanged.
- Added `tests/modeDefaultPresets.test.js` to pin the public mode preset keys, shared default preset reuse for `default` / `4koma` / `4koma_scenario`, and representative axis indexes for every specialized preset.
- Public mode visibility, long-form public sealing, and default axis application were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/modeDefaultPresets.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visibly available;
  - the long-form mode button remains hidden, disabled, and `aria-disabled`;
  - default active mode is `4コマ漫画風`;
  - all seven axis category groups render visible chips;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Axis UI Config Split

### What Changed

- Added `src/axisUiConfig.js` and moved the axis settings UI configuration object (`mt`) out of `src/legacyMain.js`.
- `src/legacyMain.js` now creates `mt` with `createAxisUiConfig({ theme, genre, worldview, target, era, ending, narr })` while keeping all DOM wiring and state mutation local.
- Added `tests/axisUiConfig.test.js` to pin axis DOM ids, state keys, category keys, lock keys, and category object references.
- Axis randomization, lock handling, category/subchip rendering, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/axisUiConfig.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - all seven axis category groups render chips;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Initial State Factory Split

### What Changed

- Added `src/initialState.js` and moved the initial runtime state object construction out of `src/legacyMain.js`.
- `src/legacyMain.js` now keeps the version alias `ap` local and initializes `s` with `createInitialState()`.
- Added `tests/initialState.test.js` to pin default API provider, default mode, long-form state defaults, lock defaults, axis-source defaults, and fresh nested object allocation.
- Runtime state shape, API session restore/save behavior, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/initialState.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - default active mode is `4コマ漫画風`;
  - long-form mode remains hidden from visible page text;
  - API-unset state and Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Editorial Evaluation Helper Split

### What Changed

- Added `src/editorialEvaluationHelpers.js` and moved narrative method stack, quality contract, editorial evaluation prompt, evaluation JSON parser, and evaluation formatter (`Jf`, `_`, `Wf`, `np`, `op`) out of `src/legacyMain.js`.
- `src/legacyMain.js` keeps `rp` and mutable local aliases for the extracted helpers so the existing later `_` wrappers still apply.
- Added `tests/editorialEvaluationHelpers.test.js` to pin method-stack injection, quality-contract text, evaluation prompt fields, score clamping, finding limits, pass flag parsing, and formatted evaluation output.
- Editorial evaluation API flow, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/editorialEvaluationHelpers.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels and the output panel are visible;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Consistency Audit Helper Split

### What Changed

- Added `src/consistencyAuditHelpers.js` and moved the consistency-audit prompt builders/parsers (`qf`, `Ko`, `E`, `Hf`, `ep`, `rs`, `tp`) out of `src/legacyMain.js`.
- `src/legacyMain.js` keeps `pn` and mutable local aliases for the extracted helpers so the existing later `E` / `Ko` rule wrappers still apply.
- Added `tests/consistencyAuditHelpers.test.js` to pin character/world formatting, standard/long audit prompts, issue JSON extraction, repair prompt text, and fixed-issue logging.
- API request flow, contradiction repair behavior, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/consistencyAuditHelpers.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels and the generation button are visible;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Style Analyzer Prompt Split

### What Changed

- Added `src/styleAnalyzerPrompt.js` and moved the style-analyzer base prompt constant `ca` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `ca` while keeping file intake, prompt variant replacement, API calls, JSON repair, result rendering, and rewrite flow local.
- Added `tests/styleAnalyzerPrompt.test.js` to pin the analyzer JSON schema, style reproduction fields, image/low-information completion instruction, and JSON-escaping guard.
- Style analyzer behavior, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerPrompt.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels and the style analyzer controls are visible;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Character Import Prompt Split

### What Changed

- Added `src/characterImportPrompt.js` and moved the character-sheet image analysis prompt constant `yf` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `yf` while keeping drag/drop, base64 reads, Gemini vision calls, response parsing, and modal registration local.
- Added `tests/characterImportPrompt.test.js` to pin the JSON-array character extraction schema and no-markdown response contract.
- Character import API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/characterImportPrompt.test.js` passed.
- Existing helper tests and `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels and the character-sheet dropzone are visible;
  - no Vite error overlay is present;
  - current browser error log is empty.

## 2026-06-13 Long Novel Prompt Rules Split

### What Changed

- Added `src/longNovelPromptRules.js` and moved the long-form shared chapter-craft rule constant `zd` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `zd` while keeping prompt assembly and generation orchestration local.
- Added `tests/longNovelPromptRules.test.js` to pin the long-form scene-density, chapter-turn, ending-aftertaste, scene-ledger, and no-synopsis contract text.
- Prompt wording, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/longNovelPromptRules.test.js` passed.
- Existing helper tests passed, including style analyzer UI state, character import modal markup, random theme fallback, long context memo helpers, long settings formatter, style analyzer helpers, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Style Analyzer UI State Split

### What Changed

- Added `src/styleAnalyzerUiState.js` and moved the style-analyzer generating/status/reset UI helpers `Yd`, `Zs`, and `Xd` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports those helpers while keeping file intake, API calls, result rendering, and button wiring local.
- Added `tests/styleAnalyzerUiState.test.js` with a lightweight document stub to pin generating state, status updates, and reset behavior.
- Style analyzer prompts, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerUiState.test.js` passed.
- Existing helper tests passed, including character import modal markup, random theme fallback, long context memo helpers, long settings formatter, style analyzer helpers, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - style analyzer section is visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Style Analyzer Escape Helper Reuse

### What Changed

- Removed the duplicate inline HTML escape helper `va` from `src/legacyMain.js`.
- Style analyzer file/image list markup now reuses the shared `Ce` escape helper from `src/domHelpers.js`.
- No user-visible text, style analyzer API flow, public mode visibility, or long-form dev gating was intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/domHelpers.test.js` passed.
- Existing helper tests passed, including character import modal markup, random theme fallback, long context memo helpers, long settings formatter, style analyzer, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - style analyzer section is visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Character Import Base64 Helper Reuse

### What Changed

- Removed the inline character-image FileReader helper `vf` from `src/legacyMain.js`.
- Character-image import now reuses the existing `If` alias from `src/fileIoHelpers.js` for base64 reads.
- Expanded `tests/fileIoHelpers.test.js` with a FileReader stub to pin `readFileAsBase64` data-URL stripping behavior.
- Character import markup, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/fileIoHelpers.test.js` passed.
- Existing helper tests passed, including character import modal markup, random theme fallback, long context memo helpers, long settings formatter, style analyzer, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - character sheet image dropzone is visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Character Import Modal Markup Split

### What Changed

- Added `src/characterImportModalMarkup.js` and moved the character-image import confirmation modal markup builder `Cf` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `Cf` while keeping FileReader, drag/drop, API calls, modal event binding, and character registration local.
- Added `tests/characterImportModalMarkup.test.js` to pin modal structure, image thumbnail inclusion/omission, editable fields, and register/cancel controls.
- Character import parsing, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/characterImportModalMarkup.test.js` passed.
- Existing helper tests passed, including random theme fallback, long context memo helpers, long settings formatter, style analyzer, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - character sheet image dropzone is visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Random Theme Fallback Split

### What Changed

- Added `src/randomThemeFallback.js` and moved the random theme fallback helper `ff` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `ff` while keeping chip rendering, lock handling, and random-button event wiring local.
- Added `tests/randomThemeFallback.test.js` to pin non-empty fallback generation and modifier suffix behavior under deterministic random values.
- Public mode labels, axis data, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/randomThemeFallback.test.js` passed.
- Existing helper tests passed, including long context memo helpers, long settings formatter, style analyzer, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Long Context Memo Helper Split

### What Changed

- Added `src/longContextMemoHelpers.js` and moved the latest context memo extraction, next-chapter scene-plan extraction, and continuity-guard context prompt helper out of `src/legacyMain.js`.
- `src/legacyMain.js` imports the helpers and keeps a local mutable `A` alias because the existing quality-booster layer wraps that helper later in the file.
- Added `tests/longContextMemoHelpers.test.js` to pin latest memo selection, GMC+S extraction, regeneration instruction forwarding, and empty-context fallback wording.
- Long-form orchestration, API calls, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/longContextMemoHelpers.test.js` passed.
- Existing helper tests passed, including long settings formatter, style analyzer, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Long Settings Formatter Split

### What Changed

- Added `src/longSettingsFormatter.js` and moved the long-form settings formatter `rt` out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `rt` while keeping long-form orchestration, state handling, UI wiring, and API calls local.
- Added `tests/longSettingsFormatter.test.js` to pin default fallback values, specified character formatting, supplemental instruction forwarding, era-rule injection, category guide injection, and character-count chapter guidance.
- Long-form prompt wording, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/longSettingsFormatter.test.js` passed.
- Existing helper tests passed, including style analyzer, character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Style Analyzer Helper Split

### What Changed

- Added `src/styleAnalyzerHelpers.js` and moved style-analysis formatting, style rewrite prompt construction, JSON object extraction, and repaired JSON parsing helpers out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports only the style-analyzer helpers it uses directly: `Af`, `Mf`, and `ya`.
- Added `tests/styleAnalyzerHelpers.test.js` to pin style formatting, reproduction-prompt exclusion, rewrite prompt length bounds, JSON extraction, embedded-newline repair, comment/trailing-comma repair, and key-boundary parsing.
- Style analyzer UI, file/image intake, API calls, progress logging, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/styleAnalyzerHelpers.test.js` passed.
- Existing helper tests passed, including character import parsing, prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Character Import Parsing Split

### What Changed

- Added `src/characterImportParsing.js` and moved character-image AI response JSON repair/parsing plus role/personality normalization helpers out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `wf`, `$f`, and `Sf` for the character sheet image import flow while keeping FileReader, API calls, and modal DOM wiring local.
- Added `tests/characterImportParsing.test.js` to pin fenced JSON extraction, trailing-comma repair, embedded-newline repair, `(推定)` stripping, candidate normalization, and no-JSON failure behavior.
- Character UI rendering, image upload handling, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/characterImportParsing.test.js` passed.
- Existing helper tests passed, including prompt builder, era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Prompt Builder Split

### What Changed

- Added `src/promptBuilder.js` and moved the standard-mode prompt builder `Jo` out of `src/legacyMain.js`.
- `src/legacyMain.js` imports the base prompt builder as `buildPromptBase`, then keeps a local mutable `Jo` alias so the existing quality-booster wrapper can still layer on top of it.
- Added `tests/promptBuilder.test.js` to pin representative standard prompt text, time-period rule injection, lore/RAG injection, character count tags, and asset tags.
- Prompt wording, mode labels, quality-booster wrapping, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/promptBuilder.test.js` passed.
- Existing helper tests passed, including era lore, legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Era Lore Helper Split

### What Changed

- Added `src/eraLoreHelpers.js` and moved the era/worldview supplemental lore dictionary plus `df` RAG-detail builder out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports `df` from the new helper module.
- Added `tests/eraLoreHelpers.test.js` to pin representative lore lookup behavior and empty fallback behavior.
- Prompt text assembly, selected-axis behavior, public mode visibility, API handling, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/eraLoreHelpers.test.js` passed.
- Existing helper tests passed, including legacy option data, axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Legacy Option Data Split

### What Changed

- Added `src/legacyOptionData.js` and moved the public mode list, axis category lists, character seed lists, and random seed fragments out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports the legacy aliases `We`, `Un`, `Ja`, `Wa`, `za`, `Za`, `Ya`, `Xa`, `At`, `Et`, `Qa`, `es`, `ts`, `Ug`, `Fd`, `Dd`, `qg`, `Hg`, `Jg`, `Wg`, `zg`, `Zg`, `Yg`, `Xg`, `Qg`, and `ef` from the new module.
- Added `tests/legacyOptionData.test.js` to pin the mode order, Japanese public labels, and representative category/seed availability.
- Visible mode labels, randomization sources, prompt construction, API handling, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/legacyOptionData.test.js` passed.
- Existing helper tests passed, including axis prompt details, provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Axis Prompt Detail Split

### What Changed

- Added `src/axisPromptDetails.js` and moved the large prompt-detail dictionaries for genre, ending, worldview, target, and narration out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports the legacy aliases `Kd`, `Ud`, `qd`, `Hd`, `Jd`, and `pt` from the new module.
- Added `tests/axisPromptDetails.test.js` to pin representative dictionary lookups and the `ランダム`/empty fallback behavior.
- Prompt wording, mode/category data, API handling, UI labels, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/axisPromptDetails.test.js` passed.
- Existing helper tests passed, including provider clients, model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Provider Client Module Split

### What Changed

- Added `src/providerClients.js` and moved the Gemini/OpenAI text, vision, multimodal, streaming, fallback, timeout, and diagnostic client functions out of `src/legacyMain.js`.
- `src/legacyMain.js` now imports only the provider functions it calls directly: `Gd`, `Gt`, `go`, `lf`, and `yt`.
- Removed now-unused provider-only imports from `src/legacyMain.js`.
- Added `tests/providerClients.test.js` to pin provider exports, no-key fail-fast behavior, and a no-network fake-fetch Gemini request/response path.
- API key handling, retry/fallback order, request payload structure, prompt contracts, UI labels, public mode visibility, and long-form dev gating were not intentionally changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/providerClients.test.js` passed.
- Existing helper tests passed: model data, thought parsing, settings snapshot, character inference, axis state, mode default, file IO, API key, long-novel number, footer, DOM, selection, and API error helpers.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Gemini Model Value Reuse

### What Changed

- Added `GEMINI_MODEL_VALUES` to `src/data.js`, derived from `GEMINI_MODELS`.
- `src/legacyMain.js` now imports `GEMINI_MODEL_VALUES` and reuses it in Gemini text, vision, multimodal, and streaming fallback paths.
- Expanded `tests/modelData.test.js` to pin the Gemini value order.
- Model order, fallback behavior, API key handling, provider request structure, prompt contracts, UI mode labels, and long-form engine behavior were not changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/modelData.test.js` passed.
- `node tests/thoughtParsingHelpers.test.js` passed.
- `node tests/settingsSnapshotHelpers.test.js` passed.
- `node tests/characterInferenceHelpers.test.js` passed.
- `node tests/axisStateHelpers.test.js` passed.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 OpenAI Model Data Reuse

### What Changed

- Added `OPENAI_TEXT_MODELS` and `OPENAI_VISION_MODELS` to `src/data.js`.
- `src/legacyMain.js` now imports those arrays as the legacy aliases `qn` and `Ws`.
- Removed the inline OpenAI text and vision model arrays from `src/legacyMain.js`; the multimodal helper now reuses the same `Ws` vision-model order.
- Added `tests/modelData.test.js` to pin Gemini model order plus OpenAI text/vision model order.
- Model order, fallback behavior, API key handling, provider request structure, prompt contracts, UI mode labels, and long-form engine behavior were not changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/modelData.test.js` passed.
- `node tests/thoughtParsingHelpers.test.js` passed.
- `node tests/settingsSnapshotHelpers.test.js` passed.
- `node tests/characterInferenceHelpers.test.js` passed.
- `node tests/axisStateHelpers.test.js` passed.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - Gemini/OpenAI labels are visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Thought Parser Helper Split

### What Changed

- Added `src/thoughtParsingHelpers.js` for splitting streamed AI thought text from final story text.
- `src/legacyMain.js` now imports the legacy `da` alias from that helper instead of defining the parser inline.
- Added `tests/thoughtParsingHelpers.test.js` to pin closed thought tags, unfinished thought tags, metadata-label fallback, partial tag buffering, and plain-story behavior.
- API key handling, provider request behavior, prompt contracts, UI mode labels, randomization, character UI, and long-form engine behavior were not changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/thoughtParsingHelpers.test.js` passed.
- `node tests/settingsSnapshotHelpers.test.js` passed.
- `node tests/characterInferenceHelpers.test.js` passed.
- `node tests/axisStateHelpers.test.js` passed.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - output and progress panels exist;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Settings Snapshot Helper Split

### What Changed

- Added `src/settingsSnapshotHelpers.js` for axis detail formatting and generation-settings snapshot construction.
- `src/legacyMain.js` still reads DOM/state values locally, but delegates the `Dt` formatting and `Yn` settings-object construction to the new helper module.
- Added `tests/settingsSnapshotHelpers.test.js` to pin category/value/custom formatting and the generated settings snapshot shape.
- API key handling, provider request behavior, prompt contracts, UI mode labels, randomization, character UI, and long-form engine behavior were not changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/settingsSnapshotHelpers.test.js` passed.
- `node tests/characterInferenceHelpers.test.js` passed.
- `node tests/axisStateHelpers.test.js` passed.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser current-load DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - mode custom value is populated;
  - supplement field exists;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Character Inference Helper Split

### What Changed

- Added `src/characterInferenceHelpers.js` for character sex inference from Japanese name suffixes and sex-description text.
- `src/legacyMain.js` now imports the legacy aliases `Ca` and `Na` from that helper instead of defining the suffix arrays and inference functions inline.
- Added `tests/characterInferenceHelpers.test.js` to pin male/female/name-missing and sex-description branches.
- Character UI rendering, random character generation pools, API key handling, provider request behavior, prompt contracts, UI mode labels, and long-form engine behavior were not changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/characterInferenceHelpers.test.js` passed.
- `node tests/axisStateHelpers.test.js` passed.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - the character section is visible;
  - no Vite error overlay is present;
  - current-load browser error log is empty.

## 2026-06-13 Axis State Helper Split

### What Changed

- Added `src/axisStateHelpers.js` for axis state-key mapping, axis source mutation, default-filled cleanup, user-owned axis detection, and randomizable-axis detection.
- `src/legacyMain.js` now keeps its legacy wrapper names (`lp`, `ct`, `th`, `nh`, `oh`, `wa`, `Zo`) but delegates their state logic to the new helper module.
- Added `tests/axisStateHelpers.test.js` to pin source setting/clearing, default-filled cleanup, state selection detection, locked/manual/default/random behavior, and randomizable-axis decisions.
- DOM reads, chip rendering, mode/category data, API key handling, provider request behavior, prompt contracts, UI mode labels, and long-form engine behavior were not changed.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/axisStateHelpers.test.js` passed.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - API譛ｪ險ｭ螳・label is visible;
  - no Vite error overlay is present;
  - browser error log is empty.

## 2026-06-13 Mode Default Helper Split

### What Changed

- Added `src/modeDefaultHelpers.js` for mode-label lookup and default axis preset selection.
- `src/legacyMain.js` now keeps local mode/category data but delegates pure label lookup and default axis tuple construction to that module.
- Removed the inline `Bt` helper and reduced inline `Sa`/`Je` to compatibility wrappers.
- Added `tests/modeDefaultHelpers.test.js` to pin mode fallback labels, category tuple fallback, and default preset construction.
- No API key handling, provider request behavior, prompt contracts, UI mode labels, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/modeDefaultHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - API譛ｪ險ｭ螳・label is visible;
  - no Vite error overlay is present;
  - browser error log is empty.

## 2026-06-13 Gemini Model Data Reuse

### What Changed

- `src/legacyMain.js` now imports `GEMINI_MODELS as Tn` from `src/data.js`.
- Removed only the inline Gemini model array declaration from `src/legacyMain.js`.
- Left public mode/category data in `src/legacyMain.js` untouched for this step to avoid a broad data migration.
- No API key handling, provider request behavior, prompt contracts, UI mode labels, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - API未設定 label is visible;
  - no Vite error overlay is present.

## 2026-06-13 Style Analyzer Download Helper Split

### What Changed

- Expanded `src/fileIoHelpers.js` with filename sanitizing, timestamped JSON filename generation, timestamped plain-text filename generation, generic Blob download, JSON-object download, and text download helpers.
- `src/legacyMain.js` now keeps the state checks in `Ff()` and `Vf()`, but delegates JSON/TXT Blob and filename creation to `src/fileIoHelpers.js`.
- Expanded `tests/fileIoHelpers.test.js` to pin filename sanitizing and style-analyzer JSON/TXT filename formats.
- No API key handling, provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - the style analyzer panel is visible;
  - API未設定 label is visible;
  - no Vite error overlay is present.

## 2026-06-13 API Key Helper Split

### What Changed

- Added `src/apiKeyHelpers.js` for API key normalization, mask detection, summary generation, validation, default model selection, and provider label selection.
- `src/legacyMain.js` now imports legacy aliases `Oe`, `Yf`, `Xf`, `Lt`, `gn`, and `Qf` from that module.
- Removed the inline API-key helper declarations from `src/legacyMain.js`.
- Kept `as()` and `Zf()` inside `src/legacyMain.js` because they write and restore the live legacy state object.
- Added `tests/apiKeyHelpers.test.js` to pin sanitized input, masked keys, short-key messages, bad-character messages, provider/model inference, and valid-key pass-through behavior.
- No API key values, API storage format, provider switching behavior, provider request code, prompt contracts, or UI mode contracts were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/apiKeyHelpers.test.js` passed.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - API未設定 label is visible;
  - API input exists and is editable in unset state;
  - no Vite error overlay is present.

## 2026-06-13 Long Novel Number Helper Split

### What Changed

- Added `src/longNovelNumberHelpers.js` for long-form numeric normalization, Japanese chapter-number parsing, target character count parsing, chapter-count calculation, chapter minimum calculation, and long-form request options.
- `src/legacyMain.js` now imports legacy aliases `Ih`, `fp`, `er`, `hp`, `tr`, `nr`, and `or` from that module.
- Removed the inline long-form numeric helper block from `src/legacyMain.js`.
- Kept `ei` and `Ir` in `src/legacyMain.js` because later compatibility patches still reference them directly.
- Added `tests/longNovelNumberHelpers.test.js` to pin full-width digit cleanup, Japanese numeral parsing, lower-bound character logic, chapter-count logic, and request-option defaults.
- No provider request code, prompt contracts, UI mode contracts, or public long-form visibility behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/longNovelNumberHelpers.test.js` passed.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser DOM/overlay smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - the style analyzer panel is visible;
  - no Vite error overlay is present.

## 2026-06-13 Style Analyzer File Helper Alias Split

### What Changed

- Reused `src/fileIoHelpers.js` for the style-analyzer file read aliases `Lf` and `If`.
- Reused `src/fileIoHelpers.js` for the style-analyzer timestamp alias `Qd`.
- Removed inline `Lf`, `If`, and `Qd` declarations from `src/legacyMain.js`.
- Expanded `tests/fileIoHelpers.test.js` to pin the `Qd` alias.
- No provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - the style analyzer panel is visible;
  - the current page has no Vite error overlay.
- Note: the browser dev log retained a stale HMR duplicate-identifier error from the middle of the edit, before the inline helpers were removed. The fresh current page DOM and production build are clean.

## 2026-06-13 File IO Helper Split

### What Changed

- Added `src/fileIoHelpers.js` for browser file read helpers and timestamped text download helper.
- `src/legacyMain.js` now imports legacy aliases `vh`, `bh`, and `Cp` from that module.
- Removed inline `vh`, `bh`, and `Cp` helper declarations from `src/legacyMain.js`.
- Added `tests/fileIoHelpers.test.js` to pin timestamp and filename behavior.
- No provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/fileIoHelpers.test.js` passed.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - browser error log is empty.

## 2026-06-13 Entry-Point Split Refactor

## 2026-06-13 ModulePreload Bootstrap Split

## 2026-06-13 API Error Helper Split

## 2026-06-13 Footer Helper Split

### What Changed

- Added `src/footerHelpers.js` for the legacy version-footer aliases `zf`, `jt`, and `Lr`.
- `src/footerHelpers.js` now owns the legacy footer stripping pattern for:
  - `Created By AI Story Maker V...`;
  - `Generated by Super FURU AI Story v...`.
- `src/legacyMain.js` now imports those helpers instead of defining them inside the large state declaration.
- `src/legacyMain.js` still keeps `ap = SYSTEM_VERSION` locally because existing legacy prompt/status strings use that version alias.
- Added `tests/footerHelpers.test.js` to pin footer text, repeated-footer replacement, legacy Super FURU footer removal, and empty-input behavior.
- No provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/footerHelpers.test.js` passed.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - browser error log is empty.

## 2026-06-13 DOM Utility Helper Split

### What Changed

- Added `src/domHelpers.js` for the legacy DOM id lookup alias `N` and HTML escaping alias `Ce`.
- `src/legacyMain.js` now imports `N` and `Ce` from `src/domHelpers.js`.
- `src/legacyMain.js` now reuses `pickRandom as Ae` from `src/selectionHelpers.js` instead of defining another inline random picker.
- Removed the inline `N`, `Ae`, and `Ce` helper declarations from the large legacy state block.
- Added `tests/domHelpers.test.js` to pin the current escaping behavior, including the legacy empty-output handling for nullish/falsy values.
- No provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/domHelpers.test.js` passed.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - browser error log is empty.

## 2026-06-13 Selection Helper Split

### What Changed

- Added `src/selectionHelpers.js` for stateless selection filtering, category-item picking, future/SF keyword checks, and Japanese character-count parsing.
- `src/legacyMain.js` now imports the existing legacy helper aliases `Wd`, `ns`, `ho`, `ma`, and `hf` from `src/selectionHelpers.js`.
- Removed the inline future/SF regexes plus `Wd`, `ns`, `ho`, `ma`, and `hf` helper declarations from `src/legacyMain.js`.
- Left `ff` in `src/legacyMain.js` because it is still tied to legacy theme data and UI-era behavior.
- Added `tests/selectionHelpers.test.js` to pin future/SF filtering, all-filtered fallback behavior, deterministic category picking, and Japanese count parsing.
- No provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/selectionHelpers.test.js` passed.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - browser error log is empty.

### What Changed

- Added `src/apiErrorHelpers.js` for API failure classification and user-facing API error message construction.
- `src/legacyMain.js` now imports the existing legacy helper aliases from `src/apiErrorHelpers.js`.
- Removed the inline `Ho`, `kr`, `Hs`, `Js`, `fo`, `Vd`, `ia`, and `xr` helper declarations from `src/legacyMain.js`.
- Added `tests/apiErrorHelpers.test.js` to pin safety, quota, auth, model/request, and vision-message branches.
- No provider request code, prompt contracts, UI mode contracts, or long-form engine behavior were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `node tests/apiErrorHelpers.test.js` passed.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - browser error log is empty.

### What Changed

- Added `src/modulePreloadPolyfill.js` as the single owner of the runtime `modulepreload` compatibility shim.
- `src/main.js` now imports that shim before `qualityBoost`, `legacyMain`, and `publicRuntime`.
- Removed the repeated leading `modulepreload` boilerplate from `src/legacyMain.js`.
- No generation prompts, provider calls, UI mode contracts, or long-form engine logic were changed in this step.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on `http://127.0.0.1:5179/` confirmed:
  - title and header show `Story Maker v5.0.2`;
  - all 14 public output modes are visible;
  - long-form mode remains hidden from visible page text;
  - browser error log is empty.

### What Changed

- `src/main.js` is now a small ordered runtime entrypoint.
- The previous large runtime body moved to `src/legacyMain.js`.
- `index.html` now loads only `src/main.js` for the JavaScript runtime.
- `src/main.js` imports runtime side effects in this order:
  1. `src/qualityBoost.js`
  2. `src/legacyMain.js`
  3. `src/publicRuntime.js`
- `src/prompt.js` comments now describe the new entrypoint / legacy-core split.

### Verification

- `node --check` passed for all JavaScript files under `src/`.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on the local public URL confirmed:
  - title and header show `Story Maker v5.0.2`;
  - public runtime guard is active;
  - quality boost runtime is ready;
  - 14 output-mode buttons are visible;
  - the long-form button is hidden and disabled;
  - visible page text does not expose the long-form mode;
  - browser error log is empty.

### Remaining Refactor Direction

- `src/legacyMain.js` is still the large compatibility file.
- Future safe cuts should extract provider/API client flow, DOM event binding, randomization/lock state, and generation pipeline orchestration into focused modules.
- Avoid adding new behavior directly to `src/legacyMain.js` unless the change cannot be made safely elsewhere.

### Current Scope

- Public release line: `v5.0.2`.
- Public UI remains focused on the 14 non-long output modes.
- Long-form novel development code remains available only through the local development path and is not exposed as a usable public output-mode button.
- API keys are entered by the user at runtime in the browser UI. Do not ask for keys in chat and do not write keys to files.

### Refactor Completed

- `src/version.js` now owns the release version and Story Maker footer text.
- `src/apiSession.js` now owns browser API-session persistence and restoration.
- `src/main.js` still hosts the legacy UI flow, but it now delegates version/footer and API-session behavior to the extracted modules.
- `src/outputCleanup.js` and `src/longNovel/assembler.js` now read the shared footer value from `src/version.js`.

### Long-Form Development State

- The rebuild path lives under `src/longNovel/`.
- The Vite dev server injects `src/longNovel/devEntry.js` only while serving locally.
- Production build replaces the dormant long-novel panel and does not expose the development entry.
- Long-form output is not considered public-release functionality in `v5.0.2`.

### Verification Completed

- `node --check` passed for all JavaScript files under `src/`.
- `tests/long/*.test.js` passed.
- `npm run lint --if-present` passed.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.
- Public `dist` scan found no `longdev`, `src/longNovel`, development entry, personal path, or API-key-shaped strings.
- In-app browser smoke on the local public URL confirmed:
  - title and header show `Story Maker v5.0.2`;
  - public runtime guard is active;
  - 14 output-mode buttons are visible;
  - the long-form button is hidden and disabled;
  - visible page text does not expose the long-form mode;
  - all-random and mode-random controls do not select long-form mode;
  - browser error log is empty.

### Next Safe Steps

- Deploy `v5.0.2` only after the current diff is reviewed and committed.
- Create a bilingual annotated tag and GitHub Release for `v5.0.2`.
- Run the Antigravity full backup only when explicitly requested by the user.
