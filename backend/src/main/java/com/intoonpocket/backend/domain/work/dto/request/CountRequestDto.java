package com.intoonpocket.backend.domain.work.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class CountRequestDto {

    private Long workId;
}
