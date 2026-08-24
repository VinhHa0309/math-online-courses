package com.mathcourses.dto;

import com.mathcourses.model.Enrollment;
import java.time.LocalDateTime;

public class EnrollmentDTO {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private String userAvatar;
    private Long courseId;
    private String courseTitle;
    private Integer coursePrice;
    private String status;
    private LocalDateTime enrolledAt;
    private LocalDateTime approvedAt;

    public EnrollmentDTO() {}

    public EnrollmentDTO(Enrollment enrollment) {
        this.id = enrollment.getId();
        if (enrollment.getUser() != null) {
            this.userId = enrollment.getUser().getId();
            this.userName = enrollment.getUser().getFullName();
            this.userEmail = enrollment.getUser().getEmail();
            this.userAvatar = enrollment.getUser().getAvatarUrl();
        }
        if (enrollment.getCourse() != null) {
            this.courseId = enrollment.getCourse().getId();
            this.courseTitle = enrollment.getCourse().getTitle();
            this.coursePrice = enrollment.getCourse().getPrice();
        }
        this.status = enrollment.getStatus();
        this.enrolledAt = enrollment.getEnrolledAt();
        this.approvedAt = enrollment.getApprovedAt();
    }

    // --- GETTERS & SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }

    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }

    public String getUserAvatar() { return userAvatar; }
    public void setUserAvatar(String userAvatar) { this.userAvatar = userAvatar; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public Integer getCoursePrice() { return coursePrice; }
    public void setCoursePrice(Integer coursePrice) { this.coursePrice = coursePrice; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getEnrolledAt() { return enrolledAt; }
    public void setEnrolledAt(LocalDateTime enrolledAt) { this.enrolledAt = enrolledAt; }

    public LocalDateTime getApprovedAt() { return approvedAt; }
    public void setApprovedAt(LocalDateTime approvedAt) { this.approvedAt = approvedAt; }
}
