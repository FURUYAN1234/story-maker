$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

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
