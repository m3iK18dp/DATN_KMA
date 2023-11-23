package kma.datn.Listener.services;

import kma.datn.Listener.models.EventHyper;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface IEventHyperService {
    void eventHandling(EventHyper eventHyper) throws IOException;

}
