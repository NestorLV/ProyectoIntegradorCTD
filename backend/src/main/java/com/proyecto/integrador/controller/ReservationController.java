package com.proyecto.integrador.controller;


import com.proyecto.integrador.DTO.ReservationDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.IReservationService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reservations")


public class ReservationController implements CRUDController<ReservationDTO>{

    @Autowired
    IReservationService reservationService;

    @Operation(summary = "Find All Reservations ", description = "Returns complete list of reservations")
    @GetMapping("/all")
    public ResponseEntity<List<ReservationDTO>> getAll(){
        return ResponseEntity.ok(reservationService.findAll());
    }

    @Operation(summary = "Find reservation by ID", description = "Returns a single reservation")
    @GetMapping("/get/{id}")
    public ResponseEntity<ReservationDTO> getById(@PathVariable Integer id) throws FindByIdException {
        return ResponseEntity.ok(reservationService.findById(id));
    }

    @Operation(summary = "Add a new reservation", description = "Creates a new reservation")
    @PostMapping("/create")
    public ResponseEntity<ReservationDTO> create(@RequestBody ReservationDTO reservation) throws FindByIdException {
        return ResponseEntity.ok(reservationService.save(reservation));
    }

    @Operation(summary = "Update an existing reservation", description = "Updates some information of an exiting reservation")
    @PutMapping("/update")
    public ResponseEntity<ReservationDTO> updateById(@RequestBody ReservationDTO reservation) throws FindByIdException {
        return ResponseEntity.ok(reservationService.update(reservation));
    }

    @Operation(summary = "Delete a reservation by ID", description = "Delete a reservation by id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException {
        reservationService.deleteById(id);
        return ResponseEntity.ok("Se eliminó la reserva con id: "+id);
    }
}
