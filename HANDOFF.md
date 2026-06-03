# HANDOFF (Story Maker)

## Snapshot Date
2026-06-03T18:48:24+09:00

## Current Status
- Version: `v4.0.3`
- Branch: `main`
- Current task: v4.0.3 score-bar display fix and structural-contradiction regeneration hardening are implemented locally after the passing v4.0.2 full API QA.
- Development port: `http://localhost:5179/`
- Deployment/backups: v4.0.3 has not been deployed yet. Previous `v4.0.0` deploy completed for GitHub Pages; backup not run.

## v4.0.3 Current Notes
- User noticed that the long-novel self-score showed text scores but not visible bars. Browser inspection confirmed the rendered rows used `score-bar` with widths such as `96%`, but CSS only styled `score-bar-fill`, leaving the fill height at `0px`.
- `src/main.js` now renders long-novel scores with the same classes as the existing short-form score board: `score-row passed`, `score-bar-fill`, and `score-val`.
- `src/style.css` also styles legacy `score-bar` / `score-value` aliases so any already-rendered long-novel score rows display visible bars once the CSS updates.
- The latest v4.0.2 full API QA completed 12 / 12 chapters, 99,225 characters, clean final manuscript scan, and visible scores: 伏線回収度 96 / 起承転結の構造 97 / 制約遵守度 100.
- Retry analysis from that run showed several chapters reached audit repair attempt `2/2`, but whole-chapter regeneration only used `1/2` or `1/4`. Do not simply increase audit repair attempts; keeping repair at two avoids over-patching a structurally broken draft.
- `src/main.js` now treats unresolved chronology/geography/setting/character/foreshadowing contradictions as structural failures that get the extended four-regeneration budget plus state-lock guidance: fix position, time, possessions, injuries, life/death, and relationship state before rewriting.
- Checks passed for v4.0.3: `node --check src/main.js`, `node --check src/consistencyAudit.js`, `npm run build`, `npm run lint --if-present`, `git diff --check -- . ':!dist'`, and in-app browser version check showing `Story Maker v4.0.3`.

## v4.0.2 Current Notes
- Fresh API QA on `v4.0.1` reached chapter 8 and exposed a real save-through bug: when a repair candidate was rejected for being too short or changing length too much, the unchanged draft could be re-audited, receive a clean second audit result, and then be saved.
- Evidence captured from the in-app browser showed the phrase `足りるかな？` present at the end of chapter 7 and again at the start of chapter 8, confirming chapter-to-chapter duplicate prose was saved after the rejected repair path.
- `src/consistencyAudit.js` now returns a blocking issue when a repair candidate fails `validateFixedText` or the length-ratio gate, instead of continuing to re-audit the unchanged draft.
- `src/main.js` contains the same fail-closed behavior in the bundled runtime path used by the browser app: rejected repairs now return `remainingCriticalCount >= 1`, which sends long-novel chapters into the existing whole-chapter regeneration flow.
- Version metadata is synced to `v4.0.2` across package files, visible UI, runtime metadata, and reproduction metadata. README changelog now has a `v4.0.2` entry.
- Checks passed after the patch: `node --check src/main.js`, `node --check src/consistencyAudit.js`, `npm run build`, `npm run lint --if-present`, and `git diff --check -- . ':!dist'` (only normal LF-to-CRLF warnings).
- Fresh full API QA on `v4.0.2` after user UI API-key entry completed 12 / 12 chapters with 99,225 visible characters. Final scan found 12 parsed chapters, one final `【完】`, no context memo / GMC+S / progress-log / code-fence contamination, and no duplicate-chapter hints.

## v4.0.1 Current Notes
- Long-novel completion now builds a deterministic score object and renders the existing `thought-score-board` UI with the same three categories used by shorter modes: `伏線回収度`, `起承転結の構造`, and `制約遵守度`.
- The score board is hidden when a long-novel run resets/starts, then shown only after all chapters complete and the final manuscript is displayed.
- Long-novel chapter prompts now add an "Entertainment engine" rule set: each chapter needs an irreversible choice, visible cost, expectation reversal, scene-to-scene escalation, and exposition converted into conflict/objects/gestures/decisions.
- Version metadata was bumped to `v4.0.1` across visible UI, package files, runtime metadata, and reproduction metadata.
- README changelog was consolidated into a single compact section. Old duplicate/obsolete changelog blocks were removed.
- Fresh API QA on `http://127.0.0.1:5179/?v=local-v4.0.1` reached chapter 8 before being stopped to avoid further API consumption. Confirmed behaviors: chapter 2 and 3 contradiction repair passed after recheck; chapter 6 was rejected fail-closed, regenerated, then adopted; chapter 7 early-resolution gate and physical-key contradictions triggered regeneration and eventually passed.
- QA also found two issues before completion: the main `ストーリー生成` button could become enabled during long-novel retry/regeneration, and the audit/fix prompts could let the model confuse the current unsaved retry draft with saved recent chapters. `src/main.js` now keeps long-mode UI locked across retry gaps, and `src/consistencyAudit.js` now explicitly separates saved canon from the current draft/rejected retry drafts.
- Post-fix checks passed: `node --check src/main.js`, `node --check src/consistencyAudit.js`, `npm run build`, `npm run lint --if-present`, `git diff --check -- . ':!dist'`, and in-app browser reload. Reload cleared the in-memory API key; full post-fix API QA still requires the user to type the key into the UI again.

## v4.0.0 Current Notes
- `v3.9.9` fresh in-app Gemini QA after user API entry saved chapter 1, then stopped fail-closed at chapter 2 with `長い説明段落が多く、場面の切れ目が不足しています（第2章: 4段落）`. The rejected chapter 2 was not appended to the readable manuscript; the output box kept the clean chapter 1 manuscript.
- Root cause: the paragraph-density gates counted only blank-line-separated blocks, while generated Japanese prose often uses normal single-newline paragraph breaks. Properly paragraphed prose could be misread as a few giant text blocks.
- Versioning correction: after `v3.9.9`, the valid next app version is `v4.0.0`; minor and patch slots must stay single digit.
- `v4.0.0` changes the paragraph-density checks to count normal visible line breaks, adds explicit prompt rules for visible paragraph breaks, and gives paragraph/scene-density failures the extended four-regeneration path with specific retry guidance.
- Fresh Gemini in-app browser QA completed 12 / 12 chapters at 96,555 visible characters. The final scan found 12 chapter headings, exactly one `【完】`, no context memo / GMC+S / regeneration-log contamination, no bare heading artifacts, and no stray `AND` route residue.
- Notable gates during QA: chapter 2 passed the corrected paragraph-density handling; chapter 4 and chapter 8 rejected unresolved contradictions and regenerated; chapter 9 rejected visible design-memo bullets; chapter 10 rejected premature whole-story resolution twice before saving a non-final continuation.
- User asked Codex to also deploy from this side at appropriate times. After the passing full QA, `npm run deploy` published `v4.0.0` to GitHub Pages. Remote `origin/gh-pages:index.html` and the live page both show `Story Maker v4.0.0`.

## v3.9.9 Previous Notes
- `v3.9.8` fresh in-app Gemini QA after user API entry saved 8 / 12 chapters, then stopped fail-closed during chapter 9. The broken chapter 9 was not saved.
- That run showed the save gates worked, but repeated inert empty Markdown heading lines (`#` / `##`) consumed all regeneration attempts. One chapter 9 retry also introduced a critical setting contradiction by making 実花 into `高瀬実花` / 美咲's sister instead of 神崎修平's sister; repair fixed the contradiction, but the empty heading artifact remained and the chapter stayed rejected.
- `v3.9.9` strips bare empty Markdown heading artifacts during long-novel body cleanup before the save gate, while preserving the fail-closed management-info gate if cleanup misses a real leak.
- Late non-final whole-story resolution detection now starts at roughly 70% of the planned chapter count instead of only the penultimate chapter, and those late-resolution failures get the extended four-regeneration path.
- When a chapter stops fail-closed after prior clean chapters exist, the readable output box now keeps the saved clean manuscript instead of appending the error text into the manuscript view; the error remains in status/logs.
- Static/browser smoke checks passed for v3.9.9. The app is open on `http://localhost:5179/` showing `v3.9.9`; the update cleared the in-memory API key, so fresh full API QA is waiting for the user to enter the key in the UI again.

## v3.9.8 Previous Notes
- `v3.9.7` fresh in-app Gemini QA after user API entry saved 8 / 10 chapters, then stopped fail-closed during chapter 9 with repeated chapter 8 replay / data-center timeline rewind and premature `すべて...終わ` wording. The broken chapter 9 was not saved.
- `v3.9.8` adds a concrete previous-chapter endpoint anchor to next-chapter prompts, so late non-final chapters must continue from the saved chapter's final location/state instead of redoing travel, arrival, or already witnessed events.
- Regeneration guidance now treats rejected current-chapter output as non-canon, preserves chronology during duplicate/replay retries, and keeps duplicate/near-final retry paths at up to four full-chapter regenerations even if later failures become audit/timeline contradictions.
- Static/browser smoke checks passed. The app is open on `http://localhost:5179/` showing `v3.9.8`; the reload cleared the in-memory API key again, so fresh full API QA is waiting for the user to enter the key in the UI.

## v3.9.7 Previous Notes
- `v3.9.6` fresh in-app Gemini QA saved 8 / 10 chapters, then stopped fail-closed during chapter 9 with long exposition paragraphs plus premature whole-story resolution (`すべて...終わ`).
- The v3.9.6 gates behaved correctly during that run: empty Markdown headings were rejected before save in multiple chapters, and broken chapter 9 retries were not adopted into the manuscript or memory state.
- `v3.9.7` added a specific prompt lock for the chapter immediately before the final chapter: do not resolve the whole story, do not declare victory/final reconstruction, do not replay completed prior events, and keep action/dialogue/choice beats every 400-900 characters.

## v3.9.6 Previous Notes
- `v3.9.5` in-app Gemini QA completed all 10 / 10 chapters with 74,267 visible manuscript characters and one final `【完】`.
- The same final scan found no repair-log, master-prompt, code-fence, or regeneration-text contamination, but did find two bare empty Markdown headings (`##`) inside the saved manuscript body.
- `v3.9.6` adds a fail-closed save-gate pattern for bare Markdown headings (`#` through `######`) so future chapters with empty heading artifacts are rejected before save and can regenerate instead.
- Fresh v3.9.6 full API QA later saved 8 / 10 chapters and stopped fail-closed at chapter 9, which led to the v3.9.7 late non-final prompt patch.

## v3.9.5 Previous Notes
- `v3.9.4` in-app Gemini QA stopped fail-closed before saving chapter 1 because the pre-save literary gate detected a teaser/preview-style chapter ending. This confirmed the save gate blocks bad prose, but exposed that chapter 1 was not using the later-chapter regeneration route.
- `v3.9.5` gives chapter 1 the same retry-state preservation and full-chapter regeneration behavior as later chapters for save-gate failures.
- Chapter 1 retry prompts now include the prior rejection reason and explicitly ask for a full rewrite that avoids teaser endings, repair chatter, and references to the failed attempt.
- Full API QA on `v3.9.5` later completed 10 / 10 chapters, but final scanning found two bare `##` lines, so `v3.9.6` was added before accepting the result.

## v3.9.4 Previous Notes
- `v3.9.3` in-app Gemini QA correctly stopped fail-closed at chapter 4 because the provider repeatedly replayed long chapter 3 prose. The gate worked, but the regeneration guidance was not strong enough to escape the replay loop.
- `v3.9.4` keeps the duplicate/replay save gate fail-closed, but duplicate-specific rejections now get up to four complete chapter regenerations instead of two.
- `v3.9.4` adds stronger retry instructions that forbid prior chapter openings, paragraphs, dialogue runs, metaphors, and scene placement, and require the retry to restart from a different location, obstacle, or choice.

## v3.9.3 Previous Notes
- `v3.9.2` full in-app Gemini QA completed 12 / 12 chapters and 91,252 characters, but deeper manuscript scan found exact long paragraph replay from chapter 7 inside chapter 8 plus one observed typo (`繰っ広げ`).
- `v3.9.3` adds a save-time fail-closed duplicate gate that compares a candidate chapter against already saved chapter bodies and rejects long exact paragraph/opening-scene replay before the chapter can be adopted.
- `v3.9.3` also adds automatic cleanup for `繰っ広げ` / `繰っ広` and synchronizes the prompt rule to forbid chapter-body replay while preserving consequence carry-forward.

## v3.9.2 Previous Notes
- `v3.9.2` strengthens long-novel chapter prompts with an internal 3-5 scene ledger requirement, character agency, consequence carry-forward, dialogue subtext, and final-paragraph aftertaste.
- Long-novel save checks now add a literary-density gate that rejects chapters that look like compressed summaries, lack sensory/physical detail, lack visible choice/conflict, or end with teaser/preview wording.
- Full in-app Gemini QA completed 12 / 12 chapters and 91,252 characters; final scan found no memo/master-prompt/repair-log contamination and exactly one final marker, but deeper duplicate scan found chapter 7 prose replay inside chapter 8.

## v3.9.1 Previous Notes
- `v3.9.1` fixes the startup/default handling gap: the first visible mode now has visible defaults immediately, and generation runs one final default-fill pass before settings are read.
- Mode clicks now replace only system-applied default values. User-entered, manually selected, random, or locked values are preserved instead of being overwritten.
- Long-novel mode now gets meaningful visible defaults when selected from a fresh startup state: mystery/suspense, modern Tokyo, adult reader, surprise ending, and ensemble third-person narration.
- Internal version drift from the v3.9.0 deployment was corrected across `src/main.js`, `src/prompt.js`, `src/data.js`, `index.html`, `package.json`, and `package-lock.json`.

## v3.8.9 Previous Notes
- `v3.8.8` full Gemini browser QA completed 10 / 10 chapters with 74,659 manuscript characters, one final `【完】`, and no management memo / repair log / English residue contamination. It also confirmed the output box stayed scroll-contained.
- The remaining quality defect in that run was weak completed-header outline lines such as `第1章: 第1章`, abstract fallback rows for some chapters, and weak axis labels such as `テーマ「ランダム」`. `v3.8.9` normalizes generic chapter titles at save time, derives/falls back to concise chapter labels for completed headers, and replaces empty/random axes with natural defaults.
- `v3.8.7` full Gemini browser QA reached 11 / 12 saved chapters, then stopped fail-closed in chapter 12 because the provider kept replaying the chapter 11 climax and the old English-residue gate also treated valid proper nouns such as `Morris` as hard failures.
- `src/main.js` now rejects near-final chapters that prematurely complete the whole-story objective before the final chapter, adds a final-chapter state lock that forbids rewinding saved events, and narrows the English-residue gate to line-only scraps.
- `v3.8.0` was already the deployed baseline; the active Codex patch is `v3.8.9`.
- `src/main.js` now builds a deterministic visible long-novel header block before chapter 1, even if the provider omits those sections.
- `v3.8.5` fixes the v3.8.4 regression where fallback chapter outlines repeated the same generic sentence and provider metadata such as `タイトル:`, `ログライン:`, and `全構成:` could remain inside the first chapter body.
- `src/main.js` now normalizes the final chapter before the save gate so the saved manuscript ends with exactly one independent `【完】` line.
- Full user-entered Gemini QA on `v3.8.5` completed 10 / 10 chapters and ended with one `【完】`, but found the finished header still contained logline/planning metadata and an 8-chapter plot outline. `v3.8.6` rebuilds the final header from the saved chapter roster and prints only title, synopsis, and plot outline.

## Changed Files
| File | Purpose |
|---|---|
| `src/main.js` | Maintains long-novel pause, continuation, audit, save-gate, preview-scroll, regeneration safeguards, fallback outline quality, v3.8.6 final-header rebuild, v3.8.8 final-chapter/near-final story gates, v3.8.9 chapter-title / axis-label normalization, v3.9.1 default-visible mode presets, v3.9.2 literary-density gates, v3.9.3 chapter-replay rejection, v3.9.4 duplicate-specific regeneration hardening, v3.9.5 chapter-1 quality-gate regeneration, v3.9.6 empty-Markdown-heading rejection, v3.9.7 late non-final chapter prompt lock, v3.9.8 endpoint-anchor / retry-chronology hardening, v3.9.9 empty-heading cleanup / late-resolution retry hardening / clean output error handling, v4.0.0 paragraph-density counting / retry hardening, and v4.0.1 long-novel score-board rendering plus entertainment-engine prompt rules. |
| `src/prompt.js` | Long-novel chapter guidance now uses the same roughly 8,000 chars/chapter planning basis, so 80,000 chars plans as about 10 chapters; char-count labels are parsed robustly; next-chapter prompts now prioritize the latest context memo/GMC+S and forbid replaying completed prior events; non-final chapters now explicitly cannot resolve the whole story; v4.0.1 adds the same entertainment-engine guidance and reproduction metadata version sync. |
| `src/api.js` / `src/consistencyAudit.js` | Long-novel audit/fix calls now use bounded timeout and model-attempt options to reduce provider-side stalls during inspection and repair. |
| `src/style.css` | Disables smooth scrolling and scroll anchoring while long-novel live preview is active; during and after long-novel generation the novel body itself now fills the remaining right-side height and scrolls inside the manuscript box. |
| `package.json` / `package-lock.json` | Version synced to `4.0.1`. |
| `index.html` / `src/data.js` | Visible/internal version synced to `v4.0.1`; long-novel panel keeps a fixed live status line. |
| `README.md` | Added v4.0.1 long-novel self-grading and story-quality prompt notes, plus prior v4.0.0 versioning correction, paragraph-density gate, retry-hardening, QA-pass, and deploy changelog notes. |

## Done
- Reverted the earlier v3.6.x behavior where the pause button became a disabled progress indicator during chapter generation.
- Pause during generation now means "finish the current chapter, then stop before the next chapter"; clicking again cancels that reservation.
- The automatic continuation loop now logs why it is continuing: body chars, required minimum chars, raw chars, memo marker presence, and final marker presence when relevant.
- The continuation prompt is now a tight "continue from here" prompt using the partial chapter output only, avoiding full-prompt replay and model replanning.
- Continuation output is now merged before the existing context memo, and a newer generated memo replaces the old memo. This fixes false body-short failures after continuation.
- Live preview now strips context memo /伏線管理 blocks before rendering the visible manuscript, preventing management notes from appearing in the main output area during generation.
- Long-novel streaming no longer calls `scrollIntoView` on every chunk, and the output pane disables smooth scroll anchoring during live preview to prevent vertical jumping.
- Long-novel live preview now scrolls the manuscript box itself to the latest text so the first chapter title does not remain fixed while generation continues below.
- Long-novel panel now has a fixed live status row that updates during generation, continuation, audit, save checks, pauses, aborts, and completion.
- Aborting a long-novel run now clears `ln-generating` / live-preview state immediately, so the UI no longer appears active after interruption.
- Full-run QA on `v3.7.3` reproduced a chapter 10 stop: raw continuation reached about 24,753 chars while extracted body stayed at 4,006 chars because the first premature final marker cut off later continuation.
- Final-chapter continuation now removes premature final markers from the existing partial text before requesting/merging continuation, and body extraction uses the last final marker.
- Long-novel planning no longer lets prompt guidance and runtime state diverge for the common 80,000-char mode.
- Long-novel prompt planning now safely parses numeric, comma-separated, and Japanese "万" char-count labels instead of dividing raw strings.
- First-chapter aborts keep a meaningful planned chapter count and show "chapter 1 generation interrupted" instead of "chapter 0 interrupted".
- Next-chapter prompts now make the latest context memo and next-scene GMC+S higher priority than the older overall outline, preventing a completed prior event from being replayed as a new chapter event.
- When long-novel audit or save gates reject a chapter, the app now regenerates the whole chapter up to two times with explicit failure guidance before the final fail-closed stop.
- Long-novel audit/fix calls now use bounded timeout/model-attempt settings so broken inspection/fix responses do not stall the full run as long.
- Full-run QA on `v3.7.6` was manually stopped after chapter 4 because a partial `【全章の` management marker leaked into the manuscript between chapters 3 and 4. `v3.7.7` adds extraction, preview sanitization, and save-gate coverage for that fragment class.
- Full-run QA on `v3.7.7` reached chapter 4, but a structurally broken chapter entered repeated audit repair attempts. `v3.7.8` caps repair attempts at two so the chapter is regenerated sooner.
- Full-run QA on `v3.7.8` completed all 10 chapters with 81,177 total characters. Saved chapter sizes: 5,970 / 8,679 / 4,879 / 7,510 / 9,387 / 8,459 / 8,314 / 11,387 / 10,051 / 6,287. Final scan found 10 chapter headings, one `【完】`, no duplicated chapter numbers, and no management memo/master-prompt/repair-meta contamination in the manuscript body.
- After completion, the output box expanded to full manuscript height; `v3.7.9` keeps the completed manuscript in the same in-box scroll view used during generation.
- `v3.8.1` adds a long-novel prose contract and save gate for performed scenes, chapter turns, aftertaste, and rejection of memo-like/summary-like chapter bodies.
- `v3.8.1` keeps both completed and stopped manuscripts in `ln-novel-scroll`, so the final page no longer expands the text box to the full manuscript height.
- Full-run QA on `v3.8.1` completed all 10 chapters with 80,343 total characters. Final scan found chapter headings 1-10, one final `【完】`, and no management memo/master-prompt/repair-log contamination in the manuscript body.
- Completion UI QA on `v3.8.1` confirmed `#output` remains a fixed internal scroll box (`clientHeight` 720, `scrollHeight` 87,168, `overflow-y: auto`) and the long-novel control header remains `position: sticky` with z-index 60.
- `v3.8.5` restores app-side long-novel header sections, canonical final marker output, distinct fallback chapter beats, and body-level rejection of embedded header metadata. Fresh full-run/editorial QA remains pending.
- Full browser QA on `v3.8.5` completed all 10 chapters with 68,202 total characters and a final `【完】`, then exposed remaining header defects: the printed plot outline had only 8 chapters and logline/planning metadata was visible. `v3.8.6` fixes this by rebuilding the completed manuscript header from saved chapters.
- Full browser QA on `v3.8.7` reached chapter 12 after saving 11 chapters (92,274 total characters), then stopped fail-closed because chapter 12 repeatedly replayed the completed chapter 11 climax and an over-broad English-residue gate rejected valid proper nouns. `v3.8.8` adds near-final whole-story-resolution rejection, final-chapter state-lock prompting, and narrower English-residue handling.
- Full browser QA on `v3.8.8` completed all 10 chapters with 74,659 characters, one final `【完】`, no management memo/master-prompt/repair-log/English-residue contamination, and a scroll-contained output box. `v3.8.9` fixes the remaining generic completed-header outline titles.

## Verification State
- `node --check src/main.js` passed for `v4.0.1`.
- `npm run build` passed for `v4.0.1` and generated `dist/assets/index-Dva3j8LW.js`.
- `npm run lint --if-present` passed for `v4.0.1`.
- `git diff --check -- . ':!dist'` passed for `v4.0.1`; only normal LF-to-CRLF warnings were reported.
- Static helper check confirmed the v4.0.1 visible/runtime metadata, long-novel score-board completion call, score-board reset hide call, and entertainment-engine prompt rules exist in `src/main.js`.
- In-app browser DOM check on `http://127.0.0.1:5179/?v=local-v4.0.1` confirmed visible `Story Maker v4.0.1`, empty API field, hidden initial score board, hidden long-novel panel, and no browser warn/error logs.
- Note: `src/prompt.js` still does not pass standalone `node --check` because of pre-existing mojibake string damage near the top of the file; Vite build does not import that broken path and passed.
- `v3.9.9` in-app Gemini QA after user API entry saved 1 / 10 chapters, then stopped fail-closed at chapter 2 because the paragraph-density gate counted only blank-line-separated blocks. The rejected chapter 2 was not adopted into `cleanText` or the visible manuscript output.
- `node --check src/main.js` passed for `v4.0.0`.
- `npm run build` passed for `v4.0.0` and generated `dist/assets/index-DglsxoYH.js`.
- `npm run lint --if-present` passed for `v4.0.0`.
- `git diff --check -- . ':!dist'` passed for `v4.0.0`; only normal LF-to-CRLF warnings were reported.
- Helper check confirmed the v4.0.0 runtime version, visible-paragraph prompt rules, single-newline paragraph counting, paragraph-density retry budget, and paragraph retry guidance exist in `src/main.js`.
- In-app browser DOM check on `http://localhost:5179/` confirmed visible `Story Maker v4.0.0`; the user-entered Gemini API key remained saved in-memory as a masked field, without exposing the key.
- Fresh full Gemini QA completed 12 / 12 chapters, 96,555 visible characters, and exactly one final `【完】`. Final scan found 12 body chapter headings, no context memo / GMC+S / regeneration-log contamination, no bare heading artifacts, no design-memo bullet lines, and no stray `AND` residue. The lone `プロンプト` hit was normal in-story terminal text, not management metadata.
- `npm run deploy` passed for `v4.0.0`; `gh-pages` published successfully.
- Remote verification passed: `git fetch origin gh-pages` updated `origin/gh-pages`, and `git show origin/gh-pages:index.html` contains `Story Maker v4.0.0`.
- Live GitHub Pages smoke check passed at `https://furuyan1234.github.io/story-maker/?v=...`: title/version show `Story Maker v4.0.0`, API field is empty on the public page, and no browser warn/error logs were reported.
- `node --check src/main.js` passed for `v3.9.9`.
- `npm run build` passed for `v3.9.9` and generated `dist/assets/index-KUZgCpTf.js`.
- `npm run lint --if-present` passed for `v3.9.9`.
- `git diff --check -- . ':!dist'` passed for `v3.9.9`; only normal LF-to-CRLF warnings were reported.
- Helper check confirmed the v3.9.9 late-resolution gate, empty-heading sanitizer, extended late retry budget, cleanText-preserving error output, and runtime version constant exist in `src/main.js`.
- In-app browser DOM check on `http://localhost:5179/` confirmed visible `Story Maker v3.9.9`, no browser warn/error logs, and an empty API field after the update.
- `v3.9.8` in-app Gemini QA after user API entry saved 8 / 12 chapters, then stopped fail-closed in chapter 9 after repeated empty Markdown heading artifacts and a repaired-but-rejected setting contradiction around 実花 / 美咲. The broken chapter 9 was not saved.
- `v3.9.8` patch check confirmed the endpoint anchor, retry-chronology guidance, runtime version constant, and visible version metadata exist in `src/main.js` / `index.html`.
- `node --check src/main.js` passed for `v3.9.8`.
- `npm run build` passed for `v3.9.8` and generated `dist/assets/index-CYm4Slfy.js`.
- `npm run lint --if-present` passed for `v3.9.8`.
- `git diff --check -- . ':!dist'` passed for `v3.9.8`; only normal LF-to-CRLF warnings were reported.
- In-app browser DOM check on `http://localhost:5179/` confirmed visible `Story Maker v3.9.8`; the API field is empty after reload, so fresh full API QA is waiting for user UI key re-entry.
- `v3.9.7` in-app Gemini QA after user API entry saved 8 / 10 chapters, then stopped fail-closed in chapter 9 after rejecting repeated chapter 8 replay / data-center timeline rewind and premature `すべて...終わ` wording. The broken chapter 9 was not saved.
- `v3.9.6` in-app Gemini QA after user API entry saved 8 / 10 chapters, then stopped fail-closed in chapter 9 with: `第9章の保存前品質ゲートで停止しました: 長い説明段落が多く、場面の切れ目が不足しています（第9章: 6段落） / Whole-story resolution appears before the final chapter (/すべて(?:が|、)?終わ/)`.
- `v3.9.4` in-app Gemini QA after user API entry stopped fail-closed at chapter 1 with: `第1章の保存前品質ゲートで停止しました: 章末が予告・煽り文で終わっています（第1章）`.
- `v3.9.5` patched the chapter-1 quality-gate retry route.
- `node --check src/main.js` passed for `v3.9.5`.
- `npm run build` passed for `v3.9.5`.
- `npm run lint --if-present` passed for `v3.9.5`.
- `git diff --check -- . ':!dist'` passed for `v3.9.5`; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://localhost:5179/` returns `Story Maker v3.9.5`.
- In-app browser reload confirmed visible `Story Maker v3.9.5`; the reload cleared the in-memory API key, so full API QA is waiting for user UI key re-entry.
- `node --check src/main.js` passed for `v3.9.4`.
- `npm run build` passed for `v3.9.4`.
- `npm run lint --if-present` passed for `v3.9.4`.
- `git diff --check -- . ':!dist'` passed for `v3.9.4`; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.9.4`.
- In-app browser DOM check on `http://127.0.0.1:5179/` confirmed visible `Story Maker v3.9.4`, no Vite parse overlay, and no saved API key after reload. Full API QA is waiting for user UI key re-entry.
- `v3.9.3` in-app Gemini QA stopped fail-closed at chapter 4 after the duplicate gate found long chapter 3 replay. This confirmed the save gate blocks broken prose, but also showed duplicate regeneration needed stronger instructions.
- `node --check src/main.js` passed for `v3.9.3`.
- `npm run build` passed for `v3.9.3`.
- `npm run lint --if-present` passed for `v3.9.3`.
- `git diff --check -- . ':!dist'` passed for `v3.9.3`; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.9.3`.
- In-app browser DOM check on `http://127.0.0.1:5179/` confirmed visible `Story Maker v3.9.3` and no warn/error logs. The page reload after the code update cleared the in-memory API key, so full API QA is waiting for user UI re-entry.
- `node --check src/main.js` passed for `v3.9.2`.
- `npm run build` passed for `v3.9.2`.
- `npm run lint --if-present` passed for `v3.9.2`.
- `git diff --check -- . ':!dist'` passed for `v3.9.2`; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.9.2`.
- In-app browser DOM check on `http://127.0.0.1:5179/` confirmed `Story Maker v3.9.2`; selecting long-novel mode populated visible defaults, and browser warn/error logs were empty.
- `node --check src/main.js` passed for `v3.9.1`.
- `npm run build` passed for `v3.9.1`.
- `npm run lint --if-present` passed for `v3.9.1`.
- Browser DOM check on `http://127.0.0.1:5179/` confirmed `Story Maker v3.9.1`, startup defaults visible for the initial `4koma` mode, long-mode click replacing system defaults with long-mode defaults, and a typed custom theme remaining preserved across a later mode click.
- `git diff --check` passed for the touched Story Maker files; only normal LF-to-CRLF warnings were reported.
- `node --check src/main.js` passed for the current v3.8.9 patch.
- Helper-level check passed for `v3.8.6`: bad 8-chapter outlines are replaced with 10 chapters, logline/total/planning metadata is not printed in the header, final clean text has chapter headings 1-10, duplicate header titles are suppressed, and final `【完】` remains.
- Helper-level check passed: the long-novel fallback outline now emits 10 distinct chapter beats, and embedded `タイトル:` / `ログライン:` / `全構成:` metadata under the chapter heading is stripped before save.
- `npm run build` passed for the current v3.8.9 patch.
- `npm run lint --if-present` passed for the current v3.8.9 patch.
- `git diff --check` passed for the touched Story Maker files; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.8.9`.
- Fresh full API browser QA on `v3.8.9` has not yet been rerun; `v3.8.8` completed and the `v3.8.9` delta is deterministic chapter-title/header normalization.
- `npm run build` passed for `v3.7.8`.
- `npm run lint --if-present` passed for `v3.7.8`.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.7.8`.
- Pre-patch browser QA on `v3.7.6` saved chapters 1-4, corrected a chapter 4 location contradiction automatically, but was stopped because a `【全章の` admin fragment remained in the visible manuscript after chapter 3.
- Pre-patch browser QA on `v3.7.5` saved chapters 1 and 2, then stopped fail-closed at chapter 3 because the generated chapter replayed chapter 2's completed event and audit repair could not fix the structural contradiction.
- `npm run build` passed for `v3.7.5`.
- `npm run lint --if-present` passed for `v3.7.5`.
- HTTP check passed: `http://127.0.0.1:5179/` returned `Story Maker v3.7.5`.
- Before the patch, `v3.7.3` full-run browser QA reached chapter 10 but stopped fail-closed with: chapter body too short (4006 / 4800) while raw continuation had grown through five retries.
- Prior `v3.7.3` checks: build, lint, diff-check, HTTP 200, and live-status structural check passed.
- Previous user-entered Gemini API manual QA passed on `v3.7.1`: chapter 1 saved, generation continued into chapter 2, and chapter-end pause stopped after chapter 2 at `2 / 11` with `生成を再開` visible.

## Remaining Risks / Manual QA
- Full end-to-end generation has not yet been refreshed after the v4.0.1 self-score / story-interest prompt change. Do not ask for or store the API key in chat or files; ask the user to enter it in the UI when needed for future runs.
- Do not deploy v4.0.1 until a fresh API QA checkpoint passes or the user explicitly accepts a local-check-only deploy.
- If the provider keeps returning short prose below the minimum even after continuation attempts, the app should continue to fail closed instead of saving a broken chapter.
- Further literary-quality tuning still needs real generated samples; keep fail-closed body adoption and output-box scroll safeguards in place.

## Next Steps
1. Run a fresh long-novel API QA after the user enters the API key in the UI; confirm the completed manuscript shows the three-item score board.
2. Review the generated prose for stronger choices, costs, reversals, and scene escalation; tune prompts from real samples if needed.
3. Deploy again from Codex only after the next meaningful local checks plus fresh API QA checkpoint.
