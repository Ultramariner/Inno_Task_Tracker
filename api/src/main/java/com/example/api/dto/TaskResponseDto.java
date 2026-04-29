package com.example.api.dto;

import com.example.api.entity.TaskStatus;

public record TaskResponseDto(
        Long id,
        String title,
        String description,
        TaskStatus status,
        Integer position
) {}
