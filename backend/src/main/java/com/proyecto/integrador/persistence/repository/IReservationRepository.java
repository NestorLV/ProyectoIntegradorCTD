package com.proyecto.integrador.persistence.repository;

import com.proyecto.integrador.persistence.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByProduct_Id(Integer productId);
    List<Reservation> findByUser_Id(Integer userId);
}
