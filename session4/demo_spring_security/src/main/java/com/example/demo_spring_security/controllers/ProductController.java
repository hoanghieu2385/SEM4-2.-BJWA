package com.example.demo_spring_security.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping ("/api/v1/product")
public class ProductController {
    @GetMapping
    public List<String> GetAllProducts()
    {
        List<String> products = new ArrayList<>();
        products.add("Apple");
        products.add("Banana");
        return products;
    }
}
