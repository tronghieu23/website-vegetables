package com.TTT.Vegetable_API.Repository;

import com.TTT.Vegetable_API.Model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
