package com.management.user.model;

import java.util.List;

import lombok.Data;

@Data
public class UserPayload {
    private String username;

    private String password;

    private String firstName;

    private String lastName;

    private String dob;

    private List<String> roles;
}