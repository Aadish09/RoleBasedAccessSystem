package com.management.user.model;

import java.util.List;

import com.management.user.entity.Role;

import lombok.Data;

@Data
public class UserResponse {
    private String username;

    private String firstName;

    private String lastName;

    private String dob;

    private List<Role> roles;
}

