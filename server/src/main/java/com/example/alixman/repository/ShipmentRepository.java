package com.example.alixman.repository;

import com.example.alixman.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ShipmentRepository extends JpaRepository<Shipment, Integer> {
    @Query(nativeQuery = true, value = "select * from shipment where date >= :startDate and date <= :endDate")
    List<Shipment> getAllByDate(LocalDateTime startDate, LocalDateTime endDate);
}
