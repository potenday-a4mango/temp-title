package com.intoonpocket.backend.domain.work.controller;

import com.intoonpocket.backend.common.exception.response.ExceptionResponseDto;
import com.intoonpocket.backend.domain.work.dto.request.WorkRegisterRequestDto;
import com.intoonpocket.backend.domain.work.dto.response.info.WorkRegisterInfoDto;
import com.intoonpocket.backend.domain.work.exception.InvalidWorkIdException;
import com.intoonpocket.backend.domain.work.dto.request.CountRequestDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkSearchResponseDto;
import com.intoonpocket.backend.domain.work.service.WorkService;
import com.intoonpocket.backend.swagger.CommonApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class WorkController{
    private final WorkService workService;

    public WorkController(WorkService workService) {
        this.workService = workService;
    }

    @Operation(summary = "작품 전체 조회", description = "전제 작품의 모든 정보를 조회", tags = {"Work Controller"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                content = @Content(schema = @Schema(implementation = WorkAllResponseDto.class))),
    })
    @CommonApiResponses
    @GetMapping
    public Page<WorkAllResponseDto> findAllWork(
            @Parameter(name = "page", description = "현제 페이지 번호")
            @RequestParam(name = "page", defaultValue = "0") int page,
            @Parameter(name = "size", description = "한 페이지에 표시될 데이터 수")
            @RequestParam(name = "size", defaultValue = "20") int size) {
            Pageable pageable = PageRequest.of(page, size);
        return workService.findAllWork(pageable);
    }

    @Operation(summary = "작품 검색", description = "작품의 작품명, 해시태그, 작가명, 작가 계정, 카테고리에 검색어와 일치하는 문자가 있는지 조회", tags = {"Work Controller"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = WorkSearchResponseDto.class)))
    })
    @CommonApiResponses
    @GetMapping("/search/{keyword}")
    public Page<WorkSearchResponseDto> searchWork(
            @Parameter(description = "현제 페이지 번호") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "한 페이지에 표시될 데이터 수") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "검색어", in = ParameterIn.PATH, example = "직장") @PathVariable String keyword) {
        Pageable pageable = PageRequest.of(page, size);
        return workService.searchWork(pageable, keyword);
    }

    @Operation(summary = "작품 조회수 1만큼 증가", description = "작품의 count를 1만큼 증가", tags = {"Work Controller"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "404", description = "존재하지 않는 작품 ID",
                    content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class))),
            @ApiResponse(responseCode = "404", description = "잘못된 요청 ID 타입",
                    content = @Content(schema = @Schema(implementation = ExceptionResponseDto.class)))
    })
    @CommonApiResponses
    @PostMapping("/count")
    public ResponseEntity updateWorkCount(
            @Parameter(description = "조회수를 증가시킬 작품의 DB 테이블 아이디")
            @Valid @RequestBody CountRequestDto countRequestDto) throws InvalidWorkIdException {
        workService.updateWorkCount(countRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "작품 등록 전 정보 조회", description = "작품 등록 시 선택할 작가명, 주제, 카테고리 조회", tags = {"Work Controller"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = WorkRegisterInfoDto.class)))
    })
    @CommonApiResponses
    @GetMapping("/register")
    public WorkRegisterInfoDto findRegisterInfoList() {
        return workService.findRegisterInfoList();
    }

    @Operation(summary = "작품 등록", description = "작품 등록", tags = {"Work Controller"})
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = WorkRegisterInfoDto.class)))
    })
    @CommonApiResponses
    @PostMapping("/register")
    public ResponseEntity workRegister(
            @Parameter(description = "등록할 작품 정보")
            @Valid @ModelAttribute WorkRegisterRequestDto workRegisterRequestDto) {
        workService.workRegister(workRegisterRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }
}