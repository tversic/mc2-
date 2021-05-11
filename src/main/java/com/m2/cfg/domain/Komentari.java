package com.m2.cfg.domain;

import javax.persistence.*;
import java.sql.Date;
import java.util.List;

@Entity
public class Komentari {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(name = "Content")
    private String Content;

    @Column(name = "datum_kreiranja")
    private String creation_date;


    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Tema.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "id_teme", nullable = false)
    private Tema teme;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_user", referencedColumnName = "id")
    private Users users;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_parent", referencedColumnName = "id")
    private Komentari komentari;


    @Column(name = "user_id")
    private Integer user_id;
    @Column(name = "tema_id")
    private Integer tema_id;
    @Column(name = "komentar_id")
    private Integer komentar_id;

    public Komentari() {
    }

    public Komentari(Integer id, String content, String creation_date, Tema teme, Users users, Komentari komentari, Integer user_id, Integer tema_id, Integer komentar_id) {
        this.id = id;
        Content = content;
        this.creation_date = creation_date;
        this.teme = teme;
        this.users = users;
        //this.komentari = komentari;
        this.user_id = user_id;
        this.tema_id = tema_id;
        this.komentar_id = komentar_id;
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

    public String getCreation_date() {
        return creation_date;
    }

    public void setCreation_date(String creation_date) {
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

    public Komentari getKomentari() {
        return komentari;
    }

    public void setKomentari(Komentari komentari) {
        this.komentari = komentari;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Integer getTema_id() {
        return tema_id;
    }

    public void setTema_id(Integer tema_id) {
        this.tema_id = tema_id;
    }

    public Integer getKomentar_id() {
        return komentar_id;
    }

    public void setKomentar_id(Integer komentar_id) {
        this.komentar_id = komentar_id;
    }
}
