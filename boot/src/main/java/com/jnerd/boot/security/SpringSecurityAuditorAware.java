package com.jnerd.boot.security;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

/**
 * Class that implements Spring AuditAware using Spring Security's authentication.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
@Component
public class SpringSecurityAuditorAware implements AuditorAware<String> {
    @Override
    public String getCurrentAuditor() {
        String currentUsername = this.getCurrentUsername();
        return currentUsername != null ? currentUsername : "system";
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            Object principal = authentication.getPrincipal();
            return principal instanceof UserDetails ? ((UserDetails) principal).getUsername() : principal.toString();
        }
        return null;
    }
}
