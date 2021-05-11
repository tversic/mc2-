package com.m2.cfg.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
@Table(name = "teme")
public class Tema {


    @Id
    @Column(name = "id_teme")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "naslov")
    private String naslov;

    @Column(name = "datumKreiranja")
    private String datumKreiranja;

    @Column(name="id_kolegij")
    private Integer idKolegij;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Kolegij.class, cascade=CascadeType.ALL)
    @JoinColumn(name="kolegij_id", nullable = false)
    private Kolegij kolegij;

   



    @Column(name = "content")
    private String content;

    @ManyToMany
    Set<Room> rooms;

    public Tema() {};

    public Tema(Integer id, String naslov, String datumKreiranja, Integer idKolegij, Kolegij kolegij, String content, Set<Room> rooms) {
        this.id = id;
        this.naslov = naslov;
        this.datumKreiranja = datumKreiranja;
        this.idKolegij = idKolegij;
        this.kolegij = kolegij;
        this.content = content;
        this.rooms = rooms;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNaslov() {
        return naslov;
    }

    public void setNaslov(String naslov) {
        this.naslov = naslov;
    }

    public String getDatumKreiranja() {
        return datumKreiranja;
    }

    public void setDatumKreiranja(String datumKreiranja) {
        this.datumKreiranja = datumKreiranja;
    }

    public Kolegij getKolegij() {
        return kolegij;
    }

    public void setKolegij(Kolegij kolegij) {
        this.kolegij = kolegij;
    }

    public Integer getIdKolegij() {
        return idKolegij;
    }

    public void setIdKolegij(Integer idKolegij) {
        this.idKolegij = idKolegij;
    }



    public Set<Room> getRooms() {
        return rooms;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }
}
