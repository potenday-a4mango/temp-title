package com.intoonpocket.backend.domain.work.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Schema(description = "작품 조회수 증가 요청 DTO")
public class CountRequestDto {
    @Schema(description = "작품 아이디", example = "1")
    private Long workId;
}
