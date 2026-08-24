package com.mathcourses.controller;

import com.mathcourses.model.Course;
import com.mathcourses.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

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
}
