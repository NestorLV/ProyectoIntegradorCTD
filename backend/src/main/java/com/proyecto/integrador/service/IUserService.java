package com.proyecto.integrador.service;


import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.DTO.UserDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Score;

import java.util.List;

public interface IUserService {
    List<UserDTO> findAll() throws FindByIdException;
    UserDTO save(UserDTO user) throws FindByIdException;
    UserDTO findById(Integer idUsers) throws FindByIdException;
    void deleteById(Integer idUsers) throws FindByIdException;
    UserDTO update(UserDTO user) throws FindByIdException;
    List<ProductDTO> getFavorites(String email) throws BadRequestException, FindByIdException;
    UserDTO findByEmail(String email);
}
