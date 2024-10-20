package com.example.alixman.repository;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Room;
import com.example.alixman.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Buyurtmani ma'lum vaqt oralig'ida tekshirish
    @Query("SELECT o FROM Order o WHERE o.room.id = :roomId AND " +
            "(:startDate BETWEEN o.startDate AND o.endDate OR " +
            ":endDate BETWEEN o.startDate AND o.endDate)")
    List<Order> findByRoomAndDates(@Param("roomId") Integer roomId,
                                   @Param("startDate") LocalDate startDate,
                                   @Param("endDate") LocalDate endDate);

    // Foydalanuvchi bo'yicha buyurtmalarni olish
    List<Order> findByUser(User user);

    // Xona bo'yicha buyurtmalarni olish
    List<Order> findByRoom(Room room);
}
