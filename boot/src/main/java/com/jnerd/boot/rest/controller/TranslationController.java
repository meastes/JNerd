package com.jnerd.boot.rest.controller;

import com.jnerd.boot.spring.SerializableResourceBundleMessageSource;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.Locale;
import java.util.Map;

/**
 * REST Controller for handling application translation.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@RestController
@RequestMapping("/api/translate")
public class TranslationController {

    private SerializableResourceBundleMessageSource messageSource;

    @Inject
    public TranslationController(MessageSource messageSource) {
        this.messageSource = (SerializableResourceBundleMessageSource) messageSource;
    }

    @ApiOperation(value = "Returns a list of language translations",
            notes = "Returns a list of language translations for the given locale.")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ApiResponses(value = {
            @ApiResponse(code = 200, response = Map.class, message = "Returns a list of language translations")
    })
    public ResponseEntity<?> list(@RequestParam("lang") String lang) {
        SerializableResourceBundleMessageSource messageBundle = messageSource;
        return ResponseEntity.ok(messageBundle.getAll(new Locale(lang)));
    }

}
