package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.controller.CategoryController;
import com.proyecto.integrador.controller.CityController;
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
public class CityIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private CityController cityController;

    public void cargarDatos() {
        cityController.create(new CityDTO ("Córdoba","Argentina"));
        cityController.create(new CityDTO ("La Pampa","Argentina"));
    }

    @Test
    public void crearCiudad() throws Exception {
        CityDTO payloadDTO = new CityDTO ("Córdoba","Argentina");
        CityDTO responseDTO = new CityDTO (3,"Córdoba","Argentina");

        ObjectWriter writer = new ObjectMapper()
                .configure(SerializationFeature.WRAP_ROOT_VALUE, false)
                .writer();

        String cityEntity = writer.writeValueAsString(payloadDTO);
        String cityExpectedResponse = writer.writeValueAsString(responseDTO);

        MvcResult response = mvc.perform(MockMvcRequestBuilders.post("/cities/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(cityEntity))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andReturn();
        Assert.assertEquals(cityExpectedResponse, response.getResponse().getContentAsString());
    }

    @Test
    public void buscarTodasLasCiudades() throws Exception {
        this.cargarDatos();
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/cities/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarCiudadPorId() throws Exception {
        this.cargarDatos();
        ResultActions response = mvc.perform(MockMvcRequestBuilders.get("/cities/get/{id}", 2)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assert.assertNotNull(response);
    }

    @Test
    public void buscarCiudadPorIdNoExistente() throws Exception {
        this.cargarDatos();
        mvc.perform(MockMvcRequestBuilders.get("/cities/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
