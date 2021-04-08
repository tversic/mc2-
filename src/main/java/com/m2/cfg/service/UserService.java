package com.m2.cfg.service;

import com.m2.cfg.domain.Users;
import com.m2.cfg.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public List<Users> getAllUsers() {
        List<Users> usersList = new ArrayList<>();
        userRepository.findAll().forEach(users -> usersList.add(users));
        return usersList;
    }

    public Users getUserById(Integer id) {
        return userRepository.findById(id).get();
    }
    public void saveOrUpdate(Users user) {
        userRepository.save(user);
    }
    public void delete(Integer id)
    {
        userRepository.deleteById(id);
    }
}
