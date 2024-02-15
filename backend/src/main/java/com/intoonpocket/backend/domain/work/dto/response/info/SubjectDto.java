package com.intoonpocket.backend.domain.work.dto.response.info;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Schema(description = "주제(해시태그) DTO")
public class SubjectDto {
    @Schema(description = "주제 아이디", example = "1")
    private Long id;

    @Schema(description = "주제 타입", example = "공부")
    private String type;
}
