package com.m2.cfg;

import com.m2.cfg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class MyRunner implements CommandLineRunner {


    @Override
    @Transactional
    public void run(String... args) throws Exception {

    }
}
