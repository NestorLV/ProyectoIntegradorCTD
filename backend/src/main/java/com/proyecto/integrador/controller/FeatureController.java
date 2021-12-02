package com.proyecto.integrador.controller;

import com.proyecto.integrador.DTO.FeatureRequestDTO;
import com.proyecto.integrador.DTO.FeatureResponseDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.IFeatureService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/features")
public class FeatureController implements CRUDController<FeatureRequestDTO> {

    @Autowired
    IFeatureService featureService;

    @Operation(summary = "Find All Features ", description = "Returns complete list of features")
    @GetMapping("/all")
    public ResponseEntity<List<FeatureResponseDTO>> getAll(){
        return ResponseEntity.ok(featureService.findAll());
    }

    @Operation(summary = "Find feature by ID", description = "Returns a single feature")
    @GetMapping("/get/{id}")
    public ResponseEntity<FeatureResponseDTO> getById(@PathVariable Integer id) throws FindByIdException {
        return ResponseEntity.ok(featureService.findById(id));
    }

    @Operation(summary = "Add a new feature", description = "Creates a new feature")
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<FeatureResponseDTO> create(@RequestBody FeatureRequestDTO feature) throws FindByIdException {
        return ResponseEntity.ok(featureService.save(feature));
    }

    @Operation(summary = "Update an existing feature", description = "Updates some information of an exiting feature")
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<FeatureResponseDTO> updateById(@RequestBody FeatureRequestDTO feature) throws FindByIdException {
        return ResponseEntity.ok(featureService.update(feature));
    }

    @Operation(summary = "Update an existing feature", description = "Updates some information of an exiting feature")
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/updateproduct/{featureId}/{productId}")
    public ResponseEntity<FeatureResponseDTO> updateProduct(@PathVariable Integer featureId, @PathVariable Integer productId) throws FindByIdException {
        return ResponseEntity.ok(featureService.updateProducts(featureId, productId));
    }

    @Operation(summary = "Delete a feature by ID", description = "Delete a feature by id")
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException {
        featureService.deleteById(id);
        return ResponseEntity.ok("Se eliminó la característica con id: "+id);
    }
}