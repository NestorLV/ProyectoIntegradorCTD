package com.proyecto.integrador.DTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.proyecto.integrador.persistence.entity.Role;
import com.proyecto.integrador.persistence.entity.User;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserRequestDTO {
    private Integer id;
    private String name;
    private String surname;
    private String email;
    private String password;
    private RoleDTO role;
    private List<ProductDTO> favoriteProducts = new ArrayList<>();

    public User toEntity(){
        User user = new User();
        user.setName(name);
        user.setSurname(surname);
        user.setEmail(email);
        user.setPassword(password);
        user.setRole(role.toEntity());
        return user;
    }
}
