package com.m2.cfg.domain;

import javax.persistence.*;

@Entity

public class Users {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Integer id = 0;
    private String username;
    private String email;
    private String password;
    private boolean enabled = true;

    public Users(){};

    public Users(String username, String email, String password) {

        this.username = username;
        this.email = email;
        this.password = password;
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
