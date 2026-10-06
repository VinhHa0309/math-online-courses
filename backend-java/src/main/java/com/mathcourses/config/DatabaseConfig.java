package com.mathcourses.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DatabaseConfig {

    @Value("${SPRING_DATASOURCE_URL:${DATABASE_URL:${INTERNAL_DATABASE_URL:}}}")
    private String rawDbUrl;

    @Value("${SPRING_DATASOURCE_USERNAME:postgres}")
    private String username;

    @Value("${SPRING_DATASOURCE_PASSWORD:postgres}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();

        if (rawDbUrl != null && (rawDbUrl.startsWith("postgresql://") || rawDbUrl.startsWith("postgres://"))) {
            try {
                URI uri = new URI(rawDbUrl);
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath();
                
                String dbUrl = "jdbc:postgresql://" + host + ":" + port + path;
                
                if (uri.getUserInfo() != null) {
                    String[] userPass = uri.getUserInfo().split(":");
                    config.setUsername(userPass[0]);
                    if (userPass.length > 1) {
                        config.setPassword(userPass[1]);
                    }
                } else {
                    config.setUsername(username);
                    config.setPassword(password);
                }
                config.setJdbcUrl(dbUrl);
            } catch (Exception e) {
                config.setJdbcUrl(rawDbUrl);
                config.setUsername(username);
                config.setPassword(password);
            }
        } else if (rawDbUrl != null && !rawDbUrl.trim().isEmpty()) {
            config.setJdbcUrl(rawDbUrl);
            config.setUsername(username);
            config.setPassword(password);
        } else {
            config.setJdbcUrl("jdbc:postgresql://localhost:5432/math_courses_db");
            config.setUsername(username);
            config.setPassword(password);
        }

        config.setDriverClassName("org.postgresql.Driver");
        return new HikariDataSource(config);
    }
}
