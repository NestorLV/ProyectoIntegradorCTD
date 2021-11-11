package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.controller.CategoryController;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.service.ICategoryService;
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
public class CategoryServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private ICategoryService categoryService;

    @InjectMocks
    private CategoryController categoryController;

    private CategoryDTO category;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(categoryController).setControllerAdvice(GlobalException.class).build();
        category = new CategoryDTO (12,"Hotel","Hotel 3 estrellas","https://unsplash.com/photos/MXbM1NrRqtI");
        configureMockito();
    }

    public void configureMockito() throws FindByIdException {
        Mockito.when(categoryService.save(category)).thenReturn(category);
        Mockito.when(categoryService.findById(12)).thenReturn(category);
        Mockito.when(categoryService.update(category)).thenReturn(category);
        Mockito.when(categoryService.findAll()).thenReturn(List.of(category));
        doThrow(new FindByIdException("No existe ninguna categoria con el id ingresado")).when(categoryService).deleteById(10);
    }

    @Test
    public void testAgregarCategoria() {
        CategoryDTO c = categoryService.save(category);
        Assertions.assertEquals(category,c);
    }

    @Test
    public void testActualizarCategoria() throws FindByIdException {
        category.setTitle("test 1");
        CategoryDTO c = categoryService.update(category);
        Assertions.assertEquals(category,c);
    }

    @Test
    public void testBuscarCategoria() throws FindByIdException {
        CategoryDTO c = categoryService.findById(12);
        Assertions.assertEquals(category,c);
    }

    @Test
    public void testBuscarTodasLasCategorias() {
        List<CategoryDTO> categories = categoryService.findAll();
        Assertions.assertEquals(List.of(category),categories);
    }

    @Test
    public void testEliminarCategoria() {
        Assertions.assertThrows(FindByIdException.class, () -> categoryService.deleteById(10));
    }
}
