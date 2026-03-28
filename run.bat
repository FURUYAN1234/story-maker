@echo off
chcp 65001 > nul
echo ===================================================
echo 📖 Story Maker - Local Server Starter
echo ===================================================

if not exist node_modules\ (
    echo [1/3] Installing dependencies... / 依存関係をインストール中...
    call npm install
) else (
    echo [1/3] Dependencies found. / 依存関係のチェック完了。
)

echo [2/3] Starting local server... / ローカルサーバーを起動中...
echo [3/3] The browser should open automatically. / ブラウザが自動的に開きます。
echo ===================================================
echo To stop the server, press Ctrl+C in this window.
echo サーバーを停止するには、このウィンドウで Ctrl+C を押してください。
echo ===================================================
call npm run dev
pause
