package com.management.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.management.user.entity.Permission;
import com.management.user.model.PermissionDto;
import com.management.user.service.PermissionService;

@RestController
@RequestMapping("/api/v1")
public class PermissionApiResource {

    @Autowired
    private PermissionService permissionService;

    @GetMapping("/permissions")
    public ResponseEntity<List<Permission>> getPermissions() {
        List<Permission> permissions = permissionService.getPermissions();
        return ResponseEntity.ok(permissions);
    }

    @PostMapping("/permissions")
    public ResponseEntity<PermissionDto> createPermission(@RequestBody PermissionDto permissionDto) {
        permissionService.createPermission(permissionDto);
        return new ResponseEntity<>(permissionDto, HttpStatus.CREATED);
    }

    @GetMapping("/permissions/{permissionId}")
    public ResponseEntity<PermissionDto> getPermissionById(@PathVariable Long permissionId) {
        PermissionDto permissionDto = permissionService.getPermissionById(permissionId);
        return ResponseEntity.ok(permissionDto);
    }


}