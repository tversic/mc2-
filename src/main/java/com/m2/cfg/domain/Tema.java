package com.m2.cfg.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "teme")
public class Tema {

    @Id
    @Column(name = "id_teme")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "naslov")
    private String naslov;

    @Column(name = "datumKreiranja")
    private Date datumKreiranja;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Kolegij.class, cascade=CascadeType.ALL)
    @JoinColumn(name="kolegij_id", nullable = false)
    private Kolegij kolegij;

    @OneToMany(mappedBy = "teme")
    private List<Komentari> comments;

    @ManyToMany
    Set<Room> rooms;

    public Tema() {};

    public Tema(Integer id, String naslov, Date datumKreiranja, Integer idKolegij) {
        this.id = id;
        this.naslov = naslov;
        this.datumKreiranja = datumKreiranja;
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

    public Date getDatumKreiranja() {
        return datumKreiranja;
    }

    public void setDatumKreiranja(Date datumKreiranja) {
        this.datumKreiranja = datumKreiranja;
    }

}