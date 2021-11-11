package com.proyecto.integrador.DTO;
import com.proyecto.integrador.persistence.entity.Feature;
import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.entity.enums.FeatureTypes;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@Getter
@Setter
public class FeatureDTO {
    private Integer id;
    private String title;
    private FeatureTypes type;
    private Set<Product> products = new HashSet<>();

    public FeatureDTO() {
    }

    public FeatureDTO(Integer id, String title, boolean state, FeatureTypes type) {
        this.id = id;
        this.title = title;
        this.type = type;
    }

    public FeatureDTO(String title, boolean state, FeatureTypes type) {
        this.title = title;
        this.type = type;
    }

    public Feature toEntity (){
        Feature feature = new Feature();
        feature.setTitle(title);
        feature.setType(type);
        feature.setProducts(products);
        return feature;
    }
}

