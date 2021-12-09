package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.*;
import com.proyecto.integrador.controller.ReservationController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import com.proyecto.integrador.service.impl.CategoryServiceImpl;
import com.proyecto.integrador.service.impl.CityServiceImpl;
import com.proyecto.integrador.service.impl.ProductServiceImpl;
import com.proyecto.integrador.service.impl.UserServiceImpl;
import com.proyecto.integrador.util.DatesConverter;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDate;
import java.util.Date;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@AutoConfigureTestDatabase
public class ReservationIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ReservationController reservationController;
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private CategoryServiceImpl categoryService;
    @Autowired
    private CityServiceImpl cityService;

    public void cargarDatos() throws FindByIdException, BadRequestException {
        CategoryDTO categoryDTO = categoryService.save(new CategoryDTO(1,"Apart Hotels", "500.012", "http://exampleproduct.com"));
        CityDTO cityDTO = cityService.save(new CityDTO (1,"Merlo","Argentina"));
        ProductDTO product = productService.save(new ProductDTO("Hotel Lolandia","Hotel 5 estrellas",142.45,520.67,"Calle Falsa 123, CABA",5,"En el centro",categoryDTO,cityDTO,"rules","health","politics"));
        UserResponseDTO user = userService.save(new UserRequestDTO("Lalo","Landa","tatyluna74@gmail.com","1234", new RoleDTO(RolesTypes.USER)));
        reservationController.create(new ReservationDTO("10:30",DatesConverter.convertLocalDateToSqlDate(LocalDate.of(2021,10,03)), DatesConverter.convertLocalDateToSqlDate(LocalDate.of(2021,10,13)),product.getId(),user.getId()));
        reservationController.create(new ReservationDTO("11:30",DatesConverter.convertLocalDateToSqlDate(LocalDate.of(2021,10,13)), DatesConverter.convertLocalDateToSqlDate(LocalDate.of(2021,10,23)),product.getId(),user.getId()));
    }

    @Test
    public void buscarTodasLasReservas() throws Exception {
        this.cargarDatos();
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/reservations/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarReservaPorId() throws Exception {
        ResultActions response = mvc.perform(MockMvcRequestBuilders.get("/reservations/get/{id}", 2)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assert.assertNotNull(response);
    }

    @Test
    public void buscarReservaPorIdNoExistente() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/reservations/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
