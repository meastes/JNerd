package com.jnerd.boot.rest.controller;

import com.jnerd.boot.rest.dto.hello.HelloDTO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling hello messages.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @ApiOperation(value = "Returns a hello message",
                  notes = "Returns a hello message generated on the server.")
    @RequestMapping(value = "/message", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, response = HelloDTO.class, message = "Returns a message from the server")
    })
    public ResponseEntity<?> hello() {
        return ResponseEntity.ok(new HelloDTO(
            "Welcome to the JNerd starter project. Use this project to kickstart the development of your web application. " +
            "If you have any features or changes you would like to add to the project, please consider contributing to JNerd."));
    }

}
