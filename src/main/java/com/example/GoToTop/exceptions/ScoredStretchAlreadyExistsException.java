package com.example.GoToTop.exceptions;

public class ScoredStretchAlreadyExistsException extends RuntimeException {
    private String message;

    public ScoredStretchAlreadyExistsException(String message) {
        super(message);
        this.message = message;
    }
    public ScoredStretchAlreadyExistsException() {
    }
}