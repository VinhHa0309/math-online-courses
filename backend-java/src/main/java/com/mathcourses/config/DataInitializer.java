package com.mathcourses.config;

import com.mathcourses.model.User;
import com.mathcourses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public void run(String... args) throws Exception {
        // Tự động khởi tạo/cập nhật tài khoản Admin mặc định với mật khẩu chuẩn 123456
        createOrUpdateAdmin("admin@mathematiq.vn", "Admin SuongMath", "123456");
        createOrUpdateAdmin("admin@suongmath.vn", "Admin SuongMath", "123456");
    }

    private void createOrUpdateAdmin(String email, String fullName, String rawPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            User admin = new User();
            admin.setEmail(email);
            admin.setFullName(fullName);
            admin.setPassword(passwordEncoder.encode(rawPassword));
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println(">>> DataInitializer: Đã khởi tạo tài khoản Admin -> Email: " + email + " | Password: " + rawPassword);
        } else {
            User admin = userOpt.get();
            if (admin.getPassword() == null || admin.getPassword().contains("HASH_PLACEHOLDER")) {
                admin.setPassword(passwordEncoder.encode(rawPassword));
                admin.setRole("ADMIN");
                userRepository.save(admin);
                System.out.println(">>> DataInitializer: Đã cập nhật mật khẩu tài khoản Admin -> Email: " + email + " | Password: " + rawPassword);
            }
        }
    }
}
