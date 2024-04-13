package com.management.user.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.user.entity.Role;
import com.management.user.entity.UserRoleMapping;

public interface UserRoleRepository extends JpaRepository<UserRoleMapping, Long> {
    Optional<UserRoleMapping> findByRole(Role role);
} 
