package com.example.api.mapper;

import com.example.api.dto.TaskRequestDto;
import com.example.api.dto.TaskResponseDto;
import com.example.api.entity.Task;
import org.springframework.stereotype.Component;

//todo Mapstruct
@Component
public class TaskMapper {

    public TaskResponseDto toDto(Task task) {
        return new TaskResponseDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPosition()
        );
    }

    public void updateTask(Task task, TaskRequestDto dto) {
        task.setTitle(dto.title());
        task.setDescription(dto.description());
        task.setStatus(dto.status());
        task.setPosition(dto.position());
    }
}
