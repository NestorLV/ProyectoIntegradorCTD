package com.proyecto.integrador.service;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface IImageService extends IBookingService<ImageDTO> {
    List<ImageDTO> findAll();
    ImageDTO save(ImageDTO image) throws FindByIdException;
    ImageDTO findById(Integer imageId) throws FindByIdException;
    void deleteById(Integer imageId) throws FindByIdException;
    ImageDTO update(ImageDTO image) throws FindByIdException;
}