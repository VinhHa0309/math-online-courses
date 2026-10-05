package com.mathcourses.dto;

public class UpdateProfileRequest {
    private String fullName;
    private String avatarUrl;
    private String bio;
    private String location;
    private String website;

    public UpdateProfileRequest() {
    }

    public UpdateProfileRequest(String fullName, String avatarUrl, String bio, String location, String website) {
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.bio = bio;
        this.location = location;
        this.website = website;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }
}
