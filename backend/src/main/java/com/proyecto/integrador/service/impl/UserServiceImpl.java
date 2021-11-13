package com.proyecto.integrador.service.impl;


import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.UserDTO;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.entity.User;
import com.proyecto.integrador.persistence.repository.IUserRepository;
import com.proyecto.integrador.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements IUserService {
    private final Logger logger = Logger.getLogger(UserServiceImpl.class);
    @Autowired
    IUserRepository userRepository;
    @Autowired
    ProductServiceImpl productService;

    @Override
    public List<UserDTO> findAll() throws FindByIdException {
        logger.debug("Iniciando método buscar todos los usuarios");
        List<UserDTO> userList = new ArrayList<>();
        for (User user: userRepository.findAll()) {
            userList.add(user.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todos los usuarios");
        return userList;
    }

    @Override
    public UserDTO save(UserDTO user) throws FindByIdException {
        logger.debug("Iniciando método guardar usuario");
        logger.debug("Terminó la ejecución del método guardar usuario");
        return userRepository.save(user.toEntity()).toDto();
    }

    @Override
    public UserDTO findById(Integer idUsers) throws FindByIdException {
        logger.debug("Iniciando método buscar producto por ID");
        if (!userRepository.existsById(idUsers)) {
            throw new FindByIdException("No existe un usuario con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método buscar usuario por ID");
        return userRepository.findById(idUsers).get().toDto();
    }

    @Override
    public void deleteById(Integer idUsers) throws FindByIdException {
        logger.debug("Iniciando método eliminar usuario por ID");
        if (!userRepository.existsById(idUsers)) {
            throw new FindByIdException("No existe un usuario con el id ingresado");
        }
        logger.debug("Terminó la ejecución del método eliminar usuario por ID");
        userRepository.deleteById(idUsers);
    }

    @Override
    public UserDTO update(UserDTO user) throws FindByIdException {
        logger.debug("Iniciando método actualizar producto");
        if (!userRepository.existsById(user.getId())) {
            throw new FindByIdException("No existe una usuario con el id ingresado");
        }
        User user1 = userRepository.findById(user.getId()).get();
        user1.setId(user.getId());
        user1.setName(user.getName());
        user1.setEmail(user.getEmail());
        logger.debug("Terminó la ejecución del método actualizar usuario");
        return userRepository.save(user1).toDto();
    }

    @Override
    public List<ProductDTO> getFavorites(String email) throws FindByIdException {
        return productService.findFavorites();
    }

    public UserDTO findByEmail(String email) {
        return userRepository.findByEmail(email).toDto();
    }


    public boolean isFavourite(ProductDTO productDTO) {
        return false;
        /*if (findByEmail()) --> Validar usuario y filtrar los favoritos del usuario */
    }
}
