package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.FeatureDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.persistence.entity.Feature;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.repository.IFeatureRepository;
import com.proyecto.integrador.service.IFeatureService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FeatureServiceImpl implements IFeatureService {
    private final Logger logger = Logger.getLogger(FeatureServiceImpl.class);

    @Autowired
    IFeatureRepository featureRepository;

    @Override
    public List<FeatureDTO> findAll() {
        logger.debug("Iniciando método buscar todas las características");
        List<FeatureDTO> features = new ArrayList<>();
        for (Feature f: featureRepository.findAll()) {
            features.add(f.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las características");
        return features;
    }

    @Override
    public FeatureDTO save(FeatureDTO feature) throws FindByIdException {
        logger.debug("Iniciando método guardar característica");
        logger.debug("Terminó la ejecución del método guardar característica");
        return Optional.of(featureRepository.save(feature.toEntity())).get().toDto();
    }

    @Override
    public FeatureDTO findById(Integer featureId) throws FindByIdException {
        logger.debug("Iniciando método buscar característica por ID");
        if (!featureRepository.existsById(featureId)) {
            throw new FindByIdException("No existe una característica con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método buscar característica por ID");
        return featureRepository.findById(featureId).get().toDto();
    }

    @Override
    public void deleteById(Integer featureId) throws FindByIdException {
        logger.debug("Iniciando método eliminar característica por ID");
        if (!featureRepository.existsById(featureId)) {
            throw new FindByIdException("No existe una característica con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar característica por ID");
        featureRepository.deleteById(featureId);
    }

    @Override
    public FeatureDTO update(FeatureDTO featureDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar característica por ID");
        if (!featureRepository.existsById(featureDTO.getId())) {
            throw new FindByIdException("No existe una característica con el id ingresado");
        }
        Feature feature = featureRepository.findById(featureDTO.getId()).get();
        feature.setTitle(featureDTO.getTitle());
        feature.setType(featureDTO.getType());
        logger.debug("Terminó la ejecución del método actualizar característica por ID");
        return featureRepository.save(feature).toDto();
    }

    public Set<FeatureDTO> findByProduct(Product product) {
        logger.debug("Iniciando método buscar lista de características asociadas a un producto");
        Set<Feature> featuresFound =  featureRepository.findAll().stream().filter(feature -> feature.getProducts().contains(product)).collect(Collectors.toSet());
        logger.debug("Terminó la ejecución del método buscar lista de características asociadas a un producto");
        return featuresFound.stream().map(Feature::toDto).collect(Collectors.toSet());
    }
}