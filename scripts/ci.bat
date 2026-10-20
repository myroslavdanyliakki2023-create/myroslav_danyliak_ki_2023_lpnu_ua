@echo off
node --version
if errorlevel 1 exit /b 1
call npm --version
if errorlevel 1 exit /b 1
call npm ci
if errorlevel 1 exit /b 1
call npm run build
if errorlevel 1 exit /b 1
call npm test
if errorlevel 1 exit /b 1
node dist\hello.js | findstr /C:"Hello, World!"
if errorlevel 1 exit /b 1
