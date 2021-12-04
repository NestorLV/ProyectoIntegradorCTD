package com.proyecto.integrador.service;


import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.DTO.UserRequestDTO;
import com.proyecto.integrador.DTO.UserResponseDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;
import java.util.Map;

public interface IUserService {
    List<UserResponseDTO> findAll() throws FindByIdException;
    UserResponseDTO save(UserRequestDTO user) throws FindByIdException, BadRequestException;
    UserResponseDTO findById(Integer idUsers) throws FindByIdException;
    void deleteById(Integer idUsers) throws FindByIdException;
    UserResponseDTO update(String email) throws FindByIdException;
    List<ProductDTO> getFavorites(String email) throws BadRequestException, FindByIdException;
    UserResponseDTO handleFavorite(String email, Integer idProduct) throws FindByIdException, BadRequestException;
    UserResponseDTO updateFavorite(String email,Integer idProduct) throws FindByIdException;
    UserResponseDTO findByEmail(String email);
    Map<String, String> validateLogIn(UserRequestDTO userRequestDTO) throws BadRequestException;
    boolean activateUser(String email, Integer hashCode) throws BadRequestException, FindByIdException;
}
