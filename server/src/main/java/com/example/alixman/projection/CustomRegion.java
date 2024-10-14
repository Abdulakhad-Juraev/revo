package com.example.alixman.projection;

import com.example.alixman.entity.Region;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = Region.class)
public interface CustomRegion {
    Integer getId();
    String getName();
}
