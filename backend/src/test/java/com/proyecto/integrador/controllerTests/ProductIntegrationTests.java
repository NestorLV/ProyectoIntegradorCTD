package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.controller.ImageController;
import com.proyecto.integrador.controller.ProductController;
import com.proyecto.integrador.exceptions.FindByIdException;
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

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc(addFilters = false)
@SpringBootTest
@AutoConfigureTestDatabase
public class ProductIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ProductController productController;
    @Autowired
    private CategoryServiceImpl categoryServiceImpl;
    @Autowired
    private CityServiceImpl cityServiceImpl;

    public void cargarDatos() throws FindByIdException {
        CategoryDTO categoryDTO = categoryServiceImpl.save(new CategoryDTO(1,"Apart Hotels", "500.012", "http://exampleproduct.com"));
        CityDTO cityDTO = cityServiceImpl.save(new CityDTO (1,"Merlo","Argentina"));
        productController.create(new ProductDTO("Hotel Plaza","Hotel 5 estrellas",236.45,256.67,"Calle Falsa 123, CABA",9,false,0,"En el centro",categoryDTO,cityDTO,"rules","health","politics"));
        productController.create(new ProductDTO("Hotel New World","Hotel 3 estrellas",543.45,143.67,"Calle Falsa 123, CABA",7,false,0,"Lejos del centro",categoryDTO,cityDTO,"rules","health","politics"));
    }

    @Test
    public void crearProducto() throws Exception {
        CategoryDTO categoryDTO = categoryServiceImpl.save(new CategoryDTO(1,"Apart Hotels", "500.012", "http://exampleproduct.com"));
        CityDTO cityDTO = cityServiceImpl.save(new CityDTO (1,"Merlo","Argentina"));
        ProductDTO payloadDTO = new ProductDTO("Hotel Plaza","Hotel 5 estrellas",236.45,256.67,"Calle Falsa 123, CABA",9,false,0,"En el centro",categoryDTO,cityDTO,"rules","health","politics");
        ProductDTO responseDTO = new ProductDTO(1,"Hotel Plaza","Hotel 5 estrellas",236.45,256.67,"Calle Falsa 123, CABA",9,false,0,"En el centro",categoryDTO,cityDTO,"rules","health","politics");

        ObjectWriter writer = new ObjectMapper()
                .configure(SerializationFeature.WRAP_ROOT_VALUE, false)
                .writer();

        String productEntity = writer.writeValueAsString(payloadDTO);
        String productExpectedResponse = writer.writeValueAsString(responseDTO);

        MvcResult response = mvc.perform(MockMvcRequestBuilders.post("/products/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(productEntity))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andReturn();
        Assert.assertEquals(productExpectedResponse, response.getResponse().getContentAsString());
    }

    @Test
    public void buscarTodosLosProductoes() throws Exception {
        this.cargarDatos();
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/products/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarProductoPorId() throws Exception {
        this.cargarDatos();
        ResultActions response = mvc.perform(MockMvcRequestBuilders.get("/products/get/{id}", 2)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assert.assertNotNull(response);
    }

    @Test
    public void buscarProductoPorIdNoExistente() throws Exception {
        this.cargarDatos();
        mvc.perform(MockMvcRequestBuilders.get("/products/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
