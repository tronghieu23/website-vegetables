package com.TTT.Vegetable_API.Controller;

import com.TTT.Vegetable_API.Model.CartItem;
import com.TTT.Vegetable_API.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addItemToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @RequestParam String accountId
    ) {
        if (accountId == null || accountId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Account ID cannot be null or empty");
        }
        try {
            CartItem cartItem = cartService.addItemToCart(productId, quantity, accountId);
            return ResponseEntity.ok(cartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<?> listCartItems(@PathVariable String accountId) {
        if (accountId == null || accountId.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Account ID cannot be null or empty");
        }
        try {
            List<CartItem> cartItems = cartService.listCartItems(accountId);
            return ResponseEntity.ok(cartItems);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Long cartItemId,
            @RequestParam int quantity
    ) {
        if (quantity <= 0) {
            return ResponseEntity.badRequest().body("Quantity must be greater than 0");
        }
        try {
            CartItem updatedCartItem = cartService.updateCartItem(cartItemId, quantity);
            return ResponseEntity.ok(updatedCartItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{cartItemId}")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        try {
            cartService.removeCartItem(cartItemId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
