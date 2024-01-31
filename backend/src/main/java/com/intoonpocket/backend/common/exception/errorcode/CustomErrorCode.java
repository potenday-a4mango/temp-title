package com.intoonpocket.backend.common.exception.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CustomErrorCode implements ErrorCode {
    INVALID_REQUEST(HttpStatus.NOT_FOUND, "404", "존재하지 않는 작품 ID"),
    INVALID_REQUEST_TYPE(HttpStatus.NOT_FOUND , "404", "잘못된 요청 ID 타입"),
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
