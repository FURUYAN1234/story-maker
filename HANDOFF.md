# Story Maker Handoff

This file is public-repository safe. Do not include API keys, private credentials, billing data, private tokens, personal local paths, or unreleased account details.

## 2026-07-12 Brush-up progress and quality-target fix (local only)

- The public v5.3.2 brush-up click was accepted but disabled the button without visible running feedback. Live inspection of the same public tab later showed one completed pass and a score change from 78 to 89.
- Local source now displays API-running phases for initial review, rewrite attempt N/3, and post-rewrite rescoring. The rewritten manuscript is then revealed progressively instead of appearing all at once, and the button label is restored after success or failure.
- The pass threshold is now 90. Automatic brush-up aims for 100 and continues for up to three attempts even after crossing 90, while candidate adoption still requires a higher score plus the existing content-loss, ending, duplicate, format, and long-output gates.
- Focused regression coverage is in `tests/editorialBrushupRuntime.test.js` and `tests/editorialReviewContracts.test.js`. No deploy, push, release, backup, or version bump was performed.
- API-state correction: two localhost tabs were open. Codex initially inspected the QA tab and incorrectly reported no key; the user's normal localhost tab was then verified with a masked key, `banner locked ok`, and ChatGPT API selected. A real short-story API generation was started there, but the Chrome tab stopped responding to automation before completion evidence could be collected. Do not classify this as missing API input.
- Final live verification after the progress/quality fixes: a real short story generated at 3,630 chars / 89 points, then automatic brush-up ran 3/3 attempts and finished at 5,816 chars / 91 points. The top progress window showed each generation/rescore stage, progressive reveal was observed growing from 515 to 3,924 to 5,816 chars, and the final watermark appeared once at the end. A separate 78-char QA run verified the yellow API-running banner, hidden initial-generation score board, no watermark during progressive reveal, and exactly one final watermark. The QA URL/text was removed from the visible app and the QA file was deleted afterward.

## 2026-07-11 v5.3.2 Universal AI Review and Brush-up

- Public `この小説を長編化` was replaced by `この小説をブラッシュアップ`; public target-length controls were removed. Short, medium, and `長編（10000字～）` remain, while legacy long stays sealed.
- All public generation modes now receive a separate AI review with an 82-point pass gate. Brush-up performs at least one rewrite when explicitly clicked, can continue up to three attempts when auto mode is enabled, and adopts only an improved mechanically valid candidate.
- Safety gates preserve the current manuscript on API/review failure, reject incomplete or duplicate candidates, retain at least 60% of any 500+ character source, and enforce 10,000+ non-whitespace body characters for `long_10000`.
- Long direct-generation and 10,000+ character brush-up OpenAI Responses calls use a 600,000 ms timeout. Short review calls remain 120,000 ms.
- User-reported readability regression was fixed: the review card is full width with a 32 px score, score bar, 14 px commentary, 26.6 px measured line height, and paragraph-preserving `pre-wrap`.
- Real OpenAI acceptance run 1: direct long generation passed at 24,417 non-whitespace body characters with no dedicated issues; automatic editorial review scored 86/pass.
- During acceptance run 2, a restored long manuscript was accidentally tested while the active UI mode had reset to 4koma, exposing a real generic content-loss defect: a 25,157-character source could adopt a 1,451-character candidate. The candidate gate was fixed to reject reductions below 60% for all modes, with regression coverage.
- Real OpenAI acceptance rerun 2: active mode `long_10000`, auto repeat off, exactly one rewrite attempt; final body 24,404 non-whitespace characters / 25,510 visible characters, score 89/pass, completed ending, no continuation marker, duplicate paragraphs 0, and changed text. This supersedes the failed wrong-mode diagnostic run.
- Earlier real fiction proof also passed: automatic review 86/pass, and a weak 70-character input improved in one adopted attempt to 3,016 visible characters / 86.
- Final verification passed after the v5.3.2 bump: the full 82-test suite, lint, syntax/diff, and build. Source commit `1cb16ef` is pushed to `origin/main`; annotated tag `v5.3.2` is pushed; the bilingual GitHub Release is `https://github.com/FURUYAN1234/story-maker/releases/tag/v5.3.2`.
- Deploy proof: `origin/gh-pages` commit `0d00450e5e2b3537e302fa1142c951e12dff6dd3`; live GitHub Pages returns `Story Maker v5.3.2`, JS `assets/index-DEgycRxd.js`, CSS `assets/index-DXEhrIwa.css`, the brush-up copy/runtime markers, content-loss gate, and score-card styling.
- User explicitly requested a full PS1 backup after the two long acceptance runs passed. Do not treat this handoff as backup completion until the final ZIP and Drive copy are verified.

## 2026-07-08 v5.3.0 GPT-5.x Responses default release

- User asked to make the standard OpenAI path default to GPT-5.x Responses beta with fallback, verify real API generation in the in-app browser, then version bump, deploy, and run the Antigravity backup.
- Runtime changes: OpenAI text calls now try the GPT-5.x Responses beta route by default unless explicitly disabled. Normal generation prefers `gpt-5.5`; Longify can continue through `gpt-5.5 -> gpt-5.4 -> gpt-5.4-mini -> existing Chat Completions`.
- Standard-output safety fix: post-evaluation fallback notices no longer overwrite an already completed standard Output panel. Regression coverage lives in `src/standardFallbackUi.js` and `tests/standardFallbackUi.test.js`.
- Longify fix: repeated generic episode-arc warnings still trigger retries, but if all retries are exhausted and the chapter otherwise has the correct heading, length, and bounds, Longify adopts it with an explicit warning instead of failing the entire run. Regression coverage was added in `tests/longifyBeta.test.js`.
- Fresh real API proof used only the user-entered key already stored in the browser UI; Codex verified presence without reading, printing, pasting, or persisting the key. Default local URL had no `gpt5xBeta=1` flag: `http://127.0.0.1:5179/?codexDefaultGpt5Proof=20260708c`.
- Browser proof: standard generation completed with tag `gpt-5.5 (Responses beta)`, 667 visible chars, self scores 89/87/90, and Output remained full story text rather than fallback status text.
- Browser proof: Longify beta target `10000` with auto brush-up on completed 3 chapters, 10,916 posting-site chars / 11,399 visible chars, tag `gpt-5.4 (Responses beta)`, format check pass, structure check pass, AI review 82/pass, one explicit episode-arc warning on chapter 2, and no final failure.
- Verification passed after version bump: `node --test "tests/**/*.test.js"` 74/74, `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build` (Vite chunk-size warning only).
- Local browser smoke after version bump showed `Story Maker v5.3.0`, no Vite overlay, and the stored ChatGPT API session still locked without exposing the key.
- Deploy proof: `npm run deploy` published `origin/gh-pages` commit `b40904f`; live GitHub Pages `https://furuyan1234.github.io/story-maker/index.html?deploy=v530-codex-20260708b` returned `Story Maker v5.3.0` with JS asset `assets/index-hLQXsLLf.js`. In-app browser live smoke showed `Story Maker v5.3.0`, no Vite overlay, and live-page-origin warning/error logs 0.
- Source commit `6a825a2` is pushed to `origin/main`; annotated tag `v5.3.0` is pushed; GitHub Release is `https://github.com/FURUYAN1234/story-maker/releases/tag/v5.3.0`.
- Local distribution sync: GitHub Release ZIP was extracted to `C:\story-maker-main`; `package.json` reports `5.3.0`, file count is 292, and no nested duplicate folder was created.
- The requested full Antigravity backup is the next operation; do not treat this handoff as backup completion until the ZIP artifact is verified.

## 2026-07-08 GPT-5.x Responses beta local proof and Longify closure repair

- User asked Codex to move Story Maker forward from the old GPT-4-era OpenAI path and test the API in the in-app browser.
- Runtime changes: `src/openAiResponsesBeta.js` adds the internal Responses API beta route for `?gpt5xBeta=1`; `src/providerClients.js`, `src/legacyMain.js`, and `src/longifyBeta.js` allow that route for standard story generation, long-novel call sites, and Longify. Query model selection such as `?gpt5xModel=gpt-5.5` now wins over UI/default model options.
- Longify changes: `src/longifyBeta.js` now performs final closure repair before the final format/structure audit in both normal Longify and brush-up paths. Repairs are capped, short, and aimed only at closing truncated chapter endings.
- Regression coverage: `tests/openAiResponsesBeta.test.js` covers default model candidates, query-model priority, nonstream behavior, streaming opt-in, and fallback; `tests/longifyBeta.test.js` covers final closure repair for normal Longify and brush-up.
- Fresh in-app browser proof used the user-entered API key in the app UI only; Codex verified presence without reading, printing, pasting, or persisting the key. URL: `http://127.0.0.1:5179/?gpt5xBeta=1&gpt5xModel=gpt-5.5&codexApiProof=20260708`.
- Browser result: standard seed generation completed with `gpt-5.5 (Responses beta)` and about 3,235 chars. Longify target `10000` plus auto brush-up completed with tag row `ブラッシュアップβ3章13,208字gpt-5.4 (Responses beta)`, final output about 13,898 visible chars, structure check pass, AI score 82/pass, and `brushupFinalClosureRepair` evidence. Important limitation: longer Longify calls fell back from requested `gpt-5.5` to `gpt-5.4 Responses beta`.
- Verification passed: `node tests\openAiResponsesBeta.test.js`, `node tests\longifyBeta.test.js`, `node tests\longifyContinuity.test.js`, `node --test "tests/**/*.test.js"` 73/73, `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build` (Vite chunk-size warning only).
- Full Opus/Fable consultations timed out during this pass; a shorter Claude advice check succeeded and supported placing closure repair before structure audit. Do not record this as full Opus/Fable approval.
- No deploy, tag, release, backup, commit, push, or staging was run in this pass.

## 2026-07-08 v5.2.9 Longify quality-precision release

- User asked Codex to deploy Story Maker and run the full Antigravity backup after the real API proof.
- Source commit `4028fa1` is pushed to `origin/main`; annotated tag `v5.2.9` is pushed; GitHub Release is `https://github.com/FURUYAN1234/story-maker/releases/tag/v5.2.9`.
- Runtime changes: `src/longifyBeta.js` now adds a Longify brush-up `quality_precision_contract` with opening state, turning action, ending state, required delta, concrete anchors, and event-target keys. The event repetition detector can now catch repeated action-target shapes, and the Longify AI review prompt includes `quality_precision_review` guidance.
- Version bumped to `5.2.9` in package files, `src/version.js`, `index.html`, and README. Regression coverage was added in `tests/longifyBeta.test.js`.
- Fresh real API proof before deploy used the user-entered browser key without reading, printing, pasting, or persisting it. ChatGPT API standard generation produced a 1,269-char seed; Longify target `10000` reached 10,062 non-whitespace/progress chars before auto brush-up; the new event-target detector fired on Chapter 2 vs Chapter 3; final output reached 10,460 visible chars / 10,089 non-whitespace chars, 3 chapter headings, one v5.2.8 footer, format pass, structure pass, AI score 82/pass, duplicate paragraphs 0, repeated 24-char grams at least 3 times 0, duplicate sentences 1, browser warning/error logs 0, and no Vite overlay.
- Verification passed after the version bump: `node tests\longifyBeta.test.js`, `node --check src\longifyBeta.js`, `node --check tests\longifyBeta.test.js`, `node --check src\version.js`, `node --test "tests/**/*.test.js"` 72/72, `npm run lint --if-present`, `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, `git diff --check -- . ':!dist'` (CRLF warnings only), `npm run build`, and `npm run deploy` (Vite chunk-size warning only).
- In-app browser local smoke on `http://127.0.0.1:5179/?longifyBetaDev=1&codexDeploySmoke=529` showed `Story Maker v5.2.9`, target choices 10,000/20,000 enabled and 30,000+ disabled, no Vite overlay, and warning/error logs 0. Served source contains `quality_precision_contract`, `quality_precision_review`, and `event_type_targets`.
- Deploy proof: `npm run deploy` published `origin/gh-pages` commit `45ea70b`; live GitHub Pages `https://furuyan1234.github.io/story-maker/?deploy=v529-codex-20260708` returned `Story Maker v5.2.9` with JS asset `assets/index-Cn0kxQ1p.js`; the live JS contains `5.2.9`, `quality_precision_contract`, `quality_precision_review`, and `event_type_targets`. In-app browser live smoke showed `Story Maker v5.2.9`, no Vite overlay, and warning/error logs 0.
- Local distribution sync: GitHub Release ZIP was extracted to `C:\story-maker-main`; `package.json` reports `5.2.9`, file count is 288, and no nested duplicate folder was created.
- The requested full Antigravity backup is the next operation; do not treat this handoff as backup completion until the ZIP artifact is verified.

## 2026-07-06 v5.2.8 long-form guard release

- User asked Codex to deploy Story Maker and run the standard full Antigravity backup.
- Source commit `2faf038` is pushed to `origin/main`; annotated tag `v5.2.8` is pushed; GitHub Release is `https://github.com/FURUYAN1234/story-maker/releases/tag/v5.2.8`.
- Runtime changes: `src/promptBuilder.js` now fails closed for legacy long-novel prompt requests while public Longify beta remains the supported long-form path; `src/longifyBeta.js` now passes structure warnings into top-up prompts so `episode_retake` warnings steer additions toward irreversible progress instead of replaying old scenes.
- Version bumped to `5.2.8` in package files, `src/version.js`, `index.html`, and README. Regression coverage was added in `tests/promptBuilder.test.js` and `tests/longifyBeta.test.js`.
- Fresh local real-API proof before deploy used the user-entered browser key without reading, printing, pasting, or persisting it: ChatGPT standard generation completed with 1,402 chars and self scores 92/89/99; Longify beta target `10000` with auto brush-up off completed 12,073 chars, 3 chapters, one footer, format pass, structure pass, duplicate paragraphs 0, and browser warn/error logs 0. AI review was 76 / needs brush-up, so this is a functionality and structure proof, not a literary-quality pass.
- Verification passed: `node tests\promptBuilder.test.js`, `node tests\longifyBeta.test.js`, `npm run check:nano-4koma-contract`, `npm run lint --if-present`, `node --test "tests/**/*.test.js"` 72/72, `node --check` on changed JS/test files, `git diff --check -- . ':!dist'`, and `npm run build` (Vite chunk-size warning only).
- Deploy proof: `npm run deploy` published `origin/gh-pages` commit `1731af2`; live GitHub Pages `https://furuyan1234.github.io/story-maker/index.html?deploy=v528-...` returned `Story Maker v5.2.8` with JS asset `assets/index-Dqs2XEfd.js`, and the live JS asset contains `5.2.8`, `長編モード停止中`, `構造警告`, and `episode_retake`.
- Local distribution sync: GitHub Release ZIP was extracted to `C:\story-maker-main`; `package.json` reports `5.2.8`, file count is 287, and no nested duplicate folder was created.
- The requested full Antigravity backup is the next operation; do not treat this handoff as backup completion until the ZIP artifact is verified.

## 2026-07-02 v5.2.7 public Longify beta limited unseal

- User approved the limited unseal: public/default Longify beta is reopened for OpenAI-recommended 10,000/20,000-character targets, while 30,000+ targets and the old legacy long-novel output mode remain sealed.
- Version bumped to `5.2.7` in package files, `src/version.js`, `index.html`, and README.
- Runtime change: `src/longifyBeta.js` now enables the Longify beta installer publicly instead of requiring local `?longifyBetaDev=1`. The fallback sealed text no longer says `検証不合格`.
- Regression coverage in `tests/longifyBeta.test.js` now asserts public GitHub/local runtimes enable Longify beta, the installer attaches, the visible action is `この小説を長編化`, auto brush-up remains available, 10,000/20,000 are enabled, and 30,000+ remain disabled.
- Reusable browser-output samples are stored in `docs/verification_samples/`: score 83 and score 86 text plus metadata. The 86 text SHA256 is `F5DAF8CCBB6BAE3B725728E842A8DB46BC0ED0A20CFE18ECB85E1054B23FCE43`.
- Verification passed: RED `node tests\longifyBeta.test.js` first failed on the public runtime still returning false; GREEN focused longify test passed; `node tests\publicLongModeSeal.test.js`, `node --check` on changed JS/test files, full `node --test "tests/**/*.test.js"` 72/72, `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, `git diff --check -- . ':!dist'`, and `npm run build` passed (Vite chunk-size warning only).
- In-app browser local proof: `http://127.0.0.1:5179/?codexPublicLongifyUnseal=1` showed `Story Maker v5.2.7`, installer attached, action `longify`, button text `この小説を長編化`, status `Output生成・貼り付け・TXTインポート後に使用できます`, enabled targets `10000`/`20000`, disabled targets `30000` and above, no `長編化βは停止中` / `検証不合格` text, and warn/error logs 0.
- Deploy proof: `npm run deploy` published `origin/gh-pages` commit `85d5e75`; live GitHub Pages `https://furuyan1234.github.io/story-maker/?v=527-codex-unseal-...` showed `Story Maker v5.2.7`, asset `assets/index-DYR8594k.js`, installer attached, enabled targets `10000`/`20000`, disabled targets `30000` and above, no old stop/failure text, and browser warn/error logs 0.
- At this point, commit/tag/GitHub Release, PS1 full backup, and the user-requested follow-up 30,000-character local test are still pending.

## 2026-07-02 Fable additional brush-up score improvement pass

- User asked Codex to consult Fable again and try additional score improvement for Longify beta brush-up. Fable route selected `claude-fable-5[1m]`; the first long prompt timed out, then a shorter consultation returned prioritized advice.
- Fable's highest-leverage advice was to keep the progression ledger as compact structured state, not prose: per chapter `new_facts`, `open_threads`, and `forbidden_repeats`, capped to recent chapters so the prompt does not crowd out story context.
- Codex implemented this in `src/longifyBeta.js`: brush-up progression ledgers now include `newFacts`, `openThreads`, and `forbiddenRepeats`; `buildLongifyBrushupProgressionGuide()` outputs a compact `structured_state` block and caps prior accepted ledgers to the latest 5 chapters.
- Regression coverage in `tests/longifyBeta.test.js` now pins structured ledger extraction and prompt inclusion for `structured_state`, `new_facts`, `open_threads`, and `forbidden_repeats`.
- Verification passed: RED `node tests\longifyBeta.test.js` first failed because `newFacts` was missing; GREEN `node tests\longifyBeta.test.js` passed; `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, and `npm run build` passed (Vite chunk-size warning only).
- In-app browser at `http://127.0.0.1:5179/?longifyBetaDev=1` reloaded successfully, showed Story Maker v5.2.6 with `longifyBetaDev=1`, browser warn/error logs 0, and the dev server source at `/src/longifyBeta.js` contains `structured_state` and `forbiddenRepeats`.
- Fresh real-API brush-up score proof is still unverified in this pass because the visible in-app browser currently shows `API未設定` and the API key input value length is 0. Do not paste keys into chat or files; have the user enter the key in the app UI before continuing the live run.
- No deploy, tag, release, backup, commit, push, or staging was run in this pass.

- Follow-up real API proof after the user entered the key in the in-app browser UI: Codex verified only key presence, not the key value. ChatGPT API was selected on `http://127.0.0.1:5179/?longifyBetaDev=1`.
- Standard generation completed first: Output 1,256 visible chars, `#btn-longify-beta` enabled, browser warn/error logs 0.
- Longify beta was run with target `10000`. The actual UI auto brush-up checkbox was `#longify-auto-brushup-until-pass` and remained checked, so this proof is an automatic brush-up run rather than manual-only. Initial Longify result: 3 chapters, 11,806 posting-site chars, format pass, structure pass, AI score 75 / needs brush-up.
- Automatic brush-up completed: 3 chapters, 11,139 visible chars / 10,785 posting-site chars, format pass, structure pass, minimum 10,000 chars reached, AI score 83 / pass, browser warn/error logs 0. Final button text returned to `この長編小説をブラッシュアップする` and stop button hidden.
- Post-run mechanical audit: duplicate paragraphs 0, duplicate sentences 0, repeated 24-char grams 0, chapter-pair 4-gram Jaccard 1-2 `0.021`, 1-3 `0.035`, 2-3 `0.027`.

- User asked to preserve the current 83-point text for future verification before trying one more brush-up. Codex saved the immediate backup to `scratch/longify-backups/longify-current-before-brushup-2026-07-02T03-45-07-440Z.txt` (SHA256 `AF6439602BE5FA45DFF3A7E093707D6326CDEA7261970328C9FBD11E70D9935D`) and a durable reusable verification sample to `docs/verification_samples/longify-structured-ledger-score83-v5.2.6-2026-07-02.txt` (SHA256 `CCCAE1D35110A6BCC817A2A48B90C0FD560ED3878E0E997DF0A9190068A9CE40`) plus metadata `docs/verification_samples/longify-structured-ledger-score83-v5.2.6-2026-07-02.meta.json` (SHA256 `D3CB73F2C3A8C25633A2F35DECE8E610C4E0340FC6E86B254F30EA58AC907048`). These files do not include API keys.
- One manual-only brush-up was then run with `#longify-auto-brushup-until-pass` confirmed unchecked. It completed with 3 chapters, 12,371 visible chars / 11,901 posting-site chars, format pass, structure pass, minimum 10,000 chars reached, AI score 86 / pass, browser warn/error logs 0. Final button text returned to `この長編小説をブラッシュアップする`, stop button hidden, and auto brush-up remained off.
- Post-run mechanical audit after the 86-point brush-up: duplicate paragraphs 0, duplicate sentences 0, repeated 24-char grams 0, chapter-pair 4-gram Jaccard 1-2 `0.029`, 1-3 `0.033`, 2-3 `0.035`.

- User then asked to preserve the 86-point output itself for future verification. Codex saved it to `scratch/longify-backups/longify-score86-before-unseal-decision-2026-07-02T03-58-21-914Z.txt` and to the durable sample `docs/verification_samples/longify-structured-ledger-score86-v5.2.6-2026-07-02.txt` (SHA256 `F5DAF8CCBB6BAE3B725728E842A8DB46BC0ED0A20CFE18ECB85E1054B23FCE43`) plus metadata `docs/verification_samples/longify-structured-ledger-score86-v5.2.6-2026-07-02.meta.json` (SHA256 `247438EF693737B8CA12E3976E14414B2AD3208AF88142C8F5AFCB06195C8AE8`). These files do not include API keys.
- Limited unseal assessment: it is reasonable to remove the public Longify beta `verification failed / paused` seal and explanation for OpenAI-recommended 10k/20k beta use, because the recent browser proofs reached 80/82/83/86 with format/structure pass and low mechanical repetition. Keep score rollback, structure gates, and the beta warning. Do not unseal 30k+ targets, Gemini long-form claims, or the old legacy long-novel public mode (`src/data.js`, `src/prompt.js`, `src/publicLongModeSeal.js`) without separate fresh proof.

## 2026-07-02 Fable-triaged Longify beta local dev proof

- User entered the API key in the in-app browser UI only; Codex did not read, print, paste, or persist the key.
- Public/default page still keeps Longify beta sealed. `src/longifyBeta.js` now only enables the Longify beta installer on local `localhost` / `127.0.0.1` when `?longifyBetaDev=1` is present; GitHub Pages/public URLs remain disabled even if that query is present.
- In-app browser proof ran on `http://127.0.0.1:5179/?longifyBetaDev=1`.
- Standard seed generation through `#btn-generate` completed with OpenAI `gpt-4.1`: 1,535 posting-site chars, footer once, browser warn/error logs 0, and `#btn-longify-beta` became enabled.
- To reduce API spend, Codex unchecked auto brush-up and changed `#longify-target-chars` from `20000` to `10000` before clicking `#btn-longify-beta`.
- Longify beta completed: 3 chapters, 11,431 posting-site chars, one `Created By AI Story Maker V5.2.5` footer, format check pass, structure check pass, minimum 10,000 chars reached, AI review source active, AI score 80 / pass.
- Final browser state: `#btn-longify-beta` text `この長編小説をブラッシュアップする`, stop button hidden/disabled, status `AI講評を反映して長編小説をブラッシュアップできます`, review panel visible, browser warn/error logs 0.
- Verification passed after code changes: full JS test sweep, `node --check src\longifyBeta.js`, `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, targeted `git diff --check`, and `npm run build` (Vite chunk-size warning only).
- No deploy, tag, release, backup, commit, staging, or auto brush-up run was performed.
- Follow-up manual brush-up was run once from the same in-app browser state. The first brush-up pass completed with 3 chapters, 10,164 review chars / 10,191 audited posting-site chars, one footer, format check pass, structure check pass, AI score 82 / pass, and browser warn/error logs 0.
- Post-brush-up mechanical audit found no blocking/warning issues, no duplicate paragraphs, no duplicate sentences, no repeated 24-grams at least 3 times, and no paraphrase-loop pairs. Chapter-pair Jaccard stayed low: 1-2 `0.035`, 1-3 `0.033`, 2-3 `0.033`.
- Residual quality risk: the AI review still says chapters 2-3 have a subjective "same incident repetition" feel and need clearer scene progression, even though the deterministic loop audit passes.
- Follow-up Fable-advice implementation: `src/longifyBeta.js` now builds a per-chapter progression ledger for brush-up, feeds accepted prior-chapter ledgers forward into the next chapter prompt, and performs warning-level event-repetition detection for retry guidance instead of hard rejection. `tests/longifyBeta.test.js` pins ledger extraction, event-repetition detection, and prompt inclusion.
- Verification after the Fable-advice implementation: RED `node tests\longifyBeta.test.js` first failed on missing `buildBrushupProgressionLedgers` export; GREEN focused longify tests passed (`longifyBeta`, `longifyContinuity`, `longifyRetryAudit`), full `tests/**/*.test.js` sweep passed, `node --check src\longifyBeta.js`, `node --check tests\longifyBeta.test.js`, `npm run check:generic-rules`, `npm run check:nano-4koma-contract`, `npm run build`, and targeted `git diff --check -- src\longifyBeta.js tests\longifyBeta.test.js` passed (CRLF warnings only).
- In-app browser smoke after reload on `http://127.0.0.1:5179/?longifyBetaDev=1`: `readyState=complete`, title `Story Maker v5.2.5`, Longify installer attached, local dev action `longify`, target options rebuilt with 8 options and enabled `10000`/`20000`, API field present/password type, no Vite overlay, warn/error logs 0. The browser had no API value and Output was empty after reload, so no fresh real-API brush-up quality score was run in this follow-up.
- User corrected that the API key was already present in the in-app browser UI; Codex verified only masked/present state and did not read, print, paste, or persist the key.
- Fresh real OpenAI `gpt-4.1` browser run on `http://127.0.0.1:5179/?longifyBetaDev=1`: standard 4koma seed generation completed first with 856 visible Output chars and self-scores 85 / 92 / 99, then Longify beta was run with target `10000` and auto brush-up off.
- Longify first pass completed after retry/cleanup gates: 3 chapters, 11,500 visible Output chars / 11,088 posting-site chars, format check pass, structure check pass, minimum 10,000 chars reached, AI score 79 / needs brush-up, browser warn/error logs 0. Runtime evidence: chapter 2 initially failed for manga/script notation and short body, then passed via augmentation; chapter 3 initially failed for manga/script notation, then passed; final top-up cleaned mixed format artifacts before adoption.
- Manual brush-up was then run from the same browser state. Result: 3 chapters, 11,769 visible Output chars / 11,222 posting-site chars, AI score 82 / pass, format check pass, structure check pass, minimum 10,000 chars reached, browser warn/error logs 0. Mechanical audit found no format or structure issues, duplicate paragraphs 0, duplicate sentences 0, repeated 24-char grams 0, and chapter-pair 4-gram Jaccard 1-2 `0.006`, 1-3 `0.011`, 2-3 `0.017`.
- Residual quality risk remains: the AI review still flags subjective repetition in chapter events, especially recurring sign repair / dance / town bustle roles, weak chapter-by-chapter causal differences, and muted character change. During this run chapter 2's rewrite was rejected as too short and the original chapter was preserved, while chapters 1 and 3 used cleaned/best candidates plus final top-up cleanup. Treat this as a real improvement but not full literary repetition closure.
- At the time of the fresh real-API browser proof above, no deploy, tag, release, backup, commit, or staging had been run yet.

## 2026-06-21 visible Longify beta real API resume proof

- Resumed the interrupted standard visible Longify beta API proof on `http://127.0.0.1:5179/?codexRealLongifyResume=1`.
- User entered the API key in the app UI only; no key was pasted to chat or written to files. The app detected `Gemini API`.
- Standard seed generation completed through the visible `#btn-generate` route: Output became a 1,971-char seed story, `#btn-longify-beta` became enabled, no Vite overlay, and browser error log 0.
- Clicked the visible `#btn-longify-beta` exactly once with `#longify-target-chars` set to `10000` and auto brush-up checked.
- Longify first pass completed without a browser/app crash: 3 chapters, 10,551 displayed chars / 10,212 submission chars, one `Created By AI Story Maker V5.2.1` footer, format check pass, structure check pass, minimum 10,000 chars reached, AI score 62.
- Auto brush-up started after the 62-point review, retried invalid chapter rewrite shapes, performed minimum-char top-up, then stopped back at manual brush-up state. Final review stayed 62 points and still `要ブラッシュアップ`.
- Final browser state: `#btn-longify-beta` text is `この長編小説をブラッシュアップする`, stop button hidden/disabled, status is `AI講評を反映して長編小説をブラッシュアップできます`, no Vite overlay, browser error log 0.
- Result: the standard visible API route is executable and did not crash, but this Gemini run is not a quality pass. The review still reports repeated time-axis/penalty scenes and exposed planning/meta text. Do not claim Longify quality validation passed from this run.
- No deploy, tag, release, backup, commit, or staging was run.

## 2026-06-21 M4 dev-runner retirement and proof-route correction

- The prior `?longdev=1&pin=gemini:m4` proof route was the wrong target for the visible Longify beta UI. Treat all older handoff notes that say to run Gemini M4 as obsolete.
- `src/longNovel/outlinePlanner.js` no longer exposes active `m4`; `m4` is now a retired stage and `stageConfig({ stage: 'm4' })` throws.
- `src/longNovel/devPanel.js` renders only active longdev stages and disables retired URL pins instead of allowing a hidden M4 run.
- The visible Longify beta target choices now come from `LONGIFY_TARGET_POLICY` / `buildLongifyTargetOptions(...)` in `src/longifyBeta.js`; the policy owns the target unit, active/default target, choice list, and chapter-count breakpoints.
- `index.html` no longer carries the fixed Longify target option table. It keeps only a temporary placeholder, and the select is rebuilt from runtime policy during page initialization.
- Current-state check found a real standard-page bug: on an empty-output page, `#longify-target-chars` could remain stuck on the temporary placeholder because target-select initialization only happened through the output-assist/Longify lazy install path.
- Fix applied: `src/longifyBeta.js` now exports `syncLongifyTargetSelect(...)`, `src/publicRuntime.js` calls it during public runtime startup, and `tests/longifyBeta.test.js` pins that only `10000` is active while all higher policy targets stay disabled with `当面停止` labels.
- Current proof target is the visible Longify beta route only: use the standard page controls, `#longify-target-chars`, `#btn-longify-beta`, and `runLongifyBeta(...)`. Do not use M4 as proof for this work.
- Thread audit correction: the previous real API check was interrupted after the user entered an API key, standard seed generation completed, and the standard `#btn-longify-beta` 10000-char run started. That API proof was not completed and must not be treated as closed.
- Current browser state after the interruption is no longer the API-run state: only one 5179 tab is open, it is on the M4 retired recheck URL, the API input is empty, storage has no API-key/session entry, and Output is back to the initial help text. To resume the real API proof, open the standard visible page again and have the user enter the API key in the app UI; never ask for the key in chat.
- Verification passed after the route correction: focused longify/long tests, full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser proof passed:
  - Existing `?longdev=1&pin=gemini:m4` URL now shows no M4 button, only M1-M3 run buttons, all run buttons disabled by the retired pin, retired status text, no Vite overlay, and browser error log 0.
  - Standard page `?codexLongifyPolicy=1` shows no longdev panel; after page initialization, `#longify-target-chars` is rebuilt with 8 policy-derived options, only `10000` is enabled/selected, the temporary placeholder is gone, there is no Vite overlay, and browser error log 0.
- Do not use a Gemini Longify full run as refactor proof. A standard-page Gemini attempt was started after a seed generation, but the user clarified that Gemini long-form behavior is not meaningful for refactor verification; the run was stopped from the UI, the partial Longify result was not adopted, and the output remained the short seed story.
- No deploy, tag, release, backup, commit, staging, or new real API Longify proof has been completed after this correction yet.

## 2026-06-21 DOM character action binding extraction

- Continued the DOM event binding split after Output Copy/Download extraction.
- Added `bindCharacterActionButtons(...)` in `src/legacyDomEventBindings.js`.
- `src/legacyMain.js` now delegates the four character action click bindings through that helper:
  - add character
  - remove character
  - randomize character contents
  - randomize all character data
- Handler bodies remain local in `src/legacyMain.js`; this change only moves the event-registration responsibility.
- `tests/legacyDomEventBindings.test.js` now covers all four delegated click paths.
- Verification passed: `node --check src\legacyDomEventBindings.js`, `node --check src\legacyMain.js`, `node --check tests\legacyDomEventBindings.test.js`, `node tests\legacyDomEventBindings.test.js`, full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smoke on `http://127.0.0.1:5179/?codexCharacterActionsDom=1&fresh=...` passed: `Story Maker v5.2.1`, API field present/editable, all four character action buttons present, character count `0`, no Vite overlay, and browser error log 0.
- No real API call, deploy, tag, release, backup, commit, or staging was run.

## 2026-06-21 DOM output copy/download binding extraction

- Continued the DOM event binding split after the section-clear helper.
- Added `normalizeFourKomaScenarioExportText(...)` in `src/legacyDomEventBindings.js` for the existing 4koma scenario export label cleanup.
- Added `bindOutputCopyDownloadButtons(...)` in `src/legacyDomEventBindings.js`.
- `src/legacyMain.js` now delegates Output Copy/Download event registration through the helper while preserving:
  - 4koma scenario export label normalization for `Topic`, `Logline`, `Location`, `Outfit`, `Punchline`, and `Scenario`.
  - clipboard success/reset labels.
  - timestamped TXT download names using `state.lastTitle || "story"`.
  - Blob/object URL/link-click download behavior.
- `tests/legacyDomEventBindings.test.js` now covers export normalization, non-4koma pass-through, clipboard writes, label reset timing, Blob creation, object URL generation, download filename, and link click.
- Verification passed: `node --check src\legacyDomEventBindings.js`, `node --check src\legacyMain.js`, `node --check tests\legacyDomEventBindings.test.js`, `node tests\legacyDomEventBindings.test.js`, full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser DOM smoke on `http://127.0.0.1:5179/?codexOutputActionsDom=2&fresh=...` passed: `Story Maker v5.2.1`, API field present/editable, Copy/Download buttons present but `display:none` on initial empty output, no Vite overlay, and browser error log 0.
- A direct click smoke was not kept because the initial empty-output state hides `#btn-copy`; unit coverage pins the copied/downloaded behavior without needing a generated story.
- No real API call, deploy, tag, release, backup, commit, or staging was run.

## 2026-06-21 DOM section-clear binding extraction

- Continued the uncommitted `src/legacyMain.js` refactor after the user clarified that the refactor work was not finished.
- Added `bindSectionClearButtons(...)` in `src/legacyDomEventBindings.js`.
- `src/legacyMain.js` now delegates `.btn-section-clear` registration through that helper, while preserving the existing behavior through injected callbacks:
  - `chars` still calls the character clear path.
  - `mode` still resets to `4koma`, clears `modeSource`, updates active chips/custom input, and reapplies forced defaults.
  - axis sections still clear custom input, category/sub chips, state keys, and axis source.
  - `supplement` still clears the supplemental text and clear button.
- `tests/legacyDomEventBindings.test.js` now covers locked no-op, default-filled deletion, chars/mode/axis/supplement clear behavior, mode chip activation, and axis-source reset.
- Verification passed: `node --check src\legacyDomEventBindings.js`, `node --check src\legacyMain.js`, `node --check tests\legacyDomEventBindings.test.js`, `node tests\legacyDomEventBindings.test.js`, full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smoke on `http://127.0.0.1:5179/?codexSectionClearDom=1&fresh=...` passed: `Story Maker v5.2.1`, `document.readyState=complete`, API field present/editable, 11 `.btn-section-clear` buttons, no Vite overlay, and browser error log 0.
- No real API call, deploy, tag, release, backup, commit, or staging was run.
- Remaining refactor is still real work: additional DOM wiring separation, deeper standard-generation orchestration cleanup, provider/API streaming boundary cleanup, longify retry/audit wrapper cleanup, and the manual-key long-novel proof/redesign closure.

## 2026-06-21 continuation completion audit

- Re-audited the current worktree after the goal continuation request instead of relying on the prior handoff text.
- No additional code change was needed in this audit pass.
- Current local checks passed again: full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- Port 5179 is the Story Maker Vite dev server (`vite --host 127.0.0.1 --port 5179`) and returned HTTP 200.
- In-app browser audit on `http://127.0.0.1:5179/?longdev=1&pin=gemini:m4&codexCompletionAudit=1&fresh=...` showed:
  - title/header v5.2.1, `document.readyState=complete`, no Vite overlay, empty browser error log;
  - `#engine-label` was `API未設定`, `#apikey` was present, empty, password type, and editable;
  - longdev panel was visible, URL pin was active, only the Gemini M4 run button was enabled, and OpenAI/Both/other stages were disabled by the pin;
  - visible journal status was `journal: gemini m4 paused / scenes 50 / chapters 10 / final 10`, which is not a completed proof because `src/longNovel/devPanel.js` only hydrates non-`done` journals into that status.
- Remaining blocker is unchanged: final Gemini M4 proof requires the user to type the Gemini API key into the app UI. Do not ask for the key in chat; after entry, run exactly one pinned Gemini M4 pass and use Resume if it pauses.
- No deploy, tag, release, backup, commit, or real API call was run in this audit pass.

## 2026-06-21 longify pre-top-up structure guard

- Continued the longify retry/audit cleanup after preserved-review reuse.
- Added `getLongifyPreTopupStructureBlock(...)` in `src/longifyRetryAudit.js`.
- `src/longifyBeta.js` now audits structure before minimum-character top-up in both fresh longify and brush-up flows.
- If `chapter_loop`, `episode_retake`, setting contradiction, or storyboard residue is already present, the flow returns a `structure` review instead of appending more text to the final chapter.
- Truncation-only cases are not blocked by this helper, so ending repair/top-up can still do useful completion work.
- `tests/longifyBeta.test.js` now separates normal top-up fixtures into distinct chapter bodies and pins that `brushupTopup` is not called when a chapter loop is detected before top-up.
- Verification passed: `node --check src\longifyRetryAudit.js`, `node --check src\longifyBeta.js`, `node --check tests\longifyBeta.test.js`, `node tests\longifyRetryAudit.test.js`, `node tests\longifyBeta.test.js`, full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smokes passed:
  - `http://127.0.0.1:5179/?codexTopupGuard=1&fresh=...`: v5.2.1, API field present, longify button/review container present, no Vite overlay, empty browser error log.
  - `http://127.0.0.1:5179/?longdev=1&pin=gemini:m4&codexTopupGuardLongdev=1&fresh=...`: v5.2.1, longdev panel visible, URL pin active with only Gemini/M4 enabled, active run-lock storage empty, no Vite overlay, empty browser error log.
- No real API call, deploy, tag, release, or backup was run.
- Remaining proof in `PLAN.md` is still the manual-key Gemini M4 run.

## 2026-06-21 longify preserved-review reuse fix

- Continued the uncommitted longify retry/audit extraction after the run-lock/provider-guard batch.
- Added reusable-review source helpers in `src/longifyRetryAudit.js`: `isReusableLongifyReviewSource(...)` and `selectReusableLongifyReviewText(...)`.
- `src/longifyBeta.js` now uses the helper in `getLongifyReviewPlainText()` so preserved `ai`, `failed`, `structure`, and `format` review cards feed their critique text into the next brush-up prompt.
- `local` auto-review text is intentionally not treated as prior AI critique.
- This closes the loop path where `structure`/`format` NG review cards were preserved in the UI but dropped before the next brush-up, leaving the retry without the audit reason it needed.
- Verification passed: `node --check src\longifyRetryAudit.js`, `node --check src\longifyBeta.js`, `node tests\longifyRetryAudit.test.js`, `node tests\longifyBeta.test.js`, full `node --test "tests/**/*.test.js"` (72/72), `npm run lint --if-present`, `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smokes passed:
  - `http://127.0.0.1:5179/?codexReviewReuse=1&fresh=...`: v5.2.1, API field present, longify button/review container present, no Vite overlay, empty browser error log.
  - `http://127.0.0.1:5179/?longdev=1&pin=gemini:m4&codexReviewReuseLongdev=1&fresh=...`: v5.2.1, longdev panel visible, URL pin active with only Gemini/M4 enabled, active run-lock storage empty, no Vite overlay, empty browser error log.
- No real API call, deploy, tag, release, or backup was run.
- Remaining proof in `PLAN.md` is unchanged: manually enter a Gemini API key in the app UI and run exactly one `?longdev=1&pin=gemini:m4` Gemini M4 pass; if it pauses, use Resume rather than restarting. Do not ask the user to paste an API key into chat.

## 2026-06-21 long-novel run-lock and longify retry/audit extraction

- Continued the uncommitted refactor after standard-generation, provider-streaming, and DOM-binding extraction.
- Added `src/longNovel/runLock.js` and `tests/long/runLock.test.js`.
- `src/longNovel/devPanel.js` now delegates longdev active-run acquire/touch/release/read/stale handling to the shared run-lock helper, including localStorage/sessionStorage mirroring and the active-token window flag.
- Added a provider-correction guard in `tests/long/validator.test.js`: Gemini first scene generation stays at temperature `0.85`, while OpenAI leaves first-scene temperature unset/default.
- Added `src/longifyRetryAudit.js` and `tests/longifyRetryAudit.test.js`.
- `src/longifyBeta.js` now delegates chapter post-validation overlap/contradiction guards and brush-up candidate retry/best-candidate/reject/preserve decisions to pure helpers while keeping API calls, UI progress reporting, prompts, and output assembly local.
- Verification passed: `node --check` for touched modules, `node tests\longifyRetryAudit.test.js`, `node tests\longifyBeta.test.js`, `node tests\longifyContinuity.test.js`, `node --test "tests/long/*.test.js"`, full `node --test "tests/**/*.test.js"` (72/72), `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smokes passed:
  - `http://127.0.0.1:5179/?codexLongifyRetryAudit=1&fresh=...`: v5.2.1, API field present, no Vite overlay, empty browser error log.
  - `http://127.0.0.1:5179/?longdev=1&pin=gemini:m4&codexFinalLongdev=1&fresh=...`: v5.2.1, longdev panel visible, URL pin active with only Gemini/M4 enabled, active run-lock storage empty, no Vite overlay, empty browser error log.
- UI displayed `API未設定`; no real API call, deploy, tag, release, or backup was run.
- Remaining proof in `PLAN.md`: manually enter a Gemini API key in the app UI and run exactly one `?longdev=1&pin=gemini:m4` Gemini M4 pass; if it pauses, use Resume rather than restarting. Do not touch OpenAI for that round.

## 2026-06-21 legacyMain API-tab session binding extraction

- Continued the uncommitted `src/legacyMain.js` refactor after the contract/state extraction checkpoint.
- Added `src/apiTabSessionPersistence.js` and `tests/apiTabSessionPersistence.test.js`.
- `src/legacyMain.js` now delegates API-tab sessionStorage write/restore, save/switch/edit handler wrapping, and click-handler rebinds to `createApiTabSessionPersistence(...)`.
- The existing `src/apiTabSession.js` snapshot/parse helpers remain the pure data boundary; the new persistence module owns browser storage and DOM listener wiring.
- Verification passed: `node --check src\apiTabSessionPersistence.js`, `node --check src\legacyMain.js`, `node tests\apiTabSession.test.js`, `node tests\apiTabSessionPersistence.test.js`, full `node --test "tests/**/*.test.js"` (65/65), `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smoke on `http://127.0.0.1:5179/?codexApiTabSession=1` passed: `Story Maker v5.2.1`, header visible, API field present, `⚠ API未設定`, `longNovelSealed=true`, no Vite overlay, and empty browser error log.
- No real API call, deploy, tag, release, or backup was run.
- Remaining refactor: standard-generation orchestration, provider/streaming boundary cleanup, broader DOM event binding separation, longify retry/audit wrapper cleanup, and final handling of the long-novel redesign TODO in `PLAN.md`.

## 2026-06-21 provider streaming parser extraction

- Continued the provider/API refactor after the API-tab session binding extraction.
- Added `src/providerStreamParsing.js` and `tests/providerStreamParsing.test.js`.
- `src/providerClients.js` now delegates OpenAI and Gemini SSE line parsing to `parseOpenAiStreamLine(...)`, `parseGeminiStreamLine(...)`, and `consumeSseLines(...)`.
- Added fake-stream coverage in `tests/providerClients.test.js` for `cf(...)` OpenAI streaming and `zs(...)` Gemini streaming, confirming chunk delivery and Gemini thought/body flags without any network call.
- Verification passed: `node --check src\providerClients.js`, `node --check src\providerStreamParsing.js`, `node tests\providerStreamParsing.test.js`, `node tests\providerClients.test.js`, full `node --test "tests/**/*.test.js"` (66/66), `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smoke on `http://127.0.0.1:5179/?codexProviderStream=1` passed: `Story Maker v5.2.1`, API field present, `⚠ API未設定`, `longNovelSealed=true`, no Vite overlay, and empty browser error log.
- No real API call, deploy, tag, release, or backup was run.
- Remaining refactor: standard-generation orchestration, broader DOM event binding separation, longify retry/audit wrapper cleanup, and final handling of the long-novel redesign TODO in `PLAN.md`.

## 2026-06-21 standard generation orchestration and DOM binding extraction

- Continued the uncommitted refactor after provider streaming parser extraction.
- Added `src/standardLiveProgress.js`, `src/standardThoughtScores.js`, `src/standardGenerationProgressLog.js`, and focused tests.
- `src/legacyMain.js` now delegates standard live-preview cleanup/phase/signal summaries, standard thought-score parsing/scoreboard rendering, and standard progress-log formatting out of `mh()` while keeping API orchestration and DOM assignment local.
- Added `src/legacyDomEventBindings.js` and `tests/legacyDomEventBindings.test.js`.
- `Eh()` now delegates fixed click-handler registration and lock-button toggle binding while keeping the existing handler bodies local.
- Verification passed: `node --check src\legacyMain.js`, focused helper tests, full `node --test "tests/**/*.test.js"` (70/70 after DOM batch), `git diff --check -- . ':!dist'` (CRLF warnings only), and `npm run build`.
- In-app browser smoke on `http://127.0.0.1:5179/?codexDomRefactor=1` passed: `Story Maker v5.2.1`, API field present, `笞 API譛ｪ險ｭ螳啻, `longNovelSealed=true`, empty browser error log, and API switch button verified Gemini -> OpenAI -> Gemini without a real API call.
- Theme lock buttons are intentionally not pointer-clickable while API is unset because the settings panel has `pointer-events: none`; unit coverage pins the lock binding helper itself.
- No real API call, deploy, tag, release, or backup was run.
- Remaining refactor: longify retry/audit wrapper cleanup and final handling of the long-novel redesign TODO in `PLAN.md`.

## 2026-06-19 Fallback Chain alignment (v5.2.1)

- Updated the shared Gemini fallback order in `src/data.js` to `gemini-3.5-flash` -> `gemini-2.5-flash` -> `gemini-2.5-pro` -> `gemini-flash-latest` -> `gemini-pro-latest`.
- Updated the default Gemini model returned by `src/apiKeyHelpers.js` and the longify beta default model in `src/longifyBeta.js` to `gemini-3.5-flash`.
- OpenAI chains remain unchanged: text `gpt-4.1` -> `gpt-4.1-mini` -> `gpt-4.1-nano` -> `gpt-4o`; vision `gpt-4.1` -> `gpt-4o` -> `gpt-4.1-mini`.
- Updated `4koma_scenario` to follow the current Nano Banana Pro STEP2 contract: every panel now carries `状況:` and requires at least one `キャラ名「短いセリフ。」` speech-bubble dialogue line.
- Added `scripts/check-nano-4koma-contract.mjs` and wired it into `npm run build`, so deploys stop if the adjacent Nano Banana Pro STEP2 contract changes before Story Maker is reviewed.
- Version identity was bumped from `v5.2.0` to `v5.2.1` in `package.json`, `package-lock.json`, `src/version.js`, `index.html`, and `README.md`.
- Nano Banana Pro scenario parser and prompt contract were checked before deploy work; this change intentionally aligns Story Maker's 4koma scenario format with the current Nano Banana Pro input contract.
- Verification status: `node --test "tests/**/*.test.js"` passed 55/55, `npm run build` passed, and the in-app browser Gemini 4koma scenario proof produced 4 panels with `状況:` plus quoted dialogue in every panel and no prose between `Scenario:` and `[1コマ目]`. Deploy/tag/release are next.

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

## 2026-06-21 Codex Refactor Batch: Legacy Main Contract and State Split

### What Changed

- Added `src/longNovelAnalogContracts.js`.
- Added `tests/longNovelAnalogContracts.test.js`.
- Added `src/outputModeContracts.js`.
- Added `tests/outputModeContracts.test.js`.
- Added `src/letterOutputRepair.js`.
- Added `tests/letterOutputRepair.test.js`.
- Added `src/apiTabSession.js`.
- Added `tests/apiTabSession.test.js`.
- Added `src/publicModeState.js`.
- Added `tests/publicModeState.test.js`.
- Added `src/publicLongModeSeal.js`.
- Added `tests/publicLongModeSeal.test.js`.
- Added `src/longNovelCompletionScore.js`.
- Added `tests/longNovelCompletionScore.test.js`.
- Added `src/longNovelTextDedupe.js`.
- Added `tests/longNovelTextDedupe.test.js`.
- Added `src/longNovelLocalComedyFilters.js`.
- Added `tests/longNovelLocalComedyFilters.test.js`.
- `src/legacyMain.js` now delegates selected v4.2.4/v4.2.7/v4.2.8/v4.3.0/v4.3.1/v4.3.5/v4.3.6/v4.3.7/v4.4.0, v4.4.2/v4.4.5, v4.5.0-v4.5.7/v4.5.9, v4.6.0/v4.6.1/v4.6.3/v4.6.5/v4.6.7/v4.6.8/v4.6.9, v4.7.2/v4.7.3/v4.7.7/v4.7.8/v4.7.9, v4.8.0/v4.8.1/v4.8.2/v4.8.5/v4.8.6/v4.8.8/v4.8.9, and v4.9.0/v4.9.3 long-novel/local-comedy contract text to the helper module.
- `src/legacyMain.js` now delegates public output-mode contract text v4.9.5-v4.9.7, default public mode options, final format checks, and line-break density checks to `src/outputModeContracts.js`.
- `src/legacyMain.js` now delegates letter-mode invalid-output detection, cleanup, candidate-line extraction, and fallback letter assembly to `src/letterOutputRepair.js`, while keeping current mode/settings reads local.
- `src/legacyMain.js` now delegates API-tab session snapshot construction and restore parsing to `src/apiTabSession.js`, while keeping sessionStorage access and API-key UI locking local.
- `src/legacyMain.js` now delegates public mode signal collection, public long-mode sealing/random exclusion, long-novel completion score calculation, repeated-text dedupe/continuation trimming, and local-comedy route filters/carrier lists to focused helper modules.
- Removed the dead `ot === false` legacy long-mode implementation block. Current hidden longdev remains served by `src/longNovel/devEntry.js`.
- `scripts/check-nano-4koma-contract.mjs` now scans `src/outputModeContracts.js` for the extracted Nano 4koma markers instead of requiring them to remain in `src/legacyMain.js`.
- Kept the remaining standard generation orchestration, provider calls, DOM event binding, and deeper long-novel retry/audit wrappers local to avoid broad behavior movement.

### Verification

- `node tests\longNovelAnalogContracts.test.js` passed.
- `node tests\outputModeContracts.test.js` passed.
- `node tests\letterOutputRepair.test.js` passed.
- `node tests\apiTabSession.test.js` passed.
- `node tests\publicModeState.test.js` passed.
- `node tests\publicLongModeSeal.test.js` passed.
- `node tests\longNovelCompletionScore.test.js` passed.
- `node tests\longNovelTextDedupe.test.js` passed.
- `node tests\longNovelLocalComedyFilters.test.js` passed.
- `node --check src\legacyMain.js` passed.
- `node --check src\apiTabSession.js` passed.
- `node --check src\longNovelAnalogContracts.js` passed.
- `node --check src\outputModeContracts.js` passed.
- `node --check src\letterOutputRepair.js` passed.
- `node --check src\publicLongModeSeal.js` passed.
- `node --check src\longNovelCompletionScore.js` passed.
- `node --check src\longNovelTextDedupe.js` passed.
- `node --check src\longNovelLocalComedyFilters.js` passed.
- `node --check scripts\check-nano-4koma-contract.mjs` passed.
- `node scripts\check-nano-4koma-contract.mjs` passed.
- `node --test "tests/**/*.test.js"` passed: 64/64.
- `git diff --check -- . ':!dist'` passed.
- `npm run build` passed.

### Remaining Refactor Direction

- `src/legacyMain.js` still owns standard generation orchestration, provider streaming, DOM event binding, and some deep long-novel retry/audit wrapper wiring. Treat further decomposition there as a new behavior-risk-managed pass, not as part of this contract/state extraction batch.
- Final in-app browser smoke proof passed on `http://127.0.0.1:5179/?longdev=1&pin=gemini:m4`: `Story Maker v5.2.1` loaded with `document.readyState=complete`, no Vite overlay, browser error log empty, `document.documentElement.dataset.longNovelSealed === "true"`, the public long-mode chip was hidden and disabled, `#btn-rand-mode` carried the random-exclusion hook, and the hidden `longdev` panel was present under the dev URL. The current UI displayed `⚠ API未設定`; no API generation was run in this proof.
## 2026-07-11 Direct 10,000-Character Mode

- Added the public left-menu mode `long_10000` with the exact label `長編（10000字～）`; existing short and medium modes remain available, while the sealed legacy long mode remains hidden.
- The new route reuses standard generation/provider streaming and cleanup, injects a direct 10,000-character contract, and adds fail-closed checks for body length, completion, and duplicate paragraphs. It does not re-enable or depend on the abandoned legacy Longify pipeline.
- Real OpenAI API browser proof passed on `http://127.0.0.1:5179/`: dedicated result `passed`, dedicated body count `20,785`, no dedicated issues, natural completed ending, generate button restored. The run used the existing Responses fallback path and logged `gpt-5.4 Responses beta` during audit/evaluation fallback.
- Verification passed: `node --test "tests/**/*.test.js"` 77/77, focused `node --check`, lint, `git diff --check -- . ':!dist'`, and `npm run build`. Build retained the existing chunk-size warning and skipped the sibling Nano contract check because that sibling source is outside this isolated worktree layout.
- Branch/worktree: `codex/direct-10000-character-mode` at `C:\Users\sx717\.codex\worktrees\story-maker-direct-10000`.
- No deploy, push, release, backup, or version bump was performed.
# 2026-07-11 v5.3.1 Direct 10,000-Character Mode Deploy

- User approved the direct `長編（10000字～）` mode as the stable checkpoint before the separate universal editorial/brush-up implementation.
- Version is `5.3.1` in package files, `src/version.js`, `index.html`, and README.
- Public behavior: short and medium remain visible; `長編（10000字～）` is visible; the sealed legacy long-novel mode remains hidden. The direct route enforces a 10,000-character body minimum, completion, and duplicate-paragraph checks.
- Real OpenAI proof before deploy passed at 20,785 body characters with no dedicated validation issues and a completed ending.
- Verification passed on merged `main`: `node --test "tests/**/*.test.js"` 77/77, lint, syntax/diff checks, and production build. The build emitted only the existing large-chunk warning.
- Deploy passed: `npm run deploy` published `origin/gh-pages` commit `39002acd720e92799b28d9fb8f04087eaffbb1e7`. Live `https://furuyan1234.github.io/story-maker/?deploy=v531-codex-20260711` showed title/header `v5.3.1`, exact long-mode label, short/medium present, legacy long hidden, asset `assets/index-BWFjj774.js`, and browser error logs 0.
- Source `main` was pushed at `8714d7d60cbd2fe522ebe4e01af8a22544097c74` before this handoff evidence update.
- No GitHub Release, tag, local distribution sync, or backup was requested or performed.
- Next approved work: implement `docs/superpowers/specs/2026-07-11-universal-editorial-brushup-design.md`, beginning with a detailed implementation plan.
# 2026-07-11 Universal AI Editorial Review / Brush-up Implementation

- Replaced the public `この小説を長編化` UI with `この小説をブラッシュアップ`; removed the public target-length selector while preserving `短編`, `中編`, and `長編（10000字～）` and keeping legacy long sealed.
- Added mode-family review contracts, strict score parsing, an 82-point pass gate, candidate comparison, original-text rollback, and up to three automatic brush-up attempts.
- Added a 600,000 ms policy for direct `long_10000` OpenAI Responses calls and 10,000+ character brush-up calls; short AI review calls retain a 120,000 ms limit.
- Every successful standard generation now triggers a separate AI review. Review failure does not fail or replace the generated Output.
- User caught a UI regression during live proof: the first implementation used plain `textContent`, so the old score presentation CSS was bypassed. The fixed display uses a full-width card, 32 px score, 14 px commentary, 26.6 px measured line height, `pre-wrap` paragraph preservation, and a visible score bar.
- Fresh real OpenAI browser proof: short generation produced 4,205 characters and automatic AI review 86/pass. After the display fix, another short generation produced 3,436 characters and automatic AI review 86/pass. A deliberately weak 70-character local input was brushed up through the real API in one adopted attempt to 3,016 characters and 86/pass; UI dataset result was `completed`.
- Browser layout evidence: score `86/100`, score font `32px`, commentary font `14px`, line height `26.6px`, `white-space: pre-wrap`, review width `1760.8px` inside a `1791.2px` parent, target selector absent, configured API shown only as masked/ready.
- Browser console contained two Chrome-extension message-channel errors; app functional paths completed. No app-origin exception was observed.
- Verification passed: `node --test "tests/**/*.test.js"` 82/82, lint, focused `node --check`, `git diff --check -- . ':!dist'`, and `npm run build`. Build retained the existing large-chunk warning and isolated-worktree Nano sibling check skip.
- Remaining live acceptance gap: the new review/brush-up path has real API proof for the fiction family, but a fresh 10,000+ character brush-up and separate live script/practical/special-family runs have not yet been completed. Automated contract coverage exists for all families. Do not call the whole feature fully verified until those live checks are either completed or explicitly waived.
- No deploy, push, release, tag, version bump, distribution sync, or backup was performed for this brush-up implementation.

# 2026-07-12 Brush-up Runtime Progress and Review Reuse Fix

- Local-only fixes raise the editorial pass line to 90 while keeping the automatic target at 100 for up to three attempts. Only higher-scoring, completed, non-duplicated, mode-valid candidates replace the current manuscript.
- The running UI now shows the yellow API banner, top progress title/log, attempt `N/3`, 100-point target, and elapsed seconds. Standard-generation score bars are hidden during brush-up.
- The initial generation review is retained and reused for brush-up attempt 1. Attempts 2 and 3 use the immediately preceding rescore as revision guidance, including when a candidate is rejected for adoption.
- Standard generation and settings remain locked through the automatic initial review. Brush-up also locks generation/settings until its review, rewrite, rescore, progressive reveal, and final footer insertion finish.
- Rewritten text is progressively revealed; the Story Maker footer is absent during reveal and appended exactly once at the end.
- Real OpenAI UI proof on localhost: short-story run started at 84, ran 3/3, ended at 91, grew from 8,607 to 16,861 displayed characters, and finished with one footer. A second special-family proof started at 62, skipped duplicate initial review, displayed elapsed seconds, ran 3/3, and ended at 72 with 2,432 displayed characters and one footer.
- Verification: `node --test "tests/**/*.test.js"` 82/82, focused editorial tests, `npm run build`, and `git diff --check` passed. Build retains the existing large-chunk warning.
- No deploy, push, release, tag, version bump, distribution sync, backup, commit, or staging was performed. Local Vite remains open on port 5179; its two `scratch/brushup-progress-vite.*.log` files remain in use and untracked.
- New-generation reset follow-up: clicking `ストーリー生成` now synchronously clears the prior review card, review score/result, brush-up result/attempt count, and cached review, then disables `この小説をブラッシュアップ` until the new manuscript and its AI review complete. Real localhost proof started from a visible 58-point review card and confirmed all old fields empty/hidden and the brush-up button disabled immediately after the second generation click. The second manuscript completed and received a fresh 58-point review before controls were restored.
- The two 58-point special-family proofs exposed a separate initial-generation quality defect: `4コマ漫画風` returned all four panels plus `絵/状況` and `セリフ`, but omitted every required `狙い:` field. The AI review correctly cited mode-contract violations. This initial-generation contract failure is not fixed by the reset patch and must not be reported as resolved.
- Subsequent 4koma repair/review hardening now requires exactly four `絵/状況:`, `セリフ:`, and `狙い:` labels. Invalid initial output is automatically repaired under a visible yellow API status before editorial review; repaired output is protected from the normal cleanup observer so verified labels are not stripped during DOM insertion.
- Review scoring no longer receives the full internal format-contract text, which the model had confused with the evaluation target. A mechanically valid manuscript is instead certified with a short instruction that required public labels and the Story Maker footer are not violations. Real scores changed from false 58/72 deductions to 78 with content-only criticism (explanatory dialogue, punch speed, and surprise), without claiming internal-instruction/footer violations.
- The brush-up section now uses `is-waiting` visual state before and during initial review: measured opacity `0.48`, saturation `0.35`, disabled button, hidden old review. It returns to opacity `1` only after review completes.
- A lock-race regression was found and fixed: the first observer version re-disabled generation before the standard runtime's completion transition could trigger review, leaving all controls disabled. The corrected transition treats the standard button unlock as the review-start event, immediately starts review, then applies review-side locking. Fresh real API proof completed at 78 and restored generation, settings, and brush-up controls; yellow alert hidden and waiting class removed.

## 2026-07-12 Final same-generation review reuse and stream-status proof

- Root cause of the repeated pre-brush review was the wrong cache identity: reuse depended on an exact post-cleanup text fingerprint even though a new-generation click already defines the safe cache boundary. Reuse now follows the generation cycle: new generation clears it; the initial review and each accepted final review replace it.
- Generation and initial-review waiting now disable both the brush-up button and the auto-until-pass checkbox. During brush-up the whole section remains `is-busy`, with measured opacity `0.58`, and generation/brush-up/auto controls locked.
- Fresh real API proof after an explicit reload: initial review completed at 84; brush-up started directly with `改稿を生成中（1/3回・100点目標）` and never issued `元原稿を講評中`; three automatic attempts ended at 86, so the displayed score did not fall below the same-generation baseline.
- A second real one-attempt proof sampled the Output every 500 ms. Visible length progressed `6 -> 69 -> 120 -> ... -> 1,224`; every intermediate frame had zero Story Maker footers, and completion had exactly one footer. The running status remained `ブラッシュアップ本文を流れる表示で反映中...（開始からN秒経過）` instead of reverting to a stale rescore phase. It completed `1/3` at 86.
- Fresh verification after the final status fix: full tests `82/82`, production build, and `git diff --check` passed. No deploy, push, release, tag, version bump, backup, commit, or staging was performed.

## 2026-07-12 Auto-until-pass start correction

- The checked auto-until-pass option previously controlled only repetition after a manual brush-up click. It did not start brush-up automatically after the initial generation review, despite the public label implying automatic operation.
- Initial review completion now queues brush-up automatically when the checkbox is checked and the score is below the 100-point target. A new generation remains the cache/reset boundary, and unchecked mode still requires a manual click for one attempt.
- Fresh real API proof used only the Story Generate button: the checkbox stayed checked, initial review completed at 86, brush-up started automatically at `1/3`, advanced through `2/3` and `3/3`, and completed after 76 seconds. No brush-up button click was issued. All candidates failed to exceed 86, so the 86-point manuscript was preserved instead of adopting a lower-scoring result.
- Fresh verification: full tests `82/82`, production build, and `git diff --check` passed. No deploy, push, release, tag, version bump, backup, commit, staging, or server shutdown was performed.

## 2026-07-12 Per-attempt score/adoption evidence

- Each brush-up attempt already generated a candidate, rescored it, and compared that score with the currently retained manuscript, but the UI exposed only phase names and the final retained score. This made rejected candidates indistinguishable from a missing rescore.
- The progress log now records every decision as `previous score -> candidate score`, followed by `adopted` or the rejection reasons (`score did not improve`, content loss, format violation, incomplete ending, or duplication).
- Fresh real API proof: initial 78; attempt 1 candidate 72 rejected for content loss, format violation, and lower score; attempt 2 candidate 84 adopted; attempt 3 candidate 84 rejected because it did not improve. Final retained score was 84, checkbox stayed enabled, and the footer appeared once.
- There is no 90-point cap in the runtime. The 100-point target and maximum three attempts remain. A retained 89 means no accepted candidate exceeded 89 within those attempts, not that scoring stopped.
- Fresh verification after adding the decision log: focused editorial runtime test passed, full tests `82/82`, production build, and `git diff --check` passed. Local-only; no deploy, push, release, tag, version bump, backup, commit, or staging.

## 2026-07-12 Pass/target/exhaustion labeling correction

- The runtime intentionally has three separate concepts: pass threshold 90, aspirational brush-up target 100, and a maximum of three attempts. A below-90 run could therefore exhaust its attempts, but the old generic `brush-up complete` text misleadingly looked like a pass.
- Completion UI now distinguishes `100-point reached`, `passed (score / pass 90)`, and `maximum 3 attempts ended - not passed (score / pass 90)`. The document dataset also records `editorialBrushupOutcome=passed` or `exhausted_unpassed` while the process result remains completed.
- Fresh real API proof: initial 78; attempt 1 candidate 84 adopted; attempt 2 candidate 72 rejected for format and score; attempt 3 candidate 78 rejected for score. Final UI showed `最大3回終了・未合格（84点／合格90点）` with outcome `exhausted_unpassed`.
- A 91-point real run exists in this session history, so there is no hard 90-point ceiling. Current evidence nevertheless shows that 90 is a demanding threshold under the current rubric and three-attempt limit.
- Fresh verification: focused test, full tests `82/82`, production build, and `git diff --check` passed. Local-only; no deploy, push, release, tag, version bump, backup, commit, or staging.

## 2026-07-12 v5.3.3 Deploy and Backup Request

- User explicitly requested deploy and full backup. Public version was raised from `5.3.2` to `5.3.3` across package metadata, title/header, shared version/footer, review contract, tests, and README release notes.
- Pre-deploy verification passed: full tests `82/82`, lint if present, syntax checks for all `src/**/*.js`, generic-rule guard, Nano 4koma contract check, production build, `git diff --check`, and public secret/local-path scan. Build asset: `assets/index-D8cwPC0u.js`.
- GPT-5.6 org availability remained unverified because the browser-side `/v1/models` request was blocked by CORS. This release does not change model routing and has current real-API proof on the existing route.
- Deploy, live-page verification, Release/tag publication, and full backup artifact verification remain pending at this line and must be completed before closing the requested work.
