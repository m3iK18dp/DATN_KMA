package com.kma.DATN.controllers;

import com.kma.DATN.DTO.AuthenticationRequest;
import com.kma.DATN.DTO.UserRequestDto;
import com.kma.DATN.models.ResponseObject;
import com.kma.DATN.models.User;
import com.kma.DATN.services.IAuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@Controller
@RequestMapping(path = "/api/auth")
@RequiredArgsConstructor
@CrossOrigin()
public class AuthController {

    @Autowired
    private final IAuthenticationService authenticationService;

    @PostMapping("/authenticate")
    public ResponseObject<List<Object>> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Create Successfully.",
                    authenticationService.createAuthenticationToken(authenticationRequest)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    new ArrayList<>()
            );
        }
    }

    @PostMapping("/authenticate_by_otp")
    public ResponseObject<List<Object>> createAuthenticationTokenByOTP(@RequestBody AuthenticationRequest authenticationRequest) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Create Successfully.",
                    authenticationService.createAuthenticationTokenByOTP(authenticationRequest)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    new ArrayList<>()
            );
        }
    }

    @PostMapping("/account_information")
    public ResponseObject<List<?>> getAccountInformationByToken(@RequestBody String token) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Get Account Information success.",
                    authenticationService.getAccountInformationByToken(token.replaceAll("\"", ""))
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    new ArrayList<>()
            );
        }
    }

    @PostMapping("")
    public ResponseObject<UserRequestDto> registration(@RequestBody User user, @RequestParam("otp") String otp) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Register Successfully.",
                    authenticationService.saveRegistration(user, otp)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    new UserRequestDto()
            );
        }
    }

    @PostMapping("/logout_on_all_other_devices")
    public ResponseObject<Boolean> logoutAllInOtherDevices(@RequestBody String password, HttpServletRequest request) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Logout All In Other Devices Successfully.",
                    authenticationService.logoutAllInOtherDevices(password.replaceAll("\"", ""), request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    Boolean.FALSE
            );
        }
    }

    @PostMapping("/submit_reset_password")
    public ResponseObject<Boolean> submitResetPassword(@RequestParam String username) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Submit Reset Password Successfully.",
                    authenticationService.submitResetPassword(username)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    Boolean.FALSE
            );
        }
    }

    @PostMapping("/change_password_for_forget_password")
    public ResponseObject<Boolean> changePasswordForForgerPassword(@RequestBody Map<String, String> passwordAndToken) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Change Password Success",
                    authenticationService.changePasswordForForgerPassword(passwordAndToken.get("password"), passwordAndToken.get("token"))
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    exception.getMessage(),
                    Boolean.FALSE
            );
        }
    }
}
