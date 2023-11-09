package kma.datn.Listener.models;

import jakarta.persistence.*;
import kma.datn.Listener.converteres.TransactionConverter;
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
    @Enumerated(EnumType.STRING)
    private TriggerType type;
    private boolean checked;
    private Timestamp createdAt;
    @Convert(converter = TransactionConverter.class)
    private Transaction transaction;
    @Convert(converter = TransactionConverter.class)
    private Transaction changedTransaction;

    @Override
    public String toString() {
        return "TriggerLog{" +
                "id=" + id +
                ", type=" + type +
                ", checked=" + checked +
                ", createdAt=" + createdAt +
                ", transaction=" + transaction +
                ", changedTransaction=" + changedTransaction +
                '}';
    }

//    @Id
//    private Long id;
//    //    private TriggerType type;
//    private String message;
//    @JsonProperty("transactionCode")
//    private String transaction_code;
//    private boolean checked;
//    @JsonProperty("createdAt")
//    private Timestamp created_at;
//    private String transaction;
//    @Override
//    public String toString() {
//        return "TriggerLog{" +
//                "id=" + id +
//                ", message='" + message + '\'' +
//                ", transactionCode='" + transaction_code + '\'' +
//                ", checked=" + checked +
//                ", createdAt=" + created_at +
//                ", transaction='" + transaction + '\'' +
//                '}';
//    }
}
