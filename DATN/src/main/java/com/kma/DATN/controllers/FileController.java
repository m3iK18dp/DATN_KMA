//package com.kma.DATN.controllers;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.core.io.Resource;
//import org.springframework.core.io.UrlResource;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.net.MalformedURLException;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//
//@RestController
//@RequestMapping("/api")
//@RequiredArgsConstructor
//@CrossOrigin()
//public class FileController {
//
//    @GetMapping("/{idProduct}")
//    public ResponseEntity<Resource> getFile(@PathVariable("idProduct") int idProduct) {
//
//        try {
//            Path filePath = Paths.get(".\\uploadImage\\" + idProduct);
//            Resource resource = new UrlResource(filePath.toUri());
//
//            if (resource.exists()) {
//                return ResponseEntity.ok()
//                        .contentType(MediaType.IMAGE_JPEG)
//                        .header(HttpHeaders.CONTENT_DISPOSITION,
//                                "attachment; filename=\"" + resource.getFilename() + "\"")
//                        .body(resource);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (MalformedURLException e) {
//            // Xử lý ngoại lệ khi đường dẫn tệp tin không hợp lệ
//            return ResponseEntity.badRequest().build();
//        }
//    }
//}
