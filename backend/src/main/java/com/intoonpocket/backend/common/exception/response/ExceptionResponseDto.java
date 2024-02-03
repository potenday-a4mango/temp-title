package com.intoonpocket.backend.common.exception.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Builder
@Getter
@Schema(description = "예외 응답 DTO")
public class ExceptionResponseDto {
    @Schema(description = "Http 상태")
    private final HttpStatus httpStatus;

    @Schema(description = "Http 상태 코드")
    private final String code;

    @Schema(description = "예외 메시지")
    private String message;
}
