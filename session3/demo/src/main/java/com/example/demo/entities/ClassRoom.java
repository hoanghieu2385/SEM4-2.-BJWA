package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "class_room")

public class ClassRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    @Column(name = "class_name")
    private String class_name;
    @Column(name = "number_member")
    private Integer number_member;

    public ClassRoom(Integer id, String class_name, Integer number_member) {
        this.id = id;
        this.class_name = class_name;
        this.number_member = number_member;
    }

    public ClassRoom() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getClass_name() {
        return class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }

    public Integer getNumber_member() {
        return number_member;
    }

    public void setNumber_member(Integer number_member) {
        this.number_member = number_member;
    }
}