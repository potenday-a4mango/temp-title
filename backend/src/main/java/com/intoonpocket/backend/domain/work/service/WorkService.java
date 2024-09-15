package com.intoonpocket.backend.domain.work.service;

import com.intoonpocket.backend.domain.work.dto.request.WorkRegisterRequestDto;
import com.intoonpocket.backend.domain.work.dto.response.info.WorkRegisterInfoDto;
import com.intoonpocket.backend.domain.work.exception.InvalidWorkIdException;
import com.intoonpocket.backend.domain.work.dto.request.CountRequestDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkSearchResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface WorkService {
    Page<WorkAllResponseDto> findAllWork(Pageable pageable);
    Page<WorkSearchResponseDto> searchWork(Pageable pageable, String keyword);

    void updateWorkCount(CountRequestDto countRequestDto) throws InvalidWorkIdException;
    WorkRegisterInfoDto findRegisterInfoList();

    void workRegister(WorkRegisterRequestDto workRegisterRequestDto);
}
