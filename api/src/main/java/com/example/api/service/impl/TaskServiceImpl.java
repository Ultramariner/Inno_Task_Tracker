package com.example.api.service.impl;

import com.example.api.dto.TaskRequestDto;
import com.example.api.entity.Task;
import com.example.api.entity.User;
import com.example.api.mapper.TaskMapper;
import com.example.api.repository.TaskRepository;
import com.example.api.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public List<Task> getTasksForUser(User user) {
        return taskRepository.findAllByUserOrderByPosition(user);
    }

    @Override
    public Task getTaskForUser(Long taskId, User user) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found: " + taskId));

        if (!task.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Access denied");
        }

        return task;
    }

    @Override
    public Task createTask(TaskRequestDto dto, User user) {
        Task task = Task.builder()
                .title(dto.title())
                .description(dto.description())
                .status(dto.status())
                .position(dto.position())
                .user(user)
                .build();

        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long taskId, TaskRequestDto dto, User user) {
        Task task = getTaskForUser(taskId, user);
        taskMapper.updateTask(task, dto);
        return taskRepository.save(task);
    }

    //todo mark deleted
    @Override
    public void deleteTask(Long taskId, User user) {
        Task task = getTaskForUser(taskId, user);
        taskRepository.delete(task);
    }
}
