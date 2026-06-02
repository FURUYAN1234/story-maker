# HANDOFF (Story Maker)

## Snapshot Date
2026-06-02T00:00:00+09:00

## Current Status
- Version: `v3.8.1`
- Branch: `main`
- Current task: v3.8.1 long-novel manuscript quality and completion/interruption scroll behavior patch completed; user-entered Gemini API QA completed.
- Development port: `http://localhost:5179/`
- Deployment/backups: not run. Do not deploy or back up unless the user explicitly asks.

## v3.8.1 Current Notes
- `v3.8.0` was already the deployed baseline; the active Codex patch is `v3.8.1`.
- `src/main.js` adds a long-novel prose quality contract, stronger continuation instruction, and a prose-shape save gate so summary-like or memo-like chapters are rejected before adoption.
- `src/main.js` and `src/style.css` keep completed/interrupted long-novel manuscripts inside the fixed readable manuscript scroll frame via `ln-novel-scroll`.
- Full user-entered Gemini API end-to-end QA completed for `v3.8.1`: 10 / 10 chapters, 80,343 total characters, clean final manuscript scan.

## Changed Files
| File | Purpose |
|---|---|
| `src/main.js` | Long-novel pause is clickable during active generation as a chapter-end pause reservation; first-chapter aborts no longer show `0 / 0` or chapter 0; completion checks now report body/raw/memo/finish state; continuation prompts no longer resend the full initial prompt; continuation prose is inserted before context memo so it is not discarded; final-chapter continuation strips premature final markers and keeps only the latest final marker; final-chapter extraction now splits after the last final marker; planned chapter count is aligned to target length around 8,000 chars per chapter; live preview now renders memo-stripped manuscript text only and auto-scrolls the manuscript box itself instead of forcing page-level scroll jumps; fixed live status now shows current phase/chapter/chapter chars/total chars/update time at the top; audit/save failures now trigger chapter-level regeneration with explicit retry guidance before fail-closed stop; partial management markers such as `【全章の` are now split/sanitized and rejected if still present before save; long-novel audit repair is capped at two attempts before the chapter is regenerated; completion state keeps the manuscript-box scroll class. |
| `src/prompt.js` | Long-novel chapter guidance now uses the same roughly 8,000 chars/chapter planning basis, so 80,000 chars plans as about 10 chapters; char-count labels are parsed robustly; next-chapter prompts now prioritize the latest context memo/GMC+S and forbid replaying completed prior events; non-final chapters now explicitly cannot resolve the whole story; reproduction metadata version synced to `v3.7.9`. |
| `src/api.js` / `src/consistencyAudit.js` | Long-novel audit/fix calls now use bounded timeout and model-attempt options to reduce provider-side stalls during inspection and repair. |
| `src/style.css` | Disables smooth scrolling and scroll anchoring while long-novel live preview is active; during and after long-novel generation the novel body itself now fills the remaining right-side height and scrolls inside the manuscript box. |
| `package.json` / `package-lock.json` | Version synced to `3.8.1`. |
| `index.html` / `src/data.js` | Visible/internal version synced to `v3.8.1`; long-novel panel keeps a fixed live status line. |
| `src/prompt.js` | Reproduction metadata version synced to `v3.8.1`. |
| `README.md` | Added `v3.8.1` changelog and full-run QA result. |

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

## Verification State
- `node --check src/main.js` passed for `v3.8.1`.
- `npm run build` passed for `v3.8.1`.
- `npm run lint --if-present` passed for `v3.8.1`.
- `git diff --check` passed for the touched Story Maker files; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.8.1`.
- Browser QA with a user-entered Gemini API key passed for `v3.8.1`: 10 / 10 chapters, 80,343 chars, clean final manuscript scan, sticky/fixed output frame verified.
- `npm run build` passed for `v3.7.8`.
- `npm run lint --if-present` passed for `v3.7.8`.
- `git diff --check` passed for the touched Story Maker files; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returns `Story Maker v3.7.8`.
- Pre-patch browser QA on `v3.7.6` saved chapters 1-4, corrected a chapter 4 location contradiction automatically, but was stopped because a `【全章の` admin fragment remained in the visible manuscript after chapter 3.
- Pre-patch browser QA on `v3.7.5` saved chapters 1 and 2, then stopped fail-closed at chapter 3 because the generated chapter replayed chapter 2's completed event and audit repair could not fix the structural contradiction.
- `npm run build` passed for `v3.7.5`.
- `npm run lint --if-present` passed for `v3.7.5`.
- `git diff --check` passed for the touched Story Maker files; only normal LF-to-CRLF warnings were reported.
- HTTP check passed: `http://127.0.0.1:5179/` returned `Story Maker v3.7.5`.
- Before the patch, `v3.7.3` full-run browser QA reached chapter 10 but stopped fail-closed with: chapter body too short (4006 / 4800) while raw continuation had grown through five retries.
- Prior `v3.7.3` checks: build, lint, diff-check, HTTP 200, and live-status structural check passed.
- Previous user-entered Gemini API manual QA passed on `v3.7.1`: chapter 1 saved, generation continued into chapter 2, and chapter-end pause stopped after chapter 2 at `2 / 11` with `生成を再開` visible.

## Remaining Risks / Manual QA
- Full 10-chapter end-to-end generation completed on `v3.8.1` with a user-entered API key. Do not ask for or store the API key in chat or files.
- If the provider keeps returning short prose below the minimum even after continuation attempts, the app should continue to fail closed instead of saving a broken chapter.
- Startup/default option handling is still planned: make hidden fallback defaults visible or apply mode-specific defaults when each mode chip is clicked.

## Next Steps
1. Implement the planned startup/default option handling correction across modes.
2. Continue tuning literary quality with real prompt samples, while keeping fail-closed body adoption.
3. Deploy only after an explicit deploy request.
