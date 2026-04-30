package com.example.api.service;

import com.example.api.entity.User;

public interface UserService {

    User getById(Long id);

    User getByExternalId(String externalId);

    User getOrCreateByExternalId(String externalId, String username);

    User getByUsername(String username);

    User createUser(String username, String externalId);
}
