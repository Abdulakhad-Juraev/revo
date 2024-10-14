package com.example.alixman.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterDate {

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private boolean isDate;
}
