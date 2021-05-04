package com.m2.cfg.domain;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Tag")
public class Tag
{
    @Id
    @Column(name = "idTag")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "Naziv")
    private String Naziv;
    @ManyToMany
    Set<Kolegij> kolegij;


    public Tag() {};

    public Tag(Integer id, String naziv) {
        this.id = id;
        Naziv = naziv;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNaziv() {
        return Naziv;
    }

    public void setNaziv(String naziv) {
        Naziv = naziv;
    }
}
