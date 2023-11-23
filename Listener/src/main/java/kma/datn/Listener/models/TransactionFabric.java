package kma.datn.Listener.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

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

    public TransactionFabric(Map<String, String> transactionFabric) {
        this.id = transactionFabric.get("ID");
        this.createTime = transactionFabric.get("CreateTime");
        this.dataHash = transactionFabric.get("DataHash");
    }

    @Override
    public String toString() {
        return "{" +
                "\"id\"=\"" + id + "\"" +
                ", \"createTime\"=\"" + createTime + "\"" +
                ", \"dataHash\"=\"" + dataHash + "\"" +
                "}";
    }

}
