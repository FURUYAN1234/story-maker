# Direct 10,000-Character Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a public `長編（10000字～）` mode that uses the normal Story Maker generation flow to request a complete manuscript of at least 10,000 non-whitespace characters and verify it with a real API run.

**Architecture:** Add a distinct `long_10000` public-mode identifier and a focused helper module for its prompt and deterministic acceptance contract. Keep the existing legacy provider stream and bounded continuation behavior, but route the new mode through explicit target-length and completion checks without invoking sealed `long`/Longify code.

**Tech Stack:** Vanilla JavaScript ES modules, Vite, Node built-in test runner, existing Story Maker provider clients and browser runtime.

## Global Constraints

- Keep `short_short`, `novel`, and `medium` behavior unchanged.
- Visible label must be exactly `長編（10000字～）`.
- Target is at least 10,000 characters after excluding whitespace and line breaks.
- Do not expose or invoke the legacy `long` or Longify route.
- Do not add dependencies.
- Do not deploy, push, release, bump the public version, or run a workspace backup.
- Do not claim success until a real API UI run produces and verifies the required output.

---

### Task 1: Public mode registration

**Files:**
- Modify: `src/data.js`
- Modify: `src/modeContracts.js`
- Modify: `src/legacyOptionData.js`
- Modify: `src/outputModeContracts.js`
- Test: `tests/directLong10000Mode.test.js`

**Interfaces:**
- Consumes: existing public mode arrays and label maps.
- Produces: mode id `long_10000`, label `長編（10000字～）`, minimum target `10000`.

- [ ] **Step 1: Write the failing registry test**

```js
import assert from 'node:assert/strict';
import { MODES } from '../src/data.js';
import { PUBLIC_MODE_VALUES, MODE_LABELS, MODE_LENGTH_TARGETS } from '../src/modeContracts.js';

assert.equal(MODES.find(mode => mode.value === 'long_10000')?.label, '長編（10000字～）');
assert.equal(PUBLIC_MODE_VALUES.includes('long_10000'), true);
assert.equal(MODE_LABELS.long_10000, '長編（10000字～）');
assert.equal(MODE_LENGTH_TARGETS.long_10000.min, 10000);
assert.equal(MODES.some(mode => mode.value === 'long'), false);
```

- [ ] **Step 2: Run test and confirm RED**

Run: `node tests/directLong10000Mode.test.js`
Expected: FAIL because `long_10000` is not registered.

- [ ] **Step 3: Add the mode to the existing registries**

Add `{ value: 'long_10000', label: '長編（10000字～）' }` after `medium` and add `{ target: '10,000字以上', min: 10000 }` to the length contract. Keep the old `long` entry filtered/sealed.

- [ ] **Step 4: Run test and confirm GREEN**

Run: `node tests/directLong10000Mode.test.js`
Expected: PASS.

### Task 2: Direct manuscript contract and deterministic acceptance

**Files:**
- Create: `src/directLong10000.js`
- Modify: `src/prompt.js`
- Modify: `src/outputCleanup.js`
- Test: `tests/directLong10000.test.js`

**Interfaces:**
- Produces: `DIRECT_LONG_10000_MODE`, `DIRECT_LONG_10000_MIN_CHARS`, `isDirectLong10000Mode(mode)`, `buildDirectLong10000Contract()`, `submissionCharLength(text)`, and `validateDirectLong10000(text)`.
- Consumes: the existing normal-mode prompt builder and output cleanup flow.

- [ ] **Step 1: Write failing helper tests**

```js
import assert from 'node:assert/strict';
import {
  buildDirectLong10000Contract,
  submissionCharLength,
  validateDirectLong10000,
} from '../src/directLong10000.js';

assert.equal(submissionCharLength('あ い\nう'), 3);
assert.match(buildDirectLong10000Contract(), /10,000字以上/);
assert.equal(validateDirectLong10000('あ'.repeat(9999)).issues.includes('target_length'), true);
assert.equal(validateDirectLong10000(`${'あ'.repeat(10000)}。`).ok, true);
assert.equal(validateDirectLong10000(`${'あ'.repeat(10000)}\nつづく`).issues.includes('unclosed_ending'), true);
```

- [ ] **Step 2: Run test and confirm RED**

Run: `node tests/directLong10000.test.js`
Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the minimal pure helper**

The contract must require one complete Japanese prose work, at least 10,000 non-whitespace characters, no outline/meta commentary, no padding through repetition, and terminal `【完】`. Validation must return `{ ok, charCount, issues }` and identify `empty_output`, `target_length`, repeated long paragraphs, and `unclosed_ending`.

- [ ] **Step 4: Connect the helper to prompt and cleanup mode sets**

For `long_10000`, append the direct contract to the existing normal prompt. Treat it as narrative prose for cleanup without changing `novel` or `medium`.

- [ ] **Step 5: Run helper and existing prompt tests**

Run: `node tests/directLong10000.test.js; node tests/prompt.test.js; node tests/outputCleanup.test.js`
Expected: all PASS.

### Task 3: Runtime fail-closed integration

**Files:**
- Create: `src/directLong10000Runtime.js`
- Modify: `src/main.js`
- Test: `tests/directLong10000Runtime.test.js`

**Interfaces:**
- Consumes: current output DOM, selected mode, and completion event/state from the legacy normal-generation flow.
- Produces: an installed browser guard that records `data-direct-long-result`, measured count, and visible failure status without invoking Longify.

- [ ] **Step 1: Write failing runtime tests with a minimal fake DOM**

Test that installation is inert for `novel` and `medium`, accepts a 10,000-character completed manuscript, rejects 9,999 characters, rejects an unfinished ending, and never selects or queries `[data-v="long"]` as its route.

- [ ] **Step 2: Run test and confirm RED**

Run: `node tests/directLong10000Runtime.test.js`
Expected: FAIL because the runtime module does not exist.

- [ ] **Step 3: Implement the smallest post-generation guard**

Observe the existing output/status transition, validate only when `long_10000` is active and generation has ended, preserve partial text for inspection, and mark the UI as failed rather than successful when validation fails. Do not perform an automatic rewrite.

- [ ] **Step 4: Import the runtime after `legacyMain.js` in `src/main.js`**

Keep the current side-effect order intact and install only the new focused guard.

- [ ] **Step 5: Run runtime and public sealing tests**

Run: `node tests/directLong10000Runtime.test.js; node tests/publicLongModeSeal.test.js; node tests/publicModeState.test.js`
Expected: all PASS and sealed legacy `long` remains unavailable.

### Task 4: Full verification and live API run

**Files:**
- Modify: `HANDOFF.md`
- Modify: `C:\Users\sx717\Antigravity\PLAN.md`
- Create: `scratch/direct-long-10000/<timestamp>/` evidence files only as generated verification artifacts.

**Interfaces:**
- Consumes: completed implementation and current browser/API session.
- Produces: current automated, browser, model-availability, and real-output evidence.

- [ ] **Step 1: Run static and automated verification**

Run: `node --check` for modified JavaScript, targeted tests, `node --test "tests/**/*.test.js"`, `npm run lint --if-present`, `git diff --check -- . ':!dist'`, and `npm run build`.
Expected: zero failures.

- [ ] **Step 2: Start the local app and inspect the UI**

Run the standard Vite development command, open the local URL, verify the new button is visible, short and medium remain visible, and sealed `long` is not visible.

- [ ] **Step 3: Confirm API readiness and model availability safely**

Use only boolean/masked UI state or a safe server status endpoint. Never display the key. Confirm the actual returned model through the real response; mark the model check unverified if no safe route exists.

- [ ] **Step 4: Run a real 10,000-character generation**

Select `長編（10000字～）`, use ordinary generic settings, generate through the browser UI, wait for terminal completion, and save the resulting manuscript plus sanitized run metadata.

- [ ] **Step 5: Verify live acceptance evidence**

Measure non-whitespace characters, terminal `【完】`, duplicated passages, visible errors, enabled generate button, and provider/model evidence. If any required item fails, diagnose, write a failing regression test, fix, and rerun the live flow.

- [ ] **Step 6: Update coordination files and commit implementation**

Record satisfied/unmet/unverified items in `HANDOFF.md` and root `PLAN.md`, then commit the narrow implementation and evidence references. Do not deploy or push.
