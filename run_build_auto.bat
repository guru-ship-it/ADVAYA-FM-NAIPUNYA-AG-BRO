@echo off
setlocal
echo ==========================================
echo   ADVAYA FM ELITE - AUTO BUILD (V2)
echo ==========================================

:: 1. ENSURE WINDOWS FOLDER IS GONE
cd /d "d:\ADVAYA_FM_ELITE\app"
if exist "windows" (
    echo [FIX] Renaming windows folder...
    ren windows windows_disabled
)

:: 2. ENV
set "JAVA_HOME=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7"
set "FLUTTER_ROOT=d:\ADVAYA_FM_ELITE\flutter_sdk\flutter"
set "ANDROID_HOME=d:\ADVAYA_FM_ELITE\android_sdk"
set "PATH=%JAVA_HOME%\bin;%FLUTTER_ROOT%\bin;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools;%PATH%"

:: 3. GRADLE FIX
powershell -Command "$p = '%USERPROFILE%\.gradle\gradle.properties'; $v = 'org.gradle.java.home=d:/ADVAYA_FM_ELITE/openjdk/jdk-17.0.12+7'; Set-Content -Path $p -Value $v -Encoding Ascii"

:: 4. CLEAN
echo [1/3] Cleaning...
call flutter clean > ../clean_log.txt 2>&1

:: 5. PUB GET
echo [2/3] Pub Get...
call flutter pub get > ../pub_log.txt 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Pub Get Failed.
    type ../pub_log.txt
    exit /b 1
)

:: 6. BUILD
echo [3/3] Building AAB...
call flutter build appbundle --release --split-debug-info=../symbols --verbose > ../build_log.txt 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Build Failed.
    tail -n 50 ../build_log.txt
    exit /b 1
)

echo [SUCCESS] Build Complete.
exit /b 0
endlocal
