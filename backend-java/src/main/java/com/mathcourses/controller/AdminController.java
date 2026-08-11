package com.mathcourses.controller;

import com.mathcourses.dto.AdminStatsDTO;
import com.mathcourses.dto.CreateCourseDTO;
import com.mathcourses.dto.EnrollmentDTO;
import com.mathcourses.model.Course;
import com.mathcourses.model.Enrollment;
import com.mathcourses.repository.CourseRepository;
import com.mathcourses.repository.EnrollmentRepository;
import com.mathcourses.repository.PaymentRepository;
import com.mathcourses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // 1. GET /api/admin/enrollments?status=PENDING
    @GetMapping("/enrollments")
    public ResponseEntity<List<EnrollmentDTO>> getEnrollments(
            @RequestParam(name = "status", required = false, defaultValue = "PENDING") String status) {
        
        List<Enrollment> enrollments;
        if ("ALL".equalsIgnoreCase(status)) {
            enrollments = enrollmentRepository.findAll();
        } else {
            enrollments = enrollmentRepository.findByStatus(status.toUpperCase());
        }

        List<EnrollmentDTO> dtos = enrollments.stream()
                .map(EnrollmentDTO::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtos);
    }

    // 2. PATCH /api/admin/enrollments/{id}/approve
    @PatchMapping("/enrollments/{id}/approve")
    public ResponseEntity<?> approveEnrollment(@PathVariable Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id).orElse(null);
        if (enrollment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
        }

        enrollment.setStatus("APPROVED");
        enrollment.setApprovedAt(LocalDateTime.now());
        Enrollment updated = enrollmentRepository.save(enrollment);

        // Update student count in course if available
        if (updated.getCourse() != null) {
            Course course = updated.getCourse();
            int currentCount = course.getStudentCount() != null ? course.getStudentCount() : 0;
            course.setStudentCount(currentCount + 1);
            courseRepository.save(course);
        }

        return ResponseEntity.ok(new EnrollmentDTO(updated));
    }

    // 3. PATCH /api/admin/enrollments/{id}/reject
    @PatchMapping("/enrollments/{id}/reject")
    public ResponseEntity<?> rejectEnrollment(@PathVariable Long id) {
        Enrollment enrollment = enrollmentRepository.findById(id).orElse(null);
        if (enrollment == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
        }

        enrollment.setStatus("REJECTED");
        Enrollment updated = enrollmentRepository.save(enrollment);

        return ResponseEntity.ok(new EnrollmentDTO(updated));
    }

    // 4. POST /api/admin/courses
    @PostMapping("/courses")
    public ResponseEntity<?> createCourse(@RequestBody CreateCourseDTO dto) {
        if (dto.getTitle() == null || dto.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Title is required");
        }

        Course course = new Course();
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setCategory(dto.getCategory());
        course.setGrade(dto.getGrade());
        course.setPrice(dto.getPrice() != null ? dto.getPrice() : 0);
        course.setOriginalPrice(dto.getOriginalPrice());
        course.setTag(dto.getTag());
        course.setImageUrl(dto.getImageUrl());
        course.setLessonCount(dto.getLessonCount() != null ? dto.getLessonCount() : 0);
        course.setDurationHours(dto.getDurationHours() != null ? dto.getDurationHours() : 0.0);
        course.setInstructorId(dto.getInstructorId());
        course.setIsActive(true);

        Course savedCourse = courseRepository.save(course);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }

    // 5. GET /api/admin/stats
    @GetMapping("/stats")
    public ResponseEntity<AdminStatsDTO> getAdminStats() {
        long totalStudents = userRepository.countByRole("USER");
        long totalCourses = courseRepository.count();
        long pendingApprovals = enrollmentRepository.countByStatus("PENDING");
        long totalRevenue = paymentRepository.sumTotalRevenue();

        AdminStatsDTO stats = new AdminStatsDTO(totalStudents, totalCourses, pendingApprovals, totalRevenue);
        return ResponseEntity.ok(stats);
    }
}
