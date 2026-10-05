package com.mathcourses.controller;

import com.mathcourses.dto.UpdateProfileRequest;
import com.mathcourses.model.User;
import com.mathcourses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 1. API Lấy thông tin chi tiết người dùng
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại!");
        }
        return ResponseEntity.ok(userOpt.get());
    }

    // 2. API Cập nhật toàn bộ thông tin profile (FullName, AvatarUrl, Bio, Location, Website)
    @PutMapping("/{id}/profile")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody UpdateProfileRequest request) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại!");
        }

        User user = userOpt.get();
        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getAvatarUrl() != null) user.setAvatarUrl(request.getAvatarUrl());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getLocation() != null) user.setLocation(request.getLocation());
        if (request.getWebsite() != null) user.setWebsite(request.getWebsite());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // 3. API Chuyên biệt: Đổi Avatar nhanh cho Người dùng
    @PutMapping("/{id}/avatar")
    public ResponseEntity<?> updateAvatar(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String avatarUrl = body.get("avatarUrl");
        if (avatarUrl == null || avatarUrl.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Link avatar không được để trống!");
        }

        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Người dùng không tồn tại!");
        }

        User user = userOpt.get();
        user.setAvatarUrl(avatarUrl);
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "message", "Cập nhật ảnh đại diện thành công!",
            "avatarUrl", updatedUser.getAvatarUrl(),
            "user", updatedUser
        ));
    }
}
