package com.intoonpocket.backend.domain.work.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode
public class WorkAllResponseDto {
    private Long id;
    private String workName;
    private String authorName;
    private String workUrl;
    private String instargramId;
    private String imageUrl;
    private Long count;
    private List<String> workSubjectList;
    private List<String> workCategoryList;

}
