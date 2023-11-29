package com.kma.DATN.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/socket")
@RequiredArgsConstructor
public class WebSocketRestController {

    private final WebSocketService webSocketService;

    @GetMapping("/send-message")
    public String sendMessage(@RequestParam("des") String des, @RequestParam("mess") String mess) {
        // Gọi API của WebSocketController để gửi tin nhắn
        webSocketService.sendMessage(des, mess);
        return "Message sent from REST API!";
    }
}
