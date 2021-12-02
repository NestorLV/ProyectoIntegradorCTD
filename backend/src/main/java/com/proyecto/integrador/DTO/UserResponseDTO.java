package com.proyecto.integrador.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class UserResponseDTO {
    private Integer id;
    private String name;
    private String surname;
    private String email;
    private boolean activation;
    private RolesTypes role;
    // Agregar favoritos o eliminar este atributo
    @JsonIgnore
    private List<ProductDTO> favoriteProducts = new ArrayList<>();
}
