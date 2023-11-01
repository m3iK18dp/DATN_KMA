package com.kma.DATN.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tokens")
@Builder
public class Token {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
    private Long id;
    @NotBlank
    private String token;
    @NotBlank
    private String tokenFabric;
    @Enumerated(EnumType.STRING)
    private TokenType tokenType;
    private int revoked;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "USER_ID", referencedColumnName = "id")
//    @JsonManagedReference
    private User user;


}
