package com.mathcourses.controller;

import com.mathcourses.dto.EnrollmentDTO;
import com.mathcourses.model.Course;
import com.mathcourses.model.Enrollment;
import com.mathcourses.model.User;
import com.mathcourses.repository.CourseRepository;
import com.mathcourses.repository.EnrollmentRepository;
import com.mathcourses.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping
    public ResponseEntity<?> enrollCourse(@RequestBody Map<String, Long> requestBody) {
        Long userId = requestBody.get("userId");
        Long courseId = requestBody.get("courseId");

        if (userId == null || courseId == null) {
            return ResponseEntity.badRequest().body("userId and courseId are required");
        }

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }

        Optional<Enrollment> existing = enrollmentRepository.findByUserIdAndCourseId(userId, courseId);
        if (existing.isPresent()) {
            return ResponseEntity.ok(new EnrollmentDTO(existing.get()));
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setStatus("PENDING");

        Enrollment saved = enrollmentRepository.save(enrollment);
        return ResponseEntity.status(HttpStatus.CREATED).body(new EnrollmentDTO(saved));
    }
}
