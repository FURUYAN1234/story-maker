# Story Maker Handoff

This file is public-repository safe. Do not include API keys, private credentials, billing data, private tokens, personal local paths, or unreleased account details.

## 2026-06-13 v5.0.2 Release State

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
