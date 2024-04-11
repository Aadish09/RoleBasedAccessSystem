package com.management.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.management.user.entity.User;
import com.management.user.model.UserPayload;
import com.management.user.service.UserService;


@RestController
@RequestMapping("/api/v1/")
public class UserApiResource {

    @Autowired
    private UserService userService;
    
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    };

    @GetMapping("/users/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userService.getUserById(id);
    }

    @PostMapping("/users")
    public Long addUser(@RequestBody UserPayload payload) {
        return userService.addUser(payload);
    }


    @PutMapping("/users")
    public Long updateUser(@RequestBody UserPayload payload) {
        return userService.updateUser(payload);
    }
}
