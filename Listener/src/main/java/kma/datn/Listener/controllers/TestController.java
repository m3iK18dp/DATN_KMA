package kma.datn.Listener.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import kma.datn.Listener.models.TriggerLog;
import kma.datn.Listener.repositories.TriggerLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    @Autowired
    private final TriggerLogRepository triggerLogRepository;

    @GetMapping()
    public String getAccount() {
        try {
            List<TriggerLog> triggerLogs = triggerLogRepository.findTriggerNotCheck();
            System.out.println(triggerLogs);
//            return triggerLogs;
            return new ObjectMapper().registerModule(new JavaTimeModule()).writeValueAsString(triggerLogs);
        } catch (Exception e) {
//            return new ArrayList<>();
            return e.getMessage();
        }
    }

}
