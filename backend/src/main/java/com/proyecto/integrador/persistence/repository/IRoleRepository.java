package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Role findByName(String name);
}
