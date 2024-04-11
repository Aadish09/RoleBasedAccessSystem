package com.management.user.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.management.user.entity.User;
import com.management.user.model.LoginRequest;
import com.management.user.model.LoginResponse;
import com.management.user.service.AuthService;

import io.jsonwebtoken.security.InvalidKeyException;
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) throws InvalidKeyException, JsonProcessingException {
        String accessToken = authService.getAccessToken(loginRequest);
        return ResponseEntity.ok(new LoginResponse(accessToken));
    }

    @GetMapping("/user/details")
    public ResponseEntity<?> getUserDetails(@RequestHeader (name="Authorization") String token) throws JsonMappingException, JsonProcessingException {
        User user = authService.getUser(token);
        return ResponseEntity.ok(user);
    }
}
