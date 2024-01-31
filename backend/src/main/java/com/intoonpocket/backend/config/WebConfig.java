package com.intoonpocket.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@PropertySource("classpath:customProp.properties")
public class WebConfig implements WebMvcConfigurer {
    @Value("${custom-allowed-origins.list}")
    private String[] list;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(list)
                .allowedMethods("GET", "OPTIONS", "POST")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
