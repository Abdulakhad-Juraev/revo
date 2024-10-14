package com.example.alixman.controller;

import com.example.alixman.entity.District;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.DistrictDto;
import com.example.alixman.repository.DistrictRepository;
import com.example.alixman.repository.RegionRepository;
import com.example.alixman.service.ApiResponseService;
import com.example.alixman.service.DistrictService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/district")
public class DistrictController {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    DistrictService districtService;
    @Autowired
    DistrictRepository districtRepository;

    @PostMapping
    public HttpEntity<?> add(@RequestBody DistrictDto districtDto) {
        ApiResponse apiResponse = districtService.add(districtDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Integer id) {
        District district = districtRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getDistrict"));
        return ResponseEntity.ok(districtService.getOne(district));
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, districtService.getList(page, size)));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@PathVariable Integer id, @RequestBody DistrictDto districtDto) {
        ApiResponse apiResponse = districtService.update(id, districtDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable Integer id) {
        ApiResponse apiResponse = districtService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }

    @GetMapping("/byRegion/{id}")
    public HttpEntity<?> getDistrictListByRegion(@PathVariable Integer id){
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS,true,districtService.getDistrictListByRegion(id)));
    }
}
