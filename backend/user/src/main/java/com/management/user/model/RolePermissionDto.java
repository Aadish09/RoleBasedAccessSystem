package com.management.user.model;

import java.util.Set;

import com.management.user.entity.Permission;

import lombok.Data;

@Data
public class RolePermissionDto {
    private Long id;
    private String name;
    Set<Permission> permissions;
}
