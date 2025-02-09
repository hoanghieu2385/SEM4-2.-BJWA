package com.example.spring_basics_store.repository;

import com.example.spring_basics_store.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
