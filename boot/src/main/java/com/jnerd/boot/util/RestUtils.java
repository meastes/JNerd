package com.jnerd.boot.util;

import com.jnerd.boot.rest.dto.RestErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

/**
 * Utility methods for REST services.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Component
public class RestUtils {

    public ResponseEntity<RestErrorDTO> getErrorResponse(String errorCode, String errorMessage) {
        return this.getErrorResponse(HttpStatus.BAD_REQUEST, errorCode, errorMessage);
    }

    public ResponseEntity<RestErrorDTO> getErrorResponse(HttpStatus status, String errorCode, String errorMessage) {
        return new ResponseEntity<>(new RestErrorDTO(errorCode, errorMessage), status);
    }

}
