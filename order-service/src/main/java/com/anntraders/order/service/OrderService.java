package com.anntraders.order.service;


import com.anntraders.order.model.Order;
import com.anntraders.order.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository repository;

    public OrderService(OrderRepository repository) {
        this.repository = repository;
    }

    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    public Order getOrderById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Order saveOrder(Order order) {
        order.setStatus("NEW");
        
        order.setOrderDate(java.time.LocalDateTime.now());
        return repository.save(order);
    }

    public void deleteOrder(Long id) {
        repository.deleteById(id);
    }
}

