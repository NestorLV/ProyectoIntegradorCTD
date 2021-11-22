package com.proyecto.integrador.controller;

import com.proyecto.integrador.DTO.FilterDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.IProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController implements CRUDController<ProductDTO> {

    @Autowired
    IProductService productService;

    @Operation(summary = "Find All Products")
    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAll() throws FindByIdException {
        return ResponseEntity.ok(productService.findAll());
    }

    @Operation(summary = "Find product by ID", description = "Returns a single product")
    @GetMapping("/get/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Integer id) throws FindByIdException {
        return ResponseEntity.ok(productService.findById(id));
    }

    @Operation(summary = "Add a new product")
    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<ProductDTO> create(@RequestBody ProductDTO product) throws FindByIdException {
        return ResponseEntity.ok(productService.save(product));
    }

    @Operation(summary = "Update an existing product")
    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<ProductDTO> updateById(@RequestBody ProductDTO product) throws FindByIdException {
        return ResponseEntity.ok(productService.update(product));
    }

    @Operation(summary = "Delete a product")
    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException {
        productService.deleteById(id);
        return ResponseEntity.ok("Se eliminó el producto con id: "+id);
    }

    @Operation(summary = "Find by category")
    @GetMapping("/get/category/{categoryName}")
    public ResponseEntity<List<ProductDTO>> getAllByCategory(@PathVariable String categoryName) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(productService.findAllByCategory(categoryName));
    }

    @Operation(summary = "Find by city")
    @GetMapping("/get/city/{cityId}")
    public ResponseEntity<List<ProductDTO>> getAllByCity(@PathVariable Integer cityId) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(productService.findAllByCity(cityId));
    }

    @Operation(summary = "Find recommended products")
    @GetMapping("/get/recommended")
    public ResponseEntity<List<ProductDTO>> getRecommended() throws FindByIdException {
        return ResponseEntity.ok(productService.findRecommendations());
    }

    @Operation(summary = "Find by city and date range")
    @PostMapping("/get/filter")
    public ResponseEntity<List<ProductDTO>> getCityDateRange(@RequestBody FilterDTO filterDTO)
            throws BadRequestException, FindByIdException {
            if(validate(filterDTO)){
                return ResponseEntity.ok(productService.findCityDateRange(filterDTO));
        }

        return null;
    }

    public Boolean validate(FilterDTO filterDTO){
        if((filterDTO.getCityId() == null) &&
                (filterDTO.getStartDate() == null &&filterDTO.getEndDate() == null)){
                if(filterDTO.getCityId()==null&&(filterDTO.getStartDate()==null||filterDTO.getEndDate()==null)){
                    return false;
                }
            return false;
        }else {
            return true;
        }
    }
    /*@GetMapping("/get/test")
    public List<ReservationResultDTO> test(){
        return productService.test();
    }*/
}
