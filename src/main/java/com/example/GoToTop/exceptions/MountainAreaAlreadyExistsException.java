package com.example.GoToTop.exceptions;

public class MountainAreaAlreadyExistsException extends RuntimeException {
    private String message;

    public MountainAreaAlreadyExistsException(String message) {
        super(message);
        this.message = message;
    }
    public MountainAreaAlreadyExistsException() {
    }
}