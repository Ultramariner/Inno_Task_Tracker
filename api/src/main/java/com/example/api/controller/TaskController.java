package com.example.api.controller;

import com.example.api.dto.TaskRequestDto;
import com.example.api.dto.TaskResponseDto;
import com.example.api.entity.Task;
import com.example.api.entity.User;
import com.example.api.mapper.TaskMapper;
import com.example.api.service.TaskService;
import com.example.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final TaskMapper taskMapper;

    // todo keycloak
    private User getUser(Long userId) {
        return userService.getById(userId);
    }

    @GetMapping
    public List<TaskResponseDto> getTasks(@RequestParam Long userId) {
        User user = getUser(userId);
        return taskService.getTasksForUser(user)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskResponseDto createTask(@RequestParam Long userId,
                                      @RequestBody TaskRequestDto dto) {
        User user = getUser(userId);
        Task task = taskService.createTask(dto, user);
        return taskMapper.toDto(task);
    }

    @PutMapping("/{taskId}")
    public TaskResponseDto updateTask(@RequestParam Long userId,
                                      @PathVariable Long taskId,
                                      @RequestBody TaskRequestDto dto) {
        User user = getUser(userId);
        Task task = taskService.updateTask(taskId, dto, user);
        return taskMapper.toDto(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@RequestParam Long userId,
                           @PathVariable Long taskId) {
        User user = getUser(userId);
        taskService.deleteTask(taskId, user);
    }
}
