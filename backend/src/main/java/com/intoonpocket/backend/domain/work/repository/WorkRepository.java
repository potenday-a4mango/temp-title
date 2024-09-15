package com.intoonpocket.backend.domain.work.repository;

import com.intoonpocket.backend.domain.work.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
}
