package com.proyecto.integrador.persistence.entity;

import com.proyecto.integrador.DTO.CityDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "city")
public class City {
    @Id
    @Column(name = "idCity", nullable = false)
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "country", nullable = false)
    private String country;
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL)
    private Set<Product> products;

    public City() {
    }

    public City(Integer id) {
        this.id = id;
    }

    public City(Integer id, String name, String country) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.products = new HashSet<>();
    }

    public CityDTO toDto() {
        CityDTO cityDTO = new CityDTO();
        cityDTO.setId(id);
        cityDTO.setName(name);
        cityDTO.setCountry(country);
        return cityDTO;
    }
}
