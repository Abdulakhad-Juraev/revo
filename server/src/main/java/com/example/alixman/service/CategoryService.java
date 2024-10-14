package com.example.alixman.service;

import com.example.alixman.entity.Category;
import com.example.alixman.entity.Product;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.CategoryDto;
import com.example.alixman.payload.ProductDto;
import com.example.alixman.payload.ResPageable;
import com.example.alixman.repository.AttachmentRepository;
import com.example.alixman.repository.CategoryRepository;
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
public class CategoryService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    AttachmentRepository attachmentRepository;

    public ApiResponse add(CategoryDto categoryDto) {
        try {
            if (!categoryRepository.existsByNameEqualsIgnoreCase(categoryDto.getName())) {
                Category category = new Category();
                category.setName(categoryDto.getName());
                category.setActive(categoryDto.isActive());
                category.setDescription(categoryDto.getDescription());
                category.setAttachment(attachmentRepository.findById(categoryDto.getAttachmentId()).orElseThrow(() -> new ResourceNotFoundException("getAttachment")));
                categoryRepository.save(category);
                return apiResponseService.savedResponse();
            }
            return apiResponseService.existsResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ResPageable getCategoryList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Category> allCategory = categoryRepository.findAll(pageable);
            List<CategoryDto> categoryDtoList = new ArrayList<>();
            for (int i = 0; i < allCategory.getContent().size(); i++) {
                categoryDtoList.add(
                        getOne(allCategory.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allCategory.getTotalElements(),
                    allCategory.getTotalPages(),
                    allCategory.getContent().stream().map(this::getOne));
        } catch (Exception e) {
            return null;
        }
    }
    public CategoryDto getOne(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.isActive(),
                category.getAttachment(),
                category.getDescription()
        );
    }

    public ApiResponse update(Integer id, CategoryDto categoryDto) {
        try {
            if (!categoryRepository.existsByNameEqualsIgnoreCaseAndIdNot(categoryDto.getName(), id)) {
                Optional<Category> optionalCategory = categoryRepository.findById(id);
                if (optionalCategory.isPresent()) {
                    Category category = optionalCategory.get();
                    category.setName(categoryDto.getName());
                    category.setActive(categoryDto.isActive());
                    category.setDescription(categoryDto.getDescription());
                    category.setAttachment(attachmentRepository.findById(categoryDto.getAttachmentId()).orElseThrow(() -> new ResourceNotFoundException("getAttachment")));
                    categoryRepository.save(category);
                    return apiResponseService.updatedResponse();
                } else {
                    return apiResponseService.notFoundResponse();
                }
            } else {
                return apiResponseService.existsResponse();
            }
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public ApiResponse delete(Integer id) {
        try {
            Optional<Category> optionalCategory = categoryRepository.findById(id);
            if (optionalCategory.isPresent()) {
                categoryRepository.deleteById(id);
                return apiResponseService.deletedResponse();
            } else {
                return apiResponseService.notFoundResponse();
            }
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

}
