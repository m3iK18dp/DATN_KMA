package com.kma.DATN.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(updatable = false)
    private String id;
    @NotBlank
    @Column(nullable = false, length = 40)
    private String firstName;
    @NotBlank
    @Column(nullable = false, length = 10)
    private String lastName;
    @NotBlank
    @Column(nullable = false, unique = true, length = 50)
    private String email;
    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    private String password = new BCryptPasswordEncoder().encode("Abcd@1234");
    @NotBlank
    private String pin;
    @NotBlank
    @Column(nullable = false)
    private String address;
    @NotBlank
    @Column(nullable = false)
    private String phoneNumber;
    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.NOT_YET_ACTIVE;
    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;
//    @NotBlank
//    private String avatar;

    @NotBlank
    @Column(nullable = false)
    @Builder.Default
    private int countIncorrectPassword = 0;

    //    @NotBlank
//    @Column(nullable = false)
//    @Builder.Default
//    private int countIncorrectPin = 0;

    @Builder.Default
    @Column(nullable = false)
    private LocalDateTime createdTime = LocalDateTime.now().withNano(0);

    @Builder.Default
    @Column(nullable = false)
    private LocalDateTime lastUpdated = LocalDateTime.now().withNano(0);

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    @JsonBackReference("users-tokens")
    private List<Token> tokens;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user-accounts")
    @Builder.Default
    private List<Account> accounts = new ArrayList<>();

//
    //    @Override
//    public String toString() {
//        return "{" +
//                "\"id\":" + id + "," +
//                "\"firstName\":\"" + firstName + "\"," +
//                "\"lastName\":\"" + lastName + "\"," +
//                "\"email\":\"" + email + "\"," +
//                "\"password\":\"" + password + "\"," +
//                "\"companyName\":\"" + companyName + "\"," +
//                "\"address\":\"" + address + "\"," +
//                "\"phoneNumber\":\"" + phoneNumber + "\"," +
//                "\"taxCode\":\"" + taxCode + "\"," +
//                "\"status\":" + status + "," +
//                "\"role\":" + role + "," +
//                "\"tokens\":" + tokens + "," +
//                "\"tenderContracts\":" + tenderContracts + "," +
//                "\"bids\":" + bids +
//                "}";
//    }
}