package com.management.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.management.user.model.RoleDto;
import com.management.user.model.RolePermissionDto;
import com.management.user.entity.Role;
import com.management.user.service.RoleService;

@RestController
@RequestMapping("/api/v1")
public class RoleApiResourceRoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getRoles() {
        List<Role> roles = roleService.getRoles();
        return ResponseEntity.ok(roles);
    }

    @PostMapping("/roles")
    public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
        roleService.createRole(roleDto);
        return new ResponseEntity<>(roleDto, HttpStatus.CREATED);
    }

    @PutMapping("/roles")
    public ResponseEntity<RoleDto> updateRole(@RequestBody RoleDto roleDto) {
        roleService.updateRole(roleDto);
        return new ResponseEntity<>(roleDto, HttpStatus.OK);
    }

    @GetMapping("/roles/{roleId}")
    public ResponseEntity<RolePermissionDto> getRoleById(@PathVariable Long roleId) {
        RolePermissionDto rolePermissionDto = roleService.getRoleById(roleId);
        return ResponseEntity.ok(rolePermissionDto);
    }

}