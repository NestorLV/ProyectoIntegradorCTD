package com.proyecto.integrador.controller;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.ICityService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // @CrossOrigin(origins = "http://ec2-50-19-20-201.compute-1.amazonaws.com/")
@RestController
@RequestMapping("/cities")
public class CityController implements CRUDController<CityDTO>{

    @Autowired
    ICityService cityService;

    @Operation(summary = "Find All Cities ", description = "Returns complete list of cities")
    @GetMapping("/all")
    public ResponseEntity<List<CityDTO>> getAll(){
        return ResponseEntity.ok(cityService.findAll());
    }

    @Operation(summary = "Find city by ID", description = "Returns a single city")
    @GetMapping("/get/{id}")
    public ResponseEntity<CityDTO> getById(@PathVariable Integer id) throws FindByIdException {
        return ResponseEntity.ok(cityService.findById(id));
    }

    @Operation(summary = "Add a new city", description = "Creates a new city")
    @PostMapping("/create")
    public ResponseEntity<CityDTO> create(@RequestBody CityDTO city) {
        return ResponseEntity.ok(cityService.save(city));
    }

    @Operation(summary = "Update an existing city", description = "Updates some information of an exiting city")
    @PutMapping("/update")
    public ResponseEntity<CityDTO> updateById(@RequestBody CityDTO city) throws FindByIdException {
        return ResponseEntity.ok(cityService.update(city));
    }

    @Operation(summary = "Delete a city by ID", description = "Delete a city by id")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException {
        cityService.deleteById(id);
        return ResponseEntity.ok("Se eliminó la ciudad con id: "+id);
    }
}