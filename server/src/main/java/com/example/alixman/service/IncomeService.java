package com.example.alixman.service;

import com.example.alixman.entity.Income;
import com.example.alixman.entity.Product;
import com.example.alixman.entity.User;
import com.example.alixman.payload.*;
import com.example.alixman.repository.IncomeRepository;
import com.example.alixman.repository.ProductTemplateRepository;
import com.example.alixman.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class IncomeService {
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    IncomeRepository incomeRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductTemplateRepository productTemplateRepository;
    @Autowired
    ProductService productService;

    public ApiResponse addIncome(IncomeDto incomeDto) {
        try {
            Income income = new Income();
            income.setDate(Timestamp.valueOf(LocalDateTime.now()));
            income.setPrice(incomeDto.getPrice());
            List<Product> productList = new ArrayList<>();
            for (ProductDto productDto : incomeDto.getProductDtoList()) {
                productList.add(productService.add(productDto));
            }
            income.setProductList(productList);
            incomeRepository.save(income);
            return apiResponseService.savedResponse();
        } catch (Exception e) {
            return apiResponseService.tryErrorResponse();
        }
    }

    public IncomeDto getOneIncome(Income income) {
        return new IncomeDto(
                income.getId(),
                income.getDate().toLocalDateTime(),
                income.getPrice(),
                income.getProductList().stream().map(productService::getProductOne).collect(Collectors.toList())
        );
    }

    public ResPageable getList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Income> allIncome = incomeRepository.findAll(pageable);
            List<IncomeDto> incomeDtoList = new ArrayList<>();
            for (int i = 0; i < allIncome.getContent().size(); i++) {
                incomeDtoList.add(
                        getOneIncome(allIncome.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allIncome.getTotalElements(),
                    allIncome.getTotalPages(),
                    allIncome.getContent().stream().map(this::getOneIncome));
        } catch (Exception e) {
            return null;
        }
    }

    public List<IncomeDto> getAllByDate(FilterDate filterDate, User user) {
        try {
            return incomeRepository.getAllByDate(filterDate.getStartDate(), filterDate.getEndDate()).stream().map(this::getOneIncome).collect(Collectors.toList());
        } catch (Exception e) {
            return null;
        }
    }
}
