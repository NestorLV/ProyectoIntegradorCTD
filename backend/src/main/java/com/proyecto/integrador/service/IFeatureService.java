package com.proyecto.integrador.service;
import com.proyecto.integrador.DTO.FeatureRequestDTO;
import com.proyecto.integrador.DTO.FeatureResponseDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;
import java.util.Set;

public interface IFeatureService {
    List<FeatureResponseDTO> findAll();
    FeatureResponseDTO save(FeatureRequestDTO feature) throws FindByIdException;
    FeatureResponseDTO findById(Integer featureId) throws FindByIdException;
    void deleteById(Integer featureId) throws FindByIdException;
    FeatureResponseDTO update(FeatureRequestDTO feature) throws FindByIdException;
    ProductDTO featuresUpdated(List<Integer> featureIds, Integer productId) throws FindByIdException;
}