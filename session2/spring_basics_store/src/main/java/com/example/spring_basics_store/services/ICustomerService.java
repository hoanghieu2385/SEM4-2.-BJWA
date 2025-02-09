package com.example.spring_basics_store.services;

import com.example.spring_basics_store.entities.Customer;
import java.util.List;
import java.util.Optional;

public interface ICustomerService {
    List<Customer> getAllCustomers();
    Optional<Customer> getCustomerById(Long id);
    Customer createCustomer(Customer customer);
    Customer updateCustomer(Long id, Customer customer);
    void deleteCustomer(Long id);
}