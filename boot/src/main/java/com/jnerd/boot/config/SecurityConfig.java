package com.jnerd.boot.config;

import com.jnerd.boot.security.CorsFilter;
import com.jnerd.boot.security.JwtAuthorizor;
import com.jnerd.boot.security.JwtConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;

import javax.inject.Inject;

/**
 * Config for security settings.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${jnerd.cors.origins}") private String corsOrigins;

    @Inject
    private JwtAuthorizor jwtAuthorizor;
    @Inject
    private UserDetailsService userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Inject
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                .antMatchers("/swagger-ui.html")
                .antMatchers("/webjars/**")
                .antMatchers("/h2-console/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf()
                .disable()
            .headers()
                .frameOptions()
                .disable()
                .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/api/user/*",
                             "/api/translate/list").permitAll()
                .antMatchers("/api/**").authenticated()
                .antMatchers("/swagger-ui.html",
                             "/configuration/ui",
                             "/configuration/security",
                             "/swagger-resources",
                             "/v2/api-docs").permitAll()
                .anyRequest().authenticated()
                .and()
            .apply(securityConfigurerAdapter())
                .and()
            .addFilterBefore(new CorsFilter(this.corsOrigins), ChannelProcessingFilter.class);
    }

    private JwtConfigurer securityConfigurerAdapter() {
        return new JwtConfigurer(this.jwtAuthorizor);
    }

}
