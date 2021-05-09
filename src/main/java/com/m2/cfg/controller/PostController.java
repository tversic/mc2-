package com.m2.cfg.controller;

import com.m2.cfg.domain.*;
import com.m2.cfg.repository.KolegijRepository;
import com.m2.cfg.repository.TemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;


@RestController
public class PostController {


    @Autowired
    TemaRepository temarep;
    @Autowired
    KolegijRepository kol;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/tema")
    public ResponseEntity<?> findPosts(@RequestBody Integer id) throws Exception {
        Optional<Tema> teme = this.temarep.findById(id);
        return ResponseEntity.ok(teme);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createtema")
    public ResponseEntity<?> createPosts(@RequestBody Tema tema) throws Exception {
        Optional<Kolegij> kolo=kol.findById(tema.getIdKolegij());
        Kolegij kol1=new Kolegij();
        if(kolo.isPresent()){
            kol1=kolo.get();
        }
        System.out.println(tema.getNaslov()+tema.getDatumKreiranja()+kol1.getId());
        tema.setKolegij(kol1);
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/temaid")
    public ResponseEntity<?> getTemaId(@RequestBody Integer id_kol) throws Exception {
        Optional<Kolegij> kol = this.kol.findById(id_kol);
        Iterable<Tema> tem = this.temarep.findAll();
        List<Tema> teme=new ArrayList<>();
        for(Tema t:tem){
            if(t.getKolegij().getId()==kol.get().getId()){
                teme.add(t);
            }
        }
        return ResponseEntity.ok(teme);
    }

}
