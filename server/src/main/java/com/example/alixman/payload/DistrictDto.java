package com.example.alixman.payload;

import com.example.alixman.entity.Region;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DistrictDto {
    private Integer id;
    private String name;
    private String description;
    private boolean active;
    private Region region;
    private Integer regionId;

    public DistrictDto(String name, String description, boolean active, Integer regionId) {
        this.name = name;
        this.description = description;
        this.active = active;
        this.regionId = regionId;
    }

    public DistrictDto(Integer id, String name, String description, boolean active, Region region) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;
        this.region = region;
    }
}
