package com.m2.cfg.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.PasswordEncoder;


import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .authorizeRequests()
                .antMatchers("/", "/home", "/h2-console/**", "/register", "/users", "/socket/*", "/video/**","/authenticate","/js/*","/createtema","/tema")
                .permitAll()
                .anyRequest().authenticated()
                ;
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