package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.controller.CategoryController;
import com.proyecto.integrador.controller.CityController;
import com.proyecto.integrador.controller.ImageController;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.service.ICityService;
import com.proyecto.integrador.service.IImageService;
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
@WebMvcTest(ImageController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ImageServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private IImageService imageService;

    @InjectMocks
    private ImageController imageController;

    private ImageDTO image;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(imageController).setControllerAdvice(GlobalException.class).build();
        image = new ImageDTO (2, "image1","http://image1.com",1);
        configureMockito();
    }

    public void configureMockito() throws FindByIdException {
        Mockito.when(imageService.save(image)).thenReturn(image);
        Mockito.when(imageService.findById(2)).thenReturn(image);
        Mockito.when(imageService.update(image)).thenReturn(image);
        Mockito.when(imageService.findAll()).thenReturn(List.of(image));
        doThrow(new FindByIdException("No existe ninguna imagen con el id ingresado")).when(imageService).deleteById(10);
    }

    @Test
    public void testAgregarImagen() throws FindByIdException {
        ImageDTO i = imageService.save(image);
        Assertions.assertEquals(image,i);
    }

    @Test
    public void testActualizarImagen() throws FindByIdException {
        image.setTitle("imagen2");
        ImageDTO i = imageService.update(image);
        Assertions.assertEquals(image,i);
    }

    @Test
    public void testBuscarImagen() throws FindByIdException {
        ImageDTO i = imageService.findById(2);
        Assertions.assertEquals(image,i);
    }

    @Test
    public void testBuscarTodasLasImagenes() {
        List<ImageDTO> images = imageService.findAll();
        Assertions.assertEquals(List.of(image),images);
    }

    @Test
    public void testEliminarImagen() {
        Assertions.assertThrows(FindByIdException.class, () -> imageService.deleteById(10));
    }
}
