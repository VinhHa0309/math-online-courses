package com.mathcourses.controller;

import com.mathcourses.dto.ContactRequest;
import com.mathcourses.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    private static final Logger log = LoggerFactory.getLogger(ContactController.class);

    @Autowired
    private EmailService emailService;

    /**
     * POST /api/contact/register
     * Nhận thông tin đăng ký từ form CTA, log ra console, gửi email xác nhận.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerContact(@RequestBody ContactRequest req) {

        // ── Validate ──────────────────────────────────────────────────────
        if (req.getFullName() == null || req.getFullName().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Họ tên không được để trống!"));
        }
        if (req.getPhone() == null || req.getPhone().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Số điện thoại không được để trống!"));
        }

        // ── Log ───────────────────────────────────────────────────────────
        String ts = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
        log.info("════════════════════════════════════════════════════════");
        log.info("📬  ĐĂNG KÝ KHÓA HỌC MỚI — {}", ts);
        log.info("👤  Họ tên    : {}", req.getFullName());
        log.info("📞  Điện thoại: {}", req.getPhone());
        log.info("📧  Email     : {}", req.getEmail() != null ? req.getEmail() : "(không có)");
        log.info("🎓  Lớp       : {}", req.getGrade()  != null ? req.getGrade()  : "(không chọn)");
        log.info("📚  Khóa học  : {}", req.getCourse() != null ? req.getCourse() : "(không chọn)");
        log.info("════════════════════════════════════════════════════════");

        // ── Gửi email xác nhận → học sinh ────────────────────────────────
        emailService.sendConfirmationToStudent(req);

        // ── Gửi thông báo → admin ─────────────────────────────────────────
        emailService.sendNotificationToAdmin(req);

        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Đăng ký thành công! Chúng tôi sẽ liên hệ qua số " + req.getPhone() + " trong thời gian sớm nhất.",
            "name",    req.getFullName()
        ));
    }
}
