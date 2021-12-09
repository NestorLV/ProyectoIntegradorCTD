package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.ImageDTO;
import com.proyecto.integrador.DTO.ScoreDTO;
import com.proyecto.integrador.controller.ImageController;
import com.proyecto.integrador.controller.ScoreController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.service.IImageService;
import com.proyecto.integrador.service.IScoreService;
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
@WebMvcTest(ScoreController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ScoreServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private IScoreService scoreService;

    @InjectMocks
    private ScoreController scoreController;

    private ScoreDTO score;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(scoreController).setControllerAdvice(GlobalException.class).build();
        score = new ScoreDTO(1,5,"example@gmail.com",1);
        configureMockito();
    }

    public void configureMockito() throws FindByIdException, BadRequestException {
        Mockito.when(scoreService.save(score)).thenReturn(score);
        Mockito.when(scoreService.findById(1)).thenReturn(score);
        Mockito.when(scoreService.update(score)).thenReturn(score);
        Mockito.when(scoreService.findAll()).thenReturn(List.of(score));
    }

    @Test
    public void testAgregarScore() throws FindByIdException, BadRequestException {
        ScoreDTO i = scoreService.save(score);
        Assertions.assertEquals(score,i);
    }

    @Test
    public void testActualizarScore() throws FindByIdException {
        score.setScore(3);
        ScoreDTO i = scoreService.update(score);
        Assertions.assertEquals(score,i);
    }

    @Test
    public void testBuscarScore() throws FindByIdException {
        ScoreDTO i = scoreService.findById(1);
        Assertions.assertEquals(score,i);
    }

    @Test
    public void testBuscarTodosLosScores() throws FindByIdException {
        List<ScoreDTO> scores = scoreService.findAll();
        Assertions.assertEquals(List.of(score),scores);
    }
}
