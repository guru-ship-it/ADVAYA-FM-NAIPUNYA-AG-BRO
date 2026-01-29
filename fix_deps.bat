@echo off
echo --- FIXING DEPENDENCIES (ADMIN MODE) ---

:: Set Java Home to Local OpenJDK 17
set "JAVA_HOME=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7"
set "PATH=%JAVA_HOME%\bin;C:\Program Files\Git\cmd;%PATH%"

:: Navigate to App
cd /d "d:\ADVAYA_FM_ELITE\app"

:: Run Pub Get
echo Running 'flutter pub get'...
call "d:\ADVAYA_FM_ELITE\flutter_sdk\flutter\bin\flutter.bat" pub get

if %errorlevel% neq 0 (
    echo.
    echo FAILED. Please ensure you ran this as Administrator.
    pause
    exit /b 1
)

echo.
echo SUCCESS! Dependencies installed.
echo You can now return to the AI Agent.
pause
