package com.proyecto.integrador.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserResponseDTO {
    private Integer id;
    private String name;
    private String surname;
    private String email;
    private boolean activation;
    private RolesTypes role;
    private Set<ProductDTO> favoriteProducts = new HashSet<>();

    public UserResponseDTO() {}
    public UserResponseDTO(Integer id, String name, String surname, String email, boolean activation, RolesTypes role) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.activation = activation;
        this.role = role;
    }
}
