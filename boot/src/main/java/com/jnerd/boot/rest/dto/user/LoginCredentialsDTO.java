package com.jnerd.boot.rest.dto.user;

/**
 * Transfer object for login data.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class LoginCredentialsDTO {
    private String username;
    private String password;
    private boolean remember;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isRemember() {
        return remember;
    }

    public void setRemember(boolean remember) {
        this.remember = remember;
    }
}
