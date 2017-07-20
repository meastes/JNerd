package com.jnerd.boot.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Authorizes and generates JWT tokens.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Component
public class JwtAuthorizor {

    public static final String AUTH_HEADER_PREFIX = "Bearer ";
    private static final String KEY_AUTHORITIES = "auth";

    @Value("${jwt.secret}") private String secret;
    @Value("${jwt.expirationSeconds}") private int expirationSeconds;
    @Value("${jwt.rememberExpirationSeconds}") private int rememberExpirationSeconds;

    public JwtAuthorizor() { }

    public JwtAuthorizor(String secret, int expirationSeconds, int rememberExpirationSeconds) {
        this.secret = secret;
        this.expirationSeconds = expirationSeconds;
        this.rememberExpirationSeconds = rememberExpirationSeconds;
    }

    public String generateToken(String username, Collection<? extends GrantedAuthority> authorityList, boolean remember) {
        int timeToExpire = remember ? rememberExpirationSeconds : expirationSeconds;
        ZonedDateTime expiration = LocalDateTime.now().plusSeconds(timeToExpire).atZone(ZoneId.systemDefault());
        String authorities = null;
        if (authorityList != null) {
            authorities = StringUtils.trimToNull(authorityList.stream()
                    .map(GrantedAuthority::getAuthority).collect(Collectors.joining(",")));
        }
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .claim(KEY_AUTHORITIES, authorities)
                .signWith(SignatureAlgorithm.HS256, this.secret)
                .setExpiration(Date.from(expiration.toInstant()))
                .compact();
    }

    public Claims authorizeToken(String token) {
        return Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = this.authorizeToken(token);
        Collection<? extends GrantedAuthority> authorities = null;
        if (claims.get(KEY_AUTHORITIES) != null) {
            authorities = Arrays.asList(claims.get(KEY_AUTHORITIES).toString().split(",")).stream()
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
        }
        return new UsernamePasswordAuthenticationToken(claims.getSubject(), "", authorities);
    }

    @SuppressWarnings("unchecked")
    public String getUpdatedToken(String token) {
        Claims claims = authorizeToken(token);
        return generateToken(claims.getSubject(), (Set<GrantedAuthority>) claims.get(KEY_AUTHORITIES), false);
    }

}
