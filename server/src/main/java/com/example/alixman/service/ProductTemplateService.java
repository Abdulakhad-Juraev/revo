package com.example.alixman.service;

import com.example.alixman.entity.ProductTemplate;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ProductTemplateDto;
import com.example.alixman.payload.ResPageable;
import com.example.alixman.repository.AttachmentRepository;
import com.example.alixman.repository.CategoryRepository;
import com.example.alixman.repository.ProductRepository;
import com.example.alixman.repository.ProductTemplateRepository;
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
public class ProductTemplateService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    ProductTemplateRepository productTemplateRepository;
    @Autowired
    AttachmentRepository attachmentRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;

    public ApiResponse addProductTemplate(ProductTemplateDto productTemplateDto) {
        try {
            ProductTemplate productTemplate = new ProductTemplate();
            productTemplate.setName(productTemplateDto.getName());
            productTemplate.setAttachment(attachmentRepository.findById(productTemplateDto.getAttachmentId()).orElseThrow(() -> new ResourceNotFoundException("getAttachment")));
            productTemplate.setCategory(categoryRepository.findById(productTemplateDto.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("getCategory")));
            productTemplate.setActive(productTemplateDto.isActive());
            productTemplate.setDescription(productTemplateDto.getDescription());
            productTemplate.setPrice(productTemplateDto.getPrice());
            productTemplate.setMinCount(productTemplateDto.getMinCount());
            productTemplate.setWorkerPrice(productTemplateDto.getWorkerPrice());
            productTemplateRepository.save(productTemplate);
            return apiResponseService.savedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public List<ProductTemplateDto> getList() {
        return productTemplateRepository.findAll().stream().map(this::getOne).collect(Collectors.toList());
    }


    public ProductTemplateDto getOne(ProductTemplate productTemplate) {
        try {
            Optional<Double> count = productRepository.getAllListCount(productTemplate.getId());
            return new ProductTemplateDto(
                    productTemplate.getId(),
                    productTemplate.getName(),
                    productTemplate.getCategory(),
                    productTemplate.getAttachment(),
                    productTemplate.isActive(),
                    productTemplate.getDescription(),
                    productTemplate.getPrice(),
                    productTemplate.getMinCount(),
                    count.isPresent() ? count.get() : 0,
                    productTemplate.getWorkerPrice()
            );
        } catch (Exception e) {
            return null;
        }
    }

    public ApiResponse editProductTemplate(Integer id, ProductTemplateDto productTemplateDto) {
        try {
            Optional<ProductTemplate> optionalProductTemplate = productTemplateRepository.findById(id);
            if (optionalProductTemplate.isPresent()) {
                ProductTemplate productTemplate = optionalProductTemplate.get();
                productTemplate.setName(productTemplateDto.getName());
                productTemplate.setAttachment(attachmentRepository.findById(productTemplateDto.getAttachmentId()).orElseThrow(() -> new ResourceNotFoundException("getAttachment")));
                productTemplate.setCategory(categoryRepository.findById(productTemplateDto.getCategoryId()).orElseThrow(() -> new ResourceNotFoundException("getCategory")));
                productTemplate.setActive(productTemplateDto.isActive());
                productTemplate.setDescription(productTemplateDto.getDescription());
                productTemplate.setPrice(productTemplateDto.getPrice());
                productTemplate.setMinCount(productTemplateDto.getMinCount());
                productTemplate.setWorkerPrice(productTemplateDto.getWorkerPrice());
                productTemplateRepository.save(productTemplate);
                return apiResponseService.updatedResponse();
            }
            return apiResponseService.notFoundResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }


    }

    public ApiResponse deleteProductTemplate(Integer id) {
        try {
            productTemplateRepository.deleteById(id);
            return apiResponseService.deletedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }
}
