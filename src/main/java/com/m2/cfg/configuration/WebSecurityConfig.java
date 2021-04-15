package com.m2.cfg.configuration;

import com.m2.cfg.domain.Users;
import com.m2.cfg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.sql.DataSource;

import static java.util.Base64.getEncoder;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {



    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/", "/home", "/h2-console/**", "/register", "/users")
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/", true)
                .permitAll()
                .and()
                .logout()
                .permitAll();
        //ovo popravlja problem whitelabel error kod pritiska na gumb
        http
                .headers().frameOptions().sameOrigin();
        http
                .csrf().disable();
        http
                .headers().frameOptions().disable();
    }

    @Autowired
    DataSource dataSource;
    @Autowired
    private PasswordEncoder passwordEncoder3;

    @Autowired
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication().dataSource(dataSource)
                .usersByUsernameQuery("select username, password, 'true' as enabled from users where username = ?")
                .passwordEncoder(passwordEncoder3);
    }
}