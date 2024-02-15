package com.intoonpocket.backend.domain.work.dto.response.info;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Schema(description = "작품 등록 전 정보 응답 DTO")
public class WorkRegisterInfoDto {
    @Schema(description = "등록된 작가 리스트")
    private List<AuthorDto> authorDtoList;

    @Schema(description = "등록된 주제(해시태그) 리스트")
    private List<SubjectDto> subjectDtoList;

    @Schema(description = "등록된 카테고리 리스트")
    private List<CategoryDto> categoryDtoList;
}
