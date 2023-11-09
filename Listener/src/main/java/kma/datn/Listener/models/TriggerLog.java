package kma.datn.Listener.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TriggerLog {
    @Id
    private Long id;
    //    private TriggerType type;
    private String message;
    @JsonProperty("transactionCode")
    private String transaction_code;
    private boolean checked;
    @JsonProperty("createdAt")
    private Timestamp created_at;
    private String transaction;
//    private String changedTransaction;
//
//    @Override
//    public String toString() {
//        return "TriggerLog{" +
//                "id=" + id +
//                ", type=" + type +
//                ", checked=" + checked +
//                ", createdAt=" + createdAt +
//                ", transaction=" + transaction +
//                ", changedTransaction=" + changedTransaction +
//                '}';
//    }

    @Override
    public String toString() {
        return "TriggerLog{" +
                "id=" + id +
                ", message='" + message + '\'' +
                ", transactionCode='" + transaction_code + '\'' +
                ", checked=" + checked +
                ", createdAt=" + created_at +
                ", transaction='" + transaction + '\'' +
                '}';
    }
}
