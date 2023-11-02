package com.kma.DATN.services.impl;

import com.kma.DATN.DTO.AuthenticationRequest;
import com.kma.DATN.DTO.UserRequestDto;
import com.kma.DATN.fabric.IHyperledgerFabricService;
import com.kma.DATN.mail.IMailService;
import com.kma.DATN.models.*;
import com.kma.DATN.repositories.TokenRepository;
import com.kma.DATN.repositories.UserRepository;
import com.kma.DATN.services.IAuthenticationService;
import com.kma.DATN.services.IOTPService;
import com.kma.DATN.services.IUserService;
import com.kma.DATN.services.authenticationService.CustomUserDetailsService;
import com.kma.DATN.util.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationServiceImpl implements IAuthenticationService {

    @Autowired
    private final IUserService userService;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final TokenRepository tokenRepository;
    @Autowired
    private final IHyperledgerFabricService hyperledgerFabricService;
    @Autowired
    private final IMailService mailService;
    @Autowired
    private final IOTPService otpService;

    private Token saveUserToken(User user) {

        final UserDetails userDetails =
                new CustomUserDetailsService(userService).loadUserByUsername(user.getEmail());
        Token t = new Token();
        t.setUser(userService.findUserByEmail(user.getEmail()).orElse(null));
        t.setToken(JwtTokenUtil.generateJwtToken(userDetails, 0));
        t.setTokenType(TokenType.BEARER);
        t.setRevoked(0);
        t.setTokenFabric(hyperledgerFabricService.loginUser(user.getId(), "Org1"));
        return tokenRepository.save(t);

    }

    @Override
    public List<Object> createAuthenticationToken(AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String password = authenticationRequest.getPassword();
        User user = userService.findUserByEmail(username).orElseThrow(() -> new BadCredentialsException("No account found matching username."));
        if (user.getCountIncorrectPassword() == 3)
            throw new BadCredentialsException("The user has been locked for logging in incorrectly more than 3 times");
        if (user.getStatus() == UserStatus.INACTIVE || user.getStatus() == UserStatus.DELETED) {
            throw new BadCredentialsException("User is disabled.");
        }
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            username,
                            password
                    )
            );
        } catch (BadCredentialsException exception) {
            if (user.getCountIncorrectPassword() < 3) {
                user.setCountIncorrectPassword(user.getCountIncorrectPassword() + 1);
                userRepository.save(user);
                if (user.getCountIncorrectPassword() == 3)
                    throw new BadCredentialsException("The user has been locked for logging in incorrectly more than 3 times");
            }
            throw new RuntimeException("Your password is incorrect. Please re-enter your password.");
        }
        user.setCountIncorrectPassword(0);
        User u = userRepository.save(user);
        userService.changeRevokeAllUserBearerTokens(username, -1);
        String token = saveUserToken(u).getToken();
        return Arrays.asList(token,
                tokenRepository.findRoleByToken(token)
        );
    }

    @Override
    public List<Object> createAuthenticationTokenByOTP(AuthenticationRequest authenticationRequest) {
        String username = authenticationRequest.getUsername();
        String otp = authenticationRequest.getPassword();
        User user = userService.findUserByEmail(username).orElseThrow(() -> new BadCredentialsException("No account found matching username."));
        if (!otpService.checkOTP(user.getEmail(), OTPType.LOGIN, otp))
            throw new RuntimeException("OTP Invalid");
        userService.changeRevokeAllUserBearerTokens(username, -1);
        String token = saveUserToken(user).getToken();
        return Arrays.asList(token,
                tokenRepository.findRoleByToken(token)
        );
    }

    @Override
    public UserRequestDto saveRegistration(User user, String otp) {
        //        String password = user.getPassword();
        return userService.registerUser(user, otp);
//        return createAuthenticationToken(
//                new AuthenticationRequest(user.getEmail(), password)
//        );
    }

    @Override
    public List<?> getAccountInformationByToken(String token) {
        //List: revoked, isExpired, username, listRoles
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
        return tokenRepository.findByToken(token)
                .map(tokenRepo -> Arrays.asList(
                                tokenRepo.getRevoked(),
                                jwtTokenUtil.isTokenExpired(tokenRepo.getToken()),
                                jwtTokenUtil.extractUserName(tokenRepo.getToken()),
                                tokenRepository.findRoleByToken(tokenRepo.getToken())
                        )
                ).orElseThrow(() -> new RuntimeException("Your token is invalid, please login again to continue."));
    }

    @Override
    public Boolean logoutAllInOtherDevices(String password, HttpServletRequest request) {
        User userFromAuth = userService.extractUser(request);
        if (!new BCryptPasswordEncoder().matches(password, userFromAuth.getPassword()))
            throw new RuntimeException("Password Incorrect");
        try {
            tokenRepository.revokeAllTokenWithoutCurrentTokenWithEmail(userFromAuth.getEmail(), -1, request.getHeader("Authorization").substring(7));
        } catch (Exception exception) {
            throw new RuntimeException("Error when query");
        }
        return Boolean.TRUE;
    }

    @Override
    public Boolean submitResetPassword(String username) {
        Token t = new Token();
        User user = userService.findUserByEmail(username)
                .orElseThrow(() -> new BadCredentialsException("No account found matching username."));
        if (user.getStatus() == UserStatus.DELETED) {
            throw new BadCredentialsException("User is deleted.");
        }
        userService.changeRevokeAllUserResetPasswordTokens(username, -1);
        final UserDetails userDetails =
                new CustomUserDetailsService(userService).loadUserByUsername(user.getEmail());
        t.setUser(user);
        t.setToken(JwtTokenUtil.generateJwtToken(userDetails, 1));
        t.setTokenType(TokenType.RESET_PASSWORD);
        t.setRevoked(0);
        try {
            tokenRepository.save(t);
        } catch (Exception e) {
            throw new RuntimeException("Error when query");
        }
        return mailService.sendMailResetPassword(username, t.getToken(), LocalDateTime.now());
    }

    private User extractUser(String token) {
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil(tokenRepository);
        return userRepository.findByEmail(jwtTokenUtil.extractUserName(token)).map(user -> {
            if (jwtTokenUtil.isTokenExpired(token))
                throw new RuntimeException("Your token has expired, please re-enter to make a new token.");
            if (user.getStatus() == UserStatus.DELETED)
                throw new RuntimeException(
                        "This user has been deleted.");
            return user;
        }).orElse(null);
    }

    @Override
    public Boolean changePasswordForForgerPassword(String password, String token) {
        Token tokenInRepo = tokenRepository.findByToken(token).orElseThrow(() -> new RuntimeException("Token invalid, not found in data"));
        if (tokenInRepo.getTokenType() != TokenType.RESET_PASSWORD)
            throw new RuntimeException("Token is not reset password token");
        User userFromToken = extractUser(token);
        try {
            userFromToken.setPassword(new BCryptPasswordEncoder().encode(password));
            userFromToken.setCountIncorrectPassword(0);
            userFromToken.setStatus(UserStatus.ACTIVE);
            userRepository.save(userFromToken);
            tokenInRepo.setRevoked(-1);
            tokenRepository.save(tokenInRepo);
            return Boolean.TRUE;
        } catch (Exception e) {
            throw new RuntimeException("Error when query");
        }

    }
}
