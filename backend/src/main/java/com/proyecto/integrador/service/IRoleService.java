package com.proyecto.integrador.service;

import com.proyecto.integrador.DTO.RoleDTO;
import com.proyecto.integrador.exceptions.FindByIdException;

import java.util.List;

public interface IRoleService extends IBookingService<RoleDTO>{
    List<RoleDTO> findAll();
    RoleDTO save(RoleDTO role);
    RoleDTO findById(Integer roleId) throws FindByIdException;
    void deleteById(Integer roleId) throws FindByIdException;
    RoleDTO update(RoleDTO role) throws FindByIdException;
    RoleDTO findByName(String name);
}
