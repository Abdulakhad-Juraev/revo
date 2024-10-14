package com.example.alixman.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegionDto {
    private Integer id;
    private String name;
    private String description;
    private boolean active;

    public RegionDto(String name, String description, boolean active) {
        this.name = name;
        this.description = description;
        this.active = active;
    }

    public RegionDto(Integer id, String name, String description, boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;
    }
}
