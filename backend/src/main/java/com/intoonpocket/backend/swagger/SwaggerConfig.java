package com.intoonpocket.backend.swagger;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@OpenAPIDefinition(
        info = @Info(title = "Intoon Pocket",
        description = "IntoonPocket API 명세",
        version = "v1"))
//        servers = {@Server(url = "https://server.intoonpocket.site", description = "백엔드 서버 도메인")})
@Configuration
@RequiredArgsConstructor
public class SwaggerConfig {
    @Bean
    public GroupedOpenApi intoonpocketOpenApi() {
        String[] paths = {"/api/v1/**"};

        return GroupedOpenApi.builder()
                .group("IntoonPocket API v1")
                .packagesToScan("com.intoonpocket.backend")
                .pathsToMatch(paths)
                .build();
    }
}
