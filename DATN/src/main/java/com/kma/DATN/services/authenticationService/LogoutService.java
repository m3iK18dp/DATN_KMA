package com.kma.DATN.services.authenticationService;

import com.kma.DATN.repositories.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Transactional
public class LogoutService implements LogoutHandler {
    @Autowired
    private final TokenRepository tokenRepository;


    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return;
        }
        String jwtToken = authorizationHeader.substring(7);
        tokenRepository.findByToken(jwtToken)
                .map(
                        storedToken -> {
                            storedToken.setRevoked(-1);
                            tokenRepository.save(storedToken);
                            return null;
                        }
                );
//        if (storedToken != null) {
//            storedToken.setRevoked(true);
//            tokenRepository.save(storedToken);
//        }
    }
}
