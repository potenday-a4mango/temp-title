package com.intoonpocket.backend.domain.work.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
@Schema(description = "작품 등록 요청 DTO")
public class WorkRegisterRequestDto {
    private String authorName;
    private String authorInstargramId;
    private String workName;
    private List<String> workSubjectList;
    private MultipartFile workImage;
    private Long workCategory;
    private String workUrl;
}
