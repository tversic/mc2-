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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Optional;

@Controller
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

    @RequestMapping("/register")
    public String read(@ModelAttribute(name = "user") Users user, Model model) {

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
    }
}
