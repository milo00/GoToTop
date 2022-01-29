package com.example.GoToTop.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Arrays;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = ScoredStretchAlreadyExistsException.class)
    public ResponseEntity scoredStretchAlreadyExistsException(ScoredStretchAlreadyExistsException scoredStretchAlreadyExistsException) {
        return new ResponseEntity<>(scoredStretchAlreadyExistsException.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(value = ScoredStretchNotFoundException.class)
    public ResponseEntity scoredStretchNotFoundException(ScoredStretchNotFoundException scoredStretchNotFoundException) {
        return new ResponseEntity<>(scoredStretchNotFoundException.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = MountainAreaNotFoundException.class)
    public ResponseEntity mountainAreaNotFoundException(MountainAreaNotFoundException mountainAreaNotFoundException) {
        return new ResponseEntity<>(mountainAreaNotFoundException.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = ScoredStretchConflictException.class)
    public ResponseEntity scoredStretchIllegalOperationException(ScoredStretchConflictException scoredStretchConflictException) {
        return new ResponseEntity<>(scoredStretchConflictException.getMessage(), HttpStatus.CONFLICT);
    }


    @ExceptionHandler(value = Exception.class)
    public ResponseEntity databaseConnectionFailsException(Exception exception) {
        System.out.println(exception.getMessage());
        System.out.println(Arrays.toString(exception.getStackTrace()));
        return new ResponseEntity<>("Connectivity lost", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
