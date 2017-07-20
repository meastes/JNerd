package com.jnerd.boot.rest.dto.hello;

/**
 * DTO for hello REST endpoints.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class HelloDTO {

    private String message;

    public HelloDTO(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
