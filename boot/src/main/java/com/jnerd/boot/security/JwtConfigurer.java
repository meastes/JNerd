package com.jnerd.boot.security;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * Configurer for JWT Authentication using a JWT filter.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class JwtConfigurer extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private JwtAuthorizor jwtAuthorizor;

    public JwtConfigurer(JwtAuthorizor jwtAuthorizor) {
        this.jwtAuthorizor = jwtAuthorizor;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void configure(HttpSecurity http) throws Exception {
        JwtFilter customFilter = new JwtFilter(this.jwtAuthorizor);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
