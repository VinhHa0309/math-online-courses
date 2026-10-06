package com.mathcourses.config;

import com.mathcourses.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Cho phép CORS cấu hình bên dưới và tắt CSRF
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(AbstractHttpConfigurer::disable)
            
            // 2. Định nghĩa quyền truy cập các đường dẫn
            .authorizeHttpRequests(auth -> auth
                // Cho phép các API công khai, Admin API và Swagger UI truy cập
                .requestMatchers(
                    "/api/auth/**", "/api/users/**", "/api/health", "/api/courses/**", "/api/instructors/**", "/api/instructors", "/api/payment/**", 
                    "/api/notifications/**", "/api/enrollments/**", "/api/contact/**",
                    "/api/admin/**",
                    "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html"
                ).permitAll()
                // Mọi request API khác bắt buộc phải đăng nhập
                .anyRequest().authenticated()
            )
            // 3. Thêm JWT Filter trước UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 3. Cấu hình CORS để cho phép Frontend (Vite port 5173) gọi API
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Cho phép frontend ở localhost và tất cả domain Vercel / Render truy cập
        configuration.setAllowedOriginPatterns(List.of(
            "http://localhost:5173",
            "http://127.0.0.1:5173",
            "https://*.vercel.app",
            "https://*.onrender.com"
        ));
        
        // Cho phép tất cả các phương thức HTTP thông thường
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        
        // Cho phép các Header thông dụng
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));
        
        // Cho phép gửi kèm cookie hoặc thông tin xác thực
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Áp dụng cấu hình CORS này cho toàn bộ API trong hệ thống
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}