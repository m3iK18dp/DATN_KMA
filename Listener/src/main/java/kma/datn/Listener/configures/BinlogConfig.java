package kma.datn.Listener.configures;


import com.github.shyiko.mysql.binlog.BinaryLogClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BinlogConfig {

    @Bean
    public BinaryLogClient binaryLogClient() {
        return new BinaryLogClient(
                GlobalConfig.getConfig("binlog_hostname").toString(),
                Integer.parseInt(GlobalConfig.getConfig("binlog_port").toString()),
                GlobalConfig.getConfig("binlog_schema").toString(),
                GlobalConfig.getConfig("binlog_username").toString(),
                GlobalConfig.getConfig("binlog_password").toString()
        );
    }
}
