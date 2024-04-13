package com.management.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    };

    @GetMapping("/users/{id}")
    public ResponseEntity<User>  getUserById(@PathVariable("id") Long id) {
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users")
    public ResponseEntity<Long>  addUser(@RequestBody UserPayload payload) {
        Long userId = userService.addUser(payload);
        return ResponseEntity.ok(userId);
    }


    @PutMapping("/users")
    public ResponseEntity<Long> updateUser(@RequestBody UserPayload payload) {
        Long userId = userService.updateUser(payload);
        return ResponseEntity.ok(userId);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Long> deleteUser(@PathVariable("id") Long id) {
        Long userId = userService.deleteUser(id);
        return ResponseEntity.ok(userId);
    }
}
