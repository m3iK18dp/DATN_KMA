package kma.datn.Listener.kafka;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kma.datn.Listener.models.TriggerLog;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KafkaConsumer {
    private static final Logger LOGGER = LoggerFactory.getLogger(KafkaConsumer.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = "java", groupId = "myGroup")
    public void consumer(String message) {
        LOGGER.info(String.format("Message received -> %s", message));
        System.out.println("====================================================================");
        try {
            List<TriggerLog> triggerLogs = objectMapper.readValue(message, new TypeReference<>() {
            });
            LOGGER.info(String.format("Message received -> %s", triggerLogs.toString()));
        } catch (JsonProcessingException e) {
            LOGGER.error(e.getMessage());
        }
    }
}
