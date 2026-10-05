package com.mathcourses.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(
            @Value("${cloudinary.cloud-name:xea8vpcy}") String cloudName,
            @Value("${cloudinary.api-key:}") String apiKey,
            @Value("${cloudinary.api-secret:}") String apiSecret) {

        if (apiKey != null && !apiKey.isEmpty() && apiSecret != null && !apiSecret.isEmpty()) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret
            ));
        } else {
            // Cấu hình tối thiểu với cloud_name
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName
            ));
        }
    }

    public String uploadImage(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        try {
            Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "folder", "math_courses"
            ));
            return (String) uploadResult.get("secure_url");
        } catch (Exception e) {
            // Nếu upload Cloudinary gặp lỗi credentials, fallback trả về đường dẫn tên file hoặc thông báo lỗi
            System.err.println("Lỗi Upload Cloudinary trong Java Service: " + e.getMessage());
            throw new IOException("Không thể tải ảnh lên Cloudinary: " + e.getMessage());
        }
    }
}
