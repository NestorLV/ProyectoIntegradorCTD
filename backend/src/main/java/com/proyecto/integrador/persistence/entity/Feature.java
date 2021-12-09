package com.proyecto.integrador.persistence.entity;

import com.proyecto.integrador.DTO.FeatureResponseDTO;
import com.proyecto.integrador.persistence.entity.enums.FeatureTypes;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name = "feature")
public class Feature {
    @Id
    @Column(name = "idFeature", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "type", nullable = false)
    private FeatureTypes type;
    @ManyToMany(targetEntity = Product.class, cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(
            name = "featurePerProduct",
            joinColumns = @JoinColumn(name = "idFeature"),
            inverseJoinColumns = @JoinColumn(name = "idProduct")
    )
    private Set<Product> products = new HashSet<>();

    public Feature() {
    }

    public Feature(Integer id, String title, boolean state, FeatureTypes type) {
        this.id = id;
        this.title = title;
        this.type = type;
    }

    private List<Integer> responseDTO() {
        List<Integer> productIds = new ArrayList<>();
        for (Product product: products) {
            productIds.add(product.getId());
        }
        return productIds;
    }

    public FeatureResponseDTO toDto() {
        FeatureResponseDTO featureDTO = new FeatureResponseDTO();
        featureDTO.setId(id);
        featureDTO.setTitle(title);
        featureDTO.setType(type);
        featureDTO.setProductIds(responseDTO());
        return featureDTO;
    }
}