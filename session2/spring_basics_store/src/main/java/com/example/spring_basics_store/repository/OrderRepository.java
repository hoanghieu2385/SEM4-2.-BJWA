package com.example.spring_basics_store.repository;

import com.example.spring_basics_store.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
