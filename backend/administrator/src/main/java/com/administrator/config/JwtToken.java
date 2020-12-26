package com.administrator.config;

import com.administrator.exceptions.*;
import io.jsonwebtoken.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.*;

import java.io.*;
import java.util.*;


@Component
public class JwtToken implements Serializable {

    public static final long TOKEN_EXPIRATION_TIME = 10L * 60L * 60L * 1000L;

    private String secret;

    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder().setClaims(claims)
                             .setSubject(userDetails.getUsername())
                             .setIssuedAt(new Date(System.currentTimeMillis()))
                             .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRATION_TIME))
                             .signWith(SignatureAlgorithm.HS256, secret)
                             .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {

        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        String username = claims.getSubject();

        Date expiration = claims.getExpiration();

        if (expiration.before(new Date()))
            return false;

        return userDetails.getUsername().equals(username);
    }

    public String getUsernameFromToken(String token) throws JwtAuthenticationException {

        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        String username = claims.getSubject();

        if (username == null)
            throw new JwtAuthenticationException("Username from token is null!");

        return username;
    }

    public UsernamePasswordAuthenticationToken getUserPasswordAuthToken(UserDetails userDetails) {

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
