package com.proyecto.integrador.exceptions;
import org.apache.log4j.Logger;
import org.springdoc.api.ErrorMessage;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;


@ControllerAdvice
public class GlobalException extends ResponseEntityExceptionHandler {
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

    @Override
    protected ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.error(ex.getMessage() + " " +  headers + " " + status + " " + request);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("El método http que está intentando utilizar no es soportado por la aplicación, verifique que sea el correcto y vuelva a intentarlo");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public final ResponseEntity<ErrorMessage> handleAccessDeniedException() {
        ErrorMessage errorDetails = new ErrorMessage("No tiene permisos para acceder a este recurso");
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationCredentialsNotFoundException.class)
    public final ResponseEntity<ErrorMessage> procesarErrorTokenNoEncontrado() {
        ErrorMessage errorDetails = new ErrorMessage("No se ha encontrado token para ser validado");
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }
}
