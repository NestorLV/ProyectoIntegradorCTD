package com.proyecto.integrador.DTO;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class FilterDTO {
    private Integer cityId;
    private Date startDate;
    private Date endDate;

    public FilterDTO(Integer cityId, Date startDate, Date endDate) {
        this.cityId = cityId;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
