package com.proyecto.integrador.controllerTests;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.proyecto.integrador.DTO.*;
import com.proyecto.integrador.controller.UserController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import com.proyecto.integrador.service.impl.CategoryServiceImpl;
import com.proyecto.integrador.service.impl.CityServiceImpl;
import com.proyecto.integrador.service.impl.RoleServiceImpl;
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
public class UserIntegrationTests {

    @Autowired
    private MockMvc mvc;
    @Autowired
    private UserController userController;
    @Autowired
    private RoleServiceImpl roleService;

    public void cargarDatos() throws FindByIdException, BadRequestException {
        RoleDTO role = roleService.save(new RoleDTO(RolesTypes.USER));
        userController.create(new UserRequestDTO("Lalo","Landa","tatyluna74@gmail.com","1234",role));
        userController.create(new UserRequestDTO("Lalo2","Landa2","tatianalunarincon@gmail.com","1234", role));
    }

    @Test
    public void crearUser() throws Exception {
        UserRequestDTO payloadDTO = new UserRequestDTO("Lalo2","Landa2","tatianalunarincon@hotmail.com","1234", roleService.findByName(RolesTypes.USER));
        UserResponseDTO responseDTO = new UserResponseDTO(3,"Lalo2","Landa2","tatianalunarincon@hotmail.com",false, RolesTypes.USER);

        ObjectWriter writer = new ObjectMapper()
                .configure(SerializationFeature.WRAP_ROOT_VALUE, false)
                .writer();

        String userEntity = writer.writeValueAsString(payloadDTO);
        String userExpectedResponse = writer.writeValueAsString(responseDTO);

        MvcResult response = mvc.perform(MockMvcRequestBuilders.post("/users/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userEntity))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andReturn();
        Assert.assertEquals(userExpectedResponse, response.getResponse().getContentAsString());
    }

    @Test
    public void buscarTodosLosUseres() throws Exception {
        MvcResult response = mvc.perform(MockMvcRequestBuilders.get("/users/all")
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
        Assert.assertFalse(response.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void buscarUserPorId() throws Exception {
        ResultActions response = mvc.perform(MockMvcRequestBuilders.get("/users/get/{id}", 2)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk());
        Assert.assertNotNull(response);
    }

    @Test
    public void buscarUserPorIdNoExistente() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get("/users/get/{id}", 30)
                        .accept(MediaType.APPLICATION_JSON))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

}
