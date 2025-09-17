package com.anntraders.order.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.anntraders.order.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    // Optional: Find orders by customer email
    // List<Order> findByCustomerEmail(String email);
}
