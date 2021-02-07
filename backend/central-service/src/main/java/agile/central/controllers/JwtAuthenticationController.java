package agile.central.controllers;


import agile.central.config.*;
import agile.central.model.dto.*;
import agile.central.services.*;
import agile.central.util.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.web.bind.annotation.*;

import javax.validation.*;
import javax.validation.constraints.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1/jwt")
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtToken jwtToken;

    @Autowired
    private UserService userService;

    @PostMapping("/authenticate")
    public ResponseEntity<Object> generateJwtToken(@Valid @NotNull(message = "Jwt request can't be null!") @RequestBody JwtRequest jwtRequest) {

        UserDetails userDetails = userService.loadUserByUsername(jwtRequest.getUsername());

        String token = jwtToken.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
