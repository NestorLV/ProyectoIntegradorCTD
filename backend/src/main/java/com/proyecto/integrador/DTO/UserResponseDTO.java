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
}
