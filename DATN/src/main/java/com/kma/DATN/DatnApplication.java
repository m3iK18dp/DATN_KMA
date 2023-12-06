package com.kma.DATN;

import com.kma.DATN.services.IUserService;
import com.kma.DATN.services.trigger.TriggerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@RequiredArgsConstructor
@EnableScheduling
public class DatnApplication implements CommandLineRunner {
    @Autowired
    private final IUserService userService;
    @Autowired
    private final TriggerService triggerService;

    public static void main(String[] args) {
        SpringApplication.run(DatnApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // userService.roleInitialization();
        triggerService.createTriggers();
        userService.userInitialization();

    }
}
