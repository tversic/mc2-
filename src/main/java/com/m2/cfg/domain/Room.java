package com.m2.cfg.domain;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idRoom")
    Integer id;

    @Column(name = "StartTime")
    Date StartTime;

    @Column(name = "EndTime")
    Date EndTime;

    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Kolegij.class, cascade=CascadeType.ALL)
    @JoinColumn(name="idKolegij", nullable = false)
    Kolegij kolegij;

    @ManyToMany(mappedBy = "rooms")
    Set<Users> users;

    public Room() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getStartTime() {
        return StartTime;
    }

    public void setStartTime(Date startTime) {
        StartTime = startTime;
    }

    public Date getEndTime() {
        return EndTime;
    }

    public void setEndTime(Date endTime) {
        EndTime = endTime;
    }

    public Kolegij getKolegij() {
        return kolegij;
    }

    public void setKolegij(Kolegij kolegij) {
        this.kolegij = kolegij;
    }
}
