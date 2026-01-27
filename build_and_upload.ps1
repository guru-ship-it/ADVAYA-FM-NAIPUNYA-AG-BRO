
# Advaya FM: Final Build & Upload Pipeline
# This script executes the release strategy prescribed on 2026-01-28.

$timestamp = Get-Date -UFormat %s -Millisecond 0
$buildNumber = $timestamp.Split('.')[0]

Write-Host "--- 1. BUILDING PRODUCTION BUNDLE (Version Code: $buildNumber) ---" -ForegroundColor Cyan
# Run Flutter build
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
} else {
    Write-Host "ERROR: Could not find build output at $bundleSource" -ForegroundColor Red
    exit 1
}

Write-Host "--- 3. EXECUTING PLAY CONSOLE UPLOAD ---" -ForegroundColor Cyan
# Update the upload script to Use the moved bundle
python .conductor/upload_to_play_console.py

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Upload failed. Ensure the GCP project is linked and permissions are 200/SUCCESS." -ForegroundColor Red
} else {
    Write-Host "FINISH: Advaya FM NaipuNya is now GOLD in the Internal Track!" -ForegroundColor Green
}
