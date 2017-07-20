package com.jnerd.boot.security;

import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Filter to handle CORS requests.
 *
 * @author Mike Eastes <michael.eastes@gmail.com>
 */
public class CorsFilter implements Filter {

    private String allowedOrigins;

    public CorsFilter(String allowedOrigins) {
        if (allowedOrigins != null) {
            this.allowedOrigins = allowedOrigins;
        } else {
            this.allowedOrigins = "*";
        }
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse res = (HttpServletResponse) response;
        res.setHeader("Access-Control-Allow-Origin", this.allowedOrigins);
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept, x-requested-with, Cache-Control");
        res.setHeader("Access-Control-Exposed-Headers", "Authorization, Content-Type, Accept, x-requested-with, Cache-Control");
        chain.doFilter(request, res);
    }

    @Override
    public void destroy() {
    }

}
