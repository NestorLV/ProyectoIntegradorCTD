package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;
import java.util.Set;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
