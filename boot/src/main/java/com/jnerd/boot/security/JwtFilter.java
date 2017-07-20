package com.jnerd.boot.security;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter to check requests for a valid JWT token. Invalid/missing tokens will be rejected. The login endpoint
 * will be the only endpoint that will be ignored.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class JwtFilter extends GenericFilterBean {

    private JwtAuthorizor jwtAuthorizor;

    public JwtFilter(JwtAuthorizor jwtAuthorizor) {
        this.jwtAuthorizor = jwtAuthorizor;
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
            throws ServletException, IOException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith(JwtAuthorizor.AUTH_HEADER_PREFIX)) {
            final String token = authHeader.substring(JwtAuthorizor.AUTH_HEADER_PREFIX.length());
            try {
                request.setAttribute("claims", this.jwtAuthorizor.authorizeToken(token));
                Authentication authentication = this.jwtAuthorizor.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                chain.doFilter(servletRequest, servletResponse);
            } catch (ExpiredJwtException e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is expired");
            } catch (MalformedJwtException e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is invalid");
            } catch (SignatureException e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token has an invalid signature.");
            }
        } else {
            chain.doFilter(servletRequest, servletResponse);
        }

    }


}
