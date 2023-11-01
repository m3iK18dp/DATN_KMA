package com.kma.DATN.fabric.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AddTransactionRequest {
    private String fcn;
    private String chainCodeName;
    private String channelName;
    private List<String> args;
}
