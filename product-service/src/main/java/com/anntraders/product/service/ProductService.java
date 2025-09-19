package com.anntraders.product.service;

import com.anntraders.product.model.Product;
import com.anntraders.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    public Product getProductById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        return repository.save(product);
    }

    public void deleteProduct(Long id) {
        repository.deleteById(id);
    }

		
	public Product updateProduct(Long id, Product updatedProduct) {
		return repository.findById(id).map(existingProduct -> {
			existingProduct.setName(updatedProduct.getName());
			existingProduct.setDescription(updatedProduct.getDescription());
			existingProduct.setPrice(updatedProduct.getPrice());
			existingProduct.setImageUrl(updatedProduct.getImageUrl()); // keep image if changed
			return repository.save(existingProduct);
		}).orElseThrow(() -> new RuntimeException("Product not found with id " + id));
	}
	
	
}
