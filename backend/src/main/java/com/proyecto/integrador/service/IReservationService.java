package com.proyecto.integrador.service;

import com.proyecto.integrador.DTO.ReservationDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IReservationService extends IBookingService<ReservationDTO> {
    List<ReservationDTO> findAll();
    ReservationDTO save(ReservationDTO reservation) throws FindByIdException;
    ReservationDTO findById(Integer reservationId) throws FindByIdException;
    void deleteById(Integer reservationId) throws FindByIdException;
    ReservationDTO update(ReservationDTO reservation) throws FindByIdException;
}
