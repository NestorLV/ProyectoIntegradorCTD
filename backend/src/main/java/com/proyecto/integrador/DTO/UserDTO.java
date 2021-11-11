package com.proyecto.integrador.DTO;


import com.proyecto.integrador.persistence.entity.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserDTO {
    private Integer id;
    private String name;
    private String email;
    private List<ProductDTO> products = new ArrayList<>();

    public User toEntity(){
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setEmail(email);
        return user;
    }
}
