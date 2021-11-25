package com.proyecto.integrador.controller;

import com.proyecto.integrador.service.impl.EmailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/email")
public class EmailSenderController {
    private final EmailSenderService emailSenderService;

    @Autowired
    public EmailSenderController(EmailSenderService emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/verificacion/{email}/{subject}/{body}")
    public ResponseEntity<?> guardar(@PathVariable String email,
                                     @PathVariable String subject,
                                     @PathVariable String body) {

        emailSenderService.sendSimpleMessage(email , subject, body);
        //logger.debug("Operación exitosa de creado de reserva");
        return ResponseEntity.ok("Email Enviado satisfactoriamente");
    }
}
