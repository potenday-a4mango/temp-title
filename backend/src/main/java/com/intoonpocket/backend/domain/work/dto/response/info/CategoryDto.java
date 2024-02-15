package com.intoonpocket.backend.domain.work.dto.response.info;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Schema(description = "카테고리 DTO")
public class CategoryDto {
    @Schema(description = "카테고리 아이디", example = "1")
    private Long id;

    @Schema(description = "카테고리 타입", example = "일상")
    private String type;
}
