package com.intoonpocket.backend.domain.work.controller;

import com.intoonpocket.backend.domain.work.dto.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.service.WorkService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/")
public class WorkController{
    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }
    @GetMapping
    public Page<WorkAllResponseDto> findAllWork(Pageable pageable) {
        return workService.findAllWork(pageable);
    }
}