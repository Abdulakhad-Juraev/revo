package com.example.alixman.service;

import com.example.alixman.entity.District;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.DistrictDto;
import com.example.alixman.payload.ResPageable;
import com.example.alixman.repository.DistrictRepository;
import com.example.alixman.repository.DistrictRepository;
import com.example.alixman.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DistrictService {
    @Autowired
    DistrictRepository districtRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    RegionRepository regionRepository;

    public ApiResponse add(DistrictDto districtDto) {
        try {
            if (!districtRepository.existsByNameEqualsIgnoreCase(districtDto.getName())) {
                District district = new District();
                district.setName(districtDto.getName());
                district.setDescription(districtDto.getDescription());
                district.setActive(districtDto.isActive());
                district.setRegion(regionRepository.findById(districtDto.getRegionId()).orElseThrow(() -> new ResourceNotFoundException("getRegion")));
                districtRepository.save(district);
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
            Page<District> allDistrict = districtRepository.findAll(pageable);
            List<DistrictDto> districtDtoList = new ArrayList<>();
            for (int i = 0; i < allDistrict.getContent().size(); i++) {
                districtDtoList.add(
                        getOne(allDistrict.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allDistrict.getTotalElements(),
                    allDistrict.getTotalPages(),
                    allDistrict.getContent().stream().map(this::getOne));
        } catch (Exception e) {
            return null;
        }
    }

    public DistrictDto getOne(District district) {
        return new DistrictDto(
                district.getId(),
                district.getName(),
                district.getDescription(),
                district.isActive(),
                district.getRegion()
        );
    }

    public ApiResponse update(Integer id, DistrictDto districtDto) {
        try {
            Optional<District> optionalDistrict = districtRepository.findById(id);
            if (optionalDistrict.isPresent()) {
                if (!districtRepository.existsByNameEqualsIgnoreCaseAndIdNot(districtDto.getName(), id)) {
                    District district = optionalDistrict.get();
                    district.setName(districtDto.getName());
                    district.setDescription(districtDto.getDescription());
                    district.setActive(districtDto.isActive());
                    district.setRegion(regionRepository.findById(districtDto.getRegionId()).orElseThrow(() -> new ResourceNotFoundException("getRegion")));
                    districtRepository.save(district);
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
            districtRepository.deleteById(id);
            return apiResponseService.deletedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public List<DistrictDto> getDistrictListByRegion(Integer id) {
        try {
            return districtRepository.findByRegion_Id(id).stream().map(this::getOne).collect(Collectors.toList());
        } catch (Exception e) {
            return null;
        }
    }
}
