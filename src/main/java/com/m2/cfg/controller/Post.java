package com.m2.cfg.controller;

import com.m2.cfg.domain.*;
import com.m2.cfg.repository.TemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Optional;


@RestController
public class Post {


    @Autowired
    TemaRepository temarep;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/tema")
    public ResponseEntity<?> findPosts(@RequestBody Integer id) throws Exception {
        Optional<Tema> teme = this.temarep.findById(id);
        return ResponseEntity.ok(teme);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createtema")
    public ResponseEntity<?> createPosts(@RequestBody Tema tema) throws Exception {
        System.out.println(tema.getNaslov()+tema.getDatumKreiranja());
        if(tema.getNaslov()!=null)
        {
        temarep.save(tema);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Post created");
    }
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Failed to create post");

}
}
