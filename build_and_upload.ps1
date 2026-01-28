
# Advaya FM: Final Build & Upload Pipeline
# This script executes the release strategy prescribed on 2026-01-28.

# --- ENVIRONMENT SETUP ---
# Set local paths for the downloaded SDKs
$env:FLUTTER_ROOT = "$PSScriptRoot\flutter_sdk\flutter"
$env:ANDROID_HOME = "$PSScriptRoot\android_sdk"
$env:JAVA_HOME = "$PSScriptRoot\openjdk\jdk-17.0.12+7"
$env:Path += ";$env:FLUTTER_ROOT\bin;$env:ANDROID_HOME\cmdline-tools\latest\bin;$env:ANDROID_HOME\platform-tools;$env:JAVA_HOME\bin"

Write-Host "--- ENVIRONMENT CONFIGURED ---" -ForegroundColor Cyan
Write-Host "Flutter Root: $env:FLUTTER_ROOT"
Write-Host "Android Home: $env:ANDROID_HOME"
Write-Host "Java Home:    $env:JAVA_HOME"

# 1. The Environment Handshake
$javaVer = java -version 2>&1
if ($javaVer -match "17\.") {
    Write-Host "SUCCESS: Java 17 Detected." -ForegroundColor Green
}
else {
    Write-Host "WARNING: Java 17 Check Failed. Current Output: $javaVer" -ForegroundColor Yellow
}

# 2. Gradle's "Home" Address
$gradlePropsPath = "$env:USERPROFILE\.gradle\gradle.properties"
if (-not (Test-Path $gradlePropsPath)) {
    New-Item -ItemType File -Path $gradlePropsPath -Force | Out-Null
}
Add-Content -Path $gradlePropsPath -Value "org.gradle.java.home=$env:JAVA_HOME" -Force
Write-Host "FIXED: Pointed Gradle to OpenJDK 17 in $gradlePropsPath" -ForegroundColor Green

$timestamp = Get-Date -UFormat %s -Millisecond 0
$buildNumber = $timestamp.Split('.')[0]

Write-Host "--- 1. BUILDING PRODUCTION BUNDLE (Version Code: $buildNumber) ---" -ForegroundColor Cyan
# Run Flutter build
cd app # Switch to app directory
flutter build appbundle --release --build-number=$buildNumber

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Flutter build failed. Please ensure flutter is in your PATH and pubspec.yaml exists." -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "--- 2. LOCATING AND MOVING BUNDLE ---" -ForegroundColor Cyan
$bundleSource = "build/app/outputs/bundle/release/app-release.aab"
$bundleDest = ".conductor/advaya-release.aab"

if (Test-Path $bundleSource) {
    Move-Item -Path $bundleSource -Destination $bundleDest -Force
    Write-Host "Success: Bundle moved to $bundleDest" -ForegroundColor Green
}
else {
    Write-Host "ERROR: Could not find build output at $bundleSource" -ForegroundColor Red
    exit 1
}

Write-Host "--- 3. EXECUTING PLAY CONSOLE UPLOAD ---" -ForegroundColor Cyan
# Update the upload script to Use the moved bundle
python .conductor/upload_to_play_console.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Upload failed. Ensure the GCP project is linked and permissions are 200/SUCCESS." -ForegroundColor Red
}
else {
    Write-Host "FINISH: Advaya FM NaipuNya is now GOLD in the Internal Track!" -ForegroundColor Green
}
