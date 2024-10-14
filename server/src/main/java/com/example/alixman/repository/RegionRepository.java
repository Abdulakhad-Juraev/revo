package com.example.alixman.repository;

import com.example.alixman.entity.Region;
import com.example.alixman.projection.CustomRegion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

public interface RegionRepository extends JpaRepository<Region, Integer> {
    boolean existsByNameEqualsIgnoreCase(String name);

    boolean existsByNameEqualsIgnoreCaseAndIdNot(String name, Integer id);
}
