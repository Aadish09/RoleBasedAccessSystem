package com.management.user.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.ws.rs.BadRequestException;

import org.hibernate.mapping.Collection;
import org.postgresql.util.PSQLException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.management.user.dao.PermissionRepository;
import com.management.user.dao.RoleRepository;
import com.management.user.dao.UserRoleRepository;
import com.management.user.entity.Permission;
import com.management.user.entity.Role;
import com.management.user.entity.UserRoleMapping;
import com.management.user.exception.CustomException;
import com.management.user.exception.ResourceNotFoundException;
import com.management.user.model.RoleDto;
import com.management.user.model.RolePermissionDto;

import jakarta.transaction.Transactional;

@Service
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    @Transactional
    public void createRole(RoleDto roleDto) {
        try {
            Role role = new Role();
            role.setName(roleDto.getName());
            Set<Permission> permissions = new HashSet<>();
            for (String permissionName : new ArrayList<>(roleDto.getPermissions())) {
                Permission permission = permissionRepository.findByName(permissionName);
                permissions.add(permission);
            }
            role.setPermissions(permissions);  
            role.setCreationDate(new Date().toString());        
            roleRepository.save(role);
        } catch(Exception e) {
            if(e instanceof DataIntegrityViolationException) {
                throw new CustomException(roleDto.getName() + " role already exists.");
            }
        }
        
    }

    @Override
    @Transactional
    public void updateRole(RoleDto roleDto) {
        Role role = this.roleRepository.findByName(roleDto.getName());
        Set<Permission> permissions = new HashSet<>();
        for (String permissionName : new ArrayList<>(roleDto.getPermissions())) {
            Permission permission = permissionRepository.findByName(permissionName);
            permissions.add(permission);
        }
        role.setPermissions(permissions);        
        roleRepository.save(role);
    }

    @Override
    public RolePermissionDto getRoleById(Long roleId) {
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new ResourceNotFoundException("Role not found with ID: " + roleId));
        return convertToDto(role);
    }

    @Override
    public Long deleteRoleById(Long roleId) {
        Optional<Role> role = roleRepository.findById(roleId);
        if(role.isPresent()) {
            Optional<UserRoleMapping> roleData = userRoleRepository.findByRole(role.get());
            if(roleData.isPresent()){
                throw new CustomException("Role associated with user.");
            }
            roleRepository.deleteById(roleId);
            return roleId;
        }
        return null;
    }

    private RolePermissionDto convertToDto(Role role) {
        RolePermissionDto rolePermissionDto = new RolePermissionDto();
        rolePermissionDto.setId(role.getId());
        rolePermissionDto.setName(role.getName());
        rolePermissionDto.setPermissions(role.getPermissions());
        return rolePermissionDto;
    }

    @Override
    public List<Role> getRoles() {
        return roleRepository.findAll();
    }
    
}
