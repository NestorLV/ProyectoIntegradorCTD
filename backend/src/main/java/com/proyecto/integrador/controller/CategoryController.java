package com.proyecto.integrador.controller;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.ICategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/categories")
public class CategoryController implements CRUDController<CategoryDTO> {

    @Autowired
    ICategoryService categoryService;

    @Operation(summary = "Find All Categories")
    @GetMapping("/all")
    public ResponseEntity<List<CategoryDTO>> getAll(){
        return ResponseEntity.ok(categoryService.findAll());
    }

    @Operation(summary = "Find category by ID", description = "Returns a single category")
    @GetMapping("/get/{id}")
    public ResponseEntity<CategoryDTO> getById(@PathVariable Integer id) throws FindByIdException {
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @Operation(summary = "Add a new category")
    @PostMapping("/create")
    public ResponseEntity<CategoryDTO> create(@RequestBody CategoryDTO category) {
        return ResponseEntity.ok(categoryService.save(category));
    }

    @Operation(summary = "Update an existing category")
    @PutMapping("/update")
    public ResponseEntity<CategoryDTO> updateById(@RequestBody CategoryDTO category) throws FindByIdException {
        return ResponseEntity.ok(categoryService.update(category));
    }

    @Operation(summary = "Delete a category")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException {
        categoryService.deleteById(id);
        return ResponseEntity.ok("Se eliminó la categoria con id: "+id);
    }
}
