package com.kma.DATN.DTO;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequest {
    private String username;
    private String password;
    
}
