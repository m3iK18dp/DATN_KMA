package kma.datn.Listener.services;

import com.github.shyiko.mysql.binlog.BinaryLogClient;
import kma.datn.Listener.components.MyBinlogEventListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class BinlogService {

    private final BinaryLogClient binaryLogClient;
    private final MyBinlogEventListener binlogEventListener;

    public BinlogService(BinaryLogClient binaryLogClient, MyBinlogEventListener binlogEventListener) {
        this.binaryLogClient = binaryLogClient;
        this.binlogEventListener = binlogEventListener;
    }

    public void startBinlogClient() {
        try {
            binaryLogClient.registerEventListener(binlogEventListener);
            binaryLogClient.connect();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}