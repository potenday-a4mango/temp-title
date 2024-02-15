package com.intoonpocket.backend.domain.work.service.impl;

import com.intoonpocket.backend.common.exception.errorcode.CustomErrorCode;
import com.intoonpocket.backend.domain.work.dto.request.CountRequestDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkElement;
import com.intoonpocket.backend.domain.work.dto.response.WorkSearchDto;
import com.intoonpocket.backend.domain.work.dto.response.WorkSearchResponseDto;
import com.intoonpocket.backend.domain.work.dto.response.info.AuthorDto;
import com.intoonpocket.backend.domain.work.dto.response.info.CategoryDto;
import com.intoonpocket.backend.domain.work.dto.response.info.SubjectDto;
import com.intoonpocket.backend.domain.work.dto.response.info.WorkRegisterInfoDto;
import com.intoonpocket.backend.domain.work.exception.InvalidWorkIdException;
import com.intoonpocket.backend.domain.work.entity.*;
import com.intoonpocket.backend.domain.work.service.WorkService;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class WorkServiceImpl implements WorkService {
    private final JPAQueryFactory queryFactory;
    private final QAuthor a = QAuthor.author;
    private final QCategory c = QCategory.category;
    private final QSubject s = QSubject.subject;
    private final QWork w = QWork.work;
    private final QWorkSubject ws = QWorkSubject.workSubject;
    private final QWorkCategory wc = QWorkCategory.workCategory;

    public WorkServiceImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    /*
        전체 작품 조회
     */
    @Override
    @Transactional
    public Page<WorkAllResponseDto> findAllWork(Pageable pageable) {
        QueryResults<WorkAllResponseDto> workAllResponseDtos = getAllWork(pageable);
        List<WorkAllResponseDto> result = workAllResponseDtos.getResults();
        addWorkSubjectByWorkId(result);
        addWorkCategoryByWorkId(result);
        return new PageImpl<>(result, pageable, workAllResponseDtos.getTotal());
    }

    /*
         작품의 해시태그 리스트를 제외한 데이터 조회.
         작품 아이디, 작품명, 작가명, 작가 인스타그램 아이디, 카테고리, 이미지 url, 조회수
     */
    private QueryResults<WorkAllResponseDto> getAllWork(Pageable pageable) {
        return queryFactory
                .select(Projections.fields(
                        WorkAllResponseDto.class,
                        w.id, w.name.stringValue().as("workName"),
                        w.url.stringValue().as("workUrl"), w.imageUrl, w.count,
                        a.name.stringValue().as("authorName"),
                        a.instargramId.stringValue().as("instargramId")))
                .from(w).join(a).on(w.author.id.eq(a.id))
                .orderBy(w.count.desc(), w.name.asc()) // 조회수 내림차순, 사전순 오름차순 정렬
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
    }

    /*
        조회한 작품별 주제(해시태그)를 Response Dto에 set
     */
    private void addWorkSubjectByWorkId(List<WorkAllResponseDto> workAllResponseDtos) {
        // 전체 작품의 주제 get
        List<WorkElement> workSubjectList = getWorkSubjectList();
        // 각 작품에 주제 set
        setWorkElement(workAllResponseDtos, workSubjectList, "subject");
    }

    /*
        조회한 작품별 카테고리를 Response DTO에 set
    */
    private void addWorkCategoryByWorkId(List<WorkAllResponseDto> workAllResponseDtos) {
        // 전체 작품의 카테고리 get
        List<WorkElement> workCategoryList = getWorkCategoryList();
        // 각 작품에 카테고리 set
        setWorkElement(workAllResponseDtos, workCategoryList, "category");
    }

    /*
        전체 작품의 주제(해시태그) 조회
     */
    private List<WorkElement> getWorkSubjectList() {
        return queryFactory
                .select(Projections.fields(
                        WorkElement.class, w.id, s.type))
                .from(w).join(ws).on(w.id.eq(ws.work.id))
                .join(s).on(s.id.eq(ws.subject.id))
                .fetch();
    }

    /*
        전체 작품의 카테고리 조회
     */
    private List<WorkElement> getWorkCategoryList() {
        return queryFactory
                .select(Projections.fields(
                        WorkElement.class, w.id, c.type))
                .from(w).join(wc).on(w.id.eq(wc.work.id))
                .join(c).on(c.id.eq(wc.category.id))
                .fetch();
    }

    /*
        작품별 주제 또는 카테고리 set
     */
    private void setWorkElement(List<WorkAllResponseDto> workAllResponseDtos, List<WorkElement> workElementList, String elementType) {
        workAllResponseDtos.forEach(workResponse -> {
            List<String> list = new ArrayList<>();

            Iterator<WorkElement> iterator = workElementList.iterator();
            while (iterator.hasNext()) {
                WorkElement workElement = iterator.next();

                if (workElement.getId().equals(workResponse.getId())) {
                    list.add(workElement.getType());
                    iterator.remove();
                }
            }
            if (elementType.equals("subject")) {
                workResponse.setWorkSubjectList(list);
            } else if (elementType.equals("category")) {
                workResponse.setWorkCategoryList(list);
            }
        });
    }

    /*
        작품 검색 : 작품명, 해시태그, 작가명, 작가 계정
     */
    @Override
    @Transactional
    public Page<WorkSearchResponseDto> searchWork(Pageable pageable, String keyword) {
        // keyword를 포함하는 카드 조회
        QueryResults<WorkSearchDto> workList = getWorkContainsKeyword(pageable, keyword);

        List<WorkSearchResponseDto> workSearchResponseDtoList = new ArrayList<>();
        for (WorkSearchDto work : workList.getResults()) {
            // WorkSearchResponseDTO 객체 생성 및 필드 설정
            WorkSearchResponseDto workSearchResponseDto = WorkSearchResponseDto.builder()
                    .id(work.getId())
                    .workName(work.getWorkName())
                    .url(work.getUrl())
                    .imageUrl(work.getImageUrl())
                    .count(work.getCount())
                    .authorName(work.getAuthorName())
                    .authorInstargramId(work.getAuthorInstargramId())
                    .searchTypeList(getSearchedTypeList(work)) // 카드가 검색된 조건 리스트
                    .subjectList(getSeachedSubjectList(work))  // 작업 검색 결과에 포함될 주제 리스트
                    .build();

            workSearchResponseDtoList.add(workSearchResponseDto);
        }
        return new PageImpl<>(workSearchResponseDtoList, pageable, workList.getTotal());
    }

    /*
        작품명, 해시태그, 작가명, 작가 계정 중 keyword를 포함하는 카드 조회
     */
    private QueryResults<WorkSearchDto> getWorkContainsKeyword(Pageable pageable, String keyword) {
        return queryFactory
                .select(Projections.fields(
                        WorkSearchDto.class,
                        w.id, w.name.stringValue().as("workName"), w.url, w.imageUrl, w.count,
                        a.name.stringValue().as("authorName"),
                        a.instargramId.stringValue().as("authorInstargramId"),
                        new CaseBuilder()
                                .when(w.id.in(
                                        JPAExpressions.select(ws.work.id)
                                                .from(ws)
                                                .innerJoin(s).on(ws.subject.id.eq(s.id))
                                                .where(s.type.containsIgnoreCase(keyword))
                                )).then(true).otherwise(false).as("searchedByHashtag"),
                        new CaseBuilder().when(w.name.containsIgnoreCase(keyword)).then(true).otherwise(false).as("searchedByWorkName"),
                        new CaseBuilder().when(a.name.containsIgnoreCase(keyword)).then(true).otherwise(false).as("searchedByAuthorName"),
                        new CaseBuilder().when(a.instargramId.containsIgnoreCase(keyword)).then(true).otherwise(false).as("searchedByAuthorInstargramId")
                ))
                .from(w)
                .leftJoin(a).on(w.author.id.eq(a.id))
                .where(w.name.containsIgnoreCase(keyword)
                        .or(w.id.in(
                                JPAExpressions.select(ws.work.id)
                                        .from(ws)
                                        .innerJoin(s).on(ws.subject.id.eq(s.id))
                                        .where(s.type.containsIgnoreCase(keyword))
                        ))
                        .or(a.instargramId.containsIgnoreCase(keyword))
                        .or(a.name.containsIgnoreCase(keyword))
                        .or(w.id.in(
                                JPAExpressions.select(wc.work.id)
                                        .from(wc)
                                        .innerJoin(c).on(wc.category.id.eq(c.id))
                                        .where(c.type.containsIgnoreCase(keyword))
                        ))
                )
                .orderBy(w.count.desc(), w.name.asc(), a.name.asc()) // 조회수 내림차순, 사전순 오름차순, 작가명 오름차순 정렬
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
    }

    /*
        작품명, 해시태그, 작가명, 작가 계정 중 어느 속성으로 검색되었는지 체크
     */
    private List<Integer> getSearchedTypeList(WorkSearchDto work) {
        // 검색된 조건 확인
        List<Integer> searchTypeList  = new ArrayList<>();
        if(work.isSearchedByWorkName()) searchTypeList.add(0);
        if(work.isSearchedByHashtag()) searchTypeList.add(1);
        if(work.isSearchedByAuthorName()) searchTypeList.add(2);
        if(work.isSearchedByAuthorInstargramId()) searchTypeList.add(3);
        return searchTypeList;
    }

    private List<String> getSeachedSubjectList(WorkSearchDto work) {
        return queryFactory
                .select(s.type)
                .from(w).join(ws).on(w.id.eq(ws.work.id))
                .join(s).on(s.id.eq(ws.subject.id))
                .where(w.id.eq(work.getId()))
                .fetch();
    }

    /*
        작품의 조회수 증가
     */
    @Override
    @Transactional
    public void updateWorkCount(CountRequestDto countRequestDto) throws InvalidWorkIdException {
        long countedWork = queryFactory
                .update(w)
                .where(w.id.eq(countRequestDto.getWorkId()))
                .set(w.count, w.count.add(1))
                .execute();

        // 프론트로부터 전달 받은 id로 조회된 작품 없는 경우 예외 발생
        if(countedWork == 0)
            throw new InvalidWorkIdException();
    }

    @Override
    @Transactional
    public WorkRegisterInfoDto findRegisterInfoList() {
        return new WorkRegisterInfoDto(findAuthorList(), findSubjectList(), findCategoryList());
    }

    private List<AuthorDto> findAuthorList() {
        return queryFactory.select(Projections.fields(
                AuthorDto.class, a.id, a.name))
                .from(a)
                .fetch();
    }

    private List<SubjectDto> findSubjectList() {
        return queryFactory.select(Projections.fields(
                        SubjectDto.class, s.id, s.type))
                .from(s)
                .fetch();
    }

    private List<CategoryDto> findCategoryList() {
        return queryFactory.select(Projections.fields(
                        CategoryDto.class, c.id, c.type))
                .from(c)
                .fetch();
    }
}
