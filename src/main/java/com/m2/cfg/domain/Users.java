package com.m2.cfg.domain;

import javax.persistence.*;
import java.util.List;
import java.util.Set;


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

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Fakultet.class, cascade=CascadeType.ALL)
    @JoinColumn(name="id_fakulteta", nullable = false)
    private Fakultet faks;

    @ManyToMany
    @JoinTable(
            name = "Room_has_Tag",
            joinColumns = @JoinColumn(name = "Room_idRoom"),
            inverseJoinColumns = @JoinColumn(name = "users_id"))
    Set<Room> rooms;
    private Integer id_faks;

    /*@OneToMany(mappedBy = "users")
    private List<Komentari> komentari;*/


    public Users(){};

    public Users(String username, String email, String password, Integer id_faks) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id_faks=id_faks;

    }

    public Fakultet getFaks() {
        return faks;
    }

    public void setFaks(Fakultet faks) {
        this.faks = faks;
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

    public Integer getId_faks() {
        return id_faks;
    }

    public void setId_faks(Integer id_faks) {
        this.id_faks = id_faks;
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
