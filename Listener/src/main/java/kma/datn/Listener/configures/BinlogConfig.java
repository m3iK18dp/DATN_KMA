package kma.datn.Listener.configures;


import com.github.shyiko.mysql.binlog.BinaryLogClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BinlogConfig {

    @Bean
    public BinaryLogClient binaryLogClient() {
        // Configure other client settings here
        return new BinaryLogClient("localhost", 3306, "test_trigger", "readTriggerDATN", "123456");
    }
}
