package kma.datn.Listener.components;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.github.shyiko.mysql.binlog.BinaryLogClient;
import com.github.shyiko.mysql.binlog.event.*;
import kma.datn.Listener.configures.GlobalConfig;
import kma.datn.Listener.kafka.KafkaProducer;
import kma.datn.Listener.models.TriggerLog;
import kma.datn.Listener.repositories.TriggerLogRepository;
import kma.datn.Listener.utils.HandleJsonFile;
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
    private final ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @Override
    public void onEvent(Event event) {
        try {
            EventHeaderV4 header = event.getHeader();
            EventData data = event.getData();
            EventType eventType = header.getEventType();
            if (eventType == EventType.TABLE_MAP) {
                TableMapEventData tableData = (TableMapEventData) data;
                GlobalConfig.setConfig("info_table", HandleJsonFile.saveValueInJson(tableData.getTableId(), tableData.getTable()));
                tableData.getTable();
            }
            if (eventType == EventType.EXT_WRITE_ROWS) {
                WriteRowsEventData writeDate = (WriteRowsEventData) data;
                LOGGER.info(writeDate.toString());
                String tableName = ((JsonNode) GlobalConfig.getConfig("info_table")).get(String.valueOf(writeDate.getTableId())).asText();
                if (tableName.equals("triggerlog")) {
                    List<TriggerLog> triggerLogs = triggerLogRepository.findTriggerNotCheck();
                    kafkaProducer.sendMessage(objectMapper.writeValueAsString(triggerLogs));
                }
                LogManager.writeLog(writeDate.toString(), tableName);
            } else if (eventType == EventType.EXT_UPDATE_ROWS) {
                UpdateRowsEventData updateData = (UpdateRowsEventData) data;
                String tableName = ((JsonNode) GlobalConfig.getConfig("info_table")).get(String.valueOf(updateData.getTableId())).asText();
                LOGGER.info(updateData.toString());
                LogManager.writeLog(updateData.toString(), tableName);
            } else if (eventType == EventType.EXT_DELETE_ROWS) {
                DeleteRowsEventData deleteData = (DeleteRowsEventData) data;
                String tableName = ((JsonNode) GlobalConfig.getConfig("info_table")).get(String.valueOf(deleteData.getTableId())).asText();
                LOGGER.info(deleteData.toString());
                LogManager.writeLog(deleteData.toString(), tableName);
            }
        } catch (Exception e) {
            LOGGER.error(e.toString());
        }
    }
}
