@echo off
echo ======================================
echo    BWD EXAM 2 - Backend Server
echo ======================================
echo.

echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✓ MongoDB is running
) else (
    echo ✗ MongoDB is not running. Please start MongoDB first!
    echo.
    echo You can start MongoDB using:
    echo - MongoDB Compass
    echo - Command: mongod
    echo - Windows Services (services.msc)
    pause
    exit /b 1
)

echo.
echo Starting backend server...
echo Server will run at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

cd /d "%~dp0"
npm start
