# Deploy Rules: story-maker

共通手順の正本は `C:\Users\sx717\Antigravity\docs\unified_release_completion.md`、契約は `scripts\release-apps.json` の `story-maker`、実行入口は `scripts\publish_app_release.ps1` である。

- GitHub Pages、GitHub Release、GitHub source ZIP由来の `C:\story-maker-main`、最終公開検証を共通レシートで完遂する。
- Hugging Faceは対象外。
- `npm test` と `npm run release:app-preflight` は共通transactionのapp validationとして必須。
- build後にsourceや未追跡ファイルが変化した場合はsource push前に失敗させ、candidateを確定し直して再開する。
- フルバックアップは別の明示操作であり、自動開始しない。

```powershell
powershell -ExecutionPolicy Bypass -File ..\scripts\publish_app_release.ps1 -App story-maker -NotesPath <absolute-vX.Y.Z.md> -ReleaseTitle "Story Maker vX.Y.Z"
```
