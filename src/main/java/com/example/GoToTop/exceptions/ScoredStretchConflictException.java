package com.example.GoToTop.exceptions;

public class ScoredStretchConflictException extends RuntimeException {
    private String message;

    public ScoredStretchConflictException(String message) {
        super(message);
        this.message = message;
    }
    public ScoredStretchConflictException() {
    }
}
