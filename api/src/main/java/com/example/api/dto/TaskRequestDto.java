package com.example.api.dto;

import com.example.api.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TaskRequestDto(
        @NotBlank String title,
        String description,
        @NotNull TaskStatus status,
        @NotNull Integer position
) {}
