package com.proyecto.integrador.controller;

import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.UnauthorizedAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

public interface CRUDController<T> {
    ResponseEntity<?> getAll() throws FindByIdException, UnauthorizedAccessException;

    ResponseEntity<?> create(@RequestBody T t) throws FindByIdException, UnauthorizedAccessException, BadRequestException;

    ResponseEntity<?> getById(@PathVariable Integer id) throws FindByIdException, UnauthorizedAccessException;

    ResponseEntity<?> updateById(@RequestBody T t) throws FindByIdException, UnauthorizedAccessException;

    ResponseEntity<String> deleteById(@PathVariable Integer id) throws FindByIdException, UnauthorizedAccessException;
}
