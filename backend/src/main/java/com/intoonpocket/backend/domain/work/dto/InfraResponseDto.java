package com.intoonpocket.backend.domain.work.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class InfraResponseDto {
    private int code;
    private String msg;
}
