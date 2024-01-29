package com.intoonpocket.backend.domain.work.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "work_subject")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "work_id")
    private Work work;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subject_id")
    private Subject subject;
}
