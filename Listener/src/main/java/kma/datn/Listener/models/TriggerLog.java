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
    private boolean got;

    @Override
    public String toString() {
        return "TriggerLog{" +
                "id=" + id +
                ", type=" + type +
                ", checked=" + checked +
                ", createdAt=" + createdAt +
                ", transaction=" + transaction +
                ", changedTransaction=" + changedTransaction +
                ", got=" + got +
                '}';
    }
}
