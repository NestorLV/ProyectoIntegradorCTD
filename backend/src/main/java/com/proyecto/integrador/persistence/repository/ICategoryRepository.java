package com.proyecto.integrador.persistence.repository;
import com.proyecto.integrador.persistence.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ICategoryRepository extends JpaRepository<Category, Integer> {
    Category findByTitle(String categoryName);
}
