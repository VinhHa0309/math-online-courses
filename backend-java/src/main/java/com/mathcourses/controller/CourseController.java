package com.mathcourses.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CourseController {

    @GetMapping("/api/courses")
    public List<Map<String, Object>> getCourses() {
        return List.of(
            Map.of("id", 1, "title", "Toán Cao Cấp 1", "price", 299000),
            Map.of("id", 2, "title", "Toán Rời Rạc", "price", 399000),
            Map.of("id", 3, "title", "Đại Số Tuyến Tính", "price", 349000)
        );
    }
}
