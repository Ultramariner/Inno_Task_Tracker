package com.example.api.service;

import com.example.api.entity.User;

public interface UserService {

    User getById(Long id);

    User getByUsername(String username);

    User createUser(String username, String externalId);
}
