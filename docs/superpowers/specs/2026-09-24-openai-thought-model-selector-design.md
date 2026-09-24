# OpenAI Thought Model Selector Design

## Goal

Add a Nano Banana-style OpenAI text-model selector to Story Maker without crowding the existing API-key row. The public default is GPT-6 Astra, while the accepted live verification explicitly selects GPT-6 Luna so test cost and the production default remain separate.

## Scope

- Apply the selection to OpenAI text work: story generation, continuation, consistency checks, editorial review, brush-up, and text-based style analysis.
- Leave Gemini routing and image/multimodal recognition routes unchanged.
- Keep the selection page-session-only. A reload starts from GPT-6 Astra.
- Fall back only from the selected model toward lower entries in the published route.
- Show the selected, attempted, and adopted model in the model status area.
- Do not commit, push, deploy, release, or back up as part of this task.

## Model Presentation

Use one full-width control group directly below the API credential row and above the API links. Show it only while OpenAI is selected.

- Label: `OpenAI思考モデル`
- Option text: model display name followed by a short parenthetical use-case description.
- Supporting copy: current Standard short-context input/output token prices, snapshot date, USD per one million tokens, and a note that cached input, cache writes, long context, Fast mode, regional processing, tools, and taxes are not included.
- Default: `gpt-6-astra`.
- Verification selection: `gpt-6-luna`.

The visible catalog includes every currently supported Story Maker choice in the Nano Banana family ordering:

1. GPT-6 Astra
2. GPT-6 Sol
3. GPT-5.6 Sol
4. GPT-5.6 Terra
5. GPT-6 Luna
6. GPT-5.6 Luna
7. GPT-4.1
8. GPT-4.1 mini
9. GPT-4.1 nano
10. GPT-4o

“All older versions” means these current selectable legacy families, not deprecated snapshots or unavailable historical model IDs.

The price snapshot is versioned application data checked against official OpenAI documentation at implementation/release time. The browser must not scrape documentation at runtime.

## Layout

Desktop uses a compact two-column card: label and selector on the left, price and route status on the right. At narrow widths it becomes one full-width column. It follows the existing dark surface, border, type scale, focus ring, and radius tokens rather than introducing another visual language.

The selector remains usable after the API key is locked, but becomes disabled while generation, review, or brush-up is active. This prevents a single run from changing models midway.

## Routing

Keep one catalog as the source of truth for display order, descriptions, prices, and API family.

- Responses-family entries use the selected item and only the entries below it in that family.
- If all eligible Responses models fail, the existing Chat Completions compatibility route starts at the first compatible entry at or below the selection.
- Selecting a compatibility model skips higher Responses models.
- Every attempt emits a UI-safe route event. Completion records the adopted model.

## Error Handling

- Invalid or missing selection resolves to GPT-6 Astra.
- A missing price never renders `$0`; it renders price unavailable.
- Model failures retain the existing fallback/error behavior.
- Gemini mode hides the control without altering the OpenAI selection for the current page session.

## Verification

- Unit tests cover catalog data, default/reset behavior, downward-only routing, price copy, and model markup.
- Existing Responses tests prove the selected model is sent in the request and fallback remains compatible.
- Browser checks cover OpenAI/Gemini visibility, keyboard focus, desktop layout, narrow layout, and reload-to-Astra.
- One real OpenAI generation selects GPT-6 Luna and must show Luna as the attempted and adopted model. No second paid generation is included without renewed authorization.
