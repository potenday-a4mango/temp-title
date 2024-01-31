package com.intoonpocket.backend.common.exception.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Builder
@Getter
public class ExceptionResponseDto {
    private final HttpStatus httpStatus;
    private final String code;
    private String message;
}
