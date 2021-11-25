package com.proyecto.integrador.service;

import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface IBookingService<T> {
    List<T> findAll() throws FindByIdException;
    T save(T t) throws FindByIdException;
    T findById(Integer id) throws FindByIdException;
    void deleteById(Integer id) throws FindByIdException;
    T update(T t) throws FindByIdException;
}
