package com.example.demo.services;

import com.example.demo.entities.ClassRoom;

import java.util.List;

public interface IClassRoomService {
    List<ClassRoom> getClassRoomList();
    void addClassRoom(ClassRoom classRoom);
}