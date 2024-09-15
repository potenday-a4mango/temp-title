package com.intoonpocket.backend.domain.work.repository;

import com.intoonpocket.backend.domain.work.entity.Author;
import com.intoonpocket.backend.domain.work.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    Subject findByType(String type);
}
