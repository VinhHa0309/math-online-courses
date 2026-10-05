package com.mathcourses.controller;

import com.mathcourses.model.Course;
import com.mathcourses.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import com.mathcourses.model.User;
import com.mathcourses.repository.UserRepository;

@RestController
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    // GET /api/courses → trả về danh sách tất cả khóa học
    @GetMapping("/api/courses")
    public List<Course> getCourses() {
        return courseRepository.findAll();
    }

    // GET /api/courses/1 → trả về 1 khóa học theo ID
    @GetMapping("/api/courses/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseRepository.findById(id).orElseThrow();
    }

    // GET /api/instructors → trả về danh sách Ban Lãnh Đạo / Admin / Giảng Viên từ Database
    @GetMapping("/api/instructors")
    public List<User> getInstructors() {
        return userRepository.findByRoleIn(List.of("ADMIN", "INSTRUCTOR", "admin", "instructor"));
    }
}
