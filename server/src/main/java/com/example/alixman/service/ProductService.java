package com.example.alixman.service;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Product;
import com.example.alixman.entity.ProductTemplate;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.ProductDto;
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
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    AttachmentRepository attachmentRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductTemplateRepository productTemplateRepository;
    @Autowired
    UserService userService;

    public Product add(ProductDto productDto) {
        try {
            return productRepository.save(makeProduct(productDto, new Product()));
        } catch (Exception e) {
            return null;
        }
    }

    public ResPageable getProductList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> allProduct = productRepository.findAll(pageable);
            List<ProductDto> productDtoList = new ArrayList<>();
            for (int i = 0; i < allProduct.getContent().size(); i++) {
                productDtoList.add(
                        getProductOne(allProduct.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allProduct.getTotalElements(),
                    allProduct.getTotalPages(),
                    allProduct.getContent().stream().map(this::getProductOne));
        } catch (Exception e) {
            return null;
        }
    }

    public ProductDto getProductOne(Product product) {
        return new ProductDto(
                product.getId(),
                product.getCount(),
                product.getLeftOver(),
                product.getProductTemplate(),
                product.getWorker()
        );
    }

    public Product update(UUID id, ProductDto productDto) {
        try {
            return productRepository.findById(id).map(product -> productRepository.save(makeProduct(productDto, product))).orElse(null);
        } catch (Exception e) {
            return null;
        }
    }

    public Product makeProduct(ProductDto dto, Product product) {
        try {
            product.setCount(dto.getCount());
            product.setLeftOver(dto.getLeftOver());
            product.setProductTemplate(productTemplateRepository.findById(dto.getProductTemplateId()).orElseThrow(() -> new ResourceNotFoundException("getProductTemplate")));
            product.setWorker(userService.userRepository.getOne(dto.getWorkerId()));
            return product;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean delete(UUID id) {
        try {
            Optional<Product> optionalProduct = productRepository.findById(id);
            if (optionalProduct.isPresent()) {
                productRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            return false;
        }
    }

    public List<ProductTemplateDto> getAllCountProducts() {
        List<ProductTemplateDto> productTemplateDtoList = new ArrayList<>();
        for (ProductTemplate productTemplate : productTemplateRepository.findAll()) {
            Optional<Double> allListCount = productRepository.getAllListCount(productTemplate.getId());
            productTemplateDtoList.add(
                    new ProductTemplateDto(
                            productTemplate.getId(),
                            productTemplate.getName(),
                            productTemplate.getCategory(),
                            productTemplate.getAttachment(),
                            productTemplate.isActive(),
                            productTemplate.getDescription(),
                            productTemplate.getPrice(),
                            productTemplate.getMinCount(),
                            allListCount.isPresent() ? allListCount.get() : 0,
                            productTemplate.getWorkerPrice()
                    )
            );
        }
        return productTemplateDtoList;
    }



}
