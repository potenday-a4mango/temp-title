package com.intoonpocket.backend.domain.work.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class WorkSearchDto {
    private Long id;
    private String workName;
    private String url;
    private String imageUrl;
    private Long count;
    private String authorName;
    private String authorInstargramId;

    private boolean searchedByWorkName;
    private boolean searchedByHashtag;
    private boolean searchedByAuthorName;
    private boolean searchedByAuthorInstargramId;
}
