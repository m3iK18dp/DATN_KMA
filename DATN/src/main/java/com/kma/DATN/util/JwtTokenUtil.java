package com.kma.DATN.util;

import com.kma.DATN.repositories.TokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtTokenUtil {
    public static final String JWT_SECRET =
            "24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367566B58703273357638792F423F4528482B4D6251655468576D5A71337436";
    public static final int JWT_EXPIRATION_MS = 1_800_000;
    public static final int JWT_EXPIRATION_RS = 300_000;
    @Autowired
    private final TokenRepository tokenRepository;


//    public static final int JWT_EXPIRATION_MS = 15000;
    //    private static final Logger log = Logger.getLogger(JwtTokenUtil.class);

    private static Key getSignInKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(encodedKey);
    }

    public static String generateJwtToken(
            UserDetails userDetails, int type) {
        return generateJwtToken(new HashMap<>(), userDetails, type);
    }

    public static String generateJwtToken(
            Map<String, Object> claims,
            UserDetails userDetails,
            int type) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + (type == 0 ? JWT_EXPIRATION_MS : JWT_EXPIRATION_RS)))
                .signWith(getSignInKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {

        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);

    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (io.jsonwebtoken.ExpiredJwtException exception) {
            tokenRepository.findByToken(token).map(t -> {
                t.setRevoked(-1);
                return tokenRepository.save(t);
            });
            throw new RuntimeException("Your token has expired, please submit again to continue.");
        } catch (Exception exception) {
            throw new RuntimeException("Your token is invalid, please submit again to continue.");
        }
    }

    public boolean isTokenExpired(String token) {
        boolean check = extractExpiration(token).before(new Date());
        if (check)
            tokenRepository.findByToken(token).map(t -> {
                t.setRevoked(-1);
                return tokenRepository.save(t);
            });
        return check;
    }

    public boolean validateJwtToken(String authToken, UserDetails userDetails) {
        final String username = extractUserName(authToken);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(authToken));
    }
}