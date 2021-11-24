package com.proyecto.integrador.service;


import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.DTO.UserDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;
import java.util.Map;

public interface IUserService {
    List<UserDTO> findAll() throws FindByIdException;
    UserDTO save(UserDTO user) throws FindByIdException, BadRequestException;
    UserDTO findById(Integer idUsers) throws FindByIdException;
    void deleteById(Integer idUsers) throws FindByIdException;
    UserDTO update(UserDTO user) throws FindByIdException;
    List<ProductDTO> getFavorites(String email) throws BadRequestException, FindByIdException;
    ScoreDTO saveFavorite(String email, Integer idProduct) throws FindByIdException, BadRequestException;
    UserDTO findByEmail(String email);
    Map<String, String> validateLogIn(UserDTO userDTO) throws BadRequestException;
}
