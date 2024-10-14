package com.example.alixman.service;

import com.example.alixman.entity.Order;
import com.example.alixman.entity.Product;
import com.example.alixman.entity.Shipment;
import com.example.alixman.entity.enums.StatusOrder;
import com.example.alixman.payload.*;
import com.example.alixman.repository.OrderRepository;
import com.example.alixman.repository.ProductRepository;
import com.example.alixman.repository.ProductTemplateRepository;
import com.example.alixman.repository.UserRepository;
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
public class OrderService {
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    ApiResponseService apiResponseService;
    @Autowired
    ProductTemplateRepository productTemplateRepository;
    @Autowired
    ProductRepository productRepository;

    public Order addOrder(OrderDto orderDto) {
        try {
            Order order = new Order();
            order.setProductTemplate(productTemplateRepository.findById(orderDto.getProductTemplateId()).orElseThrow(() -> new ResourceNotFoundException("getProductTemplate")));
            order.setCount(orderDto.getCount());
            Double getOrder = productRepository.getAllListCount(orderDto.getProductTemplateId()).orElseThrow(() -> new ResourceNotFoundException("getOrder"));
            if (orderDto.getCount() <= getOrder) {
                double limit = orderDto.getCount();
                for (Product product : productRepository.getAllProductLeftOver(orderDto.getProductTemplateId())) {
                    if (limit == 0) break;
                    if (limit >= product.getLeftOver()) {
                        product.setLeftOver(limit - product.getLeftOver());
                    } else {
                        product.setLeftOver(product.getLeftOver() - limit);
                    }

                    productRepository.save(product);
                }
            }
            orderRepository.save(order);
            return null;
        } catch (Exception e) {
            return null;
        }
    }

    public ResPageable getOrderList(int page, int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Order> allOrder = orderRepository.findAll(pageable);
            List<OrderDto> orderDtoList = new ArrayList<>();
            for (int i = 0; i < allOrder.getContent().size(); i++) {
                orderDtoList.add(
                        getOne(allOrder.getContent().get(i))
                );
            }
            return new ResPageable(
                    page,
                    size,
                    allOrder.getTotalElements(),
                    allOrder.getTotalPages(),
                    allOrder.getContent().stream().map(this::getOne));
        } catch (Exception e) {
            return null;
        }
    }

    public OrderDto getOne(Order order) {
        return new OrderDto(
                order.getId(),
                order.getProductTemplate(),
                order.getCount()
        );
    }


}
