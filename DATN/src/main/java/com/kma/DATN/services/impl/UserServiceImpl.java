package com.kma.DATN.services.impl;

import com.kma.DATN.DTO.UserRequestDto;
import com.kma.DATN.configures.GlobalConfig;
import com.kma.DATN.exception.NotFoundException;
import com.kma.DATN.exception.UnauthorizedException;
import com.kma.DATN.fabric.IHyperledgerFabricService;
import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.*;
import com.kma.DATN.repositories.TokenRepository;
import com.kma.DATN.repositories.UserRepository;
import com.kma.DATN.services.IOTPService;
import com.kma.DATN.services.IUserService;
import com.kma.DATN.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final TokenRepository tokenRepository;
    @Autowired
    private final IOTPService otpService;
    @Autowired
    private final AccountServiceImpl accountService;
    @Autowired
    private final IHyperledgerFabricService hyperledgerFabricService;
    @Autowired
    private final IMailService mailService;

    @Override
    public User extractUser(HttpServletRequest request) {
        if (request.getHeader("Authorization") != null) {
            if (!request.getHeader("Authorization").startsWith("Bearer "))
                throw new RuntimeException("Token is invalid.");
            JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
            String token = request.getHeader("Authorization").substring(7);
            Token tokenInRepo = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token invalid, not found in data"));
            if (tokenInRepo.getTokenType() != TokenType.BEARER)
                throw new RuntimeException("Token is not Bearer token");
            return userRepository.findByEmail(jwtTokenUtil.extractUserName(token)).map(user -> {
                if (jwtTokenUtil.isTokenExpired(token))
                    throw new RuntimeException("Your token has expired, please re-enter to make a new token.");
                if (user.getStatus() == UserStatus.INACTIVE)
                    throw new RuntimeException(
                            "The user of the above token has been disabled.");
                if (user.getStatus() == UserStatus.NOT_YET_ACTIVE)
                    throw new RuntimeException(
                            "This user has not activated the pin code.");
                if (user.getStatus() == UserStatus.DELETED)
                    throw new RuntimeException(
                            "This user has been deleted.");
                return user;
            }).orElse(null);
        }
        return null;
    }

    @Override
    public User getUserInformation(HttpServletRequest request) {
        if (request.getHeader("Authorization") != null) {
            if (!request.getHeader("Authorization").startsWith("Bearer "))
                throw new RuntimeException("Token is invalid.");
            JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
            String token = request.getHeader("Authorization").substring(7);
            return userRepository.findByEmail(jwtTokenUtil.extractUserName(token)).map(user -> {
                if (jwtTokenUtil.isTokenExpired(token))
                    throw new RuntimeException("Your token has expired, please re-enter to make a new token.");
                if (user.getStatus() == UserStatus.INACTIVE)
                    throw new RuntimeException(
                            "The user of the above token has been disabled.");
//                if (user.getStatus() == UserStatus.NOT_YET_ACTIVE)
//                    throw new RuntimeException(
//                            "This user has not activated the pin code.");
                if (user.getStatus() == UserStatus.DELETED)
                    throw new RuntimeException(
                            "This user has been deleted.");
                return user;
            }).orElse(null);
        }
        return null;
    }

    @Override
    public UserRequestDto registerUser(User user, String otp) {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new RuntimeException("Email already exists, please enter another email to continue");
        if (!otpService.checkOTP(user.getEmail(), OTPType.REGISTER, otp))
            throw new RuntimeException("OTP Invalid");
        if (!user.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_!])(?=\\S+$).{8,20}$"))
            throw new RuntimeException(
                    "Invalid password. Password must be between 8 and 20 characters and include at least one uppercase letter, one lowercase letter, one number and one special character in the following @#$%^&+=_!");
        user.setId(generateUniqueUserId());
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setStatus(UserStatus.NOT_YET_ACTIVE);
        user.setRole(Role.USER);
        user.setCreatedTime(LocalDateTime.now().withNano(0));
        user.setLastUpdated(LocalDateTime.now().withNano(0));
        try {
            User savedUser = userRepository.save(user);
            // Create an account for the user
            Account account = accountService.createAccountWhenCreate(savedUser);
            List<Account> accounts = savedUser.getAccounts();
            accounts.add(account);
            savedUser.setAccounts(accounts);
            hyperledgerFabricService.registerUser(user.getId(), "Org1");
            mailService.sendMailThankYou(savedUser.getEmail(), savedUser);
            return new UserRequestDto(savedUser);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new RuntimeException("Error when query");
        }
    }

    @Override
    public UserRequestDto saveUser(User user, String otp) {
        if (userRepository.findByEmail(user.getEmail()).isPresent())
            throw new RuntimeException("Email already exists, please enter another email to continue");
        if (!otpService.checkOTP(user.getEmail(), OTPType.REGISTER, otp))
            throw new RuntimeException("OTP Invalid");
        if (!user.getPassword().matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_!])(?=\\S+$).{8,20}$"))
            throw new RuntimeException(
                    "Invalid password. Password must be between 8 and 20 characters and include at least one uppercase letter, one lowercase letter, one number and one special character in the following @#$%^&+=_!");
        try {
            User u = new User();
            u.setId(generateUniqueUserId());
            u.setFirstName(user.getFirstName());
            u.setLastName(user.getLastName());
            u.setEmail(user.getEmail());
            u.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            u.setAddress(user.getAddress());
            u.setPhoneNumber(user.getPhoneNumber());
            u.setStatus(UserStatus.NOT_YET_ACTIVE);
            u.setRole(user.getRole());
            u.setCreatedTime(LocalDateTime.now().withNano(0));
            u.setLastUpdated(LocalDateTime.now().withNano(0));
            User savedUser = userRepository.save(u);
            // Create an account for the user
            Account account = accountService.createAccountWhenCreate(savedUser);
            List<Account> accounts = savedUser.getAccounts();
            accounts.add(account);
            savedUser.setAccounts(accounts);
            hyperledgerFabricService.registerUser(u.getId(), "Org1");
            mailService.sendMailThankYou(savedUser.getEmail(), savedUser);
            return new UserRequestDto(savedUser);
        } catch (Exception exception) {
            exception.printStackTrace();
            throw new RuntimeException("Error when query");
        }
    }

    @Override
    public UserRequestDto updateUser(String id, User user, HttpServletRequest request) {
        User userAuth = extractUser(request);
        if (Objects.equals(id, ((User) GlobalConfig.getConfig("user-init-first")).getId()))
            throw new RuntimeException("You cannot edit the system default account.");
        else if (userAuth.getRole() == Role.ADMIN || Objects.equals(id, user.getId()))
            return userRepository.findById(id).map(updateUser -> {
                boolean checkChangeEmail = false;
                if (userAuth.getRole() == Role.ADMIN) {
                    updateUser.setRole(user.getRole());
                    if (!Objects.equals(updateUser.getEmail(), user.getEmail())
                            && userRepository.findByEmail(user.getEmail()).isPresent())
                        throw new RuntimeException("Email already exists, please enter another email to continue.");
                    if (!Objects.equals(updateUser.getEmail(), user.getEmail())) {
                        updateUser.setEmail(user.getEmail());
                        checkChangeEmail = true;
                    }
                }
                updateUser.setFirstName(user.getFirstName());
                updateUser.setLastName(user.getLastName());
                updateUser.setAddress(user.getAddress());
                updateUser.setPhoneNumber(user.getPhoneNumber());
                updateUser.setLastUpdated(LocalDateTime.now().withNano(0));
//                updateUser.setAvatar(user.getAvatar());
//                updateUser.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
                UserRequestDto result = new UserRequestDto(userRepository.save(updateUser));
                if (checkChangeEmail)
                    changeRevokeAllUserTokens(updateUser.getEmail(), -1);
                return result;
            }).orElseThrow(() -> new RuntimeException("User not found."));
        else
            throw new RuntimeException("You are not an administrator, so you cannot update other users' information");
    }

    @Override
    public boolean isPinCreated(HttpServletRequest request) {
        User user = getUserInformation(request);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return user.getPin() != null;
    }

    @Override
    public boolean checkPinCorrect(String pin, HttpServletRequest request) {
        User user = extractUser(request);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        return new BCryptPasswordEncoder().matches(pin, user.getPin());
    }

    @Override
    public void createPIN(String pin, HttpServletRequest request) {
        User user = getUserInformation(request);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        if (user.getPin() != null)
            throw new RuntimeException("Pin had created");
//        if (!new BCryptPasswordEncoder().matches(password, user.getPassword())) {
//            throw new UnauthorizedException("Invalid password");
//        }
        if (pin.length() < 6)
            throw new BadCredentialsException("Pin Code must have a minimum length of 6");

        user.setPin(new BCryptPasswordEncoder().encode(pin));
        user.setStatus(UserStatus.ACTIVE);
        userRepository.save(user);
    }

    @Override
    public void updatePIN(String oldPIN, String password, String newPIN, HttpServletRequest request) {
        User user = extractUser(request);
        if (user == null)
            throw new NotFoundException("User not found");
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        if (!encoder.matches(oldPIN, user.getPin()))
            throw new UnauthorizedException("Invalid PIN");
        if (!encoder.matches(password, user.getPassword()))
            throw new UnauthorizedException("Invalid password");
        if (newPIN.length() < 6)
            throw new BadCredentialsException("New Pin Code must have a minimum length of 6");
        user.setPin(encoder.encode(newPIN));
        userRepository.save(user);
    }

    @Override
    public UserRequestDto updateEmailToUser(String newEmail, String password, HttpServletRequest request) {
        User user = extractUser(request);
        if (user == null)
            throw new NotFoundException("User not found");
        if (Objects.equals(user.getId(), ((User) GlobalConfig.getConfig("user-init-first")).getId()))
            throw new RuntimeException("You cannot edit the system default account.");
        if (!new BCryptPasswordEncoder().matches(password, user.getPassword()))
            throw new UnauthorizedException("Invalid password");
        user.setEmail(newEmail);
        user.setLastUpdated(LocalDateTime.now().withNano(0));
        return new UserRequestDto(userRepository.save(user));
    }

    @Override
    public UserRequestDto updatePasswordToUser(String oldPassword, String newPassword, HttpServletRequest request) {
        User user = extractUser(request);
        if (user == null) {
            throw new NotFoundException("User not found");
        }
        if (!new BCryptPasswordEncoder().matches(oldPassword, user.getPassword())) {
            throw new UnauthorizedException("Invalid password");
        }
        if (!newPassword.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=_!])(?=\\S+$).{8,20}$"))
            throw new RuntimeException("Invalid password. Password must be between 8 and 20 characters and include at least one uppercase letter, one lowercases letter, one number and one special character in the following @#$%^&+=_!");
        user.setPassword(new BCryptPasswordEncoder().encode(newPassword));
        user.setLastUpdated(LocalDateTime.now().withNano(0));
        return new UserRequestDto(userRepository.save(user));
    }


    @Override
    public UserRequestDto changeStatusUser(String userId, UserStatus userStatus, HttpServletRequest request) {
        User userAuth = extractUser(request);
        if (Objects.equals(userId, ((User) GlobalConfig.getConfig("user-init-first")).getId()))
            throw new RuntimeException("You cannot edit the system default account.");
        else if (userAuth.getRole() == Role.ADMIN)
            return userRepository.findById(userId).map(user -> {
                changeRevokeAllUserTokens(user.getEmail(), userStatus == UserStatus.ACTIVE ? 0 : userStatus == UserStatus.INACTIVE ? 1 : -1);
                if (user.getCountIncorrectPassword() == 3 && user.getStatus() == UserStatus.INACTIVE && userStatus == UserStatus.ACTIVE)
                    user.setCountIncorrectPassword(0);
                user.setStatus(userStatus);
                user.setLastUpdated(LocalDateTime.now().withNano(0));
                return new UserRequestDto(userRepository.save(user));
            }).orElseThrow(() -> new RuntimeException("User not found."));
        else throw new RuntimeException("You not admin. You can't change status user");
    }

    @Override
    public Page<UserRequestDto> findUsersWithPaginationAndSort(
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
            HttpServletRequest request) {
        Pageable pageable = PageRequest.of(page, limit)
                .withSort(Sort.by(typeSort.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, field));
        return UserRequestDto.fromUsers(userRepository.findUsersWithPaginationAndSort(id, email, name,
                phoneNumber, accountNumber, role == null ? "" : role.toString(), pageable), pageable);
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        try {
            return userRepository.findByEmail(email);
        } catch (Exception e) {
            throw new RuntimeException("Error when querying.");
        }
    }

    @Override
    public void changeRevokeAllUserTokens(String username, int value) {
        try {
            tokenRepository.changeRevokeWithEmail(username, value);
        } catch (Exception exception) {
            throw new RuntimeException("Error when querying.");
        }
    }

    @Override
    public void changeRevokeAllUserResetPasswordTokens(String username, int value) {
        try {
            tokenRepository.changeRevokeAllUserResetPasswordTokens(username, value);
        } catch (Exception exception) {
            throw new RuntimeException("Error when querying.");
        }
    }

    @Override
    public void changeRevokeAllUserBearerTokens(String username, int value) {
        try {
            tokenRepository.changeRevokeAllTokenBearerWithEmail(username, value);
        } catch (Exception exception) {
            throw new RuntimeException("Error when querying.");
        }
    }

    @Override
    public UserRequestDto resetUserPassword(String id, HttpServletRequest request) {
        User user = extractUser(request);
        try {
            if (user.getRole() == Role.ADMIN) {
                return userRepository.findById(id).map(u -> {
                    u.setPassword(new BCryptPasswordEncoder().encode("Abcd@1234"));
                    u.setLastUpdated(LocalDateTime.now().withNano(0));
                    return new UserRequestDto(userRepository.save(u));
                }).orElseThrow(() -> new RuntimeException("User not found"));
            } else {
                throw new RuntimeException("You not admin, you can't reset your password.");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error when querying.");
        }
    }

    @Override
    public void userInitialization() {
        User u = (User) GlobalConfig.getConfig("user-init-first");
        if (userRepository.findByEmail(u.getEmail()).isEmpty()) {
            try {
                accountService.createAccountWhenCreate(userRepository.save(u));
                hyperledgerFabricService.registerUser(u.getId(), "Org1");
            } catch (Exception e) {
                e.printStackTrace();
                throw new RuntimeException("Error when querying.");
            }
        }
    }

    @Override
    public String getUserFullNameAccountNumber(String accountNumber, HttpServletRequest request) {
        User user = userRepository.getUserByAccountNumber(accountNumber);
        if (user == null)
            throw new RuntimeException("Not found User have account number");
        return user.getFirstName() + " " + user.getLastName();
    }


    private String generateUniqueUserId() {
        String userId;
        do {
            // Generate a UUID as the account number
            userId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);
        } while (userRepository.findById(userId).isPresent());

        return userId;
    }
}
