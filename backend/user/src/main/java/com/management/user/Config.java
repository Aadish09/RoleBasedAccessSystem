package com.management.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.management.user.interceptor.BasicAuthInterceptor;
import com.management.user.interceptor.CorsInterceptor;
import com.management.user.service.AuthenticationService;

@EnableWebMvc
@Configuration
public class Config implements WebMvcConfigurer {

    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    private Environment env;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new CorsInterceptor()).addPathPatterns("/**");
        registry.addInterceptor(new BasicAuthInterceptor(authenticationService, env));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:4200")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("Origin", "Content-Type", "Accept", "Authorization")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
