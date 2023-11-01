//package com.kma.DATN.util;
//
//
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.File;
//import java.io.IOException;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.UUID;
//
//public class FileHandler {
//
//    public static String saveFile(MultipartFile image) throws IOException {
//        if (image == null)
//            return "avt_default";
//        else {
//            try {
//                Path uploadPath = Paths.get("." + File.separator + "uploadImage");
//                if (!Files.exists(uploadPath)) {
//                    Files.createDirectories(uploadPath);
//                }
//                String originalFilename = image.getOriginalFilename();
//                assert originalFilename != null;
//                String fileExtension = getFileExtension(originalFilename);
//                String fileName = generateUniqueFileName(fileExtension);
//                // Xây dựng đường dẫn đến file
//                Path filePath = uploadPath.resolve(fileName);
//                // Lưu file vào đường dẫn filePath
//                Files.copy(image.getInputStream(), filePath);
//                return fileName;
//            } catch (Exception e) {
//                return "avt_default";
//            }
//        }
//    }
//
//    private static String generateUniqueFileName(String fileExtension) {
//        return UUID.randomUUID() + fileExtension;
//    }
//
//    private static String getFileExtension(String fileName) {
//        int dotIndex = fileName.lastIndexOf('.');
//        if (dotIndex > 0 && dotIndex < fileName.length() - 1) {
//            return fileName.substring(dotIndex);
//        }
//        return "";
//    }
//
//    public void updateFile(String existingFileName, MultipartFile newFile) throws IOException {
//        deleteFile(existingFileName);
//        saveFile(newFile);
//    }
//
//    public void deleteFile(String fileName) throws IOException {
//        Path filePath = Paths.get("." + File.separator + "uploadImage" + File.separator + fileName);
//        Files.deleteIfExists(filePath);
//    }
//}
