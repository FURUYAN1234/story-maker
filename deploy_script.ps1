$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "--- Phase 3: Git Commit & Push ---"
git add -A
git commit -m "v3.3.4: AI 4-koma System連携説明文の追加と長大名称の修正"
git push origin main

Write-Host "--- Phase 4: Deploy to GitHub Pages ---"
npm run deploy

Write-Host "--- Phase 5: Verification (Wait 60s) ---"
Start-Sleep -Seconds 60
git fetch origin gh-pages
git show origin/gh-pages:index.html | Select-String "<title>"

Write-Host "--- Phase 6: Tagging & Release ---"
git tag -a v3.3.4 -m "v3.3.4 Release"
git push origin v3.3.4

$releaseBody = "## What's New / 更新内容`n- **AI 4-koma System Link Integration / AI 4-koma Systemへの連携説明文追加**: Added an explanation to the Style Analyzer JSON output section indicating that generated style JSON files can be directly dragged and dropped into AI 4-koma System's STEP1 drop zone. / 作風解析エンジンのJSON出力結果エリアおよびREADMEに、生成した作風JSONファイルが AI 4-koma System のSTEP1（ドロップエリア）に直接連携可能であることを明記する説明文を追加しました。`n- **App Name Simplification / アプリ名称の簡略化**: Simplified the long application name in the documentation and UI to `'AI 4-koma System`'. / ドキュメントおよびUI上の長すぎる連携アプリ名を「AI 4-koma System」に簡略化・統一しました。"

Set-Content -Path release_note_temp.md -Value $releaseBody -Encoding UTF8
gh release create v3.3.4 --title "v3.3.4: AI 4-koma System Integration / 連携機能追加" -F release_note_temp.md
Remove-Item release_note_temp.md

Write-Host "--- Phase 7: Zip Validation ---"
curl.exe -I https://github.com/FURUYAN1234/story-maker/archive/refs/tags/v3.3.4.zip

Write-Host "--- Phase 8: Local Deployment ---"
$tmp = "C:\temp_sm_deploy"
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
New-Item -ItemType Directory -Path $tmp -Force
gh release download v3.3.4 --archive zip -D $tmp
Expand-Archive -Path "$tmp\*.zip" -DestinationPath "$tmp\extracted" -Force
Remove-Item -Recurse -Force "C:\story-maker-main" -ErrorAction SilentlyContinue
$inner = (Get-ChildItem "$tmp\extracted" -Directory)[0].FullName
Copy-Item -Path $inner -Destination "C:\story-maker-main" -Recurse
Remove-Item -Recurse -Force $tmp
$result = Test-Path "C:\story-maker-main\package.json"
Write-Host "Local deployment verified: $result"

Write-Host "--- Phase 9: Backup ---"
Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File C:\Users\sx717\Antigravity\scripts\backup_full.ps1"
Write-Host "Backup script launched in a new window."
