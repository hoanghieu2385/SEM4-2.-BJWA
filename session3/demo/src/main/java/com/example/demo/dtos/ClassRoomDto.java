package com.example.demo.dtos;

import jakarta.persistence.Column;

public class ClassRoomDto {
    private Integer id;
    private String class_name;
    private Integer number_member;

    public ClassRoomDto() {
    }
    public ClassRoomDto(Integer id, String class_name, Integer number_member) {
        this.id = id;
        this.class_name = class_name;
        this.number_member = number_member;
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
