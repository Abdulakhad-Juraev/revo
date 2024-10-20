package com.example.alixman.repository;

import com.example.alixman.entity.Category;
import com.example.alixman.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {
    List<Room> findByCategory(Category category);

    // Narx oralig'ida xonalarni olish
    List<Room> findByPriceBetween(Double minPrice, Double maxPrice);

}
