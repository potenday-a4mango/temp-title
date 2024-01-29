package com.intoonpocket.backend.domain.work.service.impl;

import com.intoonpocket.backend.domain.work.dto.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.dto.WorkElement;
import com.intoonpocket.backend.domain.work.entity.*;
import com.intoonpocket.backend.domain.work.service.WorkService;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
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
                        a.name.stringValue().as("authorName"),
                        a.instargramId.stringValue().as("instargramId"),
                        w.imageUrl, w.count))
                .from(w).join(a).on(w.author.id.eq(a.id))
                .orderBy(w.count.desc()) // 조회수 내림차순 정렬
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
}
