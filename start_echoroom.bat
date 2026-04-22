@echo off
echo ==============================================
echo        EchoRoom - Global Cloud Launcher
echo ==============================================

echo [1/4] Starting XAMPP MySQL...
cd /d C:\xampp
start /b "" mysql_start.bat
timeout /t 5 >nul

echo [2/4] Starting Django Backend Database...
cd /d C:\Users\Krisha\Downloads\EchoRoom\EchoRoom\EchoRoom\backend
start "EchoRoom Backend" cmd /k "call venv\Scripts\activate && python manage.py runserver"

echo [3/4] Starting React Express Server...
cd /d C:\Users\Krisha\Downloads\EchoRoom\EchoRoom\EchoRoom
start "EchoRoom Node Server" cmd /k "node server.js"

timeout /t 3 >nul

echo [4/4] Activating Global Internet Tunnel...
start "Public Cloud Tunnel" cmd /k "ssh -o StrictHostKeyChecking=no -R 80:localhost:3000 nokey@localhost.run"

echo.
echo All services started! 
echo Local Server: http://localhost:3000
echo Global Online Link: Check the 'Public Cloud Tunnel' window for your .lhr.life URL!
echo ==============================================
start "Web" "http://localhost:3000"
pause
