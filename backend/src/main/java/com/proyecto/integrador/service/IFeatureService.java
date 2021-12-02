package com.proyecto.integrador.service;
import com.proyecto.integrador.DTO.FeatureRequestDTO;
import com.proyecto.integrador.DTO.FeatureResponseDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface IFeatureService {
    List<FeatureResponseDTO> findAll();
    FeatureResponseDTO save(FeatureRequestDTO feature) throws FindByIdException;
    FeatureResponseDTO findById(Integer featureId) throws FindByIdException;
    void deleteById(Integer featureId) throws FindByIdException;
    FeatureResponseDTO update(FeatureRequestDTO feature) throws FindByIdException;
    FeatureResponseDTO updateProducts(Integer featureId, Integer productId) throws FindByIdException;
}