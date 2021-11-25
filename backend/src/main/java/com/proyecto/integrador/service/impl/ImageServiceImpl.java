package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.persistence.entity.Image;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.repository.IImageRepository;
import com.proyecto.integrador.service.IImageService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ImageServiceImpl implements IImageService {
    private final Logger logger = Logger.getLogger(ImageServiceImpl.class);

    @Autowired
    IImageRepository imageRepository;

    @Override
    public List<ImageDTO> findAll() {
        logger.debug("Iniciando método buscar todas las imágenes");
        List<ImageDTO> images = new ArrayList<>();
        for (Image i: imageRepository.findAll()) {
            images.add(i.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las imágenes");
        return images;
    }

    @Override
    public ImageDTO save(ImageDTO image) throws FindByIdException {
        logger.debug("Iniciando método guardar imagen");
        logger.debug("Terminó la ejecución del método guardar imagen");
        return Optional.of(imageRepository.save(image.toEntity())).get().toDto();
    }

    @Override
    public ImageDTO findById(Integer imageId) throws FindByIdException {
        logger.debug("Iniciando método buscar imagen por ID");
        if (!imageRepository.existsById(imageId)) {
            throw new FindByIdException("No existe una imagen con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método buscar imagen por ID");
        return imageRepository.findById(imageId).get().toDto();
    }

    @Override
    public void deleteById(Integer imageId) throws FindByIdException {
        logger.debug("Iniciando método eliminar imagen por ID");
        if (!imageRepository.existsById(imageId)) {
            throw new FindByIdException("No existe una imagen con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar imagen por ID");
        imageRepository.deleteById(imageId);
    }

    @Override
    public ImageDTO update(ImageDTO imageDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar imagen por ID");
        if (!imageRepository.existsById(imageDTO.getId())) {
            throw new FindByIdException("No existe una imagen con el id ingresado");
        }
        Image image = imageRepository.findById(imageDTO.getId()).get();
        image.setTitle(imageDTO.getTitle());
        image.setUrl(imageDTO.getUrl());
        image.getProduct().setId(imageDTO.getProductId());
        logger.debug("Terminó la ejecución del método actualizar imagen por ID");
        return imageRepository.save(image).toDto();
    }

    public Set<ImageDTO> findByProductId(Integer productId) {
        logger.debug("Iniciando método buscar imágenes asociados al producto");
        logger.debug("Terminó la ejecución del método buscar imágenes asociados al producto");
        return imageRepository.findByProduct_Id(productId).stream().map(Image::toDto).collect(Collectors.toSet());
    }

}