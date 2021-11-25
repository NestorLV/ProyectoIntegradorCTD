package com.proyecto.integrador.DTO;

import com.proyecto.integrador.persistence.entity.City;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CityDTO {
    private Integer id;
    private String name;
    private String country;

    public CityDTO() {
    }

    public CityDTO(Integer id) {
        this.id = id;
    }

    public CityDTO(String name, String country) {
        this.name = name;
        this.country = country;
    }

    public CityDTO(Integer id, String name, String country) {
        this.id = id;
        this.name = name;
        this.country = country;
    }

    public City toEntity() {
        City city = new City();
        city.setName(name);
        city.setCountry(country);
        return city;
    }
}

