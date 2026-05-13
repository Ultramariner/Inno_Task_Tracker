package com.example.api.service;

import com.example.api.dto.TaskRequestDto;
import com.example.api.entity.Task;
import com.example.api.entity.User;

import java.util.List;
import java.util.Map;

public interface TaskService {

    List<Task> getTasksForUser(User user);

    Task getTaskForUser(Long taskId, User user);

    Task createTask(TaskRequestDto dto, User user);

    Task updateTask(Long taskId, TaskRequestDto dto, User user);

    void reorderTasks(Map<Long, TaskRequestDto> tasks, User user);

    void deleteTask(Long taskId, User user);
}
