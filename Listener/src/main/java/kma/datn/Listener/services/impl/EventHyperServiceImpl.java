package kma.datn.Listener.services.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import kma.datn.Listener.kafka.KafkaProducer;
import kma.datn.Listener.models.EventHyper;
import kma.datn.Listener.services.IEventHyperService;
import kma.datn.Listener.utils.LogManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class EventHyperServiceImpl implements IEventHyperService {
    @Autowired
    private final KafkaProducer kafkaProducer;

    @Override
    public void eventHandling(EventHyper eventHyper) throws IOException {
//        System.out.println(eventHyper);
        LogManager.writeLog(eventHyper.toString(), "event");
//        var data =
//                eventHyper.getEventHyperType() != EventHyperType.DeleteTransEvent ?
//                        new TransactionFabric((Map<String, String>) eventHyper.getData()) :
//                        eventHyper.getData();
        kafkaProducer.sendEvent(new ObjectMapper().writeValueAsString(eventHyper));
    }
}
