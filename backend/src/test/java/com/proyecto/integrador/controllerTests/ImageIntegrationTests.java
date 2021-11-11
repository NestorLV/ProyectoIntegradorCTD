package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.controller.ImageController;
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
public class ImageIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ImageController imageController;
    @Autowired
    private ProductServiceImpl productServiceImpl;
    @Autowired
    private CategoryServiceImpl categoryServiceImpl;
    @Autowired
    private CityServiceImpl cityServiceImpl;

    public void cargarDatos() throws FindByIdException {
        CategoryDTO categoryDTO = categoryServiceImpl.save(new CategoryDTO(1,"Apart Hotels", "500.012", "http://exampleimage.com"));
        CityDTO cityDTO = cityServiceImpl.save(new CityDTO (1,"Córdoba","Argentina"));
        ProductDTO productDTO = productServiceImpl.save(new ProductDTO(1,"Hotel Plaza","Hotel 5 estrellas",123.45,143.67,"Calle Falsa 123, CABA",9,false,0,"En el centro",categoryDTO,cityDTO,"rules","health","politics"));
        imageController.create(new ImageDTO("image1","http://image1.com", productDTO.getId()));
        imageController.create(new ImageDTO ("image2","http://image2.com", productDTO.getId()));
    }

    @Test
    public void crearImagen() throws Exception {
        ImageDTO payloadDTO = new ImageDTO ("image1","http://image1.com",1);
        ImageDTO responseDTO = new ImageDTO (5,"image1","http://image1.com",1);

        ObjectWriter writer = new ObjectMapper()
                .configure(SerializationFeature.WRAP_ROOT_VALUE, false)
                .writer();

        String imageEntity = writer.writeValueAsString(payloadDTO);
        String imageExpectedResponse = writer.writeValueAsString(responseDTO);

        MvcResult response = mvc.perform(MockMvcRequestBuilders.post("/images/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(imageEntity))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andReturn();
        Assert.assertEquals(imageExpectedResponse, response.getResponse().getContentAsString());
    }

    @Test
    public void buscarTodasLasImagenes() throws Exception {
        this.cargarDatos();
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/images/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarImagenPorId() throws Exception {
        this.cargarDatos();
        ResultActions response = mvc.perform(MockMvcRequestBuilders.get("/images/get/{id}", 2)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assert.assertNotNull(response);
    }

    @Test
    public void buscarImagenPorIdNoExistente() throws Exception {
        this.cargarDatos();
        mvc.perform(MockMvcRequestBuilders.get("/images/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
