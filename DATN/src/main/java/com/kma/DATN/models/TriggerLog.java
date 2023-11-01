package com.kma.DATN.models;


import com.kma.DATN.converters.TransactionConverter;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;


@Table(name = "TriggerLog")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class TriggerLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private TriggerType type;

    @Column(name = "checked", nullable = false)
    private boolean checked = false;

    @Column(name = "createdAt", nullable = false)
    private Timestamp createdAt;

    @Convert(converter = TransactionConverter.class)
    @Column(name = "transaction", nullable = false)
    private Transaction transaction;

    @Convert(converter = TransactionConverter.class)
    @Column(name = "changedTransaction")
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
}
