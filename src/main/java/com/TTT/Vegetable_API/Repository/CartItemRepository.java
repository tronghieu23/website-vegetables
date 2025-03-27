package com.TTT.Vegetable_API.Repository;

import com.TTT.Vegetable_API.Model.CartItem;
import com.TTT.Vegetable_API.Model.Account;
import com.TTT.Vegetable_API.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByAccount(Account account);

    Optional<CartItem> findByProductAndAccount(Product product, Account account);
}
