package com.mathcourses.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${SPRING_DATASOURCE_URL:${DATABASE_URL:${INTERNAL_DATABASE_URL:}}}")
    private String rawDbUrl;

    @Value("${SPRING_DATASOURCE_USERNAME:postgres}")
    private String envUsername;

    @Value("${SPRING_DATASOURCE_PASSWORD:postgres}")
    private String envPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        
        String finalJdbcUrl = "";
        String finalUsername = envUsername;
        String finalPassword = envPassword;

        if (rawDbUrl != null && (rawDbUrl.startsWith("postgresql://") || rawDbUrl.startsWith("postgres://"))) {
            try {
                URI uri = new URI(rawDbUrl);
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath();
                
                finalJdbcUrl = "jdbc:postgresql://" + host + ":" + port + path;
                
                // Trích xuất username/password từ URL nếu biến môi trường chưa đặt
                if (uri.getUserInfo() != null) {
                    String[] userPass = uri.getUserInfo().split(":");
                    if ("postgres".equals(envUsername) && userPass.length > 0) {
                        finalUsername = userPass[0];
                    }
                    if ("postgres".equals(envPassword) && userPass.length > 1) {
                        finalPassword = userPass[1];
                    }
                }
            } catch (Exception e) {
                logger.error("Lỗi khi parse rawDbUrl: {}", e.getMessage());
                finalJdbcUrl = rawDbUrl;
            }
        } else if (rawDbUrl != null && !rawDbUrl.trim().isEmpty()) {
            finalJdbcUrl = rawDbUrl;
        } else {
            finalJdbcUrl = "jdbc:postgresql://localhost:5432/math_courses_db";
        }

        // Ưu tiên cao nhất cho SPRING_DATASOURCE_USERNAME / PASSWORD nếu khác mặc định "postgres"
        if (!"postgres".equals(envUsername)) {
            finalUsername = envUsername;
        }
        if (!"postgres".equals(envPassword)) {
            finalPassword = envPassword;
        }

        logger.info("Connecting to Database JDBC URL: {}", finalJdbcUrl);
        logger.info("Database Username: {}", finalUsername);
        logger.info("Database Password Length: {}", finalPassword != null ? finalPassword.length() : 0);

        config.setJdbcUrl(finalJdbcUrl);
        config.setUsername(finalUsername);
        config.setPassword(finalPassword);
        config.setDriverClassName("org.postgresql.Driver");

        return new HikariDataSource(config);
    }
}
