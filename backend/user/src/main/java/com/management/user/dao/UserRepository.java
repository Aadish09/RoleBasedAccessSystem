package com.management.user.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.management.user.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
} 