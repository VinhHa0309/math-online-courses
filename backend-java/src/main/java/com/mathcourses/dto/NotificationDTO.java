package com.mathcourses.dto;

import com.mathcourses.model.Notification;
import java.time.LocalDateTime;

public class NotificationDTO {
    private Long id;
    private Long userId;
    private String title;
    private String description;
    private String type;
    private boolean isRead;
    private Long courseId;
    private LocalDateTime createdAt;

    public NotificationDTO() {}

    public NotificationDTO(Notification notif) {
        this.id = notif.getId();
        if (notif.getUser() != null) {
            this.userId = notif.getUser().getId();
        }
        this.title = notif.getTitle();
        this.description = notif.getDescription();
        this.type = notif.getType();
        this.isRead = notif.isRead();
        this.courseId = notif.getCourseId();
        this.createdAt = notif.getCreatedAt();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
