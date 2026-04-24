# PROJECT RULES: story-maker

## Project Overview
`story-maker` is the real product app in this workspace.

It is not disposable scaffolding, not a temporary shell, and not a place to build unrelated UI experiments by overwriting the current app.

## Architecture Guardrails

### 1. API handling
- Keep defensive handling for Gemini-style API limits such as `429 Too Many Requests`.
- Do not remove retry loops, wait handling, or fallback behavior without an explicit task.

### 2. Story logic
- Treat story generation logic, prompt construction, and output formatting as product behavior.
- Do not simplify or replace core behavior just because another app or prototype wants a lighter UI.

### 3. Version / config handling
- Keep any user-visible versioning aligned with `package.json` and the intended release flow.
- Do not make isolated version tweaks without an explicit request.

## Forbidden Changes

### Protected product files
Unless the user explicitly says to modify `story-maker` itself, do not edit:

- `src/App.jsx`
- `src/App.css`
- `src/index.css`
- `src/lib/**`
- `public/**`
- `README.md`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `dist/**`

### Sensitive settings
- Never hardcode API keys, secrets, or private credentials into frontend files.
- Keep runtime secrets in user input flow or proper environment handling.

### Separate-app rule
- If the user asks for a separate app, public-safe clone, mock UI, experiment, prototype, or rewrite not explicitly for `story-maker`, create a new subfolder.
- Never satisfy those requests by replacing this app's root files.

### No-assumption rule
- Similarity of visible UI, category structure, or workflow is not permission to overwrite this app.
- If it is not explicit that `story-maker` is the target, do not edit product files.
- If the target app cannot be identified with confidence, stop and clarify before editing.

## Build / Deploy Safety
- Do not run `npm run build`, `npm run deploy`, or any command that rewrites `dist/` unless `story-maker` is the confirmed target.
- Do not infer deploy behavior from any other app in OneDrive.

## Recovery Rule
- If the wrong app is modified by mistake, stop all feature work immediately.
- Restore the changed files first.
- Restore generated outputs such as `dist/` if they were rewritten.
