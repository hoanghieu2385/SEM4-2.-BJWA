package com.example.spring_basics_store.services;

import com.example.spring_basics_store.entities.Order;
import java.util.List;
import java.util.Optional;

public interface IOrderService {
    List<Order> getAllOrders();
    Optional<Order> getOrderById(Long id);
    Order createOrder(Order order);
    Order updateOrder(Long id, Order order);
    void deleteOrder(Long id);
}
