package com.example.spring_basics_store.repository;

import com.example.spring_basics_store.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
