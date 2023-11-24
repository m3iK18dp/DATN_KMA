package com.kma.DATN.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class WebSocketController {
    private final WebSocketService webSocketService;

    @MessageMapping("/send/message")
    public void sendMessage(String message) {
        webSocketService.sendMessage("/topic/messages", message);
    }
//    @MessageMapping("/send/message")
//    @SendTo("/topic/messages")
//    public String sendMessage(String message) {
//        return message;
//    }
}
