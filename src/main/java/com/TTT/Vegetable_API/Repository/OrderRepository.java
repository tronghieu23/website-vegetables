package com.TTT.Vegetable_API.Repository;

import com.TTT.Vegetable_API.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByAccountId(String accountId);
}
