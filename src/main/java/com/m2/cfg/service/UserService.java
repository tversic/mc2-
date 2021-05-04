package com.m2.cfg.service;

import com.m2.cfg.domain.MyUserPrincipal;
import com.m2.cfg.domain.Users;
import com.m2.cfg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepository userRepositoryService;
    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException
    {
        /*Users user = userRepositoryService.findByUsername(userName);
        if (user == null) {
            throw new UsernameNotFoundException(userName);
        }
        return new MyUserPrincipal(user);*/
        return new MyUserPrincipal(userRepositoryService.findByUsername(userName));
    }

}
//21:27