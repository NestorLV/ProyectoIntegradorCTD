package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImageRepository extends JpaRepository<Image, Integer> {
    List<Image> findByProduct_Id(Integer productId);
}
