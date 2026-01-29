@echo off
setlocal
echo ==========================================
echo   ADVAYA FM ELITE - FINAL BUILD FIX
echo ==========================================

:: 1. FORCE FIX GRADLE.PROPERTIES USING POWERSHELL (No Spaces guaranteed)
echo [FIX] Repairing Gradle Properties...
powershell -Command "$p = '%USERPROFILE%\.gradle\gradle.properties'; $v = 'org.gradle.java.home=d:/ADVAYA_FM_ELITE/openjdk/jdk-17.0.12+7'; Set-Content -Path $p -Value $v -Encoding Ascii"

:: 2. VERIFY FIX
type "%USERPROFILE%\.gradle\gradle.properties"

:: 3. SET ENV & BUILD
set "JAVA_HOME=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7"
set "FLUTTER_ROOT=d:\ADVAYA_FM_ELITE\flutter_sdk\flutter"
set "ANDROID_HOME=d:\ADVAYA_FM_ELITE\android_sdk"
set "PATH=%JAVA_HOME%\bin;%FLUTTER_ROOT%\bin;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools;%PATH%"

cd /d "d:\ADVAYA_FM_ELITE\app"
echo.
echo [BUILD] Starting Build...
call flutter clean
call flutter build appbundle --release --verbose > ..\last_build_log.txt 2>&1

if %errorlevel% neq 0 (
    echo.
    echo [FAILURE] Build Failed. Log saved to d:\ADVAYA_FM_ELITE\last_build_log.txt
    pause
    exit /b 1
)

echo.
echo [SUCCESS] AAB Generated at:
echo d:\ADVAYA_FM_ELITE\app\build\app\outputs\bundle\release\app-release.aab
pause
