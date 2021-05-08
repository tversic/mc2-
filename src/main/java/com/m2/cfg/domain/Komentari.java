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
}
