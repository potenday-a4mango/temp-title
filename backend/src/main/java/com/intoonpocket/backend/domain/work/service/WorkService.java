package com.intoonpocket.backend.domain.work.service;

import com.intoonpocket.backend.domain.work.dto.CountRequestDto;
import com.intoonpocket.backend.domain.work.dto.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.WorkSearchResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface WorkService {
    Page<WorkAllResponseDto> findAllWork(Pageable pageable);
    Page<WorkSearchResponseDto> searchWork(Pageable pageable, String keyword);

    void updateWorkCount(CountRequestDto countRequestDto);
}
