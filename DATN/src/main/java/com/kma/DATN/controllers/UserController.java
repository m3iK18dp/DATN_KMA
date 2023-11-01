package com.kma.DATN.controllers;

import com.kma.DATN.DTO.UserRequestDto;
import com.kma.DATN.models.ResponseObject;
import com.kma.DATN.models.Role;
import com.kma.DATN.models.User;
import com.kma.DATN.models.UserStatus;
import com.kma.DATN.services.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin()
public class UserController {
    private final IUserService userService;


    @GetMapping("/user")
    public ResponseObject<Page<UserRequestDto>> getUser(@RequestParam(value = "_id", defaultValue = "-1") String id,
                                                        @RequestParam(value = "_email", defaultValue = "") String email,
                                                        @RequestParam(value = "_name", defaultValue = "") String name,
                                                        @RequestParam(value = "_phone_number", defaultValue = "") String phoneNumber,
                                                        @RequestParam(value = "_account_number", defaultValue = "") String accountNumber,
                                                        @RequestParam(value = "_role", defaultValue = "") Role role,
                                                        @RequestParam(value = "_page", defaultValue = "0") int page,
                                                        @RequestParam(value = "_limit", defaultValue = "10") int limit,
                                                        @RequestParam(value = "_field", defaultValue = "id") String field,
                                                        @RequestParam(value = "_type_sort", defaultValue = "asc") String typeSort,
                                                        HttpServletRequest request
    ) {
        Page<UserRequestDto> users = new PageImpl<>(new ArrayList<>(), PageRequest.of(0, 10), 0);
        try {
            users = userService.findUsersWithPaginationAndSort(id, email, name, phoneNumber, accountNumber, role, page, limit, field, typeSort, request);
            if (users.isEmpty()) {
                return new ResponseObject<>(
                        "failed",
                        "Not found Users.",
                        users
                );
            } else {
                return new ResponseObject<>(
                        "ok",
                        "Get All Successfully.",
                        users
                );
            }
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't get Users with filter. " + exception.getMessage(),
                    users
            );
        }
    }

    @GetMapping("/user/getFullNameByAccount/{accountNumber}")
    public ResponseObject<String> getUserFullNameAccountNumber(@PathVariable String accountNumber, HttpServletRequest request) {

        try {
            String fullName = userService.getUserFullNameAccountNumber(accountNumber, request);

            return new ResponseObject<>(
                    "ok",
                    "Get User Full Name success",
                    fullName
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't get Users Full Name. " + exception.getMessage(),
                    null
            );
        }
    }

    @GetMapping("/user/information")
    public ResponseObject<UserRequestDto> getUserInformation(HttpServletRequest request) {

        try {
            User user = userService.getUserInformation(request);
            if (user != null)
                return new ResponseObject<>(
                        "ok",
                        "Get User Information success",
                        new UserRequestDto(user)
                );
            else
                return new ResponseObject<>(
                        "failed",
                        "Get User Information failed",
                        null
                );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't get Users with filter. " + exception.getMessage(),
                    null
            );
        }
    }

    @PostMapping("/user")
    public ResponseObject<UserRequestDto> addUser(
            @RequestBody User user,
            @RequestParam("otp") String otp
    ) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Add User Successfully.",
                    userService.saveUser(user, otp)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't add user. " + exception.getMessage(),
                    null
            );
        }
    }

    //admin
    @PutMapping("/user/{id}")
    public ResponseObject<UserRequestDto> updateUser(
            @PathVariable String id,
            @RequestBody User user,
            HttpServletRequest request
    ) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Update user successfully.",
                    userService.updateUser(id, user, request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't update user. " + exception.getMessage(),
                    null
            );
        }
    }

    @GetMapping("/pin/check")
    public ResponseObject<?> checkAccountPIN(HttpServletRequest request) {
        try {
            if (userService.isPinCreated(request)) {
                return new ResponseObject<>("ok", "PIN Created", true);
            } else {
                return new ResponseObject<>("failed", "PIN Not Created", false);
            }
        } catch (Exception exception) {
            return new ResponseObject<>("error", exception.getMessage(), false);
        }
    }

    @PostMapping("/pin/create")
    public ResponseObject<?> createPIN(@RequestParam("pin") String pin, HttpServletRequest request) {
        try {
            userService.createPIN(pin, request);
            return new ResponseObject<>("ok", "Create PIN success", true);
        } catch (Exception exception) {
            return new ResponseObject<>("error", "Create PIN failed. " + exception.getMessage(), false);
        }
    }

    @PutMapping("/pin/update")
    public ResponseObject<?> updatePIN(@RequestParam("oldPin") String oldPin, @RequestParam("password") String password, @RequestParam("newPin") String newPin, HttpServletRequest request) {
        try {
            userService.updatePIN(oldPin, password, newPin, request);
            return new ResponseObject<>("ok", "Update PIN success", true);
        } catch (Exception exception) {
            return new ResponseObject<>("error", "Update PIN failed. " + exception.getMessage(), false);
        }
    }

    @PutMapping("/user/reset_password/{id}")
    public ResponseObject<UserRequestDto> resetPassword(
            @PathVariable String id,
            HttpServletRequest request
    ) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Reset password to user with id: " + id + " successfully.",
                    userService.resetUserPassword(id, request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't reset password to user with id = " + id + ". " + exception.getMessage(),
                    null
            );
        }
    }

    //user
    @PutMapping("/user/update_email")
    public ResponseObject<UserRequestDto> updateEmailToUser(
            @RequestParam("newEmail") String newEmail,
            @RequestParam("password") String password,
            HttpServletRequest request
    ) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Update user email success",
                    userService.updateEmailToUser(newEmail, password, request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't update user email " + exception.getMessage(),
                    null
            );
        }
    }

    //user
    @PutMapping("/user/update_password")
    public ResponseObject<UserRequestDto> updatePasswordToUser(
            @RequestBody List<String> listPassword,
            HttpServletRequest request
    ) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Update user password success",
                    userService.updatePasswordToUser(listPassword.get(0), listPassword.get(1), request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Can't update user password " + exception.getMessage(),
                    null
            );
        }
    }

    @PutMapping("/user/change_status/{id}")
    public ResponseObject<UserRequestDto> changStatusUser(
            @PathVariable String id,
            @RequestBody UserStatus userStatus,
            HttpServletRequest request
    ) {
        try {
            return new ResponseObject<>(
                    "ok",
                    "Change Status user with id = " + id + " successfully.",
                    userService.changeStatusUser(id, userStatus, request)
            );
        } catch (Exception exception) {
            return new ResponseObject<>(
                    "error",
                    "Cannot change status User with id = " + id + ". " + exception.getMessage(),
                    null
            );
        }
    }

}
