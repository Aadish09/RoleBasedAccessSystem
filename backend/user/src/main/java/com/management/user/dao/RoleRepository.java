package com.management.user.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.user.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}