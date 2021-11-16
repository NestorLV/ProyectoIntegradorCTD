package com.proyecto.integrador.DTO;


import com.proyecto.integrador.persistence.entity.Role;
import com.proyecto.integrador.persistence.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private RoleDTO role;
    private List<ProductDTO> favoriteProducts = new ArrayList<>();

    public User toEntity(){
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(new Role(role.getName()));
        return user;
    }
}
