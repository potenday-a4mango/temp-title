package com.intoonpocket.backend.domain.work.dto.response.info;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class WorkRegisterInfoDto {
    private List<AuthorDto> authorDtoList;
    private List<SubjectDto> subjectDtoList;
    private List<CategoryDto> categoryDtoList;
}
