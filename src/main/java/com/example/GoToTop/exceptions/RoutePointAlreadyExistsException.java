package com.example.GoToTop.exceptions;

public class RoutePointAlreadyExistsException extends RuntimeException {
    private String message;

    public RoutePointAlreadyExistsException(String message) {
        super(message);
        this.message = message;
    }
    public RoutePointAlreadyExistsException() {
    }
}