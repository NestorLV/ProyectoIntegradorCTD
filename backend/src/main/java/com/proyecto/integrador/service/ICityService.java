package com.proyecto.integrador.service;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface ICityService extends IBookingService<CityDTO> {
    List<CityDTO> findAll();
    CityDTO save(CityDTO city);
    CityDTO findById(Integer cityId) throws FindByIdException;
    void deleteById(Integer cityId) throws FindByIdException;
    CityDTO update(CityDTO city) throws FindByIdException;
}