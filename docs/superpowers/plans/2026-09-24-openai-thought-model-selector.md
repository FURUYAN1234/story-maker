# OpenAI Thought Model Selector Implementation Plan

> **Execution:** Use superpowers:executing-plans for normal task-by-task implementation. Use superpowers:subagent-driven-development only when the user or applicable project instructions explicitly request per-task delegation and the tasks are genuinely independent. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a responsive OpenAI text-model selector with an Astra public default, a Luna verification path, current price/description copy, downward-only fallback, and visible route status.

**Architecture:** A new pure catalog module owns model metadata, transient selection, and Responses/Chat route derivation. A small UI module renders and synchronizes the control without editing the large legacy runtime, while the existing provider modules consume catalog routes and emit attempt/adoption events.

**Tech Stack:** Vite 6, browser-native ES modules, plain JavaScript/HTML/CSS, Node `assert` tests, OpenAI Responses API and existing Chat Completions compatibility path.

## Global Constraints

- Public/default selection is exactly `gpt-6-astra` and reload resets to it.
- Live API verification explicitly selects exactly `gpt-6-luna`.
- Prices are the 2026-09-24 official Standard short-context USD-per-million-token snapshot.
- The visible catalog includes GPT-6 Astra/Sol/Luna, GPT-5.6 Sol/Terra/Luna, GPT-4.1/mini/nano, and GPT-4o.
- Gemini and OpenAI image/multimodal routes remain unchanged.
- No new dependency, local secret read, API-key persistence change, commit, push, deploy, release, or backup.
- Preserve the existing unrelated release-gate changes already present in the worktree.

---

### Task 1: Model catalog and downward routing

**Files:**
- Create: `src/openAiModelCatalog.js`
- Create: `tests/openAiModelCatalog.test.js`

**Interfaces:**
- Produces: `OPENAI_MODEL_OPTIONS`, `OPENAI_MODEL_PRICE_SNAPSHOT_DATE`, `DEFAULT_OPENAI_MODEL_ID`, `getSelectedOpenAIModelId()`, `setSelectedOpenAIModelId(id)`, `resetSelectedOpenAIModelId()`, `getOpenAIModelOption(id)`, `getOpenAIResponsesRoute(id)`, `getOpenAIChatRoute(id)`, and `formatOpenAIModelPrice(option)`.

- [ ] **Step 1: Write the failing catalog test**

```js
import assert from 'node:assert/strict';
import {
  DEFAULT_OPENAI_MODEL_ID,
  OPENAI_MODEL_PRICE_SNAPSHOT_DATE,
  getOpenAIChatRoute,
  getOpenAIModelOption,
  getOpenAIResponsesRoute,
  getSelectedOpenAIModelId,
  resetSelectedOpenAIModelId,
  setSelectedOpenAIModelId,
} from '../src/openAiModelCatalog.js';

assert.equal(DEFAULT_OPENAI_MODEL_ID, 'gpt-6-astra');
assert.equal(OPENAI_MODEL_PRICE_SNAPSHOT_DATE, '2026-09-24');
assert.deepEqual(OPENAI_MODEL_OPTIONS.map(model => model.id), [
  'gpt-6-astra', 'gpt-6-sol', 'gpt-5.6-sol', 'gpt-5.6-terra', 'gpt-6-luna',
  'gpt-5.6-luna', 'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4o',
]);
assert.deepEqual(getOpenAIResponsesRoute('gpt-6-luna')[0], 'gpt-6-luna');
assert.deepEqual(getOpenAIChatRoute('gpt-4.1-mini'), ['gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4o']);
assert.equal(getOpenAIModelOption('gpt-6-luna').inputPriceUsdPerM, 0.1);
setSelectedOpenAIModelId('gpt-6-luna');
assert.equal(getSelectedOpenAIModelId(), 'gpt-6-luna');
resetSelectedOpenAIModelId();
assert.equal(getSelectedOpenAIModelId(), 'gpt-6-astra');
console.log('openAiModelCatalog tests passed');
```

- [ ] **Step 2: Run the focused test and observe RED**

Run: `node tests/openAiModelCatalog.test.js`

Expected: `ERR_MODULE_NOT_FOUND` for `src/openAiModelCatalog.js`.

- [ ] **Step 3: Implement the catalog and route helpers**

Create the exported catalog with model IDs, display labels, concise Japanese descriptions, official Standard short-context prices, and `apiFamily: 'responses' | 'chat'`. Store the selection only in a module variable initialized from `DEFAULT_OPENAI_MODEL_ID`; do not use browser storage.

- [ ] **Step 4: Run the focused test and observe GREEN**

Run: `node tests/openAiModelCatalog.test.js`

Expected: `openAiModelCatalog tests passed` and exit code 0.

### Task 2: Selected-model Responses and compatibility routing

**Files:**
- Modify: `src/openAiResponsesBeta.js`
- Modify: `src/providerClients.js`
- Modify: `tests/openAiResponsesBeta.test.js`

**Interfaces:**
- Consumes: catalog selection and route helpers from Task 1.
- Produces: `resolveOpenAiResponsesBetaConfig()` whose default route starts at the transient selected model and provider compatibility loops that start at `getOpenAIChatRoute()`.

- [ ] **Step 1: Update request-routing assertions before production code**

Add assertions that the default config begins with `gpt-6-astra`, a selected Luna route begins with and never rises above `gpt-6-luna`, and an explicit options array still overrides the transient UI selection for focused tests.

- [ ] **Step 2: Run the focused test and observe RED**

Run: `node tests/openAiResponsesBeta.test.js`

Expected: the existing `gpt-5.5` default assertion differs from the required `gpt-6-astra` route.

- [ ] **Step 3: Connect the catalog to both OpenAI text provider paths**

Import route helpers. Build Responses candidates from the explicit option/query override when present, otherwise from `getOpenAIResponsesRoute(getSelectedOpenAIModelId())`. Use `getOpenAIChatRoute(getSelectedOpenAIModelId())` in non-stream and stream compatibility loops. Preserve Gemini and vision functions byte-for-byte except for necessary imports.

- [ ] **Step 4: Emit route events**

Before each text-model request dispatch `story-maker:openai-model-route` with `{ phase: 'trying', selectedModelId, modelId }`; after success dispatch `{ phase: 'adopted', selectedModelId, modelId }`. Event dispatch must be a safe no-op when `CustomEvent` or `dispatchEvent` is unavailable in Node.

- [ ] **Step 5: Run routing tests and observe GREEN**

Run: `node tests/openAiModelCatalog.test.js; node tests/openAiResponsesBeta.test.js; node tests/providerClients.test.js`

Expected: all three scripts exit 0 and print their pass messages.

### Task 3: Responsive model selector UI

**Files:**
- Create: `src/openAiModelUi.js`
- Create: `tests/openAiModelUi.test.js`
- Modify: `src/main.js`
- Modify: `src/style.css`

**Interfaces:**
- Consumes: model catalog getters/setter and `story-maker:openai-model-route` events.
- Produces: `buildOpenAIModelSelectorMarkup()`, `isOpenAIProviderLabel(text)`, and `installOpenAIModelSelector(document, runtime)`.

- [ ] **Step 1: Write failing pure UI tests**

Test that markup contains `OpenAI思考モデル`, all option descriptions, the 2026-09-24 price date, price caveat copy, selected/attempt/adopt status nodes, and an accessible label/select association. Test that only OpenAI/ChatGPT provider labels are recognized.

- [ ] **Step 2: Run the UI test and observe RED**

Run: `node tests/openAiModelUi.test.js`

Expected: `ERR_MODULE_NOT_FOUND` for `src/openAiModelUi.js`.

- [ ] **Step 3: Implement and install the UI module**

Insert the model card after `.banner-row`. Observe `#engine-label` changes to show it only for OpenAI. On change, update the transient selection and current price/description. Listen for route events to update attempted/adopted text. Disable the selector whenever the settings panel is generating or the brush-up/style-analysis operation is busy.

- [ ] **Step 4: Add scoped responsive styles**

Use existing surface, border, text, accent, focus, and radius variables. Use two columns above 760px and one column below it. Ensure long Japanese descriptions wrap, the native select keeps a visible focus ring, and no fixed widths can create horizontal scrolling.

- [ ] **Step 5: Import after the legacy UI bootstrap**

Add `import './openAiModelUi.js';` after `import './legacyMain.js';` in `src/main.js` so the module can bind on `DOMContentLoaded` without changing the legacy bundle.

- [ ] **Step 6: Run UI and focused routing tests**

Run: `node tests/openAiModelUi.test.js; node tests/openAiModelCatalog.test.js; node tests/openAiResponsesBeta.test.js`

Expected: all scripts exit 0.

### Task 4: Browser and live Luna acceptance

**Files:**
- Modify: `HANDOFF.md`

**Interfaces:**
- Consumes: completed UI and routing behavior.
- Produces: current-revision evidence for layout, reset, route, and one paid Luna generation.

- [ ] **Step 1: Run complete local gates**

Run: `npm test`, `npm run lint --if-present`, `npm run build`, and `git diff --check -- . ':!dist'`.

Expected: zero test failures, zero lint errors, successful production build, and no whitespace errors in task files.

- [ ] **Step 2: Inspect desktop and mobile UI**

Start the established local Vite server on port 5179. In the in-app browser verify OpenAI-only visibility, Astra default, parenthetical descriptions, current price copy, focusability, 1309px desktop layout, and approximately 355px narrow layout with no horizontal overflow.

- [ ] **Step 3: Verify transient selection**

Select Luna, reload, and verify Astra returns. Select Luna again for the API run.

- [ ] **Step 4: Perform exactly one real API generation**

Use the API key already entered by the user without reading it. Generate one short story with GPT-6 Luna. Record selected, attempted, and adopted model, visible completion, output length, and console errors. Do not run a second paid generation without renewed authorization.

- [ ] **Step 5: Update the handoff additively**

Prepend a public-safe local-only entry containing changed files, test/build/browser evidence, Luna live result, remaining gaps, and the explicit statement that no commit, push, deploy, release, or backup occurred.

### Task 5: Final verification review

**Files:**
- Review only: all files changed by Tasks 1-4

**Interfaces:**
- Consumes: the implementation and fresh evidence.
- Produces: an itemized satisfied/unmet/unverified acceptance report.

- [ ] **Step 1: Inspect the final diff**

Run: `git diff -- src/openAiModelCatalog.js src/openAiResponsesBeta.js src/providerClients.js src/openAiModelUi.js src/main.js src/style.css tests/openAiModelCatalog.test.js tests/openAiResponsesBeta.test.js tests/openAiModelUi.test.js HANDOFF.md docs/superpowers/specs/2026-09-24-openai-thought-model-selector-design.md docs/superpowers/plans/2026-09-24-openai-thought-model-selector.md`

Expected: no unrelated edits and no secret material.

- [ ] **Step 2: Reconcile every acceptance item**

Confirm default Astra, explicit Luna verification, latest price/description presentation, downward-only fallback, responsive layout, route status, Gemini/vision isolation, test/build evidence, and external-delivery boundary.

- [ ] **Step 3: Report without external delivery claims**

State local implementation and verification evidence only. Mark any missing live/model/browser item plainly as unmet or unverified.
