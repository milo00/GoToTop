package com.example.GoToTop.exceptions;

public class NegativeValuesException extends RuntimeException {
    String message;

    public NegativeValuesException(String message) {
        super(message);
        this.message = message;
    }

    public NegativeValuesException() {

    }
}