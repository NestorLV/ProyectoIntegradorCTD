package com.proyecto.integrador.DTO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@ToString
public class FilterDTO {
    private Integer cityId;
    private Date startDate;
    private Date endDate;
    private String category;

    public FilterDTO(Integer cityId, Date startDate, Date endDate, String category) {
        this.cityId = cityId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
    }
}
