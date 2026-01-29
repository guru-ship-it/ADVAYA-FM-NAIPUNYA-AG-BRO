@echo off
setlocal
echo ==========================================
echo   ADVAYA FM ELITE - DIAGNOSE DEPS
echo ==========================================

set "JAVA_HOME=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7"
set "FLUTTER_ROOT=d:\ADVAYA_FM_ELITE\flutter_sdk\flutter"
set "ANDROID_HOME=d:\ADVAYA_FM_ELITE\android_sdk"
set "PATH=%JAVA_HOME%\bin;%FLUTTER_ROOT%\bin;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools;%PATH%"

cd /d "d:\ADVAYA_FM_ELITE\app\android"
call gradlew.bat app:dependencies --configuration releaseCompileClasspath > ..\..\deps_log.txt 2>&1

echo [SUCCESS] Deps Diagnosis Complete.
exit /b 0
endlocal
