package com.m2.cfg.controller;

import com.m2.cfg.domain.*;
import com.m2.cfg.repository.KolegijRepository;
import com.m2.cfg.repository.TemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;


@RestController
public class KolegijController {


    @Autowired
    KolegijRepository kolegij;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/kolegij")
    public ResponseEntity<?> getKolegij() throws Exception {
        Iterable<Kolegij> kol = this.kolegij.findAll();
        return ResponseEntity.ok(kol);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/kolegijid")
    public ResponseEntity<?> getKolegijId(@RequestBody Integer id) throws Exception {
        Optional<Kolegij> kol = this.kolegij.findById(id);
        return ResponseEntity.ok(kol);
    }

}
