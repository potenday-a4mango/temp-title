package com.intoonpocket.backend.common.exception.handler;

import com.intoonpocket.backend.common.exception.response.ExceptionResponseDto;
import com.intoonpocket.backend.common.exception.errorcode.CommonErrorCode;
import com.intoonpocket.backend.common.exception.errorcode.CustomErrorCode;
import com.intoonpocket.backend.common.exception.errorcode.ErrorCode;
import com.intoonpocket.backend.domain.work.exception.InvalidWorkIdException;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class CustomExceptionHandler {

    private ErrorCode e;

    private ExceptionResponseDto createExceptionEntity(ErrorCode e) {
        return ExceptionResponseDto.builder()
                .httpStatus(e.getHttpStatus())
                .code(e.getCode())
                .message(e.getMessage())
                .build();
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<ExceptionResponseDto> illegalArgHandler() {
        e = CommonErrorCode.ILLEGAL_ARG;
        return new ResponseEntity<>(createExceptionEntity(e), e.getHttpStatus());
    }

    @ExceptionHandler(value = NoHandlerFoundException.class)
    public ResponseEntity<ExceptionResponseDto> notFoundHandler() {
        e = CommonErrorCode.NO_HANDLER_FOUND;
        return new ResponseEntity<>(createExceptionEntity(e), e.getHttpStatus());
    }

    @ExceptionHandler(value = InvalidWorkIdException.class)
    public ResponseEntity<ExceptionResponseDto> invalidRequestHandler() {
        e = CustomErrorCode.INVALID_REQUEST;
        return new ResponseEntity<>(createExceptionEntity(e), e.getHttpStatus());
    }

    @ExceptionHandler(value = HttpMessageNotReadableException.class)
    public ResponseEntity<ExceptionResponseDto> invalidRequestTypeHandler() {
        e = CustomErrorCode.INVALID_REQUEST_TYPE;
        return new ResponseEntity<>(createExceptionEntity(e), e.getHttpStatus());
    }

    @ExceptionHandler(value = HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ExceptionResponseDto> unsupportedHttpMethodHandler() {
        e = CommonErrorCode.UNSUPPORTED_HTTP_METHOD;
        return new ResponseEntity<>(createExceptionEntity(e), e.getHttpStatus());
    }

    @ExceptionHandler(value = Exception.class)
    public ResponseEntity<ExceptionResponseDto> internalServerErrorHandler() {
        e = CommonErrorCode.INTERNAL_SERVER_ERROR;
        return new ResponseEntity<>(createExceptionEntity(e), e.getHttpStatus());
    }
}
