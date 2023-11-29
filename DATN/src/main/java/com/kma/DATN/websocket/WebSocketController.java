package com.kma.DATN.websocket;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class WebSocketController {
    private final WebSocketService webSocketService;

    @PostMapping("/api/socket/send")
    public ResponseEntity<Void> sendMessage(@RequestBody String message) {
        webSocketService.sendMessage("messages", message);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @MessageMapping("/api/socket/sendMessage")
    public void receiveMessage(@Payload String message) {

    }

    @SendTo("/api/socket/topic/message")
    public String broadcastMessage(@Payload String message) {
        return message;
    }
}
