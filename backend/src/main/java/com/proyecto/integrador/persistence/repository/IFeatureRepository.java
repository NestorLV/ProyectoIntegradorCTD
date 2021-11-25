package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Feature;
import com.proyecto.integrador.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Integer>{
}
