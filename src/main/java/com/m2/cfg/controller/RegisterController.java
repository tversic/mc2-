package com.m2.cfg.controller;

import com.m2.cfg.domain.Authorities;
import com.m2.cfg.domain.Fakultet;
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
        /*else if(matchFound)
        {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Invalid E-mail");
        }*/

        if(user.getUsername() != null && user.getEmail() != null && user.getPass() != null)
        {
            Fakultet fax = fakultetRepostiroy.findByNaziv("TVZ");
            var r1 = new Authorities(user.getUsername(), "User");
            var u1 = new Users(user.getUsername(), user.getEmail(), passwordEncoder.encode(user.getPass()), fax);
            System.out.println("username " +user.getUsername());
            userRepository.save(u1);
            roleRepository.save(r1);
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Success!");
}
    /*public String read(@ModelAttribute(name = "user") Users user, Model model) {

        Optional <Users> usersOptional =
                Optional.ofNullable(this.userRepository.findByUsername(user.getUsername()));
        Optional<Users> usersOptional1 =
                Optional.ofNullable(this.userRepository.findByEmail(user.getEmail()));

        if(usersOptional.isPresent() && usersOptional1.isPresent())
        {
            return "redirect:register?errorBoth";
        }
        else if(usersOptional.isPresent())
        {
            return "redirect:register?errorUsername";
        }
        else if(usersOptional1.isPresent())
        {
            return "redirect:register?errorEmail";
        }
        else
        {
            if(user.getUsername() != null && user.getEmail() != null && user.getPass() != null)
            {
                Fakultet fax = fakultetRepostiroy.findByNaziv("TVZ");
                var r1 = new Authorities(user.getUsername(), "User");
                var u1 = new Users(user.getUsername(), user.getEmail(), passwordEncoder.encode(user.getPass()), fax);
                System.out.println("username " +user.getUsername());
                userRepository.save(u1);
                roleRepository.save(r1);
                return "redirect:register?success";
            }

        }
        return "register";
    }*/
    /*@ResponseBody
    public ResponseEntity read(@RequestBody Users user) throws URISyntaxException {
        Fakultet fax = fakultetRepostiroy.findByNaziv("TVZ");
        var r1 = new Authorities(user.getUsername(), "User");
        var u1 = new Users(user.getUsername(), user.getEmail(), passwordEncoder.encode(user.getPass()), fax);
        System.out.println("username " +user.getUsername());
        userRepository.save(u1);
        roleRepository.save(r1);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }*/
}
