@echo off
setlocal
echo ==========================================
echo   ADVAYA FM ELITE - BROADCOM PILOT BUILD
echo ==========================================

:: 1. HARDCODED PATHS (Verified)
set "JAVA_BIN=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7\bin"
set "FLUTTER_BIN=d:\ADVAYA_FM_ELITE\flutter_sdk\flutter\bin"
set "ANDROID_BIN=d:\ADVAYA_FM_ELITE\android_sdk\platform-tools"
set "PATH=%JAVA_BIN%;%FLUTTER_BIN%;%ANDROID_BIN%;%PATH%"

echo [CHECK] Java Version:
java -version
echo.
echo [CHECK] Flutter Version:
call flutter --version
echo.

:: 2. FIX GRADLE PROPERTIES (CRITICAL FIX - NO SPACE)
echo [FIX] Updating Gradle Properties...
set "GRADLE_PROP=%USERPROFILE%\.gradle\gradle.properties"
if not exist "%USERPROFILE%\.gradle" mkdir "%USERPROFILE%\.gradle"
:: Note: Using (echo command) to avoid trailing spaces
(echo org.gradle.java.home=d:/ADVAYA_FM_ELITE/openjdk/jdk-17.0.12+7) > "%GRADLE_PROP%"

:: 3. NAVIGATE AND BUILD
cd /d "d:\ADVAYA_FM_ELITE\app"
echo.
echo [BUILD] Cleaning...
call flutter clean

echo.
echo [BUILD] Getting Dependencies...
call flutter pub get

echo.
echo [BUILD] Building AAB...
call flutter build appbundle --release --verbose

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Build Failed.
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
