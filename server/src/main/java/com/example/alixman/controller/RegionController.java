package com.example.alixman.controller;

import com.example.alixman.entity.Product;
import com.example.alixman.entity.Region;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ProductDto;
import com.example.alixman.payload.RegionDto;
import com.example.alixman.repository.RegionRepository;
import com.example.alixman.service.ApiResponseService;
import com.example.alixman.service.RegionService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/region")
public class RegionController {
    @Autowired
    RegionRepository regionRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    RegionService regionService;


    @PostMapping
    public HttpEntity<?> add(@RequestBody RegionDto regionDto) {
        ApiResponse apiResponse = regionService.add(regionDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Integer id) {
        Region region = regionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getRegion"));
        return ResponseEntity.ok(regionService.getOne(region));
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, regionService.getList(page, size)));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@PathVariable Integer id, @RequestBody RegionDto regionDto) {
        ApiResponse apiResponse = regionService.update(id, regionDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable Integer id) {
        ApiResponse apiResponse = regionService.delete(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }
}
