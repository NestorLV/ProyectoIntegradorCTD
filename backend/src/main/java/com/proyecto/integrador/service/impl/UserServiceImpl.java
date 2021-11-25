package com.proyecto.integrador.service.impl;


import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.DTO.UserRequestDTO;
import com.proyecto.integrador.DTO.UserResponseDTO;
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
    ScoreServiceImpl scoreService;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    JwtTokenUtil jwtTokenUtil;
    @Autowired
    EmailSenderService emailSenderService;


    @Override
    public List<UserResponseDTO> findAll() throws FindByIdException {
        logger.debug("Iniciando método buscar todos los usuarios");
        List<UserResponseDTO> userList = new ArrayList<>();
        for (User user: userRepository.findAll()) {
            userList.add(user.toDto());
        }
        logger.debug("Terminó la ejecución del método buscar todos los usuarios");
        return userList;
    }

    @Override
    public UserResponseDTO save(UserRequestDTO userRequestDTO) throws FindByIdException, BadRequestException {
        logger.debug("Iniciando método guardar usuario");
        if (userRepository.findByEmail(userRequestDTO.getEmail()).isPresent()) {
            throw new BadRequestException("Ya hay un usuario creado con el email ingresado");
        }
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(userRequestDTO.getPassword());
        userRequestDTO.setPassword(encodedPassword);
        userRequestDTO.setRole(roleService.findByName(RolesTypes.USER));
        User newUser = userRepository.save(userRequestDTO.toEntity());
        emailSenderService.sendSimpleMessage(newUser.getEmail(),"Activa tu usuario","http://localhost:8080/users/activate/"+newUser.getEmail()+"/"+newUser.hashCode());
        logger.debug("Terminó la ejecución del método guardar usuario");
        return newUser.toDto();
    }

    public String activateUser(String email, Integer hashCode) throws BadRequestException, FindByIdException {
        String message = "El link es inválido, no se pudo activar el usuario";
        if (userRepository.findByEmail(email).isEmpty()) {
            throw new BadRequestException("El usuario no está logueado");
        }
        if (userRepository.findByEmail(email).hashCode() == hashCode) {
            update(email);
            message = "El usuario con email " + email + " se activó correctamente";
        }
        return message;
    }

    @Override
    public UserResponseDTO findById(Integer idUsers) throws FindByIdException {
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
    public UserResponseDTO update(String email) throws FindByIdException {
        logger.debug("Iniciando método actualizar usuario");
        if (userRepository.findByEmail(email).isEmpty()) {
            throw new FindByIdException("No existe una usuario con el email ingresado");
        }
        User user = userRepository.findByEmail(email).get();
        user.setActivation(true);
        logger.debug("Terminó la ejecución del método actualizar usuario");
        return userRepository.save(user).toDto();
    }

    @Override
    public List<ProductDTO> getFavorites(String email) throws FindByIdException, BadRequestException {
        UserResponseDTO user = findByEmail(email);
        if (user == null) {
            throw new BadRequestException("El usuario no está logueado");
        }

        List<ScoreDTO> scores = scoreService.findAll();
        List<ScoreDTO> scoresByUser=new ArrayList<>();

        for (ScoreDTO score: scores){
            if(score.getUserEmail().equals(email)){
                scoresByUser.add(score);
            }
        }

        List<ProductDTO> favouriteProducts= new ArrayList<>();

        for (ScoreDTO score:scoresByUser){
            if(score.getFavourite()){
                favouriteProducts.add(productService.findById(score.getProductId()));
            }
        }

        return favouriteProducts;

    }

    @Override
    public ScoreDTO saveFavorite(String email, Integer idProduct) throws FindByIdException, BadRequestException {
        UserResponseDTO user = findByEmail(email);
        if (user == null) {
            throw new BadRequestException("El usuario no está logueado");
        }
        ProductDTO product = productService.findById(idProduct);

        if (product==null) {
            throw new FindByIdException("No existe un producto con el id ingresado");
        }
        List<ScoreDTO> scores = scoreService.findAll();
        List<ScoreDTO> scoresByUser=new ArrayList<>();

        for (ScoreDTO score: scores){
            if(score.getUserEmail().equals(email)){
                scoresByUser.add(score);
            }
        }

        ScoreDTO scoresByProductAndUser= null;
        if(scoresByUser!= null){
            for (ScoreDTO score:scoresByUser) {
                if(score.getProductId()==idProduct){
                    scoresByProductAndUser = score;
                }
            }
        }

        if(scoresByProductAndUser==null){
            scoresByProductAndUser=scoreService.save(new ScoreDTO(email, idProduct, true));
        }else{
            scoresByProductAndUser.setFavourite(!scoresByProductAndUser.getFavourite());
            scoreService.update(scoresByProductAndUser);
        }

        return scoresByProductAndUser;
    }


    public UserResponseDTO findByEmail(String email) {
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
    public Map<String, String> validateLogIn(UserRequestDTO userRequestDTO) throws BadRequestException {
        Map<String, String> datos = new HashMap<>();
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Optional<User> user= userRepository.findByEmail(userRequestDTO.getEmail());

        if (user.isEmpty()) {
            throw new BadRequestException("El email y/o contraseña son inválidos, no existen en la base de datos");
        }
        if(!passwordEncoder.matches(userRequestDTO.getPassword(), user.get().getPassword())){
            throw new BadRequestException("El email y/o contraseña son inválidos, no existen en la base de datos");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername("javainuse");
        datos.put("id", user.get().getId().toString());
        datos.put("name",user.get().getName());
        datos.put("surname", user.get().getSurname());
        datos.put("token", jwtTokenUtil.generateToken(userDetails));
        datos.put("activation", user.get().isActivation()?"true":"false");
        return datos;
    }
}
