@echo off
chcp 65001 >nul
title CryptoLLM Backend
cd /d "%~dp0backend"

echo Starting CryptoLLM backend at http://localhost:8080
call mvn.cmd -Plocal-build spring-boot:run
