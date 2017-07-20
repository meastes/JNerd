package com.jnerd.boot.model.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jnerd.boot.model.AuditableEntity;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

/**
 * Model representing a user.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Entity
public class User extends AuditableEntity {

    public static final int ACTIVATION_KEY_LENGTH = 20;
    public static final int PASSWORD_RESET_KEY_LENGTH = 20;

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String username;

    @JsonIgnore
    @NotNull
    @Size(min = 60, max = 60)
    @Column(length = 60)
    private String password;

    @NotNull
    @Email
    @Size(max = 100)
    @Column(length = 100, unique = true, nullable = false)
    private String email;

    @NotNull
    @Column(nullable = false)
    private boolean activated;

    @Size(max = ACTIVATION_KEY_LENGTH)
    @Column(length = ACTIVATION_KEY_LENGTH)
    @JsonIgnore
    private String activationKey;

    @Size(max = PASSWORD_RESET_KEY_LENGTH)
    @Column(length = PASSWORD_RESET_KEY_LENGTH)
    @JsonIgnore
    private String passwordResetKey;

    @JsonIgnore
    @ManyToMany
    @JoinTable(joinColumns = {@JoinColumn(referencedColumnName = "id")}, inverseJoinColumns = {@JoinColumn(referencedColumnName = "name")})
    private Set<Authority> authorities = new HashSet<>();

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getPasswordResetKey() {
        return passwordResetKey;
    }

    public void setPasswordResetKey(String passwordResetKey) {
        this.passwordResetKey = passwordResetKey;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }
}
