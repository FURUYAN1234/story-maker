# Story Maker Handoff

This file is public-repository safe. Do not include API keys, private credentials, billing data, private tokens, personal local paths, or unreleased account details.

## 2026-06-13 v5.0.2 Release State

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
