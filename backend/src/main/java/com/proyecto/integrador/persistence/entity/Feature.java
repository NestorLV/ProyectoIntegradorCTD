package com.proyecto.integrador.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.proyecto.integrador.DTO.FeatureDTO;
import com.proyecto.integrador.persistence.entity.enums.FeatureTypes;
import io.swagger.v3.oas.models.tags.Tag;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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

    public FeatureDTO toDto() {
        FeatureDTO featureDTO = new FeatureDTO();
        featureDTO.setId(id);
        featureDTO.setTitle(title);
        featureDTO.setType(type);
        return featureDTO;
    }
}