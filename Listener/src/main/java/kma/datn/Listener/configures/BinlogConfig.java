package kma.datn.Listener.configures;


import com.github.shyiko.mysql.binlog.BinaryLogClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BinlogConfig {

    @Bean
    public BinaryLogClient binaryLogClient() {
        return new BinaryLogClient("localhost", 3306, "datn_demo", "readTriggerDATN", "123456");
    }
}
