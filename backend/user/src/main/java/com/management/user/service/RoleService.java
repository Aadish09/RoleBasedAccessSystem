package com.management.user.service;

import java.util.List;

import com.management.user.entity.Role;
import com.management.user.model.RoleDto;
import com.management.user.model.RolePermissionDto;

public interface RoleService {
    void createRole(RoleDto roleDto);
    void updateRole(RoleDto roleDto);
    RolePermissionDto getRoleById(Long roleId);
    Long deleteRoleById(Long roleId);
    List<Role> getRoles();
    
}
