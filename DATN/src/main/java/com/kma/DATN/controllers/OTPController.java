package com.kma.DATN.controllers;

import com.kma.DATN.models.OTPType;
import com.kma.DATN.models.ResponseObject;
import com.kma.DATN.services.IOTPService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Controller
@RequestMapping(path = "/api/otp")
@RequiredArgsConstructor
@CrossOrigin()
public class OTPController {

    @Autowired
    private final IOTPService otpService;

    @PostMapping()
    public ResponseObject<Boolean> createOTP(@RequestParam("email") String email, @RequestParam("type") OTPType type) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Create OTP success",
                    otpService.createOTP(email, type)
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
