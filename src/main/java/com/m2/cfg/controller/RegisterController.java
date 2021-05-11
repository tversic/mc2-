package com.m2.cfg.controller;

import com.m2.cfg.domain.Authorities;
import com.m2.cfg.domain.Fakultet;
import com.m2.cfg.domain.Room;
import com.m2.cfg.domain.Users;
import com.m2.cfg.repository.FakultetRepostiroy;
import com.m2.cfg.repository.RoleRepository;
import com.m2.cfg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class RegisterController {

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    FakultetRepostiroy fakultetRepostiroy;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        Optional <Users> usersOptional =
                Optional.ofNullable(this.userRepository.findByUsername(user.getUsername()));
        Optional<Users> usersOptional1 =
                Optional.ofNullable(this.userRepository.findByEmail(user.getEmail()));
        Optional<Fakultet> faks=fakultetRepostiroy.findById(user.getId_faks());

        String regex = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(user.getEmail());
        boolean matchFound = matcher.find();

        if(usersOptional.isPresent() && usersOptional1.isPresent())
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("username and email already exist");
        }
        else if(usersOptional.isPresent())
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Username already exists");
        }
        else if(usersOptional1.isPresent())
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email already exists");
        }
        else if(user.getUsername().equals(""))
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("All fields must be filled out");
        }
        else if(user.getPass().equals(""))
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("All fields must be filled out");
        }
        else if(user.getEmail().equals(""))
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("All fields must be filled out");
        }

        else if(user.getId_faks()==null){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Choose a university!");
        }

        if(user.getUsername() != null && user.getEmail() != null && user.getPass() != null)
        {
            var r1 = new Authorities(user.getUsername(), "User");
            var u1 = new Users(user.getUsername(), user.getEmail(), passwordEncoder.encode(user.getPass()), user.getId_faks());
            System.out.println("username " +user.getUsername());
            u1.setFaks(faks.get());
            userRepository.save(u1);
            roleRepository.save(r1);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success!");

        }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/register")
    public ResponseEntity<?> getFakulteti(){
        Iterable<Fakultet> Fakulteti = this.fakultetRepostiroy.findAll();
        return ResponseEntity.ok(Fakulteti);
    }
}
