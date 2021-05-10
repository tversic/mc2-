package com.m2.cfg.controller;

import com.m2.cfg.domain.*;
import com.m2.cfg.repository.KolegijRepository;
import com.m2.cfg.repository.KomentariRepository;
import com.m2.cfg.repository.TemaRepository;
import com.m2.cfg.repository.UserRepository;
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
    @Autowired
    KomentariRepository komentari;
    @Autowired
    UserRepository use;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/tema")
    public ResponseEntity<?> findPosts(@RequestBody Integer id) {
        Optional<Tema> teme=this.temarep.findById(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(teme);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/createtema")
    public ResponseEntity<?> createPosts(@RequestBody Tema tema) throws Exception {
        Optional<Kolegij> kolo=kol.findById(tema.getIdKolegij());
        Kolegij kol1=new Kolegij();
        if(kolo.isPresent()){
            kol1=kolo.get();
        }
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

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/komentari")
    public ResponseEntity<?> getKomentar(@RequestBody Integer id) throws Exception {

        return ResponseEntity.ok("lol");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/dodajKoment")
    public ResponseEntity<?> makeKom(@RequestBody Komentari komentar) throws Exception {
        System.out.println(komentar);
        Optional<Users> us=use.findById(komentar.getUser_id());
        Optional<Tema> tem=this.temarep.findById(komentar.getTema_id());
        Optional<Komentari> kom=this.komentari.findById(komentar.getKomentar_id());
        komentar.setTeme(tem.get());
        komentar.setUsers(us.get());
        komentari.save(komentar);
        return ResponseEntity.ok("Success!");
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/getusers")
    public ResponseEntity<?> getUser(@RequestBody Users user) throws Exception {
        Users us=use.findByUsername(user.getUsername());
        return ResponseEntity.ok(us.getId());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/getusersbyid")
    public ResponseEntity<?> getUserByID(@RequestParam Integer id) throws Exception {
        Optional<Users> us=use.findById(id);
        return ResponseEntity.ok(us.get().getUsername());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getkoments")
    public ResponseEntity<?> getKoment() throws Exception {
        Iterable<Komentari> ko=this.komentari.findAll();
        return ResponseEntity.ok(ko);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getroom")
    public ResponseEntity<?> getRoom() throws Exception {
        Iterable<Komentari> ko=this.komentari.findAll();
        return ResponseEntity.ok(ko);
    }


}
