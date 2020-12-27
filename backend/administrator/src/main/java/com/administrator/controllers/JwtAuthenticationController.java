package com.administrator.controllers;


import com.administrator.config.*;
import com.administrator.exceptions.*;
import com.administrator.model.dto.*;
import com.administrator.services.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.access.prepost.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1/jwt")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtToken jwtToken;

    @PostMapping("/authenticate")
    public ResponseEntity<Object> generateJwtToken(@RequestBody JwtRequest jwtRequest) throws JwtAuthenticationException {

        if (jwtRequest == null)
            throw new JwtAuthenticationException("Jwt request can't be null!");

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));

        UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUsername());

        String token = jwtToken.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
