@echo off
echo ==============================================
echo        EchoRoom - Local Setup Startup
echo ==============================================

echo [1/3] Starting XAMPP MySQL...
cd /d C:\xampp
start /b "" mysql_start.bat
timeout /t 5 >nul

echo [2/3] Starting Django Backend...
cd /d C:\Users\Krisha\Downloads\EchoRoom\EchoRoom\EchoRoom\backend
start "EchoRoom Backend" cmd /k "call venv\Scripts\activate && python manage.py runserver"

echo [3/3] Starting React Frontend...
cd /d C:\Users\Krisha\Downloads\EchoRoom\EchoRoom\EchoRoom
start "EchoRoom Frontend" cmd /k "npm start"

echo.
echo All services started! 
echo Frontend: http://localhost:3000
echo Backend: http://127.0.0.1:8000
echo ==============================================
pause
