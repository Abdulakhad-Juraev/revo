package com.example.alixman.controller;

import com.example.alixman.entity.Income;
import com.example.alixman.entity.User;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.FilterDate;
import com.example.alixman.payload.IncomeDto;
import com.example.alixman.repository.IncomeRepository;
import com.example.alixman.security.CurrentUser;
import com.example.alixman.service.ApiResponseService;
import com.example.alixman.service.IncomeService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/income")
public class IncomeController {
    @Autowired
    IncomeRepository incomeRepository;
    @Autowired
    IncomeService incomeService;
    @Autowired
    ApiResponseService apiResponseService;

    @PostMapping
    public HttpEntity<?> add(@RequestBody IncomeDto incomeDto) {
        ApiResponse apiResponse = incomeService.addIncome(incomeDto);
        return ResponseEntity.status(apiResponse.isSuccess() ? 201 : 409).body(apiResponse);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable UUID id) {
        Income income = incomeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getInocme"));
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, incomeService.getOneIncome(income)));
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, incomeService.getList(page, size)));
    }

    @PostMapping("/byDate")
    public HttpEntity<?> getAllByDate(@RequestBody FilterDate filterDate, @CurrentUser User user){
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS,true,incomeService.getAllByDate(filterDate, user)));
    }

}
