package com.mathcourses.config;

import com.mathcourses.model.User;
import com.mathcourses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataInitializer {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private void createOrUpdateAdmin(String email, String fullName, String bio, String rawPassword, String avatarUrl) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            User admin = new User();
            admin.setEmail(email);
            admin.setFullName(fullName);
            admin.setBio(bio);
            admin.setPassword(passwordEncoder.encode(rawPassword));
            admin.setRole("ADMIN");
            admin.setAvatarUrl(avatarUrl);
            userRepository.save(admin);
            System.out.println(">>> DataInitializer: Đã khởi tạo tài khoản Admin -> Email: " + email);
        } else {
            User admin = userOpt.get();
            boolean updated = false;
            if (admin.getAvatarUrl() == null || admin.getAvatarUrl().isEmpty()) {
                admin.setAvatarUrl(avatarUrl);
                updated = true;
            }
            if (admin.getBio() == null || admin.getBio().isEmpty()) {
                admin.setBio(bio);
                updated = true;
            }
            if (!"ADMIN".equals(admin.getRole())) {
                admin.setRole("ADMIN");
                updated = true;
            }
            if (updated) {
                userRepository.save(admin);
                System.out.println(">>> DataInitializer: Đã cập nhật thông tin Admin -> Email: " + email);
            }
        }
    }
}
