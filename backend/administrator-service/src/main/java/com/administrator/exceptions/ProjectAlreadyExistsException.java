package com.administrator.exceptions;

public class ProjectAlreadyExistsException extends Exception {


    public ProjectAlreadyExistsException() {
        super();
    }

    public ProjectAlreadyExistsException(String message) {
        super(message);
    }

}
