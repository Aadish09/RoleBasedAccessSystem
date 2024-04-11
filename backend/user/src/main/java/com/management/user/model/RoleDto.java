package com.management.user.model;

import java.util.Set;

import lombok.Data;

@Data
public class RoleDto {
    private Long id;
    private String name;
    Set<String> permissions;
}
