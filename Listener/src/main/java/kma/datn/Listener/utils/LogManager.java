package kma.datn.Listener.utils;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;

public class LogManager {
    public static void writeLog(String log, int type) {
        Logger logger = Logger.getLogger(LogManager.class.getName());
        String fileName = type == 0 ? "transactions.log" : type == 1 ? "triggerLog.log" : "all.log";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
            writer.write("Time: " + LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME) + ", Content: " + log);
            writer.newLine();
        } catch (IOException e) {
            logger.info(e.getMessage());
        }
    }

    public static void readLog(int type) {
        Logger logger = Logger.getLogger(LogManager.class.getName());
        String nameFile = type == 0 ? "transactions" : type == 1 ? "triggerLog" : "all";
        try {
            BufferedReader reader = new BufferedReader(new FileReader(nameFile + ".log"));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            reader.close();
        } catch (Exception e) {
            logger.info(e.getMessage());
        }
    }
}
