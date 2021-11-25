package com.proyecto.integrador.DTO;

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
    private List<ProductDTO> favoriteProducts = new ArrayList<>();
}
