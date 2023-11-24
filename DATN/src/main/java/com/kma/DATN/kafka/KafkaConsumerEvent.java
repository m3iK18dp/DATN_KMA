package com.kma.DATN.kafka;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kma.DATN.mail.DTO.RequestSendEvent;
import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.EventHyper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaConsumerEvent {
    @Autowired
    private final IMailService mailService;
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumerEvent.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "event", groupId = "myGroup")
    public void consumerEvent(String message) {
        LOGGER.info(String.format("Event received -> %s", message));
        try {
            EventHyper eventHyper = objectMapper.readValue(message, EventHyper.class);
            RequestSendEvent requestSendEvent = new RequestSendEvent();
            requestSendEvent.setEmail("kiempham1256@gmail.com");
            requestSendEvent.setTime(Timestamp.valueOf(LocalDateTime.now()));
            requestSendEvent.setEventHyper(eventHyper);
            if (mailService.sendMailEvent(requestSendEvent))
                LOGGER.info("Send Mail Event Success -> Event: " + message);
            else
                LOGGER.info("Send Mail Event Failed -> Event: " + message);
        } catch (JsonProcessingException e) {
            LOGGER.error(e.getMessage());
        }
    }
}
