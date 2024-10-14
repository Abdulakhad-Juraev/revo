package com.example.alixman.controller;

import com.example.alixman.entity.ProductTemplate;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ProductTemplateDto;
import com.example.alixman.repository.ProductTemplateRepository;
import com.example.alixman.service.ProductTemplateService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productTemplate")
public class ProductTemplateController {
    @Autowired
    ProductTemplateService productTemplateService;
    @Autowired
    ProductTemplateRepository productTemplateRepository;

    @PostMapping
    public HttpEntity<?> add(@RequestBody ProductTemplateDto productTemplateDto) {
        ApiResponse apiResponse = productTemplateService.addProductTemplate(productTemplateDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Integer id) {
        ProductTemplate productTemplate = productTemplateRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getProductTemplate"));
        return ResponseEntity.ok(productTemplateService.getOne(productTemplate));
    }

    @GetMapping
    public HttpEntity<?> getList() {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, productTemplateService.getList()));
    }
//
//    @GetMapping("/shipment-select")
//    public HttpEntity<?> getList() {
//        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, productTemplateRepository.findAll().stream().map(productTemplateService::getOne).collect(Collectors.toList())));
//    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@PathVariable Integer id, @RequestBody ProductTemplateDto productTemplateDto) {
        ApiResponse apiResponse = productTemplateService.editProductTemplate(id, productTemplateDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 202 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable Integer id) {
        ApiResponse apiResponse = productTemplateService.deleteProductTemplate(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 204 : 409).body(apiResponse);
    }
}
