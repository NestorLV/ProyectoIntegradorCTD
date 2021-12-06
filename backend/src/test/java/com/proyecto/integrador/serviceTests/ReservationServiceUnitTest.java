package com.proyecto.integrador.serviceTests;
import com.proyecto.integrador.DTO.CategoryDTO;
import com.proyecto.integrador.DTO.CityDTO;
import com.proyecto.integrador.DTO.ProductDTO;
import com.proyecto.integrador.DTO.ReservationDTO;
import com.proyecto.integrador.controller.ProductController;
import com.proyecto.integrador.controller.ReservationController;
import com.proyecto.integrador.exceptions.BadRequestException;
import com.proyecto.integrador.exceptions.FindByIdException;
import com.proyecto.integrador.exceptions.GlobalException;
import com.proyecto.integrador.service.IProductService;
import com.proyecto.integrador.service.IReservationService;
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
@WebMvcTest(ReservationController.class)
@AutoConfigureMockMvc(addFilters = false)
@TestMethodOrder(MethodOrderer.MethodName.class)
public class ReservationServiceUnitTest {
    private MockMvc mockMvc;
    @Mock
    private IReservationService reservationService;

    @InjectMocks
    private ReservationController reservationController;

    private ReservationDTO reservation;

    @Before
    public void reset() throws Exception{
        mockMvc = MockMvcBuilders.standaloneSetup(reservationController).setControllerAdvice(GlobalException.class).build();
        reservation = new ReservationDTO (1,"10:30",new Date(2021,10,03), new Date(2021,10,13),1,1);
        configureMockito();
    }

    public void configureMockito() throws FindByIdException {
        Mockito.when(reservationService.save(reservation)).thenReturn(reservation);
        Mockito.when(reservationService.findById(3)).thenReturn(reservation);
        Mockito.when(reservationService.update(reservation)).thenReturn(reservation);
        Mockito.when(reservationService.findAll()).thenReturn(List.of(reservation));
        doThrow(new FindByIdException("No existe ninguna reserva con el id ingresado")).when(reservationService).deleteById(10);
    }

    @Test
    public void testAgregarReserva() throws FindByIdException {
        ReservationDTO p = reservationService.save(reservation);
        Assertions.assertEquals(reservation,p);
    }

    @Test
    public void testActualizarReserva() throws FindByIdException {
        reservation.setArrivalSchedule("11:00");
        ReservationDTO p = reservationService.update(reservation);
        Assertions.assertEquals(reservation,p);
    }

    @Test
    public void testBuscarReservaPorId() throws FindByIdException {
        ReservationDTO p = reservationService.findById(3);
        Assertions.assertEquals(reservation,p);
    }

    @Test
    public void testBuscarTodasLasReservaciones() {
        List<ReservationDTO> reservations = reservationService.findAll();
        Assertions.assertEquals(List.of(reservation),reservations);
    }

    @Test
    public void testEliminarReserva() {
        Assertions.assertThrows(FindByIdException.class, () -> reservationService.deleteById(10));
    }
}
