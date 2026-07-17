# Editorial High-score Refinement Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore automatic refinement beyond 89 points and make later attempts preserve the accepted manuscript while targeting only its remaining editorial weaknesses.

**Architecture:** Keep the existing review, candidate rollback, format, length, ending, and duplicate gates. Separate the public score tier from the automatic refinement target, add a high-score precision contract to the rewrite prompt, and ensure a rejected candidate's review is never mistaken for the accepted manuscript's current review.

**Tech Stack:** Vanilla JavaScript ES modules, Node assertions/test runner, Vite.

## Global Constraints

- Target app is `C:\Users\sx717\Antigravity\story-maker`.
- Automatic refinement may run at most three attempts and aims for 100, while 85 remains public-ready and 90 remains editorial-pass classification.
- A candidate must still improve the accepted score and pass all existing safety gates before adoption.
- High-score attempts must preserve the accepted manuscript and focus on at most three concrete weaknesses.
- Do not change model routing, add dependencies, version-bump, commit, push, deploy, release, or back up.
- Completion requires fresh focused tests, full tests, lint, generic guards, diff check, build, browser smoke, and a real API run when the current UI is API-ready.

---

### Task 1: Restore the 100-point automatic target

**Files:**
- Modify: `tests/editorialBrushupRuntime.test.js`
- Modify: `src/editorialBrushupRuntime.js`

**Interfaces:**
- Consumes: `runEditorialBrushup(...)`, `shouldStartAutomaticBrushup(...)`.
- Produces: automatic continuation for valid scores below 100, capped at three attempts.

- [ ] **Step 1: Write failing regression assertions**

```js
assert.equal(shouldStartAutomaticBrushup({ checked: true, review: { valid: true, score: 89 }, running: false }), true);
const scores = [78, 85, 92, 100];
// Assert three adopted attempts and final score 100.
```

- [ ] **Step 2: Run RED**

Run: `node tests/editorialBrushupRuntime.test.js`
Expected: FAIL because the current implementation stops automatic refinement at 85.

- [ ] **Step 3: Restore the target without changing score tiers**

```js
const EDITORIAL_BRUSHUP_TARGET_SCORE = 100;
```

Use that target in loop continuation, automatic-start eligibility, and queued continuation. Keep `getEditorialScoreTier()` only for labels/outcomes.

- [ ] **Step 4: Run GREEN**

Run: `node tests/editorialBrushupRuntime.test.js`
Expected: PASS.

### Task 2: Keep rejected-candidate feedback aligned with the accepted manuscript

**Files:**
- Modify: `tests/editorialBrushupRuntime.test.js`
- Modify: `src/editorialBrushupRuntime.js`

**Interfaces:**
- Consumes: accepted `currentText`/`currentReview`, rejected `candidateReview`, and `decision.issues`.
- Produces: `buildEditorialBrushupPrompt({ text, review, mode, modeLabel, rejectedCandidate })`.

- [ ] **Step 1: Write failing prompt-alignment assertions**

```js
// After an 89 -> 87 rejection, attempt 2 must still identify the 89-point
// accepted manuscript and its unresolved problem as the source of truth.
assert.match(secondPrompt, /前回候補は不採用/);
assert.match(secondPrompt, /受理済み原稿の問題/);
```

- [ ] **Step 2: Run RED**

Run: `node tests/editorialBrushupRuntime.test.js`
Expected: FAIL because current code assigns the rejected candidate review to `latestGuidanceReview`.

- [ ] **Step 3: Implement aligned retry context**

```js
if (decision.adopt) {
  currentText = candidateText;
  currentReview = candidateReview;
  rejectedCandidate = null;
} else {
  rejectedCandidate = { review: candidateReview, issues: decision.issues };
}
```

Always build the next prompt from `currentReview`. Label rejected feedback explicitly so its changes are not assumed to exist in `currentText`.

- [ ] **Step 4: Run GREEN**

Run: `node tests/editorialBrushupRuntime.test.js`
Expected: PASS.

### Task 3: Add high-score precision guidance and complete verification

**Files:**
- Modify: `tests/editorialBrushupRuntime.test.js`
- Modify: `src/editorialBrushupRuntime.js`
- Modify: `HANDOFF.md`

**Interfaces:**
- Consumes: accepted review score, problems, and revision plan.
- Produces: high-score prompt guidance that limits changes to three concrete weaknesses and preserves unrelated strengths.

- [ ] **Step 1: Write a failing high-score prompt assertion**

```js
assert.match(highScorePrompt, /修正対象を最大3箇所/);
assert.match(highScorePrompt, /それ以外の場面/);
```

- [ ] **Step 2: Run RED, implement the minimal guidance, and run GREEN**

Run: `node tests/editorialBrushupRuntime.test.js`
Expected before implementation: FAIL; expected after implementation: PASS.

- [ ] **Step 3: Run the full local gate**

```powershell
node --test "tests/**/*.test.js"
npm run lint --if-present
npm run check:generic-rules
npm run check:nano-4koma-contract
git diff --check -- . ':!dist'
npm run build
```

Expected: all commands exit 0; an existing Vite chunk-size warning is non-blocking.

- [ ] **Step 4: Verify runtime behavior**

Start the existing Story Maker Vite route on port 5179, confirm no overlay/console errors, and safely check only whether the API UI is configured. If API-ready, run a real refinement and record attempts, accepted/rejected scores, final score, preservation gates, and visible completion state. Never read or serialize the key.

- [ ] **Step 5: Record evidence without publishing**

Append a concise local-only result to `HANDOFF.md`. Do not commit, stage, push, deploy, release, version-bump, or back up.

## Execution Result — 2026-07-17

- [x] Restored automatic continuation below the 100-point target, capped at three attempts.
- [x] Kept rejected-candidate feedback separate from the accepted manuscript review.
- [x] Added high-score precision guidance limited to the remaining weaknesses.
- [x] Required reviews below 100 to identify the exact passage, defect, point loss, and numbered repair action instead of praise-only commentary.
- [x] Exposed `問題点` and `改稿方針` in the review card and applied verified wrapping/overflow containment to every review text box.
- [x] Removed the unsupported `temperature` field from the GPT-5.x Responses request body.
- [x] Completed focused tests, 82/82 full tests, syntax/diff checks, generic guards, Nano contract check, and production build.
- [x] Completed a real GPT-5.5 run: initial 85, attempt 1 candidate 92 adopted, attempts 2 and 3 candidates 86/88 rejected, final retained score 92 with one footer.
