package com.kma.DATN.controllers;

import com.kma.DATN.models.TriggerLog;
import com.kma.DATN.repositories.TriggerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin()
public class TriggerController {
    private final TriggerRepository triggerRepository;

    @GetMapping("/test/{transactionCode}")
    public TriggerLog get(@PathVariable String transactionCode) {
        return triggerRepository.checkSendMail(transactionCode).orElse(null);
    }
}
