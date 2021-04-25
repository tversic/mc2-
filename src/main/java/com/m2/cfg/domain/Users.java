package com.m2.cfg.domain;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class Users {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id = 0;
    @Column(name = "username")
    private String username;
    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;
    @Column(name = "enabled")
    private boolean enabled = true;
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Fakultet.class)
    @JoinColumn(name="id_fakulteta", referencedColumnName = "id")
    private Integer idFakulteta;

    public Users(){};

    public Users(String username, String email, String password, Integer idFakulteta) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.idFakulteta = idFakulteta;
    }

    /*
    1. user managment
    2.
     */

    public Integer getIdFakulteta() {
        return idFakulteta;
    }

    public void setIdFakulteta(Integer idFakulteta) {
        this.idFakulteta = idFakulteta;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPass() {
        return password;
    }

    public void setPass(String pass) {
        this.password = pass;
    }

    @Override
    public String toString() {
        return "Users{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", pass='" + password + '\'' +
                '}';
    }
}
