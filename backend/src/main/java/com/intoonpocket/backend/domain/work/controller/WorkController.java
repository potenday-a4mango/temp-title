package com.intoonpocket.backend.domain.work.controller;

import com.intoonpocket.backend.config.WebConfig;
import com.intoonpocket.backend.domain.work.dto.CountRequestDto;
import com.intoonpocket.backend.domain.work.dto.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.WorkSearchResponseDto;
import com.intoonpocket.backend.domain.work.service.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/search/{keyword}")
    public Page<WorkSearchResponseDto> searchWork(Pageable pageable, @PathVariable String keyword) {
        return workService.searchWork(pageable, keyword);
    }

    @PostMapping("/count")
    public ResponseEntity updeateWorkCount(@RequestBody CountRequestDto countRequestDto) {
        workService.updateWorkCount(countRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }
}