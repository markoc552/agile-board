package agile.central.controllers;


import agile.central.exceptions.*;
import org.bouncycastle.openssl.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import java.io.*;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = { IOException.class,
                                StorageException.class,
                                EncryptionException.class})
    protected ResponseEntity<Object> handleUserException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = { ConstraintViolationException.class,
                                CommentAlreadyExistsException.class,
                                CommentNotFoundException.class,
                                TaskAlreadyExistsException.class,
                                TaskNotFoundException.class,
                                ComponentAlreadyExistsException.class,
                                ComponentNotFoundException.class })
    protected ResponseEntity<Object> handleConstraintViolationException(ConstraintViolationException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
