package kma.datn.Listener.utils;

import java.io.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;

public class LogManager {
    public static void writeLog(String log, String name) {
        Logger logger = Logger.getLogger(LogManager.class.getName());
        String fileName = name + ".log";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName, true))) {
            writer.write("Time: " + LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME) + ", Content: " + log);
            writer.newLine();
        } catch (IOException e) {
            logger.info(e.getMessage());
        }
    }

    public static void readLog(String name) {
        Logger logger = Logger.getLogger(LogManager.class.getName());
        try {
            BufferedReader reader = new BufferedReader(new FileReader(name + ".log"));
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
