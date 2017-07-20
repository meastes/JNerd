package com.jnerd.boot.rest.controller;

import com.jnerd.boot.model.user.User;
import com.jnerd.boot.repository.UserRepository;
import com.jnerd.boot.rest.dto.RestErrorDTO;
import com.jnerd.boot.rest.dto.SuccessDTO;
import com.jnerd.boot.rest.dto.user.LoginCredentialsDTO;
import com.jnerd.boot.rest.dto.user.LoginResponseDTO;
import com.jnerd.boot.rest.dto.user.PasswordResetDTO;
import com.jnerd.boot.rest.dto.user.RegisterDTO;
import com.jnerd.boot.security.JwtAuthorizor;
import com.jnerd.boot.service.MailService;
import com.jnerd.boot.service.UserService;
import com.jnerd.boot.util.RestUtils;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;

/**
 * Controller for handling user requests.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    private static final Log LOG = LogFactory.getLog(UserController.class);

    private UserService userService;
    private MailService mailService;
    private UserRepository userRepository;
    private JwtAuthorizor jwtAuthorizor;
    private AuthenticationManager authenticationManager;
    private RestUtils restUtils;

    @Inject
    public UserController(UserService userService, MailService mailService, UserRepository userRepository, JwtAuthorizor jwtAuthorizor,
                          AuthenticationManager authenticationManager, RestUtils restUtils) {
        this.userService = userService;
        this.mailService = mailService;
        this.userRepository = userRepository;
        this.jwtAuthorizor = jwtAuthorizor;
        this.authenticationManager = authenticationManager;
        this.restUtils = restUtils;
    }

    @ApiOperation(value = "Logs a user in",
                  notes = "Will attempt to log the user in. If unsuccessful, will return a 401 error.")
    @ApiResponses(value = {
            @ApiResponse(code = 200, response = LoginResponseDTO.class, message = "User login was successful"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Failed to log the user in")
    })
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody LoginCredentialsDTO loginCredentials) {
        try {
            Authentication authenticate =
                    this.authenticationManager.authenticate(
                            new UsernamePasswordAuthenticationToken(loginCredentials.getUsername(), loginCredentials.getPassword())
                    );
            boolean activated = this.userRepository.findOneByUsername(loginCredentials.getUsername()).map(User::isActivated).orElse(false);
            if (!activated) {
                LOG.debug(String.format("%s is not activated and can't be logged in.", loginCredentials.getUsername()));
                return this.restUtils.getErrorResponse("activated", "User is not activated");
            }
            String token = this.jwtAuthorizor.generateToken(
                    authenticate.getName(),
                    authenticate.getAuthorities(),
                    loginCredentials.isRemember()
            );
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (BadCredentialsException e) {
            return this.restUtils.getErrorResponse("loginValid", "Invalid username/password combination");
        }
    }

    @ApiOperation(value = "Refreshes a users token",
            notes = "Returns a new token with a fresh expiration date. Requires a valid, non-expired token.")
    @RequestMapping(value = "/refresh", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, response = LoginResponseDTO.class, message = "Token was updated successfully"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Could not validate existing token")
    })
    public ResponseEntity<?> refresh(@RequestHeader("Authorization") String tokenHeader) {
        if (tokenHeader != null && tokenHeader.startsWith(JwtAuthorizor.AUTH_HEADER_PREFIX)) {
            String token = tokenHeader.substring(JwtAuthorizor.AUTH_HEADER_PREFIX.length());
            String updatedToken = this.jwtAuthorizor.getUpdatedToken(token);
            return ResponseEntity.ok(new LoginResponseDTO(updatedToken));
        }
        LOG.warn("Token refresh request missing correct Authorization header");
        return this.restUtils.getErrorResponse(null, "Missing Authorization header");
    }

    @ApiOperation(value = "Registers a user for a new account",
            notes = "Will attempt to create an account based on the information provided. The username and email address must be unique. " +
                    "An activation email will be sent if the account creation is successful.",
            code = 201,
            response = SuccessDTO.class)
    @ApiResponses(value = {
            @ApiResponse(code = 201, response = SuccessDTO.class, message = "User created successfully"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Error creating user")
    })
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> register(@RequestBody RegisterDTO submittedUser) {
        if (this.userRepository.findOneByUsername(submittedUser.getUsername()).isPresent()) {
            return this.restUtils.getErrorResponse("uniqueUsername", "Username already in use");
        } else if (this.userRepository.findOneByEmail(submittedUser.getEmail()).isPresent()) {
            return this.restUtils.getErrorResponse("uniqueEmail", "Email already in use");
        } else {
            User newUser = this.userService.createUser(
                    submittedUser.getUsername(),
                    submittedUser.getPassword(),
                    submittedUser.getEmail());
            this.mailService.sendActivationEmail(newUser);
            return new ResponseEntity<>(new SuccessDTO(true), HttpStatus.CREATED);
        }
    }

    @ApiOperation(value = "Activates a users account",
            notes = "Lookup a user based on the activation key and set them to activated.")
    @RequestMapping(value = "/activate", method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User activated successfully"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Error activating user")
    })
    public ResponseEntity<?> activate(@RequestBody String activationKey) {
        return this.userRepository.findOneByActivationKey(activationKey)
                .map(user -> {
                    if (user.isActivated()) {
                        return this.restUtils.getErrorResponse("alreadyActivated", "Account already activated");
                    } else {
                        this.userService.activateUser(user);
                        return new ResponseEntity<>(HttpStatus.OK);
                    }
                })
                .orElseGet(() -> this.restUtils.getErrorResponse("invalidKey", "Invalid activation key"));
    }

    @ApiOperation(value = "Resends an activation email",
            notes = "Will resend the activation email for a user based on their username.")
    @RequestMapping(value = "/resend-activation", method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "User activation email sent successfully"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Error sending activation email")
    })
    public ResponseEntity<?> resendActivation(@RequestBody String username) {
        return this.userRepository.findOneByUsername(username)
                .map(user -> {
                    if (user.isActivated()) {
                        return this.restUtils.getErrorResponse("alreadyActivated", "Account already activated");
                    } else {
                        this.mailService.sendActivationEmail(user);
                        return new ResponseEntity<>(HttpStatus.OK);
                    }
                })
                .orElseGet(() -> this.restUtils.getErrorResponse("noAccount", "No account for username"));
    }

    @ApiOperation(value = "Send a password reset email",
            notes = "Will send a password reset email for a user based on their username.")
    @RequestMapping(value = "/send-reset-password", method = RequestMethod.POST, consumes = MediaType.TEXT_PLAIN_VALUE)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Password reset email sent successfully"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Error sending password reset email")
    })
    public ResponseEntity<?> generateResetPasswordKey(@RequestBody String username) {
        return this.userRepository.findOneByUsername(username)
                .map(user -> {
                    this.userService.generateResetPasswordKey(user);
                    this.mailService.sendPasswordResetEmail(user);
                    return new ResponseEntity<RestErrorDTO>(HttpStatus.OK);
                })
                .orElseGet(() -> this.restUtils.getErrorResponse("noAccount", "No account for username"));
    }

    @ApiOperation(value = "Changes the users password",
            notes = "Will updated a users password as long as the password reset key matches an account.")
    @RequestMapping(value = "/reset-password", method = RequestMethod.POST)
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Password reset successfully"),
            @ApiResponse(code = 400, response = RestErrorDTO.class, message = "Error changing the password")
    })
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetDTO passwordReset) {
        return this.userRepository.findOneByPasswordResetKey(passwordReset.getResetKey())
                .map(user -> {
                    this.userService.updatePassword(user, passwordReset.getPassword());
                    return new ResponseEntity<RestErrorDTO>(HttpStatus.OK);
                })
                .orElseGet(() -> this.restUtils.getErrorResponse("invalidKey", "Password reset key is invalid"));
    }

}
