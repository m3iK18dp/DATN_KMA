package com.kma.DATN.services;

import com.kma.DATN.DTO.AuthenticationRequest;
import com.kma.DATN.DTO.UserRequestDto;
import com.kma.DATN.models.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface IAuthenticationService {

    List<Object> createAuthenticationToken(AuthenticationRequest authenticationRequest);

    List<Object> createAuthenticationTokenByOTP(AuthenticationRequest authenticationRequest);

    UserRequestDto saveRegistration(User user, String otp);


    List<?> getAccountInformationByToken(String token);

    Boolean logoutAllInOtherDevices(String password, HttpServletRequest request);

    Boolean submitResetPassword(String username);

    Boolean changePasswordForForgerPassword(String password, String token);
}
