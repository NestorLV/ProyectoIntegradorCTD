package com.proyecto.integrador.DTO;

import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.entity.enums.FeatureTypes;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FeatureResponseDTO {
    private Integer id;
    private String title;
    private FeatureTypes type;
    private List<Integer> productIds = new ArrayList<>();

    public FeatureResponseDTO() {
    }

}
