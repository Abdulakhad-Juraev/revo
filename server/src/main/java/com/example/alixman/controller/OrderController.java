package com.example.alixman.controller;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Shipment;
import com.example.alixman.payload.ApiResponse;
import com.example.alixman.payload.OrderDto;
import com.example.alixman.payload.ShipmentDto;
import com.example.alixman.repository.OrderRepository;
import com.example.alixman.service.OrderService;
import com.example.alixman.utils.AppConstant;
import com.example.alixman.utils.MessageConst;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @Autowired
    OrderRepository orderRepository;

    @PostMapping
    public HttpEntity<?> addOrders(@RequestBody OrderDto orderDto) {
        return ResponseEntity.ok(orderService.addOrder(orderDto));
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getOne(@PathVariable Integer id) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getOrder"));
        return ResponseEntity.ok(order);
    }

    @GetMapping
    public HttpEntity<?> getList(@RequestParam(value = "page", defaultValue = AppConstant.DEFAULT_PAGE) int page,
                                 @RequestParam(value = "size", defaultValue = AppConstant.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(new ApiResponse(MessageConst.GET_SUCCESS, true, orderService.getOrderList(page, size)));
    }
}
