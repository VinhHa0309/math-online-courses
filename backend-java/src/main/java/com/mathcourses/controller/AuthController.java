package com.mathcourses.controller;

import com.mathcourses.dto.AuthResponse;
import com.mathcourses.dto.LoginRequest;
import com.mathcourses.dto.RegisterRequest;
import com.mathcourses.model.User;
import com.mathcourses.repository.UserRepository;
import com.mathcourses.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

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
}
