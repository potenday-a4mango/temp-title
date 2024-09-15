package com.intoonpocket.backend.domain.work.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.intoonpocket.backend.domain.work.dto.request.CountRequestDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkSearchResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.info.AuthorDto;
import com.intoonpocket.backend.domain.work.dto.response.info.CategoryDto;
import com.intoonpocket.backend.domain.work.dto.response.info.SubjectDto;
import com.intoonpocket.backend.domain.work.dto.response.info.WorkRegisterInfoDto;
import com.intoonpocket.backend.domain.work.service.WorkService;
import com.querydsl.core.QueryResults;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(WorkController.class)
@AutoConfigureWebMvc
class WorkControllerTest {
    @MockBean
    WorkService workService;
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("전체 작품 조회")
    void findAllWork() throws Exception {
        PageRequest pageable = PageRequest.of(0, 5);

        List<String> workSubjectList = List.of("카페투어", "공감");
        List<String> workCategoryList = List.of("일상");

        WorkAllResponseDto workAllResponseDto = new WorkAllResponseDto(
                1L, "테스트작품", "테스트작가",
                "https://www.instagram.com/test-url", "test_writer",
                "https://kr.object.ncloudstoreage.com/test-object-url", 10L,
                workSubjectList, workCategoryList
        );
        QueryResults<WorkAllResponseDto> results = new QueryResults<>(List.of(workAllResponseDto), 5L, 0L, 10L);

        given(workService.findAllWork(pageable)).willReturn(new PageImpl<>(results.getResults(), pageable, results.getTotal()));

        mockMvc.perform(get("/api/v1")
                        .param("page", String.valueOf(pageable.getOffset()))
                        .param("size", String.valueOf(pageable.getPageSize())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(workAllResponseDto.getId()))
                .andExpect(jsonPath("$.content[0].workName").value(workAllResponseDto.getWorkName()))
                .andExpect(jsonPath("$.content[0].authorName").value(workAllResponseDto.getAuthorName()))
                .andExpect(jsonPath("$.content[0].workUrl").value(workAllResponseDto.getWorkUrl()))
                .andExpect(jsonPath("$.content[0].instargramId").value(workAllResponseDto.getInstargramId()))
                .andExpect(jsonPath("$.content[0].imageUrl").value(workAllResponseDto.getImageUrl()))
                .andExpect(jsonPath("$.content[0].count").value(workAllResponseDto.getCount()))
                .andExpect(jsonPath("$.content[0].workSubjectList[0]").value(workAllResponseDto.getWorkSubjectList().get(0)))
                .andExpect(jsonPath("$.content[0].workCategoryList[0]").value(workAllResponseDto.getWorkCategoryList().get(0)))
                .andDo(print())
                .andReturn();

        // mock 작업이 수행되었는지 검증
        verify(workService).findAllWork(pageable);
    }

    @Test
    @DisplayName("작품 검색")
    void searchWork() throws Exception {
        String keyword = "사랑";
        Pageable pageable = PageRequest.of(0, 5);

        WorkSearchResponseDto workSearchResponseDto = WorkSearchResponseDto.builder()
                .id(1L)
                .workName("테스트작품")
                .url("https://www.instagram.com/test-url")
                .imageUrl("https://kr.object.ncloudstoreage.com/test-object-url")
                .count(10L)
                .authorName("테스트작가")
                .authorInstargramId("test_writer")
                .searchTypeList(List.of(3))
                .subjectList(List.of("개발", "공부", "취업"))
                .build();
        QueryResults<WorkSearchResponseDto> results = new QueryResults<>(List.of(workSearchResponseDto), 5L, 0L, 10L);

        given(workService.searchWork(pageable, keyword)).willReturn(new PageImpl<>(results.getResults(), pageable, results.getTotal()));

        mockMvc.perform(RestDocumentationRequestBuilders.get("/api/v1/search/{keyword}", keyword)
                        .param("page", String.valueOf(pageable.getOffset()))
                        .param("size", String.valueOf(pageable.getPageSize())))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(workSearchResponseDto.getId()))
                .andExpect(jsonPath("$.content[0].workName").value(workSearchResponseDto.getWorkName()))
                .andExpect(jsonPath("$.content[0].url").value(workSearchResponseDto.getUrl()))
                .andExpect(jsonPath("$.content[0].imageUrl").value(workSearchResponseDto.getImageUrl()))
                .andExpect(jsonPath("$.content[0].count").value(workSearchResponseDto.getCount()))
                .andExpect(jsonPath("$.content[0].authorName").value(workSearchResponseDto.getAuthorName()))
                .andExpect(jsonPath("$.content[0].authorInstargramId").value(workSearchResponseDto.getAuthorInstargramId()))
                .andExpect(jsonPath("$.content[0].searchTypeList[0]").value(workSearchResponseDto.getSearchTypeList().get(0)))
                .andExpect(jsonPath("$.content[0].subjectList[0]").value(workSearchResponseDto.getSubjectList().get(0)))
                .andDo(print())
                .andReturn();

        verify(workService).searchWork(pageable, keyword);
    }

    @Test
    @DisplayName("작품 조회수 1 증가")
    void updateWorkCount() throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        CountRequestDto countRequestDto = new CountRequestDto(1L);
        doNothing().when(workService).updateWorkCount(countRequestDto);

        mockMvc.perform(post("/api/v1/count")
                        .content(objectMapper.writeValueAsString(countRequestDto))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();

        verify(workService).updateWorkCount(refEq(countRequestDto));
    }

    @Test
    @DisplayName("작품 등록시 필요한 정보 전달")
    void findRegisterInfoList() throws Exception {
        List<AuthorDto> authorDtoList = List.of(new AuthorDto(1L, "김작가"));
        List<SubjectDto> subjectDtoList = List.of(new SubjectDto(1L, "공부"));
        List<CategoryDto> categoryDtoList = List.of(new CategoryDto(1L, "일상"));
        WorkRegisterInfoDto workRegisterInfoDto = new WorkRegisterInfoDto(authorDtoList, subjectDtoList, categoryDtoList);

        given(workService.findRegisterInfoList()).willReturn(workRegisterInfoDto);

        mockMvc.perform(get("/api/v1/register"))
                .andDo(print())
                .andExpect(jsonPath("$.authorDtoList[0].id").value(workRegisterInfoDto.getAuthorDtoList().get(0).getId()))
                .andExpect(jsonPath("$.authorDtoList[0].name").value(workRegisterInfoDto.getAuthorDtoList().get(0).getName()))
                .andExpect(jsonPath("$.subjectDtoList[0].id").value(workRegisterInfoDto.getSubjectDtoList().get(0).getId()))
                .andExpect(jsonPath("$.subjectDtoList[0].type").value(workRegisterInfoDto.getSubjectDtoList().get(0).getType()))
                .andExpect(jsonPath("$.categoryDtoList[0].id").value(workRegisterInfoDto.getCategoryDtoList().get(0).getId()))
                .andExpect(jsonPath("$.categoryDtoList[0].type").value(workRegisterInfoDto.getCategoryDtoList().get(0).getType()))
                .andReturn();

        verify(workService).findRegisterInfoList();

    }
}