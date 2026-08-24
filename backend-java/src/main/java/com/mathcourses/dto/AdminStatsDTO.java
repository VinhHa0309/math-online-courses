package com.mathcourses.dto;

public class AdminStatsDTO {
    private long totalStudents;
    private long totalCourses;
    private long pendingApprovals;
    private long totalRevenue;

    public AdminStatsDTO() {}

    public AdminStatsDTO(long totalStudents, long totalCourses, long pendingApprovals, long totalRevenue) {
        this.totalStudents = totalStudents;
        this.totalCourses = totalCourses;
        this.pendingApprovals = pendingApprovals;
        this.totalRevenue = totalRevenue;
    }

    // --- GETTERS & SETTERS ---
    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }

    public long getPendingApprovals() { return pendingApprovals; }
    public void setPendingApprovals(long pendingApprovals) { this.pendingApprovals = pendingApprovals; }

    public long getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(long totalRevenue) { this.totalRevenue = totalRevenue; }
}
