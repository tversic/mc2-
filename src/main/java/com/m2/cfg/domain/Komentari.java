package com.m2.cfg.domain;

import javax.persistence.*;

@Entity
public class Komentari {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Integer id;

}
