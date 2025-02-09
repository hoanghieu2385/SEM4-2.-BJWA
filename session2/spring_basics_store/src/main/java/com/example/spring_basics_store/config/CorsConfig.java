package com.example.spring_basics_store.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Áp dụng cho tất cả API
                        .allowedOrigins("http://example.com", "http://localhost:3000") // Cho phép domain cụ thể
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Các phương thức được phép
                        .allowedHeaders("*") // Cho phép tất cả headers
                        .allowCredentials(true); // Cho phép gửi cookie
            }
        };
    }
}
