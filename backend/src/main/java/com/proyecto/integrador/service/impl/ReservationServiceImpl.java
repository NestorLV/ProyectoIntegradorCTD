package com.proyecto.integrador.service.impl;


import com.proyecto.integrador.DTO.ReservationDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Reservation;
import com.proyecto.integrador.persistence.repository.IReservationRepository;
import com.proyecto.integrador.service.IReservationService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements IReservationService {
    private final Logger logger = Logger.getLogger(ReservationServiceImpl.class);


    @Autowired
    IReservationRepository reservationRepository;

    @Override
    public List<ReservationDTO> findAll() {
        logger.debug("Iniciando método buscar todas las reservas");
        List<ReservationDTO> reservations = new ArrayList<>();
        for (Reservation r: reservationRepository.findAll()) {
            reservations.add(r.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las reservas");
        return reservations;
    }

    @Override
    public ReservationDTO save(ReservationDTO reservationDTO) throws FindByIdException {
        logger.debug("Iniciando método guardar reserva");
        Reservation reservationEntity = reservationDTO.toEntity();
        reservationEntity.setStartDate(new Date(reservationDTO.getStartDate().getTime() + (1000 * 60 * 60 * 24)));
        reservationEntity.setEndDate(new Date(reservationDTO.getEndDate().getTime() + (1000 * 60 * 60 * 24)));
        Reservation reservation = reservationRepository.save(reservationEntity);
        reservationDTO.setId(reservation.getId());
        logger.debug("Terminó la ejecución del método guardar reserva");
        return reservationDTO;
    }

    @Override
    public ReservationDTO findById(Integer reservationId) throws FindByIdException {
        logger.debug("Iniciando método buscar reserva por ID");
        if (!reservationRepository.existsById(reservationId)) {
            throw new FindByIdException("No existe una reserva con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método buscar reserva por ID");
        return reservationRepository.findById(reservationId).get().toDto();
    }

    @Override
    public void deleteById(Integer reservationId) throws FindByIdException {
        logger.debug("Iniciando método eliminar reserva por ID");
        if (!reservationRepository.existsById(reservationId)) {
            throw new FindByIdException("No existe una reserva con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar reserva por ID");
        reservationRepository.deleteById(reservationId);
    }

    @Override
    public ReservationDTO update(ReservationDTO reservationDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar reserva por ID");
        if (!reservationRepository.existsById(reservationDTO.getId())) {
            throw new FindByIdException("No existe una reserva con el id ingresado");
        }
        Reservation reservation = reservationRepository.findById(reservationDTO.getId()).get();
        reservation.setArrivalSchedule(reservationDTO.getArrivalSchedule());
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.getProduct().setId(reservationDTO.getProductId());
        reservation.getUser().setId(reservationDTO.getUserId());
        logger.debug("Terminó la ejecución del método actualizar reserva por ID");
        return reservationRepository.save(reservation).toDto();
    }

    public Set<ReservationDTO> findByProductId(Integer productId) {
        logger.debug("Iniciando método buscar reservas asociados al producto");
        logger.debug("Terminó la ejecución del método buscar reservas asociados al producto");
        return reservationRepository.findByProduct_Id(productId).stream().map(Reservation::toDto).collect(Collectors.toSet());
    }

    public Set<ReservationDTO> findByUserId(Integer userId) {
        logger.debug("Iniciando método buscar reservas asociados al usuario");
        logger.debug("Terminó la ejecución del método buscar reservas asociados al usuario");
        return reservationRepository.findByProduct_Id(userId).stream().map(Reservation::toDto).collect(Collectors.toSet());
    }


}
