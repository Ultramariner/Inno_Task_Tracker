package com.example.api.controller;

import com.example.api.dto.UserDto;
import com.example.api.entity.User;
import com.example.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public UserDto createUser(@RequestParam String username) {
        User user = userService.createUser(username, null);
        return new UserDto(user.getId(), user.getUsername());
    }
}
