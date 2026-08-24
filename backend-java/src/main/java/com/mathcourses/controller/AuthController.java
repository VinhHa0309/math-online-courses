package com.mathcourses.controller;

import com.mathcourses.dto.AuthResponse;
import com.mathcourses.dto.LoginRequest;
import com.mathcourses.dto.RegisterRequest;
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

    // Sử dụng BCrypt để băm mật khẩu bảo mật (giống bcrypt bên Node.js)
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 1. API ĐĂNG KÝ (POST /api/auth/register)
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Kiểm tra xem Email đã bị trùng chưa
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email đã tồn tại trên hệ thống!");
        }

        // Tạo User mới và lưu thông tin
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        
        // Mã hóa mật khẩu trước khi lưu vào CSDL
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        // Mặc định phân quyền là "USER" khi đăng ký tài khoản mới
        user.setRole("USER"); 

        // Lưu vào Database SQL Server
        User savedUser = userRepository.save(user);

        // Đăng ký xong, tự động tạo luôn JWT Token cho người dùng đăng nhập ngay lập tức
        String token = jwtUtil.generateToken(savedUser.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, savedUser));
    }

    // 2. API ĐĂNG NHẬP (POST /api/auth/login)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Tìm User theo Email
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Email hoặc mật khẩu không chính xác!");
        }

        User user = userOpt.get();

        // So khớp mật khẩu người dùng gửi lên với mật khẩu đã mã hóa trong CSDL
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Email hoặc mật khẩu không chính xác!");
        }

        // Tạo JWT Token trả về
        String token = jwtUtil.generateToken(user.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    // 3. API ĐĂNG NHẬP BẰNG GOOGLE (POST /api/auth/google)
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

            // Kiểm tra xem User đã tồn tại theo Email chưa
            Optional<User> userOpt = userRepository.findByEmail(email);
            User user;
            if (userOpt.isPresent()) {
                user = userOpt.get();
                // Cập nhật lại avatar nếu avatar trên Google thay đổi hoặc chưa có
                if (picture != null && (user.getAvatarUrl() == null || !user.getAvatarUrl().equals(picture))) {
                    user.setAvatarUrl(picture);
                    user = userRepository.save(user);
                }
            } else {
                // Tạo mới User nếu chưa có tài khoản
                user = new User();
                user.setEmail(email);
                user.setFullName(name != null ? name : email);
                user.setAvatarUrl(picture);
                // Mã hóa một mật khẩu ngẫu nhiên cho tài khoản đăng nhập qua MXH
                user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                user.setRole("USER");
                user = userRepository.save(user);
            }

            // Tạo Token của hệ thống để trả về cho Frontend
            String token = jwtUtil.generateToken(user.getEmail());

            return ResponseEntity.ok(new AuthResponse(token, user));

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi xác thực tài khoản Google: " + e.getMessage());
        }
    }
}
