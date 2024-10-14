package com.example.alixman.service;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Region;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.OrderDto;
import com.example.alixman.payload.RegionDto;
import com.example.alixman.payload.ResPageable;
import com.example.alixman.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RegionService {
    @Autowired
    RegionRepository regionRepository;
    @Autowired
    ApiResponseService apiResponseService;

    public ApiResponse add(RegionDto regionDto) {
        try {
            if (!regionRepository.existsByNameEqualsIgnoreCase(regionDto.getName())) {
                Region region = new Region();
                region.setName(regionDto.getName());
                region.setDescription(regionDto.getDescription());
                region.setActive(regionDto.isActive());
                regionRepository.save(region);
                return apiResponseService.savedResponse();
            }
            return apiResponseService.existsResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ResPageable getList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Region> allregion = regionRepository.findAll(pageable);
            List<RegionDto> regionDtoList = new ArrayList<>();
            for (int i = 0; i < allregion.getContent().size(); i++) {
                regionDtoList.add(
                        getOne(allregion.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allregion.getTotalElements(),
                    allregion.getTotalPages(),
                    allregion.getContent().stream().map(this::getOne));
        } catch (Exception e) {
            return null;
        }
    }

    public RegionDto getOne(Region region) {
        return new RegionDto(
                region.getId(),
                region.getName(),
                region.getDescription(),
                region.isActive()
        );
    }

    public ApiResponse update(Integer id, RegionDto regionDto) {
        try {
            Optional<Region> optionalRegion = regionRepository.findById(id);
            if (optionalRegion.isPresent()) {
                if (!regionRepository.existsByNameEqualsIgnoreCaseAndIdNot(regionDto.getName(), id)) {
                    Region region = optionalRegion.get();
                    region.setName(regionDto.getName());
                    region.setDescription(regionDto.getDescription());
                    region.setActive(regionDto.isActive());
                    regionRepository.save(region);
                    return apiResponseService.updatedResponse();
                }
                return apiResponseService.existsResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse delete(Integer id) {
        try {
            regionRepository.deleteById(id);
            return apiResponseService.deletedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
