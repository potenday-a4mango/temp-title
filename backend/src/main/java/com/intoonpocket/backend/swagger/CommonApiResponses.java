package com.intoonpocket.backend.swagger;

import com.intoonpocket.backend.common.exception.response.ExceptionResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkSearchResponseDto;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.ANNOTATION_TYPE, ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "잘못된 요청 변수명",
                content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))),
        @ApiResponse(responseCode = "404", description = "존재하지 않는 리소스",
                content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))),
        @ApiResponse(responseCode = "405", description = "지원하지 않는 HTTP 메서드 요청",
                content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))),
        @ApiResponse(responseCode = "500", description = "예기지 않은 오류 발생",
                content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))),
})
public @interface CommonApiResponses {
}
