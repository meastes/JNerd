package com.jnerd.boot.rest.dto;

/**
 * DTO indicating whether an operation was sucessful.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class SuccessDTO {
    private boolean success;

    public SuccessDTO(boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
