package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.controller.CategoryController;
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
public class CategoryIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private CategoryController categoryController;

    public void cargarDatos() {
        categoryController.create(new CategoryDTO("Apart Hotels", "500.012", "http://exampleimage.com"));
        categoryController.create(new CategoryDTO("Cabañas", "340.123", "http://exampleimage2.com"));
    }

    @Test
    public void crearCategory() throws Exception {
        CategoryDTO payloadDTO = new CategoryDTO("Apart Hotels", "500.012", "http://exampleimage.com");
        CategoryDTO responseDTO = new CategoryDTO(5,"Apart Hotels", "500.012", "http://exampleimage.com");

        ObjectWriter writer = new ObjectMapper()
                .configure(SerializationFeature.WRAP_ROOT_VALUE, false)
                .writer();

        String categoryEntity = writer.writeValueAsString(payloadDTO);
        String categoryExpectedResponse = writer.writeValueAsString(responseDTO);

        MvcResult response = mvc.perform(MockMvcRequestBuilders.post("/categories/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(categoryEntity))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andReturn();
        Assert.assertEquals(categoryExpectedResponse, response.getResponse().getContentAsString());
    }

    @Test
    public void buscarTodasLasCategorias() throws Exception {
        this.cargarDatos();
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/categories/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarCategoriaPorId() throws Exception {
        this.cargarDatos();
        ResultActions response = mvc.perform(MockMvcRequestBuilders.get("/categories/get/{id}", 2)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assert.assertNotNull(response);
    }

    @Test
    public void buscarCategoriaPorIdNoExistente() throws Exception {
        this.cargarDatos();
        mvc.perform(MockMvcRequestBuilders.get("/categories/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
