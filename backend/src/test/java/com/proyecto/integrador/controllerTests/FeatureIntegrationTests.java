package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.*;
import com.proyecto.integrador.controller.FeatureController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.enums.FeatureTypes;
import com.proyecto.integrador.service.impl.CategoryServiceImpl;
import com.proyecto.integrador.service.impl.CityServiceImpl;
import com.proyecto.integrador.service.impl.ProductServiceImpl;
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

import java.util.List;
import java.util.Set;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@AutoConfigureTestDatabase
public class FeatureIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private FeatureController featureController;
    @Autowired
    private ProductServiceImpl productServiceImpl;
    @Autowired
    private CategoryServiceImpl categoryServiceImpl;
    @Autowired
    private CityServiceImpl cityServiceImpl;

    public void cargarDatos() throws FindByIdException, BadRequestException {
        CategoryDTO categoryDTO = categoryServiceImpl.save(new CategoryDTO(1,"Apart Hotels", "500.012", "http://examplefeature.com"));
        CityDTO cityDTO = cityServiceImpl.save(new CityDTO (1,"Córdoba","Argentina"));
        ProductDTO product1 = productServiceImpl.save(new ProductDTO(1,"Hotel Plaza","Hotel 5 estrellas",123.45,143.67,"Calle Falsa 123, CABA",9,"En el centro",categoryDTO,cityDTO,"rules","health","politics"));
        ProductDTO product2 = productServiceImpl.save(new ProductDTO(2,"Hotel Laguna","Hotel 5 estrellas",123.45,143.67,"Calle Falsa 123, CABA",9,"En el centro",categoryDTO,cityDTO,"rules","health","politics"));
        featureController.create(new FeatureRequestDTO("wifi",FeatureTypes.wifi, Set.of(product1.toEntity(),product2.toEntity())));
        featureController.create(new FeatureRequestDTO ("kitchen", FeatureTypes.kitchen, Set.of(product1.toEntity(),product2.toEntity())));
    }

    @Test
    public void buscarTodasLasCaracterísticas() throws Exception {
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/features/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarCaracterísticaPorIdNoExistente() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/features/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
