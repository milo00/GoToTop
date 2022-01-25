package com.example.GoToTop.exceptions;

public class MountainAreaNotFoundException extends RuntimeException {
    String message;

    public MountainAreaNotFoundException(String message) {
        super(message);
        this.message = message;
    }

    public MountainAreaNotFoundException() {

    }
}
