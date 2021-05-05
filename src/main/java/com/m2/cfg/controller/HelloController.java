package com.m2.cfg.controller;

import com.m2.cfg.domain.AuthenticationRequest;
import com.m2.cfg.domain.AuthenticationResponse;
import com.m2.cfg.service.UserService;
import com.m2.cfg.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class HelloController {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    JwtUtil jwtUtil;


    @RequestMapping("/hello")
    public String welcome() {
        return "hello";
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
            throws Exception {
       try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                            authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Username or password wrong");
        }
        final UserDetails userDetails = userService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new AuthenticationResponse(jwt));
    }


}
