package com.intoonpocket.backend.domain.work.service.impl;

import com.intoonpocket.backend.domain.work.dto.WorkAllResponseDto;
import com.intoonpocket.backend.domain.work.entity.*;
import com.intoonpocket.backend.domain.work.service.WorkService;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkServiceImpl implements WorkService {
    private final JPAQueryFactory queryFactory;
    private final QAuthor a = QAuthor.author;
    private final QCategory c = QCategory.category;
    private final QSubject s = QSubject.subject;
    private final QWork w = QWork.work;
    private final QHashtag h = QHashtag.hashtag;

    public WorkServiceImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    /*
        전체 작품 조회
     */
    @Override
    public Page<WorkAllResponseDto> findAllWork(Pageable pageable) {
        QueryResults<WorkAllResponseDto> workAllResponseDtos = getAllWork(pageable);
        addWorkHashtagByWorkId(workAllResponseDtos);
        return new PageImpl<>(workAllResponseDtos.getResults(), pageable, workAllResponseDtos.getTotal());
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
                        c.type.stringValue().as("category"),
                        w.imageUrl, w.count))
                .from(w).join(a).on(w.author.id.eq(a.id))
                .join(c).on(w.category.id.eq(c.id))
                .orderBy(w.count.desc()) // 조회수 내림차순 정렬
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
    }

    /*
        조회한 작품별 해시태그를 Response Dto에 set
     */
    private void addWorkHashtagByWorkId(QueryResults<WorkAllResponseDto> workAllResponseDtos) {
        List<WorkAllResponseDto> results = workAllResponseDtos.getResults();
        results.forEach(w -> w.setHashtagList(getWorkHashtag(w.getId())));
    }

    /*
        작품별 해시태그 조회
     */
    private List<String> getWorkHashtag(Long workId) {
        return queryFactory
                .select(s.type)
                .from(w).join(h).on(w.id.eq(h.work.id))
                .join(s).on(s.id.eq(h.subject.id))
                .where(w.id.eq(workId))
                .fetch();
    }
}
