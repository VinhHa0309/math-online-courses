package com.mathcourses.repository;

import com.mathcourses.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
    // JpaRepository tự có sẵn:
    // findAll()       → SELECT * FROM courses
    // findById(id)    → SELECT * FROM courses WHERE id = ?
    // save(course)    → INSERT / UPDATE
    // deleteById(id)  → DELETE
}
