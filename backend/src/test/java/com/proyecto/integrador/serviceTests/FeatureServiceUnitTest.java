package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.FeatureRequestDTO;
import com.proyecto.integrador.DTO.FeatureResponseDTO;
import com.proyecto.integrador.controller.CategoryController;
import com.proyecto.integrador.controller.FeatureController;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.persistence.entity.Product;
import com.proyecto.integrador.persistence.entity.enums.FeatureTypes;
import com.proyecto.integrador.service.IFeatureService;
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

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.mockito.Mockito.doThrow;

@RunWith(MockitoJUnitRunner.class)
@WebMvcTest(FeatureController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class FeatureServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private IFeatureService featureService;

    @InjectMocks
    private FeatureController featureController;
    private FeatureRequestDTO featureRequest;
    private FeatureResponseDTO featureResponse;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(featureController).setControllerAdvice(GlobalException.class).build();
        Set<Product> products = new HashSet<>();
        products.add(new Product(1));
        featureRequest = new FeatureRequestDTO(1,"wifi", FeatureTypes.wifi,products);
        List<Integer> productIds = new ArrayList<>();
        productIds.add(1);
        featureResponse = new FeatureResponseDTO(1,"wifi", FeatureTypes.wifi, productIds);
        configureMockito();
    }

    public void configureMockito() throws FindByIdException {
        Mockito.when(featureService.save(featureRequest)).thenReturn(featureResponse);
        Mockito.when(featureService.findById(1)).thenReturn(featureResponse);
        Mockito.when(featureService.findAll()).thenReturn(List.of(featureResponse));
        doThrow(new FindByIdException("No existe ninguna característica con el id ingresado")).when(featureService).deleteById(10);
    }

    @Test
    public void testAgregarCaracteristica() throws FindByIdException {
        FeatureResponseDTO c = featureService.save(featureRequest);
        Assertions.assertEquals(featureResponse,c);
    }

    @Test
    public void testBuscarCaracteristica() throws FindByIdException {
        FeatureResponseDTO c = featureService.findById(1);
        Assertions.assertEquals(featureResponse,c);
    }

    @Test
    public void testBuscarTodasLasCaracteristica() {
        List<FeatureResponseDTO> cities = featureService.findAll();
        Assertions.assertEquals(List.of(featureResponse),cities);
    }

    @Test
    public void testEliminarCaracteristica() {
        Assertions.assertThrows(FindByIdException.class, () -> featureService.deleteById(10));
    }
}
