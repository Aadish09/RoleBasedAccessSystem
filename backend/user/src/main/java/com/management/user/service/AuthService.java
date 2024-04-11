package com.management.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.management.user.entity.User;
import com.management.user.model.LoginRequest;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.InvalidKeyException;

@Service
public class AuthService {

    @Autowired
    private Environment env;
    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserService userService;
    ObjectMapper mapper = new ObjectMapper();

    public String getAccessToken(LoginRequest loginRequest) throws InvalidKeyException, JsonProcessingException {
        User userDetails = userService.getUserByUsername(loginRequest.getUsername());
        authenticationService.isAuthenticated(loginRequest.getUsername() + ":" + loginRequest.getPassword());
        return Jwts.builder()
                .setSubject(mapper.writeValueAsString(userDetails))
                .signWith(SignatureAlgorithm.HS512, env.getProperty("spring.application.secret")) 
                .compact();
    }

    public User getUser(String token) throws JsonMappingException, JsonProcessingException {
        String accessToken = token.split(" ")[1];
        String user = Jwts.parser()
            .setSigningKey(env.getProperty("spring.application.secret"))
            .parseClaimsJws(accessToken)
            .getBody()
            .getSubject();
        return mapper.readValue(user, User.class);
    }
    
}
