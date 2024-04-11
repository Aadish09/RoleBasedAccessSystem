package com.management.user.model;

import lombok.Data;

@Data
public class LoginRequest {
    String username;
    String password;
}
