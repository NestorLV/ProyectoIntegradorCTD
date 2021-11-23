package com.proyecto.integrador.service.impl;


import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.UserDTO;
import com.proyecto.integrador.config.jwt.JwtTokenUtil;
import com.proyecto.integrador.config.jwt.JwtUserDetailsService;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.User;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import com.proyecto.integrador.persistence.repository.IUserRepository;
import com.proyecto.integrador.service.IUserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserServiceImpl implements UserDetailsService, IUserService {
    private final Logger logger = Logger.getLogger(UserServiceImpl.class);
    @Autowired
    IUserRepository userRepository;
    @Autowired
    ProductServiceImpl productService;
    @Autowired
    RoleServiceImpl roleService;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    JwtTokenUtil jwtTokenUtil;


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
    public UserDTO save(UserDTO userDTO) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método guardar usuario");
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new BadRequestException("Ya hay un usuario creado con el email ingresado");
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(userDTO.getPassword());
        userDTO.setPassword(encodedPassword);
        userDTO.setRole(roleService.findByName(RolesTypes.USER));
        logger.debug("Terminó la ejecución del método guardar usuario");
        return userRepository.save(userDTO.toEntity()).toDto();
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
    public List<ProductDTO> getFavorites(String email) throws FindByIdException, BadRequestException {
        return productService.findFavorites(email);
    }

    public UserDTO findByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("El email no matchea con ningún usuario en la base de datos"));
        return user.toDto();
    }

    public boolean isFavourite(ProductDTO productDTO) {
        return false;
        /*if (findByEmail()) --> Validar usuario y filtrar los favoritos del usuario */
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("El email no matchea con ningún usuario en la base de datos"));
    }

    // Agregar más validaciones y ver lo del UserDTO RequestBody
    @Override
    public Map<String, String> validateLogIn(UserDTO userDTO) throws BadRequestException {
        Map<String, String> datos = new HashMap<>();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Optional<User> user= userRepository.findByEmail(userDTO.getEmail());

        if (user.isEmpty()) {
            throw new BadRequestException("El email y/o contraseña son inválidos, no existen en la base de datos");
        }
        if(!passwordEncoder.matches(userDTO.getPassword(), user.get().getPassword())){
            throw new BadRequestException("El email y/o contraseña son inválidos, no existen en la base de datos");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername("javainuse");
        datos.put("id", user.get().getId().toString());
        datos.put("name",user.get().getName());
        datos.put("surname", user.get().getSurname());
        datos.put("token", jwtTokenUtil.generateToken(userDetails));
        return datos;
    }
}
