package com.kma.DATN.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "accounts")
public class Account {
    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(updatable = false)
//    private Long id;
//    @Column(nullable = false, unique = true)
    private String accountNumber;
    @Column(nullable = false)
    @Min(value = 0, message = "Value must be non-negative")
    private Long balance;

    //    @Column(length = 1000)
//    private String description;
    @NotBlank
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private AccountStatus status = AccountStatus.ACTIVE;

    @Builder.Default
    @Column(nullable = false)
    private LocalDateTime createdTime = LocalDateTime.now().withNano(0);

//    @JsonIgnore
//    @OneToMany(mappedBy = "senderAccount")
//    private List<Transaction> transactionsSender;
//
//    @JsonIgnore
//    @OneToMany(mappedBy = "recipientAccount")
//    private List<Transaction> transactionsRecipient;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "USER_ID", referencedColumnName = "id")
    @JsonIgnoreProperties("accounts-user")
    private User user;

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (object == null || getClass() != object.getClass()) return false;

        Account account = (Account) object;

        return Objects.equals(accountNumber, account.accountNumber);
    }

    @Override
    public int hashCode() {
        return accountNumber != null ? accountNumber.hashCode() : 0;
    }
}
