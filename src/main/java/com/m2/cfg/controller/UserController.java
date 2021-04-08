package com.m2.cfg.controller;

import com.m2.cfg.domain.Users;
import com.m2.cfg.repository.UserRepository;
import com.m2.cfg.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

   /* @Autowired
    UserService userService;
    @Autowired
    UserRepository repo;

    @GetMapping("/users")
    private List<Users> getAllUsers()
    {
        return userService.getAllUsers();
    }
    @GetMapping("/users/{id}")
    private Users getUsers(@PathVariable("id") Integer id)
    {
        return userService.getUserById(id);
    }
    @DeleteMapping
    private void deleteUsers(@PathVariable("id") Integer id)
    {
        userService.delete(id);
    }
    @PostMapping("/users")
    private int saveUser(@RequestBody Users users)
    {
        userService.saveOrUpdate(users);
        return users.getId();
    }*/
}
