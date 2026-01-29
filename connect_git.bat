@echo off
echo --- VAJRA GIT PROTOCOL: RESET & RE-CONNECT ---

:: 1. Remove Old Origin
echo Removing old remote...
git remote remove origin

:: 2. Add New Remote (Update URL manually if needed)
echo Adding new remote...
set /p REPO_URL="Enter Repo URL (e.g., https://github.com/user/repo.git): "
git remote add origin %REPO_URL%

:: 3. Verify
echo Verifying remote...
git remote -v

:: 4. Rebase and Push
echo.
echo Attempting Pull-Rebase-Push...
git pull origin main --rebase
if %errorlevel% neq 0 (
    echo Note: Pull failed (likely empty remote). Proceeding to push.
)
git push -u origin main --force

echo.
echo Git Protocol Complete.
pause
