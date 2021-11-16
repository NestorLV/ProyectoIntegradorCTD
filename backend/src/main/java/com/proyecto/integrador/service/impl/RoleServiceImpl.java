package com.proyecto.integrador.service.impl;

import com.proyecto.integrador.DTO.RoleDTO;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Role;
import com.proyecto.integrador.persistence.repository.IRoleRepository;
import com.proyecto.integrador.service.IRoleService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleServiceImpl implements IRoleService {
    private final Logger logger = Logger.getLogger(UserServiceImpl.class);
    @Autowired
    IRoleRepository roleRepository;


    @Override
    public List<RoleDTO> findAll() {
        logger.debug("Iniciando método buscar todos los roles");
        List<RoleDTO> roleList = new ArrayList<>();
        for (Role role: roleRepository.findAll()) {
            roleList.add(role.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todos los usuarios");
        return roleList;
    }

    @Override
    public RoleDTO save(RoleDTO role) {
        return null;
    }

    @Override
    public RoleDTO findById(Integer roleId) throws FindByIdException {
        return null;
    }

    @Override
    public void deleteById(Integer roleId) throws FindByIdException {

    }

    @Override
    public RoleDTO update(RoleDTO role) throws FindByIdException {
        return null;
    }

    @Override
    public RoleDTO findByName(String name) {
        return roleRepository.findByName(name).toDto();
    }
}
