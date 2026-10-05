package com.mathcourses.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret Key dùng để ký và mã hóa Token
    private static final String SECRET_STRING = "vinhha_secret_key_must_be_at_least_256_bits_long_for_hmac_sha_algorithm";
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));
    // Access Token có thời hạn 1 giờ (3,600,000 ms)
    private static final long ACCESS_TOKEN_EXPIRATION = 3600000L; 
    // Refresh Token có thời hạn 7 ngày (604,800,000 ms)
    private static final long REFRESH_TOKEN_EXPIRATION = 604800000L; 

    // 1. Tạo Access Token (1 giờ)
    public String generateAccessToken(String email) {
        return Jwts.builder()
                .subject(email)
                .claim("type", "ACCESS")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
                .signWith(key)
                .compact();
    }
    // 2. Tạo Refresh Token (7 ngày)
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .subject(email)
                .claim("type", "REFRESH")
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
                .signWith(key)
                .compact();
    }
    // Tương thích ngược: generateToken trả về Access Token
    public String generateToken(String email) {
        return generateAccessToken(email);
    }
    // 3. Trích xuất email từ JWT Token
    public String extractEmail(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claims.getSubject();
    }

    // 4. Kiểm tra xem Token còn hạn sử dụng không
    public boolean isTokenValid(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            return claims.getExpiration().after(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}

