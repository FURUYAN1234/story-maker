# Direct 10,000-Character Story Mode Design

Date: 2026-07-11
Target: `C:\Users\sx717\Antigravity\story-maker`

## Goal

Add an independent left-menu mode labelled `長編（10000字）` while preserving the existing short-story and medium-story buttons. The new mode generates a complete work aimed at a minimum of 10,000 non-whitespace characters from the outset. It must not expand an already generated short story and must not invoke the existing Longify workflow.

## User-visible behavior

- Add `長編（10000字）` as a separate output-mode button in the existing left menu.
- Keep the current `短編小説` and `中編小説` modes unchanged.
- Reuse the current settings, character inputs, provider selection, output area, progress UI, stop behavior, and safe API-session handling.
- Generate a complete manuscript directly from the selected settings.
- Count characters using the app's submission-style count that excludes whitespace and line breaks.
- Do not report success when the final manuscript is below 10,000 characters.
- If the provider response is demonstrably truncated by an output limit, allow one bounded continuation from the existing ending. Do not restart, summarize, or rewrite the manuscript during this continuation.
- Report a clear failure reason for insufficient length, truncation, empty output, duplicate content, or an unclosed ending.

## Architecture

Introduce a distinct public mode identifier for the 10,000-character route instead of reactivating the sealed legacy `long` mode. Route this mode through a small direct-generation orchestrator.

The orchestrator will reuse these proven components from the preserved GPT-5.6 work where their contracts fit:

- OpenAI request construction, background polling, timeouts, cancellation, and sanitized diagnostics.
- API-session persistence that never exposes key values.
- Submission-style character counting.
- Deterministic checks for empty output, truncation, repeated paragraphs or sentences, and ending closure.
- Existing progress and final-output integration.

It will not reuse the abandoned multi-stage story orchestration:

- no source-short-story expansion;
- no Longify chapter pipeline;
- no scene-by-scene prose generation;
- no chapter repair loop;
- no adversarial critique and full-manuscript rewrite loop;
- no final harmonization rewrite;
- no strict required-fact or chapter-format contract that can reject an otherwise complete manuscript.

## Generation flow

1. Read the same user settings used by normal story generation.
2. Build one 10,000-character manuscript prompt that requires a complete story, coherent causal progression, a resolved ending, and at least 10,000 non-whitespace characters.
3. Send one long-output request through the selected supported provider route.
4. If and only if the response is clearly truncated, request one continuation using a bounded tail/context representation and append only new prose.
5. Normalize the result without rewriting its story content.
6. Run deterministic acceptance checks.
7. Display the manuscript only with an honest pass/fail state and evidence such as measured character count and detected issue codes.

## Provider and model behavior

- Before relying on GPT-5.6, verify its availability to the current OpenAI API organization through a safe model-list check or a minimal real response. ChatGPT UI availability is not sufficient evidence.
- Preserve the current provider and stable-model behavior outside the new mode.
- Do not silently substitute a different model when the verification requires GPT-5.6 evidence.
- Gemini support is not assumed. It may be added only if the existing provider can reliably satisfy the same long-output contract and is separately verified.

## Failure handling

- Fewer than 10,000 non-whitespace characters: fail as `target_length`.
- Empty response: fail as `empty_output`.
- Clearly truncated response after the one continuation allowance: fail as `truncated_ending`.
- Repeated paragraph or sentence blocks above the existing deterministic threshold: fail with the corresponding repetition issue.
- Unresolved continuation marker or missing terminal closure: fail as an ending issue.
- API, polling, timeout, or authentication failures: retain the sanitized provider category and do not present partial text as successful output.

The first implementation will not automatically rewrite a failed manuscript. This keeps the experiment focused on whether direct generation itself is more stable than the previous expansion and repair pipeline.

## Verification

Automated verification:

- Mode registry and left-menu rendering tests.
- Existing short and medium modes remain unchanged.
- Direct route selection and Longify non-invocation tests.
- Prompt contract tests for the 10,000-character minimum and complete ending.
- Character-count boundary tests at 9,999 and 10,000 characters.
- Bounded continuation tests proving at most one continuation and no source replay.
- Empty, truncated, duplicate, and successful manuscript acceptance tests.
- Full relevant test suite, syntax checks, build, and diff checks.

Live verification:

- Confirm the selected OpenAI model is available to the current API organization without exposing the API key.
- Run the new mode through the existing browser UI with a real API response.
- Verify the measured non-whitespace character count is at least 10,000.
- Verify the manuscript reaches a complete ending and is not visibly truncated.
- Check for repeated passages, obvious causal contradictions, format contamination, and UI recovery after completion.
- Preserve exact failure evidence and keep the task incomplete if the live result fails.

## Scope boundaries

In scope: the new mode, its direct-generation route, minimal deterministic validation, tests, and local real-API verification.

Out of scope without a separate user request: changing short or medium behavior, restoring the abandoned worktree wholesale, exposing Longify publicly, deploy, version bump, push, GitHub Release, or full-workspace backup.
