package com.example.api.controller;

import com.example.api.dto.TaskRequestDto;
import com.example.api.dto.TaskResponseDto;
import com.example.api.entity.Task;
import com.example.api.entity.User;
import com.example.api.mapper.TaskMapper;
import com.example.api.service.TaskService;
import com.example.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;
    private final UserService userService;
    private final TaskMapper taskMapper;

    private User getUser(Long userId) {
        return userService.getById(userId);
    }

    @GetMapping
    public List<TaskResponseDto> getTasks(@AuthenticationPrincipal Jwt jwt) {

        User user = resolveUser(jwt);

        return taskService.getTasksForUser(user)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping
    public TaskResponseDto createTask(@AuthenticationPrincipal Jwt jwt,
                                      @RequestBody TaskRequestDto dto) {
        User user = resolveUser(jwt);
        Task task = taskService.createTask(dto, user);
        return taskMapper.toDto(task);
    }

    @PutMapping("/{taskId}")
    public TaskResponseDto updateTask(@AuthenticationPrincipal Jwt jwt,
                                      @PathVariable Long taskId,
                                      @RequestBody TaskRequestDto dto) {
        User user = resolveUser(jwt);
        Task task = taskService.updateTask(taskId, dto, user);
        return taskMapper.toDto(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@AuthenticationPrincipal Jwt jwt,
                           @PathVariable Long taskId) {
        User user = resolveUser(jwt);
        taskService.deleteTask(taskId, user);
    }

    private User resolveUser(Jwt jwt) {
        String externalId = jwt.getSubject();
        String username = jwt.getClaim("preferred_username");
        return userService.getOrCreateByExternalId(externalId, username);
    }
}
