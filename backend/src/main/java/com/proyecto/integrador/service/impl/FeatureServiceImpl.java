package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.FeatureRequestDTO;
import com.proyecto.integrador.DTO.FeatureResponseDTO;
import com.proyecto.integrador.DTO.ProductDTO;
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

    @Autowired
    ProductServiceImpl productService;

    @Override
    public List<FeatureResponseDTO> findAll() {
        logger.debug("Iniciando método buscar todas las características");
        List<FeatureResponseDTO> features = new ArrayList<>();
        for (Feature f: featureRepository.findAll()) {
            features.add(f.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las características");
        return features;
    }

    @Override
    public FeatureResponseDTO save(FeatureRequestDTO feature) throws FindByIdException {
        logger.debug("Iniciando método guardar característica");
        logger.debug("Terminó la ejecución del método guardar característica");
        return Optional.of(featureRepository.save(feature.toEntity())).get().toDto();
    }

    @Override
    public FeatureResponseDTO findById(Integer featureId) throws FindByIdException {
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
    public FeatureResponseDTO update(FeatureRequestDTO featureRequestDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar característica por ID");
        if (!featureRepository.existsById(featureRequestDTO.getId())) {
            throw new FindByIdException("No existe una característica con el id ingresado");
        }
        Feature feature = featureRepository.findById(featureRequestDTO.getId()).get();
        feature.setTitle(featureRequestDTO.getTitle());
        feature.setType(featureRequestDTO.getType());
        logger.debug("Terminó la ejecución del método actualizar característica por ID");
        return featureRepository.save(feature).toDto();
    }

    public FeatureResponseDTO updateProducts(Integer featureId, Integer productId) throws FindByIdException {
        logger.debug("Iniciando método actualizar característica por ID");
        if (!featureRepository.existsById(featureId)) {
            throw new FindByIdException("No existe una característica con nuevo producto");
        }
        Feature feature = featureRepository.findById(featureId).get();
        Set<Product> products = feature.getProducts();
        Product product = productService.findById(productId).toEntity();
        product.setId(productId);
        products.add(product);
        feature.setProducts(products);
        logger.debug("Terminó la ejecución del método actualizar característica con nuevo producto");
        return featureRepository.save(feature).toDto();
    }

    public Set<FeatureResponseDTO> findByProduct(Product product) {
        logger.debug("Iniciando método buscar lista de características asociadas a un producto");
        Set<Feature> featuresFound =  featureRepository.findAll().stream().filter(feature -> feature.getProducts().contains(product)).collect(Collectors.toSet());
        logger.debug("Terminó la ejecución del método buscar lista de características asociadas a un producto");
        return featuresFound.stream().map(Feature::toDto).collect(Collectors.toSet());
    }
}