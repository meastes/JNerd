package com.jnerd.boot.rest.dto.user;

import io.swagger.annotations.ApiModelProperty;

/**
 * DTO for holding login response data.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class LoginResponseDTO {

    @ApiModelProperty(required = true)
    private String token;

    public LoginResponseDTO(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
