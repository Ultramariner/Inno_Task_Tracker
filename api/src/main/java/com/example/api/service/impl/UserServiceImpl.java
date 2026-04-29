package com.example.api.service.impl;

import com.example.api.entity.User;
import com.example.api.repository.UserRepository;
import com.example.api.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found: " + id));
    }

    @Override
    public User getByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    @Override
    public User createUser(String username, String externalId) {
        User user = User.builder()
                .username(username)
                .externalId(externalId)
                .build();

        return userRepository.save(user);
    }
}
