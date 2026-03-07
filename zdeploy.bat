@echo off
echo =============================
echo Building project...
echo =============================
call npm run build

echo =============================
echo Deploying project...
echo =============================
call npm run deploy

echo =============================
echo Committing to Git...
echo =============================
git add .
git commit -m "Auto deploy %date% %time%"
git push

echo =============================
echo DONE
