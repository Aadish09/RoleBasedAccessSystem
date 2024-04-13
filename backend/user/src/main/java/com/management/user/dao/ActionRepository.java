package com.management.user.dao;

import com.management.user.entity.Actions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends JpaRepository<Actions, Long> {
}
