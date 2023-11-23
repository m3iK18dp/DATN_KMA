package kma.datn.Listener.controllers;

import kma.datn.Listener.models.EventHyper;
import kma.datn.Listener.models.ResponseObject;
import kma.datn.Listener.services.IEventHyperService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/event-hyper")
@RequiredArgsConstructor
public class EventHyperController {

    @Autowired
    private final IEventHyperService eventHyperService;


    @PostMapping()
    public ResponseObject<Boolean> getAccount(@RequestBody EventHyper eventHyper) {
        try {
            eventHyperService.eventHandling(eventHyper);
            return new ResponseObject<>(
                    "ok",
                    "Successfully."
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Failed " + exception.getMessage()
            );
        }
    }
}
