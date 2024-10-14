package com.example.alixman.payload;

import com.example.alixman.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncomeDto {
    private UUID id;
    private LocalDateTime date;
    private double price;
    private List<ProductDto> productDtoList;
}
