package com.example.api.repository;

import com.example.api.entity.Task;
import com.example.api.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findAllByUserOrderByPosition(User user);

    @Query("SELECT MAX(t.position) FROM Task t WHERE t.user.id = :userId")
    Integer findMaxPositionByUser(@Param("userId") Long userId);
}
