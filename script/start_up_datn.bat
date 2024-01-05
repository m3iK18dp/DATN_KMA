@echo off
start "Kafka Zookeeper" cmd /k "cd /d C:\kafka\bin\windows && zookeeper-server-start.bat ..\..\config\zookeeper.properties"
powershell Start-Sleep -Seconds 5
start "Kafka Server" cmd /k "cd /d C:\kafka\bin\windows && kafka-server-start.bat ..\..\config\server.properties"
powershell Start-Sleep -Seconds 5
start "Kafka Java" cmd /k "cd /d C:\kafka\bin\windows && kafka-console-consumer.bat --topic java -from-beginning --bootstrap-server localhost:9092"
start "Kafka Event" cmd /k "cd /d C:\kafka\bin\windows && kafka-console-consumer.bat --topic event -from-beginning --bootstrap-server localhost:9092"
start "CORE" cmd /k "cd /d D:\DATN - BLOCKCHAIN\DATN\DATN\target && java -jar DATN-0.0.1-SNAPSHOT.jar"
start "SLS" cmd /k "cd /d D:\DATN - BLOCKCHAIN\DATN\Listener\out\artifacts\Listener_jar && java -jar Listener.jar"
start "FEA" cmd /k "cd /d D:\DATN - BLOCKCHAIN\DATN\DATN-Frontend && npm run dev"
start "MS" cmd /k "cd /d D:\DATN - BLOCKCHAIN\DATN\mail-server && npm start"