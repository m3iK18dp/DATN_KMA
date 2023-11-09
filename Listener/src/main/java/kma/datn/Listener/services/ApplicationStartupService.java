//package kma.datn.Listener.services;
//
//
//import jakarta.annotation.PostConstruct;
//import org.springframework.stereotype.Service;
//
//@Service
//public class ApplicationStartupService {
//
//    private final BinlogService binlogService;
//
//    public ApplicationStartupService(BinlogService binlogService) {
//        this.binlogService = binlogService;
//    }
//
//    @PostConstruct
//    public void initialize() {
//        binlogService.startBinlogClient();
//    }
//}