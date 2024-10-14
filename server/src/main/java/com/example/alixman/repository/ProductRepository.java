package com.example.alixman.repository;

import com.example.alixman.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {

    @Query(nativeQuery = true, value = "select coalesce(count(left_over),0) from product where product_template_id=:templateId")
    Optional<Double> getAllListCount(Integer templateId);
    @Query(nativeQuery = true, value = "select * from product where product_template_id = :templateId and left_over > 0 order by created_at")
    List<Product> getAllProductLeftOver(Integer templateId);



}
