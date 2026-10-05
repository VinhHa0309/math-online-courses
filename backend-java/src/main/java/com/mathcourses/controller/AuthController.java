package com.mathcourses.controller;

import com.mathcourses.dto.AuthResponse;
import com.mathcourses.dto.LoginRequest;
import com.mathcourses.dto.RegisterRequest;
import com.mathcourses.dto.RefreshTokenRequest;
import com.mathcourses.dto.GoogleAuthRequest;
import com.mathcourses.model.User;
import com.mathcourses.repository.UserRepository;
import com.mathcourses.security.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${google.client.id}")
    private String googleClientId;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // Sử dụng BCrypt để băm mật khẩu bảo mật
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 1. API ĐĂNG KÝ (POST /api/auth/register)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại trên hệ thống!");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER"); 

        User savedUser = userRepository.save(user);

        String accessToken = jwtUtil.generateAccessToken(savedUser.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(savedUser.getEmail());

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, savedUser));
    }

    // 2. API ĐĂNG NHẬP (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Email hoặc mật khẩu không chính xác!");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Email hoặc mật khẩu không chính xác!");
        }

        String accessToken = jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, user));
    }

    // 3. API CẤP LẠI TOKEN MỚI TỪ REFRESH TOKEN (POST /api/auth/refresh)
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        String refreshToken = request.getRefreshToken();

        if (refreshToken == null || !jwtUtil.isTokenValid(refreshToken)) {
            return ResponseEntity.badRequest().body("Refresh Token không hợp lệ hoặc đã hết hạn!");
        }

        String email = jwtUtil.extractEmail(refreshToken);
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Tài khoản người dùng không tồn tại!");
        }

        User user = userOpt.get();
        String newAccessToken = jwtUtil.generateAccessToken(user.getEmail());
        String newRefreshToken = jwtUtil.generateRefreshToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(newAccessToken, newRefreshToken, user));
    }

    // 4. API ĐĂNG XUẤT (POST /api/auth/logout)
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok(Map.of("message", "Đăng xuất thành công!"));
    }

    // 5. API ĐĂNG NHẬP BẰNG GOOGLE (POST /api/auth/google)
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody GoogleAuthRequest request) {
        try {
            NetHttpTransport transport = new NetHttpTransport();
            GsonFactory jsonFactory = GsonFactory.getDefaultInstance();

            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(request.getIdToken());
            if (idToken == null) {
                return ResponseEntity.badRequest().body("Token Google không hợp lệ hoặc đã hết hạn!");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String picture = (String) payload.get("picture");

            Optional<User> userOpt = userRepository.findByEmail(email);
            User user;
            if (userOpt.isPresent()) {
                user = userOpt.get();
                if (picture != null && (user.getAvatarUrl() == null || !user.getAvatarUrl().equals(picture))) {
                    user.setAvatarUrl(picture);
                    user = userRepository.save(user);
                }
            } else {
                user = new User();
                user.setEmail(email);
                user.setFullName(name != null ? name : email);
                user.setAvatarUrl(picture);
                user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                user.setRole("USER");
                user = userRepository.save(user);
            }

            String accessToken = jwtUtil.generateAccessToken(user.getEmail());
            String refreshToken = jwtUtil.generateRefreshToken(user.getEmail());

            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken, user));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi xác thực tài khoản Google: " + e.getMessage());
        }
    }
}

