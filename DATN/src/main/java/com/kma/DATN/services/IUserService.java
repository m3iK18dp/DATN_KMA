package com.kma.DATN.services;

import com.kma.DATN.DTO.UserRequestDto;
import com.kma.DATN.models.Role;
import com.kma.DATN.models.User;
import com.kma.DATN.models.UserStatus;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface IUserService {

    UserRequestDto changeStatusUser(String userId, UserStatus userStatus, HttpServletRequest request);


    UserRequestDto updateUser(String id, User user, HttpServletRequest request);

    boolean isPinCreated(HttpServletRequest request);


    void createPIN(String pin, HttpServletRequest request);

    void updatePIN(String oldPIN, String password, String newPIN, HttpServletRequest request);

    Page<UserRequestDto> findUsersWithPaginationAndSort(
            String id,
            String email,
            String name,
            String phoneNumber,
            String accountNumber,
            Role role,
            int page,
            int limit,
            String field,
            String typeSort,
            HttpServletRequest request);

    Optional<User> findUserByEmail(String email);

    User extractUser(HttpServletRequest request);

    User getUserInformation(HttpServletRequest request);

    UserRequestDto registerUser(User user, String otp);

    UserRequestDto saveUser(User user, String otp);


    //    UserRequestDto updateEmailToUser(Long id, String email, HttpServletRequest request);
//    UserRequestDto updatePasswordToUser(Long id, String oldPassword, String newPassword, HttpServletRequest request);

    UserRequestDto updateEmailToUser(String newEmail, String password, HttpServletRequest request);

    UserRequestDto updatePasswordToUser(String oldPassword, String newPassword, HttpServletRequest request);


    ////////////////////////////////Important
    void changeRevokeAllUserTokens(String username, int value);

    void changeRevokeAllUserResetPasswordTokens(String username, int value);

    void changeRevokeAllUserBearerTokens(String username, int value);
//    UserRequestDto resetUserPassword(Long id, HttpServletRequest request);

    UserRequestDto resetUserPassword(String id, HttpServletRequest request);

    void userInitialization();


    String getUserFullNameAccountNumber(String accountNumber, HttpServletRequest request);

    boolean checkPinCorrect(String pin, HttpServletRequest request);
}