package com.intoonpocket.backend.domain.work.dto.response.info;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Schema(description = "작가 DTO")
public class AuthorDto {
    @Schema(description = "작가 아이디", example = "1")
    private Long id;
    
    @Schema(description = "작가명", example = "김작가")
    private String name;
}
