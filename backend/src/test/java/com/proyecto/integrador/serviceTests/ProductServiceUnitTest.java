package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.controller.CategoryController;
import com.proyecto.integrador.controller.CityController;
import com.proyecto.integrador.controller.ProductController;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.service.ICityService;
import com.proyecto.integrador.service.IProductService;
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
@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ProductServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private IProductService productService;

    @InjectMocks
    private ProductController productController;

    private ProductDTO product;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(productController).setControllerAdvice(GlobalException.class).build();
        product = new ProductDTO (3,"Hotel Plaza","Hotel 5 estrellas",123.45,143.67,"Calle Falsa 123, CABA",9,false,0,"En el centro",new CategoryDTO(1),new CityDTO(1),"rules","health","politics");
        configureMockito();
    }

    public void configureMockito() throws FindByIdException {
        Mockito.when(productService.save(product)).thenReturn(product);
        Mockito.when(productService.findById(3)).thenReturn(product);
        Mockito.when(productService.update(product)).thenReturn(product);
        Mockito.when(productService.findAll()).thenReturn(List.of(product));
        doThrow(new FindByIdException("No existe ningún producto con el id ingresado")).when(productService).deleteById(10);
    }

    @Test
    public void testAgregarProducto() throws FindByIdException {
        ProductDTO p = productService.save(product);
        Assertions.assertEquals(product,p);
    }

    @Test
    public void testActualizarProducto() throws FindByIdException {
        product.setName("Hotel Savoy");
        ProductDTO p = productService.update(product);
        Assertions.assertEquals(product,p);
    }

    @Test
    public void testBuscarProducto() throws FindByIdException {
        ProductDTO p = productService.findById(3);
        Assertions.assertEquals(product,p);
    }

    @Test
    public void testBuscarTodosLosProductos() throws FindByIdException {
        List<ProductDTO> products = productService.findAll();
        Assertions.assertEquals(List.of(product),products);
    }

    @Test
    public void testEliminarProducto() {
        Assertions.assertThrows(FindByIdException.class, () -> productService.deleteById(10));
    }
}
