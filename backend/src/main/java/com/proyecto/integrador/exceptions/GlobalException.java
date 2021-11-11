package com.proyecto.integrador.exceptions;
import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {
    private final Logger logger = Logger.getLogger(GlobalException.class);

    @ExceptionHandler({FindByIdException.class})
    public ResponseEntity<String> procesarErrorNotFoundById(FindByIdException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<String> procesarErrorBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler({UnauthorizedAccessException.class})
    public ResponseEntity<String> procesarErrorPermisoNoAutorizadoException(UnauthorizedAccessException ex) {
        logger.error(ex.getMessage() + ", " +  ex.operation);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}
