@echo off
chcp 65001 >nul
title CryptoLLM Dev Server
cd /d "%~dp0"

start "" powershell -NoProfile -WindowStyle Hidden -Command "1..60 | ForEach-Object { try { (New-Object Net.Sockets.TcpClient '127.0.0.1', 3000).Close(); Start-Process 'http://localhost:3000'; exit } catch { Start-Sleep 1 } }"

echo Starting CryptoLLM dev server at http://localhost:3000
call npm run dev
