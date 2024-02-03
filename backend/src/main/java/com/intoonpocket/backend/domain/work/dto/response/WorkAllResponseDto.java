package com.intoonpocket.backend.domain.work.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Schema(description = "작품 전체 조회 응답 DTO")
public class WorkAllResponseDto {
    @Schema(description = "작품 아이디", example = "1")
    private Long id;

    @Schema(description = "작품명", example = "테스트작품명")
    private String workName;

    @Schema(description = "작가명", example = "테스트작가명")
    private String authorName;

    @Schema(description = "작품 인스타그램 게시글 주소", example = "https://www.instagram.com/test-url")
    private String workUrl;

    @Schema(description = "작가 인스타그램 아이디", example = "test_writer")
    private String instargramId;

    @Schema(description = "작품 대표 이미지 경로", example = "https://kr.object.ncloudstoreage.com/test-object-url")
    private String imageUrl;

    @Schema(description = "작품 조회수", example = "10")
    private Long count;

    @Schema(description = "작품 주제", example = "['카페투어', '공감']")
    private List<String> workSubjectList;

    @Schema(description = "작품 카테고리", example = "['일상']")
    private List<String> workCategoryList;
}
