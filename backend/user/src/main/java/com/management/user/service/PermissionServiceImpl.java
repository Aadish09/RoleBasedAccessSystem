package com.management.user.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.management.user.dao.PermissionRepository;
import com.management.user.entity.Permission;
import com.management.user.exception.ResourceNotFoundException;
import com.management.user.model.PermissionDto;

@Service
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    @Override
    public void createPermission(PermissionDto permissionDto) {
        Permission permission = new Permission();
        permission.setName(permissionDto.getName());
        permission.setCreationDate(new Date().toString());        
        permissionRepository.save(permission);
    }

    @Override
    public PermissionDto getPermissionById(Long permissionId) {
        Permission permission = permissionRepository.findById(permissionId).orElseThrow(() -> new ResourceNotFoundException("Permission not found with ID: " + permissionId));
        return convertToDto(permission);
    }

    @Override
    public void assignPermissionToRole(Long roleId, Long permissionId) {
        // Implementation to assign permission to role
    }

    private PermissionDto convertToDto(Permission permission) {
        PermissionDto permissionDto = new PermissionDto();
        permissionDto.setId(permission.getId());
        permissionDto.setName(permission.getName());
        return permissionDto;
    }

    @Override
    public List<Permission> getPermissions() {
        return permissionRepository.findAll();
    }
}