package com.jnerd.boot.rest.dto.user;

/**
 * Data transfer object for a password reset.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class PasswordResetDTO {
    private String resetKey;
    private String password;

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
