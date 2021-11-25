package com.proyecto.integrador.controller;

import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.service.IScoreService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products/scores")
public class ScoreController implements CRUDController <ScoreDTO> {

    @Autowired
    IScoreService scoresService;

    @Operation(summary = "Find All Scores")
    @GetMapping("/all")
    public ResponseEntity<List<ScoreDTO>> getAll() throws FindByIdException{
        return ResponseEntity.ok(scoresService.findAll());
    }

    @Operation(summary = "Add a new score")
    @PostMapping("/create")
    public ResponseEntity<ScoreDTO> create(@RequestBody ScoreDTO score) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(scoresService.save(score));
    }

    @Operation(summary = "Find score by ID", description = "Returns a single score")
    @GetMapping("/get/{id}")
    public ResponseEntity<ScoreDTO> getById(@PathVariable Integer id) throws FindByIdException {
        return ResponseEntity.ok(scoresService.findById(id));
    }

    @Operation(summary = "Find score by IDuser and product", description = "Returns a single score")
    @GetMapping("/getByUserAndProduct/{email}/{idProduct}")
    public ResponseEntity<ScoreDTO> getByUserAndProduct(@PathVariable String email, @PathVariable Integer idProduct) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(scoresService.findByUserAndProduct(email, idProduct));
    }

    @Operation(summary = "Reset score", description = "Reset score")
    @PutMapping("/resetScore/{email}/{idProduct}")
    public ResponseEntity<ScoreDTO> resetScore(@PathVariable String email, @PathVariable Integer idProduct) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(scoresService.resetScore(email, idProduct));
    }

    @Operation(summary = "Update an existing score")
    @PutMapping("/update")
    public ResponseEntity<ScoreDTO> updateById(@RequestBody ScoreDTO scores) throws FindByIdException{
        return ResponseEntity.ok(scoresService.update(scores));
    }

    @Operation(summary = "Delete a score")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException {
        scoresService.deleteById(id);
        return ResponseEntity.ok("Se elimino la puntuación con id"+ id);
    }

    @Operation(summary = "Average", description = "Returns average score")
    @GetMapping("/average")
    public ResponseEntity<Double> getAverage(@PathVariable Integer idProduct) {
        return ResponseEntity.ok(scoresService.average(idProduct));
    }

}
