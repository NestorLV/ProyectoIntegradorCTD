package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.*;
import com.proyecto.integrador.controller.ScoreController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import com.proyecto.integrador.service.impl.*;
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

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@AutoConfigureTestDatabase
public class ScoreIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ScoreController scoreController;
    @Autowired
    private RoleServiceImpl roleServiceImpl;
    @Autowired
    private UserServiceImpl userServiceImpl;
    @Autowired
    private CategoryServiceImpl categoryServiceImpl;
    @Autowired
    private CityServiceImpl cityServiceImpl;
    @Autowired
    private ProductServiceImpl productServiceImpl;

    public void cargarDatos() throws FindByIdException, BadRequestException {
        CategoryDTO categoryDTO = categoryServiceImpl.save(new CategoryDTO(1,"Apart Hotels", "500.012", "http://exampleproduct.com"));
        CityDTO cityDTO = cityServiceImpl.save(new CityDTO (1,"Merlo","Argentina"));
        productServiceImpl.save(new ProductDTO("Hotel Plaza","Hotel 5 estrellas",236.45,256.67,"Calle Falsa 123, CABA",9,"En el centro",categoryDTO,cityDTO,"rules","health","politics"));
        productServiceImpl.save(new ProductDTO("Hotel New World","Hotel 3 estrellas",543.45,143.67,"Calle Falsa 123, CABA",7,"Lejos del centro",categoryDTO,cityDTO,"rules","health","politics"));
        userServiceImpl.save(new UserRequestDTO(1,"Lalo","Landa","tatyluna74@gmail.com","1234", new RoleDTO(RolesTypes.USER)));
        scoreController.create(new ScoreDTO(5,"tatyluna74@gmail.com",1));
        scoreController.create(new ScoreDTO(3,"tatyluna74@gmail.com",2));
    }

    @Test
    public void buscarTodosLosScores() throws Exception {
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/products/scores/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarScorePorIdNoExistente() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/products/scores/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
