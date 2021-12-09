package com.proyecto.integrador.controller;


import com.proyecto.integrador.DTO.ReservationDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.IReservationService;
import com.proyecto.integrador.service.impl.ReservationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = "http://worldguestbooking.com.ar")
@RestController
@RequestMapping("/reservations")
public class ReservationController implements CRUDController<ReservationDTO>{

    @Autowired
    IReservationService reservationService;
    @Autowired
    ReservationServiceImpl reservationServiceImpl;

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

    @Operation(summary = "Find reservation by ID of Product", description = "Returns all reservations by product id")
    @GetMapping("/get/product/{idProduct}")
    public ResponseEntity<Set<ReservationDTO>> getByIdProduct(@PathVariable Integer idProduct) {
        return ResponseEntity.ok(reservationServiceImpl.findByProductId(idProduct));
    }

    @Operation(summary = "Find reservation by ID of User", description = "Returns all reservations by user id")
    @GetMapping("/get/user/{idUser}")
    public ResponseEntity<Set<ReservationDTO>> getByIdUser(@PathVariable Integer idUser) {
        return ResponseEntity.ok(reservationServiceImpl.findByUserId(idUser));
    }

}
