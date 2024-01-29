package com.intoonpocket.backend.domain.work.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "work")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "name")
    private String name;

    @NonNull
    @Column(name = "url")
    private String url;

    @Column(name = "count")
    @ColumnDefault("0")
    private Long count;

    @NonNull
    @Column(name = "image_url")
    private String imageUrl;

    @CurrentTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @CurrentTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private Author author;
}
