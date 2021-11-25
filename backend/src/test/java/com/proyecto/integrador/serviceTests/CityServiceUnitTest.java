package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.controller.CategoryController;
import com.proyecto.integrador.controller.CityController;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.service.ICityService;
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

import java.util.List;

import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(CategoryController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class CityServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private ICityService cityService;

    @InjectMocks
    private CityController cityController;

    private CityDTO city;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(cityController).setControllerAdvice(GlobalException.class).build();
        city = new CityDTO (1,"Córdoba","Argentina");
        configureMockito();
    }

    public void configureMockito() throws FindByIdException {
        Mockito.when(cityService.save(city)).thenReturn(city);
        Mockito.when(cityService.findById(1)).thenReturn(city);
        Mockito.when(cityService.update(city)).thenReturn(city);
        Mockito.when(cityService.findAll()).thenReturn(List.of(city));
        doThrow(new FindByIdException("No existe ninguna ciudad con el id ingresado")).when(cityService).deleteById(10);
    }

    @Test
    public void testAgregarCiudad() {
        CityDTO c = cityService.save(city);
        Assertions.assertEquals(city,c);
    }

    @Test
    public void testActualizarCiudad() throws FindByIdException {
        city.setName("Villa La Angostura");
        CityDTO c = cityService.update(city);
        Assertions.assertEquals(city,c);
    }

    @Test
    public void testBuscarCiudad() throws FindByIdException {
        CityDTO c = cityService.findById(1);
        Assertions.assertEquals(city,c);
    }

    @Test
    public void testBuscarTodasLasCiudad() {
        List<CityDTO> cities = cityService.findAll();
        Assertions.assertEquals(List.of(city),cities);
    }

    @Test
    public void testEliminarCiudad() {
        Assertions.assertThrows(FindByIdException.class, () -> cityService.deleteById(10));
    }
}
