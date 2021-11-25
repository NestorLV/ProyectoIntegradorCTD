package com.proyecto.integrador.controller;

import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.DTO.UserDTO;
import com.proyecto.integrador.config.jwt.JwtResponse;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.UnauthorizedAccessException;
import com.proyecto.integrador.service.IScoreService;
import com.proyecto.integrador.service.IUserService;
import io.jsonwebtoken.Jwt;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class UserController implements CRUDController <UserDTO> {

    @Autowired
    IUserService userService;

    @GetMapping("/403")
    public void forbidden() throws UnauthorizedAccessException {
        throw new UnauthorizedAccessException("No tiene permisos para acceder a este recurso", "User Role");
    }

    @Operation(summary = "Find All Users")
    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getAll() throws FindByIdException{
        return ResponseEntity.ok(userService.findAll());
    }

    @Operation(summary = "Add a new user")
    @PostMapping("/create")
    public ResponseEntity<UserDTO> create(@RequestBody UserDTO user) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(userService.save(user));
    }

    @Operation(summary = "Find user by ID", description = "Returns a single user")
    @GetMapping("/get/{id}")
    public ResponseEntity<UserDTO> getById(@PathVariable Integer idUser) throws FindByIdException {
        return ResponseEntity.ok(userService.findById(idUser));
    }

    @Override
    public ResponseEntity<?> updateById(UserDTO userDTO) throws FindByIdException, UnauthorizedAccessException {
        return null;
    }

    @Operation(summary = "Find user by email", description = "Returns a single user")
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<UserDTO> getByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.findByEmail(email));
    }

    @Operation(summary = "Delete a user")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Integer idUser) throws FindByIdException {
        userService.deleteById(idUser);
        return ResponseEntity.ok("Se eliminó el usuario con id"+ idUser);
    }

    @Operation(summary = "Get User Favorites")
    @GetMapping("/getfavourites/{email}")
    public ResponseEntity<List<ProductDTO>> getFavorites(@PathVariable String email) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(userService.getFavorites(email));
    }

    @Operation(summary = "Create User Favourite")
    @PostMapping("/createfavourite/{email}/{idProduct}")
    public ResponseEntity<ScoreDTO> createFavorite(@PathVariable String email, @PathVariable Integer idProduct) throws FindByIdException, BadRequestException {
        return ResponseEntity.ok(userService.saveFavorite(email, idProduct));
    }

    @Operation(summary = "User login")
    @PostMapping("/login")
    public ResponseEntity<?> validateLogIn(@RequestBody UserDTO userDTO) throws BadRequestException {
        Map datos = userService.validateLogIn(userDTO);
        return ResponseEntity.ok(datos);
    }

    @Operation(summary = "Activate user")
    @GetMapping("/activate/{email}/{hashCode}")
    public ResponseEntity<?> activateUser(@PathVariable String email, @PathVariable Integer hashCode) throws BadRequestException, FindByIdException {
        return ResponseEntity.ok( userService.activateUser(email, hashCode));
    }
}
