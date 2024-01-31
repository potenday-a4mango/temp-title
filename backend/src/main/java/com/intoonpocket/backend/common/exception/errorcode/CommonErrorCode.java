package com.intoonpocket.backend.common.exception.errorcode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum CommonErrorCode implements ErrorCode{
    ILLEGAL_ARG(HttpStatus.BAD_REQUEST, "400", "잘못된 요청 변수명"),
    NO_HANDLER_FOUND(HttpStatus.NOT_FOUND, "404", "존재하지 않는 리소스"),
    UNSUPPORTED_HTTP_METHOD(HttpStatus.METHOD_NOT_ALLOWED, "405", "지원하지 않는 HTTP 메서드 요청"),  // Method : GET, PUT...
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "500", "예기지 않은 오류 발생")
    ;

    private final HttpStatus httpStatus;
    private final String code;
    private final String message;
}
