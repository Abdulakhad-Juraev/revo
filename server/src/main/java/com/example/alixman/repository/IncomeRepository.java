package com.example.alixman.repository;

import com.example.alixman.entity.Income;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface IncomeRepository extends JpaRepository<Income, UUID> {

    @Query(nativeQuery = true, value = "select * from income where date >= :startDate and date <= :endDate")
    List<Income> getAllByDate(LocalDateTime startDate, LocalDateTime endDate);

}
