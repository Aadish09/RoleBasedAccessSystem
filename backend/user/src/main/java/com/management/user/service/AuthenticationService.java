package com.management.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.management.user.entity.User;
import com.management.user.exception.CustomException;

@Service
public class AuthenticationService {
    @Autowired
    UserService userService;
    public boolean isAuthenticated(String credentials) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String creds [] = credentials.split(":");
        String username = creds[0];
        String password = creds[1];
        User user = userService.getUserByUsername(username);
        if(!encoder.matches(password, user.getPassword())) {
            throw new CustomException("Incorrect password");
        }
        return true;
    }
 }
