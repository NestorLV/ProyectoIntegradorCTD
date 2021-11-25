package com.proyecto.integrador.service;
import com.proyecto.integrador.DTO.FeatureDTO;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface IFeatureService extends IBookingService<FeatureDTO> {
    List<FeatureDTO> findAll();
    FeatureDTO save(FeatureDTO feature) throws FindByIdException;
    FeatureDTO findById(Integer featureId) throws FindByIdException;
    void deleteById(Integer featureId) throws FindByIdException;
    FeatureDTO update(FeatureDTO feature) throws FindByIdException;
}