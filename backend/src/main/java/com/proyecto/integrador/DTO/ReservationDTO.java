package com.proyecto.integrador.DTO;

import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.entity.Reservation;
import com.proyecto.integrador.persistence.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class ReservationDTO {
    private Integer id;
    private String arrivalSchedule;
    private Date startDate;
    private Date endDate;
    private Integer productId;
    private Integer userId;

    public ReservationDTO() {
    }

    public ReservationDTO(String arrivalSchedule, Date startDate, Date endDate, Integer productId, Integer userId) {
        this.arrivalSchedule = arrivalSchedule;
        this.startDate = startDate;
        this.endDate = endDate;
        this.productId = productId;
        this.userId = userId;
    }

    public ReservationDTO(Integer id, String arrivalSchedule, Date startDate, Date endDate, Integer productId, Integer userId) {
        this.id = id;
        this.arrivalSchedule = arrivalSchedule;
        this.startDate = startDate;
        this.endDate = endDate;
        this.productId = productId;
        this.userId = userId;
    }

    public Reservation toEntity() {
        Reservation reservation = new Reservation();
        reservation.setArrivalSchedule(arrivalSchedule);
        reservation.setStartDate(startDate);
        reservation.setEndDate(endDate);
        reservation.setProduct(new Product(productId));
        reservation.setUser(new User(userId));
        return reservation;
    }
}
