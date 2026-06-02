# HANDOFF (Story Maker)

## Snapshot Date
2026-06-02T00:00:00+09:00

## Current Status
- Version: `v3.8.9`
- Branch: `main`
- Current task: v3.8.9 long-novel completed-run quality polish after v3.8.8 full browser QA completed but exposed generic outline titles.
- Development port: `http://localhost:5179/`
- Deployment/backups: not run. Do not deploy or back up unless the user explicitly asks.

## v3.8.9 Current Notes
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
| `src/main.js` | Maintains long-novel pause, continuation, audit, save-gate, preview-scroll, regeneration safeguards, fallback outline quality, v3.8.6 final-header rebuild, v3.8.8 final-chapter/near-final story gates, and v3.8.9 chapter-title / axis-label normalization. |
| `src/prompt.js` | Long-novel chapter guidance now uses the same roughly 8,000 chars/chapter planning basis, so 80,000 chars plans as about 10 chapters; char-count labels are parsed robustly; next-chapter prompts now prioritize the latest context memo/GMC+S and forbid replaying completed prior events; non-final chapters now explicitly cannot resolve the whole story; reproduction metadata version synced to `v3.8.9`. |
| `src/api.js` / `src/consistencyAudit.js` | Long-novel audit/fix calls now use bounded timeout and model-attempt options to reduce provider-side stalls during inspection and repair. |
| `src/style.css` | Disables smooth scrolling and scroll anchoring while long-novel live preview is active; during and after long-novel generation the novel body itself now fills the remaining right-side height and scrolls inside the manuscript box. |
| `package.json` / `package-lock.json` | Version synced to `3.8.9`. |
| `index.html` / `src/data.js` | Visible/internal version synced to `v3.8.9`; long-novel panel keeps a fixed live status line. |
| `src/prompt.js` | Reproduction metadata version synced to `v3.8.9`. |
| `README.md` | Added the v3.8.9 chapter-title quality changelog and QA note. |

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
- Full end-to-end generation has not yet been refreshed after the v3.8.9 title-normalization patch. Do not ask for or store the API key in chat or files; ask the user to enter it in the UI when needed.
- If the provider keeps returning short prose below the minimum even after continuation attempts, the app should continue to fail closed instead of saving a broken chapter.
- Startup/default option handling is still planned: make hidden fallback defaults visible or apply mode-specific defaults when each mode chip is clicked.

## Next Steps
1. Implement the planned startup/default option handling correction across modes.
2. Continue tuning literary quality with real prompt samples, while keeping fail-closed body adoption.
3. Deploy only after an explicit deploy request.
