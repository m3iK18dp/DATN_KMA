package kma.datn.Listener.models;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseObject<T> {
    private String status;
    private String message;
}
