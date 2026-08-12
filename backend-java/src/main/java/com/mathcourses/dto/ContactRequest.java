package com.mathcourses.dto;

public class ContactRequest {
    private String fullName;
    private String phone;
    private String email;
    private String grade;
    private String course;
    private String note;

    public ContactRequest() {}

    // --- GETTERS & SETTERS ---
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
