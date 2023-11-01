package com.kma.DATN.fabric.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TransactionFabric {
    @JsonProperty("ID")
    private String id;
    @JsonProperty("CreateTime")
    private String createTime;
    @JsonProperty("DataHash")
    private String dataHash;


    @Override
    public String toString() {
        return "{" +
                "\"id\"=\"" + id + "\"" +
                ", \"createTime\"=\"" + createTime + "\"" +
                ", \"dataHash\"=\"" + dataHash + "\"" +
                "}";
    }

}
