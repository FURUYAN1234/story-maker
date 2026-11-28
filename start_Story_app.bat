@echo off
setlocal
cd /d "%~dp0"

echo [Story Maker] Starting system...

where node >nul 2>nul
if errorlevel 1 goto NODE_MISSING

where npm >nul 2>nul
if errorlevel 1 goto NPM_MISSING

if not exist "node_modules\vite\package.json" goto INSTALL
if not exist "mcp\node_modules\zod\package.json" goto INSTALL
goto LAUNCH

:INSTALL
echo [INFO] Installing Story Maker and MCP dependencies...
call npm ci
if errorlevel 1 goto INSTALL_ERROR

:LAUNCH

echo [INFO] Launching Story Maker...
call npm run start:local -- --open --base ./

if errorlevel 1 goto RUN_ERROR

pause
exit /b

:NODE_MISSING
echo [ERROR] Node.js is not installed.
pause
exit /b

:NPM_MISSING
echo [ERROR] npm is not found.
pause
exit /b

:INSTALL_ERROR
echo [ERROR] Installation failed.
pause
exit /b

:RUN_ERROR
echo [ERROR] Failed to start server.
pause
exit /b

