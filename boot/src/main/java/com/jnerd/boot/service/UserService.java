package com.jnerd.boot.service;

import com.jnerd.boot.repository.UserRepository;
import com.jnerd.boot.model.user.User;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

/**
 * Service to handle logic for creating, modifying, and updating users.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Service
@Transactional
public class UserService {

    private static final Log LOG = LogFactory.getLog(UserService.class);

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;

    @Inject
    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public User createUser(String username, String password, String email) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setEmail(email);
        user.setActivationKey(RandomStringUtils.randomAlphanumeric(User.ACTIVATION_KEY_LENGTH));
        this.userRepository.save(user);
        LOG.debug(String.format("User %s was successfully created.", username));

        return user;
    }

    public void activateUser(User user) {
        user.setActivated(true);
        this.userRepository.save(user);
        LOG.debug(String.format("User %s was successfully activated.", user.getUsername()));
    }

    public void generateResetPasswordKey(User user) {
        user.setPasswordResetKey(RandomStringUtils.randomAlphanumeric(User.PASSWORD_RESET_KEY_LENGTH));
        this.userRepository.save(user);
        LOG.debug(String.format("User %s was generated a password reset key.", user.getUsername()));
    }

    public void updatePassword(User user, String password) {
        user.setPassword(passwordEncoder.encode(password));
        user.setPasswordResetKey(null);
        this.userRepository.save(user);
        LOG.debug(String.format("User %s password was changed succesfully.", user.getUsername()));
    }

}
