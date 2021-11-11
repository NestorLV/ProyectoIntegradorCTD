package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategory_Title(final String title);

    List<Product> findByCity_Id(final Integer id);

    List<Product> findFirst12ByOrderByQualificationDesc();

    List<Product> findFirst5ByOrderByQualificationDesc();
}
