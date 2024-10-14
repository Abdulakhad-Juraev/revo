package com.example.alixman.repository;

import com.example.alixman.entity.District;
import com.example.alixman.projection.CustomDistrict;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District,Integer> {
    boolean existsByNameEqualsIgnoreCase(String name);

    boolean existsByNameEqualsIgnoreCaseAndIdNot(String name, Integer id);
    List<District> findByRegion_Id(Integer id);
}
