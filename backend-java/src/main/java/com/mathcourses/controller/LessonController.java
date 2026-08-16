package com.mathcourses.controller;

import com.mathcourses.model.Enrollment;
import com.mathcourses.model.Lesson;
import com.mathcourses.model.User;
import com.mathcourses.repository.EnrollmentRepository;
import com.mathcourses.repository.LessonRepository;
import com.mathcourses.repository.UserRepository;
import com.mathcourses.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/lessons")
@CrossOrigin(origins = "http://localhost:5173")
public class LessonController {

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private JwtUtil jwtUtil;

    // GET /api/lessons/course/{courseId} -> Lấy danh sách tất cả bài học của khóa học (chưa kèm videoUrl nếu bị khóa)
    @GetMapping("/course/{courseId}")
    public ResponseEntity<?> getLessonsByCourse(@PathVariable Long courseId) {
        List<Lesson> lessons = lessonRepository.findByCourseIdOrderByOrderNumAsc(courseId);
        return ResponseEntity.ok(lessons);
    }

    // GET /api/lessons/{id}/play -> Kiểm tra xác thực phía Server trước khi phát video bài học
    @GetMapping("/{id}/play")
    public ResponseEntity<?> playLesson(
            @PathVariable Long id,
            @RequestHeader(value = "Authorization", required = false) String authHeader) {

        Optional<Lesson> lessonOpt = lessonRepository.findById(id);
        if (lessonOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Bài học không tồn tại!");
        }

        Lesson lesson = lessonOpt.get();

        // 1. Bài học miễn phí (isFree = true) -> Cho phép phát ngay
        if (Boolean.TRUE.equals(lesson.getIsFree())) {
            Map<String, Object> response = new HashMap<>();
            response.put("allowed", true);
            response.put("lesson", lesson);
            return ResponseEntity.ok(response);
        }

        // 2. Xác thực JWT Token của người dùng
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Vui lòng đăng nhập để mở khóa bài học này!");
        }

        String token = authHeader.substring(7);
        if (!jwtUtil.isTokenValid(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!");
        }

        String email = jwtUtil.extractEmail(token);
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Tài khoản không tồn tại!");
        }

        User user = userOpt.get();

        // Admin hoặc Giảng viên được phép xem bài học
        if ("ADMIN".equalsIgnoreCase(user.getRole()) || "INSTRUCTOR".equalsIgnoreCase(user.getRole())) {
            Map<String, Object> response = new HashMap<>();
            response.put("allowed", true);
            response.put("lesson", lesson);
            return ResponseEntity.ok(response);
        }

        // 3. Kiểm tra xem Học viên đã Đăng ký & được Duyệt (APPROVED) chưa
        Optional<Enrollment> enrollmentOpt = enrollmentRepository.findByUserIdAndCourseId(user.getId(), lesson.getCourse().getId());
        if (enrollmentOpt.isEmpty() || !"APPROVED".equalsIgnoreCase(enrollmentOpt.get().getStatus())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Bạn chưa đăng ký hoặc chưa được quản trị viên duyệt khóa học này!");
        }

        // 4. Đã duyệt -> Trả về bài học + videoUrl
        Map<String, Object> response = new HashMap<>();
        response.put("allowed", true);
        response.put("lesson", lesson);
        return ResponseEntity.ok(response);
    }
}
