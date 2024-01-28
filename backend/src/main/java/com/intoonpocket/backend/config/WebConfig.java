package com.intoonpocket.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:8080",
                        "https://localhost:8080",
                        "http://localhost:3000",
                        "https://web.postman.co/",
                        "http://101.101.208.125:80/",
                        "https://101.101.208.125:80/")
                .allowedMethods("GET", "OPTIONS")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
