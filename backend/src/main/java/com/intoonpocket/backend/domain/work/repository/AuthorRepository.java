package com.intoonpocket.backend.domain.work.repository;

import com.intoonpocket.backend.domain.work.entity.Author;
import com.intoonpocket.backend.domain.work.entity.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Author findByName(String authorName);
}
