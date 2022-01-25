package com.example.GoToTop.exceptions;

public class ScoredStretchNotFoundException extends RuntimeException{
    private String message;

    public ScoredStretchNotFoundException(String message) {
        super(message);
        this.message = message;
    }
    public ScoredStretchNotFoundException() {
    }


}
