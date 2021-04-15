package com.m2.cfg.controller;

import com.m2.cfg.domain.Authorities;
import com.m2.cfg.domain.Users;
import com.m2.cfg.repository.RoleRepository;
import com.m2.cfg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RegisterController {

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping("/register")
    public String read(@ModelAttribute(name = "user") Users user, Model model) {

        if(user.getUsername() != null && user.getEmail() != null && user.getPass() != null)
        {
            var r1 = new Authorities(user.getUsername(), "User");
            var u1 = new Users(user.getUsername(), user.getEmail(), passwordEncoder.encode(user.getPass()));
            userRepository.save(u1);
            roleRepository.save(r1);
        }
        return "register";
    }
}
