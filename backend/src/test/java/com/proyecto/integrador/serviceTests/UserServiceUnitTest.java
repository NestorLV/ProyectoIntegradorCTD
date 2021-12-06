package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.ReservationDTO;
import com.proyecto.integrador.DTO.RoleDTO;
import com.proyecto.integrador.DTO.UserRequestDTO;
import com.proyecto.integrador.DTO.UserResponseDTO;
import com.proyecto.integrador.controller.ReservationController;
import com.proyecto.integrador.controller.UserController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.persistence.entity.enums.RolesTypes;
import com.proyecto.integrador.service.IReservationService;
import com.proyecto.integrador.service.IUserService;
import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class UserServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private IUserService userService;

    @InjectMocks
    private UserController userController;
    private UserRequestDTO userRequest;
    private UserResponseDTO userResponse;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(userController).setControllerAdvice(GlobalException.class).build();
        userRequest = new UserRequestDTO(1,"Lalo","Landa","lalolanda@example.com","1234", new RoleDTO(RolesTypes.USER));
        userResponse = new UserResponseDTO(1,"Lalo","Landa","lalolanda@example.com",true, RolesTypes.USER);
        configureMockito();
    }

    public void configureMockito() throws FindByIdException, BadRequestException {
        Mockito.when(userService.save(userRequest)).thenReturn(userResponse);
        Mockito.when(userService.findById(3)).thenReturn(userResponse);
        Mockito.when(userService.findAll()).thenReturn(List.of(userResponse));
        doThrow(new FindByIdException("No existe ningún usuario con el id ingresado")).when(userService).deleteById(10);
    }

    @Test
    public void testAgregarUsuario() throws FindByIdException, BadRequestException {
        UserResponseDTO p = userService.save(userRequest);
        Assertions.assertEquals(userResponse,p);
    }

    @Test
    public void testBuscarUsuarioPorId() throws FindByIdException {
        UserResponseDTO p = userService.findById(3);
        Assertions.assertEquals(userResponse,p);
    }

    @Test
    public void testBuscarTodosLosUsuarios() throws FindByIdException {
        List<UserResponseDTO> users = userService.findAll();
        Assertions.assertEquals(List.of(userResponse),users);
    }

    @Test
    public void testEliminarUsuario() {
        Assertions.assertThrows(FindByIdException.class, () -> userService.deleteById(10));
    }
}
