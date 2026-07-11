# Universal Editorial Brush-up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace public Longify expansion with safe universal AI editorial review and up to three score-driven brush-up passes for every public output mode.

**Architecture:** Extract mode-aware review contracts and candidate adoption rules into focused modules. Keep provider access in the existing runtime, reuse only Longify review/validation concepts, and make the public brush-up installer operate on the current Output without target-length expansion or chapter rebuilding.

**Tech Stack:** Vanilla JavaScript ES modules, Vite, Node test runner, existing Gemini/OpenAI provider clients.

## Global Constraints

- Preserve `短編`, `中編`, and `長編（10000字～）`; keep the legacy long-novel route sealed.
- Replace public `この小説を長編化` with `この小説をブラッシュアップ` and remove public target-length controls.
- Every public mode receives an AI review; an evaluation failure never deletes or replaces generated Output.
- Passing requires score 82 or higher plus the active mode's mechanical/format gates.
- Auto brush-up stops on pass or after three attempts and never adopts a degraded candidate.
- `long_10000` generation and equally large rewrite calls use a 600,000 ms inactivity timeout; short review/audit calls retain their current limits.
- Do not change the default model router, add dependencies, deploy, release, or back up as part of implementation.

---

### Task 1: Mode-aware editorial review contracts

**Files:**
- Create: `src/editorialReviewContracts.js`
- Test: `tests/editorialReviewContracts.test.js`

**Interfaces:**
- Produces: `getEditorialReviewFamily(mode)`, `buildEditorialReviewPrompt({ mode, modeLabel, text })`, `parseEditorialReview(text)`, `evaluateEditorialPass({ review, mechanicalOk })`.

- [ ] **Step 1: Write the failing contract tests**

```js
assert.equal(getEditorialReviewFamily('short'), 'fiction');
assert.equal(getEditorialReviewFamily('letter'), 'practical');
assert.match(buildEditorialReviewPrompt({ mode: 'script', modeLabel: '脚本', text: '本文' }), /台詞|場面進行/);
assert.deepEqual(parseEditorialReview('AI総合点: 84点\nAI講評:\n良い'), { score: 84, commentary: '良い', valid: true });
assert.equal(evaluateEditorialPass({ review: { score: 84, valid: true }, mechanicalOk: true }).passed, true);
assert.equal(evaluateEditorialPass({ review: { score: 90, valid: true }, mechanicalOk: false }).passed, false);
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node tests/editorialReviewContracts.test.js`
Expected: FAIL because `src/editorialReviewContracts.js` does not exist.

- [ ] **Step 3: Implement the focused contract module**

```js
export const EDITORIAL_PASS_SCORE = 82;
const PRACTICAL_MODES = new Set(['letter', 'business', 'summary']);
const SCRIPT_MODES = new Set(['script', 'screenplay', 'dialogue']);
export function getEditorialReviewFamily(mode = '') {
  if (PRACTICAL_MODES.has(mode)) return 'practical';
  if (SCRIPT_MODES.has(mode)) return 'script';
  return 'fiction';
}
export function parseEditorialReview(text = '') {
  const score = Number(text.match(/AI総合点\s*[:：]\s*(\d{1,3})点?/)?.[1]);
  const commentary = text.match(/AI講評\s*[:：]\s*([\s\S]+)/)?.[1]?.trim() || '';
  return { score, commentary, valid: Number.isFinite(score) && score >= 0 && score <= 100 && commentary.length > 0 };
}
export function evaluateEditorialPass({ review, mechanicalOk }) {
  return { passed: Boolean(review?.valid && mechanicalOk && review.score >= EDITORIAL_PASS_SCORE) };
}
```

`buildEditorialReviewPrompt()` must emit the exact headings `AI総合点`, `AI講評`, `良い点`, `問題点`, `改稿方針`, and `モード契約適合`, plus the selected family's criteria named in the specification.

- [ ] **Step 4: Run GREEN and commit**

Run: `node tests/editorialReviewContracts.test.js`
Expected: PASS.

Commit: `git add src/editorialReviewContracts.js tests/editorialReviewContracts.test.js && git commit -m "feat: add mode-aware editorial review contracts"`

### Task 2: Safe candidate comparison and rollback

**Files:**
- Create: `src/editorialBrushupCandidate.js`
- Test: `tests/editorialBrushupCandidate.test.js`

**Interfaces:**
- Consumes: `validateDirectLong10000Submission(text)` for `long_10000`.
- Produces: `evaluateBrushupCandidate({ originalText, currentText, candidateText, mode, currentReview, candidateReview, formatOk })`.

- [ ] **Step 1: Write failing adoption tests**

```js
assert.equal(evaluateBrushupCandidate({ originalText, currentText, candidateText: shortDraft, mode: 'long_10000', currentReview, candidateReview, formatOk: true }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText, currentText, candidateText: improvedDraft, mode: 'short', currentReview: { score: 78 }, candidateReview: { score: 84 }, formatOk: true }).adopt, true);
assert.equal(evaluateBrushupCandidate({ originalText, currentText, candidateText: unfinishedDraft, mode: 'short', currentReview, candidateReview, formatOk: true }).adopt, false);
assert.equal(evaluateBrushupCandidate({ originalText, currentText, candidateText: duplicateDraft, mode: 'short', currentReview, candidateReview, formatOk: true }).adopt, false);
```

- [ ] **Step 2: Run RED**

Run: `node tests/editorialBrushupCandidate.test.js`
Expected: FAIL because the candidate module is missing.

- [ ] **Step 3: Implement fail-closed candidate evaluation**

```js
export function evaluateBrushupCandidate(input) {
  const issues = [];
  if (!input.formatOk) issues.push('format');
  if (!hasCompletedEnding(input.candidateText)) issues.push('unclosed_ending');
  if (hasDuplicateParagraph(input.candidateText)) issues.push('duplicate_paragraph');
  if (input.mode === 'long_10000') issues.push(...validateDirectLong10000Submission(input.candidateText).issues);
  const scoreImproved = input.candidateReview.valid && input.candidateReview.score > (input.currentReview?.score ?? -1);
  return { adopt: issues.length === 0 && scoreImproved, issues };
}
```

Require a completed ending, no duplicate paragraph, valid mode format, and for `long_10000` at least 10,000 non-whitespace body characters. Never mutate the supplied original/current text.

- [ ] **Step 4: Run GREEN and commit**

Run: `node tests/editorialBrushupCandidate.test.js`
Expected: PASS.

Commit: `git add src/editorialBrushupCandidate.js tests/editorialBrushupCandidate.test.js && git commit -m "feat: add safe brushup candidate selection"`

### Task 3: Long-output inactivity timeout policy

**Files:**
- Create: `src/generationTimeoutPolicy.js`
- Modify: `src/providerClients.js`
- Modify: `src/openAiResponsesBeta.js`
- Test: `tests/generationTimeoutPolicy.test.js`
- Test: `tests/providerClients.test.js`
- Test: `tests/openAiResponsesBeta.test.js`

**Interfaces:**
- Produces: `getGenerationTimeoutMs({ stage, mode, charLength })`, `LONG_OUTPUT_INACTIVITY_TIMEOUT_MS`.
- Provider calls consume an explicit timeout and refresh the streaming abort timer whenever a data event is received.

- [ ] **Step 1: Write failing timeout tests**

```js
assert.equal(getGenerationTimeoutMs({ stage: 'generation', mode: 'long_10000', charLength: 0 }), 600000);
assert.equal(getGenerationTimeoutMs({ stage: 'brushup', mode: 'short', charLength: 12000 }), 600000);
assert.notEqual(getGenerationTimeoutMs({ stage: 'review', mode: 'long_10000', charLength: 20000 }), 600000);
```

Add a mocked streaming test proving a chunk refreshes the abort timer rather than extending short review calls.

- [ ] **Step 2: Run RED**

Run: `node tests/generationTimeoutPolicy.test.js && node tests/providerClients.test.js && node tests/openAiResponsesBeta.test.js`
Expected: the new policy assertions fail.

- [ ] **Step 3: Implement and wire the policy**

```js
export const LONG_OUTPUT_INACTIVITY_TIMEOUT_MS = 600_000;
export function getGenerationTimeoutMs({ stage, mode, charLength = 0 }) {
  if ((stage === 'generation' && mode === 'long_10000') || (stage === 'brushup' && charLength >= 10_000)) return LONG_OUTPUT_INACTIVITY_TIMEOUT_MS;
  return null;
}
```

Keep existing provider defaults when the policy returns `null`. In streaming code, clear and recreate the inactivity timer on every valid data chunk.

- [ ] **Step 4: Run GREEN and commit**

Run: `node tests/generationTimeoutPolicy.test.js && node tests/providerClients.test.js && node tests/openAiResponsesBeta.test.js`
Expected: PASS.

Commit: `git add src/generationTimeoutPolicy.js src/providerClients.js src/openAiResponsesBeta.js tests/generationTimeoutPolicy.test.js tests/providerClients.test.js tests/openAiResponsesBeta.test.js && git commit -m "feat: add long-output inactivity timeout policy"`

### Task 4: Universal review and brush-up runtime

**Files:**
- Create: `src/editorialBrushupRuntime.js`
- Modify: `src/main.js`
- Modify: `src/legacyMain.js`
- Test: `tests/editorialBrushupRuntime.test.js`

**Interfaces:**
- Consumes: current Output text/mode, provider caller, Task 1 review functions, Task 2 candidate evaluator, Task 3 timeout policy.
- Produces: `runEditorialReview(options)`, `runEditorialBrushup(options)`, `installEditorialBrushupRuntime()` and root datasets for `editorialReviewResult`, `editorialBrushupResult`, score, attempt, and issues.

- [ ] **Step 1: Write failing runtime tests**

Test these paths with injected provider functions: review pass; invalid review retried once; review failure preserves Output; one improved candidate adopted; degraded candidate rejected; auto loop stops on 82+; auto loop stops after three attempts.

```js
const result = await runEditorialBrushup({ text: original, mode: 'short', autoUntilPass: true, maxAttempts: 3, callAi });
assert.equal(result.attempts <= 3, true);
assert.equal(result.originalText, original);
assert.equal(result.text, improved);
```

- [ ] **Step 2: Run RED**

Run: `node tests/editorialBrushupRuntime.test.js`
Expected: FAIL because the runtime module is missing.

- [ ] **Step 3: Implement review and brush-up orchestration**

```js
export async function runEditorialReview({ text, mode, modeLabel, callAi }) {
  const prompt = buildEditorialReviewPrompt({ text, mode, modeLabel });
  let parsed = parseEditorialReview((await callAi(prompt, { stage: 'review' })).text);
  if (!parsed.valid) parsed = parseEditorialReview((await callAi(`${prompt}\n前回は形式不正。指定見出しだけで再回答。`, { stage: 'reviewRetry' })).text);
  return parsed;
}
export async function runEditorialBrushup({ text, mode, modeLabel, autoUntilPass, maxAttempts = 3, callAi }) {
  const originalText = text;
  let currentText = text;
  let currentReview = await runEditorialReview({ text, mode, modeLabel, callAi });
  let attempts = 0;
  while (attempts < maxAttempts && (attempts === 0 || autoUntilPass) && currentReview.score < 82) {
    attempts += 1;
    const candidateText = (await callAi(buildBrushupPrompt({ text: currentText, review: currentReview, mode, modeLabel }), { stage: 'brushup' })).text;
    const candidateReview = await runEditorialReview({ text: candidateText, mode, modeLabel, callAi });
    const decision = evaluateBrushupCandidate({ originalText, currentText, candidateText, mode, currentReview, candidateReview, formatOk: true });
    if (decision.adopt) { currentText = candidateText; currentReview = candidateReview; }
    if (currentReview.score >= 82) break;
  }
  return { originalText, text: currentText, review: currentReview, attempts };
}
```

`installEditorialBrushupRuntime()` attaches exactly one handler to `#btn-longify-beta`, reads the current Output/mode at click time, writes only adopted text back to Output, and stores review/brush-up status in root datasets for browser verification.

Do not write commentary into Output. Do not mark generation failed when review alone fails. Preserve the last adopted text after timeout, abort, invalid review, or rejected candidate.

- [ ] **Step 4: Run GREEN and commit**

Run: `node tests/editorialBrushupRuntime.test.js && node tests/directLong10000Runtime.test.js`
Expected: PASS.

Commit: `git add src/editorialBrushupRuntime.js src/main.js src/legacyMain.js tests/editorialBrushupRuntime.test.js && git commit -m "feat: add universal editorial brushup runtime"`

### Task 5: Replace public Longify UI without reopening legacy long mode

**Files:**
- Modify: `index.html`
- Modify: `src/publicRuntime.js`
- Modify: `src/longifyBeta.js`
- Modify: `src/outputCleanup.js`
- Test: `tests/longifyBeta.test.js`
- Test: `tests/outputCleanup.test.js`
- Test: `tests/editorialBrushupRuntime.test.js`

**Interfaces:**
- Public button remains `#btn-longify-beta` only if retaining the ID avoids unrelated CSS churn; its user-visible copy and action become brush-up.
- Remove/hide `#longify-target-chars` from the public panel and prevent public Longify installation.

- [ ] **Step 1: Write failing public-contract tests**

Assert exact visible copy `この小説をブラッシュアップ`, auto checkbox copy remains `合格点まで自動ブラッシュアップ（最大3回）`, no public target select, no callable public Longify action, and `長編（10000字～）` remains in public modes.

- [ ] **Step 2: Run RED**

Run: `node tests/longifyBeta.test.js && node tests/editorialBrushupRuntime.test.js && node tests/outputCleanup.test.js`
Expected: FAIL on old Longify copy/installer/target control.

- [ ] **Step 3: Update UI and seal the old public installer**

Change explanatory copy to say Output can be reviewed and improved without length expansion. Leave internal Longify exports/tests available only where needed for historical/dev compatibility, but ensure `publicRuntime.js` installs only the new editorial runtime in public operation.

- [ ] **Step 4: Run GREEN and commit**

Run: `node tests/longifyBeta.test.js && node tests/editorialBrushupRuntime.test.js && node tests/outputCleanup.test.js && node tests/publicLongModeSeal.test.js`
Expected: PASS.

Commit: `git add index.html src/publicRuntime.js src/longifyBeta.js src/outputCleanup.js tests/longifyBeta.test.js tests/outputCleanup.test.js tests/editorialBrushupRuntime.test.js && git commit -m "feat: replace public Longify with editorial brushup"`

### Task 6: Full verification and real API acceptance

**Files:**
- Modify: `HANDOFF.md`
- Modify: `C:/Users/sx717/Antigravity/PLAN.md`

- [ ] **Step 1: Run static and automated verification**

Run:

```powershell
node --test "tests/**/*.test.js"
npm.cmd run lint --if-present
git diff --check -- . ':!dist'
npm.cmd run build
```

Expected: every test passes; lint/diff/build exit 0. Record existing non-blocking warnings separately.

- [ ] **Step 2: Browser-check every public review family**

Generate or load one real Output for fiction, script, practical, and special-format families. Confirm review score, commentary, pass/fail, unchanged Output on review failure, and no legacy target-length control.

- [ ] **Step 3: Run real long-output brush-up**

Use the configured UI API session without exposing the key. Run `長編（10000字～）`, confirm 10,000+ characters and completion, then run brush-up. Accept only if final Output remains 10,000+, complete, mechanically valid, and the UI shows the actual AI score/result. Confirm the long rewrite can exceed five minutes without aborting and still respects the 10-minute inactivity limit.

- [ ] **Step 4: Verify rollback and failure states**

Using injected automated tests plus one browser abort/failed-review path where safe, prove the original/adopted Output remains present and the UI reports the failure honestly.

- [ ] **Step 5: Update handoff and plan, then commit**

Record exact test count, build result, browser families checked, real model route, before/after score and length, timeout duration, remaining risks, and the fact that no deploy/release/backup was run.

Commit: `git add HANDOFF.md && git commit -m "docs: record universal brushup verification"`
