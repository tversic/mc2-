package com.m2.cfg.controller;

import com.m2.cfg.domain.*;
import com.m2.cfg.repository.FakultetRepostiroy;
import com.m2.cfg.repository.RoleRepository;
import com.m2.cfg.repository.UserRepository;
import com.m2.cfg.service.UserService;
import com.m2.cfg.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


    @RestController
    public class LoginController {

        @Autowired
        private AuthenticationManager authenticationManager;
        @Autowired
        private UserService userService;
        @Autowired
        JwtUtil jwtUtil;

        @CrossOrigin(origins = "http://localhost:3000")
        @PostMapping("/login")
        public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest)
                throws Exception {
            try {
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                                authenticationRequest.getPassword())
                );
            } catch (BadCredentialsException e) {
                throw new Exception("Incorrect username or password exception");
            }
            final UserDetails userDetails = userService
                    .loadUserByUsername(authenticationRequest.getUsername());
            final String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthenticationResponse(jwt));
        }



    }
