package com.m2.cfg.domain;

import javax.persistence.*;
import java.sql.Date;

@Entity
public class Komentari {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

    @Column(name = "Content")
    private String Content;

    @Column(name = "datum_kreiranja")
    private Date creation_date;


    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Kolegij.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_teme", nullable = false)
    private Tema teme;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private Users users;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_parent", referencedColumnName = "id")
    private Komentari komentari;

    public Komentari() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

    public Date getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(Date creation_date) {
        this.creation_date = creation_date;
    }

    public Tema getTeme() {
        return teme;
    }

    public void setTeme(Tema teme) {
        this.teme = teme;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Komentari(Integer id, String content, Date creation_date, Tema teme, Users users) {
        this.id = id;
        Content = content;
        this.creation_date = creation_date;
        this.teme = teme;
        this.users = users;
    }
}
