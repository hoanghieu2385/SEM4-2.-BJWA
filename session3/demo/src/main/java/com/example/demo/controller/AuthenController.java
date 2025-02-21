package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/authen")
public class AuthenController {
    public AuthenController() {}
    @GetMapping("/login")
    public String Login(){
        return "authen/login";
    }
    public String AccessDenied(){
        return "authen/accessDenied";
    }
}
