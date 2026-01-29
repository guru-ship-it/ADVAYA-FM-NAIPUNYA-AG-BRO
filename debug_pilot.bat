@echo off
setlocal
:: DEBUG PILOT - LOGGING ENABLED

set "LOGFILE=d:\ADVAYA_FM_ELITE\debug_log.txt"
echo [START] Build Diagnosis > "%LOGFILE%"

:: 1. SET ENVIRONMENT VARIABLES
set "JAVA_HOME=d:\ADVAYA_FM_ELITE\openjdk\jdk-17.0.12+7"
set "FLUTTER_ROOT=d:\ADVAYA_FM_ELITE\flutter_sdk\flutter"
set "ANDROID_HOME=d:\ADVAYA_FM_ELITE\android_sdk"
set "PATH=%JAVA_HOME%\bin;%FLUTTER_ROOT%\bin;%ANDROID_HOME%\cmdline-tools\latest\bin;%ANDROID_HOME%\platform-tools;%PATH%"

echo Environment: >> "%LOGFILE%"
echo JAVA_HOME: %JAVA_HOME% >> "%LOGFILE%"
java -version 2>> "%LOGFILE%"

:: 2. VERIFY GRADLE PROPS
echo. >> "%LOGFILE%"
echo Gradle Properties: >> "%LOGFILE%"
type "%USERPROFILE%\.gradle\gradle.properties" >> "%LOGFILE%"

:: 3. BUILD
cd /d "d:\ADVAYA_FM_ELITE\app"
echo. >> "%LOGFILE%"
echo Running Build... >> "%LOGFILE%"

echo Cleaning...
call flutter clean >> "%LOGFILE%" 2>&1

echo Getting Dependencies...
call flutter pub get >> "%LOGFILE%" 2>&1

echo Building Bundle...
call flutter build appbundle --release --verbose >> "%LOGFILE%" 2>&1

if %errorlevel% neq 0 (
    echo [FAILURE] Build Failed. See debug_log.txt
) else (
    echo [SUCCESS] Build Succeeded.
)
pause
