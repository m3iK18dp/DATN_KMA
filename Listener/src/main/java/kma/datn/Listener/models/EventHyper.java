package kma.datn.Listener.models;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventHyper {
    @Enumerated(EnumType.STRING)
    private EventHyperType eventHyperType;
    private TransactionFabric data;

    @Override
    public String toString() {
        return "EventHyper{" +
                "eventHyperType=" + eventHyperType +
                ", data=" + data +
                '}';
    }
}
