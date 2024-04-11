package com.management.user.service;

import java.util.List;

import com.management.user.entity.User;
import com.management.user.model.UserPayload;

public interface UserService {
    public List<User> getAllUsers();
    public User getUserById(Long id);
    public User getUserByUsername(String username);
    public Long addUser(UserPayload userPayload);
    public Long updateUser(UserPayload userPayload);
}
