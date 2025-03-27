package com.TTT.Vegetable_API.Repository;

import com.TTT.Vegetable_API.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByDiscountGreaterThanAndDiscountExpirationAfter(int discount, LocalDateTime currentDate);
    long countByCategoryId(Long categoryId);
    List<Product> findByCategoryId(Long categoryId);
}
