package com.example.alixman.projection;

import com.example.alixman.entity.District;
import com.example.alixman.entity.Region;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(types = District.class)
public interface CustomDistrict {
    Integer getId();
    String getName();
    @Value("#{target.region.id}")
    Integer getRegionId();
    @Value("#{target.region.name}")
    String getRegionName();
}
