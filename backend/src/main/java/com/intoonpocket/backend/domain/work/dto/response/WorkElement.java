package com.intoonpocket.backend.domain.work.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class WorkElement {
    private Long id; // work id
    private String type; // subject or category type
}
