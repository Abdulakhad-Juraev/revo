package com.example.alixman.controller;

import com.example.alixman.entity.Product;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ProductDto;
import com.example.alixman.repository.ProductRepository;
import com.example.alixman.service.ApiResponseService;
import com.example.alixman.service.ProductService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    ProductService productService;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ApiResponseService apiResponseService;

    @PostMapping
    public HttpEntity<?> add(@RequestBody ProductDto productDto) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, productService.add(productDto)));
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable UUID id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getProduct"));
        return ResponseEntity.ok(productService.getProductOne(product));
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, productService.getProductList(page, size)));
    }

    @PutMapping("/{id}")
    public HttpEntity<?> update(@PathVariable UUID id, @RequestBody ProductDto productDto) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, productService.update(id, productDto)));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> delete(@PathVariable UUID id) {
        return ResponseEntity.ok(productService.delete(id));
    }


    @GetMapping("/all-count/")
    public HttpEntity<?> getAllProductCount() {
        return ResponseEntity.ok(productService.getAllCountProducts());
    }


}
