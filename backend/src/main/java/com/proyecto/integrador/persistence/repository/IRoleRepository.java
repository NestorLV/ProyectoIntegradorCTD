package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Role;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IRoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RolesTypes name);
}
