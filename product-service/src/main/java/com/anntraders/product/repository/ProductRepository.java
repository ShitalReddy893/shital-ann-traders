package com.anntraders.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.anntraders.product.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	
}