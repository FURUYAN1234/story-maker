# Story Maker Handoff

This file is public-repository safe. Do not include API keys, private credentials, billing data, private tokens, personal local paths, or unreleased account details.

## 2026-06-13 v5.0.2 Release State

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
