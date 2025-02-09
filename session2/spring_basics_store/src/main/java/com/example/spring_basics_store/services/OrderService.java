package com.example.spring_basics_store.services;

import com.example.spring_basics_store.entities.Order;
import com.example.spring_basics_store.entities.OrderItem;
import com.example.spring_basics_store.repository.OrderRepository;
import com.example.spring_basics_store.repository.ProductRepository;
import com.example.spring_basics_store.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    @Transactional
    public Order createOrder(Order order) {
        // Kiểm tra nếu customer không tồn tại
        if (order.getCustomer() == null || !customerRepository.existsById(order.getCustomer().getId())) {
            throw new RuntimeException("Customer not found!");
        }

        // Kiểm tra nếu danh sách sản phẩm rỗng
        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new RuntimeException("Order must contain at least one product!");
        }

        // Liên kết từng OrderItem với Order
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
            // Kiểm tra nếu sản phẩm tồn tại
            if (!productRepository.existsById(item.getProduct().getId())) {
                throw new RuntimeException("Product with ID " + item.getProduct().getId() + " not found!");
            }
        }

        return orderRepository.save(order);
    }

    @Override
    @Transactional
    public Order updateOrder(Long id, Order order) {
        Optional<Order> existingOrderOpt = orderRepository.findById(id);
        if (existingOrderOpt.isPresent()) {
            Order existingOrder = existingOrderOpt.get();

            // Cập nhật thông tin đơn hàng
            existingOrder.setCustomer(order.getCustomer());
            existingOrder.setOrderDate(order.getOrderDate());
            existingOrder.setTotalPrice(order.getTotalPrice());

            // Cập nhật danh sách sản phẩm
            existingOrder.getItems().clear();
            for (OrderItem item : order.getItems()) {
                item.setOrder(existingOrder);
                existingOrder.getItems().add(item);
            }

            return orderRepository.save(existingOrder);
        } else {
            throw new RuntimeException("Order with ID " + id + " not found.");
        }
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order with ID " + id + " not found.");
        }
        orderRepository.deleteById(id);
    }
}