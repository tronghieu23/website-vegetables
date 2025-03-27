package com.TTT.Vegetable_API.Repository;

import com.TTT.Vegetable_API.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
