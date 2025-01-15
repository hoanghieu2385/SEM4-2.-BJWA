package com.example.demo.controller;

import com.example.demo.entities.ClassRoom;
import com.example.demo.services.ClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/classroom")
public class ClassRoomController {
    @Autowired
    private ClassRoomService classRoomService;
    public ClassRoomController() {

    }
    @GetMapping("/list")
    public List<ClassRoom> findAll() {
        var classRooms = classRoomService.getClassRoomList();
        return classRooms;
    }
}
