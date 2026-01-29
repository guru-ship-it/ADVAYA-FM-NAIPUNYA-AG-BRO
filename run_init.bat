@echo off
setlocal
echo Setting Paths...
set "GIT_ROOT=C:\Program Files\Git"
set "PATH=%GIT_ROOT%\cmd;C:\Windows\System32;C:\Windows;%PATH%"

echo Configuring Git Safety...
git config --global --add safe.directory *

echo Running Flutter Create...
call "d:\ADVAYA_FM_ELITE\flutter_sdk\flutter\bin\flutter.bat" create --org com.fm.naipunya --offline app

if %errorlevel% neq 0 (
    echo CRITICAL FAIL
    exit /b %errorlevel%
)
echo SUCCESS
endlocal
