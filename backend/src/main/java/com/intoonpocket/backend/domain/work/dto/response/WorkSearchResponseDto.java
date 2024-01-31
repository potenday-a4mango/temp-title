package com.intoonpocket.backend.domain.work.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class WorkSearchResponseDto {
    private Long id;
    private String workName;
    private String url;
    private String imageUrl;
    private Long count;
    private String authorName;
    private String authorInstargramId;

    private List<Integer> searchTypeList;
    private List<String> subjectList;
}
