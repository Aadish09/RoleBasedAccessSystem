package com.management.user.service;

import java.util.List;

import com.management.user.entity.Permission;
import com.management.user.model.PermissionDto;

public interface PermissionService {
    void createPermission(PermissionDto permissionDto);
    PermissionDto getPermissionById(Long permissionId);
    List<Permission> getPermissions();
    void assignPermissionToRole(Long roleId, Long permissionId);
}