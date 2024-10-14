package com.example.alixman.payload;

import com.example.alixman.entity.ProductTemplate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentDto {
    private Integer id;
    private double count;
    private List<OrderDto> orderDto;

    private LocalDateTime date;
    //REQ

    public ShipmentDto(double count, List<OrderDto> orderDto) {
        this.count = count;
        this.orderDto = orderDto;
    }

}
