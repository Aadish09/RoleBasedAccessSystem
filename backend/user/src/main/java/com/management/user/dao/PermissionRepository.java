package com.management.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.user.entity.Permission;

public interface PermissionRepository extends JpaRepository<Permission, Long> {
    Permission findByName(String name);
}
