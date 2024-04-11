package com.management.user.interceptor;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.UrlPathHelper;

import com.management.user.service.AuthenticationService;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class BasicAuthInterceptor implements HandlerInterceptor {

    private final UrlPathHelper urlPathHelper = new UrlPathHelper();                                                                                                                                                                                                                                                                                                                                                       
    private AuthenticationService authenticationService;
    private Environment env;
    public BasicAuthInterceptor(AuthenticationService authenticationService, Environment env) {
        this.authenticationService = authenticationService;
        this.env = env;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String requestUri = urlPathHelper.getRequestUri(request);
        if(requestUri.contains("/login") || requestUri.contains("/error")) return true;
        if ("OPTIONS".equals(request.getMethod())) {
            return true;
        }
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.split(" ")[1];
            if (isValidToken(token)) {
                return true;
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return false;
            }
        }
       
        return true;
    }

    private boolean isValidToken(String token) {
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(env.getProperty("spring.application.secret"))
                    .build()
                    .parseClaimsJws(token);
            
            return true;
        } catch (Exception e) {
            return false;
        }    
    }
}
