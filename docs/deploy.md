# Deploy Rules & Full Protocol: story-maker

CodexおよびAntigravityがデプロイ作業を行う際の完全な手順書（フルプロトコル）です。

## 1. Deploy Targets & Environment
- **Deploy Target**: GitHub Pages (gh-pages)
- **Protected Settings**: `vite.config.js` の `base` 指定はデプロイ用です。推測で変更しないこと。
- **Not Applicable**: Hugging Face Spaces, Vercel, Netlify

## 2. Version Bump Targets (バージョン更新対象ファイル)
バグフィックス、仕様修正、UI修正、出力修正など、コードや公開成果物に変更を入れたあとにデプロイする場合は、必ずデプロイ前にバージョンを1段階上げること。既存バージョンのまま `npm run deploy` や公開反映を行ってはならない。

バージョン番号は `major.minor.patch` とし、minor / patch は原則1桁で運用する。末尾が `9` の場合は必ず桁上げし、2桁の minor / patch を作らない。

- `0.9.9` の次は `1.0.0`
- `3.3.9` の次は `3.4.0`
- `9.9.9` の次は `10.0.0`

以下のファイルのバージョン番号 (`vX.Y.Z`) を全て一致させること。
1. `package.json` (`"version": "X.Y.Z"`)
2. `src/App.jsx` または主要ソースコード内 (`const SYSTEM_VERSION = "X.Y.Z"` など存在する場合)
3. `index.html` (`<title>` タグ内のバージョン)
4. `README.md` (バッジ表記やChangeLog等)

## 3. Pre-Deploy Audit (監査ルール)
デプロイ前に以下のチェックを必ず行うこと。
- **ゴミファイル**: `.py` 等の一時検証スクリプト、テンプレート残骸が存在しないか。
- **個人情報/ローカルパス**: OSユーザーディレクトリなどのローカル絶対パス、個人名、メールアドレスが含まれていないか。
- **公開禁止の固有名詞**: 他プロジェクト名（`Nano Banana Pro`, `remotion_video_2` 等）が混入していないか。
- **機密情報**: APIキーが直書きされていないか。

## 4. Build & Deploy Commands
```bash
npm run build
npm run deploy
```
※ `npm run deploy` 実行後、リモートの `gh-pages` に反映されるまで1〜2分待機すること。

## 5. Post-Deploy Verification (デプロイ後の確認)
- リモート反映確認コマンド: `git fetch origin gh-pages && git show origin/gh-pages:index.html`
- ライブ確認: GitHub Pages のURLにアクセスし、ブラウザキャッシュ回避のため `?v=TIMESTAMP` を付与して確認。

## 6. Commit, Tag & Push Rules
- コミット: `vX.Y.Z: 変更概要`
- タグ: `git tag -a vX.Y.Z -m "vX.Y.Z: 変更概要 / Feature summary"` (日本語と英語の併記)
- プッシュ: `git push origin main` および `git push origin vX.Y.Z`

## 7. GitHub Release (リリース作成)
※ Codex側で `gh auth status` が invalid の場合はスキップし、Antigravityに引き継ぐこと。
- タイトル: `vX.Y.Z: Feature Name / 機能名`
- 本文: `## What's New / 更新内容` 以下に英日併記。
- tag本文・GitHub Release本文には、ユーザーから明示されない限り `Verification / 検証` セクションを入れない。検証内容は作業報告や `HANDOFF.md` / `PLAN.md` に残す。
- コマンド: `gh release create vX.Y.Z --title "タイトル" --notes "本文"`

## 8. ZIP Extraction (バックアップ展開先ルール)
※ GitHub Release が作成された場合のみ実行。
- ダウンロード: `gh release download vX.Y.Z --archive zip --output $env:TEMP\story-maker-vX.Y.Z.zip`
- 展開先: `C:\story-maker-main` (既存フォルダを削除してから配置、二重フォルダに注意)

## 9. Full Workspace Backup (全体バックアップ手順)
※ 全ての作業完了後に全体バックアップが必要な場合のみ。
- Codexから実行する場合は、ユーザーがログを目視できる見えるPowerShellウィンドウ（黒い窓）でPS1を直接起動する。
- 余計な `-Command` ラッパーやウィンドウタイトル設定は付けない。`-File` で `backup_full.ps1` を直接実行する。
- 実行コマンド:
```powershell
Start-Process -FilePath "$env:SystemRoot\System32\WindowsPowerShell\v1.0\powershell.exe" -ArgumentList @('-NoProfile','-ExecutionPolicy','Bypass','-NoExit','-File',"$env:USERPROFILE\Antigravity\scripts\backup_full.ps1") -WorkingDirectory "$env:USERPROFILE\Antigravity" -WindowStyle Normal
```

## 10. Rollback Procedure
- Actionsが止まった場合: 空コミットで再トリガー (`git commit --allow-empty -m "Trigger Build"`)
