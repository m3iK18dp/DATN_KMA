package kma.datn.Listener.components;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.shyiko.mysql.binlog.BinaryLogClient;
import com.github.shyiko.mysql.binlog.event.*;
import kma.datn.Listener.kafka.KafkaProducer;
import kma.datn.Listener.models.TriggerLog;
import kma.datn.Listener.repositories.TriggerLogRepository;
import kma.datn.Listener.utils.LogManager;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class MyBinlogEventListener implements BinaryLogClient.EventListener {
    @Autowired
    private final TriggerLogRepository triggerLogRepository;
    @Autowired
    private final KafkaProducer kafkaProducer;
    Logger LOGGER = LoggerFactory.getLogger(MyBinlogEventListener.class);
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void onEvent(Event event) {
        try {
            EventHeaderV4 header = event.getHeader();
            EventData data = event.getData();
            EventType eventType = header.getEventType();
            if (eventType == EventType.EXT_WRITE_ROWS) {
                WriteRowsEventData writeDate = (WriteRowsEventData) data;
                LOGGER.info(writeDate.toString());
                if (writeDate.getTableId() == 105) {
                    List<TriggerLog> triggerLogs = triggerLogRepository.findTriggerNotCheck();
                    kafkaProducer.sendMessage(objectMapper.writeValueAsString(triggerLogs));
                    LOGGER.info(triggerLogs.toString());
                    LogManager.writeLog(writeDate.toString(), 1);
                } else if (writeDate.getTableId() == 99) {
                    LogManager.writeLog(writeDate.toString(), 0);
                } else LogManager.writeLog(writeDate.toString(), 2);
            } else if (eventType == EventType.EXT_UPDATE_ROWS) {
                UpdateRowsEventData updateData = (UpdateRowsEventData) data;
                LOGGER.info(updateData.toString());
                if (updateData.getTableId() == 105) {
                    LogManager.writeLog(updateData.toString(), 1);
                } else if (updateData.getTableId() == 99) {
                    LogManager.writeLog(updateData.toString(), 0);
                } else LogManager.writeLog(updateData.toString(), 2);
            } else if (eventType == EventType.EXT_DELETE_ROWS) {
                DeleteRowsEventData deleteData = (DeleteRowsEventData) data;
                LOGGER.info(deleteData.toString());
                if (deleteData.getTableId() == 105) {
                    LogManager.writeLog(deleteData.toString(), 1);
                } else if (deleteData.getTableId() == 99) {
                    LogManager.writeLog(deleteData.toString(), 0);
                } else LogManager.writeLog(deleteData.toString(), 2);
            }
        } catch (Exception e) {
            LOGGER.error(e.toString());
        }
    }
}
