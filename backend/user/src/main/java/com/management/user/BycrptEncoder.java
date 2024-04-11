package com.management.user;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BycrptEncoder {
    private static BCryptPasswordEncoder encoder;

    public static BCryptPasswordEncoder getEncoder() {
        if(encoder == null) {
            encoder = new BCryptPasswordEncoder();
        } 
        return encoder;
    }
}
