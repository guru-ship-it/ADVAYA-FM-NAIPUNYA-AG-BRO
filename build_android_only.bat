@echo off
setlocal
echo ==========================================
echo   ADVAYA FM ELITE - ANDROID ONLY BUILD
echo ==========================================

:: 1. DISABLE WINDOWS BUILD (SOURCE OF SYMLINK ERROR)
cd /d "d:\ADVAYA_FM_ELITE\app"
if exist "windows" (
    echo [FIX] Disabling Windows Platform to bypass symlink error...
    ren windows windows_disabled
    echo [FIX] Renamed 'windows' to 'windows_disabled'.
)

:: 2. ENV VARIABLES
set "JAVA_HOME=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7"
set "FLUTTER_ROOT=d:\ADVAYA_FM_ELITE\flutter_sdk\flutter"
set "ANDROID_HOME=d:\ADVAYA_FM_ELITE\android_sdk"
set "PATH=%JAVA_HOME%\bin;%FLUTTER_ROOT%\bin;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools;%PATH%"

:: 3. GRADLE FIX (ENSURE NO SPACES)
powershell -Command "$p = '%USERPROFILE%\.gradle\gradle.properties'; $v = 'org.gradle.java.home=d:/ADVAYA_FM_ELITE/openjdk/jdk-17.0.12+7'; Set-Content -Path $p -Value $v -Encoding Ascii"

:: 4. BUILD
echo [BUILD] Cleaning...
call flutter clean

echo [BUILD] Getting Dependencies...
call flutter pub get

echo [BUILD] Building Android Bundle...
call flutter build appbundle --release --verbose

if %errorlevel% neq 0 (
    echo.
    echo [FAILURE] Build Failed.
    pause
    exit /b 1
)

echo.
echo ==========================================
echo [SUCCESS] AAB Generated Successfully!
echo Location: d:\ADVAYA_FM_ELITE\app\build\app\outputs\bundle\release\app-release.aab
echo ==========================================
pause
endlocal
