package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.persistence.entity.Category;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.repository.ICategoryRepository;
import com.proyecto.integrador.service.ICategoryService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class CategoryServiceImpl implements ICategoryService {
    private final Logger logger = Logger.getLogger(CategoryServiceImpl.class);

    @Autowired
    ICategoryRepository categoryRepository;

    @Override
    public List<CategoryDTO> findAll() {
        logger.debug("Iniciando método buscar todas las categorías");
        List<CategoryDTO> categories = new ArrayList<>();
        for (Category c: categoryRepository.findAll()) {
            categories.add(c.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todas las categorías");
        return categories;
    }

    @Override
    public CategoryDTO save(CategoryDTO category) {
        logger.debug("Iniciando método guardar categoria");
        logger.debug("Terminó la ejecución del método guardar categoría");
        return Optional.of(categoryRepository.save(category.toEntity())).get().toDto();
    }

    @Override
    public CategoryDTO findById(Integer categoryId) throws FindByIdException {
        logger.debug("Iniciando método buscar categoria por ID");
        if (!categoryRepository.existsById(categoryId)) {
            throw new FindByIdException("No existe una categoría con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método buscar categoría por ID");
        return categoryRepository.findById(categoryId).get().toDto();
    }

    @Override
    public void deleteById(Integer categoryId) throws FindByIdException {
        logger.debug("Iniciando método eliminar categoria por ID");
        if (!categoryRepository.existsById(categoryId)) {
            throw new FindByIdException("No existe una categoría con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar categoría por ID");
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public CategoryDTO update(CategoryDTO categoryDTO) throws FindByIdException {
        logger.debug("Iniciando método actualizar categoria por ID");
        if (!categoryRepository.existsById(categoryDTO.getId())) {
            throw new FindByIdException("No existe una categoría con el id ingresado");
        }
        Category category = categoryRepository.findById(categoryDTO.getId()).get();
        category.setTitle(categoryDTO.getTitle());
        category.setDescription(categoryDTO.getDescription());
        category.setUrl(categoryDTO.getUrl());
        logger.debug("Terminó la ejecución del método actualizar categoría por ID");
        return categoryRepository.save(category).toDto();
    }

    public CategoryDTO categoryExistsInDatabase(String categoryName) throws BadRequestException {
        logger.debug("Iniciando método corroborando si existe categoría en la base de datos");
        if (categoryRepository.findByTitle(categoryName) == null) {
            throw new BadRequestException("La categoría ingresada no existe en la base de datos");
        }
        logger.debug("Terminó la ejecución del método corroborando si existe la categoría en la base de datos");
        return categoryRepository.findByTitle(categoryName).toDto();
    }
}
