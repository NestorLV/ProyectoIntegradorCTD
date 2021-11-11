package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IScoreRepository extends JpaRepository<Score, Integer> {
    List<Score>findByProductId(Integer idProduct);

}
