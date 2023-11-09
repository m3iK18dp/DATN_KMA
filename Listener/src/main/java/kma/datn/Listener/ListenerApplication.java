package kma.datn.Listener;

import kma.datn.Listener.services.BinlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@RequiredArgsConstructor
public class ListenerApplication implements CommandLineRunner {
    private final BinlogService binlogService;

    public static void main(String[] args) {
        SpringApplication.run(ListenerApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        binlogService.startBinlogClient();
    }
}
