package com.kma.DATN.util;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Service
public class BinaryFileHandler {
    static final String FILE_PATH = ".\\.\\fabric.token";
    static final String FILE_PATH_SECRET = ".\\.\\fabric.secret";

    public static String readFile(int type) throws IOException {
        FileInputStream fileInputStream = null;
        try {
            File file = new File(type == 1 ? FILE_PATH : FILE_PATH_SECRET);
            fileInputStream = new FileInputStream(file);
            byte[] data = new byte[(int) file.length()];
            fileInputStream.read(data);
            return new String(data, StandardCharsets.UTF_8);
        } finally {
            if (fileInputStream != null) {
                fileInputStream.close();
            }
        }
    }

    public static void writeStringToFile(String content, int type) throws IOException {
        FileOutputStream fileOutputStream = null;
        try {
            File file = new File(type == 1 ? FILE_PATH : FILE_PATH_SECRET);
            fileOutputStream = new FileOutputStream(file);
            byte[] data = content.getBytes(StandardCharsets.UTF_8);
            fileOutputStream.write(data, 0, data.length);
        } finally {
            if (fileOutputStream != null) {
                fileOutputStream.close();
            }
        }
    }
}
