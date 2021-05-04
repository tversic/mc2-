package com.m2.cfg.domain;

import javax.persistence.*;

@Entity
@Table(name = "kolegiji")
public class Kolegij {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "naziv")
    private String naziv;

    /*@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "kolegij_has_Tag")*/

    public Kolegij() {};

    public Kolegij(Integer id, String naziv) {
        this.id = id;
        this.naziv = naziv;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNaziv() {
        return naziv;
    }

    public void setNaziv(String naziv) {
        this.naziv = naziv;
    }
}
