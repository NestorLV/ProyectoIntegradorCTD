package com.proyecto.integrador.service;

import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface ICategoryService extends IBookingService<CategoryDTO> {
    List<CategoryDTO> findAll();
    CategoryDTO save(CategoryDTO category);
    CategoryDTO findById(Integer categoryId) throws FindByIdException;
    void deleteById(Integer categoryId) throws FindByIdException;
    CategoryDTO update(CategoryDTO category) throws FindByIdException;
}
