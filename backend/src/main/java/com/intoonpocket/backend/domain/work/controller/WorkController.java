package com.intoonpocket.backend.domain.work.controller;

import com.intoonpocket.backend.domain.work.dto.InfraResponseDto;
import lombok.Builder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class WorkController{
    @GetMapping
    public ResponseEntity<InfraResponseDto> infraTest() {
        InfraResponseDto response = InfraResponseDto.builder()
                .code(200)
                .msg("success")
                .build();
        return new ResponseEntity<InfraResponseDto>(response, HttpStatus.OK);
    }
}