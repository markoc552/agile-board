package com.administrator.controller;


import com.administrator.exceptions.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = {RequestException.class})
    protected ResponseEntity<Object> handleRequestException(RequestException ex) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {UserNotFoundException.class, UserAlreadyExistsException.class})
    protected ResponseEntity<Object> handleUserException(Exception ex) {

        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
