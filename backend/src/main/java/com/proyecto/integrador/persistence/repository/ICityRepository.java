package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<City, Integer> {
}
