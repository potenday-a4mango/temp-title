package com.intoonpocket.backend.domain.work.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "author")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "instargram_id")
    private String instargramId;

    @NonNull
    @Column(name = "name")
    private String name;

    @CurrentTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CurrentTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
