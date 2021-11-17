package com.proyecto.integrador.persistence.entity;

import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.DTO.ReservationDTO;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="reservation")


public class Reservation {
    @Id
    @Column(name="idReservation")
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="arrivalSchedule", nullable = false)
    private String arrivalSchedule;
    @Column(name="startDate", nullable = false, length = 2000)
    private String startDate;
    @Column(name="endDate", nullable = false)
    private String endDate;
    @ManyToOne
    @JoinColumn(name = "idProduct", nullable = false)
    private Product product;
    @ManyToOne
    @JoinColumn(name = "idUser", nullable = false)
    private User user ;

    public Reservation() {
    }

    public Reservation(Integer id, String arrivalSchedule, String startDate, String endDate, Product product, User user) {
        this.id = id;
        this.arrivalSchedule = arrivalSchedule;
        this.startDate = startDate;
        this.endDate = endDate;
        this.product = product;
        this.user = user;
    }

    public ReservationDTO toDto() {
        ReservationDTO reservationDTO = new ReservationDTO();
        reservationDTO.setId(id);
        reservationDTO.setArrivalSchedule(arrivalSchedule);
        reservationDTO.setStartDate(startDate);
        reservationDTO.setEndDate(endDate);
        reservationDTO.setProductId(product.getId());
        reservationDTO.setUserId(user.getId());
        return reservationDTO;
    }
}
