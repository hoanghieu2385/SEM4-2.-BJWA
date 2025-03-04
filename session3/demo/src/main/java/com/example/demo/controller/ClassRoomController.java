package com.example.demo.controller;

import com.example.demo.sevices.IClassRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/classroom")
public class ClassRoomController {
    @Autowired
    IClassRoomService classRoomService;

    public ClassRoomController(IClassRoomService classRoomService) {
        this.classRoomService = classRoomService;
    }

    @GetMapping("/index")
    String index(Model model) {
        var classRooms = this.classRoomService.getClassRoomList();
        model.addAttribute("classRooms", classRooms);
        return "monitor/class/indexClass";
    }
}
