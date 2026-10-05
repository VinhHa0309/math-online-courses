package com.mathcourses.controller;

import com.mathcourses.dto.NotificationDTO;
import com.mathcourses.model.Notification;
import com.mathcourses.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * GET /api/notifications/user/{userId}
     * Lấy danh sách thông báo của user (mới nhất lên đầu).
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationDTO>> getUserNotifications(@PathVariable Long userId) {
        List<Notification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        List<NotificationDTO> dtos = list.stream()
                .map(NotificationDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    /**
     * GET /api/notifications/user/{userId}/unread-count
     * Lấy số lượng thông báo chưa đọc.
     */
    @GetMapping("/user/{userId}/unread-count")
    public ResponseEntity<Map<String, Long>> getUnreadCount(@PathVariable Long userId) {
        long count = notificationRepository.countByUserIdAndIsReadFalse(userId);
        return ResponseEntity.ok(Map.of("unreadCount", count));
    }

    /**
     * PATCH /api/notifications/{id}/read
     * Đánh dấu 1 thông báo là đã đọc.
     */
    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        Optional<Notification> opt = notificationRepository.findById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Notification notif = opt.get();
        notif.setRead(true);
        notificationRepository.save(notif);
        return ResponseEntity.ok(new NotificationDTO(notif));
    }

    /**
     * PATCH /api/notifications/user/{userId}/read-all
     * Đánh dấu tất cả thông báo của user là đã đọc.
     */
    @PatchMapping("/user/{userId}/read-all")
    public ResponseEntity<?> markAllAsRead(@PathVariable Long userId) {
        List<Notification> list = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
        for (Notification n : list) {
            if (!n.isRead()) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        }
        return ResponseEntity.ok(Map.of("message", "Đã đánh dấu tất cả là đã đọc"));
    }
}
